
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
      const size = Math.max(userImg.width, userImg.height);
      canvas.width = size;
      canvas.height = size;

      const scale = Math.max(size / userImg.width, size / userImg.height);
      const x = (size / 2) - (userImg.width / 2) * scale;
      const y = (size / 2) - (userImg.height / 2) * scale;
      
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);

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
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start animate-fade-in max-w-6xl mx-auto px-2">
      {/* Canvas Area */}
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
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">Select a frame from the vault</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-6 flex flex-col h-full">
        <div className="space-y-3">
          <h3 className="text-sm font-mystical tracking-[0.3em] neon-text uppercase px-1">The Vault</h3>
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 max-h-[160px] lg:max-h-[420px] overflow-y-auto pr-1 pb-2 custom-scrollbar">
            {FRAMES.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setSelectedFrame(frame)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 active:scale-95 ${selectedFrame?.id === frame.id ? 'border-green-500' : 'border-zinc-800'}`}
              >
                <div className="aspect-square bg-black">
                    <img src={frame.thumbnailUrl} alt={frame.name} className="w-full h-full object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedFrame && (
          <div className="space-y-3 p-4 bg-zinc-950 border border-green-500/10 rounded-xl">
            <h4 className="font-mystical text-sm text-white border-b border-green-500/10 pb-2 uppercase tracking-widest">{selectedFrame.name}</h4>
            <p className="text-[10px] text-gray-500 italic leading-relaxed">"{selectedFrame.description}"</p>
            <div className="flex items-center justify-between pt-2">
                <span className="text-[8px] text-zinc-600 uppercase tracking-widest font-bold">The Architect</span>
                <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest">{selectedFrame.creator.name}</span>
            </div>
          </div>
        )}

        <div className="mt-auto space-y-3 pt-4 border-t border-zinc-900">
          <button 
            onClick={handleDownload}
            disabled={!selectedFrame}
            className="w-full py-4 bg-green-500 text-black rounded text-[10px] md:text-xs hover:bg-green-400 transition-all font-bold tracking-[0.3em] uppercase shadow-lg disabled:opacity-30 disabled:grayscale active:scale-95"
          >
            Manifest Image
          </button>

          <button 
            onClick={onReset}
            className="w-full py-1 text-zinc-600 hover:text-red-500 transition-all text-[8px] uppercase tracking-[0.4em]"
          >
            Reset Ritual
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
