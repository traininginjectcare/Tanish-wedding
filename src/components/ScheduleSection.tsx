import React from 'react';
import { MapPin, Clock, Sparkles } from 'lucide-react';
import { CEREMONIES } from '../data/weddingData';

export const ScheduleSection: React.FC = () => {
  return (
    <div className="w-full my-6">
      {/* Section Title */}
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-1.5 text-amber-800">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs uppercase tracking-widest font-semibold font-cinzel">
            Festivities
          </span>
        </div>
        <h3 className="font-cormorant font-bold text-3xl text-stone-900 mt-0.5">
          Schedule of Events
        </h3>
        <p className="text-xs text-stone-600 max-w-xs mx-auto mt-0.5">
          Amritsar, Punjab
        </p>
      </div>

      {/* Events List (Clean, minimal, no separate calendar or find way buttons) */}
      <div className="space-y-3.5">
        {CEREMONIES.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl bg-[#fffaf3] border border-[#dfc499] shadow-sm p-4 relative overflow-hidden"
          >
            {/* Top decorative accent strip */}
            <div
              className="absolute top-0 inset-x-0 h-1.5"
              style={{ backgroundColor: evt.accentColor }}
            />

            {/* Event Header */}
            <div className="flex items-start justify-between gap-2 border-b border-amber-200/40 pb-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 font-cinzel">
                  {evt.day} · {evt.date}
                </span>
                <h4 className="font-cormorant font-bold text-2xl text-stone-900 leading-tight">
                  {evt.title}
                </h4>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-950 bg-amber-100/70 px-2 py-1 rounded-lg border border-amber-300/40">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  {evt.time}
                </span>
              </div>
            </div>

            {/* Poetic Quote verbatim from the official card */}
            <p className="text-xs italic text-stone-600 my-2 font-cormorant text-base leading-snug">
              "{evt.tagline}"
            </p>

            {/* Sub-events for Wedding (Sehrabandi & Departure of Baraat) */}
            {evt.subEvents && (
              <div className="my-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200/50 space-y-1 text-xs">
                {evt.subEvents.map((sub, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-amber-900 shrink-0">
                      {sub.time}
                    </span>
                    <span className="text-stone-700 text-right">
                      {sub.title}
                      {sub.location && (
                        <span className="block text-[11px] text-stone-500">
                          📍 {sub.location}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Venue Location */}
            <div className="flex items-center gap-1.5 text-xs text-stone-700 pt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-700 shrink-0" />
              <p className="font-medium text-stone-900">
                {evt.venue}, <span className="text-stone-500 text-[11px]">{evt.address}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
