
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

// Define interfaces for data structure
interface GardenItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface GardenData {
  tools?: GardenItem[];
  essentials?: GardenItem[];
  pots?: GardenItem[];
  accessories?: GardenItem[];
}

interface ToolsSectionProps {
  fullPage?: boolean;
}

// Mock data for fallback
const mockData: GardenData = {
  tools: [
    { id: '1', title: 'Trowel', description: 'Small hand tool for digging' },
    { id: '2', title: 'Pruner', description: 'For cutting branches' },
    { id: '3', title: 'Spade', description: 'For heavy digging' },
    { id: '4', title: 'Rake', description: 'For gathering leaves' },
  ],
  essentials: [
    { id: '1', title: 'Soil', description: 'Nutrient-rich potting soil' },
    { id: '2', title: 'Fertilizer', description: 'Organic plant food' },
    { id: '3', title: 'Seeds', description: 'Vegetable seed pack' },
    { id: '4', title: 'Watering Can', description: 'For gentle watering' },
  ],
  pots: [
    { id: '1', title: 'Clay Pot', description: '10-inch terracotta pot' },
    { id: '2', title: 'Plastic Planter', description: 'Lightweight planter' },
    { id: '3', title: 'Ceramic Pot', description: 'Decorative ceramic pot' },
    { id: '4', title: 'Hanging Basket', description: 'For trailing plants' },
  ],
  accessories: [
    { id: '1', title: 'Gloves', description: 'Durable gardening gloves' },
    { id: '2', title: 'Plant Labels', description: 'Wooden plant markers' },
    { id: '3', title: 'Trellis', description: 'For climbing plants' },
    { id: '4', title: 'Kneeling Pad', description: 'Comfortable kneeling pad' },
  ],
};

// Image arrays for each category
const imageArrays = {
  tools: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
    'https://images.unsplash.com/photo-1680124744736-859f16257ef0',
    'https://iili.io/3Sd5IWl.jpg',
    'https://images.unsplash.com/photo-1599277100479-3252d492a19a?auto=format&q=80&w=400',
  ],
  essentials: [
   'https://iili.io/3Sd5obf.webp',
    'https://iili.io/3Sd5BJn.webp',
    'https://iili.io/3Sd5Klt.jpg',
    
     'https://iili.io/3SdRtl1.jpg',
  ],
  pots: [
    'https://iili.io/3SdRmHg.webp',
    'https://iili.io/3Sd52iN.jpg',
    'https://images.unsplash.com/photo-1693025533886-2c74457068f0',
    'https://iili.io/3Sd5EWQ.jpg',
    
    
    
  ],
  accessories: [
    'https://images.unsplash.com/photo-1526397751294-331021109fbd',
    'https://gardensthatmatter.com/wp-content/uploads/2016/06/Plant-Markers-16056-640-Copy.jpg',
    'https://ogden_images.s3.amazonaws.com/www.motherearthnews.com/images/2014/06/11170335/AdobeStock_568615329-1100x733.jpg',
    
    'https://www.lighttrybe.ng/wp-content/uploads/2024/05/LED-Solar-Ground-Lights-For-Lawn-modern-Pathway-lights.jpg'
  ],
};

// Simple function to get unique image based on index and category
const getOptimizedImage = (index: number, category: string): string => {
  const images = imageArrays[category as keyof typeof imageArrays] || imageArrays.tools;
  return images[index % images.length] || 'https://via.placeholder.com/400';
};

const ToolsSection = ({ fullPage = false }: ToolsSectionProps) => {
  const { data, isLoading, error } = useQuery<GardenData>({
    queryKey: ['gardenData'],
    queryFn: async () => {
      const result = await fetchGardenData();
      console.log('Raw fetchGardenData result:', result);
      if (!result || typeof result !== 'object') {
        console.warn('fetchGardenData returned invalid data:', result);
        return mockData; // Use mock data as fallback
      }
      return result;
    },
  });

  // Function to slice data based on whether we're on full page or home page
  const getDisplayedItems = (items: unknown): GardenItem[] => {
    if (!Array.isArray(items)) {
      console.warn('Invalid items array:', items);
      return [];
    }
    // Less strict validation: allow items with partial data
    const validItems = items.map((item, index): GardenItem => ({
      id: item?.id?.toString() || `${index}`,
      title: item?.title?.toString() || 'Untitled',
      description: item?.description?.toString() || 'No description available',
      image: item?.image?.toString(),
    }));
    return fullPage ? validItems : validItems.slice(0, 4);
  };

  // Memoize displayed items to prevent unnecessary re-renders
  const displayedData = useMemo(
    () => ({
      tools: getDisplayedItems(data?.tools),
      essentials: getDisplayedItems(data?.essentials),
      pots: getDisplayedItems(data?.pots),
      accessories: getDisplayedItems(data?.accessories),
    }),
    [data, fullPage]
  );

  // Render error state
  if (error) {
    console.error('Error fetching garden data:', error);
    return (
      <section id="tools" className="section-container">
        <h2 className="section-title">Tools & Essentials</h2>
        <p className="text-center text-lg text-red-600">
          Failed to load garden data. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section id="tools" className="section-container">
      <h2 className="section-title">Tools & Essentials</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Everything you need for your gardening journey
      </p>

      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8" aria-label="Garden tools categories">
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="essentials">Essentials</TabsTrigger>
          <TabsTrigger value="pots">Pots & Containers</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        {(['tools', 'essentials', 'pots', 'accessories'] as const).map((category) => (
          <TabsContent key={category} value={category}>
            {isLoading ? (
              <div className="card-grid">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted h-64 rounded-lg" />
                ))}
              </div>
            ) : displayedData[category].length === 0 ? (
              <p className="text-center text-muted-foreground">
                No {category} available at the moment.
              </p>
            ) : (
              <div className="card-grid">
                {displayedData[category].map((item, index) => (
                  <Link
                    to={`/${category}/${index}`}
                    key={item.id}
                    className="garden-card-link"
                    aria-label={`View details for ${item.title}`}
                  >
                    <Card className="garden-card transition-transform hover:scale-[1.02]">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={getOptimizedImage(index, category)}
                          alt={item.title}
                          className="garden-card-image"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="garden-card-title">{item.title}</h3>
                        <p className="garden-card-description">{item.description}</p>
                        <Button
                          variant="outline"
                          className="w-full mt-4 text-garden-green border-garden-green hover:bg-garden-green/10"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
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
