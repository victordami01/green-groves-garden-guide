
import { useQuery } from '@tanstack/react-query';
import { fetchGardenData } from '@/utils/dataService';

const AboutSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['gardenData'],
    queryFn: fetchGardenData,
  });

  const aboutData = data?.about;

  return (
    <section id="about" className="section-container">
      <h2 className="section-title">About Us</h2>
      
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            <p className="text-lg mb-6">{aboutData?.description}</p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-garden-green">Meet Our Team</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Moses", "Amina", "Uche", "Precious"].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto bg-garden-green/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-xl font-semibold text-garden-green">{member[0]}</span>
                    </div>
                    <div className="font-medium">{member}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
