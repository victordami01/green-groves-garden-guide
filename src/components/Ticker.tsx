
import { useEffect, useState } from 'react';

const Ticker = () => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [location, setLocation] = useState<string>('Location: unknown');

  useEffect(() => {
    // Update date and time
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      };
      
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    };

    // Update location using Geolocation API
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation(`Location: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
          },
          () => {
            setLocation('Location: unavailable');
          }
        );
      } else {
        setLocation('Location: unavailable (Geolocation not supported)');
      }
    };

    // Initial update
    updateDateTime();
    updateLocation();

    // Set up intervals for updates
    const dateTimeInterval = setInterval(updateDateTime, 1000);
    const locationInterval = setInterval(updateLocation, 60000);

    return () => {
      clearInterval(dateTimeInterval);
      clearInterval(locationInterval);
    };
  }, []);

  return (
    <div className="ticker-container">
      <div className="ticker-content">
        <span className="px-4">{currentDate}</span>
        <span className="px-4">|</span>
        <span className="px-4">{currentTime}</span>
        <span className="px-4">|</span>
        <span className="px-4">{location}</span>
        <span className="px-4">|</span>
        <span className="px-4">Welcome to Green Groves - Your Ultimate Guide to Small-Scale Gardening!</span>
      </div>
    </div>
  );
};

export default Ticker;
