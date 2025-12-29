
import React, { useRef, useEffect, useState } from 'react';
import { Frame } from '../types';

interface EditorProps {
  image: string | null;
  frames: Frame[];
  onBack: () => void;
  onReset: () => void;
}

const Editor: React.FC<EditorProps> = ({ image, frames, onBack, onReset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [frameLoadError, setFrameLoadError] = useState<boolean>(false);

  useEffect(() => {
    if (image) {
      renderCanvas();
    }
  }, [image, selectedFrame]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setFrameLoadError(false);
    const userImg = new Image();
    userImg.src = image;
    userImg.onload = () => {
      const size = Math.max(userImg.width, userImg.height);
      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, size, size);

      const scale = Math.max(size / userImg.width, size / userImg.height);
      const x = (size / 2) - (userImg.width / 2) * scale;
      const y = (size / 2) - (userImg.height / 2) * scale;
      
      ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);

      if (selectedFrame) {
        const frameImg = new Image();
        frameImg.src = selectedFrame.imageUrl;
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, size, size);
        };
        frameImg.onerror = () => {
          setFrameLoadError(true);
        };
      }
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `ritualsnap-${selectedFrame?.id || 'enchanted'}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    /* Added pt-12 md:pt-16 to provide space for the sticky header in the editor view */
    <div className="grid lg:grid-cols-3 gap-6 md:gap-12 items-start animate-fade-in max-w-6xl mx-auto px-4 mt-2 md:mt-8 pt-12 md:pt-16">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-square bg-zinc-950 border-2 border-green-500/20 rounded-xl overflow-hidden shadow-2xl relative">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
          />
          {!selectedFrame && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-6 text-center">
                <div className="w-12 h-12 border border-green-500/30 rounded-full flex items-center justify-center mb-3 animate-pulse">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3" />
                    </svg>
                </div>
                <span className="text-green-500 font-mystical tracking-widest uppercase text-xs">Ritual Pending</span>
            </div>
          )}
          {frameLoadError && (
            <div className="absolute top-4 left-4 right-4 bg-red-950/90 border border-red-500 p-3 rounded flex items-center gap-3 z-50">
                <div className="text-[10px] uppercase font-bold text-red-200">
                    Failed to manifest sigil. Verify the uploaded PNG.
                </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 flex flex-col h-full bg-zinc-950/50 p-4 md:p-0 rounded-xl border border-zinc-900 md:border-none">
        <div className="space-y-3">
          <h3 className="text-sm font-mystical tracking-[0.3em] neon-text uppercase px-1">The Vault</h3>
          {frames.length === 0 ? (
            <div className="p-8 border border-zinc-900 bg-black/20 text-center rounded-xl space-y-2">
               <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Vault is Sealed</p>
               <p className="text-[8px] text-zinc-800 uppercase leading-relaxed">No sigils found in this realm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 max-h-[160px] lg:max-h-[420px] overflow-y-auto pr-1 pb-2 custom-scrollbar">
              {frames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 active:scale-95 bg-black ${selectedFrame?.id === frame.id ? 'border-green-500 scale-[1.02]' : 'border-zinc-800'}`}
                >
                  <div className="aspect-square flex items-center justify-center p-2">
                      <img src={frame.thumbnailUrl} alt={frame.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedFrame && (
          <div className="space-y-4 p-4 bg-zinc-950 border border-green-500/10 rounded-xl animate-fade-in">
            <div className="space-y-1">
              <h4 className="font-mystical text-sm text-white border-b border-green-500/10 pb-2 uppercase tracking-widest">{selectedFrame.name}</h4>
              <p className="text-[10px] text-gray-500 italic leading-relaxed pt-2">"{selectedFrame.description}"</p>
            </div>

            {selectedFrame.creator && (
              <div className="pt-2 border-t border-green-900/10">
                <p className="text-[8px] uppercase text-green-700 tracking-widest mb-2">Architect</p>
                <a 
                  href={selectedFrame.creator.socialUrl && selectedFrame.creator.socialUrl !== '#' ? selectedFrame.creator.socialUrl : undefined} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`group/link flex items-center gap-2 ${selectedFrame.creator.socialUrl && selectedFrame.creator.socialUrl !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-[10px] text-green-500 font-bold uppercase shrink-0">
                    {selectedFrame.creator.name[0]}
                  </div>
                  <span className={`text-[10px] font-bold text-gray-300 uppercase tracking-widest transition-colors ${selectedFrame.creator.socialUrl && selectedFrame.creator.socialUrl !== '#' ? 'group-hover/link:text-green-500 underline decoration-green-900 underline-offset-2' : ''}`}>
                    {selectedFrame.creator.name}
                  </span>
                </a>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto space-y-3 pt-4 border-t border-zinc-900">
          <button 
            onClick={handleDownload}
            disabled={!selectedFrame || frameLoadError}
            className="w-full py-4 bg-green-500 text-black rounded-full text-xs hover:bg-green-400 transition-all font-bold tracking-widest uppercase shadow-lg disabled:opacity-30 active:scale-95"
          >
            Manifest Image
          </button>
          <button onClick={onReset} className="w-full py-2 text-zinc-600 hover:text-red-500 transition-all text-[8px] uppercase tracking-[0.4em] rounded-full">Banish Ritual</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
