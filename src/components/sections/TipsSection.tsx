
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TipsSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const [showMore, setShowMore] = useState(false);
  const tips = data?.tips || [];
  const displayedTips = showMore ? tips : tips.slice(0, 4);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Garden tip specific images
  const getTipImage = (imageUrl: string, index: number) => {
    if (!imageUrl) return '';
    
    const tipImages = [
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2',
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
      'https://images.unsplash.com/photo-1624720114708-0cbd6ee41f4e',
      'https://images.unsplash.com/photo-1557708962-8828085a2c48'
    ];
    
    return tipImages[index % tipImages.length];
  };

  return (
    <section id="tips" className="section-container">
      <h2 className="section-title">Gardening Tips</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Expert advice and techniques for your small-scale garden
      </p>

      {isLoading ? (
        <div className="card-grid">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted"></div>
              <CardHeader>
                <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="card-grid">
          {displayedTips.map((tip, index) => (
            <Link to={`/tips/${index}`} key={index} className="garden-card-link">
              <Card key={index} className="overflow-hidden transition-transform hover:scale-[1.02]">
                <div className="relative h-48">
                  <img
                    src={getTipImage(tip.image, index)}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-garden-green">{tip.title}</CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full text-garden-green border-garden-green hover:bg-garden-green/10">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {tips.length > 4 && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={toggleShowMore}
            className="flex items-center gap-2 bg-garden-green hover:bg-garden-green/90"
          >
            {showMore ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Show More <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        </div>
      )}

      <div className="flex justify-center">
        <Link to="/tips">
          <Button 
            variant="outline" 
            className="mt-4 border-garden-green text-garden-green hover:bg-garden-green/10"
          >
            Browse All Tips
          </Button>
        </Link>
      </div>

      <div className="mt-12 bg-green-50 p-6 rounded-lg border border-garden-green/20">
        <h3 className="text-xl font-semibold mb-4 text-garden-green">Seasonal Gardening Tip</h3>
        <p className="text-gray-700">
          Plant herbs like basil, mint, and parsley in small containers on your windowsill 
          for fresh flavors year-round. Make sure they receive at least 6 hours of sunlight daily 
          and water when the soil feels dry to the touch.
        </p>
      </div>
    </section>
  );
};

export default TipsSection;
