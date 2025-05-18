
import React from "react";
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
import { ChevronLeft, Calendar, MapPin, Users, Trophy, Flag } from "lucide-react";

const DetailTurnamen = () => {
  const { id } = useParams<{ id: string }>();
  
  // Data dummy untuk detail turnamen
  // Ini bisa diganti dengan fetching data dari API berdasarkan ID
  const tournamentData = {
    id: id,
    name: id === "4" ? "Liga Panahan Regional" : 
          id === "1" ? "Kejuaraan Nasional Panahan 2025" : 
          id === "2" ? "Turnamen Panahan Antar Klub" :
          "Open Tournament Archery Championship",
    startDate: id === "4" ? "15 Mei 2025" : 
              id === "1" ? "10 Juni 2025" : 
              id === "2" ? "24 Juli 2025" : 
              "15 Agustus 2025",
    endDate: id === "4" ? "20 Mei 2025" : 
            id === "1" ? "12 Juni 2025" : 
            id === "2" ? "25 Juli 2025" : 
            "17 Agustus 2025",
    location: id === "4" ? "Stadion Mandala Krida, Yogyakarta" : 
              id === "1" ? "GBK Senayan, Jakarta" : 
              id === "2" ? "Lapangan Arcaci, Bandung" : 
              "Lapangan PPOP, Surabaya",
    participants: id === "4" ? 90 : id === "1" ? 120 : id === "2" ? 85 : 150,
    description: "Turnamen panahan tingkat nasional dengan sistem penilaian standar WA. Acara ini akan diikuti oleh atlet-atlet dari berbagai daerah di Indonesia, dengan kategori recurve dan compound untuk kelas individu maupun beregu.",
    organizer: "Pengurus Besar Perpani",
    categories: ["Recurve Individual", "Recurve Team", "Compound Individual", "Compound Team"],
    status: id === "4" ? "Berlangsung" : id === "3" ? "Coming Soon" : "Pendaftaran Dibuka",
    registrationFee: "Rp 350.000 per peserta",
    registrationDeadline: id === "4" ? "10 Mei 2025" : 
                          id === "1" ? "1 Juni 2025" : 
                          id === "2" ? "15 Juli 2025" : 
                          "1 Agustus 2025",
    prizes: [
      { position: "Juara 1", prize: "Rp 10.000.000 + Medali Emas + Sertifikat" },
      { position: "Juara 2", prize: "Rp 7.500.000 + Medali Perak + Sertifikat" },
      { position: "Juara 3", prize: "Rp 5.000.000 + Medali Perunggu + Sertifikat" }
    ],
    schedule: [
      { 
        date: id === "4" ? "15 Mei 2025" : id === "1" ? "10 Juni 2025" : id === "2" ? "24 Juli 2025" : "15 Agustus 2025", 
        events: ["Pendaftaran Ulang", "Technical Meeting"] 
      },
      { 
        date: id === "4" ? "16 Mei 2025" : id === "1" ? "11 Juni 2025" : id === "2" ? "25 Juli 2025" : "16 Agustus 2025", 
        events: ["Kualifikasi Recurve", "Kualifikasi Compound"] 
      },
      { 
        date: id === "4" ? "17-20 Mei 2025" : id === "1" ? "12 Juni 2025" : id === "2" ? "25 Juli 2025" : "17 Agustus 2025", 
        events: ["Eliminasi dan Final", "Penganugerahan Medali"] 
      },
    ],
    contact: {
      name: "Panitia Turnamen",
      phone: "+62 812-3456-7890",
      email: "info@tournament.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link to="/turnamen" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-archery-darkBlue">
                {tournamentData.name}
              </h1>
              <Badge 
                className={`${
                  tournamentData.status === "Berlangsung" 
                    ? "bg-red-500 hover:bg-red-600" 
                    : tournamentData.status === "Pendaftaran Dibuka" 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {tournamentData.status}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-archery-text">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {tournamentData.startDate} - {tournamentData.endDate}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {tournamentData.location}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {tournamentData.participants} Peserta
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                <TabsTrigger value="categories">Kategori</TabsTrigger>
                <TabsTrigger value="prizes">Hadiah</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-3">Deskripsi Turnamen</h3>
                      <p className="mb-4">{tournamentData.description}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Penyelenggara</h4>
                      <p className="mb-4">{tournamentData.organizer}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Biaya Pendaftaran</h4>
                      <p className="mb-4">{tournamentData.registrationFee}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Batas Pendaftaran</h4>
                      <p className="mb-4">{tournamentData.registrationDeadline}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Kontak</h4>
                      <p className="mb-1">{tournamentData.contact.name}</p>
                      <p className="mb-1">{tournamentData.contact.phone}</p>
                      <p>{tournamentData.contact.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Jadwal Kegiatan</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/3">Tanggal</TableHead>
                          <TableHead>Kegiatan</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournamentData.schedule.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.date}</TableCell>
                            <TableCell>
                              <ul className="list-disc list-inside">
                                {item.events.map((event, eventIndex) => (
                                  <li key={eventIndex}>{event}</li>
                                ))}
                              </ul>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="categories" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Kategori Lomba</h3>
                    <ul className="space-y-2">
                      {tournamentData.categories.map((category, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-archery-blue mr-3"></span>
                          {category}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="prizes" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Hadiah</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/3">Posisi</TableHead>
                          <TableHead>Hadiah</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tournamentData.prizes.map((prize, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{prize.position}</TableCell>
                            <TableCell>{prize.prize}</TableCell>
                          </TableRow>
                        ))}
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
                  {tournamentData.status === "Berlangsung" ? (
                    <>
                      <Link to={`/turnamen/leaderboard/${tournamentData.id}`} className="w-full">
                        <Button className="w-full bg-archery-orange hover:bg-archery-darkOrange">
                          <Trophy className="mr-2 h-4 w-4" />
                          Lihat Leaderboard
                        </Button>
                      </Link>
                      <Button className="w-full bg-archery-blue hover:bg-archery-darkBlue">
                        <Flag className="mr-2 h-4 w-4" />
                        Lihat Live Scoring
                      </Button>
                    </>
                  ) : tournamentData.status === "Pendaftaran Dibuka" ? (
                    <>
                      <Button className="w-full bg-archery-orange hover:bg-archery-darkOrange">
                        <Flag className="mr-2 h-4 w-4" />
                        Daftar Sekarang
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download Peraturan
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" disabled>
                        <Flag className="mr-2 h-4 w-4" />
                        Pendaftaran Belum Dibuka
                      </Button>
                      <Button variant="outline" className="w-full">
                        Ingatkan Saya
                      </Button>
                    </>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    Bagikan
                  </Button>
                </div>
                
                {tournamentData.status === "Pendaftaran Dibuka" && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Batas Waktu Pendaftaran</h4>
                    <p className="text-archery-orange font-semibold">{tournamentData.registrationDeadline}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTurnamen;
