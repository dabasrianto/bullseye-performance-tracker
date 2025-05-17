
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '15/05', score: 325 },
  { date: '18/05', score: 340 },
  { date: '20/05', score: 290 },
  { date: '25/05', score: 570 },
  { date: '28/05', score: 540 },
  { date: '30/05', score: 585 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-archery-darkBlue mb-2">Dashboard</h2>
          <p className="text-gray-600 max-w-3xl">
            Selamat datang di ArcherScore! Pantau performa panahan, catat skor, dan analisis perkembangan Anda secara real-time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Sesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-archery-blue">24</div>
              <p className="text-sm text-gray-500">Sesi bulan ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rata-rata Skor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-archery-orange">342.5</div>
              <p className="text-sm text-gray-500">Dari 24 sesi terakhir</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>X-Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-archery-darkBlue">45</div>
              <p className="text-sm text-gray-500">Total bulan ini</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Perkembangan Skor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6, fill: "#1e40af" }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
