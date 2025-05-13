
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';

const AboutSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const aboutData = data?.about;
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="section-container py-32 bg-garden-white">
      <div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">About Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16" ref={parallaxRef}>
          {/* Left column with description */}
          <div>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="clay p-8 rounded-2xl h-full flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-garden-green">
                  <span>Our Story</span>
                </h3>
                
                <p className="text-lg leading-relaxed mb-6 text-gray-700">
                  {aboutData?.description || 
                    "Founded in 2010, Green Groves has been helping gardening enthusiasts across Nigeria create beautiful and sustainable outdoor spaces. Our journey began with a simple mission: to provide high-quality gardening supplies while educating our community about sustainable gardening practices."}
                </p>
                
                <p className="text-lg leading-relaxed text-gray-700">
                  Today, we're proud to serve thousands of customers nationwide, offering a carefully curated selection of tools, plants, and educational resources for gardeners of all experience levels.
                </p>
                
                <div className="mt-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-1 bg-garden-green rounded-full"></div>
                    <span className="text-garden-green font-medium">Our Values</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-medium text-garden-green mb-2">Sustainability</h4>
                      <p className="text-sm text-gray-600">We promote eco-friendly gardening practices</p>
                      <div className="mt-2 text-garden-green"></div>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-medium text-garden-green mb-2">Quality</h4>
                      <p className="text-sm text-gray-600">We source only the best gardening supplies</p>
                      <div className="mt-2 text-garden-green"></div>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-medium text-garden-green mb-2">Community</h4>
                      <p className="text-sm text-gray-600">We support local gardening initiatives</p>
                      <div className="mt-2 text-garden-green"></div>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-medium text-garden-green mb-2">Education</h4>
                      <p className="text-sm text-gray-600">We share knowledge to help you succeed</p>
                      <div className="mt-2 text-garden-green"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right column with team members */}
          <div>
            <div className="relative h-full">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2" 
                  alt="Garden team" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-garden-dark-green/70 via-transparent to-transparent rounded-2xl"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-display font-semibold mb-6 text-white">Meet Our Team</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {["Moses", "Amina", "Uche", "Precious"].map((member, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-20 h-20 mx-auto bg-garden-light-green/20 rounded-full flex items-center justify-center mb-2 border-2 border-white/50 overflow-hidden group-hover:border-garden-leaf transition-colors">
                        <span className="text-xl font-semibold text-white">{member[0]}</span>
                      </div>
                      <div className="font-medium text-white group-hover:text-garden-leaf transition-colors">{member}</div>
                      <div className="text-xs text-white/70">Garden Expert</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
