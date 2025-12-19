import React, { useState } from 'react';
import { CareerCard } from '../components/CareerCard';
import { OrientacionCard } from '../components/OrientacionCard';
import { VideoModal } from '../components/VideoModal';
import IntroCarousel from '../components/IntroCarousel';

interface Student {
  id: string;
  name: string;
  level: string;        // "5to de Secundaria", "2do año Universidad", etc.
  institution: string;  // Colegio o Universidad
  image: string;        // ruta en /public/images/
  videoSrc: string;     // ruta en /public/videos/
  bio: string;
  project?: string;     // Proyecto destacado (opcional)
}

interface Category {
  id: string;
  name: string;
  cta?: string;
  description?: string;
  icon?: string;
  students: Student[];  // Cambiado de professionals a students
}

const categories: Category[] = [
  {
    id: 'telecom',
    name: 'Ingeniería de Telecomunicaciones',
    cta: '¡Conecta el mundo con la tecnología!',
    description:
      'La Ingeniería de Telecomunicaciones abarca el diseño, implementación y gestión de sistemas que permiten la comunicación de voz, datos e información a nivel global. Aprende sobre redes, transmisión de datos, telefonía, internet, radiofrecuencia y tecnologías emergentes, preparándote para conectar personas y dispositivos en un mundo interconectado.',
    icon: '📡',
    students: [
      {
        id: '1',
        name: 'Fernando Flores',
        level: '6to ciclo',
        institution: 'Universidad Nacional de Ingeniería',
        image: 'src/components/estudiantes/fotos/fernando_flores.jpg',
        videoSrc: 'src/components/estudiantes/videos/fernando_flores.mp4',
        bio: 'Fernando está diseñando un sistema de comunicación para zonas rurales como parte de su proyecto de tesis.',
        project: 'Segundo puesto en la ICT Competition 2025 - China'
      },
      {
        id: '2',
        name: 'Arianna Yauri',
        level: 'Séptimo ciclo',
        institution: 'Universidad Nacional de Ingeniería',
        image: 'src/components/estudiantes/fotos/arianna_yauri.jpg',
        videoSrc: 'src/components/estudiantes/videos/arianna_yauri.mp4',
        bio: 'Arianna trabaja en optimización de redes 5G y hace prácticas en Telefónica.',
        project: 'Análisis de cobertura 5G en Lima Metropolitana'
      },
      {
        id: '3',
        name: 'María Santos',
        level: '4to año Universidad',
        institution: 'Universidad de Lima',
        image: 'src/components/estudiantes/fotos/maria_santos.jpg',
        videoSrc: '/videos/maria_santos.mp4',
        bio: 'María desarrolla dispositivos IoT para agricultura inteligente y ganó el primer lugar en un hackathon nacional.',
        project: 'Sistema de monitoreo agrícola con sensores IoT'
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
    students: [
      {
        id: '4',
        name: 'Diego Torres',
        level: '4to año Universidad',
        institution: 'UNMSM',
        image: 'src/components/estudiantes/fotos/diego_torres.jpg',
        videoSrc: '/videos/diego_torres.mp4',
        bio: 'Diego participa en competencias de CTF (Capture The Flag) y ha ganado varios premios nacionales en ciberseguridad.',
        project: 'Herramienta de detección de vulnerabilidades web'
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
    students: [
      {
        id: '5',
        name: 'Daniela Chanta',
        level: 'Egresada de Ingeniería Electrónica',
        institution: 'Universidad Nacional de Ingeniería',
        image: 'src/components/estudiantes/fotos/daniela_chanta.jpg',
        videoSrc: 'src/components/estudiantes/videos/daniela_chanta.mp4',
        bio: "Daniela actualmente está estudiando en Francia gracias a una beca que obtuvo"
        
      }
    ]
  }
];
const carouselItems = [
  // Contenido adaptado para estudiantes
  {
    id: 'videos',
    title: 'Videos de Estudiantes STEM',
    description: 'Conoce estudiantes como tú que están explorando carreras en tecnología.',
    icon: '🎥'
  },
  {
    id: 'motivacion',
    title: 'Su Experiencia de Aprendizaje',
    description: 'Descubre qué los motivó a estudiar STEM y cómo superaron los desafíos.',
    icon: '✨'
  },
  {
    id: 'experiencias',
    title: 'Proyectos y Logros',
    description: 'Conoce los proyectos increíbles que han creado y las competencias ganadas.',
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


const Estudiantes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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
              Explora carreras, conoce estudiantes como tú y descubre el camino que te inspire a construir el futuro.
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
              Explora las carreras y conoce estudiantes que ya están en el camino
            </h2>

            <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed mt-2 mb-8">
              Elige una de las especialidades para descubrir qué se estudia, los proyectos que puedes crear y la experiencia real de estudiantes STEM.
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


        {selectedCategory && !selectedStudent && (
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

          {/* Grid de estudiantes (alineado y centrado) */}
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategory.students.map((student) => (
                <div key={student.id} className="h-full">
                  <OrientacionCard
                    name={student.name}
                    role={`${student.level} • ${student.institution}`}
                    field={selectedCategory.name}
                    photoUrl={student.image}
                    videoSrc={student.videoSrc}
                    description={student.project ? `${student.bio}\n\n📌 Proyecto: ${student.project}` : student.bio}
                    onClick={() => setSelectedStudent(student)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Video modal */}
        {selectedStudent && (
          <VideoModal
            professional={{
              id: selectedStudent.id,
              name: selectedStudent.name,
              role: `${selectedStudent.level} • ${selectedStudent.institution}`,
              field: selectedCategory?.name || '',
              image: selectedStudent.image,
              videoSrc: selectedStudent.videoSrc,
              bio: selectedStudent.project 
                ? `${selectedStudent.bio}\n\n📌 Proyecto destacado: ${selectedStudent.project}` 
                : selectedStudent.bio
            }}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Estudiantes;
