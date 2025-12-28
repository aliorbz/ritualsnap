
import { Frame } from './types';

/**
 * -------------------------------------------------------------------------
 * RITUALSNAP - OWNER'S CONTROL VAULT
 * -------------------------------------------------------------------------
 * 1. CREATE FOLDER: Create a folder named "frame_images" next to index.html.
 * 2. ADD IMAGES: Save your transparent PNGs as frame1.png, frame2.png, etc.
 * 3. REGISTER BELOW: Add a new block to the FRAMES array for each new frame.
 * -------------------------------------------------------------------------
 */

export const FRAMES: Frame[] = [
  {
    id: 'ritual-1',
    name: 'The Obsidian Guard',
    description: 'A jagged circle of protection forged in shadow.',
    imageUrl: './frame_images/frame1.png', 
    thumbnailUrl: './frame_images/frame1.png',
    lore: 'This frame was recovered from the ruins of the First Coven. It is said to bind the viewer’s spirit to the image, preventing digital decay.',
    creator: {
      name: 'Morbid Mystic',
      handle: '@morbid_mystic',
      socialUrl: 'https://instagram.com/morbid_mystic',
      platform: 'Instagram'
    }
  },
  {
    id: 'ritual-2',
    name: 'Neon Thorns',
    description: 'Bio-luminescent vines that pulse with electric life.',
    imageUrl: './frame_images/frame2.png',
    thumbnailUrl: './frame_images/frame2.png',
    lore: 'Synthesized in a techno-druid lab, these thorns protect the secrets contained within the portrait.',
    creator: {
      name: 'Cyber Witch',
      handle: 'cyber_witch_art',
      socialUrl: 'https://twitter.com/cyber_witch',
      platform: 'Twitter'
    }
  },
  {
    id: 'ritual-3',
    name: 'Astral Geometry',
    description: 'Perfect mathematical alignments for the soul.',
    imageUrl: './frame_images/frame3.png',
    thumbnailUrl: './frame_images/frame3.png',
    lore: 'Calculated by the Great Architect to align your image with the third moon of the digital solstice.',
    creator: {
      name: 'The Architect',
      handle: 'architect.vfx',
      socialUrl: 'https://artstation.com/architect',
      platform: 'ArtStation'
    }
  }
  /* 
    PASTE NEW FRAMES HERE:
    {
      id: 'frame-unique-id',
      name: 'Frame Name',
      description: 'Short description',
      imageUrl: './frame_images/your_file.png',
      thumbnailUrl: './frame_images/your_file.png',
      lore: 'The magical backstory...',
      creator: {
        name: 'Artist Name',
        handle: '@handle',
        socialUrl: 'https://link-to-social.com',
        platform: 'Instagram' // Options: 'Instagram' | 'Twitter' | 'ArtStation' | 'Patreon' | 'Behance'
      }
    },
  */
];
