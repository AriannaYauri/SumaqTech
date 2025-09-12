import React from 'react';
import { Heart, Target, Users, Award, Lightbulb, Globe } from 'lucide-react';

const Nosotros: React.FC = () => {
  const team = [
    {
      name: 'Alejandra Ramírez',
      role: 'Fundadora & CEO',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Ingeniera de Software con pasión por la educación tecnológica'
    },
    {
      name: 'Henrry Silva',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Experto en desarrollo de plataformas educativas y arquitectura de software'
    },
    {
      name: 'Camila Torres',
      role: 'Head of Content',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Especialista en diseño curricular y metodologías de aprendizaje'
    },
    {
      name: 'Diego Mendoza',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Constructor de comunidades tech y mentor de estudiantes'
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Pasión por la Educación',
      description: 'Creemos que la educación es el motor del cambio y el desarrollo personal.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Enfoque Práctico',
      description: 'Nuestro contenido está diseñado para aplicarse directamente en el mundo real.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Comunidad Inclusiva',
      description: 'Fomentamos un ambiente donde todos pueden aprender y crecer juntos.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovación Continua',
      description: 'Siempre estamos explorando nuevas formas de mejorar el aprendizaje.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Estudiantes activos' },
    { number: '500+', label: 'Mentorías realizadas' },
    { number: '15+', label: 'Módulos disponibles' },
    { number: '95%', label: 'Tasa de satisfacción' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Sobre <span className="text-teal-600">SumaqTech</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Somos una plataforma educativa e innovadora gratuita creada por estudiantes para estudiantes, 
            con la misión de democratizar el acceso a la educación tecnológica de calidad.
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Misión</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Acercar el mundo de la ciencia, la tecnología, la ingeniería y las matemáticas (STEM) 
                a estudiantes de secundaria y preuniversitarios en América Latina.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Queremos ayudarte a descubrir tus intereses, conocer carreras y tomar decisiones 
                informadas sobre tu futuro profesional en el mundo tecnológico.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Estudiantes aprendiendo tecnología"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
                <Globe className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nuestro Impacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Nuestra Historia
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              SumaqTech nació en 2023 de la frustración de un grupo de estudiantes universitarios que 
              notaron la brecha entre lo que se enseña en las escuelas y lo que realmente necesitas 
              saber para triunfar en el mundo tecnológico.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Como estudiantes que habíamos pasado por el mismo proceso de descubrimiento y decisión 
              vocacional, entendíamos perfectamente los desafíos: falta de información actualizada, 
              contenido desconectado de la realidad laboral, y sobre todo, la ausencia de mentores 
              que hubieran recorrido el mismo camino.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Decidimos crear la plataforma que nos hubiera gustado tener cuando estábamos en su lugar. 
              Una comunidad donde los estudiantes puedan aprender tecnología de forma práctica, 
              conectarse con mentores reales, y tomar decisiones informadas sobre su futuro profesional.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Únete a Nuestra Misión
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ayúdanos a transformar la educación tecnológica y crear oportunidades para la próxima generación.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Únete como Estudiante
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition-colors duration-200">
              Conviértete en Mentor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;