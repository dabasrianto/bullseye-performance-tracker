
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Flag } from "lucide-react";

const Turnamen = () => {
  // Data dummy untuk turnamen yang akan datang
  const upcomingTournaments = [
    {
      id: "1",
      name: "Kejuaraan Nasional Panahan 2025",
      date: "10-12 Juni 2025",
      location: "GBK Senayan, Jakarta",
      participants: 120,
      categories: ["Recurve", "Compound", "Traditional"],
      status: "Pendaftaran Dibuka",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Turnamen Panahan Antar Klub",
      date: "24-25 Juli 2025",
      location: "Lapangan Arcaci, Bandung",
      participants: 85,
      categories: ["Recurve", "Traditional"],
      status: "Pendaftaran Dibuka",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Open Tournament Archery Championship",
      date: "15-17 Agustus 2025",
      location: "Lapangan PPOP, Surabaya",
      participants: 150,
      categories: ["Recurve", "Compound", "Traditional", "Barebow"],
      status: "Coming Soon",
      image: "/placeholder.svg"
    },
  ];

  // Data dummy untuk turnamen yang sedang berlangsung
  const ongoingTournaments = [
    {
      id: "4",
      name: "Liga Panahan Regional",
      date: "15-20 Mei 2025",
      location: "Stadion Mandala Krida, Yogyakarta",
      participants: 90,
      categories: ["Recurve", "Compound"],
      status: "Berlangsung",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-archery-darkBlue flex items-center">
              <Trophy className="mr-2 h-7 w-7 text-archery-orange" /> Turnamen
            </h1>
            <p className="text-archery-text mt-2">Temukan dan ikuti berbagai turnamen panahan</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/turnamen/jadwal">
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Jadwal Turnamen
              </Button>
            </Link>
            <Button className="bg-archery-blue hover:bg-archery-darkBlue">
              <Flag className="mr-2 h-4 w-4" />
              Daftar Turnamen
            </Button>
          </div>
        </div>
        
        {/* Turnamen yang sedang berlangsung */}
        {ongoingTournaments.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-archery-darkBlue border-l-4 border-archery-orange pl-3">
              Sedang Berlangsung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {ongoingTournaments.map((tournament) => (
                <div key={tournament.id} className="bg-white border-l-4 border-archery-orange rounded-lg shadow-md p-6 animate-pulse-light">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <Badge className="bg-red-500 hover:bg-red-600 mb-3">LIVE</Badge>
                      <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {tournament.date}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        {tournament.participants} Peserta
                      </div>
                      <p className="text-gray-600 mb-4">{tournament.location}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tournament.categories.map((category) => (
                          <Badge key={category} variant="outline" className="bg-gray-100">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                      <Link to={`/turnamen/leaderboard/${tournament.id}`}>
                        <Button variant="outline" className="w-full md:w-auto">
                          <Trophy className="mr-2 h-4 w-4" />
                          Lihat Leaderboard
                        </Button>
                      </Link>
                      <Link to={`/turnamen/${tournament.id}`}>
                        <Button className="w-full md:w-auto bg-archery-orange hover:bg-archery-darkOrange">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Turnamen yang akan datang */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-archery-darkBlue border-l-4 border-archery-blue pl-3">
            Turnamen Mendatang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden animate-fade-in">
                <div className="h-40 bg-gray-200 relative">
                  <img 
                    src={tournament.image} 
                    alt={tournament.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={`${tournament.status === "Pendaftaran Dibuka" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}>
                      {tournament.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{tournament.name}</CardTitle>
                  <CardDescription>{tournament.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {tournament.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Users className="h-4 w-4 mr-2" />
                    {tournament.participants} Peserta
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tournament.categories.map((category) => (
                      <Badge key={category} variant="outline" className="bg-gray-100">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/turnamen/${tournament.id}`} className="w-full">
                    <Button className="w-full bg-archery-blue hover:bg-archery-darkBlue">
                      Lihat Detail
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Turnamen;
