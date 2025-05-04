
import { ItemType } from '@/utils/dataService';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchResultsProps {
  results: ItemType[];
  query: string;
  onClose: () => void;
}

const SearchResults = ({ results, query, onClose }: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-center py-8">
            No results found for "{query}". Please try a different search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Results for "{query}"</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((item, index) => (
            <Card key={index} className="garden-card">
              <div className="h-40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="garden-card-image" 
                />
              </div>
              <CardContent className="p-4">
                <h3 className="garden-card-title">{item.title}</h3>
                <p className="garden-card-description">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
