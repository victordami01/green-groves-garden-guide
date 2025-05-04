
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`sticky top-8 z-40 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-garden-green" />
            <span className="text-xl font-bold text-garden-green">Green Groves</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              link.submenu ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="text-foreground hover:text-garden-green hover:bg-transparent focus:bg-transparent"
                    >
                      {link.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 bg-white">
                    {link.items?.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link 
                          to={item.href} 
                          className="cursor-pointer hover:text-garden-green w-full"
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
                  className="text-foreground hover:text-garden-green transition-colors"
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
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-[200px] bg-muted/30"
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
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 space-y-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            {/* Mobile nav links */}
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.submenu ? (
                    <div className="space-y-2">
                      <div className="font-medium text-garden-green">{link.name}</div>
                      <div className="ml-4 flex flex-col space-y-2">
                        {link.items?.map((item) => (
                          <Link 
                            key={item.name} 
                            to={item.href}
                            className="text-foreground hover:text-garden-green"
                            onClick={closeMenu}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={link.href}
                      className="text-foreground hover:text-garden-green font-medium"
                      onClick={closeMenu}
                    >
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
