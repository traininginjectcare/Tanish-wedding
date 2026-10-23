import React from 'react';
import { Heart, FileText, Download } from 'lucide-react';
import { BEST_COMPLIMENTS } from '../data/weddingData';

export const FamilyBlessings: React.FC = () => {
  return (
    <div className="w-full my-7">
      {/* Decorative Arch Card matching Page 1 & 6 of the card */}
      <div className="relative rounded-3xl bg-[#fffaf3] border-2 border-[#dfc499] p-5 text-center shadow-md overflow-hidden">
        {/* Top Gold Trim */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-700 via-amber-400 to-emerald-700" />

        {/* Sacred Invocations */}
        <div className="flex flex-col items-center justify-center mb-4 pt-1">
          <span className="text-xl text-amber-800 font-bold mb-0.5">
            ॥ ॐ नमः शिवाय ॥
          </span>
          <span className="text-xs uppercase tracking-[0.25em] font-cinzel font-bold text-amber-900">
            JAI GURUJI
          </span>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1.5" />
        </div>

        {/* Ancestral Blessings */}
        <div className="my-3 px-1">
          <p className="text-[11px] uppercase tracking-wider text-amber-800/80 font-cinzel font-semibold mb-1">
            With the blessings of
          </p>
          <p className="font-cormorant font-semibold text-lg text-stone-900 leading-snug">
            Late Smt Tripta Rani & Late Shri Jagat Ram Gupta
          </p>
          <p className="text-xs text-amber-700 font-serif my-0.5">&</p>
          <p className="font-cormorant font-semibold text-lg text-stone-900 leading-snug">
            Smt Raman Kanta & Late Shri Brij Mohan Goel
          </p>
        </div>

        {/* Solicit Presence */}
        <div className="py-3 border-y border-amber-200/60 my-3">
          <p className="text-xs italic text-stone-600 font-cormorant text-base">
            "We solicit your auspicious presence for the wedding festivities of"
          </p>

          <div className="my-2.5">
            <h2 className="font-vibes text-4xl text-rose-800 font-bold">
              Tanish
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              (S/O Babita & Sanjeev Gupta)
            </p>

            <div className="my-1.5 flex items-center justify-center gap-2">
              <div className="h-[1px] w-8 bg-amber-300" />
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <div className="h-[1px] w-8 bg-amber-300" />
            </div>

            <h2 className="font-vibes text-4xl text-rose-800 font-bold">
              Shivani
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              (D/O Sushma & Anand Arora)
            </p>
          </div>

          <p className="text-xs uppercase tracking-widest font-cinzel text-amber-900 font-bold mt-1">
            Amritsar, India
          </p>
        </div>

        {/* With Best Compliments */}
        <div className="mt-4">
          <span className="text-xs uppercase tracking-[0.25em] font-cinzel font-bold text-amber-900 block mb-2.5">
            With Best Compliments
          </span>

          <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-800 font-medium">
            {BEST_COMPLIMENTS.map((member, i) => (
              <div
                key={i}
                className="py-1 px-2 rounded-lg bg-amber-50/70 border border-amber-200/50 text-center font-cormorant text-sm leading-tight"
              >
                {member}
              </div>
            ))}
          </div>
        </div>

        {/* Stay Note */}
        <div className="mt-3.5 p-2 rounded-xl bg-amber-100/40 border border-amber-200/60 text-xs text-stone-700">
          <p className="font-semibold text-amber-950 font-cinzel text-[11px]">
            Stay at: Best Western Plus, Queens Road, Amritsar
          </p>
        </div>

        {/* Download / View Original Invitation PDF */}
        <div className="mt-4 pt-3 border-t border-amber-200/60">
          <a
            href="/assets/aistudio/Tanish___Shivani_wedding_20260807_091009_0000_f8279137.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-800 text-xs font-semibold border border-amber-300 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-700" />
            <span>View Official Printed Wedding Card (PDF)</span>
            <Download className="w-3.5 h-3.5 text-stone-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
