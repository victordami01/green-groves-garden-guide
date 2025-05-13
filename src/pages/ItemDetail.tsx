
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { fetchGardenData, ItemType } from '@/utils/dataService';
import { useQuery } from '@tanstack/react-query';

type ItemDetailParams = {
  itemType: string;
  itemIndex: string;
};

const ItemDetail = () => {
  const { itemType, itemIndex } = useParams<ItemDetailParams>();
  const [item, setItem] = useState<ItemType | null>(null);
  const [backLink, setBackLink] = useState('/#tools');
  const [pageTitle, setPageTitle] = useState('Item Detail');

  const { data } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  useEffect(() => {
    if (data && itemType && itemIndex) {
      const index = parseInt(itemIndex);
      
      // Get the item from the appropriate array
      if (itemType === 'tools' && data.tools && data.tools[index]) {
        setItem(data.tools[index]);
        setBackLink('/#tools');
        setPageTitle('Tool Detail');
      } else if (itemType === 'books' && data.books && data.books[index]) {
        setItem(data.books[index]);
        setBackLink('/#books');
        setPageTitle('Book Detail');
      } else if (itemType === 'tips' && data.tips && data.tips[index]) {
        setItem(data.tips[index]);
        setBackLink('/#tips');
        setPageTitle('Gardening Tip');
      } else if (itemType === 'essentials' && data.essentials && data.essentials[index]) {
        setItem(data.essentials[index]);
        setBackLink('/#tools');
        setPageTitle('Garden Essential');
      } else if (itemType === 'pots' && data.pots && data.pots[index]) {
        setItem(data.pots[index]);
        setBackLink('/#tools');
        setPageTitle('Pot & Container');
      } else if (itemType === 'accessories' && data.accessories && data.accessories[index]) {
        setItem(data.accessories[index]);
        setBackLink('/#tools');
        setPageTitle('Accessory Detail');
      }
    }
  }, [data, itemType, itemIndex]);

  // Get higher quality images - replace with better garden images
  const getOptimizedImage = (imageUrl: string) => {
    if (!imageUrl) return '';
    
    // Garden-specific images
    const gardenImages = [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae', // garden tools
      'https://images.unsplash.com/photo-1617576683096-00fc8eac7da8', // plants in pots
      'https://images.unsplash.com/photo-1603436326446-45134cd956af', // gardening gloves
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90', // indoor plants
      'https://images.unsplash.com/photo-1526397751294-331021109fbd', // garden accessories
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e', // gardening books
      'https://images.unsplash.com/photo-1598900438157-e5d96e6f0cf6', // garden planner
      'https://images.unsplash.com/photo-1624720114708-0cbd6ee41f4e', // pots
      'https://images.unsplash.com/photo-1504633573191-2232e7529874'  // succulent
    ];
    
    // Generate a consistent but random index based on the imageUrl
    const hashCode = imageUrl.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const index = Math.abs(hashCode) % gardenImages.length;
    return gardenImages[index];
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Link to={backLink}>
            <Button variant="ghost" className="flex items-center text-garden-green">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {pageTitle === 'Book Detail' ? 'Books' : pageTitle === 'Gardening Tip' ? 'Tips' : 'Tools'}
            </Button>
          </Link>
        </div>
        
        {item ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={getOptimizedImage(item.image)} 
                alt={item.title} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-garden-green mb-4">{item.title}</h1>
              <div className="bg-garden-green/5 p-6 rounded-lg mb-6">
                <p className="text-lg">{item.description}</p>
              </div>

              {itemType === 'tools' || itemType === 'essentials' || itemType === 'pots' || itemType === 'accessories' ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-garden-green">Features:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Premium quality materials for durability</li>
                    <li>Ergonomic design for comfortable use</li>
                    <li>Perfect for container and small-space gardening</li>
                    <li>Easy to clean and maintain</li>
                  </ul>
                  
                  <Button className="mt-6 bg-garden-green hover:bg-garden-green/90">
                    Add to Shopping List
                  </Button>
                </div>
              ) : itemType === 'books' ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-garden-green">Book Details:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Publication: 2025</li>
                    <li>Pages: 248</li>
                    <li>Format: Paperback & Digital</li>
                    <li>Includes detailed illustrations and step-by-step guides</li>
                  </ul>
                  
                  <Button className="mt-6 bg-garden-green hover:bg-garden-green/90">
                    Add to Reading List
                  </Button>
                </div>
              ) : (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-garden-green mb-4">Related Products:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="text-garden-green border-garden-green hover:bg-garden-green/10">
                      View Related Tools
                    </Button>
                    <Button variant="outline" className="text-garden-green border-garden-green hover:bg-garden-green/10">
                      View Related Books
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg">Loading item details...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ItemDetail;
