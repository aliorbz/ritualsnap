
import React, { useState } from 'react';
import { Frame } from '../types';
import { supabase } from '../supabaseClient';

interface AdminPanelProps {
  frames: Frame[];
  onAdd: (frame: Frame) => Promise<boolean>;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ frames, onAdd, onDelete, onBack }) => {
  const [newFrame, setNewFrame] = useState<Partial<Frame>>({
    name: '',
    description: '',
    lore: '',
    creator: { name: '', handle: '', socialUrl: '', platform: 'Instagram' }
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{msg: string, type: 'info' | 'warn'} | null>(null);

  const optimizeSigil = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const MAX_SIZE = 2048; // Crisp 2K resolution is plenty for frames
        let width = img.width;
        let height = img.height;

        if (width <= MAX_SIZE && height <= MAX_SIZE) {
          resolve(base64);
          return;
        }

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/png', 0.8));
        } else {
          resolve(base64);
        }
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadStatus(null);

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus({ msg: "The Void rejects files over 10MB. Please use a smaller sigil.", type: 'warn' });
        e.target.value = '';
        return;
      }
      
      if (file.size > 3 * 1024 * 1024) {
        setUploadStatus({ msg: "Complex sigil detected. Auto-optimizing for the Great Database...", type: 'info' });
      }

      setIsOptimizing(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawBase64 = event.target?.result as string;
        const optimized = await optimizeSigil(rawBase64);
        setPreviewUrl(optimized);
        setIsOptimizing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    onBack();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl || !newFrame.name) {
        alert('Please provide a name and a sigil image.');
        return;
    }

    setIsSubmitting(true);
    const frameData: Frame = {
      id: '', 
      name: newFrame.name!,
      description: newFrame.description || 'A mysterious relic.',
      imageUrl: previewUrl,
      thumbnailUrl: previewUrl,
      lore: newFrame.lore || 'No history recorded.',
      creator: {
        name: newFrame.creator?.name || 'Unknown Architect',
        handle: newFrame.creator?.handle || '@anonymous',
        socialUrl: newFrame.creator?.socialUrl || '#',
        platform: newFrame.creator?.platform || 'Instagram'
      },
      isCustom: true
    };

    const success = await onAdd(frameData);
    
    if (success) {
      setNewFrame({ name: '', description: '', lore: '', creator: { name: '', handle: '', socialUrl: '', platform: 'Instagram' } });
      setPreviewUrl(null);
      setUploadStatus(null);
      alert("Sigil successfully bound to the Global Vault.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-fade-in pb-20 mt-4 md:mt-8 px-2 md:px-0 pt-16 md:pt-24">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-green-900/30 pb-6 gap-4">
        <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-mystical neon-text uppercase tracking-widest">Global Vault Forge</h2>
            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">Authorized Architects Only</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-[10px] text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Home</button>
          <button onClick={handleLogout} className="text-[10px] text-red-500 uppercase tracking-widest border border-red-900/30 px-4 py-2 hover:bg-red-900/10 rounded-full transition-all">Sign Out</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        <section className="space-y-6">
          <h3 className="text-xl font-mystical text-white uppercase border-l-2 border-green-500 pl-4">Forge New Global Sigil</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest ml-1">Sigil Image (Transparent PNG up to 10MB)</label>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/png" 
                  onChange={handleFileChange} 
                  className="w-full bg-black border border-zinc-800 p-3 text-xs text-zinc-400 file:bg-green-500 file:border-none file:text-black file:font-bold file:px-3 file:py-1 file:mr-4 file:cursor-pointer rounded-full" 
                />
              </div>
              {uploadStatus && (
                <p className={`text-[10px] uppercase tracking-widest animate-pulse ${uploadStatus.type === 'warn' ? 'text-red-500' : 'text-yellow-600'}`}>
                  {uploadStatus.msg}
                </p>
              )}
            </div>

            {isOptimizing && (
              <div className="w-full p-8 border border-zinc-900 bg-black/40 rounded-xl flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                <p className="text-[10px] text-green-500 uppercase tracking-widest">Enchanting Pixels...</p>
              </div>
            )}

            {previewUrl && !isOptimizing && (
              <div className="aspect-square w-full md:w-48 border border-green-500/20 bg-black flex items-center justify-center p-4 rounded-xl shadow-inner mx-auto lg:mx-0">
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
            )}

            <div className="space-y-4">
                <input 
                  placeholder="Sigil Name" 
                  className="w-full bg-black border border-zinc-800 p-4 text-white text-sm focus:border-green-500 outline-none rounded-lg"
                  value={newFrame.name}
                  onChange={(e) => setNewFrame({...newFrame, name: e.target.value})}
                  required
                />
                <textarea 
                  placeholder="Short Descriptive Fragment" 
                  className="w-full bg-black border border-zinc-800 p-4 text-white text-sm focus:border-green-500 outline-none h-20 rounded-lg resize-none"
                  value={newFrame.description}
                  onChange={(e) => setNewFrame({...newFrame, description: e.target.value})}
                />
                <textarea 
                  placeholder="Deep Lore & Ancient Backstory" 
                  className="w-full bg-black border border-zinc-800 p-4 text-white text-sm focus:border-green-500 outline-none h-32 rounded-lg resize-none"
                  value={newFrame.lore}
                  onChange={(e) => setNewFrame({...newFrame, lore: e.target.value})}
                />
            </div>

            <div className="space-y-4 p-5 border border-zinc-900 rounded-xl bg-black/30">
              <h4 className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest mb-1">Architect Profile</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Architect Name" 
                  className="w-full bg-black border border-zinc-800 p-4 text-white text-sm focus:border-green-500 outline-none rounded-lg"
                  value={newFrame.creator?.name}
                  onChange={(e) => setNewFrame({...newFrame, creator: {...newFrame.creator!, name: e.target.value}})}
                />
                <input 
                  placeholder="Handle (e.g. @artist)" 
                  className="w-full bg-black border border-zinc-800 p-4 text-white text-sm focus:border-green-500 outline-none rounded-lg"
                  value={newFrame.creator?.handle}
                  onChange={(e) => setNewFrame({...newFrame, creator: {...newFrame.creator!, handle: e.target.value}})}
                />
              </div>
              <input 
                placeholder="Social URL (e.g. https://x.com/artist)" 
                className="w-full bg-black border border-zinc-800 p-4 text-white text-sm focus:border-green-500 outline-none rounded-lg"
                value={newFrame.creator?.socialUrl}
                onChange={(e) => setNewFrame({...newFrame, creator: {...newFrame.creator!, socialUrl: e.target.value}})}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || isOptimizing}
              className="w-full py-5 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] active:scale-95 rounded-full disabled:opacity-50"
            >
              {isSubmitting ? 'Binding Sigil...' : 'Bind to Global Vault'}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-mystical text-white uppercase border-l-2 border-red-500 pl-4">The Global Archives</h3>
          <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
            {frames.length === 0 ? (
              <div className="p-12 border border-zinc-900 border-dashed rounded-xl text-center">
                 <p className="text-zinc-600 italic text-sm">No universal sigils bound yet.</p>
              </div>
            ) : (
              frames.map(frame => (
                <div key={frame.id} className="flex gap-4 p-4 border border-zinc-800 bg-black/50 items-center rounded-xl group hover:border-green-500/20 transition-all">
                  <div className="w-16 h-16 bg-black border border-zinc-800 p-1 flex items-center justify-center rounded-lg shrink-0">
                    <img src={frame.imageUrl} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-white font-mystical text-sm truncate">{frame.name}</h4>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest truncate">{frame.creator.name}</p>
                  </div>
                  <button 
                    onClick={() => {
                        if (confirm('Are you sure you want to banish this sigil from the global vault?')) {
                            onDelete(frame.id);
                        }
                    }}
                    className="p-3 text-zinc-600 hover:text-red-500 transition-colors bg-zinc-900/50 rounded-full shrink-0"
                    title="Banish Sigil"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
