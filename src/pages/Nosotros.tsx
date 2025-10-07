import React, { useEffect, useState, useRef } from 'react';
import { Heart, Target, Users, Award, Lightbulb, Globe, Code, X, Send, Check } from 'lucide-react';

// ====================================================================
// Lógica del Intersection Observer (Función reutilizable)
// ====================================================================
// Custom Hook para detectar cuando un elemento entra en el viewport
const useIntersect = (root = null, rootMargin = '0px', threshold = 0.1) => {
    const [entry, setEntry] = useState({});
    const [node, setNode] = useState(null);

    useEffect(() => {
        if (node) {
            // Configuración del observador: qué hacer cuando intersecta
            const observer = new IntersectionObserver(([currentEntry]) => {
                setEntry(currentEntry);
            }, { root, rootMargin, threshold });

            observer.observe(node);

            // Limpieza al desmontar
            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [node, root, rootMargin, threshold]);

    // setNode es la función ref que se asigna al elemento HTML
    // entry.isIntersecting es el valor booleano que indica visibilidad
    return [setNode, entry.isIntersecting];
};

// ====================================================================
// COMPONENTE MODAL DE MENTORÍA (Actualizado con lógica de nombre y opciones)
// ====================================================================
const MentorModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('info'); // 'info', 'form', 'success'
    const [formData, setFormData] = useState({ name: '', email: '', area: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reiniciar estado y formulario solo cuando 'isOpen' cambia a falso (cierre)
    useEffect(() => {
        if (!isOpen) {
            setStep('info');
            setFormData({ name: '', email: '', area: '' });
            setIsSubmitting(false);
        }
    }, [isOpen]);

    // Ahora es seguro salir temprano, ya que todos los hooks han sido llamados.
    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulación de envío de datos
        setTimeout(() => {
            console.log('Datos del mentor enviados:', formData);
            setIsSubmitting(false);
            // Transicionar a la pantalla de éxito
            setStep('success');
        }, 1500);
    };
    
    // Función para obtener solo el primer nombre
    const getFirstName = (fullName) => {
        if (!fullName) return '';
        // Divide por espacios y toma el primer elemento
        return fullName.trim().split(/\s+/)[0];
    };


    // Renderizado condicional del cuerpo del modal
    const renderContent = () => {
        switch (step) {
            case 'info':
                return (
                    <>
                        {/* Encabezado */}
                        <div className="text-center mb-6">
                            <Users className="w-12 h-12 mx-auto mb-3 text-teal-600 p-1 bg-teal-100 rounded-full" />
                            <h3 className="text-3xl font-bold text-gray-800">
                                Conviértete en Mentor
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Impacta, guía y sé parte del futuro STEM de la región.
                            </p>
                        </div>

                        {/* Descripción del Rol */}
                        <div className="space-y-4 text-gray-700">
                            <h4 className="text-xl font-semibold text-teal-600 border-b pb-2">
                                ¿Qué significa ser Mentor en SumaqTech?
                            </h4>
                            <p>
                                Ser mentor es ser un <strong>faro de conocimiento</strong> para jóvenes que inician su camino en las carreras <strong>STEM</strong>. No se trata de dar clases, sino de compartir tu experiencia real, ofrecer consejos de carrera y guiar proyectos prácticos.
                            </p>
                            
                            <div className="mt-4 pl-4 space-y-3">
                                <div className="text-base">
                                    <span className="font-bold text-teal-700">Impacto Directo:</span> Ayudarás a estudiantes a tomar decisiones cruciales para su futuro.
                                </div>
                                <div className="text-base">
                                    <span className="font-bold text-teal-700">Compromiso Flexible:</span> Acuerdas el tiempo y la frecuencia de tus mentorías según tu disponibilidad.
                                </div>
                                <div className="text-base">
                                    <span className="font-bold text-teal-700">Reconocimiento:</span> Serás parte de una red de profesionales apasionados y recibirás un certificado de impacto.
                                </div>
                            </div>
                        </div>

                        {/* Botón de Acción Principal (Ir al Formulario) */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setStep('form')}
                                className="bg-teal-600 text-white font-bold px-8 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg shadow-teal-300 transform hover:scale-[1.02]"
                            >
                                Comenzar Solicitud
                            </button>
                        </div>
                    </>
                );

            case 'form':
                return (
                    <form onSubmit={handleSubmit}>
                        {/* Encabezado del Formulario */}
                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold text-gray-800">
                                Postulación
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Cuéntanos sobre ti y tu área de expertise.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Campo Nombre */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                                    placeholder="Ej: Sofía Quispe"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Campo Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                                    placeholder="ejemplo@profesional.com"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Campo Área de Expertise (Actualizado: Flecha en el campo) */}
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                                    Área de Expertise
                                </label>
                                <select
                                    id="area"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-teal-500 focus:border-teal-500 transition shadow-sm appearance-none"
                                    disabled={isSubmitting}
                                >
                                    {/* Aquí se añade la flecha al texto de la opción por defecto */}
                                    <option value="" disabled>▼ Selecciona un área de Expertise</option>
                                    {/* Opciones generalizadas */}
                                    <option value="Tecnología y Desarrollo de Software">Tecnología y Desarrollo de Software</option>
                                    <option value="Ciencia de Datos y Análisis Empresarial">Ciencia de Datos y Análisis Empresarial</option>
                                    <option value="Ingeniería y Hardware">Ingeniería y Hardware</option>
                                    <option value="Diseño, UX/UI y Multimedia">Diseño, UX/UI y Multimedia</option>
                                    <option value="Gestión de Proyectos y Liderazgo">Gestión de Proyectos y Liderazgo</option>
                                    <option value="Marketing y Comunicación Digital">Marketing y Comunicación Digital</option>
                                    <option value="Finanzas y Negocios">Finanzas y Negocios</option>
                                    <option value="Otras áreas STEM/STEAM">Otras áreas STEM/STEAM</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Botón de Enviar */}
                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                className={`w-full font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg transform hover:scale-[1.01] flex items-center justify-center ${
                                    isSubmitting 
                                        ? 'bg-teal-400 text-white cursor-not-allowed' 
                                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-300'
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Enviar Postulación
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep('info')}
                                className="mt-3 text-teal-600 hover:text-teal-800 text-sm"
                                disabled={isSubmitting}
                            >
                                Volver a la información
                            </button>
                        </div>
                    </form>
                );

            case 'success':
                const firstName = getFirstName(formData.name);
                return (
                    <div className="text-center py-10">
                        <Check className="w-16 h-16 mx-auto mb-4 text-green-500 p-2 bg-green-100 rounded-full" />
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">
                            ¡Postulación Enviada!
                        </h3>
                        {/* El primer nombre, el área y el email aparecen en negrita */}
                        <p className="text-gray-600 mb-6">
                            Gracias por tu interés, <span className="font-bold text-gray-800">{firstName}</span>. Hemos recibido tu solicitud de mentoría en el área de <span className="font-bold text-teal-600">{formData.area}</span>.
                        </p>
                        <p className="text-gray-600">
                            Nuestro equipo revisará tu perfil y te contactará pronto a través de tu correo electrónico (<span className="font-bold text-teal-700">{formData.email}</span>).
                        </p>

                        {/* Botón de Cierre */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={onClose}
                                className="bg-teal-600 text-white font-bold px-8 py-3 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg shadow-teal-300 transform hover:scale-[1.02]"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        // Overlay (Fondo oscuro)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 transition-opacity duration-300 backdrop-blur-sm" onClick={onClose}>
            
            {/* Contenido del Modal */}
            <div 
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100 relative"
                onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal
            >
                {/* Botón de Cierre (Visible en todos los pasos) */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
                    aria-label="Cerrar ventana"
                    disabled={isSubmitting}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Renderizado del contenido basado en el paso actual */}
                {renderContent()}
            </div>
        </div>
    );
};

// ====================================================================
// COMPONENTE PRINCIPAL (Nosotros)
// ====================================================================
const Nosotros = () => {
  
  // --- Estado del Modal ---
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  
  // INYECCIÓN DINÁMICA DE LA FUENTE POOPINS
  useEffect(() => {
    const fontLink = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap';
    
    if (!document.querySelector(`link[href="${fontLink}"]`)) {
      const link = document.createElement('link');
      link.href = fontLink;
      link.rel = 'stylesheet';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }, []);
  
  // --- Refs y Visibilidad para Animaciones (Scroll Reveal) ---
  const [historyRef, historyVisible] = useIntersect(null, '0px', 0.2);
  const [purposeRef, purposeVisible] = useIntersect(null, '0px', 0.2);
  const [impactRef, impactVisible] = useIntersect(null, '0px', 0.2);
  const [valuesRef, valuesVisible] = useIntersect(null, '0px', 0.2);
  const [teamRef, teamVisible] = useIntersect(null, '0px', 0.2);
  const [ctaRef, ctaVisible] = useIntersect(null, '0px', 0.2);
  
  // --- DATOS DEL STEPPER ---
  const heroValues = [
    { title: 'Futuro Tech', subtitle: 'Explora +10 carreras STEM.', icon: <Lightbulb className="w-6 h-6 text-teal-600" /> }, 
    { title: 'Mentoría 1 a 1', subtitle: 'Conéctate con profesionales.', icon: <Users className="w-6 h-6 text-teal-600" /> }, 
    { title: 'Contenido Práctico', subtitle: 'Aprende con proyectos reales.', icon: <Code className="w-6 h-6 text-teal-600" /> }, 
    { title: 'Gratuito', subtitle: 'Educación de calidad sin costo.', icon: <Award className="w-6 h-6 text-teal-600" /> }, 
  ];

  // --- DATOS DE IMPACTO (Sin cambios) ---
  const stats = [
    { number: '10,000+', label: 'Estudiantes activos' },
    { number: '500+', label: 'Mentorías realizadas' },
    { number: '15+', label: 'Módulos disponibles' },
    { number: '95%', label: 'Tasa de satisfacción' }
  ];

  // --- DATOS DEL EQUIPO (Sin cambios) ---
  const team = [
    {
      name: 'Arianna Yauri',
      role: 'Fundadora & CEO',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Ingeniera de Software con pasión por la educación tecnológica',
      quote: 'Creemos que la curiosidad es el punto de partida para el futuro STEM, y nuestro trabajo es iluminar ese camino.' 
    },
    {
      name: 'Fernando Flores',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Experto en desarrollo de plataformas educativas y arquitectura de software',
      quote: 'Diseñamos la plataforma para ser intuitiva, robusta y, sobre todo, inspiradora.'
    },
    {
      name: 'María Evangelista',
      role: 'Head of Content',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Especialista en diseño curricular y metodologías de aprendizaje',
      quote: 'Cada módulo se enfoca en el "hacer". No solo enseñamos, construimos el futuro con cada proyecto.'
    },
    {
      name: 'Alisson Cabrera',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Constructor de comunidades tech y mentor de estudiantes',
      quote: 'La comunidad es nuestro motor. Aquí, nadie se queda atrás, todos avanzamos juntos.'
    }
  ];

  // --- DATOS DE VALORES (Sin cambios) ---
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Pasión por la Educación',
      description: 'Creemos que la educación es el motor del cambio y el desarrollo personal.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Enfoque Práctico',
      description: 'Nuestro contenido está diseñado para aplicarse directamente en el mundo real.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Comunidad Inclusiva',
      description: 'Fomentamos un ambiente donde todos pueden aprender y crecer juntos.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovación Continua',
      description: 'Siempre estamos explorando nuevas formas de mejorar el aprendizaje.'
    }
  ];
  
  // --- ESTADO Y LÓGICA PARA TARJETAS DEL EQUIPO EXPANDIBLES ---
  const [expandedMember, setExpandedMember] = useState(null);

  // Función para alternar la expansión de la tarjeta
  const toggleExpand = (name) => {
      setExpandedMember(expandedMember === name ? null : name);
  };
  
  // --- ESTADO Y LÓGICA DEL STEPPER ---
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const goToNextStep = () => { setCurrentStepIndex(prevIndex => (prevIndex + 1) % heroValues.length); };
  useEffect(() => {
    const intervalId = setInterval(goToNextStep, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroValues.length]); 

  // --- Lógica del Carrusel de Impacto (Sin cambios) ---
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStatIndex(prevIndex => (prevIndex + 1) % stats.length);
    }, 4000); 
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.length]); 
  const currentStat = stats[currentStatIndex];
  
  // Componente Custom para el Mockup de Tablet (Con colores actualizados)
  const Laptop3D = () => {
      const screenContent = (
          <div className="p-4 flex flex-col h-full bg-white text-gray-800 rounded-2xl shadow-inner border border-gray-100"> 
              <header className="flex items-center justify-between p-1 mb-4">
                  <div className="flex items-center">
                      <Lightbulb className="w-5 h-5 text-teal-600 mr-1" />
                      <span className="text-sm font-extrabold text-teal-600">SumaqTech</span>
                  </div>
                  <div className="w-5 h-5 bg-gray-300 rounded-full border border-teal-400"></div>
              </header>
              <div className="flex-grow flex flex-col items-center justify-start py-4 space-y-5">
                  <div className="relative w-full px-1">
                      <input 
                          type="text" 
                          placeholder="Descubre tu futuro STEM" 
                          className="w-full p-3 pl-10 bg-gray-100 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500 transition shadow-md text-gray-800" 
                          readOnly
                      />
                      <Target className="w-4 h-4 text-teal-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {/* Título "Explora Carreras" centrado */}
                  <h4 className="text-lg font-bold text-gray-700 mt-4 self-center px-2">
                      Explora Carreras
                  </h4>
                  {/* === Íconos separados y centrados individualmente === */}
                  <div className="w-full flex justify-around items-center px-4 pt-2">
                      
                      {/* Tecnología: ORANGE (Naranja) */}
                      <div className="text-center group cursor-pointer flex-1 min-w-0 mx-1 flex flex-col items-center">
                          <div className="p-3 bg-orange-100 rounded-2xl mx-auto w-14 h-14 flex items-center justify-center mb-1 text-orange-600 ring-2 ring-orange-300 transition group-hover:bg-orange-200">
                              <Code className="w-6 h-6" />
                          </div>
                          <span className="text-xs text-gray-700 font-medium">Tecnología</span>
                      </div>
                      
                      {/* Ciencias: TEAL (Verde principal) */}
                      <div className="text-center group cursor-pointer flex-1 min-w-0 mx-1 flex flex-col items-center">
                          <div className="p-3 bg-teal-100 rounded-2xl mx-auto w-14 h-14 flex items-center justify-center mb-1 text-teal-600 ring-2 ring-teal-300 transition group-hover:bg-teal-200">
                              <Globe className="w-6 h-6" />
                          </div>
                          <span className="text-xs text-gray-700 font-medium">Ciencias</span>
                      </div>
                      
                      {/* Matemáticas: INDIGO (Azul/Morado) */}
                      <div className="text-center group cursor-pointer flex-1 min-w-0 mx-1 flex flex-col items-center">
                          <div className="p-3 bg-indigo-100 rounded-2xl mx-auto w-14 h-14 flex items-center justify-center mb-1 text-indigo-600 ring-2 ring-indigo-300 transition group-hover:bg-indigo-200">
                              <Award className="w-6 h-6" /> 
                          </div>
                          <span className="text-xs text-gray-700 font-medium">Matemáticas</span>
                      </div>
                  </div>
                  {/* ============================================================= */}
              </div>
              <div className="w-1/3 h-1 bg-gray-300 mx-auto rounded-full mt-4"></div>
          </div>
      );
      return (
          <div className="tablet-mockup relative mx-auto w-64 h-96 md:w-80 md:h-[480px] my-10 bg-gray-900 rounded-[3rem] shadow-2xl shadow-teal-300 p-3 border-[10px] border-gray-700 transition-transform duration-500 hover:scale-[1.05]">
              <div className="absolute top-16 -right-[15px] w-1 h-8 bg-gray-700 rounded-md"></div>
              <div className="absolute top-32 -right-[15px] w-1 h-12 bg-gray-700 rounded-md space-y-1">
                <div className="h-5 bg-gray-600 rounded-sm"></div>
                <div className="h-5 bg-gray-600 rounded-sm"></div>
              </div>
              <div className="w-full h-full rounded-2xl overflow-hidden">
                {screenContent}
              </div>
          </div>
      );
  };


  return (
    <div className="min-h-screen font-['Poppins']">
      
      {/* 1. Modal de Mentoría (Renderizado condicional) */}
      <MentorModal isOpen={isMentorModalOpen} onClose={() => setIsMentorModalOpen(false)} />

      {/* Sección Hero: Introducción con Horizontal Story Stepper */}
      <section className="bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center"> {/* Estructura centrada restaurada */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
            <span className="text-teal-500">Sobre</span> <span className="text-teal-500">SumaqTech</span>
          </h1>
          <p className="text-lg leading-snug text-gray-700 mb-12 max-w-3xl mx-auto">
            Una comunidad creada por estudiantes para estudiantes, donde aprender tecnología es gratis, fácil y emocionante.
          </p>
          
          {/* Story Stepper Container - h-96 y w-full para aprovechar el ancho */}
          <div 
              className="flex justify-center h-96 relative overflow-hidden rounded-2xl shadow-2xl mx-auto w-full cursor-pointer border border-teal-200"
              onClick={goToNextStep} // Permite avanzar al hacer clic
          >
              
              {/* Barra de Progreso (Timeline) */}
              <div className="absolute top-0 left-0 right-0 z-20 flex p-2 space-x-1">
                  {heroValues.map((_, index) => (
                      <div key={index} className="flex-1 h-1 rounded-full bg-gray-900 bg-opacity-30 overflow-hidden">
                          <div 
                              className="h-full bg-teal-600 transition-all duration-300 ease-linear"
                              style={{ width: index < currentStepIndex ? '100%' : '0%' }}
                          >
                              {index === currentStepIndex && (
                                  <div className="h-full bg-teal-600" 
                                      key={currentStepIndex} 
                                      style={{ animation: 'progress 5s linear forwards' }}
                                  ></div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Contenido del Stepper */}
              <div className="absolute inset-0 z-10">
                  {heroValues.map((item, index) => {
                      // Lógica de transición (Horizontal: translateX)
                      let transform;
                      let transitionDuration = 'duration-500';
                      let opacity = 0;
                      let zIndex;

                      if (index === currentStepIndex) { transform = 'translateX(0%)'; opacity = 1; zIndex = 10; transitionDuration = 'duration-500'; } 
                      else if (index === (currentStepIndex + 1) % heroValues.length) { transform = 'translateX(100%)'; opacity = 1; zIndex = 9; transitionDuration = 'duration-0'; } 
                      else if (index === (currentStepIndex - 1 + heroValues.length) % heroValues.length) { transform = 'translateX(-100%)'; opacity = 0; zIndex = 8; transitionDuration = 'duration-500'; } 
                      else { transform = 'translateX(100%)'; opacity = 0; zIndex = 7; transitionDuration = 'duration-0'; }
                      
                      return (
                          <div
                              key={index}
                              className={`absolute inset-0 flex flex-col justify-center items-center p-8 transition-all ease-in-out ${transitionDuration} text-gray-800 bg-white/90 backdrop-blur-sm`}
                              style={{ transform: transform, opacity: opacity, zIndex: zIndex, pointerEvents: index === currentStepIndex ? 'auto' : 'none' }}
                          >
                              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-teal-100 ring-4 ring-teal-300">
                                  {item.icon}
                              </div>
                              <h3 className="text-3xl font-bold mb-2 text-center leading-snug">{item.title}</h3>
                              <p className="text-lg font-medium text-center opacity-90 text-gray-600">{item.subtitle}</p>
                          </div>
                      );
                  })}
              </div>
          </div>

          {/* Divisor Teal */}
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mt-10"></div>
        </div>
      </section>

      {/* Custom CSS (Animaciones) */}
      <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
            @keyframes fadeInOut {
              0% { opacity: 0; transform: translateY(10px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-10px); }
            }
            .animate-fadeInOut {
              animation: fadeInOut 4s linear infinite;
            }
            /* Animación de Revelación al Desplazar (Scroll Reveal) */
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fade-in-up {
                animation: fadeInUp 1s ease-out forwards;
            }
            .invisible-init {
                opacity: 0;
                transform: translateY(50px);
            }
            .tablet-mockup {
                transform: none; 
            }
          `
      }} />

      {/* Sección Nuestra Historia */}
      <section 
        className={`py-20 px-4 bg-white invisible-init ${historyVisible ? 'fade-in-up' : ''}`}
        ref={historyRef}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-left mb-12 border-b-2 border-teal-200 pb-2">
            Nuestra Historia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto de la Historia */}
            <div className="order-2 md:order-1">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                SumaqTech nació en 2025, cuando un grupo de estudiantes universitarios se dio cuenta de algo: en la escuela nos enseñan muchas cosas, pero casi nunca lo que realmente necesitas para entrar y destacar en el mundo de la tecnología.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nosotros también pasamos por esa etapa de dudas: ¿qué carrera elegir?, ¿qué significa <span className="font-bold">STEM</span>?, ¿de verdad puedo dedicarme a esto? Y lo más difícil… no tener a alguien que ya hubiera recorrido ese camino para guiarnos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Por eso decidimos crear la plataforma que nos hubiera encantado tener: un espacio donde aprender tecnología de forma práctica, conocer mentores reales que te entienden, y descubrir paso a paso que futuro quieres construir en el mundo <span className="font-bold">STEM</span>.
              </p>
            </div>
            {/* Mockup de Laptop 3D */}
            <div className="flex justify-center order-1 md:order-2">
              <Laptop3D /> 
            </div>
          </div>
        </div>
      </section>
      
      {/* Separador visual */}
      <hr className="max-w-6xl mx-auto border-t border-teal-100" />
      
      {/* Sección Misión y Visión - APLICACIÓN DEL SCROLL REVEAL */}
      <section 
        className={`bg-gray-50 w-full py-20 px-4 invisible-init ${purposeVisible ? 'fade-in-up' : ''}`}
        ref={purposeRef}
      >
        <div className="max-w-6xl mx-auto">
          {/* Divisor */}
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div> 
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">
            Propósito y Alcance
          </h2>
          
          {/* Misión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 p-6 bg-white rounded-3xl shadow-lg hover:shadow-teal-200 transition-shadow">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold mb-6 flex items-center text-teal-600">
                <Target className="w-8 h-8 mr-3 p-1 rounded-full bg-teal-100" />
                Nuestra Misión
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestra misión es <span className="font-bold">democratizar</span> el acceso al futuro STEM en América Latina. Empoderamos a estudiantes de secundaria y preuniversitarios, ofreciéndoles mentoría práctica y recursos reales para que puedan convertir la curiosidad en una carrera y tomen decisiones profesionales con total confianza.
              </p>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <img
                src="https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Estudiantes trabajando juntos"
                className="w-full max-w-sm h-72 object-cover rounded-xl shadow-xl"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x288/e0f2f7/0d9488?text=Misión+STEM'; }}
              />
            </div>
          </div>

          {/* Visión */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-teal-200 transition-shadow">
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Personas en un mapa global"
                className="w-full max-w-sm h-72 object-cover rounded-xl shadow-xl"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x288/e0f2f7/0d9488?text=Visión+Global'; }}
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center text-teal-600">
                <Globe className="w-8 h-8 mr-3 p-1 rounded-full bg-teal-100" />
                Nuestra Visión
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ser el <span className="font-bold">catalizador</span> del talento joven en Latinoamérica. Visualizamos una región donde SumaqTech es el puente esencial que conecta a cada estudiante con una red de profesionales, asegurando que sean los creadores y protagonistas del próximo gran avance tecnológico global.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separador visual */}
      <hr className="max-w-6xl mx-auto border-t border-teal-100" />

      {/* Sección de Estadísticas (Impacto) - APLICACIÓN DEL SCROLL REVEAL */}
      <section 
        className={`py-20 px-4 bg-white invisible-init ${impactVisible ? 'fade-in-up' : ''}`}
        ref={impactRef}
      >
        <div className="max-w-6xl mx-auto">
          {/* Divisor */}
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nuestro Impacto <span className="text-teal-500">(¡Mira nuestras cifras!)</span>
          </h2>
          
          {/* Contenedor del Carrusel */}
          <div className="relative h-40 flex items-center justify-center overflow-hidden bg-teal-50 rounded-xl shadow-lg border-2 border-teal-200">
            {/* Elemento de la estadística actual */}
            <div
              key={currentStatIndex} 
              className="absolute p-6 text-center animate-fadeInOut"
            >
              <div className="text-6xl font-extrabold text-teal-600 mb-2 leading-none">
                {currentStat.number}
              </div>
              <div className="text-gray-700 font-medium text-xl md:text-2xl mt-2">
                {currentStat.label}
              </div>
            </div>
          </div>

          {/* Indicadores y Navegación del Carrusel */}
          <div className="flex justify-center mt-6 space-x-3">
            {stats.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStatIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentStatIndex ? 'bg-teal-600 w-4 h-4' : 'bg-gray-300'
                }`}
                aria-label={`Mostrar estadística ${index + 1}`}
              />
            ))}
          </div>
          
        </div>
      </section>

      {/* Separador visual */}
      <hr className="max-w-6xl mx-auto border-t border-teal-100" />

      {/* Sección de Valores - APLICACIÓN DEL SCROLL REVEAL */}
      <section 
        className={`py-20 px-4 bg-gray-50 invisible-init ${valuesVisible ? 'fade-in-up' : ''}`}
        ref={valuesRef}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 ring-2 ring-teal-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separador visual */}
      <hr className="max-w-6xl mx-auto border-t border-teal-100" />

      {/* Sección del Equipo - TARJETAS INTERACTIVAS Y SCROLL REVEAL */}
      <section 
        className={`py-20 px-4 bg-white invisible-init ${teamVisible ? 'fade-in-up' : ''}`}
        ref={teamRef}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Conoce a Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                // Clase condicional para la expansión y estilo interactivo
                className={`bg-gray-50 rounded-xl shadow-xl p-6 text-center transition-all duration-500 transform border-t-8 border-teal-500 cursor-pointer 
                    ${expandedMember === member.name 
                        ? 'scale-[1.05] shadow-2xl shadow-teal-300' 
                        : 'hover:scale-[1.03] hover:shadow-teal-300'
                    }
                `}
                onClick={() => toggleExpand(member.name)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover ring-4 ring-teal-400 ring-offset-2"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/112x112/ccc/333?text=${member.name.split(' ')[0][0]}${member.name.split(' ')[1][0]}`; }}
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-semibold mb-3 text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm italic leading-relaxed">{member.description}</p>
                
                {/* Contenido Expandido: Cita del miembro */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedMember === member.name ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <p className="text-gray-800 border-t border-teal-200 pt-3 text-base font-medium">
                        <span className="text-teal-500 text-2xl font-serif">"</span>{member.quote}<span className="text-teal-500 text-2xl font-serif">"</span>
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA (Llamada a la Acción) */}
      <section 
        className={`py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-700 invisible-init ${ctaVisible ? 'fade-in-up' : ''}`}
        ref={ctaRef}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-4xl font-extrabold mb-4">
            Únete a Nuestra Misión
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
            Ayúdanos a transformar la educación tecnológica y a crear oportunidades reales para la próxima generación de líderes en STEM.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            
            <button className="bg-white text-teal-600 font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl">
              ¡Quiero Aprender!
            </button>
            
            {/* Botón para abrir el Modal de Mentoría */}
            <button 
                onClick={() => setIsMentorModalOpen(true)}
                className="bg-transparent border-2 border-white text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-cyan-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Conviértete en Mentor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
