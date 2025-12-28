
import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-900/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setActiveView('landing')}
        >
          <div className="w-10 h-10 bg-black border border-green-500 rounded-lg flex items-center justify-center group-hover:neon-glow transition-all">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-mystical tracking-widest neon-text">RITUALSNAP</h1>
        </div>

        <nav className="flex items-center gap-8">
          <button 
            onClick={() => setActiveView('landing')}
            className={`text-sm tracking-widest uppercase transition-colors ${activeView === 'landing' ? 'neon-text' : 'text-gray-400 hover:text-green-400'}`}
          >
            Sanctum
          </button>
          <button 
            onClick={() => setActiveView('gallery')}
            className={`text-sm tracking-widest uppercase transition-colors ${activeView === 'gallery' ? 'neon-text' : 'text-gray-400 hover:text-green-400'}`}
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
            className="px-6 py-2 bg-green-500 text-black font-bold uppercase tracking-tighter hover:bg-green-400 transition-all rounded shadow-lg"
          >
            {activeView === 'editor' ? 'Close Ritual' : 'Begin Ritual'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
