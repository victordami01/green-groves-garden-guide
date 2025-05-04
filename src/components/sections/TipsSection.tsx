
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const TipsSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const tips = data?.tips || [];

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
          {tips.map((tip, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-garden-green">{tip.title}</CardTitle>
                <CardDescription>{tip.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

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
