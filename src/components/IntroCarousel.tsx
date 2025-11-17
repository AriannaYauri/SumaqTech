import React, { useEffect, useRef, useState } from 'react';

export interface CarouselItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  img?: string;
  categoryId?: string;
}

interface IntroCarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  intervalMs?: number;
  className?: string;
  slidesToShow?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const IntroCarousel: React.FC<IntroCarouselProps> = ({
  items,
  autoplay = true,
  intervalMs = 60,
  className = '',
  slidesToShow,
  showDots = true,
  showArrows = false
}) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [computedSlidesToShow, setComputedSlidesToShow] = useState(1);

  useEffect(() => {
    const calc = () => {
      if (slidesToShow && slidesToShow > 0) {
        setComputedSlidesToShow(Math.max(1, Math.floor(slidesToShow)));
        return;
      }
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
      if (w < 640) setComputedSlidesToShow(1);
      else if (w < 1024) setComputedSlidesToShow(2);
      else setComputedSlidesToShow(4);
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [slidesToShow]);

  const maxIndex = Math.max(0, items.length - computedSlidesToShow);

  useEffect(() => {
    if (!autoplay || isPaused || items.length <= computedSlidesToShow) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, intervalMs);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoplay, intervalMs, isPaused, items.length, computedSlidesToShow, maxIndex]);

  useEffect(() => {
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, []);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  if (!items || items.length === 0) return null;

  const slideWidthPercent = 100 / computedSlidesToShow;
  const trackWidthPercent = items.length * slideWidthPercent;

  return (
    <div
      className={`relative w-full max-w-6xl mx-auto mb-12 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Qué encontrarás en SumaqTech"
    >
      {/* Título del carrusel */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 tracking-tight">
          ¿Qué encontrarás aquí?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00BFA5] to-[#00E5CC] mx-auto rounded-full"></div>
      </div>

      {/* Contenedor principal con gradiente de fondo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00BFA5]/5 via-white to-[#00E5CC]/5 shadow-lg p-1">
        <div className="overflow-hidden rounded-xl bg-white">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              width: `${trackWidthPercent}%`, 
              transform: `translateX(-${index * slideWidthPercent}%)` 
            }}
          >
            {items.map((item, idx) => (
              <article
                key={item.id}
                style={{ width: `${slideWidthPercent}%` }}
                className="flex-shrink-0 p-6 md:p-8"
                role="group"
                aria-roledescription="slide"
              >
                <div className="h-full flex flex-col items-center text-center group cursor-pointer">
                  {/* Icono con animación */}
                  <div className="mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#00BFA5] to-[#00E5CC] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-4xl md:text-5xl filter drop-shadow-lg">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00BFA5] transition-colors">
                    {item.title}
                  </h3>

                  {/* Descripción */}
                  {item.description && (
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xs">
                      {item.description}
                    </p>
                  )}

                  {/* Línea decorativa */}
                  <div className="mt-4 w-16 h-0.5 bg-gradient-to-r from-transparent via-[#00BFA5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </article>
            ))}
          </div>

          {/* Flechas de navegación */}
          {showArrows && items.length > computedSlidesToShow && (
            <>
              <button
                onClick={prev}
                aria-label="Anterior"
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-[#00BFA5] text-gray-700 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:ring-offset-2 z-10"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Siguiente"
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-[#00BFA5] text-gray-700 hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:ring-offset-2 z-10"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      {/* Indicadores de posición (dots) */}
      {showDots && maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a grupo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === index
                  ? 'w-8 h-3 bg-gradient-to-r from-[#00BFA5] to-[#00E5CC]'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      
    </div>
  );
};

export default IntroCarousel;