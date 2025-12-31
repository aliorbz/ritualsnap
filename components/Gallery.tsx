
import React, { useState } from 'react';
import { Frame } from '../types';

interface GalleryProps {
  frames: Frame[];
  loading?: boolean;
  onUseFrame: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ frames, loading, onUseFrame }) => {
  const [selectedDetails, setSelectedDetails] = useState<Frame | null>(null);
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setLoadErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-8 md:space-y-12 py-4 md:py-8 pt-12 md:pt-16">
      <div className="text-center space-y-2 md:space-y-4">
        <h2 className="text-2xl md:text-4xl font-mystical neon-text tracking-widest uppercase px-4">The Global Vault</h2>
        <p className="text-gray-400 max-w-xl mx-auto uppercase text-[8px] md:text-xs tracking-[0.3em] px-4">Ancient tools synchronized across the void</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
           <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4" />
           <p className="text-[10px] text-green-500 uppercase tracking-widest animate-pulse">Communing with the archives...</p>
        </div>
      ) : frames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 mx-4 border border-dashed border-green-900/30 rounded-3xl bg-black/40 animate-pulse">
          <svg className="w-16 h-16 text-zinc-800 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-mystical text-zinc-500 uppercase tracking-[0.4em] text-center px-4">The Archives are Silent</h3>
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest mt-2 max-w-xs text-center leading-relaxed px-4">
            No global sigils have been bound yet. The invited architects must forge new relics.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 px-2 md:px-0">
          {frames.map((frame) => (
            <div 
              key={frame.id} 
              className="group bg-zinc-950/50 border border-gray-800 rounded-lg md:rounded-xl overflow-hidden hover:border-green-500/50 transition-all cursor-pointer flex flex-col shadow-2xl relative"
              onClick={() => setSelectedDetails(frame)}
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-[radial-gradient(circle,_#111_0%,_#000_100%)] flex items-center justify-center">
                {!loadErrors[frame.id] ? (
                  <img 
                    src={frame.thumbnailUrl} 
                    alt={frame.name} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 relative z-10" 
                    onError={() => handleImageError(frame.id)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center z-10">
                    <svg className="w-8 h-8 text-red-900 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Sigil Missing</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20" />
                <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 z-30">
                  <h3 className="text-xs md:text-xl font-mystical text-white truncate">{frame.name}</h3>
                  <p className={`text-[7px] md:text-[10px] tracking-widest uppercase ${loadErrors[frame.id] ? 'text-red-900' : 'text-green-500'}`}>
                    {loadErrors[frame.id] ? 'Global Path Broken' : 'Universal Sigil'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDetails && (
        <div className="fixed top-16 md:top-20 bottom-0 left-0 right-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-950 border border-green-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(57,255,20,0.1)]">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-black border-b md:border-b-0 md:border-r border-green-900/20 flex items-center justify-center p-6 md:p-8">
                <img src={selectedDetails.thumbnailUrl} alt={selectedDetails.name} className="max-w-full max-h-full object-contain shadow-[0_0_30px_rgba(0,0,0,1)]" />
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

                {selectedDetails.creator && (
                  <div className="pt-6 border-t border-zinc-900 space-y-4">
                    <h4 className="text-[10px] font-bold text-green-500 uppercase tracking-[0.2em]">The Global Architect</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-500/5 rounded-full flex items-center justify-center border border-green-500/20 text-green-500 font-bold text-lg">
                        {selectedDetails.creator.name[0] || '?'}
                      </div>
                      <div>
                        <a 
                          href={selectedDetails.creator.socialUrl && selectedDetails.creator.socialUrl !== '#' ? selectedDetails.creator.socialUrl : undefined} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`group/link block ${selectedDetails.creator.socialUrl && selectedDetails.creator.socialUrl !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <p className={`text-xs md:text-sm font-bold text-white transition-colors ${selectedDetails.creator.socialUrl && selectedDetails.creator.socialUrl !== '#' ? 'group-hover/link:text-green-500 underline decoration-green-900 underline-offset-4' : ''}`}>
                            {selectedDetails.creator.name || 'Unknown Architect'}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{selectedDetails.creator.handle || 'Anonymous'}</p>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-4 pb-2">
                  <button 
                    onClick={() => {
                        onUseFrame(selectedDetails.id);
                        setSelectedDetails(null);
                    }}
                    className="w-full py-4 bg-green-500 text-black font-bold tracking-widest uppercase rounded-full hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] active:scale-95"
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
