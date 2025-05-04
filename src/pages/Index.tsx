
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import HomeSection from '@/components/sections/HomeSection';
import TipsSection from '@/components/sections/TipsSection';
import ToolsSection from '@/components/sections/ToolsSection';
import VideosSection from '@/components/sections/VideosSection';
import BooksSection from '@/components/sections/BooksSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  useEffect(() => {
    // Handle hash-based navigation for the SPA
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      const element = document.querySelector(hash);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    // Set up event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial load
    setTimeout(handleHashChange, 100);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <Layout>
      <HomeSection />
      <TipsSection />
      <ToolsSection />
      <VideosSection />
      <BooksSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
