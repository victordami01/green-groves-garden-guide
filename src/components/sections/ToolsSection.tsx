
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shovel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ToolsSectionProps {
  fullPage?: boolean;
}

const ToolsSection = ({ fullPage = false }: ToolsSectionProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  // Function to slice data based on whether we're on full page or home page
  const getDisplayedItems = (items: any[]) => {
    if (!items) return [];
    return fullPage ? items : items.slice(0, 4);
  };

  // Garden-specific images
  const getOptimizedImage = (imageUrl: string, category: string) => {
    if (!imageUrl) return '';
    
    // Category-specific image collections
    const toolImages = [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
      'https://images.unsplash.com/photo-1603436326446-45134cd956af',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b'
    ];
    
    const essentialImages = [
      'https://images.unsplash.com/photo-1583608564770-faf367ffb0cc',
      'https://images.unsplash.com/photo-1560105958-1e5c4bc6d47b',
      'https://images.unsplash.com/photo-1527863280617-15596f92e5c8'
    ];
    
    const potImages = [
      'https://images.unsplash.com/photo-1581579438747-e8dc1932f8a2',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411'
    ];
    
    const accessoryImages = [
      'https://images.unsplash.com/photo-1526397751294-331021109fbd',
      'https://images.unsplash.com/photo-1534133925158-a86c7e4fe80a',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3'
    ];
    
    // Generate a consistent but random index based on the imageUrl
    const hashCode = imageUrl.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    let imageArray;
    switch(category) {
      case 'tools':
        imageArray = toolImages;
        break;
      case 'essentials':
        imageArray = essentialImages;
        break;
      case 'pots':
        imageArray = potImages;
        break;
      case 'accessories':
        imageArray = accessoryImages;
        break;
      default:
        imageArray = toolImages;
    }
    
    const index = Math.abs(hashCode) % imageArray.length;
    return imageArray[index];
  };

  return (
    <section id="tools" className="section-container">
      <h2 className="section-title">Tools & Essentials</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Everything you need for your gardening journey
      </p>

      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="essentials">Essentials</TabsTrigger>
          <TabsTrigger value="pots">Pots & Containers</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
        
        {/* Tools Tab */}
        <TabsContent value="tools">
          {isLoading ? (
            <div className="card-grid">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse bg-muted h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {getDisplayedItems(data?.tools).map((tool, index) => (
                <Link to={`/tools/${index}`} key={index} className="garden-card-link">
                  <Card className="garden-card transition-transform hover:scale-[1.02]">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={getOptimizedImage(tool.image, 'tools')} 
                        alt={tool.title} 
                        className="garden-card-image" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="garden-card-title">{tool.title}</h3>
                      <p className="garden-card-description">{tool.description}</p>
                      <Button variant="outline" className="w-full mt-4 text-garden-green border-garden-green hover:bg-garden-green/10">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Essentials Tab */}
        <TabsContent value="essentials">
          {isLoading ? (
            <div className="card-grid">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse bg-muted h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {getDisplayedItems(data?.essentials).map((essential, index) => (
                <Link to={`/essentials/${index}`} key={index} className="garden-card-link">
                  <Card className="garden-card transition-transform hover:scale-[1.02]">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={getOptimizedImage(essential.image, 'essentials')} 
                        alt={essential.title} 
                        className="garden-card-image" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="garden-card-title">{essential.title}</h3>
                      <p className="garden-card-description">{essential.description}</p>
                      <Button variant="outline" className="w-full mt-4 text-garden-green border-garden-green hover:bg-garden-green/10">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Pots & Containers Tab */}
        <TabsContent value="pots">
          {isLoading ? (
            <div className="card-grid">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse bg-muted h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {getDisplayedItems(data?.pots).map((pot, index) => (
                <Link to={`/pots/${index}`} key={index} className="garden-card-link">
                  <Card className="garden-card transition-transform hover:scale-[1.02]">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={getOptimizedImage(pot.image, 'pots')} 
                        alt={pot.title} 
                        className="garden-card-image" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="garden-card-title">{pot.title}</h3>
                      <p className="garden-card-description">{pot.description}</p>
                      <Button variant="outline" className="w-full mt-4 text-garden-green border-garden-green hover:bg-garden-green/10">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Accessories Tab */}
        <TabsContent value="accessories">
          {isLoading ? (
            <div className="card-grid">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse bg-muted h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {getDisplayedItems(data?.accessories).map((accessory, index) => (
                <Link to={`/accessories/${index}`} key={index} className="garden-card-link">
                  <Card className="garden-card transition-transform hover:scale-[1.02]">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={getOptimizedImage(accessory.image, 'accessories')} 
                        alt={accessory.title} 
                        className="garden-card-image" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="garden-card-title">{accessory.title}</h3>
                      <p className="garden-card-description">{accessory.description}</p>
                      <Button variant="outline" className="w-full mt-4 text-garden-green border-garden-green hover:bg-garden-green/10">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {!fullPage && (
        <div className="flex justify-center mt-8">
          <Link to="/tools">
            <Button className="bg-garden-green hover:bg-garden-green/90">
              Show All Tools & Essentials
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ToolsSection;
