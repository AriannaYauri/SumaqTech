import React from 'react';

interface Mentor {
  id: number;
  name: string;
  area: string;
  description: string;
  image: string;
  available: boolean;
}

const mentores: Mentor[] = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    area: 'Ingeniería de Software',
    description: 'Especialista en desarrollo de aplicaciones web y móviles con más de 10 años de experiencia.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 2,
    name: 'Ana Rodríguez',
    area: 'Ciencia de Datos',
    description: 'Experta en machine learning y análisis de datos para soluciones empresariales inteligentes.',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 3,
    name: 'Luis Fernández',
    area: 'Mecatrónica',
    description: 'Ingeniero especializado en sistemas automatizados y robótica industrial.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: false,
  },
  {
    id: 4,
    name: 'María González',
    area: 'Ingeniería Ambiental',
    description: 'Profesional enfocada en sostenibilidad y tecnologías verdes para el futuro.',
    image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 5,
    name: 'Roberto Silva',
    area: 'Física',
    description: 'Investigador en física aplicada y tecnologías cuánticas con amplia trayectoria académica.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: 6,
    name: 'Sofía Martínez',
    area: 'Matemáticas',
    description: 'Matemática aplicada especializada en modelado y optimización de sistemas complejos.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: false,
  },
];

const MentoresSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Título y Subtítulo */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Mentores
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce al equipo de expertos que pueden guiarte en tu camino
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mentores.map((mentor, index) => (
            <div
              key={mentor.id}
              className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-6 transition-all duration-300 animate-fadeInUp"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Foto del Mentor */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-teal-100 shadow-md"
                  />
                  {/* Indicador de disponibilidad en la foto */}
                  <div
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      mentor.available ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Nombre */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-2">
                {mentor.name}
              </h3>

              {/* Área / Especialidad */}
              <div className="text-center mb-3">
                <span className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-sm font-semibold px-4 py-1.5 rounded-full">
                  {mentor.area}
                </span>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 text-sm md:text-base text-center mb-4 leading-relaxed min-h-[3rem]">
                {mentor.description}
              </p>

              {/* Indicador de Disponibilidad */}
              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
                    mentor.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {mentor.available ? 'Disponible' : 'Ocupado'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentoresSection;

