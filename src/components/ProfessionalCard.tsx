import { Play, Briefcase, GraduationCap } from 'lucide-react';
import React from 'react';

interface ProfessionalCardProps {
  name: string;
  role?: string;
  field?: string;
  photoUrl: string;   // Foto del profesional
  videoSrc: string;   // Video local
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
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onClick={onClick}
    >
      {/* Video local */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#00BFA5] to-[#00897B]">
        <video
          src={videoSrc}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          muted
          loop
          autoPlay
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play size={32} className="text-[#00BFA5] fill-[#00BFA5]" />
          </div>
        </div>
      </div>

      {/* Foto circular */}
      <div className="absolute top-4 left-4 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Información */}
      <div className="p-6 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00BFA5] transition-colors duration-300">
          {name}
        </h3>

        {role && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Briefcase size={16} className="text-[#00BFA5]" />
            <span>{role}</span>
          </div>
        )}

        {field && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <GraduationCap size={16} className="text-[#00BFA5]" />
            <span>{field}</span>
          </div>
        )}

        {description && (
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 text-[#00BFA5] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Ver experiencia</span>
          <Play size={16} className="fill-[#00BFA5]" />
        </div>
      </div>

      {/* Barra superior animada */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BFA5] via-[#00E5CC] to-[#00BFA5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};
