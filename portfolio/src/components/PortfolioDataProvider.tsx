"use client";

import { PortfolioContext, type PortfolioData } from "@/lib/PortfolioContext";

export default function PortfolioDataProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PortfolioData;
}) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}
