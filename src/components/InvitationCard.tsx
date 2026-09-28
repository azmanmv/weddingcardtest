import React, { useState } from 'react';
import { WeddingConfig, RsvpEntry } from '../types/invitation';
import {
  Share2,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import logoIcon from '../assets/images/logo_icon.svg';
import backgroundImg from '../assets/images/background.png';
import { fireWeddingCelebration } from '../utils/calendar';

interface InvitationCardProps {
  config: WeddingConfig;
  onOpenDetails: () => void;
  onOpenRsvp?: () => void;
  onOpenGuestbook: () => void;
  onCloseEnvelope?: () => void;
}

// Multi-lobed Islamic Arch Path (viewBox="0 0 400 760")
const ARCH_PATH =
  'M 200 32 C 192 38, 184 46, 178 54 C 175 58, 173 64, 174 70 C 176 82, 166 100, 148 114 C 134 126, 124 138, 118 154 C 110 172, 76 194, 52 234 C 44 248, 42 266, 42 286 C 42 360, 42 420, 42 474 C 42 494, 44 512, 52 526 C 76 566, 110 588, 118 606 C 124 622, 134 634, 148 646 C 166 660, 176 678, 174 690 C 173 696, 175 702, 178 706 C 184 714, 192 722, 200 728 C 208 722, 216 714, 222 706 C 225 702, 227 696, 226 690 C 224 678, 234 660, 252 646 C 266 634, 276 622, 282 606 C 290 588, 324 566, 348 526 C 356 512, 358 494, 358 474 C 358 420, 358 360, 358 286 C 358 266, 356 248, 348 234 C 324 194, 290 172, 282 154 C 276 138, 266 126, 252 114 C 234 100, 224 82, 226 70 C 227 64, 225 58, 222 54 C 216 46, 208 38, 200 32 Z';

export const InvitationCard: React.FC<InvitationCardProps> = ({
  config,
  onOpenDetails,
  onOpenGuestbook,
  onCloseEnvelope,
}) => {
  const [activeTab, setActiveTab] = useState<'invitation' | 'rsvp'>('invitation');
  const [copiedLink, setCopiedLink] = useState(false);

  // RSVP Form States
  const [attendanceChoice, setAttendanceChoice] = useState<'yes' | 'no' | null>('yes');
  const [rsvpGuestName, setRsvpGuestName] = useState(config.guestName || '');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  const handleCopyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('to', config.guestName || 'Guest');
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleQuickRsvpSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entry: RsvpEntry = {
      id: `rsvp_${Date.now()}`,
      name: rsvpGuestName.trim() || config.guestName || 'Honored Guest',
      email: '',
      attending: attendanceChoice === 'yes' ? 'yes' : 'no',
      guestsCount: attendanceChoice === 'yes' ? guestCount : 0,
      dietary: 'halal',
      wishes: 'Baarakallahu lakuma wa baaraka alaikuma!',
      timestamp: Date.now(),
    };

    try {
      const existing = localStorage.getItem('azman_wedding_rsvp');
      const list = existing ? JSON.parse(existing) : [];
      list.push(entry);
      localStorage.setItem('azman_wedding_rsvp', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    fireWeddingCelebration();
    setRsvpSubmitted(true);
  };

  // DESIGN 1: The Wedding Invitation (Sacred verse, Delighted sentence, Names, Date, Venue, Hues)
  const renderInvitationDesign = () => (
    <div className="relative w-full h-full flex flex-col justify-between items-center text-center px-4 py-2 sm:px-6 sm:py-3.5 select-none z-10">
      {/* Top: Sacred Islamic Blessings & Quranic Verse */}
      <div className="space-y-0.5 pt-1.5 sm:pt-2">
        {/* Bismillah */}
        <p className="font-arabic text-[11.5px] sm:text-xs text-[#0e2a5e] tracking-widest leading-none drop-shadow-xs">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Verse Calligraphy: Wa khalaqnakum azwaja */}
        <div className="py-0.5">
          <p className="font-arabic text-xl sm:text-2xl text-[#0e2a5e] leading-snug font-bold tracking-wide">
            وَخَلَقْنَاكُمْ أَزْوَاجًا
          </p>
        </div>

        {/* Translation */}
        <div className="space-y-0">
          <p className="font-serif text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#0e2a5e] font-bold leading-tight">
            AND WE CREATED YOU IN PAIRS
          </p>
          <p className="font-serif text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-[#315280] font-medium opacity-90">
            SURAH AN-NABA' [78:8]
          </p>
        </div>
      </div>

      {/* Delighted Invitation Sentence & Monogram */}
      <div className="my-auto py-1 space-y-1">
        <p className="font-serif text-[11px] sm:text-[11.5px] text-[#1e3a68] leading-tight max-w-[220px] mx-auto">
          With the blessings of Allah we are delighted to invite you to the wedding of
        </p>

        {/* Monogram Logo */}
        <div className="py-1 flex justify-center">
          <img
            src={logoIcon}
            alt="Allam & Nauha Monogram"
            className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-xs"
          />
        </div>

        {/* Couple Names in Script Calligraphy */}
        <div className="space-y-0">
          <h2
            className="font-script text-2xl sm:text-3xl md:text-4xl text-[#0e2a5e] tracking-wide leading-none"
            style={{
              textShadow: '0 0 1px #0e2a5e, 0 1px 2px rgba(14,42,94,0.18)',
            }}
          >
            Allam &amp; Nauha
          </h2>
        </div>
      </div>

      {/* Date, Time & Venue */}
      <div className="space-y-0.5 z-10">
        <p className="font-serif text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#0e2a5e]">
          20<sup className="text-[8px]">TH</sup> DECEMBER 2026
        </p>
        <p className="font-sans text-[10px] sm:text-[10.5px] text-[#1e3a68] font-medium tracking-wide">
          20:30-22:00 hrs
        </p>
        <p className="font-serif text-[11px] sm:text-xs text-[#1e3a68] font-semibold tracking-wide">
          {config.venueName}, Malé
        </p>
      </div>

      {/* Bottom: Wedding Hues Palette */}
      <div className="pt-1 pb-1 sm:pb-2 space-y-1 z-10">
        <p className="font-script text-base sm:text-lg text-[#0e2a5e] leading-none">
          Wedding Hues
        </p>
        {/* 4 Swatch Circles */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {/* Light ice blue */}
          <span
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-xs border border-white"
            style={{ backgroundColor: '#a8c5db' }}
            title="Ice Blue"
          />
          {/* Soft slate blue */}
          <span
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-xs border border-white"
            style={{ backgroundColor: '#5582a8' }}
            title="Slate Blue"
          />
          {/* Medium royal blue */}
          <span
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-xs border border-white"
            style={{ backgroundColor: '#315280' }}
            title="Royal Blue"
          />
          {/* Deep royal navy */}
          <span
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-xs border border-white"
            style={{ backgroundColor: '#0e2a5e' }}
            title="Deep Navy"
          />
        </div>
      </div>
    </div>
  );

  // DESIGN 2: The RSVP Card (Monogram, "You're Invited", Yes/No, Guest count, Confirm RSVP)
  const renderRsvpDesign = () => (
    <div className="relative w-full h-full flex flex-col justify-between items-center text-center px-4 py-2 sm:px-6 sm:py-3.5 select-none z-10">
      {/* Top Header Lockup: Monogram & Couple Name */}
      <div className="space-y-0.5 pt-1.5 sm:pt-2">
        <div className="flex justify-center">
          <img
            src={logoIcon}
            alt="Allam & Nauha Monogram"
            className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-xs"
          />
        </div>
        <p className="font-sans text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.25em] uppercase text-[#315280]">
          THE WEDDING OF
        </p>
        <h3 className="font-script text-2xl sm:text-3xl text-[#0e2a5e] tracking-wide leading-none">
          Allam &amp; Nauha
        </h3>
      </div>

      {/* Middle: You're Invited & Interactive RSVP choices */}
      <div className="w-full max-w-[250px] sm:max-w-[270px] my-auto py-1 space-y-2 text-left">
        <div className="text-left space-y-0.5">
          <h4 className="font-serif text-base sm:text-lg font-bold text-[#142e58] leading-tight">
            You’re Invited
          </h4>
          <p className="font-serif text-[10.5px] sm:text-[11px] text-[#3b5172]">
            Will you be attending our wedding?
          </p>
        </div>

        {rsvpSubmitted ? (
          <div className="p-3 rounded-2xl bg-[#d5dfe8]/85 border border-[#a8c5db] text-center space-y-1.5 animate-fade-in shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-[#0e2a5e] mx-auto" />
            <h5 className="font-serif text-sm font-bold text-[#0e2a5e]">
              RSVP Received!
            </h5>
            <p className="text-[10px] text-[#1e3a68] leading-snug">
              {attendanceChoice === 'yes'
                ? `Thank you! Allam & Nauha look forward to welcoming you at Ghiyasuddin Hall.`
                : `Thank you for letting us know. Your warm prayers are cherished.`}
            </p>
            <button
              onClick={() => setRsvpSubmitted(false)}
              className="text-[10px] text-[#315280] underline font-medium cursor-pointer"
            >
              Update Response
            </button>
          </div>
        ) : (
          <div className="space-y-1.5">
            {/* Option 1: Yes, I'll be there */}
            <button
              type="button"
              onClick={() => setAttendanceChoice('yes')}
              className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-serif transition-all text-left flex items-center justify-between shadow-2xs cursor-pointer ${
                attendanceChoice === 'yes'
                  ? 'bg-[#c5d5e5] text-[#0e2a5e] font-bold border-2 border-[#5582a8] ring-1 ring-[#a8c5db]'
                  : 'bg-[#d5dfe8] hover:bg-[#cddae6] text-[#243b59] border border-transparent'
              }`}
            >
              <span className="truncate">Yes, I’ll be there. In Shaa Allah! 💍</span>
              {attendanceChoice === 'yes' && (
                <Check className="w-3.5 h-3.5 text-[#0e2a5e] shrink-0" />
              )}
            </button>

            {/* Option 2: Sorry, I can't make it */}
            <button
              type="button"
              onClick={() => setAttendanceChoice('no')}
              className={`w-full py-1.5 px-2.5 rounded-xl text-[11px] font-serif transition-all text-left flex items-center justify-between shadow-2xs cursor-pointer ${
                attendanceChoice === 'no'
                  ? 'bg-[#c5d5e5] text-[#0e2a5e] font-bold border-2 border-[#5582a8] ring-1 ring-[#a8c5db]'
                  : 'bg-[#d5dfe8] hover:bg-[#cddae6] text-[#243b59] border border-transparent'
              }`}
            >
              <span className="truncate">Sorry, I can’t make it. 🤍</span>
              {attendanceChoice === 'no' && (
                <Check className="w-3.5 h-3.5 text-[#0e2a5e] shrink-0" />
              )}
            </button>

            {/* Guest Name & Party count (Only shown when Yes is selected) */}
            {attendanceChoice === 'yes' && (
              <div className="pt-0.5 space-y-1.5 animate-fade-in">
                <input
                  type="text"
                  value={rsvpGuestName}
                  onChange={(e) => setRsvpGuestName(e.target.value)}
                  placeholder="Your Name (e.g. Azman & Family)"
                  className="w-full px-2.5 py-1 text-xs bg-white/95 text-[#0e2a5e] rounded-lg border border-[#a8c5db] focus:outline-none focus:ring-1 focus:ring-[#5582a8]"
                />
                <div className="flex items-center justify-between text-[10px] text-[#315280] px-1">
                  <span>Number of guests:</span>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="bg-white/95 text-[#0e2a5e] text-xs rounded px-2 py-0.5 border border-[#a8c5db]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>Family (5+)</option>
                  </select>
                </div>
              </div>
            )}

            {/* RSVP Submit Action */}
            <button
              type="button"
              onClick={() => handleQuickRsvpSubmit()}
              className="w-full py-1.5 px-3 bg-[#9bb4cb] hover:bg-[#8aa5bd] active:bg-[#7b98b0] text-[#0e2a5e] text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xs text-center cursor-pointer mt-1"
            >
              Confirm RSVP
            </button>
          </div>
        )}
      </div>

      {/* Bottom: Date & Venue reminder */}
      <div className="pb-1 text-center space-y-0.5 z-10">
        <p className="font-serif text-[10px] sm:text-[10.5px] text-[#315280] font-semibold">
          Sunday, 20<sup className="text-[7.5px]">th</sup> December 2026
        </p>
        <p className="font-sans text-[9px] sm:text-[9.5px] text-[#5582a8]">
          Ghiyasuddin Hall, Malé
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-[330px] sm:max-w-[360px] mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 border border-[#a8c5db]/60">
      {/* Top Mobile Switcher Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#eef4f9]/95 backdrop-blur-xs border-b border-[#a8c5db]/60 text-[#0e2a5e] shrink-0">
        {/* Navigation Tabs between Design 1 & Design 2 */}
        <div className="flex items-center gap-1 p-0.5 bg-[#d8e5f0] rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('invitation')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'invitation'
                ? 'bg-white text-[#0e2a5e] font-bold shadow-2xs'
                : 'text-[#315280] hover:text-[#0e2a5e]'
            }`}
          >
            Invitation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rsvp')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'rsvp'
                ? 'bg-white text-[#0e2a5e] font-bold shadow-2xs'
                : 'text-[#315280] hover:text-[#0e2a5e]'
            }`}
          >
            RSVP Card
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Share Link */}
          <button
            onClick={handleCopyShareLink}
            title="Copy Personal Link"
            className="p-1.5 text-[#315280] hover:text-[#0e2a5e] rounded-full transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* MAIN CARD CANVAS: Uses background.png as the canvas background */}
      <div
        className="relative w-full aspect-[9/15.5] overflow-hidden flex items-center justify-center shadow-inner"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxHeight: 'min(calc(100dvh - 160px), 540px)',
        }}
      >
        {/* SVG Multi-lobed Arched Frame Layer */}
        <svg
          viewBox="0 0 400 760"
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
          preserveAspectRatio="none"
        >
          {/* Semi-transparent arch fill so background.png shows through beautifully */}
          <path
            d={ARCH_PATH}
            fill="rgba(255, 255, 255, 0.82)"
            filter="drop-shadow(0px 4px 10px rgba(14, 42, 94, 0.12))"
          />

          {/* Outer Royal Navy Arch Contour */}
          <path
            d={ARCH_PATH}
            fill="none"
            stroke="#0e2a5e"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Inner Royal Navy Arch Contour */}
          <path
            d={ARCH_PATH}
            fill="none"
            stroke="#0e2a5e"
            strokeWidth="1.5"
            strokeLinejoin="round"
            transform="translate(200, 380) scale(0.96) translate(-200, -380)"
          />
        </svg>

        {/* Content View: Switch between Design 1 (Invitation) and Design 2 (RSVP) */}
        <div className="relative w-full h-full z-10 flex flex-col">
          {activeTab === 'invitation'
            ? renderInvitationDesign()
            : renderRsvpDesign()}
        </div>
      </div>

      {/* Compact Mobile Footer Switcher */}
      <div className="px-3 py-1.5 bg-[#eef4f9]/95 backdrop-blur-xs border-t border-[#a8c5db]/60 flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={onOpenDetails}
          className="flex-1 py-1.5 px-2 text-xs font-semibold text-[#0e2a5e] bg-white hover:bg-stone-50 border border-[#a8c5db] rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5 text-[#315280]" />
          <span>Itinerary &amp; Map</span>
        </button>

        {activeTab === 'invitation' ? (
          <button
            onClick={() => setActiveTab('rsvp')}
            className="flex-1 py-1.5 px-2 text-xs font-bold text-white bg-[#0e2a5e] hover:bg-[#183975] rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>RSVP Card</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('invitation')}
            className="flex-1 py-1.5 px-2 text-xs font-bold text-[#0e2a5e] bg-[#9bb4cb] hover:bg-[#8aa5bd] rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Invitation</span>
          </button>
        )}

        {onCloseEnvelope && (
          <button
            onClick={onCloseEnvelope}
            className="py-1.5 px-2.5 text-xs font-medium text-[#315280] bg-white hover:bg-stone-50 border border-[#a8c5db] rounded-xl transition-all cursor-pointer shadow-2xs"
            title="Fold and re-seal envelope"
          >
            Fold
          </button>
        )}
      </div>
    </div>
  );
};
