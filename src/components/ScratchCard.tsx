import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw } from 'lucide-react';

interface ScratchCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  revealThreshold?: number; // 0 to 100 percentage
  foilColor?: 'gold' | 'rose';
  badgeLabel?: string;
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  title,
  subtitle,
  children,
  revealThreshold = 38,
  foilColor = 'gold',
  badgeLabel = 'Scratch to Reveal',
  onRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const hasTriggeredConfetti = useRef(false);

  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Rich metallic foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (foilColor === 'gold') {
      grad.addColorStop(0, '#d4af37');
      grad.addColorStop(0.2, '#fff6c2');
      grad.addColorStop(0.45, '#b38728');
      grad.addColorStop(0.7, '#fef08a');
      grad.addColorStop(1, '#8c5e13');
    } else {
      grad.addColorStop(0, '#be185d');
      grad.addColorStop(0.3, '#fbcfe8');
      grad.addColorStop(0.6, '#9d174d');
      grad.addColorStop(1, '#701a75');
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Luxury glitter speckles
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 0.5;
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(254, 240, 138, 0.6)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Elegant gold hairline border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Clear instruction on foil
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Cormorant Garamond, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ ' + badgeLabel.toUpperCase() + ' ✨', width / 2, height / 2 - 8);

    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('Scratch with finger or cursor', width / 2, height / 2 + 14);

    setIsRevealed(false);
    hasTriggeredConfetti.current = false;
  }, [foilColor, badgeLabel]);

  // Adjust canvas size to match container
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      initFoil();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initFoil]);

  const checkPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;

      for (let i = 3; i < data.length; i += 16 * 4) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / (totalPixels / 16)) * 100);

      if (percent >= revealThreshold && !hasTriggeredConfetti.current) {
        hasTriggeredConfetti.current = true;
        setIsRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#e11d48', '#f59e0b', '#10b981'],
        });

        if (onRevealed) onRevealed();
      }
    } catch {
      // ignore
    }
  }, [isRevealed, revealThreshold, onRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28 * dpr, 0, Math.PI * 2);
    ctx.fill();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
    checkPercentage();
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    checkPercentage();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#fffaf3] shadow-md border border-[#dfc499] my-4 transition-all">
      {/* Header Info without any 0% revealed button */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-amber-200/50">
        <h4 className="font-cormorant font-bold text-lg text-amber-950 leading-snug flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          {title}
        </h4>

        {isRevealed && (
          <button
            onClick={initFoil}
            className="text-xs text-amber-800 flex items-center gap-1 hover:underline p-1 cursor-pointer"
            title="Scratch again"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Scratch Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[160px] select-none touch-none flex items-center justify-center p-4 bg-gradient-to-br from-amber-50/70 via-rose-50/40 to-amber-100/50"
      >
        {/* Revealed Content */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
          {children}
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-500 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
};
