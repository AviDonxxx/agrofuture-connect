import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Fields from "./pages/Fields";
import Results from "./pages/Results";
import Learning from "./pages/Learning";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import Laboratory from "./pages/Laboratory";
import DigitalTwin from "./pages/DigitalTwin";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/results" element={<Results />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
