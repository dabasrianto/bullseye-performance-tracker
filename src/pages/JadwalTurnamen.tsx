
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft } from "lucide-react";

const JadwalTurnamen = () => {
  // Data dummy untuk jadwal turnamen
  const tournaments = [
    {
      id: "4",
      name: "Liga Panahan Regional",
      startDate: "15 Mei 2025",
      endDate: "20 Mei 2025",
      location: "Stadion Mandala Krida, Yogyakarta",
      status: "Berlangsung",
      schedule: [
        { date: "15 Mei 2025", events: ["Pendaftaran Ulang", "Technical Meeting"] },
        { date: "16 Mei 2025", events: ["Kualifikasi Recurve", "Kualifikasi Compound"] },
        { date: "17 Mei 2025", events: ["Eliminasi Individu Recurve", "Eliminasi Individu Compound"] },
        { date: "18 Mei 2025", events: ["Eliminasi Tim Recurve", "Eliminasi Tim Compound"] },
        { date: "19 Mei 2025", events: ["Final Individu"] },
        { date: "20 Mei 2025", events: ["Final Tim", "Upacara Penutupan"] }
      ]
    },
    {
      id: "1",
      name: "Kejuaraan Nasional Panahan 2025",
      startDate: "10 Juni 2025",
      endDate: "12 Juni 2025",
      location: "GBK Senayan, Jakarta",
      status: "Pendaftaran",
      schedule: [
        { date: "10 Juni 2025", events: ["Pendaftaran Ulang", "Latihan Resmi", "Technical Meeting"] },
        { date: "11 Juni 2025", events: ["Kualifikasi Semua Divisi", "Eliminasi 1/16"] },
        { date: "12 Juni 2025", events: ["Semifinal", "Final", "Penganugerahan Medali"] }
      ]
    },
    {
      id: "2",
      name: "Turnamen Panahan Antar Klub",
      startDate: "24 Juli 2025",
      endDate: "25 Juli 2025",
      location: "Lapangan Arcaci, Bandung",
      status: "Pendaftaran",
      schedule: [
        { date: "24 Juli 2025", events: ["Pendaftaran Ulang", "Kualifikasi"] },
        { date: "25 Juli 2025", events: ["Eliminasi", "Final", "Penutupan"] }
      ]
    },
    {
      id: "3",
      name: "Open Tournament Archery Championship",
      startDate: "15 Agustus 2025",
      endDate: "17 Agustus 2025",
      location: "Lapangan PPOP, Surabaya",
      status: "Coming Soon",
      schedule: [
        { date: "15 Agustus 2025", events: ["Pendaftaran", "Practice", "Technical Meeting"] },
        { date: "16 Agustus 2025", events: ["Kualifikasi Recurve", "Kualifikasi Compound", "Kualifikasi Barebow"] },
        { date: "17 Agustus 2025", events: ["Eliminasi dan Final", "Penganugerahan Penghargaan"] }
      ]
    }
  ];

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
          <div>
            <h1 className="text-3xl font-bold text-archery-darkBlue flex items-center">
              <Calendar className="mr-2 h-7 w-7 text-archery-blue" /> Jadwal Turnamen
            </h1>
            <p className="text-archery-text mt-1">Lihat jadwal lengkap turnamen panahan</p>
          </div>
        </div>
        
        <div className="space-y-8 mt-6">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} className="overflow-hidden animate-fade-in">
              <CardContent className="p-0">
                <div className="p-5 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold">{tournament.name}</h3>
                        <Badge 
                          className={`ml-3 ${
                            tournament.status === "Berlangsung" 
                              ? "bg-red-500 hover:bg-red-600" 
                              : tournament.status === "Pendaftaran" 
                              ? "bg-green-500 hover:bg-green-600" 
                              : "bg-yellow-500 hover:bg-yellow-600"
                          }`}
                        >
                          {tournament.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-1">{tournament.location}</p>
                      <p className="text-gray-600">
                        {tournament.startDate} - {tournament.endDate}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <Link to={`/turnamen/${tournament.id}`}>
                        <Button className="bg-archery-blue hover:bg-archery-darkBlue">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-0">
                  <Table>
                    <TableCaption>Jadwal kegiatan turnamen</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Tanggal</TableHead>
                        <TableHead>Kegiatan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tournament.schedule.map((item, index) => (
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JadwalTurnamen;
