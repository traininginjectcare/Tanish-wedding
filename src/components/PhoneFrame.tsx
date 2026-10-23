import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flower2, Maximize2, Smartphone } from 'lucide-react';
import { weddingAudio } from '../utils/audioManager';

interface PhoneFrameProps {
  children: React.ReactNode;
  isPetalsActive: boolean;
  onTogglePetals: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isPetalsActive,
  onTogglePetals,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isDesktopFrameMode, setIsDesktopFrameMode] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTimeStr(`${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const active = weddingAudio.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <div className="min-h-screen w-full bg-[#12060c] flex flex-col items-center justify-start md:justify-center p-0 md:py-6 relative overflow-x-hidden">
      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #881337 0%, transparent 70%)',
        }}
      />

      {/* Top Floating Controls Bar (Audio, Petals, Frame Toggle) */}
      <header className="fixed top-3 z-50 flex items-center justify-between w-full max-w-sm px-4 pointer-events-none">
        {/* Left: Shehnai Music Player */}
        <button
          onClick={handleToggleAudio}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 text-amber-200 border border-amber-500/40 shadow-lg backdrop-blur-md text-[11px] font-medium hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Play / Mute Shehnai Music"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-amber-300 animate-pulse delay-75" />
                <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse delay-150" />
              </span>
              <span className="text-[10px]">Music On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[10px] text-stone-300">Play Music</span>
            </>
          )}
        </button>

        {/* Right: Petal Shower Toggle & Desktop Frame Toggle */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={onTogglePetals}
            className={`p-2 rounded-full border shadow-lg backdrop-blur-md text-xs transition-all cursor-pointer ${
              isPetalsActive
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                : 'bg-stone-900/80 text-stone-400 border-stone-700/40'
            }`}
            title="Toggle Falling Petals"
          >
            <Flower2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsDesktopFrameMode(!isDesktopFrameMode)}
            className="hidden md:flex p-2 rounded-full bg-stone-900/80 text-amber-300 border border-amber-500/30 shadow-lg backdrop-blur-md text-xs hover:scale-105 transition-all cursor-pointer"
            title={isDesktopFrameMode ? 'Switch to Full Screen View' : 'Switch to Phone View'}
          >
            {isDesktopFrameMode ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isDesktopFrameMode
            ? 'md:max-w-[420px] md:rounded-[48px] md:shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.25)] md:border-[10px] md:border-[#221f1e] md:ring-1 md:ring-amber-500/30'
            : 'max-w-xl'
        }`}
        style={{ minHeight: '100vh' }}
      >
        {/* Dynamic Island / Status Bar for Desktop Phone Frame */}
        {isDesktopFrameMode && (
          <div className="hidden md:flex items-center justify-between px-7 pt-3 pb-1 w-full bg-stone-950 text-stone-300 text-[11px] font-semibold tracking-tight z-40 rounded-t-[38px]">
            <span>{currentTimeStr}</span>
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-stone-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 mr-1" />
              <div className="w-2 h-2 rounded-full bg-stone-700" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 rounded-xs border border-stone-300 p-0.5">
                <div className="w-full h-full bg-stone-200" />
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Phone Screen Canvas */}
        <div
          className={`w-full min-h-screen md:min-h-[840px] md:max-h-[880px] overflow-y-auto no-scrollbar relative flex flex-col justify-between ${
            isDesktopFrameMode ? 'md:rounded-b-[38px]' : ''
          }`}
          style={{
            background: 'linear-gradient(to bottom, #14050d 0%, #250918 50%, #0e1713 100%)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
