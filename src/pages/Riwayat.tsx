
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, FileDown, ArrowDown } from "lucide-react";

const mockSessions = [
  {
    id: 1,
    date: "30 Mei 2024",
    type: "WA 720",
    bowType: "Recurve",
    distance: "70m",
    score: 585,
    maxScore: 720,
    xCount: 12
  },
  {
    id: 2,
    date: "28 Mei 2024",
    type: "WA 720",
    bowType: "Recurve",
    distance: "70m",
    score: 540,
    maxScore: 720,
    xCount: 8
  },
  {
    id: 3,
    date: "25 Mei 2024",
    type: "WA 720",
    bowType: "Recurve",
    distance: "70m",
    score: 570,
    maxScore: 720,
    xCount: 10
  },
  {
    id: 4,
    date: "20 Mei 2024",
    type: "Indoor 18m",
    bowType: "Compound",
    distance: "18m",
    score: 290,
    maxScore: 300,
    xCount: 18
  },
  {
    id: 5,
    date: "18 Mei 2024",
    type: "Field",
    bowType: "Barebow",
    distance: "Various",
    score: 340,
    maxScore: 432,
    xCount: 4
  },
  {
    id: 6,
    date: "15 Mei 2024",
    type: "Field",
    bowType: "Barebow",
    distance: "Various",
    score: 325,
    maxScore: 432,
    xCount: 3
  }
];

const Riwayat = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-archery-darkBlue mb-2">Riwayat Sesi</h2>
          <p className="text-gray-600 max-w-3xl">
            Lihat dan kelola riwayat sesi latihan dan kompetisi panahan Anda.
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cari</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Cari sesi..."
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Round</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="wa720">WA 720</SelectItem>
                    <SelectItem value="wa1440">WA 1440</SelectItem>
                    <SelectItem value="indoor18">Indoor 18m</SelectItem>
                    <SelectItem value="field">Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Busur</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="recurve">Recurve</SelectItem>
                    <SelectItem value="compound">Compound</SelectItem>
                    <SelectItem value="barebow">Barebow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jarak</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
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
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Urutkan</label>
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue placeholder="Terbaru" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="oldest">Terlama</SelectItem>
                    <SelectItem value="highest">Skor Tertinggi</SelectItem>
                    <SelectItem value="lowest">Skor Terendah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">Reset Filter</Button>
              <Button>Terapkan Filter</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Sesi</CardTitle>
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span>Export CSV</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Tanggal</th>
                    <th className="text-left py-3 px-4">Jenis Round</th>
                    <th className="text-left py-3 px-4">Busur</th>
                    <th className="text-left py-3 px-4">Jarak</th>
                    <th className="text-left py-3 px-4">Skor</th>
                    <th className="text-left py-3 px-4">X Count</th>
                    <th className="text-center py-3 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSessions.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{session.date}</td>
                      <td className="py-3 px-4">{session.type}</td>
                      <td className="py-3 px-4">{session.bowType}</td>
                      <td className="py-3 px-4">{session.distance}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-archery-blue">{session.score}</span>
                        <span className="text-gray-500">/{session.maxScore}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-archery-orange">{session.xCount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Lihat Detail</span>
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">Menampilkan 6 dari 24 sesi</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Riwayat;
