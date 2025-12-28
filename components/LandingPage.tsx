
import React from 'react';

interface LandingPageProps {
  onUploadClick: () => void;
  onViewGallery: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onUploadClick, onViewGallery }) => {
  return (
    <div className="w-full">
      {/* Section 1: Hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-green-900/20">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-green-500 rounded-full blur-[80px] md:blur-[160px]" />
        </div>
        
        <div className="relative z-10 space-y-6 md:space-y-8 animate-fade-in flex flex-col items-center max-w-4xl mx-auto">
          {/* Main Theme Resource Image - The Sigil */}
          <div className="relative mb-2 md:mb-8 md:mt-16 group">
            <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/40 transition-all duration-1000 animate-pulse" />
            <img 
              src="https://pbs.twimg.com/profile_images/1912582510631858176/-Xbw2AcT_400x400.jpg" 
              alt="Ritual Sigil" 
              className="w-24 h-24 md:w-48 md:h-48 rounded-full border-2 border-green-500 shadow-[0_0_30px_rgba(57,255,20,0.3)] relative z-10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-105"
            />
          </div>

          <div className="space-y-4 px-2">
            <div className="inline-block px-3 py-1 border border-green-500/30 rounded-full text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-green-500 bg-black/50 backdrop-blur-sm">
              The Digital Covenant
            </div>
            <h1 className="text-4xl md:text-9xl font-mystical tracking-tighter leading-tight md:leading-none">
              RITUAL<span className="neon-text">SNAP</span>
            </h1>
            <p className="text-base md:text-2xl text-gray-400 font-light font-mystical italic leading-relaxed max-w-lg md:max-w-2xl mx-auto">
              "Where pixels meet the primordial, and memories are bound in neon ink."
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center pt-4 w-full md:w-auto px-6">
            <button 
              onClick={onUploadClick}
              className="w-full md:w-auto px-10 py-4 md:py-5 bg-green-500 text-black font-bold uppercase tracking-widest text-[12px] md:text-sm hover:bg-green-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(57,255,20,0.4)] active:scale-95"
            >
              Begin Ritual
            </button>
            <button 
              onClick={onViewGallery}
              className="w-full md:w-auto px-10 py-4 md:py-5 border border-gray-800 text-white font-bold uppercase tracking-widest text-[12px] md:text-sm hover:border-green-500 transition-all bg-black/50 backdrop-blur-sm active:scale-95"
            >
              Enter Vault
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 animate-bounce">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 2: The Lore */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-mystical neon-text">THE SACRED ART</h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
                RitualSnap is not merely a tool; it is a digital altar. We believe every image carries a fragment of a soul. Our frames are curated from the archives of modern magic, blending occult geometry with cyber-neon energy.
              </p>
              <ul className="space-y-4 pt-4 text-left inline-block">
                {[
                  "No external uploads",
                  "High-fidelity PNGs",
                  "Zero data collection",
                  "Creator recognition"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] md:text-xs tracking-widest uppercase">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
               <div className="absolute inset-0 border border-green-500/20 z-10 pointer-events-none" />
               <img 
                 src="https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1000&auto=format&fit=crop" 
                 alt="Mystical Ritual" 
                 className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Process */}
      <section className="py-16 md:py-24 bg-zinc-950 border-y border-green-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-mystical tracking-widest mb-2 uppercase">The Path</h2>
            <div className="h-px w-16 md:w-24 bg-green-500 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {[
              { title: "Sacrifice", desc: "Upload your mundane image.", icon: "M12 4v16m8-8H4" },
              { title: "Enchant", desc: "Bind a frame from our vault.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "Manifest", desc: "Download your enchanted memory.", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-black border border-gray-800 rounded-full flex items-center justify-center mx-auto group-hover:border-green-500 transition-all">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-mystical text-white uppercase">{step.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm max-w-[200px] mx-auto leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="py-20 md:py-32 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 gap-4 h-full w-full rotate-12 scale-150">
                {Array.from({length: 24}).map((_, i) => (
                    <div key={i} className="border border-green-500 aspect-square" />
                ))}
            </div>
        </div>
        <div className="container mx-auto px-6 relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-mystical">READY TO <span className="neon-text">BEGIN?</span></h2>
          <button 
            onClick={onUploadClick}
            className="w-full md:w-auto px-12 md:px-16 py-5 md:py-6 bg-transparent border-2 border-green-500 text-green-500 font-bold uppercase tracking-[0.4em] hover:bg-green-500 hover:text-black transition-all active:scale-95 text-xs md:text-sm"
          >
            Start Ritual
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
