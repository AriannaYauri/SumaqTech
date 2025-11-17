import React from 'react';

// Paleta cohesiva basada en tu color principal #00BFA5
const brandColors = [
  'from-[#E0F7F4] to-[#B3EDE5]', // Turquesa suave (tu color principal)
  'from-[#FFE8D9] to-[#FFD4B8]', // Coral/Durazno (cálido complementario)
  'from-[#E8F4FF] to-[#C5E3FF]', // Azul cielo (análogo frío)
  'from-[#FFF3E0] to-[#FFE0B2]', // Ámbar suave (cálido acento)
  'from-[#F3E5F5] to-[#E1BEE7]', // Lavanda (acento neutro)
  'from-[#E8F5E9] to-[#C8E6C9]', // Verde menta (análogo cálido)
];

// Versión original con colores genéricos (para comparar):
// const pastelColors = [
//   'from-[#FFE7E7] to-[#FFDADA]', 
//   'from-[#FFF6DA] to-[#FFE8B5]', 
//   'from-[#E7F9FF] to-[#CFF1FF]',
//   'from-[#EAF6E7] to-[#D5EDCF]', 
//   'from-[#F3E8FF] to-[#E8D4FF]', 
// ];

interface CareerCardProps {
  id: string;
  name: string;
  icon?: string;
  cta?: string;
  description?: string;
  onClick: () => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  id,
  name,
  icon,
  cta,
  description,
  onClick
}) => {
  const paletteIndex = Math.abs(id.charCodeAt(0) % brandColors.length);
  const bgColor = brandColors[paletteIndex];

  return (
    <div
      className="group relative rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer
                 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-500 overflow-hidden"
      onClick={onClick}
    >
      {/* Fondo pastel dinámico */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-60 group-hover:opacity-80 
                    transition-opacity duration-500 pointer-events-none rounded-2xl`}
      />

      {/* Icono */}
      <div className="text-5xl mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-500">
        {icon || '🎓'}
      </div>

      <h3 className="text-xl font-bold text-gray-900 text-center relative z-10">{name}</h3>

      {cta && (
        <div className="mt-2 relative z-10">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-[#00BFA5] font-semibold text-sm
                        px-4 py-1.5 rounded-full shadow-sm
                        transform translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100
                        group-hover:shadow-md group-hover:bg-white
                        transition-all duration-500">
            {cta}
          </span>
        </div>
      )}

      {description && (
        <p className="text-gray-600 text-sm mt-2 text-center relative z-10">{description}</p>
      )}

      {/* Botón "Conocer más" */}
      <button 
        className="mt-4 px-4 py-2 bg-[#00BFA5] hover:bg-[#00A896] text-white text-sm font-semibold 
                   rounded-full shadow-md hover:shadow-lg relative z-10
                   transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-500"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Conocer más →
      </button>
    </div>
  );
};

export default CareerCard;