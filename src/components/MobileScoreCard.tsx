import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MobileScoreCardProps {
  totalScore: number;
  scores: number[];
  xCount: number;
  bowDivision: string;
  onResetScores: () => void;
  onSaveSession: () => void;
  getTotalPossibleScore: () => number;
}

const MobileScoreCard: React.FC<MobileScoreCardProps> = ({
  totalScore,
  scores,
  xCount,
  bowDivision,
  onResetScores,
  onSaveSession,
  getTotalPossibleScore
}) => {
  return (
    <div className="space-y-4">
      {/* Main Score Display */}
      <Card className="bg-gradient-to-br from-archery-blue to-archery-darkBlue text-white">
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{totalScore}</div>
            <div className="text-xs opacity-80">dari {getTotalPossibleScore()} poin maksimal</div>
            
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

      {/* Score Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Detail Skor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
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
            <div className="text-center py-6 text-gray-500 text-sm">
              Belum ada skor yang dimasukkan
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics */}
      {scores.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Analisis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
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
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3">
        <Button 
          onClick={onResetScores} 
          variant="outline" 
          className="w-full"
        >
          Reset Skor
        </Button>
        
        <Button 
          onClick={onSaveSession}
          className="w-full bg-archery-blue hover:bg-archery-darkBlue"
        >
          Simpan Sesi
        </Button>
      </div>
    </div>
  );
};

export default MobileScoreCard;