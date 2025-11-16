import React, { useState } from 'react';
import { CareerCard } from '../components/CareerCard';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { VideoModal } from '../components/VideoModal';

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
    description: 'La Ingeniería de Telecomunicaciones abarca el diseño, implementación y gestión de sistemas que permiten la comunicación de voz, datos e información a nivel global. Aprende sobre redes, transmisión de datos, telefonía, internet, radiofrecuencia y tecnologías emergentes, preparándote para conectar personas y dispositivos en un mundo interconectado.',
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
        bio: 'Juan Quillas es un experimentado Project Manager en telecomunicaciones, liderando proyectos innovadores que conectan comunidades a nivel global.'
      }
    ]
  },
  {
    id: 'ciberseguridad',
    name: 'Ingeniería de Ciberseguridad',
    cta: '¡Protege el mundo digital!',
    description: 'La Ingeniería de Ciberseguridad se enfoca en proteger sistemas, redes y datos contra amenazas digitales. Aprende sobre criptografía, seguridad de redes, análisis de vulnerabilidades y gestión de riesgos para salvaguardar la información en un mundo cada vez más conectado.',
    icon: '🛡️',
    professionals: [
      {
        id: '3',
        name: 'Roger Menendez',
        role: 'Gerente',
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
    description: 'La Ingeniería Electrónica se centra en el diseño, desarrollo y mantenimiento de sistemas electrónicos confiables y eficientes. Aprende sobre circuitos, microcontroladores y sistemas embebidos para crear dispositivos innovadores.',
    icon: '💻',
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
    description: 'La Inteligencia Artificial estudia cómo crear máquinas inteligentes capaces de aprender y tomar decisiones. Aprende sobre machine learning, visión por computadora y procesamiento de lenguaje natural para construir soluciones inteligentes.',
    icon: '🤖',
    professionals: [
      {
        id: '5',
        name: 'Lucia Martinez',
        role: 'AI Researcher',
        field: 'Inteligencia Artificial',
        image: 'src/components/profesionales/fotos/lucia_martinez.jpg',
        videoSrc: '/videos/lucia_martinez.mp4',
        bio: 'Lucia investiga nuevas técnicas de inteligencia artificial aplicadas a la salud y la industria.'
      }
    ]
  }
];

const OrientacionVocacional: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {!selectedCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
        )}

        {selectedCategory && !selectedProfessional && (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 px-4 py-2 rounded-full bg-[#00BFA5]/20 hover:bg-[#00BFA5]/40 transition-colors"
            >
              ← Volver a Carreras
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategory.professionals.map((pro) => (
                <ProfessionalCard
                  key={pro.id}
                  name={pro.name}
                  role={pro.role}
                  field={pro.field}
                  photoUrl={pro.image}
                  videoSrc={pro.videoSrc}
                  description={pro.bio}
                  onClick={() => setSelectedProfessional(pro)}
                />
              ))}
            </div>
          </div>
        )}

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
