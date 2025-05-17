
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const scoreData = [
  { date: '15/05', score: 325 },
  { date: '18/05', score: 340 },
  { date: '20/05', score: 290 },
  { date: '25/05', score: 570 },
  { date: '28/05', score: 540 },
  { date: '30/05', score: 585 },
];

const distributionData = [
  { score: '10', count: 24 },
  { score: '9', count: 32 },
  { score: '8', count: 18 },
  { score: '7', count: 12 },
  { score: '6', count: 8 },
  { score: '5', count: 4 },
  { score: '4', count: 2 },
  { score: '3', count: 0 },
  { score: '2', count: 0 },
  { score: '1', count: 0 },
  { score: 'M', count: 0 },
];

const sectorData = [
  { name: 'Top', value: 25 },
  { name: 'Right', value: 20 },
  { name: 'Bottom', value: 15 },
  { name: 'Left', value: 40 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analisis = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-archery-darkBlue mb-2">Analisis Performa</h2>
          <p className="text-gray-600 max-w-3xl">
            Analisa data performa panahan Anda untuk meningkatkan akurasi dan konsistensi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Periode</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="1month">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1week">1 Minggu</SelectItem>
                  <SelectItem value="1month">1 Bulan</SelectItem>
                  <SelectItem value="3months">3 Bulan</SelectItem>
                  <SelectItem value="6months">6 Bulan</SelectItem>
                  <SelectItem value="1year">1 Tahun</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jenis Busur</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jenis Busur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="recurve">Recurve</SelectItem>
                  <SelectItem value="compound">Compound</SelectItem>
                  <SelectItem value="barebow">Barebow</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jenis Round</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jenis Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="wa720">WA 720</SelectItem>
                  <SelectItem value="wa1440">WA 1440</SelectItem>
                  <SelectItem value="indoor18">Indoor 18m</SelectItem>
                  <SelectItem value="field">Field</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jarak</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jarak" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="18m">18m</SelectItem>
                  <SelectItem value="30m">30m</SelectItem>
                  <SelectItem value="50m">50m</SelectItem>
                  <SelectItem value="70m">70m</SelectItem>
                  <SelectItem value="90m">90m</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid grid-cols-3 w-[400px] mb-6">
            <TabsTrigger value="trends">Tren</TabsTrigger>
            <TabsTrigger value="distribution">Distribusi</TabsTrigger>
            <TabsTrigger value="grouping">Grouping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Tren Skor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#2563eb" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6, fill: "#1e40af" }} 
                        name="Skor Total"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Skor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="score" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#f97316" name="Jumlah Arrow" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="grouping" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Skor per Sektor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statistik Grouping</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Rata-rata Group Size</p>
                      <p className="text-2xl font-bold text-archery-blue">12.5 cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jarak Terjauh dari Pusat</p>
                      <p className="text-xl font-bold text-archery-orange">18.2 cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Standard Deviation</p>
                      <p className="text-xl font-bold">3.7 cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Konsistensi</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-archery-blue h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-right text-sm mt-1">75%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analisis;
