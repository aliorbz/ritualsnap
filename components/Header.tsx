
import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-green-900/40">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setActiveView('landing')}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-black border border-green-500 rounded flex items-center justify-center group-hover:neon-glow transition-all">
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-lg md:text-2xl font-mystical tracking-[0.2em] neon-text">RITUALSNAP</h1>
        </div>

        <nav className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => setActiveView('landing')}
            className={`text-[10px] md:text-xs tracking-widest uppercase transition-colors ${activeView === 'landing' ? 'neon-text' : 'text-gray-400 hover:text-green-400'}`}
          >
            <span className="hidden md:inline">Sanctum</span>
            <span className="md:hidden">Home</span>
          </button>
          <button 
            onClick={() => setActiveView('gallery')}
            className={`text-[10px] md:text-xs tracking-widest uppercase transition-colors ${activeView === 'gallery' ? 'neon-text' : 'text-gray-400 hover:text-green-400'}`}
          >
            Vault
          </button>
          <button 
            onClick={() => {
                if (activeView === 'editor') {
                    setActiveView('landing');
                } else {
                    document.getElementById('image-upload')?.click();
                }
            }}
            className="px-3 py-1.5 md:px-6 md:py-2 bg-green-500 text-black text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-green-400 transition-all rounded shadow-lg whitespace-nowrap"
          >
            {activeView === 'editor' ? 'Close' : 'Begin'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
