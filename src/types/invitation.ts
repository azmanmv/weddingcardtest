export type EnvelopeTheme = 'navy' | 'champagne' | 'emerald' | 'burgundy' | 'rose' | string;

export type SealColor = 'blue' | 'gold' | 'ruby' | 'emerald' | 'navy' | 'bronze' | string;

export type CardAspectRatio = '9/16' | '3/4' | '1/1' | '16/9';

export interface WeddingConfig {
  coupleNames: string;
  partner1: string;
  partner2: string;
  weddingDate: string; // '2026-12-20'
  weddingTime: string; // '20:30'
  venueName: string;   // 'Ghiyasuddin Hall'
  venueAddress: string;// 'Ghiyasuddin School, Ameenee Magu, Male'
  canvaUrl?: string;
  aspectRatio: CardAspectRatio;
  theme: EnvelopeTheme;
  sealColor: SealColor;
  monogramText: string;
  guestName: string;
  customNote: string;
  petalsEnabled: boolean;
}

export interface RsvpEntry {
  id: string;
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  dietary: string;
  wishes: string;
  timestamp: number;
}
