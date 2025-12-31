
export interface Creator {
  name: string;
  handle: string;
  socialUrl: string;
  platform: 'Instagram' | 'Twitter' | 'ArtStation' | 'Patreon' | 'Behance';
}

export interface Frame {
  id: string;
  name: string;
  description: string;
  imageUrl: string; 
  thumbnailUrl: string;
  creator: Creator;
  lore: string; 
  isCustom?: boolean;
}

export type ViewState = 'landing' | 'editor' | 'gallery' | 'admin' | 'auth';
