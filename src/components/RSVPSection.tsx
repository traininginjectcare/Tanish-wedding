import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Phone, MessageCircle, Send, Heart, CheckCircle2 } from 'lucide-react';
import { RSVP_CONTACTS, INITIAL_WISHES } from '../data/weddingData';
import { GuestWish } from '../types/wedding';

const STORAGE_KEY = 'tanish_shivani_guest_wishes';

export const RSVPSection: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load persistent wishes from backend server on mount
  useEffect(() => {
    fetch('/api/wishes')
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((serverWishes: GuestWish[]) => {
        if (Array.isArray(serverWishes) && serverWishes.length > 0) {
          setWishes(serverWishes);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverWishes));
          } catch {
            // ignore
          }
        }
      })
      .catch((err) => {
        console.warn('Could not fetch server wishes, using local cache:', err);
      });
  }, []);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const newWish: GuestWish = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: 'Esteemed Guest',
      message: message.trim(),
      event: 'Wedding Blessings',
      timestamp: 'Just now',
    };

    // Optimistically update UI & localStorage
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Persist to backend server API
    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (response.ok) {
        const savedList = await response.json();
        if (Array.isArray(savedList)) {
          setWishes(savedList);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(savedList));
        }
      }
    } catch (err) {
      console.warn('Backend save deferred, saved to local storage:', err);
    } finally {
      setIsSubmitting(false);
      setName('');
      setMessage('');
      setSubmitted(true);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#be123c', '#d4af37', '#f59e0b', '#10b981'],
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  const handleWhatsApp = (contact: typeof RSVP_CONTACTS[0]) => {
    const text = encodeURIComponent(
      `Namaste ${contact.name}! 🌸\n` +
      `Heartiest congratulations to Tanish, Shivani, and the entire family on this joyous occasion!\n` +
      `Warm wishes & blessings!`
    );
    window.open(`https://wa.me/91${contact.phone}?text=${text}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:+91${phone}`);
  };

  return (
    <div className="w-full my-7">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-rose-800">
          <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
          <span className="text-xs uppercase tracking-widest font-semibold font-cinzel">
            Blessings & Wishes
          </span>
        </div>
        <h3 className="font-cormorant font-bold text-3xl text-stone-900 mt-1">
          Wishes for the Couple
        </h3>
        <p className="text-xs text-stone-600 max-w-xs mx-auto mt-0.5">
          Shower your love and blessings upon Tanish & Shivani
        </p>
      </div>

      {/* Wishes Form Card */}
      <div className="rounded-2xl bg-[#fffaf3] border border-[#dfc499] shadow-sm p-4 mb-6">
        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-cormorant font-bold text-xl text-stone-900">
              Thank You for Your Blessings!
            </h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Your warm wishes have been added to the celebration for Tanish & Shivani.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitWish} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-800 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh & Sunita Gupta"
                className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300/60 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-800 mb-1">
                Your Warm Message / Blessing *
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt blessings for Tanish & Shivani's new journey..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300/60 bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Wishes'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Wall of Blessings */}
      <div className="space-y-2.5 mb-6">
        <div className="px-1">
          <span className="text-xs uppercase tracking-wider font-cinzel font-bold text-amber-900">
            Wall of Blessings ({wishes.length})
          </span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1 no-scrollbar">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-3 rounded-xl bg-[#fffaf3] border border-amber-200/50 shadow-xs text-xs"
            >
              <div className="flex items-center justify-between text-stone-500 text-[10px] mb-1">
                <span className="font-bold text-stone-900">{wish.name}</span>
                <span>{wish.timestamp}</span>
              </div>
              <p className="text-stone-700 italic font-cormorant text-sm leading-snug">
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Contacts from Card (Sanjeev, Rahi, Nimisha) */}
      <div className="rounded-2xl bg-[#fffaf3] border border-[#dfc499] shadow-sm p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-cinzel block mb-2">
          R S V P Contacts
        </span>

        <div className="space-y-2">
          {RSVP_CONTACTS.map((contact, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-xl bg-amber-50/60 border border-amber-200/40"
            >
              <div>
                <p className="text-xs font-bold text-stone-900">{contact.name}</p>
                <p className="text-[11px] text-stone-600 font-mono">{contact.display}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleWhatsApp(contact)}
                  className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleCall(contact.phone)}
                  className="p-2 rounded-lg bg-amber-800 text-amber-50 hover:bg-amber-900 transition-colors cursor-pointer"
                  title="Call"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
