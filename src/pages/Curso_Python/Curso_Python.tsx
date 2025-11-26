import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from './useCourse';
import { useProgress } from './useProgress';
import { useAuth } from '../../contexts/AuthContext';
import Playground from './interactive/Playground';
import { 
  Home, 
  BookOpen, 
  PlayCircle, 
  Settings, 
  LogOut, 
  Sparkles,
  TrendingUp,
  Target,
  Award,
  Clock
} from 'lucide-react';

// Importar las imágenes de las portadas
import pythonM1 from '../../components/cursos_iconos/python-m1.png';
import pythonM2 from '../../components/cursos_iconos/python-m2.png';

const COURSE_ID = 'python-101';

const MODULE_COVERS: Record<string, string> = {
  'm1': pythonM1,
  'm2': pythonM2,
  'introduccion-python': pythonM1,
  'fundamentos-basicos': pythonM2,
};

console.log('📸 MODULE_COVERS cargado:', MODULE_COVERS);

const Curso_Python: React.FC = () => {
  const { user, logout } = useAuth(); // ✅ USAR logout del contexto
  const navigate = useNavigate();
  
  console.log('👤 Usuario actual:', user);
  console.log('🔑 Role del usuario:', user?.role);
  console.log('✅ Es admin?:', user?.role === 'admin');
  
  const { course, loading: courseLoading } = useCourse(COURSE_ID);
  const { progress } = useProgress(COURSE_ID);
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'modules' | 'playground'>('dashboard');

  const userName = user?.name || user?.email?.split('@')[0] || 'Estudiante';

  const colorPalette = {
    primary: '#00BFA5',
    primaryDark: '#008F7A',
    primaryLight: '#00E7C0',
    primaryLighter: '#E0F7F4',
    gradientFrom: '#00BFA5',
    gradientTo: '#009688',
    accent: '#FF6B95',
    secondary: '#FF6B95',
    background: '#F8FDFC'
  };

  const isAdmin = user?.role === 'admin';

  const allSections = course?.modules.flatMap(m => m.sections) ?? [];
  const completedSections = Object.values(progress).filter(p => p?.completed).length;
  const progressPercentage = allSections.length > 0 
    ? Math.round((completedSections / allSections.length) * 100) 
    : 0;

  const stats = {
    totalModules: course?.modules.length ?? 0,
    completedModules: course?.modules.filter(m => 
      m.sections.every(s => progress[s.id]?.completed)
    ).length ?? 0,
    totalSections: allSections.length,
    completedSections,
    progressPercentage,
    userLevel: Math.floor(completedSections / 5) + 1,
    streak: 3
  };

  // ✅ FUNCIÓN PARA CERRAR SESIÓN CON DELAY
  const handleLogout = async () => {
    try {
      console.log('🔴 Iniciando logout...');
      await logout(); // Llamar al logout del contexto
      console.log('✅ Logout exitoso');
      
      // ✅ SIN DELAY - Redirección inmediata
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Por favor, intenta de nuevo.');
    }
  };

  // Loading state
  if (courseLoading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colorPalette.background }}>
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4" style={{ color: colorPalette.primary }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  // ✅ SI ES PLAYGROUND, MOSTRAR SOLO EL PLAYGROUND (PANTALLA COMPLETA)
  if (currentView === 'playground') {
    return <Playground />;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colorPalette.background }}>
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-100 flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: colorPalette.primary }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">SumaqTech</h2>
              
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-md group ${
              currentView === 'dashboard' 
                ? 'text-gray-700 hover:text-gray-900' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            style={currentView === 'dashboard' ? { backgroundColor: colorPalette.primaryLighter, color: colorPalette.primaryDark, fontWeight: '600' } : {}}
          >
            <Home className="w-5 h-5" /> 
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setCurrentView('modules')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === 'modules' 
                ? 'text-gray-700 hover:text-gray-900 hover:shadow-md' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            style={currentView === 'modules' ? { backgroundColor: colorPalette.primaryLighter, color: colorPalette.primaryDark, fontWeight: '600' } : {}}
          >
            <BookOpen className="w-5 h-5" /> 
            <span>Módulos</span>
          </button>

          {/* ✅ BOTÓN PLAYGROUND CONECTADO */}
          <button 
            onClick={() => setCurrentView('playground')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === 'playground' 
                ? 'text-gray-700 hover:text-gray-900 hover:shadow-md' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            style={currentView === 'playground' ? { backgroundColor: colorPalette.primaryLighter, color: colorPalette.primaryDark, fontWeight: '600' } : {}}
          >
            <PlayCircle className="w-5 h-5" /> 
            <span>Playground</span>
          </button>
        </nav>

        {/* Botón de Admin en sidebar */}
        {isAdmin && (
          <div className="px-4 pb-4 border-t border-gray-100 pt-4">
            <button
              onClick={() => navigate('/admin/python')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-md group"
              style={{
                backgroundColor: colorPalette.secondary,
                color: 'white'
              }}
            >
              <Settings className="w-5 h-5" />
              <span>Editar Curso</span>
            </button>
          </div>
        )}

        {/* ✅ BOTÓN DE CERRAR SESIÓN CON LOGOUT REAL */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 p-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: colorPalette.primary }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{userName}</p>
              <p className="text-xs text-gray-500">Nivel {stats.userLevel}</p>
            </div>
          </div>
          {/* ✅ BOTÓN DE LOGOUT CORREGIDO */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 group"
          >
            <LogOut className="w-5 h-5" /> 
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header con título */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: colorPalette.primaryDark }}>
              {course.title}
            </h1>
            <p className="text-gray-600 text-lg">{course.description}</p>
          </div>

          {/* Botón rápido para admin en el header */}
          {isAdmin && (
            <button
              onClick={() => navigate('/admin/python')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-md border"
              style={{
                backgroundColor: 'white',
                color: colorPalette.secondary,
                borderColor: colorPalette.secondary
              }}
            >
              <Settings className="w-4 h-4" />
              <span>Editar Curso</span>
            </button>
          )}
        </div>

        {/* Contenido condicional */}
        {currentView === 'dashboard' ? (
          <DashboardView 
            stats={stats} 
            colorPalette={colorPalette}
            course={course}
            progress={progress}
            navigate={navigate}
          />
        ) : (
          <ModulesView 
            course={course}
            progress={progress}
            colorPalette={colorPalette}
            navigate={navigate}
          />
        )}
      </main>
    </div>
  );
};

// Componente Dashboard
const DashboardView: React.FC<any> = ({ stats, colorPalette }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tu Progreso</h2>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colorPalette.primaryLighter }}>
              <TrendingUp className="w-6 h-6" style={{ color: colorPalette.primary }} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Progreso Total</p>
              <p className="text-2xl font-bold" style={{ color: colorPalette.primaryDark }}>
                {stats.progressPercentage}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colorPalette.primaryLighter }}>
              <Target className="w-6 h-6" style={{ color: colorPalette.primary }} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Secciones</p>
              <p className="text-2xl font-bold" style={{ color: colorPalette.primaryDark }}>
                {stats.completedSections}/{stats.totalSections}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colorPalette.primaryLighter }}>
              <Award className="w-6 h-6" style={{ color: colorPalette.primary }} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nivel Actual</p>
              <p className="text-2xl font-bold" style={{ color: colorPalette.primaryDark }}>
                {stats.userLevel}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colorPalette.primaryLighter }}>
              <Clock className="w-6 h-6" style={{ color: colorPalette.primary }} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Racha</p>
              <p className="text-2xl font-bold" style={{ color: colorPalette.primaryDark }}>
                {stats.streak} días
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Componente Modules CON PORTADAS MEJORADAS
const ModulesView: React.FC<any> = ({ course, progress, colorPalette, navigate }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Módulos del Curso</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.modules.map((module: any, index: number) => {
          const completedSections = module.sections.filter((s: any) => progress[s.id]?.completed).length;
          const totalSections = module.sections.length;
          const progressPct = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
          
          // ✅ OBTENER PORTADA CON LOG DE DEBUG
          const coverImage = MODULE_COVERS[module.id];
          console.log(`📸 Módulo ${module.id} (${module.title}):`, coverImage ? '✅ Portada encontrada' : '❌ Sin portada');

          return (
            <div 
              key={module.id}
              onClick={() => navigate(`/curso-python/module/${module.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* ✅ PORTADA DEL MÓDULO MEJORADA */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100">
                {coverImage ? (
                  <>
                    <img 
                      src={coverImage} 
                      alt={module.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('❌ Error cargando portada:', coverImage);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('✅ Portada cargada correctamente:', coverImage);
                      }}
                    />
                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </>
                ) : (
                  // Fallback si no hay portada
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${colorPalette.primary} 0%, ${colorPalette.gradientTo} 100%)` 
                    }}
                  >
                    <div className="text-white text-6xl font-bold opacity-30">
                      {index + 1}
                    </div>
                  </div>
                )}

                {/* Número de módulo (siempre visible) */}
                <div className="absolute top-4 left-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(0, 191, 165, 0.9)' }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Badge de progreso */}
                {progressPct > 0 && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="text-sm font-bold" style={{ color: colorPalette.primary }}>
                        {progressPct}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contenido del card */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {module.subtitle || module.description}
                </p>

                {/* Información de progreso */}
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-500">
                    {completedSections}/{totalSections} secciones
                  </span>
                  <span className="font-semibold" style={{ color: colorPalette.primary }}>
                    {progressPct}%
                  </span>
                </div>

                {/* Barra de progreso */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      backgroundColor: colorPalette.primary,
                      width: `${progressPct}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curso_Python;