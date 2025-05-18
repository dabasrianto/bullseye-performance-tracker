
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Settings, Calendar, BarChart2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data untuk konten beranda
const mockFeaturedContent = [
  { id: 1, title: "Turnamen Nasional 2025", description: "Turnamen panahan terbesar tahun ini", isActive: true },
  { id: 2, title: "Kelas Pelatihan Pemula", description: "Belajar teknik dasar panahan", isActive: true },
  { id: 3, title: "Tips Meningkatkan Akurasi", description: "Panduan langkah demi langkah", isActive: false },
];

// Mock data untuk pengguna
const mockUsers = [
  { id: 1, name: "Budi Santoso", email: "budi@example.com", role: "Admin" },
  { id: 2, name: "Ani Wijaya", email: "ani@example.com", role: "Pelatih" },
  { id: 3, name: "Deni Pratama", email: "deni@example.com", role: "Atlet" },
];

// Mock data untuk turnamen
const mockTournaments = [
  { id: 1, name: "Turnamen Regional 2025", date: "2025-06-15", location: "Jakarta", status: "Upcoming" },
  { id: 2, name: "Kejuaraan Provinsi", date: "2025-07-22", location: "Bandung", status: "Upcoming" },
  { id: 3, name: "Kompetisi Antar Klub", date: "2025-05-10", location: "Surabaya", status: "Completed" },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [featuredContent, setFeaturedContent] = useState(mockFeaturedContent);
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentDescription, setNewContentDescription] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [tournaments, setTournaments] = useState(mockTournaments);

  const handleAddContent = () => {
    if (newContentTitle && newContentDescription) {
      const newContent = {
        id: featuredContent.length + 1,
        title: newContentTitle,
        description: newContentDescription,
        isActive: true,
      };
      setFeaturedContent([...featuredContent, newContent]);
      setNewContentTitle("");
      setNewContentDescription("");
      toast({
        title: "Konten berhasil ditambahkan",
        description: "Konten baru telah ditambahkan ke beranda",
      });
    } else {
      toast({
        title: "Error",
        description: "Judul dan deskripsi harus diisi",
        variant: "destructive",
      });
    }
  };

  const toggleContentStatus = (id: number) => {
    setFeaturedContent(
      featuredContent.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
    toast({
      title: "Status berhasil diubah",
      description: "Status konten telah diperbarui",
    });
  };

  const deleteContent = (id: number) => {
    setFeaturedContent(featuredContent.filter(item => item.id !== id));
    toast({
      title: "Konten berhasil dihapus",
      description: "Konten telah dihapus dari beranda",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <span className="font-semibold text-xl text-archery-darkBlue">ArcherScore Admin</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Pengguna">
                  <Users />
                  <span>Pengguna</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Turnamen">
                  <Calendar />
                  <span>Turnamen</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analisis">
                  <BarChart2 />
                  <span>Analisis</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Konten">
                  <FileText />
                  <span>Konten</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Pengaturan">
                  <Settings />
                  <span>Pengaturan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Admin Panel v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm border-b">
            <div className="mx-auto py-4 px-6">
              <h1 className="text-2xl font-semibold text-archery-darkBlue">Admin Dashboard</h1>
            </div>
          </header>
          
          <main className="container mx-auto py-6 px-4 md:px-6">
            <Tabs defaultValue="konten">
              <TabsList className="mb-6">
                <TabsTrigger value="konten">Manajemen Konten</TabsTrigger>
                <TabsTrigger value="pengguna">Pengguna</TabsTrigger>
                <TabsTrigger value="turnamen">Turnamen</TabsTrigger>
                <TabsTrigger value="statistik">Statistik</TabsTrigger>
              </TabsList>
              
              <TabsContent value="konten" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah Konten Beranda</CardTitle>
                    <CardDescription>Tambahkan konten baru untuk ditampilkan di halaman beranda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Judul</label>
                      <Input 
                        id="title" 
                        value={newContentTitle} 
                        onChange={e => setNewContentTitle(e.target.value)}
                        placeholder="Masukkan judul konten"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">Deskripsi</label>
                      <Input 
                        id="description" 
                        value={newContentDescription} 
                        onChange={e => setNewContentDescription(e.target.value)}
                        placeholder="Masukkan deskripsi konten"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleAddContent}>Tambah Konten</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Konten Beranda</CardTitle>
                    <CardDescription>Kelola konten yang ditampilkan di halaman beranda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Judul</TableHead>
                          <TableHead>Deskripsi</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {featuredContent.map(content => (
                          <TableRow key={content.id}>
                            <TableCell>{content.title}</TableCell>
                            <TableCell>{content.description}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${content.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {content.isActive ? 'Aktif' : 'Nonaktif'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => toggleContentStatus(content.id)}
                                >
                                  {content.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => deleteContent(content.id)}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pengguna">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Pengguna</CardTitle>
                    <CardDescription>Kelola pengguna aplikasi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Hapus</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="turnamen">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Turnamen</CardTitle>
                    <CardDescription>Kelola turnamen panahan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Turnamen</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Lokasi</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournaments.map(tournament => (
                          <TableRow key={tournament.id}>
                            <TableCell>{tournament.name}</TableCell>
                            <TableCell>{tournament.date}</TableCell>
                            <TableCell>{tournament.location}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${tournament.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                {tournament.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Hapus</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="statistik">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistik Aktivitas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Grafik statistik akan ditampilkan di sini
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Ringkasan Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Pengguna</span>
                          <span className="font-semibold">258</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pengguna Baru Minggu Ini</span>
                          <span className="font-semibold">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pengguna Aktif</span>
                          <span className="font-semibold">187</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pelatih</span>
                          <span className="font-semibold">15</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
