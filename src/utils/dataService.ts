
import gardenData from '../data/gardenData.json';

export type ItemType = {
  title: string;
  description?: string;
  image: string;
};

export type AboutType = {
  description: string;
};

export type GardenDataType = {
  inspiration: ItemType[];
  tips: ItemType[];
  products: ItemType[];
  tools: ItemType[];
  essentials: ItemType[];
  pots: ItemType[];
  accessories: ItemType[];
  books: ItemType[];
  about: AboutType;
};

export const fetchGardenData = (): Promise<GardenDataType> => {
  // In a real application, this would fetch from an API
  // For now, we'll return the imported data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(gardenData as unknown as GardenDataType);
    }, 100);
  });
};

export const searchGardenData = (query: string): ItemType[] => {
  const data = gardenData as unknown as GardenDataType;
  const searchResults: ItemType[] = [];

  // Convert query to lowercase for case-insensitive search
  const lowerQuery = query.toLowerCase();
  
  // Search through each section
  const sections = ['tips', 'products', 'tools', 'essentials', 'pots', 'accessories', 'books'] as const;
  
  sections.forEach(section => {
    const items = data[section];
    
    if (items) {
      items.forEach((item: ItemType) => {
        // Check if the title or description contains the query
        if (
          item.title.toLowerCase().includes(lowerQuery) || 
          (item.description && item.description.toLowerCase().includes(lowerQuery))
        ) {
          searchResults.push(item);
        }
      });
    }
  });
  
  return searchResults;
};
