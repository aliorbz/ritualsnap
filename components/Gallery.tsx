
import React, { useState } from 'react';
import { FRAMES } from '../constants';
import { Frame } from '../types';

interface GalleryProps {
  onUseFrame: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onUseFrame }) => {
  const [selectedDetails, setSelectedDetails] = useState<Frame | null>(null);

  return (
    <div className="space-y-8 md:space-y-12 py-4 md:py-8">
      <div className="text-center space-y-2 md:space-y-4">
        <h2 className="text-2xl md:text-4xl font-mystical neon-text tracking-widest">THE VAULT OF ELEMENTS</h2>
        <p className="text-gray-400 max-w-xl mx-auto uppercase text-[8px] md:text-xs tracking-[0.3em]">Ancient tools preserved for eternity</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
        {FRAMES.map((frame) => (
          <div 
            key={frame.id} 
            className="group bg-black/50 border border-gray-800 rounded-lg md:rounded-xl overflow-hidden hover:border-green-500/50 transition-all cursor-pointer flex flex-col"
            onClick={() => setSelectedDetails(frame)}
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={frame.thumbnailUrl} 
                alt={frame.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                <h3 className="text-xs md:text-xl font-mystical text-white truncate">{frame.name}</h3>
                <p className="text-[7px] md:text-[10px] text-green-500 tracking-widest uppercase">Archmage Artifact</p>
              </div>
            </div>
            <div className="p-2 md:p-4 flex items-center justify-between border-t border-gray-800 mt-auto">
              <span className="text-[8px] md:text-xs text-gray-500 uppercase tracking-widest">Lore</span>
              <svg className="w-3 h-3 md:w-4 md:h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Frame Detail Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-zinc-950 border border-green-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(57,255,20,0.1)]">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-black border-b md:border-b-0 md:border-r border-green-900/20">
                <img src={selectedDetails.thumbnailUrl} alt={selectedDetails.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 space-y-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-mystical neon-text">{selectedDetails.name}</h2>
                    <p className="text-gray-400 text-sm italic">"{selectedDetails.description}"</p>
                  </div>
                  <button onClick={() => setSelectedDetails(null)} className="p-1 text-gray-500 hover:text-green-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-green-500 uppercase tracking-[0.2em]">Sacred Lore</h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{selectedDetails.lore}</p>
                </div>

                <div className="pt-6 border-t border-zinc-900 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/5 rounded-full flex items-center justify-center border border-green-500/20 text-green-500 font-bold text-lg">
                      {selectedDetails.creator.name[0]}
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-bold text-white">{selectedDetails.creator.name}</p>
                      <a 
                        href={selectedDetails.creator.socialUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] md:text-xs text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        {selectedDetails.creator.handle}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button 
                    onClick={() => {
                        onUseFrame(selectedDetails.id);
                        setSelectedDetails(null);
                    }}
                    className="w-full py-4 bg-green-500 text-black font-bold tracking-[0.2em] md:tracking-widest uppercase rounded hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                  >
                    Equip Sigil
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
