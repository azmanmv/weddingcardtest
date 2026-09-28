import React from 'react';
import { Sliders, Heart, Share2, Check } from 'lucide-react';
import { WeddingConfig } from '../types/invitation';
import logoIcon from '../assets/images/logo_icon.svg';

interface TopNavProps {
  config: WeddingConfig;
  isOpen: boolean;
  onToggleEnvelope: () => void;
  onOpenDetails: () => void;
  onOpenRsvp: () => void;
  onOpenGuestbook: () => void;
  onOpenCustomizer: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  config,
  isOpen,
  onToggleEnvelope,
  onOpenDetails,
  onOpenRsvp,
  onOpenGuestbook,
  onOpenCustomizer,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('to', config.guestName || 'Guest');
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-11 sm:h-12 bg-white/75 backdrop-blur-md border-b border-[#a8c5db]/60 text-[#0e2a5e] shrink-0 shadow-2xs">
      <div className="max-w-md md:max-w-4xl mx-auto px-3 sm:px-4 h-full flex items-center justify-between">
        {/* Brand: Logo + Names */}
        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="Logo" className="w-6 h-5 object-contain" />
          <button
            onClick={onToggleEnvelope}
            className="text-left cursor-pointer group"
          >
            <span className="font-calligraphy text-xl sm:text-2xl text-[#0e2a5e] group-hover:text-[#183975] transition-colors drop-shadow-2xs">
              {config.coupleNames}
            </span>
          </button>
        </div>

        {/* Action Controls for Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Share Button */}
          <button
            onClick={handleCopyLink}
            title="Share Personal Invite Link"
            className="p-1.5 text-[#315280] hover:text-[#0e2a5e] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Customize Drawer */}
          <button
            onClick={onOpenCustomizer}
            title="Personalize Details"
            className="p-1.5 text-[#315280] hover:text-[#0e2a5e] hover:bg-white/60 rounded-full transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* RSVP Quick Button */}
          <button
            onClick={onOpenRsvp}
            className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#0e2a5e] hover:bg-[#183975] rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <Heart className="w-3 h-3 fill-white" />
            <span>RSVP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
