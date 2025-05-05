
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Sprout, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const inspirationImages = data?.inspiration || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Dispatch the search event to the parent Layout component
      const searchEvent = new CustomEvent('garden-search', { detail: searchQuery });
      window.dispatchEvent(searchEvent);
    }
  };

  // Featured products with optimized image loading
  const featuredProducts = [
    { 
      title: 'Gardening Gloves', 
      desc: 'Protect your hands with these durable gloves', 
      image: 'https://images.unsplash.com/photo-1617723569153-2801406373f4?auto=format&q=80&w=400' 
    },
    { 
      title: 'Trowel and Pruner Set', 
      desc: 'The set includes a trowel, pruner and more', 
      image: 'https://images.unsplash.com/photo-1585513849702-2a2f8afd001b?auto=format&q=80&w=400' 
    },
    { 
      title: 'Plant Mister', 
      desc: 'Keep your houseplants happy and moist with this fine mist sprayer', 
      image: 'https://images.unsplash.com/photo-1653830391012-c92f486bbcbb?auto=format&q=80&w=400' 
    },
    { 
      title: 'Macrame Plant Hanger', 
      desc: 'Add a natural touch to your indoor garden with a macrame plant hanger', 
      image: 'https://images.unsplash.com/photo-1615307799867-b9bbc5a90929?auto=format&q=80&w=400' 
    },
    { 
      title: 'Soil Moisture Meter', 
      desc: 'Avoid overwatering your plants with this handy tool', 
      image: 'https://images.unsplash.com/photo-1625179893310-8e419b5b2d60?auto=format&q=80&w=400' 
    }
  ];

  return (
    <section id="home" className="relative" ref={sectionRef}>
      {/* Hero section with background image */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&q=85&w=1200" 
            alt="Garden landscape" 
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-filter backdrop-brightness-90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome to Green Groves
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
              Your one-stop location for all gardening supplies and resources
            </p>
            
            <form onSubmit={handleSearch} className="w-full max-w-md relative">
              <Input 
                type="text" 
                placeholder="Search our store" 
                className="pr-20 h-12 bg-white/95 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-0 top-0 h-12 bg-garden-green hover:bg-garden-green/90 px-6 flex items-center justify-center"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Today's Garden Inspiration */}
      <div className="section-container py-12 fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-garden-green/60 after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2">Today's Garden Inspiration</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted h-48 rounded-lg"></div>
            ))
          ) : (
            inspirationImages.slice(0, 4).map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="p-3 bg-white">
                  <h3 className="text-sm font-semibold">
                    {['Tranquil Pondside Garden', 'Cozy Bench in the Garden', 'Elegant Garden Pathway', 'Soothing Fountain Garden'][index]}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Featured Products section */}
      <div className="section-container bg-gray-50 py-12 fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-garden-green/60 after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {featuredProducts.map((product, idx) => (
            <Link 
              to={`/tools/${idx}`} 
              key={idx} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={product.image}
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 group-hover:text-garden-green transition-colors">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to action section */}
      <div className="section-container py-16 text-center bg-garden-green/10 fade-in">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to start your garden adventure?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Find everything you need to grow and enjoy beautiful plants at home.</p>
        <Button 
          size="lg" 
          className="bg-garden-green hover:bg-garden-green/90 text-white px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Sprout className="mr-2 h-5 w-5" /> Get more inspiration
        </Button>
      </div>
    </section>
  );
};

export default HomeSection;
