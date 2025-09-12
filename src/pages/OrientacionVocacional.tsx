import React from 'react';
import { Compass, Target, TrendingUp, Users, BookOpen, Lightbulb } from 'lucide-react';

const OrientacionVocacional: React.FC = () => {
  const careerPaths = [
    {
      title: 'Desarrollo de Software',
      description: 'Crear aplicaciones, sitios web y sistemas que transformen la forma en que las personas interactúan con la tecnología.',
      skills: ['Programación', 'Lógica', 'Resolución de problemas'],
      demand: 'Alta',
      salary: 'S/. 4,000 - S/. 12,000',
      growth: '+15% anual',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: 'Ciencia de Datos',
      description: 'Analizar grandes cantidades de información para extraer insights valiosos que guíen decisiones estratégicas.',
      skills: ['Estadística', 'Python/R', 'Machine Learning'],
      demand: 'Muy Alta',
      salary: 'S/. 5,000 - S/. 15,000',
      growth: '+22% anual',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Ciberseguridad',
      description: 'Proteger sistemas, redes y datos contra amenazas cibernéticas en un mundo cada vez más digitalizado.',
      skills: ['Seguridad de redes', 'Análisis de riesgos', 'Ethical hacking'],
      demand: 'Muy Alta',
      salary: 'S/. 4,500 - S/. 14,000',
      growth: '+18% anual',
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Inteligencia Artificial',
      description: 'Desarrollar sistemas inteligentes que pueden aprender, razonar y automatizar tareas complejas.',
      skills: ['Machine Learning', 'Deep Learning', 'Matemáticas'],
      demand: 'Extrema',
      salary: 'S/. 6,000 - S/. 18,000',
      growth: '+25% anual',
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Alta':
        return 'bg-green-100 text-green-800';
      case 'Muy Alta':
        return 'bg-blue-100 text-blue-800';
      case 'Extrema':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Compass className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Orientación Vocacional
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las carreras tecnológicas más demandadas y encuentra tu camino hacia un futuro exitoso en el mundo digital.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">85%</div>
            <div className="text-gray-600">de empleos requerirán habilidades digitales para 2030</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">1.2M</div>
            <div className="text-gray-600">empleos tech se crearán en Latinoamérica</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">40%</div>
            <div className="text-gray-600">mayor salario promedio en carreras STEM</div>
          </div>
        </div>

        {/* Career Paths */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Carreras Tecnológicas en Demanda
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {careerPaths.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {career.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{career.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDemandColor(career.demand)}`}>
                        {career.demand}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{career.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Habilidades clave:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {career.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Salario:</span>
                          <div className="font-medium text-gray-800">{career.salary}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Crecimiento:</span>
                          <div className="font-medium text-green-600">{career.growth}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-center text-white">
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            ¿No estás seguro de qué carrera elegir?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Nuestro test vocacional te ayudará a identificar tus fortalezas, intereses y la carrera tecnológica que mejor se adapte a tu perfil.
          </p>
          <button className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Realizar Test Vocacional
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrientacionVocacional;