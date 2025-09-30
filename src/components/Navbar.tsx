import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
  { name: 'Inicio', path: '/' },
  { name: 'Módulos', path: '/modulos' },
  { name: 'Orientación Vocacional', path: '/orientacion-vocacional' },
  { name: 'Test Vocacional', path: '/test-vocacional' },
  { name: 'Mentorías', path: '/mentorias' },
  { name: 'Foro', path: '/foro' },
  { name: 'Nosotros', path: '/nosotros' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SumaqTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-teal-600 ${
                  location.pathname === item.path
                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons, ACTUALIZACIÓN PARA DIFERENCIACIÓN LOGIN Y SIGNUP */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth/ingresa"
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 border border-gray-300 px-4 py-2 rounded-lg hover:border-teal-600"
            >
              Ingresa
            </Link>
            <Link
              to="/auth/registrate"
              className="text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 px-4 py-2 rounded-lg"
            >
              Registrate
            </Link>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-600 focus:outline-none focus:text-teal-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/ingresa"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-teal-600"
                >
                  Ingresa
                </Link>
                <Link
                  to="/registrate"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg"
                >
                  Registrate
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;