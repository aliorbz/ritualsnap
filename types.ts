
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
  imageUrl: string; // The path to the PNG frame with transparency
  thumbnailUrl: string;
  creator: Creator;
  lore: string; // A mystical backstory for the frame
}

export type ViewState = 'landing' | 'editor' | 'gallery';
