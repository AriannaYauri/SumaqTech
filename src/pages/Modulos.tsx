import React from 'react';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

const Modulos: React.FC = () => {
  const modules = [
    {
      id: 1,
      title: 'Fundamentos de Programación',
      description: 'Aprende los conceptos básicos de la programación con Python',
      duration: '8 semanas',
      students: 1247,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Principiante'
    },
    {
      id: 2,
      title: 'Desarrollo Web Frontend',
      description: 'Crea páginas web interactivas con HTML, CSS y JavaScript',
      duration: '10 semanas',
      students: 892,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermedio'
    },
    {
      id: 3,
      title: 'Bases de Datos',
      description: 'Domina SQL y el diseño de bases de datos relacionales',
      duration: '6 semanas',
      students: 654,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermedio'
    },
    {
      id: 4,
      title: 'Inteligencia Artificial',
      description: 'Introducción al machine learning y redes neuronales',
      duration: '12 semanas',
      students: 523,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Avanzado'
    },
    {
      id: 5,
      title: 'Ciberseguridad',
      description: 'Protege sistemas y datos con técnicas de seguridad',
      duration: '9 semanas',
      students: 445,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Avanzado'
    },
    {
      id: 6,
      title: 'Desarrollo Mobile',
      description: 'Crea aplicaciones móviles nativas y multiplataforma',
      duration: '11 semanas',
      students: 678,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermedio'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-100 text-green-800';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Módulos de Aprendizaje
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestros módulos educativos diseñados para llevarte desde los fundamentos hasta conceptos avanzados en tecnología.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors">
            Todos
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
            Principiante
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
            Intermedio
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
            Avanzado
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <img
                src={module.image}
                alt={module.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                    {module.level}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{module.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {module.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {module.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{module.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Comenzar Módulo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modulos;