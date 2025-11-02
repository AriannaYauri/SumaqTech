import React from 'react';
import { Compass, Target, TrendingUp, BookOpen, Lightbulb, Quote, Award, ArrowRight, Briefcase } from 'lucide-react';

const OrientacionVocacional: React.FC = () => {
  const careerPaths = [
    {
      title: 'Desarrollo de Software',
      description: 'Crear aplicaciones, sitios web y sistemas que transformen la forma en que las personas interactúan con la tecnología.',
      skills: ['Programación', 'Lógica', 'Resolución de problemas'],
      demand: 'Alta',
      salary: 'S/. 4,000 - S/. 12,000',
      growth: '+15% anual',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-600 to-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      accentColor: 'bg-blue-100',
      testimonial: {
        name: 'María González',
        role: 'Desarrolladora Senior en Google',
        image: '/src/components/historias_inicio/SARA_L.jpg',
        quote: 'La programación me permitió crear soluciones que impactan a millones de personas. Cada día es una nueva aventura resolviendo problemas fascinantes.',
        experience: '8 años de experiencia',
        journey: 'Empecé programando juegos simples a los 14 años. Hoy trabajo en Google creando productos que usan millones de personas.'
      }
    },
    {
      title: 'Ciencia de Datos',
      description: 'Analizar grandes cantidades de información para extraer insights valiosos que guíen decisiones estratégicas.',
      skills: ['Estadística', 'Python/R', 'Machine Learning'],
      demand: 'Muy Alta',
      salary: 'S/. 5,000 - S/. 15,000',
      growth: '+22% anual',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-indigo-600 to-indigo-800',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      accentColor: 'bg-indigo-100',
      testimonial: {
        name: 'Carlos Fernández',
        role: 'Data Scientist en Microsoft',
        image: '/src/components/historias_inicio/CARLOS_F.jpg',
        quote: 'Los datos cuentan historias increíbles. Descubrir patrones ocultos y ayudar a las empresas a tomar mejores decisiones es mi pasión diaria.',
        experience: '6 años de experiencia',
        journey: 'Me encantaban las matemáticas en el colegio. Descubrí que podía combinarlas con tecnología para resolver problemas reales.'
      }
    },
    {
      title: 'Ciberseguridad',
      description: 'Proteger sistemas, redes y datos contra amenazas cibernéticas en un mundo cada vez más digitalizado.',
      skills: ['Seguridad de redes', 'Análisis de riesgos', 'Ethical hacking'],
      demand: 'Muy Alta',
      salary: 'S/. 4,500 - S/. 14,000',
      growth: '+18% anual',
      icon: <Target className="w-6 h-6" />,
      color: 'from-slate-600 to-slate-800',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      accentColor: 'bg-slate-100',
      testimonial: {
        name: 'Juan Vargas',
        role: 'Especialista en Ciberseguridad',
        image: '/src/components/historias_inicio/JUAN_V.jpg',
        quote: 'Ser un guardián digital es emocionante. Cada día protejo a las personas y empresas de amenazas invisibles, es como ser un superhéroe de la tecnología.',
        experience: '5 años de experiencia',
        journey: 'Siempre me gustó descubrir cómo funcionaban las cosas y encontrar vulnerabilidades. Ahora protejo lo que más importa.'
      }
    },
    {
      title: 'Inteligencia Artificial',
      description: 'Desarrollar sistemas inteligentes que pueden aprender, razonar y automatizar tareas complejas.',
      skills: ['Machine Learning', 'Deep Learning', 'Matemáticas'],
      demand: 'Extrema',
      salary: 'S/. 6,000 - S/. 18,000',
      growth: '+25% anual',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-teal-600 to-teal-800',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      accentColor: 'bg-teal-100',
      testimonial: {
        name: 'Julio Rodríguez',
        role: 'AI Engineer en Tesla',
        image: '/src/components/historias_inicio/JULIO_R.jpg',
        quote: 'Crear máquinas que piensan y aprenden es el futuro. Estoy construyendo tecnología que cambiará el mundo para siempre.',
        experience: '7 años de experiencia',
        journey: 'Me fascinaban los robots desde pequeño. Ahora trabajo creando inteligencia artificial para autos autónomos.'
      }
    }
  ];


  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-lg mb-6 shadow-lg">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Orientación Vocacional
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre las carreras tecnológicas más demandadas a través de las experiencias reales 
            de profesionales exitosos en la industria
          </p>
        </div>

        {/* Career Paths Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Carreras Tecnológicas en Demanda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora las diferentes trayectorias profesionales disponibles y conoce a quienes ya han recorrido estos caminos
            </p>
          </div>

          {/* Career Cards */}
          <div className="space-y-12">
            {careerPaths.map((career, index) => (
              <div key={index} className="relative">
                {/* Path Connector */}
                {index < careerPaths.length - 1 && (
                  <div className="hidden lg:block absolute left-8 top-full h-12 w-0.5 bg-gray-300" style={{ marginTop: '1.5rem' }}>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Main Card */}
                <div className={`bg-white rounded-lg shadow-md border-l-4 ${career.borderColor} hover:shadow-lg transition-shadow duration-300 overflow-hidden`}>
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* Career Header Section */}
                    <div className={`bg-gradient-to-br ${career.color} p-8 text-white`}>
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                            {career.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{career.title}</h3>
                          <span className="inline-block px-3 py-1 bg-white/20 rounded-md text-xs font-semibold backdrop-blur-sm">
                            {career.demand} demanda
                          </span>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed flex-grow">{career.description}</p>
                      </div>
                    </div>

                    {/* Testimonial Section */}
                    <div className={`${career.bgColor} p-8 border-r border-gray-200`}>
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <img 
                            src={career.testimonial.image} 
                            alt={career.testimonial.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                          />
                          <h4 className="text-xl font-bold text-gray-900 text-center mb-1">{career.testimonial.name}</h4>
                          <p className="text-sm text-gray-600 text-center mb-2">{career.testimonial.role}</p>
                          <p className="text-xs text-gray-500 text-center font-medium">{career.testimonial.experience}</p>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">Su Trayectoria</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{career.testimonial.journey}</p>
                          </div>
                          
                          <div className="relative">
                            <Quote className="w-5 h-5 text-gray-400 absolute top-0 left-0" />
                            <p className="text-sm text-gray-700 italic leading-relaxed pl-6">
                              "{career.testimonial.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Details Section */}
                    <div className="p-8">
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-600" />
                            Habilidades Requeridas
                          </h5>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {career.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className={`px-3 py-1.5 ${career.accentColor} text-gray-800 text-xs rounded font-medium`}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4 mt-auto">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-xs text-gray-500 font-medium mb-2">Rango Salarial</p>
                            <p className="text-lg font-bold text-gray-900">{career.salary}</p>
                          </div>
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Crecimiento del Mercado
                            </p>
                            <p className="text-lg font-bold text-green-700">{career.growth}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900 rounded-lg p-12 md:p-16 text-center text-white mb-16 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <Award className="w-12 h-12 mx-auto mb-6 text-gray-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra tu Camino Profesional
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Cada uno de estos profesionales comenzó con determinación y pasión por la tecnología. 
              Descubre cuál es la trayectoria que mejor se adapta a tus intereses y habilidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Realizar Test Vocacional
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-200">
                Explorar Más Carreras
              </button>
            </div>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Profesionales de Referencia
            </h3>
            <p className="text-gray-600">
              Conoce a los expertos que representan cada especialización
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((career, index) => (
              <div key={index} className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border ${career.borderColor}`}>
                <img 
                  src={career.testimonial.image} 
                  alt={career.testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
                />
                <h4 className="font-semibold text-gray-900 text-center mb-1">{career.testimonial.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-3">{career.testimonial.role}</p>
                <p className="text-xs text-gray-500 text-center font-medium">{career.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientacionVocacional;
