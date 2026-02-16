# API Error Handling & 3G Optimization

## API Error Handling Strategy

### Mindset : Graceful Degradation Over Complete Failure

In production shipping applications, **availability is critical**. A single courier API failure should never block the entire user experience.

---

### Scenario 1: Single Courier Service Down (e.g., DHL API Failure)

**Problem**: DHL's rate API returns 503 Service Unavailable

**Solution**: Fetch from all couriers in parallel, handle individual failures gracefully

```typescript
// src/services/courierAPI.ts

export const fetchAllCourierQuotes = async (
  formData: ShippingFormData,
): Promise<CourierQuote[]> => {
  const couriers = ["dhl", "fedex", "ups", "usps", "aramex"];

  // Fetch all couriers in parallel (don't block on failures)
  const results = await Promise.allSettled(
    couriers.map((courier) => fetchCourierWithTimeout(courier, formData, 8000)),
  );

  const successfulQuotes: CourierQuote[] = [];
  const failedCouriers: string[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
      successfulQuotes.push(result.value);
    } else {
      const courierName = couriers[index];
      failedCouriers.push(courierName);

      // Log to monitoring service (Sentry, DataDog, etc.)
      logCourierFailure({
        courier: courierName,
        error: result.status === "rejected" ? result.reason : "No data",
        timestamp: new Date().toISOString(),
      });
    }
  });

  // Show partial results with warning
  if (successfulQuotes.length > 0 && failedCouriers.length > 0) {
    showWarningToast({
      message: `${failedCouriers.length} courier(s) temporarily unavailable`,
      action: "Retry",
    });
  }

  return successfulQuotes;
};
```

**User Experience**:

- ✅ User sees 4 quotes (FedEx, UPS, USPS, Aramex)
- ✅ Subtle toast: "DHL temporarily unavailable" with "Retry" button
- ✅ User can still complete their task
- ❌ Don't show error modal or block the entire flow

---

### Scenario 2: All Courier Services Down

**Problem**: Network outage or all APIs return errors

**Solution**: Show helpful empty state with retry mechanism

```typescript
// src/components/courier/CourierResults.tsx

if (quotes.length === 0 && !isLoading) {
  return (
    <EmptyState
      title="Unable to fetch shipping rates"
      message="All courier services are temporarily unavailable. This usually resolves in a few minutes."
      actions={[
        {
          label: 'Retry Now',
          onClick: handleRetryAll,
          primary: true,
        },
        {
          label: 'Contact Support',
          onClick: () => window.location.href = 'mailto:support@fincart.com',
        },
      ]}
      showCountdown={true} // Auto-retry in 60 seconds
    />
  );
}
```

**User Experience**:

- ✅ Clear explanation of what happened
- ✅ "Retry Now" button (manual)
- ✅ Auto-retry countdown: "Retrying in 45 seconds..."
- ✅ Support contact option
- ✅ Log critical incident for monitoring

---

### Scenario 3: Network Timeout

**Problem**: API takes too long to respond (poor connectivity)

**Solution**: Implement timeout with progressive feedback

```typescript
// src/utils/fetchWithTimeout.ts

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number = 10000,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Request timeout - please check your connection");
    }
    throw error;
  }
};
```

**Progressive Loading UI**:

```typescript
// Show different messages based on elapsed time
const [loadingMessage, setLoadingMessage] = useState("Fetching quotes...");

useEffect(() => {
  const timers = [
    setTimeout(() => setLoadingMessage("Still searching..."), 5000),
    setTimeout(
      () => setLoadingMessage("Taking longer than expected..."),
      10000,
    ),
  ];

  return () => timers.forEach(clearTimeout);
}, []);
```

**User Experience**:

- 0-5s: "Fetching quotes..."
- 5-10s: "Still searching..."
- 10s+: "Taking longer than expected..." with cancel option
- Timeout: Error with retry

---

---

## 3G Network Optimization

### Target: < 5 second initial load on 3G (750ms latency, 400Kbps)

---

### 1. Bundle Size Reduction

#### Strategy A: Tree Shaking & Code Splitting

**Before Optimization**:

```typescript
// ❌ Bad - imports entire MUI library (~300KB)
import * as MUI from "@mui/material";
import * as Icons from "@mui/icons-material";
```

**After Optimization**:

```typescript
// ✅ Good - imports only what's needed (~120KB)
import { Button, Card, Typography, Grid } from "@mui/material";
import { LocalShipping, ArrowForward } from "@mui/icons-material";
```

**Impact**: Reduces MUI bundle from 300KB → 120KB (60% reduction)

---

#### Strategy B: Dynamic Imports & Route-Based Splitting

```typescript
// src/App.tsx

import { lazy, Suspense } from "react";

// Heavy components loaded on-demand
const MainLayout = lazy(() => import("./components/MainLayout"));
const CourierResults = lazy(
  () => import("./components/courier/CourierResults"),
);

// Critical path (loaded immediately): ~180KB
// Secondary components (lazy loaded): ~200KB
```

