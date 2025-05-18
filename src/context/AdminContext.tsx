
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentItem } from '@/components/FeaturedContent';

// Mock data
const initialFeaturedContent: ContentItem[] = [
  { id: 1, title: "Turnamen Nasional 2025", description: "Turnamen panahan terbesar tahun ini", isActive: true },
  { id: 2, title: "Kelas Pelatihan Pemula", description: "Belajar teknik dasar panahan", isActive: true },
  { id: 3, title: "Tips Meningkatkan Akurasi", description: "Panduan langkah demi langkah", isActive: false },
];

interface AdminContextType {
  featuredContent: ContentItem[];
  setFeaturedContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
  addContent: (title: string, description: string) => void;
  toggleContentStatus: (id: number) => void;
  deleteContent: (id: number) => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [featuredContent, setFeaturedContent] = useState<ContentItem[]>(initialFeaturedContent);

  const addContent = (title: string, description: string) => {
    const newContent: ContentItem = {
      id: Date.now(),
      title,
      description,
      isActive: true,
    };
    setFeaturedContent([...featuredContent, newContent]);
  };

  const toggleContentStatus = (id: number) => {
    setFeaturedContent(
      featuredContent.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const deleteContent = (id: number) => {
    setFeaturedContent(featuredContent.filter(item => item.id !== id));
  };

  return (
    <AdminContext.Provider value={{ 
      featuredContent, 
      setFeaturedContent, 
      addContent, 
      toggleContentStatus, 
      deleteContent 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
