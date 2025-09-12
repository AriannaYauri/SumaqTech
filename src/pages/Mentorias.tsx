import React from 'react';
import { Users, Star, Calendar, MessageCircle, Award, Clock } from 'lucide-react';

const Mentorias: React.FC = () => {
  const mentors = [
    {
      id: 1,
      name: 'Belen González',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'AWS'],
      rating: 4.9,
      sessions: 127,
      price: 50,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: 'Disponible'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      title: 'Data Scientist',
      company: 'Microsoft',
      expertise: ['Python', 'Machine Learning', 'SQL'],
      rating: 4.8,
      sessions: 89,
      price: 45,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: 'Ocupado'
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      title: 'UX/UI Designer',
      company: 'Airbnb',
      expertise: ['Figma', 'User Research', 'Prototyping'],
      rating: 5.0,
      sessions: 156,
      price: 40,
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: 'Disponible'
    },
    {
      id: 4,
      name: 'Diego Torres',
      title: 'Cybersecurity Expert',
      company: 'Cisco',
      expertise: ['Ethical Hacking', 'Network Security', 'CISSP'],
      rating: 4.7,
      sessions: 73,
      price: 55,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      availability: 'Disponible'
    }
  ];

  const testimonials = [
    {
      name: 'Laura Pérez',
      role: 'Estudiante de Ingeniería',
      content: 'Gracias a mi mentor pude conseguir mi primera práctica profesional. Su guía fue fundamental.',
      rating: 5
    },
    {
      name: 'Andrés Silva',
      role: 'Desarrollador Junior',
      content: 'Las sesiones de mentoría me ayudaron a crecer profesionalmente y ganar confianza.',
      rating: 5
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    return availability === 'Disponible' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Mentorías Personalizadas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecta con profesionales expertos que te guiarán en tu desarrollo tecnológico y crecimiento profesional.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mentores Certificados</h3>
            <p className="text-gray-600 text-sm">Profesionales con experiencia comprobada en las mejores empresas tech.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Horarios Flexibles</h3>
            <p className="text-gray-600 text-sm">Agenda sesiones que se adapten a tu horario de estudio.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Seguimiento Continuo</h3>
            <p className="text-gray-600 text-sm">Apoyo constante en tu proceso de aprendizaje y desarrollo.</p>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Nuestros Mentores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                <div className="text-center mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                  />
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(mentor.availability)} mb-2`}>
                    {mentor.availability}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                  <p className="text-sm text-teal-600 font-medium">{mentor.company}</p>
                </div>
                
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{mentor.rating}</span>
                  <span className="text-sm text-gray-500">({mentor.sessions} sesiones)</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-teal-600 mb-2">
                    S/. {mentor.price} /hora
                  </div>
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Agendar Sesión
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Lo que dicen nuestros estudiantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-center text-white">
          <Clock className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            ¿Listo para acelerar tu carrera?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Agenda una sesión gratuita de 30 minutos con uno de nuestros mentores y descubre cómo podemos ayudarte.
          </p>
          <button className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Sesión Gratuita
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentorias;