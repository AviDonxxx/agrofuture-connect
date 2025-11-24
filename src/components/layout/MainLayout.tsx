import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-muted/30 to-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

