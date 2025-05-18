
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface ContentItem {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

interface FeaturedContentProps {
  items: ContentItem[];
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ items }) => {
  // Hanya menampilkan item yang aktif
  const activeItems = items.filter(item => item.isActive);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {activeItems.map((item) => (
        <Card key={item.id} className="animate-fade-in hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-archery-darkBlue">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <a 
                href="#" 
                className="text-archery-blue hover:text-archery-darkBlue text-sm font-medium transition-colors"
              >
                Lihat detail →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedContent;
