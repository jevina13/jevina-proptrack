import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProperties from "./pages/dashboard/DashboardProperties";
import DashboardInquiries from "./pages/dashboard/DashboardInquiries";
import DashboardViewings from "./pages/dashboard/DashboardViewings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PropertiesPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/properties" element={<DashboardProperties />} />
          <Route path="/dashboard/inquiries" element={<DashboardInquiries />} />
          <Route path="/dashboard/viewings" element={<DashboardViewings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
