
import { useEffect, useState } from 'react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Retrieve visitor count from localStorage
    const storedCount = localStorage.getItem('greenGrovesVisitorCount');
    let count = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Increment visitor count
    count += 1;
    
    // Update localStorage and state
    localStorage.setItem('greenGrovesVisitorCount', count.toString());
    setVisitorCount(count);
  }, []);

  return (
    <div className="visitor-counter bg-garden-white border-b border-gray-200 py-1 px-4 text-right text-sm text-gray-600">
      <span>👥 Visitors today: {visitorCount}</span>
    </div>
  );
};

export default VisitorCounter;
