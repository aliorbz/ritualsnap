
import React, { useState } from 'react';
import { FRAMES } from '../constants';
import { Frame } from '../types';

interface GalleryProps {
  onUseFrame: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onUseFrame }) => {
  const [selectedDetails, setSelectedDetails] = useState<Frame | null>(null);

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-mystical neon-text tracking-widest">THE VAULT OF ELEMENTS</h2>
        <p className="text-gray-400 max-w-xl mx-auto uppercase text-xs tracking-[0.3em]">Ancient tools preserved for eternity</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FRAMES.map((frame) => (
          <div 
            key={frame.id} 
            className="group bg-black/50 border border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 transition-all cursor-pointer"
            onClick={() => setSelectedDetails(frame)}
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={frame.thumbnailUrl} alt={frame.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-mystical text-white">{frame.name}</h3>
                <p className="text-[10px] text-green-500 tracking-widest uppercase">Level: Archmage</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-gray-800">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Read Lore</span>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Frame Detail Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-gray-950 border border-green-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-black">
                <img src={selectedDetails.thumbnailUrl} alt={selectedDetails.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 space-y-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-mystical neon-text">{selectedDetails.name}</h2>
                    <p className="text-gray-400 mt-2 italic">"{selectedDetails.description}"</p>
                  </div>
                  <button onClick={() => setSelectedDetails(null)} className="text-gray-500 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-green-500 uppercase tracking-[0.2em]">Sacred Lore</h4>
                  <p className="text-gray-300 leading-relaxed font-light">{selectedDetails.lore}</p>
                </div>

                <div className="pt-6 border-t border-gray-800 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 text-green-500 font-bold">
                      {selectedDetails.creator.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{selectedDetails.creator.name}</p>
                      <a 
                        href={selectedDetails.creator.socialUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-gray-500 hover:text-green-400 transition-colors"
                      >
                        {selectedDetails.creator.platform}: {selectedDetails.creator.handle}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => {
                        onUseFrame(selectedDetails.id);
                        setSelectedDetails(null);
                    }}
                    className="w-full py-4 bg-green-500 text-black font-bold tracking-widest uppercase rounded hover:bg-green-400 transition-all"
                  >
                    Equip this Frame
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
