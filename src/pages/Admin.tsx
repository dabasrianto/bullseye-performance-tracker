
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Settings, Calendar, BarChart2, FileText, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from '@/context/DataContext';
import { useAdmin } from '@/context/AdminContext';

const AdminDashboard = () => {
  const { toast } = useToast();
  const { 
    tournaments, 
    addTournament, 
    updateTournament, 
    deleteTournament,
    users,
    addUser,
    updateUser,
    deleteUser,
    getAllAnalytics
  } = useData();
  const { 
    featuredContent, 
    addContent, 
    toggleContentStatus, 
    deleteContent 
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState("konten");
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentDescription, setNewContentDescription] = useState("");
  const [newTournamentName, setNewTournamentName] = useState("");
  const [newTournamentDate, setNewTournamentDate] = useState("");
  const [newTournamentLocation, setNewTournamentLocation] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('user');
  
  const analytics = getAllAnalytics();

  const handleAddContent = () => {
    if (newContentTitle && newContentDescription) {
      addContent(newContentTitle, newContentDescription);
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

  const handleAddTournament = () => {
    if (newTournamentName && newTournamentDate && newTournamentLocation) {
      addTournament({
        name: newTournamentName,
        date: newTournamentDate,
        location: newTournamentLocation,
        status: 'upcoming',
        divisions: ['Recurve', 'Compound'],
        participants: []
      });
      setNewTournamentName("");
      setNewTournamentDate("");
      setNewTournamentLocation("");
      toast({
        title: "Turnamen berhasil ditambahkan",
        description: "Turnamen baru telah ditambahkan",
      });
    } else {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
    }
  };

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      addUser({
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        joinDate: new Date().toISOString().split('T')[0]
      });
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole('user');
      toast({
        title: "User berhasil ditambahkan",
        description: "User baru telah ditambahkan",
      });
    } else {
      toast({
        title: "Error",
        description: "Nama dan email harus diisi",
        variant: "destructive",
      });
    }
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
                <SidebarMenuButton 
                  tooltip="Dashboard" 
                  isActive={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Pengguna" 
                  isActive={activeTab === "pengguna"}
                  onClick={() => setActiveTab("pengguna")}
                >
                  <Users />
                  <span>Pengguna</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Turnamen" 
                  isActive={activeTab === "turnamen"}
                  onClick={() => setActiveTab("turnamen")}
                >
                  <Calendar />
                  <span>Turnamen</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Analisis" 
                  isActive={activeTab === "statistik"}
                  onClick={() => setActiveTab("statistik")}
                >
                  <BarChart2 />
                  <span>Analisis</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Konten" 
                  isActive={activeTab === "konten"}
                  onClick={() => setActiveTab("konten")}
                >
                  <FileText />
                  <span>Konten</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Pengaturan" 
                  isActive={activeTab === "pengaturan"}
                  onClick={() => setActiveTab("pengaturan")}
                >
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="konten">Manajemen Konten</TabsTrigger>
                <TabsTrigger value="pengguna">Pengguna</TabsTrigger>
                <TabsTrigger value="turnamen">Turnamen</TabsTrigger>
                <TabsTrigger value="statistik">Statistik</TabsTrigger>
                <TabsTrigger value="pengaturan">Pengaturan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-archery-blue">{users.length}</div>
                      <p className="text-sm text-muted-foreground">Pengguna terdaftar</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Turnamen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-archery-orange">{tournaments.length}</div>
                      <p className="text-sm text-muted-foreground">Turnamen tersedia</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Konten Aktif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-archery-darkBlue">
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
              </TabsContent>
              
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
              
              <TabsContent value="pengguna" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah Pengguna Baru</CardTitle>
                    <CardDescription>Tambahkan pengguna baru ke sistem</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="userName" className="text-sm font-medium">Nama</label>
                        <Input 
                          id="userName" 
                          value={newUserName} 
                          onChange={e => setNewUserName(e.target.value)}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="userEmail" className="text-sm font-medium">Email</label>
                        <Input 
                          id="userEmail" 
                          type="email"
                          value={newUserEmail} 
                          onChange={e => setNewUserEmail(e.target.value)}
                          placeholder="Masukkan email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="userRole" className="text-sm font-medium">Role</label>
                      <Select value={newUserRole} onValueChange={(value: 'admin' | 'user') => setNewUserRole(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleAddUser}>Tambah Pengguna</Button>
                  </CardFooter>
                </Card>

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
                          <TableHead>Tanggal Bergabung</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(user.joinDate).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => {
                                    deleteUser(user.id);
                                    toast({
                                      title: "User berhasil dihapus",
                                      description: "User telah dihapus dari sistem"
                                    });
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
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
              
              <TabsContent value="turnamen" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah Turnamen Baru</CardTitle>
                    <CardDescription>Buat turnamen panahan baru</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="tournamentName" className="text-sm font-medium">Nama Turnamen</label>
                      <Input 
                        id="tournamentName" 
                        value={newTournamentName} 
                        onChange={e => setNewTournamentName(e.target.value)}
                        placeholder="Masukkan nama turnamen"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="tournamentDate" className="text-sm font-medium">Tanggal</label>
                        <Input 
                          id="tournamentDate" 
                          type="date"
                          value={newTournamentDate} 
                          onChange={e => setNewTournamentDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="tournamentLocation" className="text-sm font-medium">Lokasi</label>
                        <Input 
                          id="tournamentLocation" 
                          value={newTournamentLocation} 
                          onChange={e => setNewTournamentLocation(e.target.value)}
                          placeholder="Masukkan lokasi turnamen"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleAddTournament}>Tambah Turnamen</Button>
                  </CardFooter>
                </Card>

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
                          <TableHead>Peserta</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournaments.map(tournament => (
                          <TableRow key={tournament.id}>
                            <TableCell>{tournament.name}</TableCell>
                            <TableCell>
                              {new Date(tournament.date).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>{tournament.location}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                                tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {tournament.status === 'upcoming' ? 'Akan Datang' :
                                 tournament.status === 'ongoing' ? 'Berlangsung' : 'Selesai'}
                              </span>
                            </TableCell>
                            <TableCell>{tournament.participants.length}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => {
                                    deleteTournament(tournament.id);
                                    toast({
                                      title: "Turnamen berhasil dihapus",
                                      description: "Turnamen telah dihapus dari sistem"
                                    });
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
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
              
              <TabsContent value="statistik">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Total Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-archery-blue">{users.length}</div>
                      <p className="text-sm text-gray-500">Terdaftar</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Total Turnamen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-archery-orange">{tournaments.length}</div>
                      <p className="text-sm text-gray-500">Tersedia</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Total Sesi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-archery-darkBlue">{analytics.totalSessions}</div>
                      <p className="text-sm text-gray-500">Latihan</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">X-Count Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">{analytics.totalXCount}</div>
                      <p className="text-sm text-gray-500">Keseluruhan</p>
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
              </TabsContent>
              
              <TabsContent value="pengaturan" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Sistem</CardTitle>
                    <CardDescription>Kelola pengaturan umum aplikasi ArcherScore</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Pengaturan Umum</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nama Aplikasi</label>
                          <Input defaultValue="ArcherScore" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Versi</label>
                          <Input defaultValue="1.0.0" disabled />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Pengaturan Turnamen</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Maksimal Peserta per Turnamen</label>
                          <Input type="number" defaultValue="100" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Divisi Default</label>
                          <Select defaultValue="recurve">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="recurve">Recurve</SelectItem>
                              <SelectItem value="compound">Compound</SelectItem>
                              <SelectItem value="barebow">Barebow</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Storage & Backup</h3>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" className="w-fit">
                          Export Data ke JSON
                        </Button>
                        <Button variant="outline" className="w-fit">
                          Clear All Data (Reset)
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Data saat ini disimpan di localStorage browser
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Simpan Pengaturan</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
