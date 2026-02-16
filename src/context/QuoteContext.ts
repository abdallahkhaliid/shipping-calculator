import { createContext } from "react";
import { type QuoteContextType } from "../types";

export const QuoteContext = createContext<QuoteContextType | undefined>(
  undefined,
);
