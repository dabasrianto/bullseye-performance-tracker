
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BarChart3, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-archery-blue/5 to-archery-orange/5">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-archery-darkBlue mb-6">
            ArcherScore
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Aplikasi scoring panahan profesional dengan standar World Archery. 
            Catat skor, analisis performa, dan kelola turnamen dengan mudah.
          </p>
          <div className="text-center space-y-4">
            <Button asChild size="lg" className="bg-archery-blue hover:bg-archery-darkBlue">
              <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                {isAuthenticated ? "Ke Dashboard" : "Mulai Sekarang"}
              </Link>
            </Button>
            <p className="text-sm text-gray-600">
              Gratis untuk semua pemanah
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-archery-blue mx-auto mb-4" />
              <CardTitle>Scoring Akurat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Target face sesuai standar World Archery dengan sistem scoring yang presisi
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-archery-orange mx-auto mb-4" />
              <CardTitle>Analisis Mendalam</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Grafik performa, statistik detil, dan insight untuk meningkatkan kemampuan
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Trophy className="h-12 w-12 text-archery-darkBlue mx-auto mb-4" />
              <CardTitle>Manajemen Turnamen</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Kelola turnamen, jadwal, dan leaderboard dengan sistem yang terintegrasi
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-archery-blue mx-auto mb-4" />
              <CardTitle>Multi User</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support untuk pelatih, atlet, dan admin dengan role yang berbeda
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-archery-darkBlue mb-4">
            Siap Meningkatkan Performa Panahan Anda?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Bergabung dengan ribuan pemanah yang sudah menggunakan ArcherScore 
            untuk mencatat dan menganalisis performa mereka.
          </p>
          <Button asChild size="lg" className="bg-archery-orange hover:bg-archery-darkOrange">
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              Mulai Gratis Sekarang
            </Link>
          </Button>
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
