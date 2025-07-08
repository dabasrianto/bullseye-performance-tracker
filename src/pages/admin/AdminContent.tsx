import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from '@/context/AdminContext';

const AdminContent = () => {
  const { toast } = useToast();
  const { featuredContent, addContent, toggleContentStatus, deleteContent } = useAdmin();
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentDescription, setNewContentDescription] = useState("");

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Konten</h1>
        <p className="text-muted-foreground">Kelola konten yang ditampilkan di halaman beranda</p>
      </div>

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
          <CardTitle>Konten Beranda ({featuredContent.length})</CardTitle>
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
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      content.isActive ? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'
                    }`}>
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
    </div>
  );
};

export default AdminContent;