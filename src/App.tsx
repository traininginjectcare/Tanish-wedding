/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Sparkles,
  MapPin,
  ChevronDown,
  Heart,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { PhoneFrame } from './components/PhoneFrame';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { CountdownTimer } from './components/CountdownTimer';
import { ScratchCard } from './components/ScratchCard';
import { ScheduleSection } from './components/ScheduleSection';
import { VenueSection } from './components/VenueSection';
import { FamilyBlessings } from './components/FamilyBlessings';
import { RSVPSection } from './components/RSVPSection';
import { PetalShower } from './components/PetalShower';
import sizzlingLogo from './assets/sizzling_creations_logo.png';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPetalsActive, setIsPetalsActive] = useState(true);

  return (
    <PhoneFrame
      isPetalsActive={isPetalsActive}
      onTogglePetals={() => setIsPetalsActive(!isPetalsActive)}
    >
      {/* Falling Flower Petals Shower */}
      <PetalShower active={isPetalsActive} />

      {/* Cinematic Envelope Opening with Glitter & Reveal */}
      <EnvelopeOpening
        isOpen={isEnvelopeOpen}
        onOpen={() => setIsEnvelopeOpen(true)}
        onClose={() => setIsEnvelopeOpen(false)}
      >
        {/* INNER SCROLLABLE WEDDING INVITATION */}
        <main className="w-full px-4 py-5 flex flex-col items-center bg-[#fffaf3] text-stone-900">
          {/* Top Traditional Auspicious Header */}
          <div className="w-full text-center mb-5 pt-1">
            <span className="text-sm font-bold text-amber-800">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <div className="flex items-center justify-center gap-2 mt-0.5 text-[11px] font-cinzel font-semibold tracking-widest text-amber-900">
              <span>॥ ॐ नमः शिवाय ॥</span>
              <span>·</span>
              <span>JAI GURUJI</span>
            </div>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-1.5" />
          </div>

          {/* Palace Archway Hero Card (Matching page 1 of official card) */}
          <div className="relative w-full rounded-3xl bg-white border-2 border-[#dfc499] p-5 shadow-md text-center overflow-hidden">
            {/* Scalloped Arch & Lotus Floral Trim */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-700 via-amber-400 to-emerald-700" />

            {/* Lotus & Corner Accents */}
            <div className="flex items-center justify-between text-xs text-stone-400 px-1 mb-2">
              <span className="text-rose-600 text-lg">🪷</span>
              <span className="text-[10px] uppercase font-cinzel tracking-[0.25em] text-amber-900 font-bold">
                Wedding Festivities
              </span>
              <span className="text-emerald-700 text-lg">🪷</span>
            </div>

            <p className="font-cormorant italic text-sm text-stone-600 max-w-xs mx-auto mb-3">
              With the blessings of our elders and divine grace, we invite you to celebrate
            </p>

            {/* Groom & Bride Names */}
            <div className="my-3 py-3 border-y border-amber-200/60">
              <motion.h1
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="font-vibes text-5xl md:text-6xl text-rose-800 font-bold leading-tight"
              >
                Tanish
              </motion.h1>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                (S/O Babita & Sanjeev Gupta)
              </p>

              <div className="my-2 flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-amber-300" />
                <span className="font-cinzel text-lg text-amber-800 font-bold">
                  &
                </span>
                <div className="h-[1px] w-12 bg-amber-300" />
              </div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-vibes text-5xl md:text-6xl text-rose-800 font-bold leading-tight"
              >
                Shivani
              </motion.h1>
              <p className="text-xs text-stone-600 font-medium mt-0.5">
                (D/O Sushma & Anand Arora)
              </p>
            </div>

            <p className="font-cinzel text-xs uppercase tracking-widest text-amber-900 font-bold mt-2.5 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-700" />
              <span>Amritsar, India</span>
            </p>

            {/* Palace Dome & Peacock Motif Footer inside card */}
            <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-stone-500 font-cinzel">
              <span className="flex items-center gap-1 text-emerald-800">
                <span>🦚</span> Royal Peacock
              </span>
              <span className="text-amber-800 font-bold">November 2026</span>
              <span className="flex items-center gap-1 text-rose-800">
                <span>🏛️</span> The Bagh
              </span>
            </div>

            {/* Scroll Hint */}
            <div className="mt-3 flex flex-col items-center justify-center text-amber-800 animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* INTERACTIVE SCRATCH CARD (Save the Date) */}
          <div className="w-full my-6">
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-1.5 text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs uppercase tracking-widest font-semibold font-cinzel">
                  Interactive Reveal
                </span>
              </div>
              <h3 className="font-cormorant font-bold text-3xl text-stone-900 mt-0.5">
                Save The Date
              </h3>
            </div>

            {/* Scratch Card 1: Wedding Dates */}
            <ScratchCard
              title="Auspicious Wedding Dates"
              badgeLabel="Scratch To Reveal Date"
              foilColor="gold"
            >
              <div className="p-3 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>The Wedding Festivities</span>
                </div>
                <h4 className="font-cormorant font-bold text-3xl text-amber-950">
                  November 20 & 21, 2026
                </h4>
                <p className="text-xs text-stone-600">
                  Friday & Saturday · Amritsar, Punjab
                </p>
                <div className="pt-1 flex items-center justify-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Mehendi · Sangeet · Haldi · Wedding
                  </span>
                </div>
              </div>
            </ScratchCard>

            {/* Scratch Card 2: Note from Couple */}
            <ScratchCard
              title="A Note From Tanish & Shivani"
              badgeLabel="Scratch For Couple's Note"
              foilColor="rose"
            >
              <div className="p-3 space-y-1.5">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600 mx-auto" />
                <p className="font-cormorant italic text-base text-stone-800 leading-snug max-w-xs mx-auto">
                  "From our first conversations to our lifelong vows, we are blessed to celebrate this auspicious milestone with you in Amritsar."
                </p>
                <p className="font-vibes text-2xl text-rose-800 font-bold">
                  With love, Tanish & Shivani
                </p>
              </div>
            </ScratchCard>
          </div>

          {/* LIVE COUNTDOWN WITH CALENDAR SAVER */}
          <CountdownTimer />

          {/* SCHEDULE OF EVENTS (Minimal & clean) */}
          <ScheduleSection />

          {/* CELEBRATION VENUES */}
          <VenueSection />

          {/* FAMILY BLESSINGS & WITH BEST COMPLIMENTS */}
          <FamilyBlessings />

          {/* WISHES FOR THE COUPLE & RSVP CONTACTS */}
          <RSVPSection />

          {/* Minimal Couple Sign-off */}
          <div className="w-full text-center py-5 border-t border-amber-200/60 text-stone-500 text-xs space-y-1">
            <p className="font-vibes text-3xl text-amber-800">
              Tanish & Shivani
            </p>
            <p className="text-[10px] uppercase tracking-widest font-cinzel text-stone-600">
              November 20 & 21, 2026 · Amritsar, Punjab
            </p>
            <p className="text-[10px] text-stone-500">
              #TanishKiShivani · With Love & Blessings
            </p>
          </div>

          {/* CREATOR BRANDING: SIZZLING CREATIONS */}
          <footer className="w-full mt-4 pt-5 pb-8 border-t border-amber-300/40 text-center">
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 border border-amber-200/60 shadow-xs max-w-xs mx-auto">
              {/* Sizzling Creations Logo */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-300/70 shadow-sm mb-2.5 bg-white p-0.5">
                <img
                  src={sizzlingLogo}
                  alt="Sizzling Creations"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <span className="text-[10px] uppercase tracking-widest font-cinzel text-amber-900/80 font-semibold">
                Designed & Crafted by
              </span>
              <h5 className="font-cormorant font-bold text-xl text-rose-900 leading-tight mt-0.5">
                Sizzling Creations
              </h5>
              <p className="text-xs font-medium text-stone-700 mt-0.5">
                Shradha Agarwal
              </p>

              {/* Contact buttons */}
              <div className="flex items-center gap-2 mt-2.5">
                <a
                  href="tel:+919724470003"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium border border-stone-300/70 transition-colors"
                >
                  <Phone className="w-3 h-3 text-amber-800" />
                  <span>+91 97244 70003</span>
                </a>
                <a
                  href="https://wa.me/919724470003?text=Hello%20Shradha!%20Loved%20your%20wedding%20invitation%20designs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-medium border border-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </EnvelopeOpening>
    </PhoneFrame>
  );
}
