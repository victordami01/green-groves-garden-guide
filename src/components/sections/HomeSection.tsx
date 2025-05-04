
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Button } from '@/components/ui/button';

const HomeSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const inspirationImages = data?.inspiration || [];

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16">
      {/* Hero section */}
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-garden-green">
              Grow Your Perfect Garden
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Discover the joy of gardening in small spaces with Green Groves. 
              Whether you have a balcony, terrace, or small yard, we'll help 
              you create a thriving garden oasis.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-garden-green hover:bg-garden-green/90 text-white"
                asChild
              >
                <a href="#tips">Get Started</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-garden-green text-garden-green hover:bg-garden-green/10"
                asChild
              >
                <a href="#tools">Explore Tools</a>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
            {isLoading ? (
              <div className="animate-pulse bg-muted w-full h-full rounded-2xl"></div>
            ) : (
              <img 
                src={inspirationImages[0]?.image || "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"} 
                alt="Garden inspiration" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="section-container bg-secondary/30 py-16 mt-16 rounded-lg">
        <h2 className="section-title">Why Choose Green Groves</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-garden-green">Expert Gardening Tips</h3>
            <p className="text-gray-600">
              Learn practical techniques for small-space gardening from our team of experts.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-garden-green">Tool & Accessory Guides</h3>
            <p className="text-gray-600">
              Discover the best tools and accessories for your gardening needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-garden-green">Community Support</h3>
            <p className="text-gray-600">
              Join a community of passionate gardeners to share tips and inspiration.
            </p>
          </div>
        </div>
      </div>

      {/* Inspiration gallery */}
      {!isLoading && inspirationImages.length > 1 && (
        <div className="section-container mt-16">
          <h2 className="section-title">Garden Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {inspirationImages.map((item, index) => (
              <div key={index} className="garden-card h-64">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeSection;
