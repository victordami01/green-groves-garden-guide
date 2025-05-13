
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

// Add ScrollReveal for scroll animations
const loadScrollReveal = async () => {
  const ScrollReveal = (await import('scrollreveal')).default;
  return ScrollReveal({
    distance: '60px',
    duration: 1200,
    delay: 300,
    reset: false
  });
};

// Initialize Lottie animations
const loadLottie = async () => {
  await import('@lottiefiles/lottie-player');
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize ScrollReveal
    const initScrollReveal = async () => {
      const sr = await loadScrollReveal();
      
      // Reveal elements with delay
      sr.reveal('.reveal-element', { 
        origin: 'bottom',
        interval: 150
      });
      
      sr.reveal('.reveal-left', {
        origin: 'left'
      });
      
      sr.reveal('.reveal-right', {
        origin: 'right'
      });
    };
    
    // Initialize Lottie
    const initLottie = async () => {
      await loadLottie();
    };
    
    // Handle slide-in animations using Intersection Observer
    const handleIntersections = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Observe elements with slide-in classes
      document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom').forEach(el => {
        observer.observe(el);
      });
      
      // Text reveal animation
      const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            textObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      document.querySelectorAll('.reveal-text').forEach(el => {
        textObserver.observe(el);
      });
    };
    
    // Initialize all animations
    initScrollReveal();
    initLottie();
    handleIntersections();
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