---

### 2. Image Optimization

#### Problem: Courier logos loading 150KB total

**Solution**: Use optimized formats with CDN

```typescript
// src/constants/courierLogos.ts

// ❌ Before: PNG images from local assets
const LOGOS_OLD = {
  dhl: '/assets/dhl-logo.png',      // 35KB
  fedex: '/assets/fedex-logo.png',  // 40KB
  ups: '/assets/ups-logo.png',      // 30KB
  usps: '/assets/usps-logo.png',    // 45KB
};

// ✅ After: WebP from CDN with optimization
const LOGOS = {
  dhl: 'https://cdn.fincart.com/logos/dhl.webp?w=200&q=80',      // 6KB
  fedex: 'https://cdn.fincart.com/logos/fedex.webp?w=200&q=80',  // 7KB
  ups: 'https://cdn.fincart.com/logos/ups.webp?w=200&q=80',      // 5KB
  usps: 'https://cdn.fincart.com/logos/usps.webp?w=200&q=80',    // 8KB
};

// With lazy loading
<img
  src={logo}
  alt={courierName}
  loading="lazy"
  decoding="async"
  style={{ width: 200, height: 50 }}
/>
```

**Impact**: Logo loading reduced from 150KB → 26KB (83% reduction)

**Image Optimization Checklist**:

- ✅ Convert PNG/JPG → WebP (70% smaller)
- ✅ Serve images at exact display size (no oversizing)
- ✅ Use CDN for global delivery (CloudFlare, Fastly)
- ✅ Lazy load images below the fold
- ✅ Provide width/height to prevent layout shift

---

#### Strategy B: Memoization

```typescript
// Expensive calculation - only recompute when quotes change
const { cheapestId, fastestId } = useMemo(() => {
  if (quotes.length === 0) return { cheapestId: null, fastestId: null };

  const cheapest = quotes.reduce((prev, curr) =>
    curr.totalPrice < prev.totalPrice ? curr : prev
  );

  const fastest = quotes.reduce((prev, curr) =>
    curr.estimatedDays < prev.estimatedDays ? curr : prev
  );

  return { cheapestId: cheapest.id, fastestId: fastest.id };
}, [quotes]); // Only recalculate when quotes array changes

// Memoize expensive components
export const CourierCard = React.memo(({ quote, isCheapest, isFastest }) => {
  // Component only re-renders when props actually change
  return <Card>...</Card>;
});
```

---

#### Strategy C: Virtual Scrolling (for 20+ results)

```typescript
// src/components/courier/VirtualizedResults.tsx

import { FixedSizeList } from 'react-window';

export const VirtualizedResults = ({ quotes }) => {
  return (
    <FixedSizeList
      height={800}
      itemCount={quotes.length}
      itemSize={350}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <CourierCard quote={quotes[index]} />
        </div>
      )}
    </FixedSizeList>
  );
};
```

**Impact**: Render only 3 visible cards instead of 50 (DOM nodes -94%)

---

### 5. Network Efficiency

#### Strategy A: API Response Caching

```typescript
// src/utils/apiCache.ts

const cache = new Map<string, CachedResponse>();

interface CachedResponse {
  data: CourierQuote[];
  timestamp: number;
  ttl: number;
}

export const fetchWithCache = async (
  key: string,
  fetcher: () => Promise<CourierQuote[]>,
  ttl: number = 300000, // 5 minutes
): Promise<CourierQuote[]> => {
  // Check cache first
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    console.log("Cache hit:", key);
    return cached.data;
  }

  // Fetch fresh data
  const data = await fetcher();

  // Store in cache
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });

  return data;
};

// Usage
const cacheKey = `quotes-${origin}-${destination}-${weight}`;
const quotes = await fetchWithCache(
  cacheKey,
  () => fetchCourierQuotes(formData),
  300000, // Cache for 5 minutes
);
```

**Impact**: Eliminates 80% of redundant API calls

---

#### Strategy B: Request Compression

```typescript
// Enable gzip/brotli compression
const response = await fetch(apiUrl, {
  headers: {
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/json",
  },
});
```

**Server Configuration** (if you control the API):

```javascript
// Express.js example
const compression = require("compression");
app.use(compression()); // Enable gzip compression
```

**Impact**: Reduces API payload by 60-80%

---

#### Strategy C: Progressive Loading

```typescript
// Show cached data immediately, then refresh in background
const [quotes, setQuotes] = useState(() => getCachedQuotes());
const [isRefreshing, setIsRefreshing] = useState(false);

useEffect(() => {
  setIsRefreshing(true);

  fetchFreshQuotes().then((freshQuotes) => {
    setQuotes(freshQuotes);
    setIsRefreshing(false);
  });
}, [formData]);

// UI shows cached data immediately with "Refreshing..." indicator
```

---
