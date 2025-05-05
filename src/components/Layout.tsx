
import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Ticker from './Ticker';
import VisitorCounter from './VisitorCounter';
import SearchResults from './SearchResults';
import { searchGardenData, ItemType } from '@/utils/dataService';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [searchResults, setSearchResults] = useState<ItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    const results = searchGardenData(query);
    setSearchResults(results);
    setSearchQuery(query);
    setShowResults(true);
  };

  const closeSearchResults = () => {
    setShowResults(false);
  };

  // Listen for search events from HomeSection
  useEffect(() => {
    const handleGardenSearch = (event: Event) => {
      const customEvent = event as CustomEvent;
      handleSearch(customEvent.detail);
    };

    window.addEventListener('garden-search', handleGardenSearch);
    
    return () => {
      window.removeEventListener('garden-search', handleGardenSearch);
    };
  }, []);

  return (
    <div className="min-h-screen bg-garden-white">
      <Ticker />
      <VisitorCounter />
      
      <div className="pt-4">
        <Navbar onSearch={handleSearch} />
        <main>{children}</main>
        
        <footer className="bg-garden-green text-white py-10 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-3">Home</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/#home" className="hover:underline">Home</Link></li>
                  <li><Link to="/#about" className="hover:underline">About</Link></li>
                  <li><Link to="/#contact" className="hover:underline">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Gardening Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/#tips" className="hover:underline">All Tips</Link></li>
                  <li><Link to="/#tools" className="hover:underline">Seasonal Guide</Link></li>
                  <li><Link to="/#tools" className="hover:underline">Plant Care</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/tools" className="hover:underline">All Tools</Link></li>
                  <li><Link to="/tools" className="hover:underline">Gardening Tools</Link></li>
                  <li><Link to="/tools" className="hover:underline">Accessories</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Essentials</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/books" className="hover:underline">Books</Link></li>
                  <li><Link to="/videos" className="hover:underline">Videos</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Pots & Containers</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/tools" className="hover:underline">Indoor Pots</Link></li>
                  <li><Link to="/tools" className="hover:underline">Outdoor Planters</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center space-x-5 my-6">
              <a href="https://instagram.com" className="text-white hover:text-garden-white/70 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" className="text-white hover:text-garden-white/70 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-garden-white/70 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-garden-white/70 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:contact@greengroves.com" className="text-white hover:text-garden-white/70 transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="w-6 h-6" />
              </a>
            </div>
            
            <div className="mt-8 pt-6 border-t border-garden-white/20 text-center text-sm">
              <p>© {new Date().getFullYear()} Green Groves. All rights reserved.</p>
              <p className="text-garden-white/70 mt-1">
                Project created by Dami, Samuel, Ella, and Idowu
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      {showResults && (
        <SearchResults 
          results={searchResults} 
          query={searchQuery} 
          onClose={closeSearchResults} 
        />
      )}
    </div>
  );
};

export default Layout;
