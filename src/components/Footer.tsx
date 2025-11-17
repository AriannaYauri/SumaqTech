// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

// Importa SVG como URL
import Linkedin from "./iconos/linkedin.svg";
import IG from "./iconos/ig.svg";
import Github from "./iconos/github.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between md:items-start">
        {/* Logo y descripción */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-white mb-2">SumaqTech</h3>
          <p className="text-gray-400 max-w-xs">
            Inspirando a jóvenes a descubrir la ciencia, tecnología, ingeniería y matemáticas.
          </p>
        </div>

        {/* Enlaces */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <div>
            <h4 className="font-semibold text-white mb-2">Explorar</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link to="/" className="hover:text-[#00BFA5]">Inicio</Link></li>
              <li><Link to="/orientacion-vocacional" className="hover:text-[#00BFA5]">Inspírate</Link></li>
              <li><Link to="/modulos" className="hover:text-[#00BFA5]">Cursos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Comunidad</h4>
            <ul className="text-gray-400 space-y-1">
              {/* Mentorías link hidden per user request (kept for later) */}
              {/* <li><Link to="/mentorias" className="hover:text-[#00BFA5]">Mentorías</Link></li> */}
              <li><Link to="/Mentorias" className="hover:text-[#00BFA5]">Mentorías</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Contacto</h4>
            <ul className="text-gray-400 space-y-1">
              <li>Email: contacto@sumaqtech.com</li>
              <li>Tel: +51 987 654 321</li>
              <li className="flex items-center gap-3 mt-2">
                {/* Iconos de redes sociales */}
                <a href="#" className="hover:text-[#00BFA5]">
                  <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-[#00BFA5]">
                  <img src={IG} alt="Instagram" className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-[#00BFA5]">
                  <img src={Github} alt="GitHub" className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8">
        © 2025 SumaqTech. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
