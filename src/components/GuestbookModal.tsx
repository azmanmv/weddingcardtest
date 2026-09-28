import React, { useState, useEffect } from 'react';
import { RsvpEntry, WeddingConfig } from '../types/invitation';
import { X, MessageSquareHeart, Send, Heart } from 'lucide-react';
import { fireWeddingCelebration } from '../utils/calendar';
import logoIcon from '../assets/images/logo_icon.svg';

interface GuestbookModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({ config, isOpen, onClose }) => {
  const [messages, setMessages] = useState<RsvpEntry[]>([]);
  const [authorName, setAuthorName] = useState(config.guestName || '');
  const [newWish, setNewWish] = useState('');

  const defaultWishes: RsvpEntry[] = [
    {
      id: 'w1',
      name: 'Uncle Mohamed & Family',
      email: '',
      attending: 'yes',
      guestsCount: 2,
      dietary: 'halal',
      wishes: 'Baarakallahu laka wa baaraka alaika wa jamaa bainakuma fee khair. Warmest congratulations to Allam & Nauha on this blessed day!',
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: 'w2',
      name: 'Aishath & Farooq',
      email: '',
      attending: 'yes',
      guestsCount: 2,
      dietary: 'none',
      wishes: 'So thrilled to celebrate your special night at Ghiyasuddin Hall! Wishing you both a lifetime of happiness, peace, and laughter.',
      timestamp: Date.now() - 1000 * 60 * 60 * 12,
    },
    {
      id: 'w3',
      name: 'Ahmed & Shifna',
      email: '',
      attending: 'yes',
      guestsCount: 1,
      dietary: 'none',
      wishes: 'Heartiest congratulations Allam and Nauha! May your journey together be guided with love, prosperity, and blessings.',
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
    },
  ];

  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = localStorage.getItem('azman_wedding_guestbook');
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        setMessages(defaultWishes);
        localStorage.setItem('azman_wedding_guestbook', JSON.stringify(defaultWishes));
      }
    } catch {
      setMessages(defaultWishes);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    const entry: RsvpEntry = {
      id: `wish_${Date.now()}`,
      name: authorName.trim() || 'A Dear Friend',
      email: '',
      attending: 'yes',
      guestsCount: 1,
      dietary: 'none',
      wishes: newWish.trim(),
      timestamp: Date.now(),
    };

    const updated = [entry, ...messages];
    setMessages(updated);
    setNewWish('');
    try {
      localStorage.setItem('azman_wedding_guestbook', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    fireWeddingCelebration();
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#070e69] text-amber-100 rounded-3xl shadow-2xl border-2 border-[#d4af37]/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#d4af37]/30 bg-black/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Logo" className="w-8 h-6 object-contain" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#f3dfa2]">
                Wedding Guestbook
              </span>
              <h3 className="font-calligraphy text-2xl text-white mt-0.5">
                Wishes &amp; Blessings
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishes List */}
        <div className="p-6 space-y-3.5 overflow-y-auto flex-1">
          {messages.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-black/25 rounded-2xl border border-[#d4af37]/30 shadow-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  <span>{item.name}</span>
                </h5>
                <span className="text-[10px] text-amber-200/60 font-sans">
                  {formatDate(item.timestamp)}
                </span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-serif-cormorant text-[15px]">
                “{item.wishes}”
              </p>
            </div>
          ))}
        </div>

        {/* Quick Send Form */}
        <div className="p-4 bg-black/40 border-t border-[#d4af37]/30">
          <form onSubmit={handlePostWish} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-1/3 px-3 py-2 text-xs bg-white/10 text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-stone-400"
              />
              <input
                type="text"
                required
                placeholder="Write your warmest blessings for Allam & Nauha..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white/10 text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 rounded-xl transition-all shadow-sm"
                title="Send wish"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
