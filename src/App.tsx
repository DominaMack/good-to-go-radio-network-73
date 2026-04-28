import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Listen from "./pages/Listen.tsx";
import Stations from "./pages/Stations.tsx";
import StartYourStation from "./pages/StartYourStation.tsx";
import Advertise from "./pages/Advertise.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import NotFound from "./pages/NotFound.tsx";
import StationDetail from "./pages/StationDetail.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/stations/:slug" element={<StationDetail />} />
          <Route path="/start-your-station" element={<StartYourStation />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
