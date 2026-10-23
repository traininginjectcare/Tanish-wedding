import React, { useMemo } from 'react';

interface PetalShowerProps {
  active: boolean;
  themeId?: string;
}

interface PetalItem {
  id: number;
  left: number; // 0 to 100%
  size: number; // px
  duration: number; // s
  delay: number; // s
  rotation: number;
  type: 'rose' | 'marigold' | 'gold';
}

export const PetalShower: React.FC<PetalShowerProps> = ({ active, themeId }) => {
  const petals = useMemo<PetalItem[]>(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 12) + 14,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      type:
        themeId === 'haldi-marigold'
          ? Math.random() > 0.4 ? 'marigold' : 'gold'
          : Math.random() > 0.5 ? 'rose' : Math.random() > 0.5 ? 'marigold' : 'gold',
    }));
  }, [themeId]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-30">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            top: '-25px',
          }}
        >
          {petal.type === 'rose' && (
            <svg viewBox="0 0 30 40" className="w-full h-full drop-shadow-sm opacity-85">
              <path
                d="M15,0 C25,10 30,25 20,38 C10,40 5,30 2,20 C-1,10 5,0 15,0 Z"
                fill="url(#roseGrad)"
              />
              <defs>
                <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="60%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.type === 'marigold' && (
            <svg viewBox="0 0 30 35" className="w-full h-full drop-shadow-sm opacity-85">
              <path
                d="M15,0 C28,8 28,26 15,35 C2,26 2,8 15,0 Z"
                fill="url(#marigoldGrad)"
              />
              <defs>
                <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.type === 'gold' && (
            <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-sm opacity-90">
              <polygon points="10,0 13,7 20,10 13,13 10,20 7,13 0,10 7,7" fill="#fde047" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
