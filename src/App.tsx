
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tools from "./pages/Tools";
import Books from "./pages/Books";
import Videos from "./pages/Videos";
import Tips from "./pages/Tips";
import ItemDetail from "./pages/ItemDetail";

// Add type for ScrollReveal
declare global {
  interface Window {
    ScrollReveal: any;
  }
}

// Add Lottie animations
const loadLottie = async () => {
  await import('@lottiefiles/lottie-player');
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize Lottie
    const initLottie = async () => {
      await loadLottie();
    };
    
    initLottie();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/books" element={<Books />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/:itemType/:itemIndex" element={<ItemDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
