import React, { useEffect, useRef, useState } from 'react';
import { Clock, Users, Star, Play, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Module = {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  duration: string;
  students: number;
  rating: number;
  level: string;
  badge: string;
  difficulty: string;
  category: string;
  colorClass: string;
  cover: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
};

const STORAGE_KEY = 'sumaq_mod_progress_v2';

const Modulos: React.FC = () => {
  const navigate = useNavigate();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'Todos' | 'Principiante' | 'Intermedio' | 'Avanzado'>('Todos');
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchingModuleId, setLaunchingModuleId] = useState<number | null>(null);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});
  const [hoverPreviewId, setHoverPreviewId] = useState<number | null>(null);

  // Paleta centralizada: --primary = #00BFA5 etc. Usado en CSS below.
  const modules: Module[] = [
    {
      id: 1,
      title: 'Fundamentos de Python',
      description: 'Aprende lógica, variables, funciones y proyectos prácticos con Python.',
      fullDescription: 'Construirás proyectos reales: automatizaciones, juegos y scripts para analizar datos.',
      duration: '8 semanas',
      students: 1247,
      rating: 4.8,
      level: 'Principiante',
      badge: 'Nuevo',
      difficulty: 'Fácil',
      category: 'Programación',
      colorClass: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]',
      cover: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=80',
      progress: 0,
      totalLessons: 24,
      completedLessons: 0
    },
    {
      id: 2,
      title: 'Ciberseguridad Básica',
      description: 'Conceptos esenciales de seguridad y ejercicios prácticos en entornos seguros.',
      fullDescription: 'Identifica amenazas comunes, aprende buenas prácticas y realiza laboratorios de hacking ético.',
      duration: '9 semanas',
      students: 892,
      rating: 4.9,
      level: 'Intermedio',
      badge: 'Popular',
      difficulty: 'Medio',
      category: 'Seguridad',
      colorClass: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]',
      cover: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200&q=80',
      progress: 35,
      totalLessons: 18,
      completedLessons: 6
    },
    {
      id: 3,
      title: 'Redes y Networking',
      description: 'Modelos OSI/TCP-IP, direccionamiento y laboratorio práctico.',
      fullDescription: 'Configura routers, switches virtuales y diagnostica problemas reales en simuladores.',
      duration: '6 semanas',
      students: 654,
      rating: 4.7,
      level: 'Intermedio',
      badge: 'Desafío',
      difficulty: 'Medio',
      category: 'Redes',
      colorClass: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]',
      cover: 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=1200&q=80',
      progress: 67,
      totalLessons: 15,
      completedLessons: 10
    },
    {
      id: 4,
      title: 'IoT y Sensórica',
      description: 'Sensores, microcontroladores y proyectos conectados a la nube.',
      fullDescription: 'Proyectos prácticos: estación meteorológica, alertas y visualización de datos.',
      duration: '7 semanas',
      students: 523,
      rating: 4.9,
      level: 'Avanzado',
      badge: 'Destacado',
      difficulty: 'Difícil',
      category: 'IoT',
      colorClass: 'bg-[var(--primary)] hover:bg-[var(--primary-dark)]',
      cover: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200&q=80',
      progress: 100,
      totalLessons: 21,
      completedLessons: 21
    }
  ];

  // inicializar progreso desde localStorage, si existe; si no, desde modules[]
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setProgressMap(JSON.parse(raw));
      } else {
        const initial: Record<number, number> = {};
        modules.forEach(m => (initial[m.id] = m.progress || 0));
        setProgressMap(initial);
      }
    } catch {
      const initial: Record<number, number> = {};
      modules.forEach(m => (initial[m.id] = m.progress || 0));
      setProgressMap(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap));
    } catch {}
  }, [progressMap]);

  // Close modal on ESC and return focus to close button when opened
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
    if (activeModule) {
      // focus en botón de cierre para accesibilidad
      setTimeout(() => closeBtnRef.current?.focus(), 80);
    }
  }, [activeModule]);

  const filteredModules = selectedLevel === 'Todos' ? modules : modules.filter(m => m.level === selectedLevel);

  // crear confetti con colores de la paleta
  const createConfetti = () => {
    const colors = ['#00BFA5', '#FFB300', '#7C3AED', '#FF6B6B', '#4ECDC4'];
    const confettiCount = 40;
    for (let i = 0; i < confettiCount; i++) {
      const n = document.createElement('div');
      n.className = 'confetti';
      n.style.left = Math.random() * 100 + '%';
      n.style.width = (6 + Math.random() * 10).toFixed(0) + 'px';
      n.style.height = n.style.width;
      n.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      n.style.opacity = '0.95';
      n.style.zIndex = '9999';
      n.style.top = '-20px';
      n.style.position = 'fixed';
      n.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';
      n.style.transform = `rotate(${Math.random() * 360}deg)`;
      n.style.pointerEvents = 'none';
      n.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 4500);
    }
  };

  // animación + comprobación auth -> navegar (demo: redirigir a login si falta token)
  const handleStartCourse = (moduleId: number) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // si no autenticado: animación + confetti + redirigir a login
      setIsLaunching(true);
      setLaunchingModuleId(moduleId);
      createConfetti();
      setTimeout(() => {
        setIsLaunching(false);
        setLaunchingModuleId(null);
        navigate('/auth/ingresa', { state: { from: `/modulos/${moduleId}` } });
      }, 1400);
      return;
    }
    // si autenticado: lanzar cohete visual y navegar al curso
    setIsLaunching(true);
    setLaunchingModuleId(moduleId);
    createConfetti();
    setTimeout(() => {
      setIsLaunching(false);
      setLaunchingModuleId(null);
      navigate(`/modulos/${moduleId}`);
    }, 900);
  };

  // demo: avanzar progreso (persistido)
  const advanceProgress = (moduleId: number, amount = 20) => {
    setProgressMap(prev => {
      const next = Math.min(100, (prev[moduleId] ?? 0) + amount);
      return { ...prev, [moduleId]: next };
    });
  };

  const openModule = (m: Module) => {
    setActiveModule(m);
    document.body.style.overflow = 'hidden';
  };

  const closeModule = () => {
    setActiveModule(null);
    document.body.style.overflow = '';
  };

  // preview on hover: small animated card near cursor (simple implementation)
  const onCardMouseEnter = (id: number) => setHoverPreviewId(id);
  const onCardMouseLeave = () => setHoverPreviewId(null);

  return (
    <div className="min-h-screen py-14 px-6 bg-gradient-to-b from-gray-50 to-white">
      {/* CSS centralizado y variables de paleta para coherencia */}
      <style>{`
        :root {
          --primary: #00BFA5;
          --primary-dark: #00D4B5;
          --accent: #FFB300;
          --accent-2: #7C3AED;
          --danger: #FF6B6B;
        }
        .card-animate { animation: cardIn .48s cubic-bezier(.2,.9,.2,1) both; }
        @keyframes cardIn { from { opacity:0; transform: translateY(10px) scale(.995); } to { opacity:1; transform:none; } }

        .pulse-cta { animation: pulse 2.2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(0,191,165,0.28); } 70% { box-shadow: 0 0 0 10px rgba(0,191,165,0); } 100% { box-shadow: 0 0 0 0 rgba(0,191,165,0); } }

        .cover-hover { transition: transform .45s cubic-bezier(.2,.9,.2,1); }
        .cover-overlay { transition: opacity .22s ease, transform .22s ease; opacity:0; transform: scale(.96); }
        article:hover .cover-hover { transform: scale(1.035) translateY(-4px) rotate(-0.4deg); }
        article:hover .cover-overlay { opacity:1; transform: scale(1); }

        /* rocket / confetti animations */
        @keyframes rocketLaunch {
          0% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
          60% { transform: translateY(-160px) scale(.9) rotate(-6deg); opacity: 1; }
          100% { transform: translateY(-420px) scale(.4) rotate(-20deg); opacity: 0; }
        }
        .rocket-launching { animation: rocketLaunch 0.9s cubic-bezier(.2,.9,.2,1) forwards; font-size: 52px; }

        @keyframes confettiFall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }

        .progress-bar-fill { transition: width 0.6s cubic-bezier(.4,0,.2,1); }
        .progress-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }

        /* preview bubble */
        .preview-bubble {
          position: absolute;
          right: 1.25rem;
          top: 1.25rem;
          width: 180px;
          padding: 10px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92));
          box-shadow: 0 10px 30px rgba(2,6,23,0.12);
          transform: translateZ(0);
          z-index: 30;
          pointer-events: none;
          font-size: 13px;
        }

        /* small accessible confetti clean-up handled by JS */
      `}</style>

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10 relative">
          <div className="absolute -top-6 left-6 w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--primary)] opacity-8 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition">
              <Play className="w-6 h-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Módulos de Aprendizaje</h1>
          </div>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Cursos prácticos, interactivos y con diseño pensado para estudiantes — registra tu avance y desbloquea badges.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(['Todos', 'Principiante', 'Intermedio', 'Avanzado'] as const).map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-5 py-2 rounded-md font-medium transition-all ${
                selectedLevel === level
                  ? 'bg-[var(--primary)] text-white shadow-lg scale-[1.02]'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredModules.map((module, idx) => {
            const progress = progressMap[module.id] ?? module.progress;
            return (
              <article
                key={module.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 group transform transition-transform duration-400 card-animate relative"
                onMouseEnter={() => onCardMouseEnter(module.id)}
                onMouseLeave={onCardMouseLeave}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="h-2 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--accent-2)]" />

                <div className="relative">
                  <div
                    className="h-44 bg-cover bg-center cover-hover cursor-pointer"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.28)), url(${module.cover})` }}
                    role="img"
                    aria-label={module.title}
                    onClick={() => openModule(module)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full bg-white/90 w-14 h-14 flex items-center justify-center cover-overlay">
                      <Play className="w-5 h-5 text-gray-800" />
                    </div>
                  </div>

                  {/* small preview bubble (interactive hover preview) */}
                  {hoverPreviewId === module.id && (
                    <div className="preview-bubble" aria-hidden>
                      <div className="font-semibold text-sm mb-1">{module.title}</div>
                      <div className="text-xs text-gray-600 mb-2 line-clamp-3">{module.fullDescription}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center"><Play className="w-4 h-4" /></div>
                        <div className="text-xs text-gray-700">Preview: lección 1 • 3 min</div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/30 backdrop-blur-sm">
                    {module.level}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.category} • {module.level}</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[var(--primary)] shadow-sm">
                        {module.badge}
                      </span>
                      <div className="mt-2 flex items-center gap-2 bg-white/80 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-800">{module.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">{module.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span className="font-medium">Progreso</span>
                      <span className="font-semibold">{Math.round((progress/100) * module.totalLessons)}/{module.totalLessons} lecciones</span>
                    </div>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="progress-bar-fill h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-full relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        role="progressbar"
                        aria-label={`${module.title} progreso`}
                      >
                        <div className="progress-shimmer absolute inset-0" />
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {progress === 0 ? '🚀 ¡Comienza tu aventura!' : progress === 100 ? '🎉 ¡Completado!' : `${progress}% completado`}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-5">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /><span className="font-medium">{module.duration}</span></div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /><span className="font-medium">{module.students.toLocaleString()}</span></div>
                    <div className={`ml-auto text-xs font-semibold px-2 py-1 rounded ${module.difficulty === 'Fácil' ? 'bg-green-50 text-green-700' : module.difficulty === 'Medio' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>{module.difficulty}</div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStartCourse(module.id)}
                      className={`flex-1 ${module.colorClass} text-white font-semibold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 pulse-cta`}
                      aria-label={`Comenzar ${module.title}`}
                    >
                      <Play className="w-4 h-4" />
                      {progress === 0 ? 'Comenzar Curso' : progress === 100 ? 'Revisar' : 'Continuar'}
                    </button>

                    <button
                      onClick={() => openModule(module)}
                      className="flex-0 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 hover:shadow transition"
                      aria-label={`Ver detalles ${module.title}`}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <div className="text-center mt-12">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-xl px-8 py-6 shadow-lg border border-gray-100">
            <p className="text-lg font-semibold text-gray-900 mb-1">Más de 5,000 estudiantes aprendiendo</p>
            <p className="text-sm text-gray-600">Regístrate para desbloquear todos los módulos y acceder a mentorías.</p>
          </div>
        </div>
      </div>

      {/* modal con roadmap y accesibilidad */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label={`${activeModule.title} detalles`}>
          <div className="relative max-w-3xl w-full">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-md border border-white/10">
              <div className="relative">
                <img src={activeModule.cover} alt={activeModule.title} className="w-full h-64 object-cover" />
                <button ref={closeBtnRef} onClick={closeModule} className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow hover:bg-white">
                  <X className="w-5 h-5 text-gray-800" />
                </button>
                <div className="absolute left-4 bottom-4 bg-black/40 text-white px-3 py-2 rounded-md backdrop-blur-sm">
                  <span className="text-sm font-semibold">{activeModule.category}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{activeModule.title}</h2>
                    <p className="text-sm text-gray-600 mb-2">{activeModule.level} • {activeModule.duration}</p>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)] text-white font-semibold">{activeModule.badge}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{activeModule.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <div className="text-sm text-gray-500">Estudiantes</div>
                    <div className="text-xl font-bold">{activeModule.students.toLocaleString()}</div>
                  </div>
                </div>

                <p className="text-gray-700 mt-4">{activeModule.fullDescription || activeModule.description}</p>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Ruta de aprendizaje</h4>
                  <ol className="space-y-3">
                    {['Introducción', 'Fundamentos', 'Proyecto práctico', 'Examen final'].map((step, i) => {
                      const prog = progressMap[activeModule.id] ?? activeModule.progress;
                      const stepPerc = (i + 1) * 25;
                      const done = prog >= stepPerc;
                      return (
                        <li key={step} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {done ? '✓' : i + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{step}</div>
                            <div className="text-xs text-gray-500">{done ? 'Completado' : 'Pendiente'}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { closeModule(); handleStartCourse(activeModule.id); }}
                    className="flex-1 bg-[var(--primary)] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-95 transition shadow-lg"
                  >
                    <Play className="w-4 h-4" /> Comenzar Curso
                  </button>
                  <button onClick={() => advanceProgress(activeModule.id, 25)} className="flex-0 px-5 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 hover:shadow transition">
                    Avanzar progreso (demo)
                  </button>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <strong>Nota:</strong> Para acceder al contenido completo debes registrarte o iniciar sesión. Tu progreso se guarda cuando estás autenticado.
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 right-6 transform translate-y-6">
              <div className="bg-white rounded-xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                  <Play className="w-4 h-4" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Empieza hoy</div>
                  <div className="text-gray-500">Progreso guardado al registrarte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lanzamiento / cohete global */}
      {isLaunching && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
          <div className="rocket-launching">🚀</div>
        </div>
      )}
    </div>
  );
};

export default Modulos;
