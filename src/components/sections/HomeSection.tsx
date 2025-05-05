
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WateringCan, Trowel, Leaf, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const inspirationImages = data?.inspiration || [];

  return (
    <section id="home" className="relative">
      {/* Hero section with background image */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/994dd6cb-cbae-4667-b755-ab3abf4e6db5.png" 
            alt="Woman in greenhouse" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Welcome to Green Groves
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
            Your one-stop location for all gardening supplies and resources
          </p>
          
          <div className="w-full max-w-md relative">
            <Input 
              type="text" 
              placeholder="Search our store" 
              className="pr-20 h-12 bg-white/95 text-black"
            />
            <Button 
              className="absolute right-0 top-0 h-12 bg-green-500 hover:bg-green-600 px-6"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Today's Garden Inspiration */}
      <div className="section-container py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Garden Inspiration</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted h-48 rounded-lg"></div>
            ))
          ) : (
            inspirationImages.slice(0, 4).map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
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
      <div className="section-container bg-gray-50 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Gardening Gloves', desc: 'Protect your hands with these durable gloves', icon: 'gloves' },
            { title: 'Trowel and Pruner Set', desc: 'The set includes a trowel, pruner and more', icon: 'trowel' },
            { title: 'Plant Mister', desc: 'Keep your houseplants happy and moist with this fine mist sprayer', icon: 'sprayer' },
            { title: 'Macrame Plant Hanger', desc: 'Add a natural touch to your indoor garden with a macrame plant hanger', icon: 'hanger' },
            { title: 'Soil Moisture Meter', desc: 'Avoid overwatering your plants with this handy tool', icon: 'meter' }
          ].map((product, idx) => (
            <Link 
              to={`/tools/${idx}`} 
              key={idx} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={`https://images.unsplash.com/photo-${1590080600367 + idx}-9732ed56eeff`} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to action section */}
      <div className="section-container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start your garden adventure?</h2>
        <p className="text-gray-600 mb-8">Find everything you need to grow and enjoy beautiful plants at home.</p>
        <Button 
          size="lg" 
          className="bg-green-500 hover:bg-green-600"
        >
          Get more inspiration
        </Button>
      </div>
    </section>
  );
};

export default HomeSection;
