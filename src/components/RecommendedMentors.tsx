import React, { useState } from 'react';
import { Users, X, Award, CheckCircle, Clock } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  specialty: string;
  status: 'available' | 'busy';
  bio: string;
  specialties: string[];
  photo: string;
  experience: string;
  matchTags: string[];
}

interface RecommendedMentorsProps {
  tags: string[];
}

// Base de datos estática de mentores
const allMentors: Mentor[] = [
  {
    id: 1,
    name: 'Carlos Ruiz',
    specialty: 'Python & Automatización',
    status: 'available',
    bio: 'Desarrollador senior con 8 años de experiencia en Python. Especialista en automatización de procesos y web scraping.',
    specialties: ['Python', 'Automatización', 'Backend', 'APIs'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    experience: '8 años',
    matchTags: ['python', 'automatizacion', 'backend'],
  },
  {
    id: 2,
    name: 'María González',
    specialty: 'Data Science & IA',
    status: 'available',
    bio: 'Data scientist con especialización en Machine Learning. Ha trabajado en proyectos de IA para empresas Fortune 500.',
    specialties: ['Machine Learning', 'Data Analysis', 'Python', 'IA'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    experience: '6 años',
    matchTags: ['data science', 'machine learning', 'ia', 'visualization'],
  },
  {
    id: 3,
    name: 'Juan López',
    specialty: 'Frontend & Diseño UI/UX',
    status: 'busy',
    bio: 'Diseñador y desarrollador frontend. Experto en React, Tailwind CSS y experiencia de usuario moderna.',
    specialties: ['React', 'Tailwind CSS', 'Diseño UI/UX', 'Frontend'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    experience: '5 años',
    matchTags: ['frontend', 'react', 'diseño', 'css', 'ui/ux'],
  },
  {
    id: 4,
    name: 'Ana Torres',
    specialty: 'Seguridad en Internet',
    status: 'available',
    bio: 'Especialista en ciberseguridad y protección de datos. Certificada en ética hacker y seguridad ofensiva.',
    specialties: ['Ciberseguridad', 'VPN', 'Privacidad', 'Seguridad Ofensiva'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    experience: '7 años',
    matchTags: ['seguridad', 'vpn', 'privacidad', 'ciberseguridad'],
  },
  {
    id: 5,
    name: 'Diego Mendoza',
    specialty: 'Carrera Profesional en STEM',
    status: 'available',
    bio: 'Mentor de vida profesional. Ha ayudado a más de 150 jóvenes a iniciar su carrera en tecnología.',
    specialties: ['Orientación Vocacional', 'Soft Skills', 'Entrevistas Técnicas', 'Carrera IT'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
    experience: '10 años',
    matchTags: ['carrera', 'empleo', 'primer trabajo', 'soft skills', 'stem'],
  },
  {
    id: 6,
    name: 'Sofia Chen',
    specialty: 'Diseño Digital & Arte',
    status: 'available',
    bio: 'Artista digital y diseñadora. Experta en NFTs, ilustración digital y creación de contenido visual para web3.',
    specialties: ['Diseño Digital', 'NFT', 'Ilustración', 'Blockchain'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    experience: '4 años',
    matchTags: ['diseño', 'nft', 'arte digital', 'blockchain', 'creatividad'],
  },
];

const RecommendedMentors: React.FC<RecommendedMentorsProps> = ({ tags }) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Normalizar tags a minúsculas para comparación
  const normalizedTags = tags.map(tag => tag.toLowerCase());

  // Filtrar mentores que coincidan con las etiquetas
  const relatedMentors = allMentors.filter(mentor =>
    mentor.matchTags.some(mentorTag =>
      normalizedTags.some(userTag =>
        mentorTag.includes(userTag) || userTag.includes(mentorTag)
      )
    )
  );

  // Ordenar mentores disponibles primero
  const sortedMentors = relatedMentors.sort((a, b) => {
    if (a.status === 'available' && b.status !== 'available') return -1;
    if (a.status !== 'available' && b.status === 'available') return 1;
    return 0;
  });

  const handleOpenModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMentor(null);
  };

  // Si no hay mentores relacionados
  if (sortedMentors.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">
          Aún no hay mentores disponibles para este tema.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Pronto tendremos mentores especializados en estas áreas.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Sección de Mentores Recomendados */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Users className="w-5 h-5 text-emerald-600" />
            Mentores Recomendados
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Expertos conectados con tus temas de interés
          </p>
        </div>

        {/* Grid de mentores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Avatar y estado */}
              <div className="relative p-4 bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col items-center">
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                />
                <div className="mt-3 text-center">
                  <h4 className="font-semibold text-gray-800 text-sm">{mentor.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{mentor.specialty}</p>
                </div>

                {/* Estado disponibilidad */}
                <div className="absolute top-4 right-4">
                  {mentor.status === 'available' ? (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Disponible
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      Ocupado
                    </div>
                  )}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Experiencia */}
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-gray-700 font-medium">
                    {mentor.experience} de experiencia
                  </span>
                </div>

                {/* Bio resumida */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                  {mentor.bio}
                </p>

                {/* Especialidades */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.specialties.slice(0, 3).map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón conectarse */}
                <button
                  onClick={() => handleOpenModal(mentor)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm mt-auto"
                >
                  Conectarse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalles del mentor */}
      {isModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-y-auto max-h-96">
            {/* Botón cerrar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full z-10"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6 pt-2">
                <img
                  src={selectedMentor.photo}
                  alt={selectedMentor.name}
                  className="w-24 h-24 rounded-full border-4 border-emerald-200 shadow-lg"
                />
                <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center">
                  {selectedMentor.name}
                </h2>
                <p className="text-emerald-600 font-semibold mt-1">
                  {selectedMentor.specialty}
                </p>

                {/* Estado */}
                <div className="mt-3">
                  {selectedMentor.status === 'available' ? (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Disponible
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Clock className="w-4 h-4" />
                      Ocupado
                    </div>
                  )}
                </div>
              </div>

              {/* Experiencia */}
              <div className="bg-emerald-50 rounded-lg p-3 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-gray-600">Experiencia</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedMentor.experience}
                  </p>
                </div>
              </div>

              {/* Bio completa */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Acerca de</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedMentor.bio}
                </p>
              </div>

              {/* Especialidades completas */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botón de acción */}
              <button
                onClick={handleCloseModal}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
              >
                Solicitar Mentoría
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendedMentors;
