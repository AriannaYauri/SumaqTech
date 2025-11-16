import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseData from './CourseData';
import LessonContent from './components/LessonContent';
import { loadProgress } from './useProgress';
import { 
  CheckCircle2, 
  ChevronLeft, 
  BookOpen, 
  PlayCircle,
  Clock,
  Target,
  Sparkles 
} from 'lucide-react';

const COURSE_ID = 'curso-python';

const ModulePlayer: React.FC<{ userName?: string }> = ({ userName = "Estudiante" }) => {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(sectionId ?? CourseData.allSections[0]?.id ?? null);
  const [progress, setProgress] = useState<Record<string, { completed: boolean }>>({});

  // Paleta de colores
  const colorPalette = {
    primary: '#00BFA5',
    primaryDark: '#008F7A',
    primaryLight: '#00E7C0',
    primaryLighter: '#E0F7F4',
    secondary: '#FF6B95',
    accent: '#FFD166',
    background: '#F0FDF9',
    gradientFrom: '#00BFA5',
    gradientTo: '#00CED1',
    text: '#1A1F2C'
  };

  useEffect(() => {
    setProgress(loadProgress(COURSE_ID));
  }, []);

  const section = CourseData.getSectionById(selected) ?? CourseData.allSections[0];
  const currentSectionIndex = CourseData.allSections.findIndex(s => s.id === selected);
  const completedSections = Object.values(progress).filter(p => p?.completed).length;
  
  // Encontrar el módulo al que pertenece esta sección
  const currentModule = CourseData.modules.find(m => 
    m.sections.some(s => s.id === selected)
  ) ?? CourseData.modules[0];

  const handleNextSection = () => {
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < CourseData.allSections.length) {
      const nextSection = CourseData.allSections[nextIndex];
      setSelected(nextSection.id);
      navigate(`/curso-python/section/${nextSection.id}`);
    }
  };

  const handlePrevSection = () => {
    const prevIndex = currentSectionIndex - 1;
    if (prevIndex >= 0) {
      const prevSection = CourseData.allSections[prevIndex];
      setSelected(prevSection.id);
      navigate(`/curso-python/section/${prevSection.id}`);
    }
  };

  return (
    <div 
      className="min-h-screen p-6 max-w-7xl mx-auto"
      style={{ backgroundColor: colorPalette.background }}
    >
      {/* Header mejorado */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/curso-python')} 
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-md mb-4 group"
          style={{ 
            backgroundColor: 'white',
            border: `1px solid ${colorPalette.primary}20`
          }}
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium" style={{ color: colorPalette.primaryDark }}>
            Volver al curso
          </span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="p-2 rounded-xl shadow-lg"
                style={{ 
                  backgroundColor: colorPalette.primary,
                  boxShadow: `0 8px 32px ${colorPalette.primary}40`
                }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold" style={{ color: colorPalette.text }}>
                {currentModule.title}
              </h1>
            </div>
            <p className="text-lg opacity-80 mb-2" style={{ color: colorPalette.text }}>
              {currentModule.subtitle}
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: colorPalette.primary }} />
                <span className="text-sm font-medium" style={{ color: colorPalette.text }}>
                  {completedSections} de {CourseData.allSections.length} secciones completadas
                </span>
              </div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    backgroundColor: colorPalette.primary,
                    width: `${(completedSections / CourseData.allSections.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Current section badge */}
          <div 
            className="px-4 py-2 rounded-xl text-white font-semibold shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.gradientTo})`
            }}
          >
            Sección {currentSectionIndex + 1}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar de secciones mejorado */}
        <aside className="lg:col-span-1">
          <div 
            className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100"
            style={{ boxShadow: '0 10px 40px rgba(0, 191, 165, 0.1)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <PlayCircle className="w-5 h-5" style={{ color: colorPalette.primary }} />
              <h4 className="font-bold text-lg" style={{ color: colorPalette.text }}>
                Contenido del Curso
              </h4>
            </div>
            
            <ol className="space-y-3">
              {currentModule.sections.map((s, index) => {
                const completed = progress[s.id]?.completed;
                const isSelected = s.id === selected;
                const isUpcoming = index > currentSectionIndex && !completed;
                
                return (
                  <li key={s.id}>
                    <div
                      onClick={() => {
                        setSelected(s.id);
                        navigate(`/curso-python/section/${s.id}`);
                      }}
                      className={`cursor-pointer rounded-xl p-4 flex items-center gap-3 transition-all duration-300 group relative overflow-hidden
                        ${isSelected ? 'shadow-lg transform scale-[1.02]' : 'hover:shadow-md'}
                        ${completed ? 'border-l-4' : ''}
                      `}
                      style={{
                        borderLeftColor: completed ? colorPalette.primary : 'transparent',
                        backgroundColor: isSelected ? colorPalette.primaryLighter : 'white',
                        border: isSelected ? `1px solid ${colorPalette.primary}30` : '1px solid #f3f4f6'
                      }}
                    >
                      {/* Número del módulo */}
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm transition-all
                          ${isSelected ? 'text-white' : completed ? 'text-white' : 'text-gray-600'}
                        `}
                        style={{
                          backgroundColor: isSelected ? colorPalette.primary : 
                                          completed ? colorPalette.primary : 
                                          isUpcoming ? '#f3f4f6' : colorPalette.primaryLighter,
                          color: isSelected ? 'white' : 
                                 completed ? 'white' : 
                                 isUpcoming ? '#9ca3af' : colorPalette.primaryDark
                        }}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <p 
                          className={`font-medium text-sm leading-tight transition-colors
                            ${isSelected ? 'font-semibold' : ''}
                          `}
                          style={{
                            color: isSelected ? colorPalette.primaryDark : 
                                   completed ? colorPalette.primaryDark : colorPalette.text
                          }}
                        >
                          {s.title}
                        </p>
                        {isUpcoming && (
                          <p className="text-xs opacity-60 mt-1" style={{ color: colorPalette.text }}>
                            Próximamente
                          </p>
                        )}
                      </div>

                      {/* Indicador de selección */}
                      {isSelected && (
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: colorPalette.primary }}
                        ></div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Resumen de progreso */}
            <div 
              className="mt-6 p-4 rounded-xl border"
              style={{ 
                backgroundColor: colorPalette.primaryLighter,
                borderColor: colorPalette.primary + '20'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: colorPalette.primary }} />
                <span className="text-sm font-semibold" style={{ color: colorPalette.primaryDark }}>
                  Tu progreso
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold" style={{ color: colorPalette.primaryDark }}>
                  {Math.round((completedSections / CourseData.allSections.length) * 100)}%
                </span>
                <span className="text-sm opacity-80" style={{ color: colorPalette.primaryDark }}>
                  {completedSections}/{CourseData.allSections.length}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal mejorado */}
        <main className="lg:col-span-3">
          <div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            style={{ boxShadow: '0 10px 40px rgba(0, 191, 165, 0.1)' }}
          >
            {/* Header del contenido */}
            <div 
              className="p-6 border-b border-gray-100"
              style={{ backgroundColor: colorPalette.primaryLighter }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: colorPalette.text }}
                >
                  {section.title}
                </h2>
                
              </div>
              <p 
                className="text-lg opacity-90"
                style={{ color: colorPalette.text }}
              >
                {section.summary}
              </p>
            </div>

            {/* Contenido de la lección */}
            <div className="p-6">
              <LessonContent 
                section={section} 
                onMarked={() => setProgress(loadProgress(COURSE_ID))} 
              />
            </div>

            {/* Navegación entre módulos */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevSection}
                  disabled={currentSectionIndex === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                    ${currentSectionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-x-1'}
                  `}
                  style={{ 
                    backgroundColor: currentSectionIndex === 0 ? '#f3f4f6' : 'white',
                    color: currentSectionIndex === 0 ? '#9ca3af' : colorPalette.primaryDark,
                    border: `1px solid ${colorPalette.primary}20`
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>

                <button
                  onClick={handleNextSection}
                  disabled={currentSectionIndex === CourseData.allSections.length - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all
                    ${currentSectionIndex === CourseData.allSections.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md transform hover:translate-x-1'}
                  `}
                  style={{ 
                    backgroundColor: currentSectionIndex === CourseData.allSections.length - 1 ? '#f3f4f6' : colorPalette.primary,
                    color: currentSectionIndex === CourseData.allSections.length - 1 ? '#9ca3af' : 'white'
                  }}
                >
                  Siguiente
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModulePlayer;