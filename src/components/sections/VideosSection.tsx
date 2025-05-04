
const VideosSection = () => {
  // Mock videos, in a real application these would be fetched from an API or data file
  const videos = [
    {
      id: "C0DPdy98e4c",
      title: "Container Gardening for Beginners",
      description: "Learn the basics of container gardening for your balcony or terrace."
    },
    {
      id: "DSUlj1Lo7MA",
      title: "Essential Gardening Tools Guide",
      description: "Discover which tools you need to start your small-space garden."
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
