import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Sparkles, Trophy, Rocket, Heart, Zap, Target, Award, Play, Gamepad2, Crown, Flame, Shield } from 'lucide-react';

const Modulos: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

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
      emoji: '🐍',
      color: 'from-green-400 to-emerald-500',
      badge: 'Nuevo',
      progress: 0,
      xp: 100,
      difficulty: 'Fácil',
      category: 'Programación',
      powerUp: 'Super Código'
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
      emoji: '🌐',
      color: 'from-blue-400 to-cyan-500',
      badge: 'Popular',
      progress: 0,
      xp: 150,
      difficulty: 'Medio',
      category: 'Web',
      powerUp: 'Web Master'
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
      emoji: '��️',
      color: 'from-purple-400 to-violet-500',
      badge: 'Desafío',
      progress: 0,
      xp: 120,
      difficulty: 'Medio',
      category: 'Datos',
      powerUp: 'Data Ninja'
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
      emoji: '🤖',
      color: 'from-pink-400 to-rose-500',
      badge: 'Épico',
      progress: 0,
      xp: 200,
      difficulty: 'Difícil',
      category: 'IA',
      powerUp: 'AI Wizard'
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
      emoji: '🛡️',
      color: 'from-red-400 to-orange-500',
      badge: 'Pro',
      progress: 0,
      xp: 180,
      difficulty: 'Difícil',
      category: 'Seguridad',
      powerUp: 'Cyber Guardian'
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
      emoji: '📱',
      color: 'from-indigo-400 to-blue-500',
      badge: 'Trending',
      progress: 0,
      xp: 160,
      difficulty: 'Medio',
      category: 'Mobile',
      powerUp: 'App Creator'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg';
      case 'Intermedio':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg';
      case 'Avanzado':
        return 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Principiante':
        return '🌱';
      case 'Intermedio':
        return '⭐';
      case 'Avanzado':
        return '🏆';
      default:
        return '📚';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Nuevo':
        return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'Popular':
        return 'bg-gradient-to-r from-pink-400 to-rose-500';
      case 'Desafío':
        return 'bg-gradient-to-r from-purple-400 to-violet-500';
      case 'Épico':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Pro':
        return 'bg-gradient-to-r from-red-400 to-pink-500';
      case 'Trending':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'text-green-600 bg-green-100';
      case 'Medio':
        return 'text-yellow-600 bg-yellow-100';
      case 'Difícil':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredModules = selectedLevel === 'Todos' 
    ? modules 
    : modules.filter(module => module.level === selectedLevel);

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute bottom-32 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-ping delay-700 opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000 opacity-60"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-yellow-500 animate-spin mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              ¡Aventuras de Aprendizaje!
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-500 animate-spin ml-4" />
          </div>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            🚀 Descubre mundos mágicos de tecnología donde cada módulo es una nueva aventura esperándote
          </p>
          
          {/* XP Counter */}
          <div className="inline-flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border-2 border-yellow-200">
            <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span className="text-lg font-bold text-gray-700">Tu XP Total: </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              1,250 XP
            </span>
            <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />
          </div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {['Todos', 'Principiante', 'Intermedio', 'Avanzado'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-10 py-4 rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-xl font-bold text-xl ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-2xl'
                  : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 hover:text-white'
              }`}
            >
              {level === 'Todos' && '✨'} 
              {level === 'Principiante' && '🌱'} 
              {level === 'Intermedio' && '⭐'} 
              {level === 'Avanzado' && '🏆'} 
              {level}
            </button>
          ))}
        </div>

        {/* Redesigned Modules Grid - More Dynamic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredModules.map((module, index) => (
            <div 
              key={module.id} 
              className="group relative transform transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Main Card Container */}
              <div className="relative">
                {/* Floating Background Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border-4 border-transparent hover:border-yellow-300 group-hover:border-purple-300">
                  
                  {/* Animated Header with Image */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Background Image with Parallax Effect */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${module.image})` }}
                    ></div>
                    
                    {/* Animated Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-pink-600/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor(module.badge)} shadow-lg animate-bounce`}>
                        {module.badge}
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 z-20">
                      <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-red-50 transition-all transform hover:scale-110">
                        <Heart className="w-5 h-5 text-red-500 hover:fill-current" />
                      </button>
                    </div>
                    
                    {/* Large Floating Emoji */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce group-hover:animate-spin group-hover:text-9xl transition-all duration-500">
                      {module.emoji}
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all animate-pulse">
                        <Play className="w-10 h-10 text-purple-600 fill-current" />
                      </button>
                    </div>
                    
                    {/* XP Badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                        <Zap className="w-4 h-4" />
                        {module.xp} XP
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Level and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(module.level)} flex items-center gap-1`}>
                          <span className="text-sm">{getLevelIcon(module.level)}</span>
                          {module.level}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {module.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-gray-700">{module.rating}</span>
                      </div>
                    </div>
                    
                    {/* Title with Power-Up */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 mb-1">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-purple-600">{module.powerUp}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-xl">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="text-xs text-gray-500">Duración</div>
                          <div className="text-sm font-bold text-blue-700">{module.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-xl">
                        <Users className="w-4 h-4 text-green-500" />
                        <div>
                          <div className="text-xs text-gray-500">Estudiantes</div>
                          <div className="text-sm font-bold text-green-700">{module.students.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Difficulty and Progress */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(module.difficulty)}`}>
                        Dificultad: {module.difficulty}
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-orange-600">¡En llamas!</span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button className={`w-full bg-gradient-to-r ${module.color} hover:shadow-xl text-white font-bold py-3 px-6 rounded-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg border-2 border-transparent hover:border-white/30 group-hover:animate-pulse`}>
                      <Gamepad2 className="w-5 h-5" />
                      ¡Jugar Ahora!
                      <Rocket className="w-5 h-5 animate-bounce" />
                    </button>
                  </div>
                </div>
                
                {/* Floating Decorative Elements */}
                {hoveredModule === module.id && (
                  <>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-ping delay-300"></div>
                    <div className="absolute top-1/2 -left-3 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-500"></div>
                    <div className="absolute top-1/2 -right-3 w-3 h-3 bg-green-400 rounded-full animate-ping delay-700"></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-6 bg-white/90 backdrop-blur-sm rounded-full px-12 py-6 shadow-2xl border-4 border-yellow-200">
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700 mb-2">
                ¡Más de 5,000 estudiantes ya están aprendiendo!
              </div>
              <div className="text-lg text-gray-600">
                Únete a la aventura más emocionante de la tecnología 🚀
              </div>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modulos;
