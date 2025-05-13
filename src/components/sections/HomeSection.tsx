
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Sprout, Search, Sun, Cloud, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const HomeSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const inspirationImages = data?.inspiration || [];

  useEffect(() => {
    // Handle parallax effect on scroll
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  // Featured products with updated garden tool images
  const featuredProducts = [
    { 
      title: 'Gardening Gloves', 
      desc: 'Protect your hands with these durable gloves', 
      image: 'https://images.unsplash.com/photo-1617723569153-2801406373f4?auto=format&q=80&w=400' 
    },
    { 
      title: 'Garden Hand Trowel', 
      desc: 'Essential tool for planting and potting', 
      image: 'https://images.unsplash.com/photo-1585513849702-2a2f8afd001b?auto=format&q=80&w=400' 
    },
    { 
      title: 'Pruning Shears', 
      desc: 'Sharp and precise cutting for your plants', 
      image: 'https://images.unsplash.com/photo-1544264981-8897158c283d?auto=format&q=80&w=400' 
    },
    { 
      title: 'Watering Can', 
      desc: 'Perfect for watering indoor and outdoor plants', 
      image: 'https://images.unsplash.com/photo-1664544521604-b0692bda3d4a?auto=format&q=80&w=400' 
    },
    { 
      title: 'Soil Moisture Meter', 
      desc: 'Avoid overwatering your plants with this handy tool', 
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&q=80&w=400' 
    }
  ];

  return (
    <section id="home" className="relative" ref={sectionRef}>
      {/* Hero section with parallax effect - reverted to original hero image */}
      <div className="relative h-screen overflow-hidden parallax-container">
        {/* Parallax background layers */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translateY(${scrollPosition * 0.5}px)`,
            transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1466692476655-9df5aeb59e13?auto=format&q=85&w=1200" 
            alt="Garden landscape" 
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-filter backdrop-brightness-90"></div>
        </div>
        
        {/* Floating elements for depth */}
        <div 
          className="absolute top-[15%] left-[10%] opacity-70"
          style={{ 
            transform: `translateY(${scrollPosition * -0.2}px)`,
          }}
        >
          <Cloud className="text-white h-16 w-16" />
        </div>
        
        <div 
          className="absolute bottom-[25%] right-[15%] opacity-70"
          style={{ 
            transform: `translateY(${scrollPosition * -0.3}px)`,
            animationDelay: '700ms'
          }}
        >
          <Leaf className="text-garden-leaf h-12 w-12" />
        </div>
        
        <div 
          className="absolute top-[60%] left-[25%] opacity-80"
          style={{ 
            transform: `translateY(${scrollPosition * -0.25}px)`,
            animationDelay: '1500ms'
          }}
        >
          <Droplet className="text-garden-leaf h-10 w-10" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <div>
            <div>
              <Leaf className="h-16 w-16 text-white mx-auto mb-6" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              <span className="block">Welcome to</span>
              <span className="text-garden-leaf">Green Groves</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto font-light">
              Your one-stop location for all gardening supplies and resources
            </p>
            
            <form onSubmit={handleSearch} className="w-full max-w-md relative mx-auto">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Search our store" 
                  className="pr-20 h-14 bg-white/95 text-black rounded-full pl-12 border-2 border-garden-leaf/50 focus-visible:ring-garden-green"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-garden-green" />
                <Button 
                  type="submit"
                  className="absolute right-1 top-1 h-12 bg-garden-green hover:bg-garden-dark-green rounded-full px-6 flex items-center justify-center"
                >
                  Search
                </Button>
              </div>
            </form>
            
            <Button 
              asChild
              className="mt-10 bg-transparent border-2 border-white text-white hover:bg-white hover:text-garden-green transition-all duration-500 rounded-full h-14 px-8 text-lg"
            >
              <a href="#about">
                Explore More
              </a>
            </Button>
          </div>
        </div>
        
        {/* Gradient overlay at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Today's Garden Inspiration - removed background */}
      <div className="section-container py-24">
        <h2 className="section-title">Today's Garden Inspiration</h2>
        
        <div className="asymmetric-grid mt-12">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted h-80 rounded-lg"></div>
            ))
          ) : (
            inspirationImages.slice(0, 4).map((item, index) => (
              <div 
                key={index} 
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={[
                      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
                      "https://images.unsplash.com/photo-1598902108854-10e335adac99",
                      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e",
                      "https://images.unsplash.com/photo-1444392061186-9fc38f84f726"
                    ][index]} 
                    alt={item.title} 
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {['Tranquil Pondside Garden', 'Cozy Bench in the Garden', 'Elegant Garden Pathway', 'Soothing Fountain Garden'][index]}
                    </h3>
                    <p className="text-sm text-white/80">
                      Get inspired by natural beauty and serenity
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Featured Products section with carousel */}
      <div className="section-container bg-garden-cream py-24">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
        
        <h2 className="section-title">Featured Products</h2>
        
        <div className="mt-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredProducts.map((product, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 pl-6">
                  <Link 
                    to={`/tools/${idx}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-2 block h-full"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img 
                        src={product.image}
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-medium text-garden-green group-hover:text-garden-dark-green transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">{product.desc}</p>
                      <div className="mt-4 w-full h-[1px] bg-gradient-to-r from-transparent via-garden-green/30 to-transparent"></div>
                      <p className="mt-4 text-garden-green font-medium flex items-center text-sm">
                        <span>Explore</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 lg:-left-12" />
            <CarouselNext className="right-0 lg:-right-12" />
          </Carousel>
        </div>
      </div>

      {/* Call to action section with Lottie animation */}
      <div className="section-container py-24 text-center bg-gradient-to-b from-garden-cream to-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            {/* Lottie animation for plant growing */}
            <lottie-player 
              src="https://assets8.lottiefiles.com/packages/lf20_jbrw3hcz.json"
              background="transparent"
              speed="0.6"
              style={{width: "180px", height: "180px"}}
              loop
              autoplay
              className="mx-auto"
            ></lottie-player>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-garden-green">
            Ready to start your garden adventure?
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Find everything you need to grow and enjoy beautiful plants at home.
          </p>
          
          <Button 
            size="lg" 
            className="bg-garden-green hover:bg-garden-dark-green text-white px-10 py-7 h-auto text-lg rounded-full shadow-lg hover:shadow-xl transition-all group"
          >
            <Sprout className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" /> 
            Get more inspiration
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
