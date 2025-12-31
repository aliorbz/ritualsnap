
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import { ViewState, Frame } from './types';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('landing');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [allFrames, setAllFrames] = useState<Frame[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Session and Frames
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchFrames();

    return () => subscription.unsubscribe();
  }, []);

  const fetchFrames = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('frames')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mappedFrames: Frame[] = data.map(f => ({
          id: f.id,
          name: f.name,
          description: f.description,
          imageUrl: f.image_url,
          thumbnailUrl: f.thumbnail_url,
          lore: f.lore,
          isCustom: f.is_custom,
          creator: {
            name: f.creator_name,
            handle: f.creator_handle,
            socialUrl: f.creator_social_url,
            platform: 'Instagram'
          }
        }));
        setAllFrames(mappedFrames);
      }
    } catch (err) {
      console.error("Failed to fetch sigils:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFrame = async (newFrame: Frame) => {
    if (!supabase) return;
    const { error } = await supabase.from('frames').insert([{
      name: newFrame.name,
      description: newFrame.description,
      lore: newFrame.lore,
      image_url: newFrame.imageUrl,
      thumbnail_url: newFrame.thumbnailUrl,
      creator_name: newFrame.creator.name,
      creator_handle: newFrame.creator.handle,
      creator_social_url: newFrame.creator.socialUrl,
      is_custom: true
    }]);

    if (!error) {
      fetchFrames();
    } else {
      alert("Error binding sigil to global vault: " + error.message);
    }
  };

  const handleDeleteFrame = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('frames').delete().eq('id', id);
    if (!error) {
      fetchFrames();
    } else {
      alert("Void error: could not banish sigil.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setActiveView('editor');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartRitual = () => {
    document.getElementById('image-upload')?.click();
  };

  // If Supabase isn't configured, show a setup guide instead of crashing
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center space-y-8 selection:bg-green-500">
        <div className="w-20 h-20 border-2 border-green-500 rounded-full flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="space-y-4 max-w-lg">
          <h1 className="text-3xl font-mystical neon-text uppercase tracking-widest">Sanctum Connection Required</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The ritual cannot proceed without a connection to the Great Database. 
            You must add the following **Secrets** (Environment Variables) to your project settings:
          </p>
          <div className="grid grid-cols-1 gap-3 text-left">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <code className="text-green-500 font-bold block mb-1 uppercase tracking-widest text-[10px]">SUPABASE_URL</code>
              <p className="text-zinc-600 text-[10px]">Found in Project Settings &gt; API</p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <code className="text-green-500 font-bold block mb-1 uppercase tracking-widest text-[10px]">SUPABASE_ANON_KEY</code>
              <p className="text-zinc-600 text-[10px]">Found in Project Settings &gt; API (Project API Keys)</p>
            </div>
          </div>
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest mt-6">Restart the ritual after binding these keys.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ritual-gradient flex flex-col selection:bg-green-500 selection:text-black">
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />

      <main className="flex-grow">
        {activeView === 'landing' && (
          <LandingPage 
            onUploadClick={handleStartRitual} 
            onViewGallery={() => setActiveView('gallery')}
          />
        )}

        {activeView === 'auth' && (
          <Auth 
            onSuccess={() => setActiveView('admin')} 
            onBack={() => setActiveView('landing')} 
          />
        )}

        {activeView === 'admin' && (
          <div className="container mx-auto px-4 py-8">
            {!session ? (
              <Auth onSuccess={() => setActiveView('admin')} onBack={() => setActiveView('landing')} />
            ) : (
              <AdminPanel 
                frames={allFrames} 
                onAdd={handleAddFrame} 
                onDelete={handleDeleteFrame}
                onBack={() => setActiveView('landing')}
              />
            )}
          </div>
        )}

        {(activeView === 'editor' || activeView === 'gallery') && (
          <div className="container mx-auto px-4 py-8 md:py-12">
            {activeView === 'editor' && (
              <Editor 
                image={uploadedImage} 
                frames={allFrames}
                onBack={() => setActiveView('landing')}
                onReset={() => {
                  setUploadedImage(null);
                  setActiveView('landing');
                }}
              />
            )}

            {activeView === 'gallery' && (
              <Gallery 
                frames={allFrames}
                loading={loading}
                onUseFrame={(frameId) => {
                  setActiveView('editor');
                }} 
              />
            )}
          </div>
        )}

        <input 
          id="image-upload" 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleImageUpload}
        />
      </main>

      <Footer onAdminClick={() => setActiveView(session ? 'admin' : 'auth')} />
    </div>
  );
};

export default App;
