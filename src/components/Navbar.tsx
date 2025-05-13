
import { useState, useEffect } from 'react';
import { Search, Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Gardening Tips', 
      href: '#tips',
      submenu: false
    },
    { 
      name: 'Tools & Essentials', 
      href: '/tools',
      submenu: true,
      items: [
        { name: 'Tools', href: '/tools' },
        { name: 'Essentials', href: '/tools?tab=essentials' },
        { name: 'Pots & Containers', href: '/tools?tab=pots' },
        { name: 'Accessories', href: '/tools?tab=accessories' }
      ]
    },
    { name: 'Videos', href: '/videos' },
    { name: 'Books', href: '/books' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const handleLocationChange = () => {
      setActivePath(window.location.pathname);
      
      // Also check for hash
      if (window.location.hash) {
        setActivePath(window.location.hash);
      } else if (window.location.pathname === '/') {
        setActivePath('#home');
      }
    };
    
    // Set initial active path
    handleLocationChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return activePath === href;
    }
    
    // For regular routes
    return href === '/' 
      ? activePath === '/' || activePath === '#home'
      : activePath.startsWith(href);
  };

  return (
    <nav 
      className={`sticky top-8 z-40 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 shadow-lg backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Leaf className="h-7 w-7 text-garden-green group-hover:text-garden-dark-green transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-garden-leaf rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </div>
            <span className="text-xl font-display font-bold text-garden-green group-hover:text-garden-dark-green transition-colors">Green Groves</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              link.submenu ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={`text-foreground hover:text-garden-green hover:bg-transparent focus:bg-transparent px-1 ${
                        isActive(link.href) ? 'text-garden-green font-medium' : ''
                      }`}
                    >
                      {link.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white/90 backdrop-blur-md">
                    {link.items?.map((item) => (
                      <DropdownMenuItem key={item.name} asChild className="focus:bg-garden-green/10">
                        <Link 
                          to={item.href} 
                          className="cursor-pointer hover:text-garden-green w-full py-2"
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`text-foreground hover:text-garden-green transition-colors relative px-1 py-1 ${
                    isActive(link.href) 
                      ? 'text-garden-green font-medium after:content-[""] after:absolute after:w-1/2 after:h-0.5 after:bg-garden-green after:bottom-0 after:left-1/4' 
                      : 'after:content-[""] after:absolute after:w-0 after:h-0.5 after:bg-garden-green after:bottom-0 after:left-1/2 hover:after:w-full hover:after:left-0 after:transition-all'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Search bar */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex items-center"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-[200px] bg-muted/30 focus-visible:ring-garden-green border-garden-green/20 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-garden-green" />
            ) : (
              <Menu className="h-6 w-6 text-garden-green" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t py-4 animate-scale-in">
          <div className="container mx-auto px-4 space-y-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-garden-green" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-full border-garden-green/30 focus-visible:ring-garden-green rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            {/* Mobile nav links */}
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.submenu ? (
                    <div className="space-y-2">
                      <div className="font-medium text-garden-green border-b border-garden-green/20 pb-1">{link.name}</div>
                      <div className="ml-4 flex flex-col space-y-3 pt-2">
                        {link.items?.map((item) => (
                          <Link 
                            key={item.name} 
                            to={item.href}
                            className="text-foreground hover:text-garden-green flex items-center"
                            onClick={closeMenu}
                          >
                            <span className="w-1 h-1 bg-garden-green rounded-full mr-2"></span>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={link.href}
                      className={`text-foreground hover:text-garden-green font-medium flex items-center ${
                        isActive(link.href) ? 'text-garden-green' : ''
                      }`}
                      onClick={closeMenu}
                    >
                      {isActive(link.href) && <span className="w-1.5 h-1.5 bg-garden-green rounded-full mr-2"></span>}
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
