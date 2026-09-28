import React, { useState } from 'react';
import { WeddingConfig, RsvpEntry } from '../types/invitation';
import { X, Heart, CheckCircle2 } from 'lucide-react';
import { fireWeddingCelebration } from '../utils/calendar';
import logoIcon from '../assets/images/logo_icon.svg';

interface RsvpModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (entry: RsvpEntry) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ config, isOpen, onClose, onSubmitted }) => {
  const [name, setName] = useState(config.guestName || '');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState(1);
  const [dietary, setDietary] = useState('none');
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const entry: RsvpEntry = {
      id: `rsvp_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      attending,
      guestsCount: attending === 'yes' ? guestsCount : 0,
      dietary,
      wishes: wishes.trim(),
      timestamp: Date.now(),
    };

    // Save to local storage
    try {
      const existingStr = localStorage.getItem('azman_wedding_rsvp');
      const list = existingStr ? JSON.parse(existingStr) : [];
      list.push(entry);
      localStorage.setItem('azman_wedding_rsvp', JSON.stringify(list));

      if (wishes.trim()) {
        const guestbookStr = localStorage.getItem('azman_wedding_guestbook');
        const gbList = guestbookStr ? JSON.parse(guestbookStr) : [];
        gbList.unshift(entry);
        localStorage.setItem('azman_wedding_guestbook', JSON.stringify(gbList));
      }
    } catch (err) {
      console.error(err);
    }

    fireWeddingCelebration();
    setIsSubmitted(true);
    onSubmitted(entry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#070e69] text-amber-100 rounded-3xl shadow-2xl border-2 border-[#d4af37]/50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#d4af37]/30 bg-black/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Logo" className="w-8 h-6 object-contain" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#f3dfa2]">
                R.S.V.P
              </span>
              <h3 className="font-calligraphy text-2xl text-white mt-0.5">
                Confirm Attendance
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

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-cormorant text-2xl font-bold text-white">
                Thank You, {name}!
              </h4>
              <p className="text-xs text-stone-200 max-w-xs mx-auto leading-relaxed">
                {attending === 'yes'
                  ? `Your presence will honor ${config.coupleNames}. We look forward to celebrating together on 20th December at Ghiyasuddin Hall!`
                  : `Thank you for letting ${config.coupleNames} know. Your blessings are warmly cherished.`}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-2">
                  Will you be able to attend?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                      attending === 'yes'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                        : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-2.5 px-3 text-xs font-medium rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                      attending === 'no'
                        ? 'bg-black/50 text-white border-[#d4af37] shadow-sm'
                        : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Guest Name */}
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Azman Bin Ahmad"
                  className="w-full px-3.5 py-2 text-sm bg-white/10 text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {attending === 'yes' && (
                <>
                  {/* Number of guests */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-amber-200 mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm bg-[#0a1254] text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 Persons (Couple)</option>
                        <option value={3}>3 Persons</option>
                        <option value={4}>4 Persons (Family)</option>
                        <option value={5}>5 Persons (Family)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-amber-200 mb-1">
                        Dietary Preference
                      </label>
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#0a1254] text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="none">Standard Banquet</option>
                        <option value="halal">Halal Feast</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="allergies">Seafood / Nut Allergy</option>
                      </select>
                    </div>
                  </div>

                  {/* Email / WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-amber-200 mb-1">
                      Email or Mobile Phone
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="+960 7... / guest@example.com"
                      className="w-full px-3.5 py-2 text-sm bg-white/10 text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  Wishes &amp; Blessings for Allam &amp; Nauha
                </label>
                <textarea
                  rows={2}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="May Allah bless your union with endless happiness, barakah, and love..."
                  className="w-full px-3.5 py-2 text-sm bg-white/10 text-white rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-stone-950" />
                <span>Submit RSVP Confirmation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
