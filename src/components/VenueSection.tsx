import React from 'react';
import { MapPin, Navigation, Hotel } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const venues = [
    {
      id: 'best-western',
      name: 'Best Western Plus',
      role: 'Guest Stay, Mehendi, Haldi & Sehrabandi',
      address: 'Queens Road, Amritsar, Punjab',
      mapQuery: 'Best Western Plus, Queens Road, Amritsar',
      icon: Hotel,
    },
    {
      id: 'ameera-farms',
      name: 'Ameera Farms',
      role: 'Sangeet Under The Stars',
      address: 'Amritsar, Punjab',
      mapQuery: 'Ameera Farms, Amritsar',
      icon: Navigation,
    },
    {
      id: 'the-bagh',
      name: 'The Bagh',
      role: 'Wedding Ceremony & Feast',
      address: 'Amritsar, Punjab',
      mapQuery: 'The Bagh, Amritsar',
      icon: MapPin,
    },
  ];

  const handleOpenMap = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="w-full my-7">
      {/* Title */}
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-2 text-rose-800">
          <MapPin className="w-4 h-4 text-rose-700" />
          <span className="text-xs uppercase tracking-widest font-semibold font-cinzel">
            Venues
          </span>
        </div>
        <h3 className="font-cormorant font-bold text-3xl text-stone-900 mt-1">
          Celebration Locations
        </h3>
        <p className="text-xs text-stone-600 max-w-xs mx-auto mt-0.5">
          Amritsar, India
        </p>
      </div>

      {/* Venues Cards */}
      <div className="space-y-3">
        {venues.map((venue) => {
          const Icon = venue.icon;
          return (
            <div
              key={venue.id}
              className="rounded-2xl bg-[#fffaf3] border border-[#dfc499] shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-cormorant font-bold text-2xl text-stone-900 leading-snug">
                    {venue.name}
                  </h4>
                  <Icon className="w-4 h-4 text-amber-700" />
                </div>

                <p className="text-xs font-semibold text-rose-800">
                  {venue.role}
                </p>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  {venue.address}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenMap(venue.mapQuery)}
                className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-rose-700" />
                <span>Open in Google Maps</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
