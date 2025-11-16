import { X } from 'lucide-react';
import { useEffect } from 'react';

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
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl sm:max-w-3xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Cerrar"
        >
          <X size={24} className="text-gray-800" />
        </button>

        {/* Video */}
        <div className="w-full bg-black flex-shrink-0">
          <video
            src={professional.videoSrc}
            className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] rounded-t-3xl"
            controls
            autoPlay
          />
        </div>

        {/* Información del profesional */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#00BFA5] shadow-lg overflow-hidden bg-gray-200 flex-shrink-0 mb-4 sm:mb-0">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {professional.name}
              </h2>
              <p className="text-gray-500 mb-1">{professional.role}</p>
              <p className="text-gray-400 text-sm mb-3">{professional.field}</p>
              <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
            </div>
          </div>
        </div>

        <div className="h-1 sm:h-2 bg-gradient-to-r from-[#00BFA5] via-[#00E5CC] to-[#00BFA5]"></div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.16,1,0.3,1); }
      `}</style>
    </div>
  );
}
