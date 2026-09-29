import React from 'react';
import { WeddingConfig } from '../types/invitation';
import frameSvg from '../assets/images/frame.svg';
import bismiandayahSvg from '../assets/images/bismiandayah.svg';
import logoIcon from '../assets/images/logo_icon.svg';
import backgroundImg from '../assets/images/background.png';

interface InvitationCardProps {
  config: WeddingConfig;
  onOpenDetails: () => void;
  onOpenRsvp?: () => void;
  onOpenGuestbook: () => void;
  onCloseEnvelope?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  config,
  onOpenDetails,
}) => {
  return (
    <div
      className="relative select-none flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(10,32,71,0.28)]"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: 'min(93vw, calc(95dvh * 713.25 / 1178.25), 440px)',
        height: 'min(calc(93vw * 1178.25 / 713.25), 95dvh, 725px)',
      }}
    >
      {/* 1. Architectural Royal Arch Frame (frame.svg) */}
      <img
        src={frameSvg}
        alt="Royal Wedding Arch Frame"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        draggable={false}
      />

      {/* 2. Inner Sacred Invitation Content - Structured with exact vertical placement */}
      <div className="relative z-10 w-full h-full flex flex-col items-center text-center px-[9%] pt-[6%] pb-[6%]">
        {/* Top: Sacred Verse & Calligraphy (bismiandayah.svg) - Positioned 40% lower as requested */}
        <div className="w-full flex justify-center mt-3 sm:mt-5 animate-card-item animation-delay-100">
          <img
            src={bismiandayahSvg}
            alt="Bismillah & Wa Khalaqnakum Azwaja (Surah An-Naba 78:8)"
            className="w-[58%] sm:w-[56%] max-w-[215px] h-auto object-contain mx-auto filter drop-shadow-[0_1px_1px_rgba(14,42,94,0.08)] pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Invitation Delighted Note - Moved up directly beneath the verse translation */}
        <div className="w-full mt-3 sm:mt-4 space-y-0.5 animate-card-item animation-delay-300">
          <p className="font-serif-cormorant text-[11px] sm:text-[12.5px] md:text-[13.5px] text-[#163f70] leading-[1.35] tracking-wide font-normal">
            With the blessings of Allah we are delighted to
          </p>
          <p className="font-serif-cormorant text-[11px] sm:text-[12.5px] md:text-[13.5px] text-[#163f70] leading-[1.35] tracking-wide font-normal">
            invite you to the wedding of
          </p>
        </div>

        {/* Monogram Logo - 50% bigger and positioned just above the vertical center line */}
        <div className="mt-2.5 sm:mt-3 flex justify-center animate-card-item animation-delay-450">
          <img
            src={logoIcon}
            alt="Allam & Nauha Monogram"
            className="w-20 h-11 sm:w-24 sm:h-13 md:w-26 md:h-14 object-contain filter drop-shadow-[0_1px_2px_rgba(14,42,94,0.12)] pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Couple's Names - CitadelScriptStd font with slightly increased size */}
        <div className="mt-1 sm:mt-1.5 animate-card-item animation-delay-600">
          <h1
            className="font-citadel text-[34px] sm:text-[40px] md:text-[46px] text-[#123868] leading-tight tracking-normal whitespace-nowrap"
            style={{
              textShadow: '0 0 1px rgba(18,56,104,0.25)',
            }}
          >
            Allam &amp; Nauha
          </h1>
        </div>

        {/* Date, Time & Venue - Not bold, moved up closer to the couple's names */}
        <div
          onClick={onOpenDetails}
          title="Click to view schedule & location map"
          className="w-full mt-4 sm:mt-5 md:mt-6 space-y-0.5 sm:space-y-1 animate-card-item animation-delay-750 cursor-pointer group"
        >
          <p className="font-serif text-[11px] sm:text-[12.5px] md:text-[13.5px] font-normal tracking-[0.16em] uppercase text-[#163e6f] group-hover:text-[#0e2a5e] transition-colors">
            20<sup className="text-[72%] font-normal align-super">TH</sup> DECEMBER 2026
          </p>
          <p className="font-serif text-[10.5px] sm:text-[12px] md:text-[13px] text-[#1d497c] font-normal tracking-wide">
            20:30-22:00 hrs
          </p>
          <p className="font-serif text-[11px] sm:text-[12.5px] md:text-[13.5px] text-[#1d497c] font-normal tracking-wide">
            {config.venueName}
          </p>
        </div>

        {/* Bottom Section: Wedding Hues (Aniyah Font ~33% size) & Matching Swatches Just Below */}
        <div className="w-full mt-auto pb-1 sm:pb-2 space-y-1.5 animate-card-item animation-delay-900">
          <p className="font-aniyah text-[16px] sm:text-[18px] md:text-[20px] text-[#1b4372] leading-none">
            Wedding Hues
          </p>

          {/* 4 Matching Colour Dots Just Below */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <span
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-2xs border border-white/80"
              style={{ backgroundColor: '#adc7dc' }}
              title="Light Ice Blue"
            />
            <span
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-2xs border border-white/80"
              style={{ backgroundColor: '#5885aa' }}
              title="Steel Blue"
            />
            <span
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-2xs border border-white/80"
              style={{ backgroundColor: '#36537b' }}
              title="Deep Royal Blue"
            />
            <span
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-2xs border border-white/80"
              style={{ backgroundColor: '#1b3761' }}
              title="Midnight Navy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
