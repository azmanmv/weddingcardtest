import React, { useState } from 'react';
import { WeddingConfig } from '../types/invitation';
import { playEnvelopeOpenSound } from '../utils/audio';
import { fireWeddingCelebration } from '../utils/calendar';
import envelopBackSvg from '../assets/images/envelop_back.svg';
import envelopTopSvg from '../assets/images/envelop_top.svg';
import envelopBottomSvg from '../assets/images/envelop_bottom.svg';
import sealSvg from '../assets/images/seal.svg';

interface EnvelopeProps {
  config: WeddingConfig;
  isOpen: boolean;
  onToggleOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  config: _config,
  isOpen,
  onToggleOpen,
  children,
}) => {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  const handleOpen = () => {
    if (!isOpen && !isOpeningAnim) {
      setIsOpeningAnim(true);
      playEnvelopeOpenSound();
      fireWeddingCelebration();

      // Door open animation duration
      setTimeout(() => {
        onToggleOpen(true);
        setIsOpeningAnim(false);
      }, 850);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
      {isOpen ? (
        /* OPEN STATE: Display the inner invitation card centered */
        <div className="relative flex flex-col items-center justify-center w-full h-full animate-fade-in">
          {/* Active Invitation Card */}
          <div className="relative z-30 w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      ) : (
        /* CLOSED STATE: Full Screen Mobile Envelope with envelop_back.svg as full background, margin 0 */
        <div className="relative transition-all duration-700 ease-out flex flex-col items-center justify-center perspective-1400 w-full h-full p-0 m-0 overflow-hidden">
          {/* Full Screen Envelope Body (Margin 0 on all sides) */}
          <div
            onClick={handleOpen}
            className="relative w-full h-full select-none cursor-pointer transform-style-3d p-0 m-0 overflow-hidden"
            title="Tap to open invitation"
          >
            {/* 1. ENVELOPE BACKING (envelop_back.svg: Full background of the screen) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full overflow-hidden bg-[#070e3d]">
              <img
                src={envelopBackSvg}
                alt="Envelope Background"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-radial from-transparent via-[#070e3d]/15 to-[#02051a]/50 pointer-events-none" />

              {/* Inner card revealed underneath the opening flaps */}
              <div
                className={`w-full h-full max-w-[360px] max-h-[90dvh] flex items-center justify-center p-2 transition-all duration-700 ease-out ${
                  isOpeningAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {children}
              </div>
            </div>

            {/* 2. BOTTOM FLAP (envelop_bottom.svg: touches bottom, margin 0, apex reaches 51% in center) */}
            <div
              className="absolute left-0 right-0 bottom-0 w-full pointer-events-none z-20 transform-style-3d origin-bottom"
              style={{
                height: '51%',
                transition: 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease-out',
                transform: isOpeningAnim ? 'rotateX(-145deg)' : 'rotateX(0deg)',
                opacity: isOpeningAnim ? 0 : 1,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <img
                src={envelopBottomSvg}
                alt="Envelope Bottom Flap"
                className="w-full h-full object-fill filter drop-shadow-[0_-4px_12px_rgba(0,0,0,0.4)]"
                draggable={false}
              />
            </div>

            {/* 3. TOP FLAP (envelop_top.svg: touches top, margin 0 from all sides, apex reaches 51% in center) */}
            <div
              className="absolute left-0 right-0 top-0 w-full pointer-events-none z-25 transform-style-3d origin-top"
              style={{
                height: '51%',
                transition: 'transform 0.85s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease-out',
                transform: isOpeningAnim ? 'rotateX(145deg)' : 'rotateX(0deg)',
                opacity: isOpeningAnim ? 0 : 1,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <img
                src={envelopTopSvg}
                alt="Envelope Top Flap"
                className="w-full h-full object-fill filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
                draggable={false}
              />
            </div>

            {/* 4. ROYAL GOLD WAX SEAL (seal.svg: Centered directly over where the flap tips meet) */}
            <div
              className="absolute left-1/2 top-1/2 z-30 pointer-events-none"
              style={{
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease-out',
                transform: isOpeningAnim
                  ? 'translate(-50%, -50%) scale(1.3)'
                  : 'translate(-50%, -50%) scale(1)',
                opacity: isOpeningAnim ? 0 : 1,
                filter:
                  'drop-shadow(0 8px 22px rgba(0,0,0,0.7)) drop-shadow(0 0 16px rgba(212,175,55,0.5))',
              }}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <img
                  src={sealSvg}
                  alt="Royal Wax Seal"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
