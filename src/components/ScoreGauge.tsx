import React from 'react';

interface ScoreGaugeProps {
  score: number;
  label: string;
  color: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, label, color }) => {
  const angle = (score / 100) * 180;

  const getColorClass = () => {
    if (color === 'blue') {
      return 'text-blue-600';
    } else if (color === 'purple') {
      return 'text-purple-600';
    }
    return 'text-gray-600';
  };

  const getGradientId = () => {
    return `gradient-${label.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const centerX = 100;
  const centerY = 100;
  const radius = 80;

  const start = polarToCartesian(centerX, centerY, radius, 0);
  const end = polarToCartesian(centerX, centerY, radius, angle);
  const arcFlag = angle > 180 ? 1 : 0;

  const needle = polarToCartesian(centerX, centerY, 70, angle);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20 mt-2">
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Background arc */}
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="0%">
              {color === 'blue' ? (
                <>
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#2563eb" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Score arc */}
          <path
            d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcFlag} 1 ${end.x} ${end.y}`}
            stroke={`url(#${getGradientId()})`}
            strokeWidth="12"
            fill="none"
          />

          {/* Needle */}
          <line
            x1={centerX}
            y1={centerY}
            x2={needle.x}
            y2={needle.y}
            stroke={color === 'blue' ? '#2563eb' : '#7c3aed'}
            strokeWidth="2"
          />

          {/* Center circle */}
          <circle cx={centerX} cy={centerY} r="6" fill={color === 'blue' ? '#2563eb' : '#7c3aed'} />
        </svg>

        {/* Score text */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          <span className={getColorClass()}>{score}</span>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
};
