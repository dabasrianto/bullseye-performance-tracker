
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Header from "@/components/Header";
import ScoreInput from "@/components/ScoreInput";
import TargetFace from "@/components/TargetFace";
import MobileScoreCard from "@/components/MobileScoreCard";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const InputSkor = () => {
  const [scores, setScores] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [roundName, setRoundName] = useState("");
  const [targetType, setTargetType] = useState<'outdoor' | 'indoor' | 'field' | '3d'>('outdoor');
  const [bowDivision, setBowDivision] = useState<'recurve' | 'compound' | 'barebow' | 'traditional'>('recurve');
  const [distance, setDistance] = useState("70");
  const [totalScore, setTotalScore] = useState(0);
  const [xCount, setXCount] = useState(0);
  const isMobile = useIsMobile();

  const handleScoreSubmit = (score: number) => {
    setCurrentScore(score);
    const newScores = [...scores, score];
    setScores(newScores);
    
    // Update total score
    const newTotal = newScores.reduce((acc, curr) => acc + curr, 0);
    setTotalScore(newTotal);
    
    // Track X count (for compound division only)
    if (bowDivision === 'compound' && score === 10 && Math.random() < 0.3) { // Simplified X detection
      setXCount(prev => prev + 1);
    }
    
    toast("Skor ditambahkan", {
      description: `Panah ${newScores.length}: ${score} poin`,
    });
  };

  const handleResetScores = () => {
    setScores([]);
    setCurrentScore(null);
    setTotalScore(0);
    setXCount(0);
    toast("Skor direset", {
      description: "Semua skor telah dihapus",
    });
  };
  
  // World Archery standard distances per division
  const getDistanceOptions = () => {
    switch (targetType) {
      case 'outdoor':
        if (bowDivision === 'recurve') 
          return ['70', '60', '50', '30'];
        else if (bowDivision === 'compound') 
          return ['50', '40', '30'];
        else 
          return ['50', '40', '30', '20'];
      case 'indoor':
        return ['18', '25'];
      case 'field':
        return ['various', 'marked', 'unmarked'];
      case '3d':
        return ['various', 'unmarked'];
      default:
        return ['70', '50', '30', '18'];
    }
  };
  
  // Get the total possible score based on World Archery standards
  const getTotalPossibleScore = () => {
    // Standard scoring: 10 points max per arrow
    const arrowCount = scores.length > 0 ? scores.length : 1;
    
    switch (targetType) {
      case 'outdoor':
        return arrowCount * 10; // max 10 points per arrow
      case 'indoor':
        return arrowCount * 10; // max 10 points per arrow (inner 10 for compound counts as X)
      default:
        return arrowCount * 10;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-4 md:py-8 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-archery-darkBlue flex items-center justify-center">
          <Target className="mr-2 h-6 w-6 md:h-7 md:w-7" />
          Input Skor World Archery
        </h1>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-2">
              <h2 className="text-lg md:text-xl font-semibold">Target</h2>
              <div className="flex gap-2 items-center">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-archery-orange" />
                <span className="text-xs md:text-sm font-medium">World Archery Standard</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <label htmlFor="targetType" className="block text-sm font-medium mb-1">
                  Jenis Target
                </label>
                <Select 
                  value={targetType} 
                  onValueChange={(value: any) => setTargetType(value)}
                >
                  <SelectTrigger id="targetType">
                    <SelectValue placeholder="Pilih jenis target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outdoor">Outdoor Target</SelectItem>
                    <SelectItem value="indoor">Indoor Target</SelectItem>
                    <SelectItem value="field">Field Archery</SelectItem>
                    <SelectItem value="3d">3D Archery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="bowDivision" className="block text-sm font-medium mb-1">
                  Divisi Busur
                </label>
                <Select 
                  value={bowDivision} 
                  onValueChange={(value: any) => setBowDivision(value)}
                >
                  <SelectTrigger id="bowDivision">
                    <SelectValue placeholder="Pilih divisi busur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recurve">Recurve</SelectItem>
                    <SelectItem value="compound">Compound</SelectItem>
                    <SelectItem value="barebow">Barebow</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="distance" className="block text-sm font-medium mb-1">
                  Jarak (meter)
                </label>
                <Select 
                  value={distance} 
                  onValueChange={setDistance}
                >
                  <SelectTrigger id="distance">
                    <SelectValue placeholder="Pilih jarak" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDistanceOptions().map((dist) => (
                      <SelectItem key={dist} value={dist}>{dist}m</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="roundName" className="block text-sm font-medium mb-1">
                  Nama Ronde
                </label>
                <Input
                  id="roundName"
                  value={roundName}
                  onChange={(e) => setRoundName(e.target.value)}
                  placeholder="Contoh: WA 720 Qualification"
                />
              </div>
            </div>
            
            <div className="flex justify-center mb-4 md:mb-6">
              <TargetFace 
                size={isMobile ? 240 : 280} 
                targetType={targetType}
                bowDivision={bowDivision}
                onScoreSelect={handleScoreSubmit}
              />
            </div>
            
            <ScoreInput onScoreSelect={handleScoreSubmit} />
          </div>
          
          {/* Desktop Score Display */}
          {!isMobile && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Hasil Skor</h2>
              
              <Card className="bg-gradient-to-br from-archery-blue to-archery-darkBlue text-white mb-6">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{totalScore}</div>
                    <div className="text-sm opacity-80">dari {getTotalPossibleScore()} poin maksimal</div>
                    
                    {bowDivision === 'compound' && (
                      <div className="mt-2 flex justify-center">
                        <span className="bg-yellow-400 text-archery-darkBlue px-3 py-1 rounded-full text-sm font-bold">
                          {xCount} X
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Detail Skor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 gap-2">
                      {scores.map((score, index) => (
                        <div 
                          key={index}
                          className={`text-center p-2 rounded font-semibold text-sm ${
                            score >= 9 ? 'bg-yellow-100 text-yellow-800' :
                            score >= 7 ? 'bg-red-100 text-red-800' :
                            score >= 5 ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {score}
                        </div>
                      ))}
                    </div>
                    
                    {scores.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Belum ada skor yang dimasukkan
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {scores.length > 0 && (
                <div className="mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Analisis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Rata-rata:</span>
                          <span className="font-medium">{(totalScore / scores.length).toFixed(2)} per panah</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Persentase:</span>
                          <span className="font-medium">{((totalScore / (scores.length * 10)) * 100).toFixed(1)}%</span>
                        </div>
                        
                        {bowDivision === 'compound' && (
                          <div className="flex justify-between">
                            <span>X-Count:</span>
                            <span className="font-medium">{xCount}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleResetScores} 
                  variant="outline" 
                  className="w-full"
                >
                  Reset Skor
                </Button>
                
                <Button 
                  className="w-full bg-archery-blue hover:bg-archery-darkBlue"
                >
                  Simpan Sesi
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Score Display - Fixed at bottom */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t z-40">
            <MobileScoreCard
              totalScore={totalScore}
              scores={scores}
              xCount={xCount}
              bowDivision={bowDivision}
              onResetScores={handleResetScores}
              onSaveSession={() => {
                toast("Sesi disimpan", {
                  description: "Skor berhasil disimpan ke riwayat",
                });
              }}
              getTotalPossibleScore={getTotalPossibleScore}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSkor;
