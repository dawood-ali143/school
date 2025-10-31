import React from 'react';
import SceneContainer from './ThreeScene';
import ImageGallery from './ImageGallery';

export default function App() {
  return (
    <div className="min-h-screen">
      {/* 3D canvas background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <SceneContainer />
      </div>

      {/* UI overlay (gallery + controls) */}
      <div style={{ position: 'relative', zIndex: 10 }} className="pointer-auto">
        <ImageGallery />
      </div>
    </div>
  );
}
