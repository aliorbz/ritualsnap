
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-6 border-t border-green-900/20 bg-black relative mt-auto">
      {/* Dynamic spacing for mobile navigation bars */}
      <div className="pb-safe h-0 w-full" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          {/* Creator Sigil & Credit */}
          <div className="flex flex-col items-center space-y-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="https://pbs.twimg.com/profile_images/1801955577763094529/5qtIvl5X_400x400.jpg" 
                alt="Void Architect" 
                className="w-14 h-14 rounded-full border border-green-500/30 group-hover:border-green-500 transition-all duration-500 shadow-lg relative z-10"
              />
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-[10px] md:text-sm tracking-[0.25em] uppercase font-mystical leading-loose">
                Evoked from the void by
              </p>
              <div className="mt-1">
                <a 
                  href="https://x.com/aliorbz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block relative text-green-500 font-bold text-sm md:text-base transition-all duration-300 hover:neon-text hover:scale-110 active:scale-95 px-2 py-1"
                >
                  aliorbz
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-green-900/50 to-transparent" />
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#39FF14]" />
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-green-900/50 to-transparent" />
          </div>

          <div className="text-[8px] md:text-[10px] text-zinc-800 uppercase tracking-[0.6em] font-mystical text-center">
            RitualSnap Protocol &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
