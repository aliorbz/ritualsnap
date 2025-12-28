
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-green-900/20 bg-black mt-20">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 group">
          <div className="flex items-center gap-3">
            <img 
              src="https://pbs.twimg.com/profile_images/1801955577763094529/5qtIvl5X_400x400.jpg" 
              alt="Void Architect" 
              className="w-10 h-10 rounded-full border border-green-500/30 group-hover:border-green-500 group-hover:neon-glow transition-all duration-500"
            />
            <p className="text-gray-400 text-sm tracking-[0.2em] uppercase font-mystical">
              Evoked from the void by{' '}
              <a 
                href="https://x.com/aliorbz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block relative text-green-500 font-bold transition-all duration-300 hover:neon-text hover:scale-110 active:scale-95 group-hover:tracking-widest"
              >
                aliorbz
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex gap-8 text-[10px] tracking-widest uppercase text-gray-600">
          <a href="#" className="hover:text-green-500 transition-colors">Covenant</a>
          <a href="#" className="hover:text-green-500 transition-colors">Privacy Sigil</a>
          <a href="#" className="hover:text-green-500 transition-colors">Owner Access</a>
        </div>

        <div className="text-[10px] text-gray-700 uppercase tracking-[0.4em] text-center">
            © {new Date().getFullYear()} RitualSnap. All rights reserved by the Night Mother.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
