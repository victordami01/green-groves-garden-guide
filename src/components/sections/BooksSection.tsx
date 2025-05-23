
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface BooksSectionProps {
  fullPage?: boolean;
}

const BooksSection = ({ fullPage = false }: BooksSectionProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const [showAll, setShowAll] = useState(false);
  const books = data?.books || [];
  
  // Show more books if showAll is true, otherwise show only 4
  const displayedBooks = fullPage 
    ? books 
    : showAll 
      ? books 
      : books.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // Garden book specific images
  const getBookImage = (imageUrl: string, index: number) => {
    if (!imageUrl) return '';
    
    const bookImages = [
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      'https://images.unsplash.com/photo-1598900438157-e5d96e6f0cf6'
    ];
    
    return bookImages[index % bookImages.length];
  };

  // Generate Google Books search URL based on book title
  const getGoogleBooksUrl = (title: string) => {
    const searchQuery = encodeURIComponent(title);
    return `https://www.google.com/search?tbm=bks&q=${searchQuery}`;
  };

  return (
    <section id="books" className="section-container">
      <h2 className="section-title">Related Books</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Expand your gardening knowledge with these recommended reads
      </p>

      {isLoading ? (
        <div className="card-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted h-64 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="card-grid">
          {displayedBooks.map((book, index) => (
            <Card key={index} className="garden-card transition-transform hover:scale-[1.02]">
              <div className="h-48 overflow-hidden">
                <img 
                  src={getBookImage(book.image, index)} 
                  alt={book.title} 
                  className="garden-card-image" 
                />
              </div>
              <CardContent className="p-4">
                <h3 className="garden-card-title">{book.title}</h3>
                <p className="garden-card-description mb-4">{book.description}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" className="w-full text-garden-green border-garden-green hover:bg-garden-green/10" asChild>
                    <Link to={`/books/${index}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" className="text-garden-green border-garden-green hover:bg-garden-green/10" asChild>
                    <a href={getGoogleBooksUrl(book.title)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!fullPage && books.length > 4 && (
        <div className="flex justify-center mt-8">
          {showAll ? (
            <Button 
              onClick={toggleShowAll}
              className="bg-garden-green hover:bg-garden-green/90 flex items-center space-x-2"
            >
              Show Less
            </Button>
          ) : (
            <Button 
              onClick={toggleShowAll}
              className="bg-garden-green hover:bg-garden-green/90 flex items-center space-x-2"
            >
              Show More Books <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {!fullPage && (
        <div className="flex justify-center mt-4">
          <Link to="/books">
            <Button 
              variant="outline" 
              className="mt-4 border-garden-green text-garden-green hover:bg-garden-green/10"
            >
              Browse All Books
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BooksSection;
