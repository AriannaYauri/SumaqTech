import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseData from './CourseData';
import ModuleCard from './components/ModuleCard';
import { loadProgress, ProgressMap } from './useProgress';
import AuthGuard from './AuthGuard';
import { ChevronLeft } from 'lucide-react';

const ModuleSections: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const progress: ProgressMap = loadProgress(CourseData.id);

  const module = CourseData.getModuleById(moduleId || '');
  
  if (!module) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8FDFC' }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Módulo no encontrado</h2>
            <button 
              onClick={() => navigate('/curso-python')}
              className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all"
            >
              Volver al curso
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const colorPalette = {
    primary: '#00BFA5',
    primaryDark: '#008F7A',
    primaryLight: '#00E7C0',
    primaryLighter: '#E0F7F4',
    background: '#F8FDFC'
  };

  const isSectionCompleted = (sectionId: string | number): boolean => {
    return progress[String(sectionId)]?.completed || false;
  };

  const moduleProgress = {
    completed: module.sections.filter(s => isSectionCompleted(s.id)).length,
    total: module.sections.length,
    percentage: module.sections.length > 0 
      ? Math.round((module.sections.filter(s => isSectionCompleted(s.id)).length / module.sections.length) * 100)
      : 0
  };

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
              {module.image && (
                <div className="relative w-full aspect-square overflow-hidden max-w-2xl mx-auto">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/600x600/00BFA5/ffffff?text=${module.title}`;
                    }}
                  />
                </div>
              )}
              
              {/* Información del módulo */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0"
                    style={{ backgroundColor: colorPalette.primary }}
                  >
                    {CourseData.modules.findIndex(m => m.id === module.id) + 1}
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Secciones del módulo</h2>
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
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ModuleSections;

