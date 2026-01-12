import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Calendar, MapPin, Users, Trophy, Flag, Check, X } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const DetailTurnamen = () => {
  const { id } = useParams<{ id: string }>();
  const { tournaments, isRegistered, registerForTournament, cancelRegistration, getRegistrationCount } = useData();
  const { user } = useAuth();
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tournament = tournaments.find(t => t.id === id);
  const registered = id ? isRegistered(id) : false;
  const registrationCount = id ? getRegistrationCount(id) : 0;

  if (!tournament) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Turnamen tidak ditemukan</h1>
            <Link to="/turnamen">
              <Button>Kembali ke Daftar Turnamen</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Badge className="bg-red-500 hover:bg-red-600">Berlangsung</Badge>;
      case 'upcoming':
        return <Badge className="bg-green-500 hover:bg-green-600">Pendaftaran Dibuka</Badge>;
      case 'completed':
        return <Badge className="bg-muted text-muted-foreground">Selesai</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy", { locale: idLocale });
    } catch {
      return dateString;
    }
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    await registerForTournament(id!, selectedDivision || undefined);
    setIsSubmitting(false);
    setShowRegisterDialog(false);
    setSelectedDivision("");
  };

  const handleCancelRegistration = async () => {
    setIsSubmitting(true);
    await cancelRegistration(id!);
    setIsSubmitting(false);
    setShowCancelDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link to="/turnamen" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-grow">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h1 className="text-3xl font-bold text-foreground">
                {tournament.name}
              </h1>
              {getStatusBadge(tournament.status)}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(tournament.date)}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {tournament.location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {registrationCount} Peserta Terdaftar
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                <TabsTrigger value="divisions">Divisi</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-3">Deskripsi Turnamen</h3>
                      <p className="mb-4 text-muted-foreground">
                        Turnamen panahan tingkat nasional dengan sistem penilaian standar WA. 
                        Acara ini akan diikuti oleh atlet-atlet dari berbagai daerah di Indonesia.
                      </p>
                      
                      <h4 className="text-lg font-semibold mb-2">Status Pendaftaran</h4>
                      <div className="flex items-center gap-2 mb-4">
                        {registered ? (
                          <>
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-green-600 font-medium">Anda sudah terdaftar</span>
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5 text-muted-foreground" />
                            <span className="text-muted-foreground">Belum terdaftar</span>
                          </>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">Lokasi</h4>
                      <p className="mb-4 text-muted-foreground">{tournament.location}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Tanggal Pelaksanaan</h4>
                      <p className="text-muted-foreground">{formatDate(tournament.date)}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="divisions" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Divisi yang Tersedia</h3>
                    {tournament.divisions && tournament.divisions.length > 0 ? (
                      <ul className="space-y-2">
                        {tournament.divisions.map((division, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-primary mr-3"></span>
                            {division}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">Belum ada divisi yang ditentukan</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="info" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Informasi Tambahan</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Status</TableCell>
                          <TableCell className="capitalize">{tournament.status}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Jumlah Peserta</TableCell>
                          <TableCell>{registrationCount} orang</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Jumlah Divisi</TableCell>
                          <TableCell>{tournament.divisions?.length || 0} divisi</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Actions</h3>
                
                <div className="space-y-3">
                  {tournament.status === 'ongoing' ? (
                    <>
                      <Link to={`/turnamen/leaderboard/${tournament.id}`} className="w-full block">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Trophy className="mr-2 h-4 w-4" />
                          Lihat Leaderboard
                        </Button>
                      </Link>
                      <Button className="w-full" variant="outline">
                        <Flag className="mr-2 h-4 w-4" />
                        Lihat Live Scoring
                      </Button>
                    </>
                  ) : tournament.status === 'upcoming' ? (
                    <>
                      {registered ? (
                        <Button 
                          className="w-full" 
                          variant="destructive"
                          onClick={() => setShowCancelDialog(true)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Batalkan Pendaftaran
                        </Button>
                      ) : (
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => setShowRegisterDialog(true)}
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          Daftar Sekarang
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        Download Peraturan
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to={`/turnamen/leaderboard/${tournament.id}`} className="w-full block">
                        <Button className="w-full" variant="outline">
                          <Trophy className="mr-2 h-4 w-4" />
                          Lihat Hasil
                        </Button>
                      </Link>
                    </>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    Bagikan
                  </Button>
                </div>
                
                {registered && tournament.status === 'upcoming' && (
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="font-medium text-sm">Anda terdaftar di turnamen ini</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Daftar Turnamen</DialogTitle>
            <DialogDescription>
              Anda akan mendaftar ke turnamen "{tournament.name}"
            </DialogDescription>
          </DialogHeader>
          
          {tournament.divisions && tournament.divisions.length > 0 && (
            <div className="py-4">
              <label className="text-sm font-medium mb-2 block">Pilih Divisi</label>
              <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih divisi" />
                </SelectTrigger>
                <SelectContent>
                  {tournament.divisions.map((division, index) => (
                    <SelectItem key={index} value={division}>
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegisterDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleRegister} disabled={isSubmitting}>
              {isSubmitting ? "Mendaftar..." : "Konfirmasi Pendaftaran"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Registration Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Batalkan Pendaftaran</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin membatalkan pendaftaran dari turnamen "{tournament.name}"?
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Tidak
            </Button>
            <Button variant="destructive" onClick={handleCancelRegistration} disabled={isSubmitting}>
              {isSubmitting ? "Membatalkan..." : "Ya, Batalkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailTurnamen;
