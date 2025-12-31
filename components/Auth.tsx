
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthProps {
  onSuccess: () => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    setLoading(true);
    setError(null);

    // Only sign in is permitted for this invite-only sanctum
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Provide a more mystical error message for generic failures
      setError(error.message === 'Invalid login credentials' 
        ? 'Your sigil is unrecognized. Access to the forge is denied.' 
        : error.message
      );
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-24 md:mt-32 p-6 md:p-10 border border-green-500/20 bg-black/40 backdrop-blur-xl rounded-3xl space-y-8 animate-fade-in shadow-[0_0_80px_rgba(57,255,20,0.05)] pt-16">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="w-16 h-16 bg-black border-2 border-green-500/30 rounded-full flex items-center justify-center mb-2 group-hover:border-green-500 transition-all duration-700">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-mystical neon-text uppercase tracking-[0.2em]">
              Altar Access
            </h2>
            <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] italic">The gate for the invited few</p>
        </div>
      </div>

      <form onSubmit={handleAuth} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-red-500 text-[10px] uppercase tracking-widest text-center leading-relaxed">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <div className="group relative">
            <input 
                type="email" 
                placeholder="Architect Email" 
                className="w-full bg-zinc-950/50 border border-zinc-900 p-4 text-white focus:border-green-500 outline-none transition-all rounded-2xl text-sm placeholder:text-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div className="group relative">
            <input 
                type="password" 
                placeholder="Secret Key" 
                className="w-full bg-zinc-950/50 border border-zinc-900 p-4 text-white focus:border-green-500 outline-none transition-all rounded-2xl text-sm placeholder:text-zinc-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
        </div>
        <button 
          disabled={loading}
          className="w-full py-5 bg-green-500 text-black font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-green-400 rounded-full transition-all active:scale-95 shadow-[0_0_30px_rgba(57,255,20,0.2)] disabled:opacity-50"
        >
          {loading ? 'Communing...' : 'Unlock the Forge'}
        </button>
      </form>

      <div className="text-center pt-4 space-y-6">
        <p className="text-[8px] text-zinc-700 uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
          Access is granted only to those who have been initiated by the Void Architect.
        </p>
        <button onClick={onBack} className="text-zinc-500 text-[9px] uppercase tracking-[0.6em] hover:text-white transition-colors">Banish Screen</button>
      </div>
    </div>
  );
};

export default Auth;
