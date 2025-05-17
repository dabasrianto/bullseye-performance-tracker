
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockScoreData = [
  { date: '01/05', score: 520 },
  { date: '05/05', score: 540 },
  { date: '10/05', score: 535 },
  { date: '15/05', score: 555 },
  { date: '20/05', score: 570 },
  { date: '25/05', score: 560 },
];

const mockDistributionData = [
  { name: '10', value: 12 },
  { name: '9', value: 18 },
  { name: 'X', value: 10 },
  { name: '8', value: 8 },
  { name: '7', value: 5 },
  { name: '<7', value: 3 },
];

const COLORS = ['#F97316', '#0EA5E9', '#FDBA74', '#7DD3FC', '#0369A1', '#C2410C'];

const StatsSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-archery-darkBlue">Perkembangan Skor</CardTitle>
          <CardDescription>6 sesi terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockScoreData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[500, 'dataMax + 20']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderColor: 'rgb(14 165 233)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="rgb(14 165 233)" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-archery-darkBlue">Distribusi Skor</CardTitle>
          <CardDescription>Persentase setiap skor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, `Jumlah ${name}`]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderColor: 'rgb(14 165 233)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-archery-darkBlue">Rekomendasi</CardTitle>
          <CardDescription>Berdasarkan pola panahan</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-2 w-8 h-8 rounded-full bg-archery-blue flex items-center justify-center text-white">1</div>
              <div>
                <h4 className="font-bold">Pertahankan Konsistensi</h4>
                <p className="text-sm text-gray-600">Skor Anda menunjukkan konsistensi yang baik. Fokus pada latihan teknik dasar.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 w-8 h-8 rounded-full bg-archery-blue flex items-center justify-center text-white">2</div>
              <div>
                <h4 className="font-bold">Tingkatkan X-Count</h4>
                <p className="text-sm text-gray-600">Cobalah untuk berlatih pada jarak yang lebih dekat untuk meningkatkan akurasi di pusat.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 w-8 h-8 rounded-full bg-archery-blue flex items-center justify-center text-white">3</div>
              <div>
                <h4 className="font-bold">Kurangi Panah di Bawah 7</h4>
                <p className="text-sm text-gray-600">Fokus pada stabilitas untuk mengurangi panah yang bernilai rendah.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSummary;
