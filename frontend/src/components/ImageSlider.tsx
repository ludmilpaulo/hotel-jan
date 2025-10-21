"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface RoomImage {
  id: number;
  image_url: string;
  alt_text?: string;
  order: number;
}

interface ImageSliderProps {
  images: RoomImage[];
  roomName: string;
  className?: string;
}

export default function ImageSlider({ images, roomName, className = "" }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto mb-2 opacity-50">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <p className="text-sm opacity-75">Sem imagens</p>
        </div>
      </div>
    );
  }

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sortedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sortedImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        {/* Main Image */}
        <div className="relative group">
          <Image
            src={sortedImages[currentIndex].image_url}
            alt={sortedImages[currentIndex].alt_text || `${roomName} - Imagem ${currentIndex + 1}`}
            width={500}
            height={300}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={openFullscreen}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          
          {/* Fallback for broken images */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center hidden">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-2 opacity-50">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <p className="text-sm opacity-75">Imagem indisponível</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          {sortedImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {sortedImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {sortedImages.length}
            </div>
          )}

          {/* Click to expand hint */}
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Clique para expandir
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {sortedImages.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {sortedImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-yellow-500 ring-2 ring-yellow-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text || `${roomName} - Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              <Image
                src={sortedImages[currentIndex].image_url}
                alt={sortedImages[currentIndex].alt_text || `${roomName} - Imagem ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
              />

              {/* Fullscreen Navigation */}
              {sortedImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Fullscreen Image Counter */}
              {sortedImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-lg">
                  {currentIndex + 1} / {sortedImages.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
