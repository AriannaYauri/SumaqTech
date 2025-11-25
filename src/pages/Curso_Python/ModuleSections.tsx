import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from './useCourse';
import { useProgress } from './useProgress';
import ModuleCard from './components/ModuleCard';
import AuthGuard from './AuthGuard';
import { ChevronLeft, BookOpen } from 'lucide-react';

const COURSE_ID = 'python-101';

const ModuleSections: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourse(COURSE_ID);
  const { progress } = useProgress(COURSE_ID);

  const colorPalette = {
    primary: '#00BFA5',
    primaryDark: '#008F7A',
    primaryLight: '#00E7C0',
    primaryLighter: '#E0F7F4',
    background: '#F8FDFC'
  };

  // Loading state
  if (courseLoading || !course) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colorPalette.background }}>
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 mx-auto mb-4" style={{ color: colorPalette.primary }} fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Cargando módulo...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const module = course.modules.find(m => m.id === moduleId);
  
  if (!module) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colorPalette.background }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Módulo no encontrado</h2>
            <button 
              onClick={() => navigate('/curso-python')}
              className="px-6 py-3 text-white rounded-xl font-semibold transition-all hover:shadow-lg"
              style={{ backgroundColor: colorPalette.primary }}
            >
              Volver al curso
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const isSectionCompleted = (sectionId: string): boolean => {
    return progress[sectionId]?.completed || false;
  };

  const moduleProgress = {
    completed: module.sections.filter(s => isSectionCompleted(s.id)).length,
    total: module.sections.length,
    percentage: module.sections.length > 0 
      ? Math.round((module.sections.filter(s => isSectionCompleted(s.id)).length / module.sections.length) * 100)
      : 0
  };

  const moduleIndex = course.modules.findIndex(m => m.id === module.id);

  return (
    <AuthGuard>
      <div className="min-h-screen" style={{ backgroundColor: colorPalette.background }}>
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {/* Botón de volver */}
          <button 
            onClick={() => navigate('/curso-python')} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-md mb-6 group bg-white border border-gray-100"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium text-gray-700">Volver a módulos</span>
          </button>

          {/* Header del módulo */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6">
              {/* Imagen del módulo (1:1) */}
              <div className="relative w-full aspect-square overflow-hidden max-w-2xl mx-auto" style={{ backgroundColor: colorPalette.primary }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-white opacity-80">M{moduleIndex + 1}</span>
                </div>
              </div>
              
              {/* Información del módulo */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0"
                    style={{ backgroundColor: colorPalette.primary }}
                  >
                    {moduleIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {module.title}
                    </h1>
                    {module.subtitle && (
                      <p className="text-lg text-gray-600">
                        {module.subtitle}
                      </p>
                    )}
                    {module.description && (
                      <p className="text-gray-600 mt-2">
                        {module.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progreso del módulo */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-medium">
                    {moduleProgress.completed} de {moduleProgress.total} secciones completadas
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          backgroundColor: colorPalette.primary,
                          width: `${moduleProgress.percentage}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 min-w-[3rem] text-right">
                      {moduleProgress.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de secciones */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6" style={{ color: colorPalette.primary }} />
              <h2 className="text-2xl font-bold text-gray-800">Secciones del módulo</h2>
            </div>
            
            {module.sections.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                <p className="text-gray-600">Este módulo aún no tiene secciones.</p>
                <p className="text-sm text-gray-500 mt-2">El contenido se agregará pronto.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {module.sections.map(section => (
                  <ModuleCard 
                    key={section.id} 
                    section={section} 
                    progress={isSectionCompleted(section.id)} 
                    onStart={() => navigate(`/curso-python/section/${section.id}`)}
                    onView={() => navigate(`/curso-python/section/${section.id}`)}
                    primaryColor={colorPalette.primary} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ModuleSections;

