
import React from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TargetFace from '@/components/TargetFace';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

const InputSkor = () => {
  const [selectedRound, setSelectedRound] = React.useState("wa720");
  const [selectedDistance, setSelectedDistance] = React.useState("70m");
  const [selectedBowType, setSelectedBowType] = React.useState("recurve");
  const [scores, setScores] = React.useState<number[]>([]);
  
  const handleScoreSelect = (score: number) => {
    setScores(prev => [...prev, score]);
    toast({
      title: `Arrow score: ${score}`,
      description: `Total: ${[...scores, score].reduce((sum, s) => sum + s, 0)}`,
    });
  };
  
  const handleSaveEnd = () => {
    toast({
      title: "End saved",
      description: `Total score: ${scores.reduce((sum, s) => sum + s, 0)}`,
      variant: "success",
    });
    setScores([]);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-archery-darkBlue mb-2">Input Skor</h2>
          <p className="text-gray-600 max-w-3xl">
            Catat dan simpan skor panahan Anda secara akurat. Klik pada target atau gunakan input manual.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Sesi Panahan Baru</span>
                  <Button size="sm" className="bg-archery-orange hover:bg-archery-darkOrange">
                    <Plus className="mr-1 h-4 w-4" /> Sesi Baru
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Round Type</label>
                    <Select value={selectedRound} onValueChange={setSelectedRound}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Round" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wa720">WA 720</SelectItem>
                        <SelectItem value="wa1440">WA 1440</SelectItem>
                        <SelectItem value="indoor18">Indoor 18m</SelectItem>
                        <SelectItem value="field">Field</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Jarak</label>
                    <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jarak" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18m">18m</SelectItem>
                        <SelectItem value="30m">30m</SelectItem>
                        <SelectItem value="50m">50m</SelectItem>
                        <SelectItem value="70m">70m</SelectItem>
                        <SelectItem value="90m">90m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Jenis Busur</label>
                    <Select value={selectedBowType} onValueChange={setSelectedBowType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Busur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recurve">Recurve</SelectItem>
                        <SelectItem value="compound">Compound</SelectItem>
                        <SelectItem value="barebow">Barebow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col items-center">
                  <TargetFace 
                    size={300} 
                    onScoreSelect={(score) => handleScoreSelect(score)}
                    className="mb-4"
                  />
                  
                  <div className="flex flex-wrap gap-2 my-4 justify-center">
                    {scores.map((score, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-300 font-bold"
                      >
                        {score === 11 ? 'X' : score}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button 
                      onClick={() => setScores(prev => prev.slice(0, -1))}
                      variant="outline" 
                      disabled={scores.length === 0}
                    >
                      Batalkan Terakhir
                    </Button>
                    <Button 
                      onClick={handleSaveEnd}
                      disabled={scores.length === 0}
                    >
                      Simpan End
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Sesi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Tipe Ronde</p>
                    <p className="font-bold">WA 720 - {selectedDistance}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jenis Busur</p>
                    <p className="font-bold capitalize">{selectedBowType}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Total Skor</p>
                    <p className="text-2xl font-bold text-archery-blue">
                      {scores.reduce((sum, s) => sum + s, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">X Count</p>
                    <p className="text-xl font-bold text-archery-orange">
                      {scores.filter(s => s === 11).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Average</p>
                    <p className="text-xl font-bold">
                      {scores.length > 0 
                        ? (scores.reduce((sum, s) => sum + (s === 11 ? 10 : s), 0) / scores.length).toFixed(1) 
                        : "0.0"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InputSkor;
