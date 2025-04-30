
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import History from "./pages/History";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          {/* Special catch-all route for product IDs with slashes */}
          <Route path="/product/:productId/*" element={<ProductDetails />} />
          <Route path="/history" element={<History />} />
          <Route path="/bookmarks" element={<NotFound />} /> {/* Temporary fallback until we create a dedicated Bookmarks page */}
          <Route path="/report/:productId" element={<Report />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<NotFound />} /> {/* Temporary fallback */}
          <Route path="/profile" element={<NotFound />} /> {/* Temporary fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
