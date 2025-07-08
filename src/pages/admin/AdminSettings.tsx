import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Pengaturan disimpan",
      description: "Pengaturan sistem telah disimpan",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data diekspor",
      description: "Data berhasil diekspor ke file JSON",
    });
  };

  const handleClearData = () => {
    toast({
      title: "Data direset",
      description: "Semua data telah dihapus",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pengaturan Sistem</h1>
        <p className="text-muted-foreground">Kelola pengaturan umum aplikasi ArcherScore</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Umum</CardTitle>
          <CardDescription>Konfigurasi dasar aplikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informasi Aplikasi</h3>
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
              <Button variant="outline" className="w-fit" onClick={handleExportData}>
                Export Data ke JSON
              </Button>
              <Button variant="destructive" className="w-fit" onClick={handleClearData}>
                Clear All Data (Reset)
              </Button>
              <p className="text-sm text-muted-foreground">
                Data saat ini disimpan di Firebase Firestore
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Simpan Pengaturan</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettings;