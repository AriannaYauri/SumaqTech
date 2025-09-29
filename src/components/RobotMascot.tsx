import React from 'react';

const RobotMascot: React.FC = () => (
  <div className="flex flex-col items-center">
    <svg
      width="260"
      height="400"
      viewBox="0 0 260 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      {/* Fondo de cabeza */}
      <ellipse cx="130" cy="110" rx="100" ry="80" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="5" />
      {/* Antena */}
      <rect x="122" y="30" width="16" height="40" rx="8" fill="#38BDF8" />
      <circle cx="130" cy="30" r="10" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="3" />
      {/* Orejas */}
      <ellipse cx="40" cy="110" rx="18" ry="28" fill="#38BDF8" />
      <ellipse cx="220" cy="110" rx="18" ry="28" fill="#38BDF8" />
      {/* Cara */}
      <ellipse cx="130" cy="120" rx="65" ry="50" fill="#0EA5E9" />
      {/* Ojos */}
      <ellipse cx="105" cy="120" rx="15" ry="15" fill="#38BDF8" />
      <ellipse cx="155" cy="120" rx="15" ry="15" fill="#38BDF8" />
      {/* Brillo ojos */}
      <ellipse cx="110" cy="115" rx="4" ry="4" fill="#fff" opacity="0.7" />
      <ellipse cx="160" cy="115" rx="4" ry="4" fill="#fff" opacity="0.7" />
      {/* Boca */}
      <rect x="120" y="140" width="20" height="8" rx="4" fill="#38BDF8" />
      {/* Cuerpo */}
      <rect x="80" y="190" width="100" height="80" rx="40" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="4" />
      {/* Detalles cuerpo */}
      <path d="M130 230 Q120 250 130 270 Q140 250 130 230" fill="#38BDF8" opacity="0.2" />
      {/* Brazos */}
      <path d="M80 220 Q60 260 110 270" stroke="#0EA5E9" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M180 220 Q200 260 150 270" stroke="#0EA5E9" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* Manos formando corazón */}
      <ellipse cx="115" cy="285" rx="18" ry="18" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="3" />
      <ellipse cx="145" cy="285" rx="18" ry="18" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="3" />
      <path
        d="M130 290
          Q125 285 115 285
          Q110 285 115 295
          Q120 305 130 300
          Q140 305 145 295
          Q150 285 145 285
          Q135 285 130 290"
        fill="#38BDF8"
        opacity="0.8"
      />
      {/* Piernas */}
      <rect x="90" y="270" width="30" height="80" rx="15" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="4" />
      <rect x="140" y="270" width="30" height="80" rx="15" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="4" />
      {/* Detalles piernas */}
      <ellipse cx="105" cy="340" rx="12" ry="6" fill="#38BDF8" opacity="0.5" />
      <ellipse cx="155" cy="340" rx="12" ry="6" fill="#38BDF8" opacity="0.5" />
      {/* Pies */}
      <ellipse cx="105" cy="370" rx="20" ry="10" fill="#38BDF8" />
      <ellipse cx="155" cy="370" rx="20" ry="10" fill="#38BDF8" />
    </svg>
    <span className="mt-6 text-sky-600 font-bold text-2xl">¡Hola! Soy SumaqBot</span>
  </div>
);

export default RobotMascot;