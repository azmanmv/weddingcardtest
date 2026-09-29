/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WeddingConfig, RsvpEntry } from './types/invitation';
import { Envelope } from './components/Envelope';
import { InvitationCard } from './components/InvitationCard';
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
      {/* Ambient Falling Rose Petals & Golden Shimmer */}
      <PetalsCanvas enabled={config.petalsEnabled} />

      {/* Main Experience Viewport: Full screen with 0 margin on initial screen */}
      <main
        className={`flex-1 flex flex-col items-center justify-center relative z-10 overflow-hidden w-full ${
          isOpen ? 'p-1 sm:p-3' : 'p-0 m-0 h-full'
        }`}
      >
        {/* Portrait Envelope & Unfolded Card */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden p-0 m-0">
          <Envelope
            config={config}
            isOpen={isOpen}
            onToggleOpen={setIsOpen}
          >
            {/* The In-App Designed Royal Wedding Invitation Card */}
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

      {/* Small Floating Buttons: Bottom Left & Bottom Right (Only revealed when envelope is open) */}
      {isOpen && (
        <>
          {/* Bottom Left: Fold Envelope & Program Details */}
          <div className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-30 flex items-center gap-2 animate-fade-in">
            {/* Fold Envelope */}
            <button
              onClick={() => setIsOpen(false)}
              title="Fold & re-seal envelope"
              className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full bg-white/90 hover:bg-white text-[#0e2a5e] backdrop-blur-md border border-[#a8c5db]/80 shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#163f70]" />
              <span className="text-[11px] sm:text-xs font-semibold">Fold</span>
            </button>

            {/* Program & Map Details */}
            <button
              onClick={() => setIsDetailsOpen(true)}
              title="Program schedule & venue map"
              className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full bg-white/90 hover:bg-white text-[#0e2a5e] backdrop-blur-md border border-[#a8c5db]/80 shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#163f70]" />
              <span className="text-[11px] sm:text-xs font-semibold">Details</span>
            </button>
          </div>

          {/* Bottom Right: Guestbook & RSVP Action */}
          <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-30 flex items-center gap-2 animate-fade-in">
            {/* Guestbook Wishes */}
            <button
              onClick={() => setIsGuestbookOpen(true)}
              title="Leave warm wishes in the Guestbook"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#0e2a5e] backdrop-blur-md border border-[#a8c5db]/80 shadow-md hover:shadow-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-[#163f70]" />
            </button>

            {/* Primary RSVP Action */}
            <button
              onClick={() => setIsRsvpOpen(true)}
              title="RSVP Attendance"
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#0e2a5e] to-[#1c3f7d] hover:from-[#15366c] hover:to-[#224b8f] text-white shadow-md hover:shadow-xl flex items-center gap-1.5 font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>RSVP</span>
            </button>
          </div>
        </>
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
