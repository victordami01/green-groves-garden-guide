import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shovel } from 'lucide-react';

const ToolsSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

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
              {data?.tools.map((tool, index) => (
                <Card key={index} className="garden-card">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tool.image} 
                      alt={tool.title} 
                      className="garden-card-image" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="garden-card-title">{tool.title}</h3>
                    <p className="garden-card-description">{tool.description}</p>
                  </CardContent>
                </Card>
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
              {data?.essentials.map((essential, index) => (
                <Card key={index} className="garden-card">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={essential.image} 
                      alt={essential.title} 
                      className="garden-card-image" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="garden-card-title">{essential.title}</h3>
                    <p className="garden-card-description">{essential.description}</p>
                  </CardContent>
                </Card>
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
              {data?.pots.map((pot, index) => (
                <Card key={index} className="garden-card">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={pot.image} 
                      alt={pot.title} 
                      className="garden-card-image" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="garden-card-title">{pot.title}</h3>
                    <p className="garden-card-description">{pot.description}</p>
                  </CardContent>
                </Card>
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
              {data?.accessories.map((accessory, index) => (
                <Card key={index} className="garden-card">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={accessory.image} 
                      alt={accessory.title} 
                      className="garden-card-image" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="garden-card-title">{accessory.title}</h3>
                    <p className="garden-card-description">{accessory.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ToolsSection;
