
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Ticker from './Ticker';
import VisitorCounter from './VisitorCounter';
import SearchResults from './SearchResults';
import { searchGardenData, ItemType } from '@/utils/dataService';
import { Leaf } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-garden-white">
      <Ticker />
      <VisitorCounter />
      
      <div className="pt-8">
        <Navbar onSearch={handleSearch} />
        <main>{children}</main>
        
        <footer className="bg-garden-green text-white py-10 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                  <Leaf className="h-6 w-6 mr-2" />
                  <span className="text-xl font-bold">Green Groves</span>
                </div>
                <p className="mt-2 max-w-xs text-garden-white/80">
                  Your ultimate guide to small-scale gardening in balconies, terraces, and home gardens.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#home" className="hover:underline">Home</a></li>
                    <li><a href="#tips" className="hover:underline">Gardening Tips</a></li>
                    <li><a href="#tools" className="hover:underline">Tools</a></li>
                    <li><a href="#about" className="hover:underline">About</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Resources</h3>
                  <ul className="space-y-2">
                    <li><a href="#books" className="hover:underline">Books</a></li>
                    <li><a href="#videos" className="hover:underline">Videos</a></li>
                    <li><a href="#contact" className="hover:underline">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-garden-white/20 text-center md:text-left">
              <p>© {new Date().getFullYear()} Green Groves. All rights reserved.</p>
              <p className="text-sm text-garden-white/70 mt-1">
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
