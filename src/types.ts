export type TemplateCategory = 'all' | 'pacar' | 'sahabat' | 'retro';

export interface TemplateItem {
  id: string;
  name: string;
  subtitle: string;
  category: TemplateCategory;
  price: number;
  originalPrice: number;
  popular?: boolean;
  coverStyle: string;
  accentBg: string;
  accentColor: string;
  badge: string;
  image: string;
  description: string;
  highlights: string[];
  mockRecipient: string;
  mockAge: number;
  mockMessage: string;
}

export type PackageTier = 'starter' | 'deluxe' | 'vip';

export interface PackageDetail {
  id: PackageTier;
  name: string;
  price: number;
  badge?: string;
  description: string;
  features: string[];
}

export interface OrderState {
  templateId: string;
  packageTier: PackageTier;
  recipientName: string;
  nickname: string;
  turningAge: string;
  birthdayDate: string;
  senderName: string;
  selectedSong: string;
  specialWish: string;
  photoSource: 'google_drive' | 'chat_wa';
  addons: {
    customDomain: boolean;
    quizMiniGame: boolean;
    fastExpress: boolean;
  };
}

export interface PolaroidPhoto {
  id: number;
  title: string;
  date: string;
  frontImage: string;
  backMemo: string;
  rotation: string;
}
