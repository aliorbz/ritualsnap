
import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { ViewState } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('landing');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

      {/* Main container without flex-col if on landing to allow standard document flow */}
      <main className="flex-grow">
        {activeView === 'landing' && (
          <LandingPage 
            onUploadClick={handleStartRitual} 
            onViewGallery={() => setActiveView('gallery')}
          />
        )}

        {(activeView === 'editor' || activeView === 'gallery') && (
          <div className="container mx-auto px-4 py-8 md:py-12">
            {activeView === 'editor' && (
              <Editor 
                image={uploadedImage} 
                onBack={() => setActiveView('landing')}
                onReset={() => {
                  setUploadedImage(null);
                  setActiveView('landing');
                }}
              />
            )}

            {activeView === 'gallery' && (
              <Gallery onUseFrame={(frameId) => {
                setActiveView('editor');
              }} />
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

      {/* Footer is part of the main vertical flex container of the App */}
      <Footer />
    </div>
  );
};

export default App;
