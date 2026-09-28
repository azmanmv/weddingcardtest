/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WeddingConfig, RsvpEntry } from './types/invitation';
import { Envelope } from './components/Envelope';
import { InvitationCard } from './components/InvitationCard';
import { TopNav } from './components/TopNav';
import { DetailsModal } from './components/DetailsModal';
import { RsvpModal } from './components/RsvpModal';
import { GuestbookModal } from './components/GuestbookModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { PetalsCanvas } from './components/PetalsCanvas';
import { Calendar, Heart, MessageSquareHeart, Mail } from 'lucide-react';
import backgroundImg from './assets/images/background.png';
import envelopBackSvg from './assets/images/envelop_back.svg';

const DEFAULT_CONFIG: WeddingConfig = {
  coupleNames: 'Allam & Nauha',
  partner1: 'Allam',
  partner2: 'Nauha',
  weddingDate: '2026-12-20',
  weddingTime: '20:30',
  venueName: 'Ghiyasuddin Hall',
  venueAddress: 'Ghiyasuddin School, Ameenee Magu, Male',
  aspectRatio: '9/16',
  theme: 'navy',
  sealColor: 'blue',
  monogramText: 'A&N',
  guestName: 'Dear Honored Guest & Family',
  customNote: 'Together with their families, cordially invite you to share in the joy of their wedding.',
  petalsEnabled: true,
};

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const stored = localStorage.getItem('azman_invitation_config_v4');
      if (stored) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CONFIG;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Check URL query param for recipient name: ?to=Uncle+Mohamed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam && toParam.trim()) {
        setConfig((prev) => ({
          ...prev,
          guestName: toParam.trim(),
        }));
      }
    }
  }, []);

  const handleUpdateConfig = (updated: Partial<WeddingConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('azman_invitation_config_v4', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem('azman_invitation_config_v4');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRsvpSubmitted = (entry: RsvpEntry) => {
    console.log('RSVP received:', entry);
  };

  return (
    <div
      className="h-[100dvh] max-h-[100dvh] w-full text-[#0e2a5e] relative flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundImage: isOpen ? `url(${backgroundImg})` : `url(${envelopBackSvg})`,
        backgroundSize: isOpen ? 'cover' : '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Soft backdrop wash only when open to give contrast to the open card */}
      {isOpen && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] pointer-events-none" />
      )}

      {/* Ambient Falling Rose Petals & Golden Shimmer */}
      <PetalsCanvas enabled={config.petalsEnabled} />

      {/* Top Mobile Bar - Only revealed after envelope opens */}
      {isOpen && (
        <div className="relative z-20 animate-fade-in shrink-0">
          <TopNav
            config={config}
            isOpen={isOpen}
            onToggleEnvelope={() => setIsOpen(!isOpen)}
            onOpenDetails={() => setIsDetailsOpen(true)}
            onOpenRsvp={() => setIsRsvpOpen(true)}
            onOpenGuestbook={() => setIsGuestbookOpen(true)}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        </div>
      )}

      {/* Main Experience Viewport: Full screen with 0 margin on initial screen */}
      <main
        className={`flex-1 flex flex-col items-center justify-center relative z-10 overflow-hidden w-full ${
          isOpen ? 'px-2 sm:px-4 py-2' : 'p-0 m-0 h-full'
        }`}
      >
        {/* Portrait Envelope & Unfolded Card */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden p-0 m-0">
          <Envelope
            config={config}
            isOpen={isOpen}
            onToggleOpen={setIsOpen}
          >
            {/* The In-App Designed Royal Wedding Invitation & RSVP Card */}
            <InvitationCard
              config={config}
              onOpenDetails={() => setIsDetailsOpen(true)}
              onOpenRsvp={() => setIsRsvpOpen(true)}
              onOpenGuestbook={() => setIsGuestbookOpen(true)}
              onCloseEnvelope={() => setIsOpen(false)}
            />
          </Envelope>
        </div>
      </main>

      {/* Mobile-First Thumb Navigation Dock - Only revealed after envelope opens */}
      {isOpen && (
        <nav className="relative z-20 w-full h-12 sm:h-13 px-3 sm:px-4 bg-white/85 backdrop-blur-md border-t border-[#a8c5db]/70 flex items-center justify-around shrink-0 pb-safe shadow-md animate-fade-in">
          {/* Toggle Envelope / Card */}
          <button
            onClick={() => setIsOpen(false)}
            className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-[#315280] hover:text-[#0e2a5e] transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#315280]" />
            <span>Fold Envelope</span>
          </button>

          {/* Program & Venue Map */}
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-[#315280] hover:text-[#0e2a5e] transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#0e2a5e]" />
            <span>Program &amp; Map</span>
          </button>

          {/* RSVP Action */}
          <button
            onClick={() => setIsRsvpOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0e2a5e] to-[#1c3f7d] hover:from-[#183975] text-white text-xs font-bold shadow-md cursor-pointer transition-transform active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>RSVP</span>
          </button>

          {/* Guestbook Wishes */}
          <button
            onClick={() => setIsGuestbookOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-[#315280] hover:text-[#0e2a5e] transition-colors cursor-pointer"
          >
            <MessageSquareHeart className="w-4 h-4 text-[#0e2a5e]" />
            <span>Guestbook</span>
          </button>
        </nav>
      )}

      {/* Modals & Drawers */}
      <DetailsModal
        config={config}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      <RsvpModal
        config={config}
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSubmitted={handleRsvpSubmitted}
      />

      <GuestbookModal
        config={config}
        isOpen={isGuestbookOpen}
        onClose={() => setIsGuestbookOpen(false)}
      />

      <CustomizerDrawer
        config={config}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onUpdateConfig={handleUpdateConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
