import { useContext } from "react";
import { QuoteContext } from "../context/QuoteContext";
import { type QuoteContextType } from "../types";

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
};
