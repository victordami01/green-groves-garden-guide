
const VideosSection = () => {
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
    }
  ];

  return (
    <section id="videos" className="section-container">
      <h2 className="section-title">Educational Videos</h2>
      <p className="text-center text-lg text-muted-foreground mb-12">
        Watch and learn from our gardening experts
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, index) => (
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
    </section>
  );
};

export default VideosSection;
