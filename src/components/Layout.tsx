
import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Ticker from './Ticker';
import VisitorCounter from './VisitorCounter';
import SearchResults from './SearchResults';
import { searchGardenData, ItemType } from '@/utils/dataService';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';
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

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-garden-white">
      <div className="sticky top-0 z-50">
        <Ticker />
        <VisitorCounter />
      </div>
      
      <div className="pt-4">
        <Navbar onSearch={handleSearch} />
        <main>{children}</main>
        
        <footer className="bg-garden-green text-white pt-16 pb-8 mt-16">
          <div className="container mx-auto px-4">
            {/* Footer top section with columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              {/* Company info */}
              <div className="md:col-span-4">
                <div className="flex items-center mb-4">
                  <Leaf className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Green Groves</h3>
                </div>
                <p className="text-white/80 mb-5">
                  Your trusted partner in gardening supplies and resources since 2010. Helping gardeners across Nigeria create beautiful outdoor spaces.
                </p>
                <div className="flex space-x-4 mb-6">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" 
                    aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" 
                    aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" 
                    aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors" 
                    aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Quick links */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Explore</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/#home" className="hover:text-white/80 transition-colors inline-block py-1">Home</Link></li>
                  <li><Link to="/#about" className="hover:text-white/80 transition-colors inline-block py-1">About</Link></li>
                  <li><Link to="/#contact" className="hover:text-white/80 transition-colors inline-block py-1">Contact Us</Link></li>
                </ul>
              </div>
              
              {/* Gardening section */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Gardening</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/tips" className="hover:text-white/80 transition-colors inline-block py-1">All Tips</Link></li>
                  <li><Link to="/#tools" className="hover:text-white/80 transition-colors inline-block py-1">Seasonal Guide</Link></li>
                  <li><Link to="/#tools" className="hover:text-white/80 transition-colors inline-block py-1">Plant Care</Link></li>
                </ul>
              </div>
              
              {/* Tools section */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Shop</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/tools" className="hover:text-white/80 transition-colors inline-block py-1">All Tools</Link></li>
                  <li><Link to="/tools" className="hover:text-white/80 transition-colors inline-block py-1">Gardening Tools</Link></li>
                  <li><Link to="/tools" className="hover:text-white/80 transition-colors inline-block py-1">Accessories</Link></li>
                  <li><Link to="/tools" className="hover:text-white/80 transition-colors inline-block py-1">Plant Pots</Link></li>
                </ul>
              </div>
              
              {/* Contact info */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg mb-4 border-b border-white/20 pb-2">Contact</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>15 Adeola Odeku Street, Victoria Island, Lagos</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>+234 803 456 7890</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>hello@greengroves.com.ng</span>
                  </li>
                  <li className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>www.greengroves.com.ng</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Footer bottom section with copyright */}
            <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
              <p>© {currentYear} Green Groves. All rights reserved.</p>
              <p className="mt-2 md:mt-0">
                Green Groves - Nigeria's Premier Gardening Resource
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
