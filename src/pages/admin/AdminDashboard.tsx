import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from '@/context/DataContext';
import { useAdmin } from '@/context/AdminContext';

const AdminDashboard = () => {
  const { tournaments, users, getAllAnalytics } = useData();
  const { featuredContent } = useAdmin();
  const analytics = getAllAnalytics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground">Ringkasan sistem ArcherScore</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{users.length}</div>
            <p className="text-sm text-muted-foreground">Pengguna terdaftar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Turnamen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{tournaments.length}</div>
            <p className="text-sm text-muted-foreground">Turnamen tersedia</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Konten Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {featuredContent.filter(c => c.isActive).length}
            </div>
            <p className="text-sm text-muted-foreground">Konten dipublikasikan</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Sistem</CardTitle>
          <CardDescription>Informasi umum sistem ArcherScore</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Total Sesi Latihan</p>
                <p className="text-2xl font-bold">{analytics.totalSessions}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Rata-rata Skor</p>
                <p className="text-2xl font-bold">{analytics.averageScore.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;