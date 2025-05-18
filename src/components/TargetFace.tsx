import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TargetFaceProps {
  size?: number;
  onScoreSelect?: (score: number, position: { x: number, y: number }) => void;
  className?: string;
}

const TargetFace: React.FC<TargetFaceProps> = ({
  size = 300,
  onScoreSelect,
  className
}) => {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number, y: number, score: number } | null>(null);
  
  const center = size / 2;
  const ringWidth = size / 20; // Width of each ring
  const rings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]; // Score rings from inside to outside
  
  // X-ring is the inner half of the 10-ring
  const xRingRadius = ringWidth / 2;
  
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    // Calculate distance from center to determine score
    const dx = x - center;
    const dy = y - center;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate score based on distance
    let score;
    if (distance <= xRingRadius) {
      score = 11; // X-ring (we represent X as 11 internally)
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
      onScoreSelect(score === 11 ? 10 : score, { x: dx / center, y: dy / center });
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
          // Define which CSS class to use based on the ring score
          const ringClass = `target-ring-${i + 1}`;
          
          return (
            <circle
              key={`ring-${i}`}
              cx={center}
              cy={center}
              r={(10 - i) * ringWidth}
              className={ringClass}
              strokeWidth={2}
            />
          );
        })}
        
        {/* X-ring (center) */}
        <circle
          cx={center}
          cy={center}
          r={xRingRadius}
          className="target-x"
          strokeWidth={2}
        />
        
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
    </div>
  );
};

export default TargetFace;
