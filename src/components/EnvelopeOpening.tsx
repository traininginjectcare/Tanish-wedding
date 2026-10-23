import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { weddingAudio } from '../utils/audioManager';

interface EnvelopeOpeningProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

interface GlitterParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  isOpen,
  onOpen,
  onClose,
  children,
}) => {
  // Animation states: 'closed' -> 'bursting' -> 'flap-open' -> 'card-emerge' -> 'opened'
  const [stage, setStage] = useState<'closed' | 'bursting' | 'flap-open' | 'card-emerge'>('closed');
  const [glitterItems, setGlitterItems] = useState<GlitterParticle[]>([]);

  const handleSealTap = () => {
    if (stage !== 'closed') return;

    // Start background music at low volume
    weddingAudio.play();

    // Generate glitter particle shower
    const glitters: GlitterParticle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 320,
      size: Math.random() * 6 + 3,
      color: ['#fbbf24', '#fef08a', '#ffffff', '#f59e0b', '#d4af37'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.4,
      duration: Math.random() * 0.8 + 0.8,
    }));
    setGlitterItems(glitters);

    // Multi-ring golden confetti burst
    confetti({
      particleCount: 55,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#fef08a', '#ffffff', '#e11d48'],
      ticks: 200,
      gravity: 0.8,
    });

    // 1. Glitter burst
    setStage('bursting');

    // 2. Slow 3D Flap opening
    setTimeout(() => {
      setStage('flap-open');
    }, 450);

    // 3. Card emerges and rises from below
    setTimeout(() => {
      setStage('card-emerge');
      // Second soft glitter burst as card emerges
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#d4af37', '#ffffff'],
        ticks: 150,
      });
    }, 1100);

    // 4. Reveal full invitation
    setTimeout(() => {
      onOpen();
      setStage('closed');
    }, 2200);
  };

  const handleClose = () => {
    onClose();
    setStage('closed');
  };

  return (
    <div className="relative w-full min-h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* CLOSED ENVELOPE SCREEN (ONLY MONOGRAM, NO OTHER TEXT) */
          <motion.div
            key="envelope-closed-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="w-full min-h-[95vh] flex flex-col items-center justify-center p-3 relative select-none"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial from-rose-950/40 via-neutral-950 to-neutral-950 pointer-events-none" />

            {/* Subtle Damask Floral Shimmer */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* 3D ENVELOPE STAGE */}
            <div
              className="relative w-full max-w-[340px] h-[480px] flex items-center justify-center"
              style={{ perspective: '1400px' }}
            >
              {/* Envelope Back Body */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(190,24,93,0.35)] border-2 border-[#d4af37]/50"
                style={{
                  background: 'linear-gradient(145deg, #701a39 0%, #881337 50%, #580c25 100%)',
                }}
              >
                {/* Gold Inner Linings */}
                <div className="absolute inset-3 rounded-2xl border border-amber-300/35 pointer-events-none" />
                <div className="absolute inset-5 rounded-xl border border-amber-200/20 pointer-events-none" />
              </div>

              {/* INVITATION CARD NESTLED BELOW — SLOWLY REVEALS & SLIDES UP */}
              <motion.div
                initial={{ y: 0, scale: 0.93, opacity: 0.8 }}
                animate={
                  stage === 'card-emerge'
                    ? { y: -290, scale: 1, opacity: 1, zIndex: 35 }
                    : { y: 0, scale: 0.93, opacity: 0.8, zIndex: 10 }
                }
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-5 inset-x-4 h-[430px] rounded-2xl bg-[#fffaf3] border-2 border-[#dfc499] shadow-2xl p-6 flex flex-col items-center justify-between text-center overflow-hidden"
              >
                {/* Traditional lotus & arch motifs */}
                <div className="w-full">
                  <span className="text-xs font-bold text-amber-800 tracking-widest">
                    ॥ श्री गणेशाय नमः ॥
                  </span>
                  <p className="text-[10px] font-cinzel font-semibold tracking-wider text-amber-900 mt-1">
                    ॥ ॐ नमः शिवाय ॥ · JAI GURUJI
                  </p>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
                </div>

                <div className="my-auto">
                  <h3 className="font-vibes text-5xl text-rose-800 font-bold leading-tight">
                    Tanish & Shivani
                  </h3>
                  <div className="h-[1px] w-12 bg-amber-300 mx-auto my-2" />
                  <p className="text-xs font-cinzel font-semibold text-amber-900 tracking-wider">
                    November 20 & 21, 2026
                  </p>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Amritsar, Punjab
                  </p>
                </div>

                <div className="w-full flex items-center justify-between text-[11px] text-stone-500 font-cinzel border-t border-amber-100 pt-2">
                  <span>🪷 Mehendi</span>
                  <span>✨ Sangeet</span>
                  <span>🦚 Wedding</span>
                </div>
              </motion.div>

              {/* ENVELOPE FRONT POCKET (Covers lower half of card) */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-20 overflow-hidden"
                style={{
                  clipPath: 'polygon(0% 48%, 50% 67%, 100% 48%, 100% 100%, 0% 100%)',
                  background: 'linear-gradient(to top, #4c0519 0%, #881337 60%, #9f1239 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(254, 240, 138, 0.4)',
                }}
              >
                {/* Flap fold creases */}
                <svg className="w-full h-full" viewBox="0 0 340 480" preserveAspectRatio="none">
                  <path
                    d="M0,480 L170,320 L340,480"
                    fill="none"
                    stroke="#fde68a"
                    strokeWidth="1.2"
                    strokeOpacity="0.35"
                  />
                </svg>
              </div>

              {/* 3D TOP FOLDING FLAP (Slowly rotates 180° upwards) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={
                  stage === 'flap-open' || stage === 'card-emerge'
                    ? { rotateX: 180, zIndex: 5 }
                    : { rotateX: 0, zIndex: 25 }
                }
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute top-0 inset-x-0 h-[245px] rounded-t-3xl overflow-hidden pointer-events-none shadow-md"
              >
                <div
                  className="w-full h-full"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    background: 'linear-gradient(180deg, #9f1239 0%, #881337 70%, #701a75 100%)',
                    borderBottom: '2px solid rgba(254, 240, 138, 0.45)',
                  }}
                >
                  <svg className="w-full h-full" viewBox="0 0 340 245">
                    <polygon
                      points="12,12 328,12 170,230"
                      fill="none"
                      stroke="#fde68a"
                      strokeWidth="1"
                      strokeOpacity="0.35"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* GLITTER PARTICLES SHOWER */}
              {stage === 'bursting' && (
                <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                  {glitterItems.map((g) => (
                    <motion.div
                      key={g.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        x: g.x,
                        y: g.y,
                        opacity: [1, 1, 0],
                        scale: [0, 1.4, 0.2],
                        rotate: [0, 180],
                      }}
                      transition={{
                        duration: g.duration,
                        delay: g.delay,
                        ease: 'easeOut',
                      }}
                      className="absolute rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      style={{
                        width: g.size,
                        height: g.size,
                        backgroundColor: g.color,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ONLY THE MONOGRAM WAX SEAL IN CENTER (NO OTHER TEXT) */}
              {stage !== 'card-emerge' && (
                <div className="absolute top-[236px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
                  {/* Subtle pulsing glow ring around seal */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute -inset-3 rounded-full bg-amber-400/25 blur-md pointer-events-none"
                  />

                  {/* Golden Wax Seal with ONLY Monogram */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    animate={
                      stage === 'bursting'
                        ? { scale: [1, 1.25, 0], opacity: [1, 0.9, 0] }
                        : { scale: 1, opacity: 1 }
                    }
                    onClick={handleSealTap}
                    className="relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer select-none transition-transform"
                    style={{
                      background: 'radial-gradient(circle, #fffdf5 15%, #fef3c7 55%, #fde68a 100%)',
                      boxShadow:
                        '0 12px 30px rgba(0, 0, 0, 0.65), inset 0 3px 6px rgba(255, 255, 255, 0.9), inset 0 -4px 8px rgba(180, 83, 9, 0.45), 0 0 25px rgba(212, 175, 55, 0.6)',
                      border: '3px solid #d4af37',
                    }}
                  >
                    {/* Beaded rim */}
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-600/70" />

                    {/* Pure Monogram Only */}
                    <span className="font-cormorant font-bold text-3xl tracking-widest text-amber-950 drop-shadow-sm select-none">
                      T & S
                    </span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* UNVEILED FULL INVITATION SCREEN */
          <motion.div
            key="envelope-opened-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            {/* Minimal Top Bar */}
            <div className="sticky top-0 z-40 w-full px-4 py-2.5 bg-[#4c0519]/90 backdrop-blur-md border-b border-amber-300/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-amber-200">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span className="font-cinzel font-semibold tracking-wide">Tanish & Shivani</span>
              </div>
              <button
                onClick={handleClose}
                className="text-[11px] text-amber-200/90 hover:text-amber-100 px-2.5 py-1 rounded-lg border border-amber-300/30 bg-rose-950/40 hover:bg-rose-950/80 transition-colors cursor-pointer"
              >
                Close Envelope
              </button>
            </div>

            {/* Main Content */}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
