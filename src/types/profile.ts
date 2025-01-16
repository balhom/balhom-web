export type Currency = 'EUR' | 'USD' | 'CAD';

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  image_url?: string;
  currency: Currency;
  created_at: string;
}

export interface CreateProfileData {
  name: string;
  image_url?: string;
  currency: Currency;
}