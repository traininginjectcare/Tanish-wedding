export type WeddingTheme =
  | 'royal-rose'
  | 'haldi-marigold'
  | 'midnight-glam'
  | 'sindoor-crimson'
  | 'pastel-ivory';

export interface ThemeConfig {
  id: WeddingTheme;
  name: string;
  subtitle: string;
  previewBg: string;
  previewBorder: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  primaryAccent: string;
  secondaryAccent: string;
  goldAccent: string;
  textColor: string;
  mutedText: string;
  envelopeColor: string;
  sealColor: string;
  sealRing: string;
  archPattern: string;
}

export interface CeremonyEvent {
  id: string;
  title: string;
  hindiTitle?: string;
  tagline: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapQuery: string;
  attire: string;
  attireColors: { name: string; hex: string }[];
  accentColor: string;
  iconName: string;
  subEvents?: { time: string; title: string; location?: string }[];
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  event: string;
  timestamp: string;
}
