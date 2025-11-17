import { X, Briefcase, GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Professional {
  id: string;
  name: string;
  role: string;
  field: string;
  image: string;
  videoSrc: string;
  bio: string;
}

interface VideoModalProps {
  professional: Professional;
  onClose: () => void;
}

export function VideoModal({ professional, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Enfocar en el modal para accesibilidad
    const focusableElements = document.querySelectorAll('button, video');
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }

    // Escape key para cerrar
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Pausar video antes de cerrar
      if (videoRef.current) {
        videoRef.current.pause();
      }
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-5xl bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn max-h-[95vh] flex flex-col">
        
        {/* Header con botón de cerrar mejorado */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
          <button
            onClick={onClose}
            className="ml-auto flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-lg pointer-events-auto"
            aria-label="Cerrar modal"
          >
            <span className="text-sm font-medium hidden sm:inline">Cerrar</span>
            <X size={20} />
          </button>
        </div>

        {/* Video mejorado */}
        <div className="w-full bg-black flex-shrink-0 relative">
          <video
            ref={videoRef}
            src={professional.videoSrc}
            className="w-full h-auto max-h-[55vh] object-contain"
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
          />
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto">
          {/* Info del profesional con diseño mejorado */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              
              {/* Foto con badge */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-200 shadow-xl ring-4 ring-[#00BFA5]/20">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%2300BFA5" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="white"%3E' + professional.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                {/* Badge verificado */}
                <div className="absolute -bottom-2 -right-2 bg-[#00BFA5] rounded-full p-2 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Info textual */}
              <div className="flex-1">
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {professional.name}
                </h2>

                {/* Tags de rol y field */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-2 bg-[#00BFA5]/10 px-4 py-2 rounded-full">
                    <Briefcase size={18} className="text-[#00BFA5]" />
                    <span className="text-sm font-medium text-gray-700">{professional.role}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                    <GraduationCap size={18} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">{professional.field}</span>
                  </div>
                </div>

                {/* Bio con mejor tipografía */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Sobre {professional.name.split(' ')[0]}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {professional.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA opcional para acciones adicionales */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="bg-gradient-to-r from-[#00BFA5]/10 to-[#00E5CC]/10 rounded-2xl p-6 border border-[#00BFA5]/20">
              <p className="text-gray-700 text-center mb-4">
                ¿Te inspira esta historia? Explora más carreras STEM
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#00BFA5] to-[#00E5CC] hover:from-[#00A896] hover:to-[#00BFA5] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explorar más profesionales
              </button>
            </div>
          </div>
        </div>

        {/* Barra decorativa inferior */}
        <div className="h-2 bg-gradient-to-r from-[#00BFA5] via-[#00E5CC] to-[#00BFA5]"></div>
      </div>

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes scaleIn { 
          from { opacity: 0; transform: scale(0.9) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        .animate-fadeIn { 
          animation: fadeIn 0.2s ease-out; 
        }
        .animate-scaleIn { 
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
        }
      `}</style>
    </div>
  );
}