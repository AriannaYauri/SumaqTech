import React, { useState } from 'react';
import { CareerCard } from '../components/CareerCard';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { VideoModal } from '../components/VideoModal';
import IntroCarousel from '../components/IntroCarousel';

interface Professional {
  id: string;
  name: string;
  role: string;
  field: string;
  image: string;    // ruta en /public/images/
  videoSrc: string; // ruta en /public/videos/
  bio: string;
}

interface Category {
  id: string;
  name: string;
  cta?: string;
  description?: string;
  icon?: string;
  professionals: Professional[];
}

const categories: Category[] = [
  {
    id: 'telecom',
    name: 'Ingeniería de Telecomunicaciones',
    cta: '¡Conecta el mundo con la tecnología!',
    description:
      'La Ingeniería de Telecomunicaciones abarca el diseño, implementación y gestión de sistemas que permiten la comunicación de voz, datos e información a nivel global. Aprende sobre redes, transmisión de datos, telefonía, internet, radiofrecuencia y tecnologías emergentes, preparándote para conectar personas y dispositivos en un mundo interconectado.',
    icon: '📡',
    professionals: [
      {
        id: '1',
        name: 'Lita Diaz',
        role: 'Project Manager',
        field: 'Ingeniería de Telecomunicaciones',
        image: 'src/components/profesionales/fotos/lita_Diaz.jpg',
        videoSrc: '/videos/lita_diaz.mp4',
        bio: 'Lita Diaz es una experimentada Project Manager en telecomunicaciones, liderando proyectos innovadores que conectan comunidades a nivel global.'
      },
      {
        id: '2',
        name: 'Juan Quillas',
        role: 'Project Manager',
        field: 'Ingeniería de Telecomunicaciones',
        image: 'src/components/profesionales/fotos/juan_quillas.jpg',
        videoSrc: '/videos/juan_quillas.mp4',
        bio: 'Juan Quillas lidera proyectos de infraestructura y conectividad, con foco en zonas rurales y solución de acceso.'
      }
    ]
  },
  {
    id: 'ciberseguridad',
    name: 'Ingeniería de Ciberseguridad',
    cta: '¡Protege el mundo digital!',
    description:
      'La Ingeniería de Ciberseguridad se enfoca en proteger sistemas, redes y datos contra amenazas digitales. Aprende sobre criptografía, seguridad de redes, análisis de vulnerabilidades y gestión de riesgos para salvaguardar la información en un mundo cada vez más conectado.',
    icon: '🛡️',
    professionals: [
      {
        id: '3',
        name: 'Roger Menendez',
        role: 'Gerente de Seguridad',
        field: 'Ingeniería de Ciberseguridad',
        image: 'src/components/profesionales/fotos/roger_menendez.jpg',
        videoSrc: '/videos/roger_menendez.mp4',
        bio: 'Roger lidera equipos en la implementación de estrategias de ciberseguridad para proteger infraestructuras críticas.'
      }
    ]
  },
  {
    id: 'electronica',
    name: 'Ingeniería Electrónica',
    cta: '¡Diseña el futuro de la tecnología!',
    description:
      'La Ingeniería Electrónica se centra en el diseño, desarrollo y mantenimiento de sistemas electrónicos confiables y eficientes. Aprende sobre circuitos, microcontroladores y sistemas embebidos para crear dispositivos innovadores.',
    icon: '🔌',
    professionals: [
      {
        id: '4',
        name: 'Wilfredo Fanola',
        role: 'Ingeniero Electrónico',
        field: 'Ingeniería Electrónica',
        image: 'src/components/profesionales/fotos/wilfredo_fanola.jpg',
        videoSrc: '/videos/wilfredo_fanola.mp4',
        bio: 'Wilfredo es un ingeniero electrónico apasionado por crear soluciones tecnológicas escalables y eficientes.'
      }
    ]
  },
  {
    id: 'ai',
    name: 'Inteligencia Artificial',
    cta: '¡Construye el futuro con IA!',
    description:
      'La Inteligencia Artificial estudia cómo crear máquinas inteligentes capaces de aprender y tomar decisiones. Aprende sobre machine learning, visión por computadora y procesamiento de lenguaje natural para construir soluciones inteligentes.',
    icon: '🤖',
    professionals: [
      {
        id: '5',
        name: 'Lucia Martinez',
        role: 'AI Researcher',
        field: 'Inteligencia Artificial',
        image: '/images/profesionales/lucia_martinez.jpg',
        videoSrc: '/videos/lucia_martinez.mp4',
        bio: 'Lucia investiga nuevas técnicas de inteligencia artificial aplicadas a la salud y la industria.'
      }
    ]
  }
];
const carouselItems = [
  // LO QUE YA TIENES (contenido actual)
  {
    id: 'videos',
    title: 'Videos de Profesionales',
    description: 'Conoce personas reales que trabajan en STEM y su trayectoria.',
    icon: '🎥'
  },
  {
    id: 'motivacion',
    title: 'Su Historia y Motivación',
    description: 'Descubre qué los inspiró a elegir su carrera y seguir adelante.',
    icon: '✨'
  },
  {
    id: 'experiencias',
    title: 'Trabajo y Proyectos',
    description: 'Conoce en qué trabajan actualmente y qué hacen en su día a día.',
    icon: '💼'
  },
  {
    id: 'consejos',
    title: 'Consejos para Ti',
    description: 'Recomendaciones directas para ayudarte a elegir tu camino.',
    icon: '🎯'
  },
  
  // LO QUE PUEDES AGREGAR (valor adicional)
  {
    id: 'carreras',
    title: 'Explora las Carreras',
    description: 'Compara diferentes especialidades STEM y encuentra tu match.',
    icon: '🧭'
  },
  {
    id: 'habilidades',
    title: 'Habilidades que Desarrollarás',
    description: 'Descubre qué talentos necesitarás y cómo potenciarlos.',
    icon: '⚡'
  },
  {
    id: 'futuro',
    title: 'Oportunidades Laborales',
    description: 'Conoce dónde podrás trabajar y las áreas de mayor demanda.',
    icon: '🚀'
  },
  {
    id: 'comunidad',
    title: 'Únete a la Comunidad',
    description: 'Conecta con otros estudiantes explorando carreras STEM.',
    icon: '🤝'
  }
];


