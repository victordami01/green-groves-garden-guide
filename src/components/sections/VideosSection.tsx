
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface VideosSectionProps {
  fullPage?: boolean;
}

const VideosSection = ({ fullPage = false }: VideosSectionProps) => {
  // Actual gardening videos from YouTube
  const videos = [
    {
      id: "LiprYhkiP0w",
      title: "Container Gardening for Beginners",
      description: "Learn the basics of container gardening for your balcony or terrace with simple, actionable tips."
    },
    {
      id: "3IUrMtHhqWY",
      title: "Essential Gardening Tools Guide",
      description: "Discover which tools are truly necessary for starting your small-space garden and how to use them properly."
    },
    {
      id: "fs0OwEVK_5g",
      title: "Growing Herbs Indoors Year-Round",
      description: "Master the art of growing fresh herbs on your windowsill all year long, even in winter months."
    },
    {
      id: "ryISVpLEuGE",
      title: "Vertical Garden Ideas for Small Spaces",
      description: "Creative solutions for growing upward when horizontal space is limited in urban environments."
    },
    {
      id: "uhg8kecqapk",
      title: "DIY Self-Watering Containers",
      description: "Create your own self-watering containers to ensure your plants stay hydrated, even when you're away."
    },
    {
      id: "Xmx0Qh1XF9w",
      title: "Composting for Small Spaces",
      description: "Learn how to compost kitchen scraps even in the tiniest urban spaces using innovative methods."
    },
    {
      id: "o1QXCcQgofg",
      title: "Propagating Houseplants",
      description: "Double your plant collection for free by learning how to propagate common houseplants from cuttings."
    },
    {
      id: "LZhnCxG7Ehc",
      title: "Pest Control for Indoor Gardens",
      description: "Natural and effective ways to combat common pests that can damage your indoor plants."
    }
  ];

  // Show all videos on full page, otherwise just the first 4
  const displayedVideos = fullPage ? videos : videos.slice(0, 4);

  return (
    <section id="videos" className="section-container">
      <h2 className="section-title">Educational Videos</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Watch and learn from our gardening experts
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedVideos.map((video, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="aspect-video">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${video.id}`} 
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-garden-green">{video.title}</h3>
              <p className="text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {!fullPage && (
        <div className="flex justify-center mt-8">
          <Link to="/videos">
            <Button className="bg-garden-green hover:bg-garden-green/90">
              Show More Videos
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default VideosSection;
