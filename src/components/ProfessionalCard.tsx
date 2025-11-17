import { Play, Briefcase, GraduationCap } from 'lucide-react';
import React, { useState } from 'react';

interface ProfessionalCardProps {
  name: string;
  role?: string;
  field?: string;
  photoUrl: string;
  videoSrc: string;
  description?: string;
  onClick: () => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  role,
  field,
  photoUrl,
  videoSrc,
  description,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video con mejor control */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#00BFA5] to-[#00897B]">
        <video
          src={videoSrc}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          muted
          loop
          playsInline
          autoPlay={isHovered}
        />

        {/* Overlay con gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Icono de Play grande cuando NO hay hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-all duration-300">
          <div className="text-center transform group-hover:scale-95 transition-transform duration-300">
            <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 shadow-xl">
              <Play size={40} className="text-white fill-white ml-1" />
            </div>
            <p className="text-white font-semibold text-sm drop-shadow-lg">Ver testimonio</p>
          </div>
        </div>

        {/* Botón de play en hover (más pequeño y sólido) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white rounded-full p-5 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play size={36} className="text-[#00BFA5] fill-[#00BFA5] ml-1" />
          </div>
        </div>

        
      </div>

      {/* Foto circular mejorada */}
      <div className="absolute top-[11.5rem] left-6 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200 z-10 transform group-hover:scale-105 transition-transform duration-300">
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%2300BFA5" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="white"%3E' + name.charAt(0) + '%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>

      {/* Información con mejor espaciado */}
      <div className="p-6 pt-16">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00BFA5] transition-colors duration-300">
          {name}
        </h3>

        {/* Info con iconos mejorados */}
        <div className="space-y-2 mb-4">
          {role && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-[#00BFA5]/10 flex items-center justify-center flex-shrink-0">
                <Briefcase size={16} className="text-[#00BFA5]" />
              </div>
              <span className="font-medium">{role}</span>
            </div>
          )}

          {field && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-[#00BFA5]/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={16} className="text-[#00BFA5]" />
              </div>
              <span className="font-medium line-clamp-1">{field}</span>
            </div>
          )}
        </div>

        {/* Descripción mejorada */}
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* CTA más prominente */}
        <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-[#00BFA5] to-[#00E5CC] hover:from-[#00A896] hover:to-[#00BFA5] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
          <Play size={18} className="fill-white" />
          <span>Ver historia completa</span>
        </button>
      </div>

      {/* Barra superior con animación mejorada */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00BFA5] via-[#00E5CC] to-[#00BFA5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
};

export default ProfessionalCard;