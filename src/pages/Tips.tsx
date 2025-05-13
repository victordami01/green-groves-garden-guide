
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Tips = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const tips = data?.tips || [];

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
    <Layout>
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-6">
          <Link to="/#tips">
            <Button variant="ghost" className="flex items-center text-garden-green">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-garden-green mb-8">Gardening Tips</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </CardHeader>
              </Card>
            ))
          ) : (
            tips.map((tip, index) => (
              <Link to={`/tips/${index}`} key={index} className="garden-card-link">
                <Card key={index} className="overflow-hidden transition-transform hover:scale-[1.02] h-full">
                  <div className="relative h-48">
                    <img
                      src={getTipImage(tip.image, index)}
                      alt={tip.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
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
            ))
          )}
        </div>

        <div className="bg-green-50 p-8 rounded-lg border border-garden-green/20 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-garden-green">Seasonal Gardening Tips</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Spring:</strong> Prepare garden beds by adding compost and organic matter before planting. Start planting cool-season vegetables like lettuce and peas.
            </p>
            <p className="text-gray-700">
              <strong>Summer:</strong> Water deeply but less frequently to encourage deep root growth. Mulch around plants to conserve moisture and control weeds.
            </p>
            <p className="text-gray-700">
              <strong>Fall:</strong> Plant spring-flowering bulbs and divide overcrowded perennials. Clean up fallen leaves to prevent disease.
            </p>
            <p className="text-gray-700">
              <strong>Winter:</strong> Protect sensitive plants from frost with covers. Plan next year's garden and order seeds early for best selection.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tips;
