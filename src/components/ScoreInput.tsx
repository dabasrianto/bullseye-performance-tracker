import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TargetFace from './TargetFace';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Score {
  value: number;
  position: { x: number; y: number };
  isX: boolean;
}

interface ScoreInputProps {
  onScoreSelect: (score: number) => void;
}

const bowTypes = ['Recurve', 'Compound', 'Barebow', 'Traditional', 'Longbow'];
const distances = ['10m', '18m', '30m', '50m', '70m', '90m'];
const roundTypes = ['WA 720', 'Indoor 18m', 'Field', 'Nasional', '3D'];

const ScoreInput: React.FC<ScoreInputProps> = ({ onScoreSelect }) => {
  const [activeEnd, setActiveEnd] = useState(1);
  const [scores, setScores] = useState<Record<number, Score[]>>({ 1: [] });
  const [bowType, setBowType] = useState('Recurve');
  const [distance, setDistance] = useState('70m');
  const [roundType, setRoundType] = useState('WA 720');

  const handleScoreSelect = (score: number, position: { x: number, y: number }) => {
    const isX = score === 10 && Math.sqrt(position.x * position.x + position.y * position.y) <= 0.05;
    const newScore = { value: score, position, isX };
    
    setScores(prev => {
      const endScores = [...(prev[activeEnd] || [])];
      if (endScores.length < 3) {  // Maximum 3 arrows per end
        endScores.push(newScore);
        return { ...prev, [activeEnd]: endScores };
      }
      return prev;
    });

    // Pass the score up to the parent component
    onScoreSelect(score);
  };

  const addEnd = () => {
    setActiveEnd(prev => prev + 1);
    setScores(prev => ({ ...prev, [activeEnd + 1]: [] }));
  };

  const removeLastArrow = () => {
    setScores(prev => {
      const endScores = [...(prev[activeEnd] || [])];
      if (endScores.length > 0) {
        endScores.pop();
        return { ...prev, [activeEnd]: endScores };
      }
      return prev;
    });
  };

  const getCurrentEndTotal = () => {
    const endScores = scores[activeEnd] || [];
    return endScores.reduce((sum, score) => sum + score.value, 0);
  };

  const getRunningTotal = () => {
    return Object.values(scores).flat().reduce((sum, score) => sum + score.value, 0);
  };

  const getXCount = () => {
    return Object.values(scores).flat().filter(score => score.isX).length;
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-archery-darkBlue">
          Input Skor - End {activeEnd}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visual" className="w-full mb-6">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="visual">
            <div className="flex flex-col items-center w-full">
              <TargetFace onScoreSelect={handleScoreSelect} className="mb-4" />
              
              <div className="flex flex-wrap gap-2 mt-2 w-full justify-center">
                {(scores[activeEnd] || []).map((score, idx) => (
                  <div key={idx} className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-archery-blue bg-white shadow-sm">
                    <span className="text-lg font-bold">{score.isX ? 'X' : score.value}</span>
                  </div>
                ))}
                
                {Array.from({ length: 3 - (scores[activeEnd] || []).length }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-gray-300">?</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 'X'].map((value) => (
                <Button
                  key={value}
                  variant={value === 'X' ? "secondary" : "outline"}
                  className="h-12 text-lg font-bold"
                  onClick={() => {
                    const numericValue = value === 'X' ? 10 : Number(value);
                    handleScoreSelect(numericValue, { x: 0, y: 0 });
                  }}
                >
                  {value}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipe Busur</label>
            <Select value={bowType} onValueChange={setBowType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe busur" />
              </SelectTrigger>
              <SelectContent>
                {bowTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Jarak</label>
            <Select value={distance} onValueChange={setDistance}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jarak" />
              </SelectTrigger>
              <SelectContent>
                {distances.map((dist) => (
                  <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Jenis Ronde</label>
            <Select value={roundType} onValueChange={setRoundType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis ronde" />
              </SelectTrigger>
              <SelectContent>
                {roundTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-archery-blue text-white">
            <CardContent className="pt-4">
              <p className="text-sm">Total End Saat Ini</p>
              <p className="text-3xl font-bold">{getCurrentEndTotal()}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-archery-orange text-white">
            <CardContent className="pt-4">
              <p className="text-sm">Total Keseluruhan</p>
              <p className="text-3xl font-bold">{getRunningTotal()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm">X Count</p>
              <p className="text-3xl font-bold">{getXCount()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm">Rata-rata Per Panah</p>
              <p className="text-3xl font-bold">
                {Object.values(scores).flat().length
                  ? (getRunningTotal() / Object.values(scores).flat().length).toFixed(1)
                  : "0.0"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <Button variant="outline" onClick={removeLastArrow}>
            Hapus Panah Terakhir
          </Button>
          
          <div className="flex gap-2">
            <Button variant="secondary" onClick={addEnd} disabled={(scores[activeEnd] || []).length < 3}>
              End Berikutnya
            </Button>
            <Button className="bg-archery-blue hover:bg-archery-darkBlue">
              Simpan Skor
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreInput;
