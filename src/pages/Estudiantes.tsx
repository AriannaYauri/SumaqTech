import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Target, TrendingUp, BookOpen, Lightbulb, Quote, ArrowRight, Rocket, Laptop, Settings, PlayCircle } from 'lucide-react';

const Estudiantes: React.FC = () => {
  const careerPaths = [
    {
      title: 'Desarrollo de Software',
      description: 'Crear aplicaciones, sitios web y sistemas que transformen la forma en que las personas interactúan con la tecnología.',
      skills: ['Programación', 'Lógica', 'Resolución de problemas'],
      demand: 'Alta',
      salary: 'S/. 4,000 - S/. 12,000',
      growth: '+15% anual',
      icon: <BookOpen className="w-6 h-6" />,
      // visual-only gradient and glow color (do not change text/content)
      gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      glow: 'rgba(37,99,235,0.18)',
      bgColor: 'bg-white',
      borderColor: 'border-transparent',
      accentColor: 'bg-[#E5E7EB]',
  testimonial: {
  name: 'María González',
  role: 'Desarrolladora Senior en Google',
  // more professional portrait (external placeholder)
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        quote: 'La programación me permitió crear soluciones que impactan a millones de personas. Cada día es una nueva aventura resolviendo problemas fascinantes.',
        experience: '8 años de experiencia',
        journey: 'Empecé programando juegos simples a los 14 años. Hoy trabajo en Google creando productos que usan millones de personas.'
      }
    },
    {
      title: 'Ciencia de Datos',
      description: 'Analizar grandes cantidades de información para extraer insights valiosos que guíen decisiones estratégicas.',
      skills: ['Estadística', 'Python/R', 'Machine Learning'],
      demand: 'Muy Alta',
      salary: 'S/. 5,000 - S/. 15,000',
      growth: '+22% anual',
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #F472B6 100%)',
      glow: 'rgba(124,58,237,0.16)',
      bgColor: 'bg-white',
      borderColor: 'border-transparent',
      accentColor: 'bg-[#E5E7EB]',
  testimonial: {
  name: 'Carlos Fernández',
  role: 'Data Scientist en Microsoft',
  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
        quote: 'Los datos cuentan historias increíbles. Descubrir patrones ocultos y ayudar a las empresas a tomar mejores decisiones es mi pasión diaria.',
        experience: '6 años de experiencia',
        journey: 'Me encantaban las matemáticas en el colegio. Descubrí que podía combinarlas con tecnología para resolver problemas reales.'
      }
    },
    {
      title: 'Ciberseguridad',
      description: 'Proteger sistemas, redes y datos contra amenazas cibernéticas en un mundo cada vez más digitalizado.',
      skills: ['Seguridad de redes', 'Análisis de riesgos', 'Ethical hacking'],
      demand: 'Muy Alta',
      salary: 'S/. 4,500 - S/. 14,000',
      growth: '+18% anual',
      icon: <Target className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%)',
      glow: 'rgba(45,212,191,0.14)',
      bgColor: 'bg-white',
      borderColor: 'border-transparent',
      accentColor: 'bg-[#E5E7EB]',
  testimonial: {
  name: 'Juan Vargas',
  role: 'Especialista en Ciberseguridad',
  image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80',
        quote: 'Ser un guardián digital es emocionante. Cada día protejo a las personas y empresas de amenazas invisibles, es como ser un superhéroe de la tecnología.',
        experience: '5 años de experiencia',
        journey: 'Siempre me gustó descubrir cómo funcionaban las cosas y encontrar vulnerabilidades. Ahora protejo lo que más importa.'
      }
    },
    {
      title: 'Inteligencia Artificial',
      description: 'Desarrollar sistemas inteligentes que pueden aprender, razonar y automatizar tareas complejas.',
      skills: ['Machine Learning', 'Deep Learning', 'Matemáticas'],
      demand: 'Extrema',
      salary: 'S/. 6,000 - S/. 18,000',
      growth: '+25% anual',
      icon: <Lightbulb className="w-6 h-6" />,
      gradient: 'linear-gradient(135deg, #38BDF8 0%, #2DD4BF 100%)',
      glow: 'rgba(56,189,248,0.12)',
      bgColor: 'bg-white',
      borderColor: 'border-transparent',
      accentColor: 'bg-[#E5E7EB]',
  testimonial: {
  name: 'Julio Rodríguez',
  role: 'AI Engineer en Tesla',
  image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        quote: 'Crear máquinas que piensan y aprenden es el futuro. Estoy construyendo tecnología que cambiará el mundo para siempre.',
        experience: '7 años de experiencia',
        journey: 'Me fascinaban los robots desde pequeño. Ahora trabajo creando inteligencia artificial para autos autónomos.'
      }
    }
  ];

  // Extras for motivational blocks (visual only)
  const careerExtras = [
    {
      creates: ['Apps móviles', 'Sistemas web', 'APIs'],
      projects: ['App de recetas', 'Portfolio interactivo', 'Juego simple', 'Chat en tiempo real'],
      why: ['Construir productos reales', 'Mucho aprendizaje práctico', 'Alta empleabilidad']
    },
    {
      creates: ['Modelos predictivos', 'Dashboards', 'Pipelines de datos'],
      projects: ['Análisis de ventas', 'Modelo de recomendación', 'Visualizador de datos', 'Detección de fraude'],
      why: ['Toma decisiones basadas en datos', 'Impacto en negocio', 'Amplias aplicaciones']
    },
    {
      creates: ['Sistemas seguros', 'Monitoreo de redes', 'Herramientas de detección'],
      projects: ['Pentesting de app', 'Monitor de seguridad', 'Simulación de ataques', 'Hardening de servidores'],
      why: ['Proteges a usuarios y empresas', 'Trabajo crítico y desafiante', 'Alta demanda de especialistas']
    },
    {
      creates: ['Modelos inteligentes', 'Sistemas de recomendación', 'Automatizaciones'],
      projects: ['Clasificador de imágenes', 'Asistente virtual', 'Proyecto de visión por computador', 'Optimizador de procesos'],
      why: ['Innovación constante', 'Resolver problemas complejos', 'Aplicaciones en múltiples industrias']
    }
  ];


  // Small set of inspirational facts (displayed per career card)
  const inspirationalFacts = [
    'La primera programadora fue Ada Lovelace.',
    'Muchas startups exitosas comenzaron como proyectos estudiantiles.',
    'El primer videojuego fue creado por un estudiante universitario.'
  ];

  // Carousel phrases above Careers heading
  const carouselPhrases = [
    'Todo experto fue un principiante.',
    'La tecnología necesita ideas como la tuya.',
    'Lo que imaginas, lo puedes crear.'
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCarouselIndex((i) => (i + 1) % carouselPhrases.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Mini-quiz state (structure only)
  const [quizAnswers, setQuizAnswers] = useState({ q1: '', q2: '', q3: '' });
  const setAnswer = (q: 'q1'|'q2'|'q3', value: string) => setQuizAnswers((s) => ({ ...s, [q]: value }));

  // Modal/result state for the playful style result
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  // Rotating short phrases for the banner (per new spec)
  const rotatingPhrases = ['Sueña.', 'Crea.', 'Explora.', 'Inspírate.'];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhraseIndex((p) => (p + 1) % rotatingPhrases.length), 3000);
    return () => clearInterval(id);
  }, []);

  // NUEVO: Profesionales con videos (formato Orientación Vocacional)
  const professionals = [
    {
      id: '1',
      name: 'María González',
      role: 'Desarrolladora Senior',
      company: 'Google',
      field: 'Desarrollo de Software',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      videoSrc: '/videos/maria_gonzalez.mp4', // Agrega tu video aquí
      bio: 'María es desarrolladora senior en Google, creando productos que impactan a millones de usuarios. Empezó programando juegos simples a los 14 años.',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
      accentColor: '#2563EB'
    },
    {
      id: '2',
      name: 'Carlos Fernández',
      role: 'Data Scientist',
      company: 'Microsoft',
      field: 'Ciencia de Datos',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
      videoSrc: '/videos/carlos_fernandez.mp4',
      bio: 'Carlos lidera proyectos de análisis de datos en Microsoft. Le encantaban las matemáticas y descubrió cómo combinarlas con tecnología.',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #F472B6 100%)',
      accentColor: '#7C3AED'
    },
    {
      id: '3',
      name: 'Juan Vargas',
      role: 'Especialista en Ciberseguridad',
      company: 'Telefónica',
      field: 'Ciberseguridad',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80',
      videoSrc: '/videos/juan_vargas.mp4',
      bio: 'Juan protege infraestructuras críticas en Telefónica. Le gustaba descubrir cómo funcionaban las cosas y encontrar vulnerabilidades.',
      gradient: 'linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%)',
      accentColor: '#2DD4BF'
    },
    {
      id: '4',
      name: 'Julio Rodríguez',
      role: 'AI Engineer',
      company: 'Tesla',
      field: 'Inteligencia Artificial',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      videoSrc: '/videos/julio_rodriguez.mp4',
      bio: 'Julio desarrolla inteligencia artificial para autos autónomos en Tesla. Le fascinaban los robots desde pequeño.',
      gradient: 'linear-gradient(135deg, #38BDF8 0%, #2DD4BF 100%)',
      accentColor: '#38BDF8'
    }
  ];

  // NUEVO: Estado para modal de video
  const [selectedProfessional, setSelectedProfessional] = useState<typeof professionals[0] | null>(null);

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-lg mb-6 shadow-lg">
            <Compass className="w-10 h-10 text-white" />
          </div>
          {/* Visible section title must remain 'Inspírate' per requirements */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Inspírate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre las carreras tecnológicas más demandadas a través de las experiencias reales 
            de profesionales exitosos en la industria
          </p>
        </div>

        {/* Career Paths Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            {/* Carousel: inspirational phrases */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className="relative h-12 flex items-center justify-center">
                {carouselPhrases.map((p, i) => (
                  <div
                    key={p}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${i === carouselIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <p className="text-lg md:text-xl font-medium text-[#0F0F1A]">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini-quiz convertido en juego ligero "Descubre tu Estilo ✨" */}
            <div className="quiz-vibrant mx-auto quiz-wide mb-8">
              <div className="quiz-inner">
                <h4 className="text-xl font-extrabold mb-3 text-[#0F0F1A]">Descubre tu Estilo ✨</h4>
                <p className="text-sm text-gray-700 mb-4">Un juego ligero para conocer tu vibra creativa — sin diagnósticos, sin etiquetas profesionales.</p>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">1. ¿Qué tipo de actividades disfrutas más?</p>
                    <div className="quiz-options">
                      {['Crear cosas','Resolver retos','Analizar ideas','Imaginar historias'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAnswer('q1', opt)}
                          aria-pressed={quizAnswers.q1===opt}
                          className={`quiz-option ${quizAnswers.q1===opt? 'quiz-selected animate-bounce':'hover:shadow-md'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">2. ¿Cómo te gusta aprender?</p>
                    <div className="quiz-options">
                      {['Viendo','Haciendo','Escuchando','Experimentando'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAnswer('q2', opt)}
                          aria-pressed={quizAnswers.q2===opt}
                          className={`quiz-option ${quizAnswers.q2===opt? 'quiz-selected animate-bounce':'hover:shadow-md'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">3. ¿Qué te emociona de un proyecto?</p>
                    <div className="quiz-options">
                      {['Innovar','Organizar','Comunicar','Investigar'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAnswer('q3', opt)}
                          aria-pressed={quizAnswers.q3===opt}
                          className={`quiz-option ${quizAnswers.q3===opt? 'quiz-selected animate-bounce':'hover:shadow-md'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={() => {
                        // compute playful style result based on selections
                        const mapToStyle = (val: string) => {
                          if (!val) return '';
                          const v = val.toLowerCase();
                          if (['crear cosas','imaginar historias','innovar','viendo'].includes(v)) return 'creative';
                          if (['resolver retos','analizar ideas','investigar','experimentando'].includes(v)) return 'analytic';
                          if (['escuchando','comunicar','organizar'].includes(v)) return 'communicator';
                          if (['haciendo','organizar'].includes(v)) return 'explorer';
                          return '';
                        };

                        const picks = [mapToStyle(quizAnswers.q1), mapToStyle(quizAnswers.q2), mapToStyle(quizAnswers.q3)];
                        const counts: Record<string, number> = { creative: 0, analytic: 0, communicator: 0, explorer: 0 };
                        picks.forEach((p) => { if (p) counts[p] = (counts[p] || 0) + 1; });
                        const order = ['creative','analytic','communicator','explorer'];
                        let winner = order[0];
                        let best = -1;
                        order.forEach((k) => { if (counts[k] > best) { best = counts[k]; winner = k; } });

                        // Fallback if nothing chosen
                        if (best <= 0) winner = 'creative';

                        const styleMap: Record<string, any> = {
                          creative: {
                            title: 'Tu energía es Creativa ✨',
                            desc: 'Te encanta imaginar y darle forma a ideas nuevas con chispa y color.',
                            superpower: 'Imaginación visual',
                            activities: ['Crear historias','Diseñar cosas','Proyectos DIY','Arte digital']
                          },
                          analytic: {
                            title: 'Tu estilo es Analítico y Curioso 🔍',
                            desc: 'Disfrutas desentrañar cómo funcionan las cosas y resolver retos con ingenio.',
                            superpower: 'Pensamiento lógico',
                            activities: ['Resolver acertijos','Explorar datos','Experimentar','Proyectos técnicos']
                          },
                          communicator: {
                            title: 'Tu vibra es Comunicadora 💬',
                            desc: 'Conectas ideas y personas; te gusta expresar y compartir con otros.',
                            superpower: 'Empatía y claridad',
                            activities: ['Contar historias','Crear contenido','Presentar ideas','Colaborar en equipos']
                          },
                          explorer: {
                            title: 'Tienes un espíritu Explorador 🌱',
                            desc: 'Te motiva probar cosas nuevas, aprender haciendo y descubrir caminos distintos.',
                            superpower: 'Curiosidad activa',
                            activities: ['Probar experimentos','Viajes cortos','Proyectos prácticos','Construir prototipos']
                          }
                        };

                        const chosen = styleMap[winner] || styleMap.creative;
                        // attach to state via setShowModal and setResult
                        setResult(chosen);
                        setShowModal(true);
                      }}
                      className="px-6 py-3 rounded-md text-white font-semibold transition-all duration-200"
                      style={{ background: 'linear-gradient(90deg,#4FD1C5,#C4B5FD)' }}
                    >
                      Descubrir mi estilo ✨
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultado modal: se abre después de completar el juego */}
            {showModal && result && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                <div className="relative z-10 w-11/12 max-w-lg mx-auto">
                  <div className="bg-white rounded-xl p-6 shadow-2xl">
                    <h3 className="text-lg font-extrabold mb-2">✨ Esto dice tu estilo</h3>
                    <h4 className="text-2xl font-bold mb-3">{result.title}</h4>
                    <p className="text-sm text-gray-700 mb-4">{result.desc}</p>

                    <div className="mb-4">
                      <div className="bg-gradient-to-r from-[#A7F3F0] to-[#C4B5FD] p-4 rounded-lg">
                        <h5 className="text-sm font-semibold">Tu superpoder</h5>
                        <p className="mt-1 font-medium">{result.superpower}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold mb-2">Ideas que podrían inspirarte</h5>
                      <ul className="list-inside list-disc text-sm text-gray-700 space-y-1">
                        {result.activities.map((a: string, i: number) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md bg-gray-100 font-semibold">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Carreras Tecnológicas en Demanda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora las diferentes trayectorias profesionales disponibles y conoce a quienes ya han recorrido estos caminos
            </p>
          </div>

          {/* Career Cards */}
          <div className="space-y-12">
            {careerPaths.map((career, index) => (
              <div key={index} className="relative">
                {/* Path Connector */}
                {index < careerPaths.length - 1 && (
                  <div className="hidden lg:block absolute left-8 top-full h-12 w-0.5 bg-gray-300" style={{ marginTop: '1.5rem' }}>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Main Card */}
                <div className={`bg-white rounded-lg shadow-md border-l-4 ${career.borderColor} transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group overflow-hidden`}>
                  <div className="grid md:grid-cols-3 gap-0">
                      {/* Career Header Section */}
                      <div className="p-8 text-white" style={{ background: career.gradient }}>
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                            {career.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{career.title}</h3>
                          <span className="inline-block px-3 py-1 bg-white/20 rounded-md text-xs font-semibold backdrop-blur-sm">
                            {career.demand} demanda
                          </span>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed flex-grow">{career.description}</p>
                      </div>
                    </div>

                    {/* Testimonial Section */}
                    <div className={`${career.bgColor} p-8 border-r border-transparent`}>
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <img 
                            src={career.testimonial.image} 
                            alt={career.testimonial.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
                            style={{ boxShadow: `0 8px 30px ${career.glow}` }}
                          />
                          <h4 className="text-xl font-bold text-gray-900 text-center mb-1">{career.testimonial.name}</h4>
                          <p className="text-sm text-gray-600 text-center mb-2">{career.testimonial.role}</p>
                          <p className="text-xs text-gray-500 text-center font-medium">{career.testimonial.experience}</p>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">Su Trayectoria</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{career.testimonial.journey}</p>
                          </div>

                          {/* Dato Inspirador: placed between trayectoria and habilidades (visual) */}
                          <div className="mb-4">
                              <div className="mb-1">
                                <div className="inline-flex items-center gap-3 px-3 py-2 rounded-full text-sm font-semibold text-white" style={{ background: 'linear-gradient(90deg, #7C3AED, #2DD4BF)', boxShadow: '0 6px 18px rgba(124,58,237,0.18)' }}>
                                  <Lightbulb className="w-4 h-4" />
                                  <span>{inspirationalFacts[index % inspirationalFacts.length]}</span>
                                </div>
                              </div>
                          </div>

                          <div className="relative">
                            <Quote className="w-5 h-5 text-gray-400 absolute top-0 left-0" />
                            <p className="text-sm text-gray-700 italic leading-relaxed pl-6">
                              "{career.testimonial.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Details — replaced with motivational blocks (no content changes to courses/testimonials) */}
                    <div className="p-8">
                      <div className="flex flex-col h-full gap-4">
                        <div>
                          <h5 className="text-sm font-semibold text-[#0F0F1A] mb-3">¿Qué puedes crear con esta carrera?</h5>
                          <ul className="grid grid-cols-1 gap-2">
                            {careerExtras[index].creates.map((it, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-800">
                                <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-[#7C3AED]">{i+1}</span>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-[#0F0F1A] mb-3">Proyectos que podrías hacer tú</h5>
                          <div className="grid grid-cols-1 gap-2">
                            {careerExtras[index].projects.map((p, i) => (
                              <div key={i} className="text-sm bg-white rounded-md p-2 border border-gray-100">• {p}</div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto">
                          <h5 className="text-sm font-semibold text-[#0F0F1A] mb-3">Por qué esta carrera es genial</h5>
                          <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                            {careerExtras[index].why.map((w, i) => (
                              <li key={i}>{w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NUEVA SECCIÓN: Conoce a los Profesionales (formato Orientación Vocacional) */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Conoce a los Profesionales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escucha sus historias, aprende de sus experiencias y descubre cómo llegaron donde están
            </p>
          </div>

          {/* Grid de Profesionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {professionals.map((prof) => (
              <div
                key={prof.id}
                onClick={() => setSelectedProfessional(prof)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Imagen con overlay de play */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-60"
                      style={{ background: prof.gradient }}
                    />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                        <PlayCircle className="w-8 h-8" style={{ color: prof.accentColor }} />
                      </div>
                    </div>
                    {/* Badge de campo */}
                    <div className="absolute top-4 left-4">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                        style={{ backgroundColor: `${prof.accentColor}40` }}
                      >
                        {prof.field}
                      </span>
                    </div>
                  </div>

                  {/* Info del profesional */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{prof.name}</h3>
                    <p className="text-sm font-medium mb-2" style={{ color: prof.accentColor }}>
                      {prof.role}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">{prof.company}</p>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {prof.bio}
                    </p>
                    
                    {/* CTA */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: prof.accentColor }}>
                      <span>Ver su historia</span>
                      <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL DE VIDEO (formato Orientación Vocacional) */}
        {selectedProfessional && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl mx-auto">
              {/* Botón de cerrar */}
              <button
                onClick={() => setSelectedProfessional(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Contenedor del video */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Video */}
                  <div className="md:col-span-3 bg-black">
                    <video
                      controls
                      autoPlay
                      className="w-full h-full"
                      src={selectedProfessional.videoSrc}
                    >
                      Tu navegador no soporta el elemento de video.
                    </video>
                  </div>

                  {/* Información del profesional */}
                  <div className="md:col-span-2 p-8" style={{ background: selectedProfessional.gradient }}>
                    <div className="h-full flex flex-col text-white">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={selectedProfessional.image}
                            alt={selectedProfessional.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
                          />
                          <div>
                            <h3 className="text-2xl font-bold">{selectedProfessional.name}</h3>
                            <p className="text-white/90 text-sm">{selectedProfessional.role}</p>
                          </div>
                        </div>
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {selectedProfessional.company}
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="flex-grow mb-6">
                        <h4 className="text-lg font-semibold mb-3">Su Historia</h4>
                        <p className="text-white/90 leading-relaxed">
                          {selectedProfessional.bio}
                        </p>
                      </div>

                      {/* Campo */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-xs uppercase tracking-wide mb-1 text-white/70">Especialización</p>
                        <p className="font-semibold">{selectedProfessional.field}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Banner: Animated gradient, icons, rotating text */}
        <div className="mb-16">
          <div
            className="relative overflow-hidden rounded-2xl max-w-6xl mx-auto p-8 md:p-12 text-white shadow-xl animate-gradient"
            style={{ background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #2DD4BF 100%)' }}
          >
            {/* floating decorative icons */}
            <div className="absolute left-8 top-6 opacity-70 float-slow">
              <Rocket className="w-6 h-6 text-white/90" />
            </div>
            <div className="absolute right-12 top-16 opacity-60 float-slow">
              <Laptop className="w-7 h-7 text-white/90" />
            </div>
            <div className="absolute left-24 bottom-8 opacity-50 float-slow">
              <Settings className="w-6 h-6 text-white/80" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeInUp">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Tu futuro no se descubre… ¡se crea! ✨</h2>
                <p className="text-lg opacity-95 mb-6">Explora carreras reales y empieza a construir lo que imaginas.</p>

                <div className="flex items-center gap-4">
                  <Link to="/modulos" className="inline-block">
                    <button className="bg-white text-[#2563EB] font-semibold px-6 py-3 rounded-lg shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                      Explorar Carreras
                    </button>
                  </Link>
                  <div className="text-sm text-white/95">
                    <span className="font-semibold">{rotatingPhrases[phraseIndex]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                {/* subtle illustration */}
                <div className="w-40 h-40 rounded-lg bg-white/10 flex items-center justify-center">
                  <Compass className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Profesionales de Referencia
            </h3>
            <p className="text-gray-600">
              Conoce a los expertos que representan cada especialización
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((career, index) => (
              <div key={index} className={`bg-white p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border ${career.borderColor} group`}>
                <img 
                  src={career.testimonial.image} 
                  alt={career.testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200 transition-transform duration-300 group-hover:scale-105"
                />
                <h4 className="font-semibold text-gray-900 text-center mb-1">{career.testimonial.name}</h4>
                <p className="text-sm text-gray-600 text-center mb-3">{career.testimonial.role}</p>
                <p className="text-xs text-gray-500 text-center font-medium">{career.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estudiantes;
