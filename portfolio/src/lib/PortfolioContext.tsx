"use client";

import { createContext, useContext } from "react";
import { portfolioData } from "./data";

export type PortfolioData = typeof portfolioData;

const PortfolioContext = createContext<PortfolioData>(portfolioData);

export function usePortfolioData(): PortfolioData {
  return useContext(PortfolioContext);
}

export { PortfolioContext };
