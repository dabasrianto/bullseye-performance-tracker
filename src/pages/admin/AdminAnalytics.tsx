import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from '@/context/DataContext';

const AdminAnalytics = () => {
  const { users, tournaments, getAllAnalytics } = useData();
  const analytics = getAllAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analisis & Statistik</h1>
        <p className="text-muted-foreground">Data analitik sistem ArcherScore</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{users.length}</div>
            <p className="text-sm text-muted-foreground">Terdaftar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Turnamen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{tournaments.length}</div>
            <p className="text-sm text-muted-foreground">Tersedia</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Sesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{analytics.totalSessions}</div>
            <p className="text-sm text-muted-foreground">Latihan</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">X-Count Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2">{analytics.totalXCount}</div>
            <p className="text-sm text-muted-foreground">Keseluruhan</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Pengguna</span>
                <span className="font-semibold">{users.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Admin</span>
                <span className="font-semibold">{users.filter(u => u.role === 'admin').length}</span>
              </div>
              <div className="flex justify-between">
                <span>User Biasa</span>
                <span className="font-semibold">{users.filter(u => u.role === 'user').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistik Turnamen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Turnamen</span>
                <span className="font-semibold">{tournaments.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Akan Datang</span>
                <span className="font-semibold">{tournaments.filter(t => t.status === 'upcoming').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Berlangsung</span>
                <span className="font-semibold">{tournaments.filter(t => t.status === 'ongoing').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Selesai</span>
                <span className="font-semibold">{tournaments.filter(t => t.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Peserta</span>
                <span className="font-semibold">{tournaments.reduce((sum, t) => sum + t.participants.length, 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Statistik Latihan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.totalSessions}</div>
              <p className="text-sm text-muted-foreground">Total Sesi</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{analytics.averageScore.toFixed(1)}</div>
              <p className="text-sm text-muted-foreground">Rata-rata Skor</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{analytics.bestScore}</div>
              <p className="text-sm text-muted-foreground">Skor Terbaik</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;