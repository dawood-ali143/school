import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery() {
  const images = [
    { src: "/img11.png", alt: "Image 11", caption: "Image 11 caption" },
    { src: "/img12.png", alt: "Image 12", caption: "Image 12 caption" },
    { src: "/img13.png", alt: "Image 13", caption: "Image 13 caption" },
    { src: "/img14.png", alt: "Image 14", caption: "Image 14 caption" },
  ];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index]);

  function openAt(i) {
    setIndex(i);
    setOpen(true);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div className="ui-overlay pointer-auto">
      <header className="max-w-5xl mx-auto mt-6 p-4 text-white">
        <h1 className="text-2xl sm:text-3xl font-semibold">3D Rolling Image Wall</h1>
        <p className="text-sm text-gray-200/80">Floating 3D wall in the background — click thumbnails to open.</p>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-white/5">
              <button onClick={() => openAt(i)} className="w-full h-full block" aria-label={`Open ${img.alt}`}>
                <img src={img.src} alt={img.alt} className="w-full h-40 object-cover transform hover:scale-105 transition" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />
            <motion.div className="relative max-w-4xl w-full max-h-[90vh]" initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }}>
              <div className="flex items-center justify-between mb-2 text-white">
                <div className="text-sm">{images[index].caption}</div>
                <div className="flex gap-2">
                  <a href={images[index].src} target="_blank" rel="noreferrer" className="underline">Open</a>
                  <a href={images[index].src} download className="underline">Download</a>
                  <button onClick={() => setOpen(false)} className="px-2 py-1 bg-white/10 rounded">Close</button>
                </div>
              </div>

              <div className="relative w-full h-[70vh] flex items-center justify-center">
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10">◀</button>
                <img src={images[index].src} alt={images[index].alt} className="max-h-full max-w-full rounded-lg shadow-lg" />
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10">▶</button>
              </div>
              <div className="mt-3 text-xs text-gray-200 text-center">Use ← → to navigate, Esc to close</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