const OrientacionVocacional: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  return (
    <div className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* HERO / INTRO when viewing all careers */}
        {!selectedCategory && (
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Encuentra tu Vocación en STEM
            </h1>
            <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
              Explora carreras, aprende de profesionales y encuentra el camino que te motive a construir el futuro.
            </p>

            
          </div>
        )}
        {/* CARRUSEL AUTOMÁTICO */}
        {!selectedCategory && (
          <IntroCarousel
            items={carouselItems}
            autoplay={true}
            intervalMs={6000}
          />
        )}

        {/* SUBTÍTULO antes de las tarjetas (fuera del grid) */}
        
        {/* Grid of career cards */}
        {!selectedCategory && (
          <div className="mt-8 mb-6 text-center">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 tracking-tight">
              Explora las carreras y conoce a quienes ya viven su vocación
            </h2>

            <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed mt-2 mb-8">
              Elige una de las especialidades para descubrir qué se estudia, cómo es trabajar en ese campo y la experiencia real de profesionales STEM.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {categories.map((cat) => (
                <CareerCard
                  key={cat.id}
                  id={cat.id}
                  name={cat.name}
                  icon={cat.icon}
                  cta={cat.cta}
                  description={cat.description}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </div>
          </div>
        )}


        {selectedCategory && !selectedProfessional && (
        <div className="w-full max-w-5xl mx-auto px-4 py-6">
          {/* Volver arriba */}
          <div className="mb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-full 
                        bg-[#F3F7FF] text-[#2F3A5A] font-medium
                        border border-[#D9E2FF] shadow-sm 
                        hover:bg-[#E6EEFF] hover:shadow-md 
                        transition-all duration-300"
              aria-label="Volver a carreras"
            >
              <span className="text-lg">←</span> Volver
            </button>


          </div>

          {/* Título + icono + CTA */}
          <div className="mb-4">
            <div className="flex items-start gap-4">
              <div className="text-4xl md:text-5xl">{selectedCategory.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {selectedCategory.name}
                </h2>
                {selectedCategory.cta && (
                  <div className="mt-2">
                    <span className="inline-block bg-[#00BFA5]/20 text-[#007964] font-semibold px-3 py-1 rounded-full text-sm">
                      {selectedCategory.cta}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Descripción (centrada y con max-width para coincidir con el grid) */}
          {selectedCategory.description && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed max-w-4xl">
                {selectedCategory.description}
              </p>
            </div>
          )}

          <div className="mt-2 w-20 h-1 rounded-full bg-gradient-to-r from-[#00BFA5] via-[#00E5CC] to-[#00BFA5]"></div>

          {/* Grid de profesionales (alineado y centrado) */}
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategory.professionals.map((pro) => (
                <div key={pro.id} className="h-full">
                  <ProfessionalCard
                    name={pro.name}
                    role={pro.role}
                    field={pro.field}
                    photoUrl={pro.image}
                    videoSrc={pro.videoSrc}
                    description={pro.bio}
                    onClick={() => setSelectedProfessional(pro)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Video modal */}
        {selectedProfessional && (
          <VideoModal
            professional={selectedProfessional}
            onClose={() => setSelectedProfessional(null)}
          />
        )}
      </div>
    </div>
  );
};

export default OrientacionVocacional;
