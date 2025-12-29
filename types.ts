
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
  imageUrl: string; // Base64 or path
  thumbnailUrl: string;
  creator: Creator;
  lore: string; 
  isCustom?: boolean; // To distinguish between default and user-added
}

export type ViewState = 'landing' | 'editor' | 'gallery' | 'admin';
