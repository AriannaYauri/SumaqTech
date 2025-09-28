import React from 'react';

const RobotMascot: React.FC = () => (
  <div className="flex flex-col items-center">
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Cabeza */}
      <rect x="40" y="40" width="100" height="80" rx="30" fill="#A7F3D0" stroke="#14B8A6" strokeWidth="4" />
      {/* Antena */}
      <rect x="87" y="20" width="6" height="20" rx="3" fill="#14B8A6" />
      <circle cx="90" cy="20" r="6" fill="#FDE68A" stroke="#F59E42" strokeWidth="2" />
      {/* Ojos grandes y amigables */}
      <ellipse cx="70" cy="80" rx="12" ry="14" fill="#fff" />
      <ellipse cx="110" cy="80" rx="12" ry="14" fill="#fff" />
      <circle cx="70" cy="82" r="6" fill="#14B8A6" />
      <circle cx="110" cy="82" r="6" fill="#14B8A6" />
      {/* Brillo en los ojos */}
      <circle cx="73" cy="79" r="2" fill="#fff" />
      <circle cx="113" cy="79" r="2" fill="#fff" />
      {/* Sonrisa amigable */}
      <path d="M75 105 Q90 120 105 105" stroke="#14B8A6" strokeWidth="3" fill="none" />
      {/* Mejillas rosadas */}
      <ellipse cx="60" cy="95" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
      <ellipse cx="120" cy="95" rx="5" ry="3" fill="#FCA5A5" opacity="0.7" />
      {/* Cuerpo simple y redondeado */}
      <rect x="65" y="120" width="50" height="30" rx="15" fill="#A7F3D0" stroke="#14B8A6" strokeWidth="3" />
      {/* Brazos */}
      <rect x="30" y="110" width="20" height="10" rx="5" fill="#A7F3D0" stroke="#14B8A6" strokeWidth="2" />
      <rect x="130" y="110" width="20" height="10" rx="5" fill="#A7F3D0" stroke="#14B8A6" strokeWidth="2" />
      {/* Manos redondas */}
      <circle cx="40" cy="115" r="7" fill="#FDE68A" stroke="#F59E42" strokeWidth="2" />
      <circle cx="140" cy="115" r="7" fill="#FDE68A" stroke="#F59E42" strokeWidth="2" />
    </svg>
    <span className="mt-4 text-teal-600 font-bold text-lg">¡Hola! Soy SumaqBot 🤖</span>
  </div>
);

export default RobotMascot;