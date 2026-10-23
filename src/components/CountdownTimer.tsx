import React, { useState, useEffect } from 'react';
import { Calendar, Download, Clock } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Wedding festivities start November 20, 2026 at 12:30 PM IST (GMT+5:30)
  const targetDate = new Date('2026-11-20T12:30:00+05:30').getTime();

  const calculateTime = (): TimeRemaining => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent('Wedding Festivities: Tanish & Shivani');
    const details = encodeURIComponent(
      'Celebration of Tanish & Shivani Wedding!\n' +
      'Nov 20: Mehendi (12:30 PM @ Best Western Plus) & Sangeet (7:00 PM @ Ameera Farms)\n' +
      'Nov 21: Haldi (10:00 AM @ Best Western Plus) & Wedding Ceremony (The Bagh, Amritsar)\n' +
      'RSVP: Sanjeev (8518964464), Rahi (9920955621), Nimisha (9820955621)'
    );
    const location = encodeURIComponent('Amritsar, Punjab, India');
    const dates = '20261120T070000Z/20261121T200000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tanish and Shivani Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Tanish & Shivani Wedding Festivities
DESCRIPTION:Join us for the wedding celebrations of Tanish & Shivani in Amritsar! Events: Mehendi, Sangeet, Haldi, Sehrabandi, Baraat and Wedding Ceremony.
LOCATION:Amritsar, Punjab, India
DTSTART:20261120T070000Z
DTEND:20261121T200000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Tanish-Shivani-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full my-6 text-center">
      {/* Decorative header */}
      <div className="flex items-center justify-center gap-2 mb-1.5 text-amber-800">
        <Clock className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '18s' }} />
        <span className="text-xs uppercase tracking-widest font-semibold font-cinzel">Counting Down To Forever</span>
      </div>

      <h3 className="font-cormorant font-bold text-3xl text-stone-900 mb-3">
        The Wedding Begins In
      </h3>

      {/* Countdown Digits */}
      <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto px-1">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINUTES', value: timeLeft.minutes },
          { label: 'SECONDS', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-[#dfc499] shadow-sm relative overflow-hidden bg-[#fffaf3]"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="font-cinzel text-2xl md:text-3xl font-bold text-amber-950 tabular-nums leading-none mb-1">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-bold tracking-wider text-amber-800/80">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Action Calendar Buttons */}
      <div className="flex items-center justify-center gap-2.5 mt-4 px-3">
        <button
          onClick={handleAddToGoogleCalendar}
          className="flex-1 max-w-[170px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-medium shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Google Calendar</span>
        </button>

        <button
          onClick={handleDownloadICS}
          className="flex-1 max-w-[170px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-amber-50 text-stone-800 text-xs font-medium border border-amber-300 shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-700" />
          <span>Save to iCal</span>
        </button>
      </div>

      <p className="text-[11px] text-stone-600 mt-2 font-medium">
        Friday, November 20, 2026 · Amritsar, India
      </p>
    </div>
  );
};
