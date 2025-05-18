
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TargetFaceProps {
  size?: number;
  onScoreSelect?: (score: number, position: { x: number, y: number }) => void;
  className?: string;
  targetType?: 'indoor' | 'outdoor' | '3d' | 'field';
  bowDivision?: 'recurve' | 'compound' | 'barebow' | 'traditional';
}

const TargetFace: React.FC<TargetFaceProps> = ({
  size = 300,
  onScoreSelect,
  className,
  targetType = 'outdoor',
  bowDivision = 'recurve'
}) => {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number, y: number, score: number } | null>(null);
  
  const center = size / 2;
  
  // World Archery standard 10-zone target face
  const getRingWidth = () => {
    // Ring width calculations based on World Archery specifications
    return size / 20; // Standard 10 rings
  };
  
  const ringWidth = getRingWidth();
  
  // Score rings definition based on World Archery standards
  // Recurve and Barebow use whole numbers from 1-10
  // Compound uses 10-ring with inner X-ring (counted as 10 for score, but X for tie-breaks)
  const rings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; 
  
  // X-ring is the inner half of the 10-ring for compound scoring
  const xRingRadius = bowDivision === 'compound' ? ringWidth / 2 : 0;
  
  const getScoreColors = () => {
    return {
      10: '#FFCC00', // Gold/Yellow
      9: '#FFCC00',  // Gold/Yellow
      8: '#FF0000',  // Red
      7: '#FF0000',  // Red
      6: '#1E90FF',  // Blue
      5: '#1E90FF',  // Blue
      4: '#000000',  // Black
      3: '#000000',  // Black
      2: '#FFFFFF',  // White
      1: '#FFFFFF',  // White
      X: '#FFCC00'   // Gold/Yellow (inner X-ring)
    };
  };
  
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    // Calculate distance from center to determine score
    const dx = x - center;
    const dy = y - center;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate score based on distance according to World Archery rules
    let score;
    if (bowDivision === 'compound' && distance <= xRingRadius) {
      score = 11; // X-ring (we represent X as 11 internally for compound)
    } else {
      for (let i = 0; i < rings.length; i++) {
        const ringRadius = (i + 1) * ringWidth;
        if (distance <= ringRadius) {
          score = rings[i];
          break;
        }
      }
    }
    
    // If no score is determined, the click was outside the target
    if (score === undefined) {
      score = 0; // Miss
    }
    
    setSelectedPoint({ x, y, score });
    
    if (onScoreSelect) {
      // For compound bows, X counts as 10 points but is tracked separately
      const reportedScore = score === 11 ? 10 : score;
      onScoreSelect(reportedScore, { x: dx / center, y: dy / center });
    }
  };
  
  // Define classes for each ring based on World Archery colors
  const getRingClass = (ringIndex: number) => {
    switch (ringIndex) {
      case 0:  // 10 (Gold/Yellow)
      case 1:  // 9 (Gold/Yellow)
        return 'target-ring-yellow';
      case 2:  // 8 (Red)
      case 3:  // 7 (Red)
        return 'target-ring-red';
      case 4:  // 6 (Blue)
      case 5:  // 5 (Blue)
        return 'target-ring-blue';
      case 6:  // 4 (Black)
      case 7:  // 3 (Black)
        return 'target-ring-black';
      case 8:  // 2 (White)
      case 9:  // 1 (White)
        return 'target-ring-white';
      default:
        return 'target-ring-white';
    }
  };
  
  return (
    <div className={cn("inline-block relative", className)}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        onClick={handleClick}
        className="cursor-crosshair"
      >
        {/* Outer circles first (background) */}
        {rings.map((score, i) => {
          return (
            <circle
              key={`ring-${i}`}
              cx={center}
              cy={center}
              r={(10 - i) * ringWidth}
              className={getRingClass(i)}
              strokeWidth={1}
            />
          );
        })}
        
        {/* X-ring (center) for compound scoring */}
        {bowDivision === 'compound' && (
          <circle
            cx={center}
            cy={center}
            r={xRingRadius}
            className="target-x"
            strokeWidth={1}
          />
        )}
        
        {/* Selected point marker */}
        {selectedPoint && (
          <>
            <circle
              cx={selectedPoint.x}
              cy={selectedPoint.y}
              r={4}
              fill="black"
              className="animate-scale-in"
            />
            <circle
              cx={selectedPoint.x}
              cy={selectedPoint.y}
              r={8}
              stroke="black"
              strokeWidth={2}
              fill="transparent"
              className="animate-scale-in"
            />
          </>
        )}
      </svg>
      
      {/* Score display */}
      {selectedPoint && (
        <div className="absolute bottom-2 right-2 bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-archery-blue shadow-md animate-scale-in">
          <span className="text-xl font-bold">
            {selectedPoint.score === 11 ? 'X' : selectedPoint.score}
          </span>
        </div>
      )}
      
      {/* Target type indicator */}
      <div className="absolute top-2 left-2 bg-white/80 rounded-md px-2 py-1 text-xs font-medium">
        {targetType.charAt(0).toUpperCase() + targetType.slice(1)} - {bowDivision.charAt(0).toUpperCase() + bowDivision.slice(1)}
      </div>
    </div>
  );
};

export default TargetFace;
