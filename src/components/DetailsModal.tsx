import React, { useEffect, useState } from 'react';
import { WeddingConfig } from '../types/invitation';
import { calculateCountdown, CountdownTime, generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { Calendar, Clock, MapPin, Navigation, X, Download } from 'lucide-react';
import logoIcon from '../assets/images/logo_icon.svg';

interface DetailsModalProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ config, isOpen, onClose }) => {
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    calculateCountdown(config.weddingDate, config.weddingTime)
  );

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(config.weddingDate, config.weddingTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, config.weddingDate, config.weddingTime]);

  if (!isOpen) return null;

  const googleCalUrl = generateGoogleCalendarUrl(
    `Wedding of ${config.coupleNames}`,
    `Celebrating the wedding of ${config.coupleNames} at ${config.venueName}.\n\nDress Code: Formal Elegance / Earth Tones.\nWe eagerly look forward to celebrating with you!`,
    `${config.venueName}, ${config.venueAddress}`,
    config.weddingDate,
    config.weddingTime
  );

  const handleDownloadIcs = () => {
    downloadIcsFile(
      `Wedding of ${config.coupleNames}`,
      `Celebrating the wedding of ${config.coupleNames} at ${config.venueName}.\n\nDress Code: Formal Elegance / Earth Tones.`,
      `${config.venueName}, ${config.venueAddress}`,
      config.weddingDate,
      config.weddingTime
    );
  };

  const mapsQuery = encodeURIComponent(`${config.venueName}, ${config.venueAddress}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#070e69] text-amber-100 rounded-3xl shadow-2xl border-2 border-[#d4af37]/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-[#d4af37]/30 bg-black/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Logo" className="w-8 h-6 object-contain" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#f3dfa2]">
                Celebration Details
              </span>
              <h3 className="font-calligraphy text-2xl text-white mt-0.5">
                {config.coupleNames}
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

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Countdown Clock */}
          <div className="bg-black/30 rounded-2xl p-4 border border-[#d4af37]/30 shadow-sm text-center">
            <span className="text-xs uppercase tracking-widest text-amber-200/70 font-medium">
              Countdown to the Ceremony
            </span>
            {countdown.isPast ? (
              <p className="mt-2 text-lg font-serif-cormorant text-amber-300 font-semibold">
                The blessed celebration is today!
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 mt-3">
                <div className="bg-white/10 rounded-xl py-2 px-1 border border-[#d4af37]/20">
                  <span className="block text-2xl font-bold font-serif-cormorant text-white tabular-nums">
                    {countdown.days}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/80">Days</span>
                </div>
                <div className="bg-white/10 rounded-xl py-2 px-1 border border-[#d4af37]/20">
                  <span className="block text-2xl font-bold font-serif-cormorant text-white tabular-nums">
                    {countdown.hours}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/80">Hours</span>
                </div>
                <div className="bg-white/10 rounded-xl py-2 px-1 border border-[#d4af37]/20">
                  <span className="block text-2xl font-bold font-serif-cormorant text-white tabular-nums">
                    {countdown.minutes}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/80">Mins</span>
                </div>
                <div className="bg-white/10 rounded-xl py-2 px-1 border border-[#d4af37]/20">
                  <span className="block text-2xl font-bold font-serif-cormorant text-white tabular-nums">
                    {countdown.seconds}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/80">Secs</span>
                </div>
              </div>
            )}
          </div>

          {/* Schedule of Events */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Program Itinerary</span>
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-black/25 border border-[#d4af37]/30">
                <div className="px-2.5 py-1 rounded-lg bg-[#d4af37] text-[#070e69] font-bold text-xs shrink-0">
                  20:30
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Welcoming of Guests &amp; Refreshments</h5>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Guests arrival, welcome beverages, and guestbook signing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-black/25 border border-[#d4af37]/30">
                <div className="px-2.5 py-1 rounded-lg bg-[#d4af37] text-[#070e69] font-bold text-xs shrink-0">
                  21:00
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Grand Entrance of Allam &amp; Nauha</h5>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Bridal entrance, Quranic recitation, and matrimonial blessing (Dua).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-black/25 border border-[#d4af37]/30">
                <div className="px-2.5 py-1 rounded-lg bg-[#d4af37] text-[#070e69] font-bold text-xs shrink-0">
                  21:15
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Royal Dinner Banquet</h5>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Curated 4-course banquet dinner served for all guests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-black/25 border border-[#d4af37]/30">
                <div className="px-2.5 py-1 rounded-lg bg-[#d4af37] text-[#070e69] font-bold text-xs shrink-0">
                  22:15
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Cake Cutting &amp; Photos</h5>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Wedding cake ceremony and group photography session.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="p-4 bg-black/30 rounded-2xl border border-[#d4af37]/30 space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-400/20 rounded-xl text-amber-300 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-bold text-white">{config.venueName}</h5>
                <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                  {config.venueAddress}, Malé, Republic of Maldives
                </p>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions in Google Maps</span>
            </a>
          </div>

          {/* Save Date Calendar Actions */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Save the Date to Your Calendar</span>
            </h4>
            <div className="flex items-center gap-2">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 border border-[#d4af37]/40 rounded-xl text-xs font-medium text-amber-100 text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Google Calendar</span>
              </a>
              <button
                onClick={handleDownloadIcs}
                className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 border border-[#d4af37]/40 rounded-xl text-xs font-medium text-amber-100 text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>iCal / Apple Calendar</span>
              </button>
            </div>
          </div>

          {/* Dress Code Note */}
          <div className="p-3 bg-black/20 rounded-xl border border-dashed border-[#d4af37]/30 text-center">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-300 block mb-0.5">
              Dress Code: Formal Elegance
            </span>
            <p className="text-xs text-stone-300">
              Navy, champagne, gold, or modest evening attire is warmly encouraged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
