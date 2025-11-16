import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadProgress, ProgressMap } from './useProgress';
import CourseData from './CourseData';
import AuthGuard from './AuthGuard';
import ModuleCard from './components/ModuleCard';
import { 
  BookOpen, CheckCircle2, Target, TrendingUp, Sparkles, 
  LogOut, Award, Zap, Trophy, Home, Settings, PlayCircle, 
  Import
} from 'lucide-react';

const Curso_Python: React.FC<{ userName?: string }> = ({ userName = "Estudiante" }) => {
  const navigate = useNavigate();
  const progress: ProgressMap = loadProgress(CourseData.id);

  // Paleta de colores
  const colorPalette = {
    primary: '#00BFA5',
    primaryDark: '#008F7A',
    primaryLight: '#00E7C0',
    primaryLighter: '#E0F7F4',
    gradientFrom: '#00BFA5',
    gradientTo: '#009688',
    accent: '#FF6B95',
    background: '#F8FDFC'
  };

  // Estadísticas y nivel
  const stats = useMemo(() => {
    const completed = Object.values(progress).filter(p => p?.completed).length;
    const total = CourseData.sections.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const userLevel = Math.floor((completed / total) * 10) + 1;
    return { completed, total, percentage, userLevel };
  }, [progress]);

  const isSectionCompleted = (sectionId: string | number): boolean => {
    return progress[String(sectionId)]?.completed || false;
  };

  const getNextSection = () => {
    return CourseData.sections.find(s => !isSectionCompleted(s.id));
  };

  const studyStreak = 3; // ejemplo

  return (
    <AuthGuard>
      <div className="flex min-h-screen" style={{ backgroundColor: colorPalette.background }}>
        
        {/* Sidebar */}
        <aside className="w-64 bg-white/95 backdrop-blur-md border-r border-gray-100 shadow-sm sticky top-0 h-screen p-6 flex flex-col transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 p-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: colorPalette.primary }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">SumaqTech</h2>
              <p className="text-xs text-gray-500">Python Academy</p>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-1 flex-1">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-md text-gray-700 hover:text-gray-900 group" style={{ backgroundColor: colorPalette.primaryLighter, color: colorPalette.primaryDark, fontWeight: '600' }}>
              <Home className="w-5 h-5" /> <span>Dashboard</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 group">
              <BookOpen className="w-5 h-5" /> <span>Módulos</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 group">
              <PlayCircle className="w-5 h-5" /> <span>Playground</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 group">
              <Settings className="w-5 h-5" /> <span>Configuración</span>
            </button>
          </nav>

          {/* Usuario */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-4 p-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: colorPalette.primary }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{userName}</p>
                <p className="text-xs text-gray-500">Nivel {stats.userLevel}</p>
              </div>
            </div>
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 group">
              <LogOut className="w-5 h-5" /> <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
          
          {/* Hero con saludo */}
          <div className="mb-8 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorPalette.gradientFrom}, ${colorPalette.gradientTo})` }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">¡Bienvenido, {userName}! 👋</h2>
                <p className="text-white/90 text-lg">Continúa tu aprendizaje en {CourseData.title}</p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center min-w-[120px] border border-white/30">
                <Award className="w-8 h-8 mx-auto mb-1" />
                <p className="font-bold text-2xl">Nivel {stats.userLevel}</p>
                <p className="text-xs opacity-90">Python Developer</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* Progreso */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: colorPalette.primary, boxShadow: `0 8px 32px ${colorPalette.primary}40` }}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{stats.percentage}%</p>
                  <p className="text-sm text-gray-500">Completado</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ backgroundColor: colorPalette.primary, width: `${stats.percentage}%`, boxShadow: `0 0 20px ${colorPalette.primary}80` }}></div>
              </div>
            </div>

            {/* Módulos completados */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: colorPalette.primary, boxShadow: `0 8px 32px ${colorPalette.primary}40` }}>
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{stats.completed}<span className="text-xl text-gray-400">/{stats.total}</span></p>
                  <p className="text-sm text-gray-500">Módulos</p>
                </div>
              </div>
              <p className="text-sm font-medium flex items-center gap-1" style={{ color: colorPalette.primaryDark }}>
                <TrendingUp className="w-4 h-4" />
                {stats.completed > 0 ? 'Buen progreso' : 'Comienza ahora'}
              </p>
            </div>

            {/* Siguiente módulo */}
            <div className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.primaryDark})` }}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur rounded-xl border border-white/30">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <BookOpen className="w-8 h-8 opacity-30" />
                </div>
                <p className="text-sm opacity-90 mb-1">Siguiente módulo</p>
                <p className="text-lg font-bold">{getNextSection()?.title || '¡Curso completo!'}</p>
              </div>
            </div>

            {/* Racha de estudio */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: colorPalette.primaryLighter }}>
                  <Sparkles className="w-4 h-4" style={{ color: colorPalette.primary }} />
                </div>
                <p className="font-medium text-gray-700 text-sm">Racha de estudio</p>
              </div>
              <p className="text-2xl font-bold text-gray-800 flex items-center gap-2">🔥 {studyStreak} días</p>
            </div>
          </div>

          {/* Botón continuar */}
          {stats.percentage > 0 && stats.percentage < 100 && (
            <div className="mb-8 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorPalette.primaryLight}, ${colorPalette.primary})` }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur rounded-xl border border-white/30">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90 mb-1">Continúa donde lo dejaste</p>
                    <p className="text-xl font-bold">{getNextSection()?.title || 'Selecciona un módulo'}</p>
                  </div>
                </div>
                <button onClick={() => { const nextSection = getNextSection(); if(nextSection) navigate(`/curso-python/section/${nextSection.id}`); }} className="px-6 py-3 bg-white rounded-xl font-semibold hover:scale-105 transition-all shadow-lg" style={{ color: colorPalette.primary }}>
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Grid de módulos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {CourseData.sections.map(section => (
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

          {/* Mensajes motivacionales */}
          {stats.percentage > 0 && stats.percentage < 100 && (
            <div className="mt-8 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.primaryDark})` }}>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
              <div className="relative z-10">
                <Trophy className="w-12 h-12 text-white mx-auto mb-3 opacity-90" />
                <h3 className="text-2xl font-bold text-white mb-2">¡Excelente progreso! 🚀</h3>
                <p className="text-white/90 text-lg">Has completado {stats.completed} de {stats.total} módulos. ¡Sigue así!</p>
              </div>
            </div>
          )}

          {stats.percentage === 100 && (
            <div className="mt-8 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.primaryDark})` }}>
              <div className="absolute inset-0 bg-black/5"></div>
              <Award className="w-16 h-16 text-white mx-auto mb-4 relative z-10" />
              <h3 className="text-3xl font-bold text-white mb-2 relative z-10">¡Felicitaciones! 🎉</h3>
              <p className="text-white/90 text-lg mb-6 relative z-10">Has completado el curso de {CourseData.title}</p>
              <button className="bg-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg px-8 py-3 relative z-10" style={{ color: colorPalette.primary }}>
                Descargar Certificado
              </button>
            </div>
          )}

        </main>
      </div>
    </AuthGuard>
  );
};

export default Curso_Python;
