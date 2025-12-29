
import React, { useState } from 'react';
import { Frame, Creator } from '../types';

interface AdminPanelProps {
  frames: Frame[];
  onAdd: (frame: Frame) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ frames, onAdd, onDelete, onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newFrame, setNewFrame] = useState<Partial<Frame>>({
    name: '',
    description: '',
    lore: '',
    creator: { name: '', handle: '', socialUrl: '', platform: 'Instagram' }
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ritual2025') { 
      setIsAuthenticated(true);
    } else {
      alert('The void rejects your credentials.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl || !newFrame.name) {
        alert('Please provide a name and a sigil image.');
        return;
    }

    const frame: Frame = {
      id: `custom-${Date.now()}`,
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

    onAdd(frame);
    setNewFrame({ name: '', description: '', lore: '', creator: { name: '', handle: '', socialUrl: '', platform: 'Instagram' } });
    setPreviewUrl(null);
    alert('Sigil bound to the vault.');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-24 md:mt-32 p-6 md:p-8 border border-green-500/30 bg-zinc-950 rounded-xl space-y-6 animate-fade-in shadow-[0_0_50px_rgba(57,255,20,0.1)]">
        <div className="flex flex-col items-center space-y-2 text-center">
            <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h2 className="text-xl md:text-2xl font-mystical neon-text uppercase tracking-widest">Entering the Archives</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Sacred Word" 
            className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-green-500 outline-none transition-all rounded-full font-mystical tracking-widest text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button className="w-full py-4 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-green-400 rounded-full transition-all active:scale-95 shadow-lg">Unlock</button>
        </form>
        <button onClick={onBack} className="w-full text-zinc-600 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Return to Sanctum</button>
      </div>
    );
  }

  return (
    /* Added pt-16 md:pt-24 to provide space for the sticky header in the admin view */
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 animate-fade-in pb-20 mt-4 md:mt-8 px-2 md:px-0 pt-16 md:pt-24">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-green-900/30 pb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-mystical neon-text uppercase tracking-widest">Vault Forge</h2>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] text-red-500 uppercase tracking-widest border border-red-900/30 px-4 py-2 hover:bg-red-900/10 rounded-full transition-all">Logout</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        <section className="space-y-6">
          <h3 className="text-xl font-mystical text-white uppercase border-l-2 border-green-500 pl-4">Forge New Sigil</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest ml-1">Sigil Image (Transparent PNG)</label>
              <div className="relative group">
                <input type="file" accept="image/png" onChange={handleFileChange} className="w-full bg-black border border-zinc-800 p-3 text-xs text-zinc-400 file:bg-green-500 file:border-none file:text-black file:font-bold file:px-3 file:py-1 file:mr-4 file:cursor-pointer rounded-full" />
              </div>
            </div>

            {previewUrl && (
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
              className="w-full py-5 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)] active:scale-95 rounded-full"
            >
              Bind to Vault
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-mystical text-white uppercase border-l-2 border-red-500 pl-4">The Custom Archives</h3>
          <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
            {frames.length === 0 ? (
              <div className="p-12 border border-zinc-900 border-dashed rounded-xl text-center">
                 <p className="text-zinc-600 italic text-sm">No custom sigils bound yet.</p>
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
                        if (confirm('Are you sure you want to banish this sigil?')) {
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
