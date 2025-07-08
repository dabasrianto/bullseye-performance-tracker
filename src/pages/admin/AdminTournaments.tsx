import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from '@/context/DataContext';

const AdminTournaments = () => {
  const { toast } = useToast();
  const { tournaments, addTournament, deleteTournament } = useData();
  const [newTournamentName, setNewTournamentName] = useState("");
  const [newTournamentDate, setNewTournamentDate] = useState("");
  const [newTournamentLocation, setNewTournamentLocation] = useState("");

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Turnamen</h1>
        <p className="text-muted-foreground">Kelola turnamen panahan</p>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <CardTitle>Daftar Turnamen ({tournaments.length})</CardTitle>
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
                      tournament.status === 'upcoming' ? 'bg-primary/10 text-primary' : 
                      tournament.status === 'ongoing' ? 'bg-secondary/10 text-secondary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {tournament.status === 'upcoming' ? 'Akan Datang' :
                       tournament.status === 'ongoing' ? 'Berlangsung' : 'Selesai'}
                    </span>
                  </TableCell>
                  <TableCell>{tournament.participants.length}</TableCell>
                  <TableCell>
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

export default AdminTournaments;