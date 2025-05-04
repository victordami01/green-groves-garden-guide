
import { useState } from 'react';
import Layout from '@/components/Layout';
import BooksSection from '@/components/sections/BooksSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Books = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-6">
          <Link to="/#books">
            <Button variant="ghost" className="flex items-center text-garden-green">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-garden-green mb-8">Related Books</h1>
        
        <BooksSection fullPage={true} />
      </div>
    </Layout>
  );
};

export default Books;
