
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
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Trophy, Medal } from "lucide-react";

const Leaderboard = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState("recurve-men");
  
  // Data dummy untuk nama turnamen
  const tournamentName = id === "4" ? "Liga Panahan Regional" : 
                        id === "1" ? "Kejuaraan Nasional Panahan 2025" : 
                        id === "2" ? "Turnamen Panahan Antar Klub" :
                        "Open Tournament Archery Championship";
  
  // Data dummy untuk kategori
  const categories = [
    { id: "recurve-men", name: "Recurve Putra" },
    { id: "recurve-women", name: "Recurve Putri" },
    { id: "compound-men", name: "Compound Putra" },
    { id: "compound-women", name: "Compound Putri" },
    { id: "barebow-men", name: "Barebow Putra" },
    { id: "barebow-women", name: "Barebow Putri" }
  ];
  
  // Data dummy untuk leaderboard
  const leaderboardData = {
    "recurve-men": [
      { rank: 1, name: "Arif Dwi Pangestu", club: "Perpani Jakarta", score: 685, set: [172, 171, 171, 171] },
      { rank: 2, name: "Bayu Segara", club: "Perpani Jawa Barat", score: 681, set: [170, 170, 172, 169] },
      { rank: 3, name: "Chandra Wijaya", club: "Perpani Jawa Timur", score: 679, set: [170, 170, 169, 170] },
      { rank: 4, name: "Dimas Prasojo", club: "Perpani Banten", score: 675, set: [168, 169, 169, 169] },
      { rank: 5, name: "Eko Priyanto", club: "Perpani DIY", score: 673, set: [168, 168, 168, 169] },
      { rank: 6, name: "Fajar Sidiq", club: "Perpani Kalimantan Timur", score: 670, set: [167, 168, 167, 168] },
      { rank: 7, name: "Galih Pratama", club: "Perpani Sumatera Selatan", score: 667, set: [167, 167, 167, 166] },
      { rank: 8, name: "Hendra Kusuma", club: "Perpani Sulawesi Selatan", score: 665, set: [166, 166, 166, 167] },
    ],
    "recurve-women": [
      { rank: 1, name: "Ani Suryani", club: "Perpani Jakarta", score: 675, set: [169, 169, 169, 168] },
      { rank: 2, name: "Bella Safitri", club: "Perpani Jawa Barat", score: 671, set: [168, 168, 168, 167] },
      { rank: 3, name: "Citra Dewi", club: "Perpani Jawa Timur", score: 669, set: [167, 168, 167, 167] },
      { rank: 4, name: "Dian Puspita", club: "Perpani Banten", score: 665, set: [166, 166, 167, 166] },
      { rank: 5, name: "Eva Yulianti", club: "Perpani DIY", score: 663, set: [166, 166, 165, 166] },
      { rank: 6, name: "Fani Anggraini", club: "Perpani Kalimantan Timur", score: 660, set: [165, 165, 165, 165] },
      { rank: 7, name: "Gita Setiawati", club: "Perpani Sumatera Selatan", score: 657, set: [164, 165, 164, 164] },
      { rank: 8, name: "Hesti Pratiwi", club: "Perpani Sulawesi Selatan", score: 655, set: [164, 164, 164, 163] },
    ],
    "compound-men": [
      { rank: 1, name: "Iman Santoso", club: "Perpani Jakarta", score: 695, set: [174, 174, 174, 173] },
      { rank: 2, name: "Joko Suprianto", club: "Perpani Jawa Barat", score: 691, set: [173, 173, 173, 172] },
      { rank: 3, name: "Krisna Adi", club: "Perpani Jawa Timur", score: 689, set: [172, 173, 172, 172] },
      { rank: 4, name: "Leo Pratama", club: "Perpani Banten", score: 685, set: [171, 172, 171, 171] },
      { rank: 5, name: "Maulana Ibrahim", club: "Perpani DIY", score: 683, set: [171, 171, 170, 171] },
      { rank: 6, name: "Nur Hidayat", club: "Perpani Kalimantan Timur", score: 680, set: [170, 170, 170, 170] },
      { rank: 7, name: "Oki Wibowo", club: "Perpani Sumatera Selatan", score: 677, set: [169, 170, 169, 169] },
      { rank: 8, name: "Putra Pratama", club: "Perpani Sulawesi Selatan", score: 675, set: [169, 169, 168, 169] },
    ],
    "compound-women": [
      { rank: 1, name: "Qori Maharani", club: "Perpani Jakarta", score: 685, set: [171, 172, 171, 171] },
      { rank: 2, name: "Ratih Kumalasari", club: "Perpani Jawa Barat", score: 681, set: [170, 171, 170, 170] },
      { rank: 3, name: "Siti Nurbaya", club: "Perpani Jawa Timur", score: 679, set: [170, 170, 169, 170] },
      { rank: 4, name: "Tari Anindita", club: "Perpani Banten", score: 675, set: [169, 169, 169, 168] },
      { rank: 5, name: "Utami Dewi", club: "Perpani DIY", score: 673, set: [168, 169, 168, 168] },
      { rank: 6, name: "Vina Muliana", club: "Perpani Kalimantan Timur", score: 670, set: [168, 167, 168, 167] },
      { rank: 7, name: "Winda Astuti", club: "Perpani Sumatera Selatan", score: 667, set: [167, 167, 166, 167] },
      { rank: 8, name: "Yanti Susanti", club: "Perpani Sulawesi Selatan", score: 665, set: [166, 167, 166, 166] },
    ],
    "barebow-men": [
      { rank: 1, name: "Zaki Ahmad", club: "Perpani Jakarta", score: 665, set: [166, 167, 166, 166] },
      { rank: 2, name: "Anto Wijaya", club: "Perpani Jawa Barat", score: 661, set: [165, 166, 165, 165] },
      { rank: 3, name: "Bima Sakti", club: "Perpani Jawa Timur", score: 659, set: [165, 165, 164, 165] },
      { rank: 4, name: "Cakra Wibowo", club: "Perpani Banten", score: 655, set: [164, 164, 164, 163] },
      { rank: 5, name: "Deni Saputra", club: "Perpani DIY", score: 653, set: [163, 164, 163, 163] },
      { rank: 6, name: "Edi Susanto", club: "Perpani Kalimantan Timur", score: 650, set: [163, 163, 162, 162] },
      { rank: 7, name: "Ferdi Gunawan", club: "Perpani Sumatera Selatan", score: 647, set: [162, 162, 162, 161] },
      { rank: 8, name: "Guntur Pratama", club: "Perpani Sulawesi Selatan", score: 645, set: [161, 162, 161, 161] },
    ],
    "barebow-women": [
      { rank: 1, name: "Hana Pertiwi", club: "Perpani Jakarta", score: 655, set: [164, 164, 164, 163] },
      { rank: 2, name: "Indri Sari", club: "Perpani Jawa Barat", score: 651, set: [163, 163, 163, 162] },
      { rank: 3, name: "Juwita Kartika", club: "Perpani Jawa Timur", score: 649, set: [162, 163, 162, 162] },
      { rank: 4, name: "Kinanti Dewi", club: "Perpani Banten", score: 645, set: [161, 162, 161, 161] },
      { rank: 5, name: "Laras Ayu", club: "Perpani DIY", score: 643, set: [161, 161, 160, 161] },
      { rank: 6, name: "Mira Sukmawati", club: "Perpani Kalimantan Timur", score: 640, set: [160, 160, 160, 160] },
      { rank: 7, name: "Nina Anggraini", club: "Perpani Sumatera Selatan", score: 637, set: [159, 160, 159, 159] },
      { rank: 8, name: "Olivia Putri", club: "Perpani Sulawesi Selatan", score: 635, set: [159, 159, 158, 159] },
    ]
  };
  
  const currentData = leaderboardData[selectedCategory as keyof typeof leaderboardData] || [];
  const currentCategory = categories.find(cat => cat.id === selectedCategory)?.name || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link to={`/turnamen/${id}`} className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-archery-darkBlue flex items-center">
              <Trophy className="mr-2 h-7 w-7 text-archery-orange" /> Leaderboard
            </h1>
            <p className="text-archery-text mt-1">{tournamentName}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-4">
          <h2 className="text-xl font-semibold text-archery-text mb-3 md:mb-0">
            Kategori: <span className="text-archery-darkBlue">{currentCategory}</span>
          </h2>
          
          <div className="w-full md:w-72">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card className="overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead className="text-right">Set 1</TableHead>
                  <TableHead className="text-right">Set 2</TableHead>
                  <TableHead className="text-right">Set 3</TableHead>
                  <TableHead className="text-right">Set 4</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((archer) => (
                  <TableRow key={archer.name} className={archer.rank <= 3 ? "bg-yellow-50" : ""}>
                    <TableCell className="font-medium">
                      {archer.rank === 1 && (
                        <div className="flex items-center">
                          <Medal className="h-5 w-5 text-yellow-500 mr-1" />
                          <span>{archer.rank}</span>
                        </div>
                      )}
                      {archer.rank === 2 && (
                        <div className="flex items-center">
                          <Medal className="h-5 w-5 text-gray-400 mr-1" />
                          <span>{archer.rank}</span>
                        </div>
                      )}
                      {archer.rank === 3 && (
                        <div className="flex items-center">
                          <Medal className="h-5 w-5 text-amber-700 mr-1" />
                          <span>{archer.rank}</span>
                        </div>
                      )}
                      {archer.rank > 3 && archer.rank}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{archer.name}</div>
                    </TableCell>
                    <TableCell>{archer.club}</TableCell>
                    <TableCell className="text-right">{archer.set[0]}</TableCell>
                    <TableCell className="text-right">{archer.set[1]}</TableCell>
                    <TableCell className="text-right">{archer.set[2]}</TableCell>
                    <TableCell className="text-right">{archer.set[3]}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {archer.rank <= 3 && (
                        <Badge className={`ml-2 ${
                          archer.rank === 1 ? "bg-yellow-500" : 
                          archer.rank === 2 ? "bg-gray-400" : 
                          "bg-amber-700"
                        }`}>
                          {archer.score}
                        </Badge>
                      )}
                      {archer.rank > 3 && archer.score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
