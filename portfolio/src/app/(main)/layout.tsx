import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PortfolioDataProvider from "@/components/PortfolioDataProvider";
import { portfolioData } from "@/lib/data";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getLiveData(): Promise<typeof portfolioData> {
  try {
    const db = await getDb();
    const doc = await db.collection("cms").findOne({ key: "main" });
    if (doc?.data && Object.keys(doc.data).length > 0) {
      return { ...portfolioData, ...doc.data };
    }
  } catch {}
  return portfolioData;
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const data = await getLiveData();

  return (
    <PortfolioDataProvider data={data}>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </PortfolioDataProvider>
  );
}
