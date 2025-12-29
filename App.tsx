
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { ViewState, Frame } from './types';
import { FRAMES as DEFAULT_FRAMES } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('landing');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [allFrames, setAllFrames] = useState<Frame[]>([]);

  // Load frames from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('ritualsnap_custom_frames');
    const custom = saved ? JSON.parse(saved) : [];
    // Merge defaults with custom frames
    setAllFrames([...DEFAULT_FRAMES, ...custom]);
  }, []);

  const handleAddFrame = (newFrame: Frame) => {
    const saved = localStorage.getItem('ritualsnap_custom_frames');
    const custom = saved ? JSON.parse(saved) : [];
    const updatedCustom = [newFrame, ...custom];
    localStorage.setItem('ritualsnap_custom_frames', JSON.stringify(updatedCustom));
    setAllFrames([...DEFAULT_FRAMES, ...updatedCustom]);
  };

  const handleDeleteFrame = (id: string) => {
    const saved = localStorage.getItem('ritualsnap_custom_frames');
    const custom = saved ? JSON.parse(saved) : [];
    const updatedCustom = custom.filter((f: Frame) => f.id !== id);
    localStorage.setItem('ritualsnap_custom_frames', JSON.stringify(updatedCustom));
    setAllFrames([...DEFAULT_FRAMES, ...updatedCustom]);
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

  return (
    <div className="min-h-screen ritual-gradient flex flex-col selection:bg-green-500 selection:text-black">
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />

      {/* Removed global pt-16/20. Specific components will handle their own spacing to accommodate the sticky header. */}
      <main className="flex-grow">
        {activeView === 'landing' && (
          <LandingPage 
            onUploadClick={handleStartRitual} 
            onViewGallery={() => setActiveView('gallery')}
          />
        )}

        {activeView === 'admin' && (
          <div className="container mx-auto px-4 py-8">
            <AdminPanel 
              frames={allFrames.filter(f => f.isCustom)} 
              onAdd={handleAddFrame} 
              onDelete={handleDeleteFrame}
              onBack={() => setActiveView('landing')}
            />
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

      <Footer onAdminClick={() => setActiveView('admin')} />
    </div>
  );
};

export default App;
