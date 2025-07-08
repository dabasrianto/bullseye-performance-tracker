import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from '@/context/DataContext';

const AdminUsers = () => {
  const { toast } = useToast();
  const { users, addUser, deleteUser } = useData();
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('user');

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Pengguna</h1>
        <p className="text-muted-foreground">Kelola pengguna aplikasi ArcherScore</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Pengguna Baru</CardTitle>
          <CardDescription>Tambahkan pengguna baru ke sistem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <CardTitle>Daftar Pengguna ({users.length})</CardTitle>
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
                      user.role === 'admin' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.joinDate).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell>
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

export default AdminUsers;