
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ScoreInput from "@/components/ScoreInput";
import TargetFace from "@/components/TargetFace";
import { toast } from "sonner";

const InputSkor = () => {
  const [scores, setScores] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [roundName, setRoundName] = useState("");
  const [totalScore, setTotalScore] = useState(0);

  const handleScoreSubmit = (score: number) => {
    setCurrentScore(score);
    const newScores = [...scores, score];
    setScores(newScores);
    
    // Update total score
    const newTotal = newScores.reduce((acc, curr) => acc + curr, 0);
    setTotalScore(newTotal);
    
    toast("Skor ditambahkan", {
      description: `Panah ${newScores.length}: ${score} poin`,
      // Change to a valid variant:
      variant: "default",
    });
  };

  const handleResetScores = () => {
    setScores([]);
    setCurrentScore(null);
    setTotalScore(0);
    toast("Skor direset", {
      description: "Semua skor telah dihapus",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-archery-darkBlue">
          Input Skor
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Target</h2>
            <div className="flex justify-center mb-6">
              <TargetFace size={280} currentScore={currentScore} />
            </div>
            
            <div className="mb-4">
              <label htmlFor="roundName" className="block text-sm font-medium mb-1">
                Nama Ronde
              </label>
              <Input
                id="roundName"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
                placeholder="Contoh: Latihan 30m"
              />
            </div>
            
            <ScoreInput onScoreSubmit={handleScoreSubmit} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Hasil Skor</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-archery-blue mb-2">{totalScore}</div>
              <div className="text-gray-500">Total Skor</div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Detail Skor</h3>
              <div className="grid grid-cols-6 gap-2">
                {scores.map((score, index) => (
                  <div 
                    key={index}
                    className={`text-center p-2 rounded font-semibold ${
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
            </div>
            
            <Button 
              onClick={handleResetScores} 
              variant="outline" 
              className="w-full"
            >
              Reset Skor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSkor;
