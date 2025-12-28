
import React, { useRef, useEffect, useState } from 'react';
import { FRAMES } from '../constants';
import { Frame } from '../types';

interface EditorProps {
  image: string | null;
  onBack: () => void;
  onReset: () => void;
}

const Editor: React.FC<EditorProps> = ({ image, onBack, onReset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);

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

    const userImg = new Image();
    userImg.src = image;
    userImg.onload = () => {
      // Create high-quality square canvas based on the largest dimension of user image
      const size = Math.max(userImg.width, userImg.height);
      canvas.width = size;
      canvas.height = size;

      // Draw background photo (Centered and Filled)
      const scale = Math.max(size / userImg.width, size / userImg.height);
      const x = (size / 2) - (userImg.width / 2) * scale;
      const y = (size / 2) - (userImg.height / 2) * scale;
      
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);

      // Draw frame overlay
      if (selectedFrame) {
        const frameImg = new Image();
        frameImg.src = selectedFrame.imageUrl;
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, size, size);
        };
      }
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `ritualsnap-${selectedFrame?.id || 'enchanted'}.png`;
    link.href = canvas.toDataURL('image/png', 1.0); // Best quality
    link.click();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-12 items-start animate-fade-in">
      {/* Canvas Area */}
      <div className="lg:col-span-2 space-y-6">
        <div className="aspect-square bg-zinc-950 border-2 border-green-500/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
          />
          {!selectedFrame && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                <div className="w-16 h-16 border-2 border-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 17h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                </div>
                <span className="text-green-500 font-mystical tracking-widest uppercase mb-1">Ritual Pending</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Choose a frame from the vault to bind your image</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-8 flex flex-col">
        <div className="space-y-4">
          <h3 className="text-xl font-mystical tracking-[0.3em] neon-text uppercase">The Vault</h3>
          <div className="grid grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
            {FRAMES.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame)}
                className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedFrame?.id === frame.id ? 'border-green-500 shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'border-zinc-800 hover:border-green-500/40'}`}
              >
                <div className="aspect-square bg-black">
                    <img 
                        src={frame.thumbnailUrl} 
                        alt={frame.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400/000000/39FF14?text=MISSING+PNG';
                        }}
                    />
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">{frame.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedFrame && (
          <div className="space-y-4 p-6 bg-zinc-950 border border-green-500/10 rounded-2xl">
            <h4 className="font-mystical text-xl text-white border-b border-green-500/10 pb-3">{selectedFrame.name}</h4>
            <p className="text-sm text-gray-400 italic leading-relaxed">"{selectedFrame.description}"</p>
            <div className="flex items-center justify-between pt-2 border-t border-green-500/10">
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">The Architect</span>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{selectedFrame.creator.name}</span>
            </div>
          </div>
        )}

        <div className="mt-auto space-y-4 pt-4 border-t border-zinc-900">
          <button 
            onClick={handleDownload}
            disabled={!selectedFrame}
            className="w-full py-5 bg-green-500 text-black rounded hover:bg-green-400 transition-all font-bold tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(57,255,20,0.2)] disabled:opacity-20 disabled:grayscale"
          >
            Manifest Image
          </button>

          <button 
            onClick={onReset}
            className="w-full py-2 text-zinc-600 hover:text-red-500 transition-all text-[9px] uppercase tracking-[0.4em]"
          >
            Shatter Ritual (Reset)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
