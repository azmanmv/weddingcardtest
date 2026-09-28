import React, { useState } from 'react';
import { WeddingConfig } from '../types/invitation';
import { X, Copy, Check, Sparkles, Calendar, MapPin } from 'lucide-react';
import logoIcon from '../assets/images/logo_icon.svg';

interface CustomizerDrawerProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (updated: Partial<WeddingConfig>) => void;
  onReset: () => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
  onReset,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyPersonalLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('to', config.guestName || 'Guest');
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-[#f4f8fc] text-[#0e2a5e] shadow-2xl border-l-2 border-[#a8c5db] h-full flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#a8c5db]/60 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logoIcon} alt="Logo" className="w-7 h-5 object-contain" />
            <div>
              <h3 className="font-semibold text-sm text-[#0e2a5e]">Customize Invitation</h3>
              <p className="text-[11px] text-[#315280]">Personalize guest name, date &amp; details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Guest Name on Envelope */}
          <div className="space-y-2 bg-white p-3.5 rounded-2xl border border-[#a8c5db]/60 shadow-2xs">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#0e2a5e]">
                Guest Name on Envelope
              </label>
              <button
                onClick={handleCopyPersonalLink}
                className="text-[11px] text-[#315280] hover:text-[#0e2a5e] font-medium flex items-center gap-1 cursor-pointer"
                title="Copy personalized share link"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
              </button>
            </div>
            <input
              type="text"
              value={config.guestName}
              onChange={(e) => onUpdateConfig({ guestName: e.target.value })}
              placeholder="e.g. Dear Azman & Family"
              className="w-full px-3.5 py-2 text-xs bg-stone-50 text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
            />
            <p className="text-[10px] text-stone-500">
              Personalizes the calligraphy on the front of the envelope.
            </p>
          </div>

          {/* Couple Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0e2a5e] mb-1">
                Groom Name
              </label>
              <input
                type="text"
                value={config.partner1}
                onChange={(e) =>
                  onUpdateConfig({
                    partner1: e.target.value,
                    coupleNames: `${e.target.value} & ${config.partner2}`,
                  })
                }
                placeholder="Allam"
                className="w-full px-3 py-2 text-xs bg-white text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0e2a5e] mb-1">
                Bride Name
              </label>
              <input
                type="text"
                value={config.partner2}
                onChange={(e) =>
                  onUpdateConfig({
                    partner2: e.target.value,
                    coupleNames: `${config.partner1} & ${e.target.value}`,
                  })
                }
                placeholder="Nauha"
                className="w-full px-3 py-2 text-xs bg-white text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
              />
            </div>
          </div>

          {/* Wedding Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0e2a5e] mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#315280]" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={config.weddingDate}
                onChange={(e) => onUpdateConfig({ weddingDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0e2a5e] mb-1">
                Time
              </label>
              <input
                type="time"
                value={config.weddingTime}
                onChange={(e) => onUpdateConfig({ weddingTime: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
              />
            </div>
          </div>

          {/* Venue & Address */}
          <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-[#a8c5db]/60 shadow-2xs">
            <div>
              <label className="block text-xs font-semibold text-[#0e2a5e] mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#315280]" />
                <span>Venue Name</span>
              </label>
              <input
                type="text"
                value={config.venueName}
                onChange={(e) => onUpdateConfig({ venueName: e.target.value })}
                placeholder="Ghiyasuddin Hall"
                className="w-full px-3 py-2 text-xs bg-stone-50 text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0e2a5e] mb-1">
                Venue Address
              </label>
              <input
                type="text"
                value={config.venueAddress}
                onChange={(e) => onUpdateConfig({ venueAddress: e.target.value })}
                placeholder="Ghiyasuddin School, Ameenee Magu, Male"
                className="w-full px-3 py-2 text-xs bg-stone-50 text-[#0e2a5e] rounded-xl border border-[#a8c5db] focus:outline-none focus:ring-2 focus:ring-[#315280]"
              />
            </div>
          </div>

          {/* Rose Petals & Shimmer Effect */}
          <div className="space-y-2.5 bg-white p-3.5 rounded-2xl border border-[#a8c5db]/60 shadow-2xs">
            <span className="block text-xs font-semibold text-[#0e2a5e] mb-1">
              Visual Effects
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#315280]" />
                <span className="text-xs text-stone-700">Floating Rose Petals &amp; Shimmer</span>
              </div>
              <input
                type="checkbox"
                checked={config.petalsEnabled}
                onChange={(e) => onUpdateConfig({ petalsEnabled: e.target.checked })}
                className="h-4 w-4 rounded accent-[#0e2a5e] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#a8c5db]/60 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="px-3.5 py-2 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-[#0e2a5e] hover:bg-[#183975] text-white text-xs font-bold rounded-xl transition-all shadow-md text-center cursor-pointer"
          >
            Apply &amp; View Invitation
          </button>
        </div>
      </div>
    </div>
  );
};
