import React from 'react';

interface CareerCardProps {
  id: string;
  name: string;
  icon?: string;
  cta?: string;          // mensaje llamativo
  description?: string;
  onClick: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({ id, name, icon, cta, description, onClick }) => {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer
                 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-500
                 overflow-hidden"
      onClick={onClick}
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] to-[#00897B] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
      
      {/* Icono */}
      <div className="text-5xl mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-500">{icon || '🎓'}</div>
      
      {/* Nombre */}
      <h3 className="text-xl font-bold text-gray-900 text-center relative z-10">{name}</h3>
      
      {/* CTA animado */}
      {cta && (
        <p className="text-[#00BFA5] font-semibold text-center mt-2 relative z-10
                      transform translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-500">
          {cta}
        </p>
      )}
      
      {/* Descripción */}
      {description && <p className="text-gray-500 text-sm mt-1 text-center relative z-10">{description}</p>}
      
      {/* Línea decorativa animada */}
      <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-[#00BFA5] via-[#00E5CC] to-[#00BFA5] 
                      group-hover:w-3/4 transition-all duration-500 transform -translate-x-1/2"></div>
    </div>
  );
};
