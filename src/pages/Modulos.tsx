import React, { useEffect, useRef, useState } from 'react';
import { Users, Play, X, Lock, Zap, Sparkles, ArrowRight, Target, MessageCircle, Award, Lightbulb, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// Importa portadas locales (cuadradas)
import pythonCover from '../components/cursos_iconos/python.png';
import guardEspacioCover from '../components/cursos_iconos/guard_espacio.png';
import amenazasCover from '../components/cursos_iconos/amenazas_invisibles.png';
import iotCover from '../components/cursos_iconos/iot.png';

type Module = {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  students: number;
  badge: string;
  category: string;
  cover: string;
  features: string[];
};

const Modulos: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const modules: Module[] = [
    {
      id: 1,
      title: 'Aventurero Python',
      description: '¡Tu primer paso en programación! Crea juegos y apps simples mientras aprendes.',
      fullDescription: 'Aprende a programar desde cero con Python. Crea una calculadora, juegos de adivinanzas y proyectos divertidos que podrás mostrar a tus amigos.',
      students: 50,
      badge: '🔥 Nuevo',
      category: 'Programación',
      cover: pythonCover,
      features: ['Ejemplos prácticos y dinámicos', 'Proyectos paso a paso', 'Entorno interactivo', 'Certificado digital']
    },
    {
      id: 2,
      title: 'Guardianes del espacio',
      description: 'Protege tu identidad en internet como un verdadero guardián digital.',
      fullDescription:
        'Descubre cómo cuidarte en redes sociales. Aprende a detectar perfiles falsos, configurar tu privacidad en TikTok/Instagram y proteger tu información personal.',
      students: 35,
      badge: '🚀 Popular',
      category: 'Seguridad Digital',
      cover: guardEspacioCover,
      features: ['Casos reales de tu edad', 'Tips prácticos', 'Checklist de seguridad', 'Certificado digital']
    },
    {
      id: 3,
      title: 'Amenazas invisibles',
      description: 'Conviértete en un detective digital y protégete de hackers y estafas online.',
      fullDescription: 'Aprende a identificar virus, phishing y estafas. Usa simuladores para practicar sin riesgo y protege tus dispositivos como un profesional.',
      students: 40,
      badge: '💎 Pro',
      category: 'Ciberseguridad',
      cover: amenazasCover,
      features: ['Laboratorios virtuales', 'Retos gamificados', 'Badge de experto', 'Certificado digital']
    },
    {
      id: 4,
      title: 'Laboratorio de robots',
      description: 'Construye y programa tu propio robot desde cero. ¡Ciencia ficción hecha realidad!',
      fullDescription: 'Diseña robots que responden a tu voz, sensores y comandos online. Usa simuladores de Arduino y crea prototipos que funcionan.',
      students: 45,
      badge: '⚡ Elite',
      category: 'Robótica / IoT',
      cover: iotCover,
      features: ['Simuladores online', 'Proyectos desafiantes', 'Mentoría en vivo', 'Certificado digital']
    }
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModule(null);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (activeModule) setTimeout(() => closeBtnRef.current?.focus(), 80);
  }, [activeModule]);

  const createConfetti = () => {
    const colors = ['#9EFCE4','#CFFAF1','#EAD9FF','#FFE4EC','#DBEAFE'];
    for (let i = 0; i < 50; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.top = '-24px';
      el.style.left = Math.random() * 100 + '%';
      el.style.width = el.style.height = 8 + Math.random() * 10 + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = Math.random() > 0.6 ? '50%' : '4px';
      el.style.opacity = '0.9';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.pointerEvents = 'none';
      el.style.animation = `confettiFall ${1.8 + Math.random() * 1.4}s linear forwards`;
      el.style.zIndex = '9999';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    }
  };

  const handleStartCourse = (moduleId: number) => {
    const targetPath = moduleId === 1 ? '/curso-python' : `/modulos/${moduleId}`;
    if (!user) {
      navigate('/auth/ingresa', {
        state: { from: targetPath, message: '¡Crea tu cuenta gratis para comenzar!' }
      });
      return;
    }
    setIsLaunching(true);
    createConfetti();
    setTimeout(() => {
      setIsLaunching(false);
      navigate(targetPath);
    }, 1000);
  };

  const openModule = (m: Module) => {
    setActiveModule(m);
    document.body.style.overflow = 'hidden';
  };
  const closeModule = () => {
    setActiveModule(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--mint-50)] via-[var(--sky-100)] to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00BFA5] to-[#00D4B1] flex items-center justify-center text-white shadow-xl animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#00BFA5] via-[#00D4B1] to-[#7C3AED] bg-clip-text text-transparent">
              Cursos STEM 🚀
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed font-medium">
            Aprende tecnología que <span className="text-[#00BFA5] font-bold">realmente podrás usar</span>. 
            Desde crear tu primer juego hasta proteger tu privacidad en internet.

          </p>
          <p className="text-sm text-gray-600 mb-10">
            ✨ Sin aburrimiento. Sin teoría excesiva. Solo proyectos que importan.
          </p>

          {/* Beneficios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#E8F7F4] hover:border-[#9EFCE4] hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#00BFA5] to-[#00D4B1] flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Contenido interactivo</h3>
              <p className="text-xs text-gray-600">Aprende haciendo</p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#E8F7F4] hover:border-[#FFD6DC] hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#FFB3C1] to-[#FFD6DC] flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Ejemplos reales</h3>
              <p className="text-xs text-gray-600">De tu vida cotidiana</p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#E8F7F4] hover:border-[#C4B5FD] hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#C4B5FD] to-[#DDD6FE] flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Ayuda 24/7</h3>
              <p className="text-xs text-gray-600">Chatbot + comunidad</p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#E8F7F4] hover:border-[#FDE68A] hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#FDE68A] to-[#FEF3C7] flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Certificado</h3>
              <p className="text-xs text-gray-600">Para tu CV/portafolio</p>
            </div>
          </div>
        </header>

        {/* CTA intermedio motivador */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Empieza tu aventura STEM
            </h3>
            
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relajada">
              Cada curso es una experiencia única diseñada para que aprendas{' '}
              <span className="font-bold text-[#00BFA5]">haciendo proyectos reales</span>.
              Sin aburrimiento, sin complicaciones. Solo tú y la tecnología.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[#E8F7F4] shadow-sm">
                <Zap className="w-4 h-4 text-[#FFB3C1]" />
                <span className="font-semibold text-gray-700">4 cursos activos</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[#E8F7F4] shadow-sm">
                <Users className="w-4 h-4 text-[#00BFA5]" />
                <span className="font-semibold text-gray-700">+170 estudiantes activos</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[#E8F7F4] shadow-sm">
                <Award className="w-4 h-4 text-[#FDE68A]" />
                <span className="font-semibold text-gray-700">Certificado al finalizar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas: gap-6 en mobile, gap-7 en desktop */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7 mb-14">
          {modules.map(module => (
            <article
              key={module.id}
              className="group relative rounded-3xl bg-white border-2 border-[#D4F1EC] shadow-lg hover:shadow-2xl hover:border-[#9EFCE4] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Badge con mejor contraste */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3.5 py-2 rounded-full text-[11px] font-bold shadow-md backdrop-blur-sm
                  ${module.badge.includes('Nuevo') ? 'bg-gradient-to-r from-[#FFB3C1] to-[#FFD6DC] text-gray-900'
                  : module.badge.includes('Popular') ? 'bg-gradient-to-r from-[#9EFCE4] to-[#CFFAF1] text-gray-900'
                  : module.badge.includes('Elite') ? 'bg-gradient-to-r from-[#FDE68A] to-[#FEF3C7] text-gray-900'
                  : 'bg-gradient-to-r from-[#C4B5FD] to-[#DDD6FE] text-gray-900'}
                `}>
                  {module.badge}
                </span>
              </div>

              {/* Portada cuadrada 1:1 */}
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                <img
                  src={module.cover}
                  alt={module.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-[#00BFA5]/0 group-hover:bg-[#00BFA5]/15 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openModule(module)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl"
                  >
                    <Play className="w-6 h-6 text-[#00BFA5]" fill="currentColor" />
                  </button>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-[#00BFA5] transition-colors leading-tight">
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {module.description}
                </p>

                {/* Solo estudiantes */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 pb-5 border-b border-gray-100">
                  <Users className="w-4 h-4 text-[#00BFA5]" />
                  <span className="font-semibold">{module.students.toLocaleString()} estudiantes</span>
                </div>

                {/* Botones */}
                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleStartCourse(module.id)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2
                               bg-gradient-to-r from-[#00BFA5] to-[#00D4B1] text-white
                               shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    {!user ? <><Lock className="w-4 h-4" /> Empieza gratis</> : <><Zap className="w-4 h-4" /> ¡Vamos!</>}
                  </button>
                  <button
                    onClick={() => openModule(module)}
                    className="px-5 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 hover:border-[#00BFA5] hover:text-[#00BFA5] hover:bg-[#F0FFF9] transition-all duration-200"
                  >
                    Más info
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA final con cohete para consistencia */}
        {!user && (
          <div className="text-center mb-20">
            <div className="bg-gradient-to-r from-[#00BFA5] via-[#00D4B1] to-[#7C3AED] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-4 flex items-center justify-center gap-3">
                  <Rocket className="w-10 h-10" />
                  ¿Listo para despegar?
                </h2>
                <p className="text-white/95 max-w-2xl mx-auto mb-8 text-lg">
                  Únete a más de <span className="font-bold">7,000+ estudiantes</span> que ya están construyendo su futuro digital.
                </p>
                <button
                  onClick={() => navigate('/auth/ingresa')}
                  className="bg-white text-[#00BFA5] font-black px-10 py-4 rounded-2xl text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3 mx-auto group"
                >
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
                  Crear cuenta gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-white/80 text-sm mt-4">✨ Sin tarjeta. Empieza en 30 segundos.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal mejorado */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Botón cerrar fijo */}
            <button
              ref={closeBtnRef}
              onClick={closeModule}
              className="sticky top-4 right-4 z-20 ml-auto mr-4 mt-4 p-3 rounded-full bg-white/95 hover:bg-white transition-all shadow-lg hover:scale-110 hover:rotate-90 duration-300 flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#D4F1EC] overflow-hidden -mt-16">
              {/* Header del modal con imagen de fondo */}
              <div className="relative h-80">
                <img src={activeModule.cover} alt={activeModule.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Contenido del header */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm
                      ${activeModule.badge.includes('Nuevo') ? 'bg-gradient-to-r from-[#FFB3C1] to-[#FFD6DC] text-gray-900'
                      : activeModule.badge.includes('Popular') ? 'bg-gradient-to-r from-[#9EFCE4] to-[#CFFAF1] text-gray-900'
                      : activeModule.badge.includes('Elite') ? 'bg-gradient-to-r from-[#FDE68A] to-[#FEF3C7] text-gray-900'
                      : 'bg-gradient-to-r from-[#C4B5FD] to-[#DDD6FE] text-gray-900'}
                    `}>
                      {activeModule.badge}
                    </span>
                    <span className="px-4 py-2 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white">
                      {activeModule.category}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
                    {activeModule.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">{activeModule.students.toLocaleString()} estudiantes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-10">
                  {/* Columna principal - Descripción */}
                  <div className="md:col-span-2">
                    <div className="mb-8">
                      <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-[#00BFA5]" />
                        ¿Qué aprenderás?
                      </h3>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {activeModule.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#7C3AED]" />
                        Lo que incluye este curso:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {activeModule.features.map((f, idx) => (
                          <div 
                            key={f} 
                            className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-[#9EFCE4] hover:shadow-md transition-all group"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
                            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00BFA5] to-[#00D4B1] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Zap className="w-4 h-4 text-white" />
                            </span>
                            <span className="text-gray-700 font-medium text-sm leading-relaxed">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar - CTA */}
                  <div className="md:col-span-1">
                    <div className="sticky top-6">
                      <div className="bg-gradient-to-br from-[#F0FFF9] to-[#E8F7F4] rounded-3xl p-8 border-2 border-[#D4F1EC] shadow-lg">
                        <div className="text-center mb-6">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00BFA5] to-[#00D4B1] flex items-center justify-center shadow-lg">
                            <Rocket className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="text-2xl font-black text-gray-900 mb-2">¡Empieza ahora!</h4>
                          <p className="text-sm text-gray-600">100% gratis. Sin trucos.</p>
                        </div>

                        {/* Stats visuales */}
                        <div className="space-y-3 mb-8">
                          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFA5] to-[#00D4B1] flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Estudiantes</p>
                                <p className="text-lg font-black text-[#00BFA5]">{activeModule.students.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFB3C1] to-[#FFD6DC] flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Tipo</p>
                                <p className="text-sm font-bold text-gray-900">Práctico</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FDE68A] to-[#FEF3C7] flex items-center justify-center">
                                <Award className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Certificado</p>
                                <p className="text-sm font-bold text-gray-900">Incluido</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Botón principal */}
                        <button
                          onClick={() => { closeModule(); handleStartCourse(activeModule.id); }}
                          className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-[#00BFA5] to-[#00D4B1] hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 mb-4 group"
                        >
                          {!user ? (
                            <>
                              <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              Crear cuenta gratis
                            </>
                          ) : (
                            <>
                              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              ¡Empezar ahora!
                            </>
                          )}
                        </button>
                        
                        <p className="text-xs text-center text-gray-600">
                          ✨ Acceso inmediato. Aprende a tu ritmo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animación */}
      {isLaunching && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
          <div className="rocket-animation text-7xl">🚀</div>
        </div>
      )}

      <style>{`
        :root{
          --brand-1:#00BFA5;
          --brand-2:#00D4B1;
          --mint-50:#F8FFFD;
          --sky-100:#EAF3FF;
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .rocket-animation { animation: rocketLaunch 1.2s ease-out forwards; }
        @keyframes rocketLaunch {
          0% { transform: scale(.5) translateY(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) translateY(-20px) rotate(15deg); opacity: 1; }
          100% { transform: scale(1) translateY(-120vh) rotate(25deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Modulos;