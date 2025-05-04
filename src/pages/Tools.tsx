
import { useState } from 'react';
import Layout from '@/components/Layout';
import ToolsSection from '@/components/sections/ToolsSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tools = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-6">
          <Link to="/#tools">
            <Button variant="ghost" className="flex items-center text-garden-green">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-garden-green mb-8">Tools & Essentials</h1>
        
        <ToolsSection fullPage={true} />
      </div>
    </Layout>
  );
};

export default Tools;
