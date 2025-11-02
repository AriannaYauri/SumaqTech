import React, { useState } from 'react';
import { Clock, Users, Star, BookOpen, Play } from 'lucide-react';

const Modulos: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  const modules = [
    {
      id: 1,
      title: 'Fundamentos de Programación',
      description: 'Aprende los conceptos básicos de la programación con Python',
      duration: '8 semanas',
      students: 1247,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Principiante',
      color: 'bg-green-600 hover:bg-green-700',
      badge: 'Nuevo',
      difficulty: 'Fácil',
      category: 'Programación'
    },
    {
      id: 2,
      title: 'Desarrollo Web Frontend',
      description: 'Crea páginas web interactivas con HTML, CSS y JavaScript',
      duration: '10 semanas',
      students: 892,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermedio',
      color: 'bg-blue-600 hover:bg-blue-700',
      badge: 'Popular',
      difficulty: 'Medio',
      category: 'Web'
    },
    {
      id: 3,
      title: 'Bases de Datos',
      description: 'Domina SQL y el diseño de bases de datos relacionales',
      duration: '6 semanas',
      students: 654,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermedio',
      color: 'bg-purple-600 hover:bg-purple-700',
      badge: 'Desafío',
      difficulty: 'Medio',
      category: 'Datos'
    },
    {
      id: 4,
      title: 'Inteligencia Artificial',
      description: 'Introducción al machine learning y redes neuronales',
      duration: '12 semanas',
      students: 523,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Avanzado',
      color: 'bg-pink-600 hover:bg-pink-700',
      badge: 'Destacado',
      difficulty: 'Difícil',
      category: 'IA'
    },
    {
      id: 5,
      title: 'Ciberseguridad',
      description: 'Protege sistemas y datos con técnicas de seguridad',
      duration: '9 semanas',
      students: 445,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Avanzado',
      color: 'bg-red-600 hover:bg-red-700',
      badge: 'Pro',
      difficulty: 'Difícil',
      category: 'Seguridad'
    },
    {
      id: 6,
      title: 'Desarrollo Mobile',
      description: 'Crea aplicaciones móviles nativas y multiplataforma',
      duration: '11 semanas',
      students: 678,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermedio',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      badge: 'Trending',
      difficulty: 'Medio',
      category: 'Mobile'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-100 text-green-700';
      case 'Intermedio':
        return 'bg-blue-100 text-blue-700';
      case 'Avanzado':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Nuevo':
        return 'bg-green-500';
      case 'Popular':
        return 'bg-pink-500';
      case 'Desafío':
        return 'bg-purple-500';
      case 'Destacado':
        return 'bg-yellow-500';
      case 'Pro':
        return 'bg-red-500';
      case 'Trending':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'text-green-700 bg-green-50';
      case 'Medio':
        return 'text-yellow-700 bg-yellow-50';
      case 'Difícil':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const filteredModules = selectedLevel === 'Todos' 
    ? modules 
    : modules.filter(module => module.level === selectedLevel);

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-gray-700" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Módulos de Aprendizaje
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección completa de cursos y elige el camino de aprendizaje ideal para ti
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Todos', 'Principiante', 'Intermedio', 'Avanzado'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-2.5 rounded-lg transition-all font-medium ${
                selectedLevel === level
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <div 
              key={module.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 group"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${module.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(module.badge)}`}>
                    {module.badge}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{module.rating}</span>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-gray-800 fill-current" />
                  </button>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                {/* Level and Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getLevelColor(module.level)}`}>
                    {module.level}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {module.category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {module.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {module.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{module.students.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Difficulty */}
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${getDifficultyColor(module.difficulty)}`}>
                    Dificultad: {module.difficulty}
                  </span>
                </div>
                
                {/* Action Button */}
                <button className={`w-full ${module.color} text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2`}>
                  <Play className="w-4 h-4" />
                  Comenzar Curso
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white rounded-xl px-8 py-6 shadow-sm border border-gray-200">
            <p className="text-lg font-semibold text-gray-900 mb-1">
              Más de 5,000 estudiantes aprendiendo
            </p>
            <p className="text-sm text-gray-600">
              Únete a nuestra comunidad educativa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modulos;
