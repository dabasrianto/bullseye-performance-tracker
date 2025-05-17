
import React from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreInput from '@/components/ScoreInput';
import StatsSummary from '@/components/StatsSummary';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-archery-darkBlue mb-2">Dashboard Panahan</h2>
          <p className="text-gray-600 max-w-3xl">
            Selamat datang di ArcherScore! Pantau performa panahan, catat skor, dan analisis perkembangan Anda secara real-time.
          </p>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="input" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="input">Input Skor</TabsTrigger>
                <TabsTrigger value="stats">Statistik</TabsTrigger>
              </TabsList>
              
              <Button className="bg-archery-orange hover:bg-archery-darkOrange">
                <Plus className="mr-2 h-4 w-4" /> Sesi Baru
              </Button>
            </div>
            
            <TabsContent value="input" className="mt-0">
              <ScoreInput />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0">
              <StatsSummary />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Sesi Terbaru</h3>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <p className="font-medium">WA 720 - Recurve 70m</p>
                <div className="flex justify-between text-sm">
                  <span>25 Mei 2024</span>
                  <span className="font-bold text-archery-blue">570 / 720</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Indoor 18m - Compound</p>
                <div className="flex justify-between text-sm">
                  <span>20 Mei 2024</span>
                  <span className="font-bold text-archery-blue">290 / 300</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Field - Barebow</p>
                <div className="flex justify-between text-sm">
                  <span>15 Mei 2024</span>
                  <span className="font-bold text-archery-blue">325 / 432</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Personal Bests</h3>
            <div className="space-y-3">
              <div className="border-b pb-2">
                <p className="font-medium">WA 720 (70m)</p>
                <div className="flex justify-between text-sm">
                  <span>Recurve</span>
                  <span className="font-bold text-archery-orange">570 pts</span>
                </div>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Indoor 18m</p>
                <div className="flex justify-between text-sm">
                  <span>Compound</span>
                  <span className="font-bold text-archery-orange">295 pts</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Field</p>
                <div className="flex justify-between text-sm">
                  <span>Barebow</span>
                  <span className="font-bold text-archery-orange">348 pts</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-gradient-to-br from-archery-blue to-archery-darkBlue p-6 shadow-sm text-white">
            <h3 className="font-semibold text-lg mb-4">Jadwal Latihan</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-md p-3">
                <p className="font-medium">Selasa, 28 Mei</p>
                <p className="text-sm text-white/80">Latihan Teknik, 16:00 - 18:00</p>
              </div>
              <div className="bg-white/10 rounded-md p-3">
                <p className="font-medium">Kamis, 30 Mei</p>
                <p className="text-sm text-white/80">Simulasi Kompetisi, 15:00 - 18:00</p>
              </div>
              <Button variant="secondary" className="w-full mt-2 bg-white text-archery-darkBlue hover:bg-gray-100">
                + Tambah Jadwal
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © 2024 ArcherScore. Aplikasi Scoring Panahan Kompetitif
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-archery-blue text-sm">Tentang</a>
              <a href="#" className="text-gray-600 hover:text-archery-blue text-sm">Bantuan</a>
              <a href="#" className="text-gray-600 hover:text-archery-blue text-sm">Kebijakan Privasi</a>
              <a href="#" className="text-gray-600 hover:text-archery-blue text-sm">Kontak</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
