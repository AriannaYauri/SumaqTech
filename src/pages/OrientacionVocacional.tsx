import React from 'react';
import { Compass, Target, TrendingUp, Users, BookOpen, Lightbulb, Quote, Star, Award } from 'lucide-react';

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
      testimonial: {
        name: 'María González',
        role: 'Desarrolladora Senior en Google',
        image: '/src/components/historias_inicio/SARA_L.jpg',
        quote: 'La programación me permitió crear soluciones que impactan a millones de personas. Cada día es una nueva aventura resolviendo problemas fascinantes.',
        experience: '8 años de experiencia'
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
      testimonial: {
        name: 'Carlos Fernández',
        role: 'Data Scientist en Microsoft',
        image: '/src/components/historias_inicio/CARLOS_F.jpg',
        quote: 'Los datos cuentan historias increíbles. Descubrir patrones ocultos y ayudar a las empresas a tomar mejores decisiones es mi pasión diaria.',
        experience: '6 años de experiencia'
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
      testimonial: {
        name: 'Juan Vargas',
        role: 'Especialista en Ciberseguridad',
        image: '/src/components/historias_inicio/JUAN_V.jpg',
        quote: 'Ser un guardián digital es emocionante. Cada día protejo a las personas y empresas de amenazas invisibles, es como ser un superhéroe de la tecnología.',
        experience: '5 años de experiencia'
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
      testimonial: {
        name: 'Julio Rodríguez',
        role: 'AI Engineer en Tesla',
        image: '/src/components/historias_inicio/JULIO_R.jpg',
        quote: 'Crear máquinas que piensan y aprenden es el futuro. Estoy construyendo tecnología que cambiará el mundo para siempre.',
        experience: '7 años de experiencia'
      }
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Orientación Vocacional
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Descubre las carreras tecnológicas más demandadas a través de las experiencias reales de profesionales exitosos que transformaron sus vidas con la tecnología.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-teal-600 mb-3">85%</div>
            <div className="text-gray-600 text-lg">de empleos requerirán habilidades digitales para 2030</div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-teal-600 mb-3">1.2M</div>
            <div className="text-gray-600 text-lg">empleos tech se crearán en Latinoamérica</div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-teal-600 mb-3">40%</div>
            <div className="text-gray-600 text-lg">mayor salario promedio en carreras STEM</div>
          </div>
        </div>

        {/* Career Paths with Testimonials */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Carreras Tecnológicas en Demanda
          </h2>
          <div className="space-y-12">
            {careerPaths.map((career, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      {career.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">{career.title}</h3>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getDemandColor(career.demand)}`}>
                          {career.demand}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{career.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-700 mb-3">Habilidades clave:</h4>
                          <div className="flex flex-wrap gap-2">
                            {career.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-3 py-1 bg-teal-100 text-teal-700 text-sm rounded-full font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <span className="text-gray-500 text-sm">Salario:</span>
                              <div className="font-semibold text-gray-800 text-lg">{career.salary}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <span className="text-gray-500 text-sm">Crecimiento:</span>
                              <div className="font-semibold text-green-600 text-lg">{career.growth}</div>
                            </div>
                          </div>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl border-l-4 border-teal-500">
                          <div className="flex items-center mb-4">
                            <img 
                              src={career.testimonial.image} 
                              alt={career.testimonial.name}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                            />
                            <div>
                              <h5 className="font-semibold text-gray-800">{career.testimonial.name}</h5>
                              <p className="text-sm text-gray-600">{career.testimonial.role}</p>
                              <p className="text-xs text-teal-600">{career.testimonial.experience}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Quote className="w-6 h-6 text-teal-500 mr-2 flex-shrink-0 mt-1" />
                            <p className="text-gray-700 italic leading-relaxed">
                              "{career.testimonial.quote}"
                            </p>
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

        {/* Inspirational Section */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-12 text-center text-white mb-16">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            ¡Tú también puedes ser parte del futuro tecnológico!
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Cada uno de estos profesionales empezó como tú, con curiosidad y ganas de aprender. 
            La tecnología no es solo para genios, es para personas apasionadas que quieren crear un mundo mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-lg">
              Realizar Test Vocacional
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-teal-600 transition-colors duration-200 text-lg">
              Ver Más Testimonios
            </button>
          </div>
        </div>

        {/* Success Stories Preview */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Historias de Éxito
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {careerPaths.map((career, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={career.testimonial.image} 
                  alt={career.testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="font-semibold text-gray-800 mb-1">{career.testimonial.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{career.testimonial.role}</p>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientacionVocacional;
