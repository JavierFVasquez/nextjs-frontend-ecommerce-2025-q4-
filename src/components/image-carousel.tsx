'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

/**
 * ImageCarousel Component
 * Displays a carousel of images with navigation buttons and indicators
 * Follows Single Responsibility Principle - only handles image display and navigation
 */
export function ImageCarousel({ images, alt }: ImageCarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  // @jvasquez2: If only one image, display it without navigation controls
  if (!images || images.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No image available
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    );
  }

  const goToPrevious = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className="group relative h-full w-full">
      {/* Current Image */}
      <Image
        src={images[currentIndex]}
        alt={`${alt} - Imagen ${currentIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
        priority={currentIndex === 0}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Navigation Buttons - Always visible with shadow for better visibility */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 shadow-lg transition-all hover:scale-110"
        onClick={goToPrevious}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 shadow-lg transition-all hover:scale-110"
        onClick={goToNext}
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Indicators (dots) */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              index === currentIndex
                ? 'w-4 bg-primary'
                : 'bg-primary/50 hover:bg-primary/75'
            )}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute right-4 top-4 z-10 rounded-md bg-black/50 px-2 py-1 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

