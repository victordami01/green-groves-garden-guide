
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BooksSectionProps {
  fullPage?: boolean;
}

const BooksSection = ({ fullPage = false }: BooksSectionProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const books = data?.books || [];
  const displayedBooks = fullPage ? books : books.slice(0, 4);

  return (
    <section id="books" className="section-container">
      <h2 className="section-title">Related Books</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Expand your gardening knowledge with these recommended reads
      </p>

      {isLoading ? (
        <div className="card-grid">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted h-64 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="card-grid">
          {displayedBooks.map((book, index) => (
            <Card key={index} className="garden-card">
              <div className="h-48 overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="garden-card-image" 
                />
              </div>
              <CardContent className="p-4">
                <h3 className="garden-card-title">{book.title}</h3>
                <p className="garden-card-description mb-4">{book.description}</p>
                <Button variant="outline" className="w-full text-garden-green border-garden-green hover:bg-garden-green/10">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!fullPage && books.length > 4 && (
        <div className="flex justify-center mt-8">
          <Link to="/books">
            <Button className="bg-garden-green hover:bg-garden-green/90">
              Show More Books
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default BooksSection;
