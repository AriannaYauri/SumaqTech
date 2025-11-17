import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Globe, Shield, CheckCircle, Send, Compass, Target, Network, ChevronDown, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react';

interface FormData {
  institucionType: string;
  institucionName: string;
  ciudad: string;
  pais: string;
  webSite: string;
  responsableName: string;
  responsableRole: string;
  responsableEmail: string;
  responsablePhone: string;
  menoriaDescription: string;
  areaInteres: string;
  modalidad: string;
  confirmacion: boolean;
}

const Mentorias: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    institucionType: '',
    institucionName: '',
    ciudad: '',
    pais: '',
    webSite: '',
    responsableName: '',
    responsableRole: '',
    responsableEmail: '',
    responsablePhone: '',
    menoriaDescription: '',
    areaInteres: '',
    modalidad: '',
    confirmacion: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [faqOpenId, setFaqOpenId] = useState<number | null>(null);
  const [mentorCarouselIndex, setMentorCarouselIndex] = useState(0);
  const [isMentorAutoPlaying, setIsMentorAutoPlaying] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  const [testimonialCarouselIndex, setTestimonialCarouselIndex] = useState(0);
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; index: number } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.institucionType ||
      !formData.institucionName ||
      !formData.responsableName ||
      !formData.responsableEmail ||
      !formData.confirmacion
    ) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    setSubmitted(true);
    console.log('Formulario enviado:', formData);
    setTimeout(() => {
      setFormData({
        institucionType: '',
        institucionName: '',
        ciudad: '',
        pais: '',
        webSite: '',
        responsableName: '',
        responsableRole: '',
        responsableEmail: '',
        responsablePhone: '',
        menoriaDescription: '',
        areaInteres: '',
        modalidad: '',
        confirmacion: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('formulario-mentorias');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Datos para las secciones
  const objetivos = [
    {
      id: 1,
      title: 'Fomentar vocación científica',
      description: 'Fomentar vocación científica en estudiantes de secundaria.',
      icon: Target,
      color: 'teal',
    },
    {
      id: 2,
      title: 'Reducir brecha de información',
      description: 'Reducir la brecha de información sobre carreras STEM.',
      icon: Users,
      color: 'cyan',
    },
    {
      id: 3,
      title: 'Conectar instituciones',
      description: 'Conectar instituciones educativas con mentores capacitados.',
      icon: Network,
      color: 'blue',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: '¿Las mentorías tienen costo?',
      answer: 'Las mentorías SumaqTech son completamente gratuitas para instituciones educativas acreditadas. Nuestro objetivo es democratizar el acceso a la orientación STEM y apoyar a estudiantes en su desarrollo vocacional.',
    },
    {
      id: 2,
      question: '¿Cómo verifican que la institución sea acreditada?',
      answer: 'Nuestro equipo realiza una verificación exhaustiva de los datos proporcionados, incluyendo la validación de documentos institucionales, registro educativo y contacto directo con las autoridades de la institución. Este proceso garantiza la seguridad y legitimidad de cada solicitud.',
    },
    {
      id: 3,
      question: '¿Cuánto dura cada sesión?',
      answer: 'La duración de cada sesión varía según el tipo de mentoría solicitada. Generalmente, las charlas motivacionales duran entre 45-60 minutos, mientras que los talleres prácticos pueden extenderse de 1.5 a 2 horas. Todo se coordina previamente según las necesidades de tu institución.',
    },
    {
      id: 4,
      question: '¿Qué áreas cubren las mentorías?',
      answer: 'Cubrimos todas las áreas STEM: Ingeniería de Software, Ciencia de Datos, Mecatrónica, Ingeniería Ambiental, Física, Matemáticas, y más. También ofrecemos orientación vocacional general para ayudar a estudiantes a descubrir su camino en las ciencias y tecnología.',
    },
  ];

  const testimonials = [
    {
      id: 1,
      institution: 'Colegio San José',
      testimonial: 'Las mentorías de SumaqTech transformaron la perspectiva de nuestros estudiantes sobre las carreras STEM. Los chicos ahora tienen una visión clara de su futuro profesional.',
      image: 'https://images.pexels.com/photos/159832/book-cover-table-school-reading-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Orientación Vocacional STEM',
      mentor: 'Carlos Mendoza',
      duracion: '2 horas',
      estudiantes: 45,
      modalidad: 'Presencial',
      descripcion: 'Se realizó una sesión de orientación vocacional enfocada en carreras STEM para estudiantes de 4° y 5° de secundaria. El mentor Carlos Mendoza compartió su experiencia en Ingeniería de Software, realizó actividades prácticas de programación básica y respondió preguntas sobre el mercado laboral.',
      sessionPhotos: [
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 2,
      institution: 'Instituto Técnico Lima',
      testimonial: 'Excelente experiencia. Nuestros estudiantes quedaron motivados y con ganas de explorar más sobre ingeniería y tecnología. El mentor fue muy profesional y didáctico.',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Taller de Mecatrónica',
      mentor: 'Luis Fernández',
      duracion: '3 horas',
      estudiantes: 30,
      modalidad: 'Presencial',
      descripcion: 'Taller práctico sobre sistemas automatizados y robótica industrial. El mentor Luis Fernández demostró el funcionamiento de robots educativos, explicó conceptos de mecatrónica y guió a los estudiantes en la construcción de un pequeño proyecto.',
      sessionPhotos: [
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 3,
      institution: 'Academia Científica del Norte',
      testimonial: 'La sesión superó nuestras expectativas. Los estudiantes participaron activamente y mostraron gran interés. Definitivamente solicitaremos más mentorías.',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Charla sobre Ciencia de Datos',
      mentor: 'Ana Rodríguez',
      duracion: '1.5 horas',
      estudiantes: 60,
      modalidad: 'Virtual',
      descripcion: 'Charla motivacional sobre Ciencia de Datos y sus aplicaciones en el mundo real. La mentor Ana Rodríguez explicó cómo se usa el machine learning en diferentes industrias, mostró ejemplos prácticos de análisis de datos y compartió su trayectoria profesional.',
      sessionPhotos: [
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 4,
      institution: 'Colegio Los Andes',
      testimonial: 'Una experiencia increíble que abrió los ojos de nuestros estudiantes a las posibilidades en tecnología. El mentor fue excepcional.',
      image: 'https://images.pexels.com/photos/159832/book-cover-table-school-reading-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Ingeniería de Software',
      mentor: 'Carlos Mendoza',
      duracion: '2.5 horas',
      estudiantes: 52,
      modalidad: 'Presencial',
      descripcion: 'Sesión práctica sobre desarrollo de software donde los estudiantes aprendieron conceptos básicos de programación y crearon su primera aplicación web simple.',
      sessionPhotos: [
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 5,
      institution: 'Instituto Tecnológico Sur',
      testimonial: 'Los estudiantes quedaron fascinados con la robótica. Ahora muchos quieren estudiar mecatrónica gracias a esta mentoría.',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Robótica y Automatización',
      mentor: 'Luis Fernández',
      duracion: '4 horas',
      estudiantes: 28,
      modalidad: 'Presencial',
      descripcion: 'Taller intensivo de robótica donde los estudiantes construyeron y programaron sus propios robots, aprendiendo sobre sensores, actuadores y controladores.',
      sessionPhotos: [
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 6,
      institution: 'Academia Innovación Educativa',
      testimonial: 'La sesión virtual fue perfecta. Nuestros estudiantes de diferentes ciudades pudieron participar y aprender sobre ciencia de datos.',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Ciencia de Datos Aplicada',
      mentor: 'Ana Rodríguez',
      duracion: '2 horas',
      estudiantes: 75,
      modalidad: 'Virtual',
      descripcion: 'Charla interactiva sobre ciencia de datos con demostraciones en vivo de análisis de datos reales y casos de uso en diferentes industrias.',
      sessionPhotos: [
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 7,
      institution: 'Colegio Técnico Nacional',
      testimonial: 'Excelente mentoría sobre física aplicada. Los estudiantes comprendieron conceptos complejos de manera sencilla y práctica.',
      image: 'https://images.pexels.com/photos/159832/book-cover-table-school-reading-159832.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Física Aplicada',
      mentor: 'Roberto Silva',
      duracion: '2.5 horas',
      estudiantes: 40,
      modalidad: 'Presencial',
      descripcion: 'Sesión sobre física aplicada con experimentos prácticos y demostraciones que ayudaron a los estudiantes a entender conceptos de mecánica y electromagnetismo.',
      sessionPhotos: [
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
    {
      id: 8,
      institution: 'Instituto de Ciencias Aplicadas',
      testimonial: 'La mentoría sobre matemáticas aplicadas fue reveladora. Los estudiantes vieron cómo las matemáticas se usan en la vida real.',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400',
      area: 'Matemáticas Aplicadas',
      mentor: 'Sofía Martínez',
      duracion: '2 horas',
      estudiantes: 55,
      modalidad: 'Presencial',
      descripcion: 'Taller sobre matemáticas aplicadas mostrando cómo se usan en modelado, optimización y resolución de problemas del mundo real en ingeniería y tecnología.',
      sessionPhotos: [
        'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
    },
  ];

  const mentores = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      area: 'Ingeniería de Software',
      description: 'Especialista en desarrollo de aplicaciones web y móviles con más de 10 años de experiencia.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
    },
    {
      id: 2,
      name: 'Ana Rodríguez',
      area: 'Ciencia de Datos',
      description: 'Experta en machine learning y análisis de datos para soluciones empresariales inteligentes.',
      image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
    },
    {
      id: 3,
      name: 'Luis Fernández',
      area: 'Mecatrónica',
      description: 'Ingeniero especializado en sistemas automatizados y robótica industrial.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: false,
    },
    {
      id: 4,
      name: 'María González',
      area: 'Ingeniería Ambiental',
      description: 'Profesional enfocada en sostenibilidad y tecnologías verdes para el futuro.',
      image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
    },
    {
      id: 5,
      name: 'Roberto Silva',
      area: 'Física',
      description: 'Investigador en física aplicada y tecnologías cuánticas con amplia trayectoria académica.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
    },
    {
      id: 6,
      name: 'Sofía Martínez',
      area: 'Matemáticas',
      description: 'Matemática aplicada especializada en modelado y optimización de sistemas complejos.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: false,
    },
  ];

  // Funciones para el carrusel de mentores
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getItemsPerView = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const getTotalSlides = () => {
    const itemsPerView = getItemsPerView();
    return Math.ceil(mentores.length / itemsPerView);
  };

  const goToMentorPrevious = () => {
    setIsMentorAutoPlaying(false);
    const totalSlides = getTotalSlides();
    setMentorCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToMentorNext = () => {
    setIsMentorAutoPlaying(false);
    const totalSlides = getTotalSlides();
    setMentorCarouselIndex((prev) => {
      const next = (prev + 1) % totalSlides;
      return next;
    });
  };

  const goToMentorSlide = (index: number) => {
    setIsMentorAutoPlaying(false);
    setMentorCarouselIndex(index);
  };

  useEffect(() => {
    if (!isMentorAutoPlaying) return;

    const totalSlides = getTotalSlides();
    if (totalSlides === 0) return;

    const interval = setInterval(() => {
      setMentorCarouselIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMentorAutoPlaying, mentores.length, windowWidth]);

  const toggleFAQ = (id: number) => {
    setFaqOpenId(faqOpenId === id ? null : id);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:sumaqtech.edu@gmail.com';
  };

  // Funciones para el carrusel de testimonios
  const getTestimonialItemsPerView = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const getTestimonialTotalSlides = () => {
    const itemsPerView = getTestimonialItemsPerView();
    return Math.ceil(testimonials.length / itemsPerView);
  };

  const goToTestimonialPrevious = () => {
    setIsTestimonialAutoPlaying(false);
    const totalSlides = getTestimonialTotalSlides();
    setTestimonialCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToTestimonialNext = () => {
    setIsTestimonialAutoPlaying(false);
    const totalSlides = getTestimonialTotalSlides();
    setTestimonialCarouselIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToTestimonialSlide = (index: number) => {
    setIsTestimonialAutoPlaying(false);
    setTestimonialCarouselIndex(index);
  };

  useEffect(() => {
    if (!isTestimonialAutoPlaying) return;

    const totalSlides = getTestimonialTotalSlides();
    if (totalSlides === 0) return;

    const interval = setInterval(() => {
      setTestimonialCarouselIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isTestimonialAutoPlaying, testimonials.length, windowWidth]);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== A) HERO / ENCABEZADO ===== */}
      <section className="bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 text-white py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mentorías SumaqTech</h1>
            <p className="text-lg md:text-xl text-white/95 mb-6 leading-relaxed">
              Acompañamos a instituciones educativas con sesiones personalizadas para inspirar a sus estudiantes en STEM.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md"
            >
              Solicitar Mentoría
            </button>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-72 h-72 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Compass className="w-32 h-32 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== B) ¿QUÉ SON LAS MENTORÍAS? ===== */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">¿Qué son las Mentorías?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Las mentorías SumaqTech son sesiones educativas diseñadas para inspirar y acompañar a estudiantes en su exploración del mundo STEM. 
              Ofrecemos orientación vocacional, charlas motivacionales y talleres prácticos dirigidos por profesionales con experiencia en la industria tecnológica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Orientación STEM</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Exploramos carreras en tecnología, ingeniería y ciencias de datos para ayudar a estudiantes a descubrir sus vocaciones.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cyan-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sesiones Virtuales/Presenciales</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Contamos con la flexibilidad de adaptar nuestras mentorías a la modalidad que mejor se ajuste a tu institución.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Guía Personalizada</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Nuestros mentores adaptan el contenido según las necesidades específicas de tu institución y estudiantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OBJETIVOS DEL PROGRAMA ===== */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Objetivos del Programa
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestros objetivos principales para transformar la educación STEM en instituciones educativas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {objetivos.map((objetivo, index) => {
              const Icon = objetivo.icon;
              const colorClasses = {
                teal: 'bg-teal-100 text-teal-600',
                cyan: 'bg-cyan-100 text-cyan-600',
                blue: 'bg-blue-100 text-blue-600',
              };

              return (
                <div
                  key={objetivo.id}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className={`w-12 h-12 ${colorClasses[objetivo.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{objetivo.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{objetivo.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== E) BENEFICIOS ===== */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Beneficios</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre cómo nuestras mentorías transforman la experiencia educativa de tus estudiantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Beneficio 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Fomento Vocacional</h4>
              <p className="text-gray-600 text-sm">
                Ayudamos a los estudiantes a explorar sus intereses en STEM y tomar decisiones informadas sobre su futuro.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Sesiones Formativas</h4>
              <p className="text-gray-600 text-sm">
                Contenido educativo dinámico, actualizado y alineado con las tendencias actuales del mundo tecnológico.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Mentores con Experiencia</h4>
              <p className="text-gray-600 text-sm">
                Profesionales activos en la industria STEM con años de experiencia práctica y pasión por enseñar.
              </p>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Enfoque Personalizado</h4>
              <p className="text-gray-600 text-sm">
                Adaptamos cada mentoría a los intereses, nivel y necesidades específicas de tu institución y estudiantes.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Sección: Impacto del Programa */}
      <section className="w-full flex justify-center px-4 mb-16">
        <div className="w-full max-w-6xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Nuestro Impacto
          </h2>

          <p className="text-center text-gray-600 mb-10">
            Estas métricas representan los objetivos y el alcance proyectado de SumaqTech para inicios 2026.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Tarjeta */}
        <div className="relative bg-white border-2 border-teal-300 rounded-2xl p-8 shadow-[0_6px_20px_rgba(0,0,0,0.12)] 
                        hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-2 
                        transition-all duration-300 ease-out overflow-hidden">

          {/* Brillo decorativo */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-200 opacity-30 rounded-bl-full blur-2xl"></div>

          <p className="text-5xl font-extrabold text-teal-700 drop-shadow-sm">+50</p>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Estudiantes orientados</p>
        </div>

        {/* Tarjeta */}
        <div className="relative bg-white border-2 border-teal-300 rounded-2xl p-8 shadow-[0_6px_20px_rgba(0,0,0,0.12)] 
                        hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-2 
                        transition-all duration-300 ease-out overflow-hidden">

          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-200 opacity-30 rounded-bl-full blur-2xl"></div>

          <p className="text-5xl font-extrabold text-teal-700 drop-shadow-sm">8</p>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Instituciones interesadas</p>
        </div>

        {/* Tarjeta */}
        <div className="relative bg-white border-2 border-teal-300 rounded-2xl p-8 shadow-[0_6px_20px_rgba(0,0,0,0.12)] 
                        hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-2 
                        transition-all duration-300 ease-out overflow-hidden">

          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-200 opacity-30 rounded-bl-full blur-2xl"></div>

          <p className="text-5xl font-extrabold text-teal-700 drop-shadow-sm">5</p>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Áreas STEM cubiertas</p>
        </div>

        {/* Tarjeta */}
        <div className="relative bg-white border-2 border-teal-300 rounded-2xl p-8 shadow-[0_6px_20px_rgba(0,0,0,0.12)] 
                        hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-2 
                        transition-all duration-300 ease-out overflow-hidden">

          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-200 opacity-30 rounded-bl-full blur-2xl"></div>

          <p className="text-5xl font-extrabold text-teal-700 drop-shadow-sm">100%</p>
          <p className="text-gray-700 mt-4 text-lg font-semibold">Sesiones acompañadas</p>
        </div>

      </div>


        </div>
      </section>
      {/* ===== NUESTROS MENTORES ===== */}
      <section id="mentores-section" className="py-16 md:py-24 px-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50/40 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Título y Subtítulo */}
          <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Nuestros Mentores
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce al equipo de expertos que pueden guiarte en tu camino
            </p>
          </div>

          {/* Carrusel de Mentores */}
          <div className="relative">
            {/* Contenedor del carrusel */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ 
                  transform: `translateX(-${mentorCarouselIndex * 100}%)` 
                }}
              >
                {Array.from({ length: getTotalSlides() }).map((_, slideIndex) => {
                  const itemsPerView = getItemsPerView();
                  const startIndex = slideIndex * itemsPerView;
                  const mentorsInSlide = mentores.slice(startIndex, startIndex + itemsPerView);
                  
                  return (
                    <div
                      key={slideIndex}
                      className="min-w-full flex gap-4 md:gap-6"
                    >
                      {mentorsInSlide.map((mentor, mentorIndex) => {
                        const globalIndex = startIndex + mentorIndex;
                        const colorVariants = [
                          'from-teal-400 to-cyan-400',
                          'from-teal-500 to-cyan-500',
                          'from-cyan-400 to-teal-400',
                          'from-teal-500 to-teal-600',
                          'from-cyan-500 to-cyan-600',
                          'from-teal-400 to-teal-500',
                        ];
                        const bgColor = colorVariants[globalIndex % colorVariants.length];
                        
                        return (
                          <div
                            key={mentor.id}
                            className="flex-1 min-w-0"
                          >
                            <div className={`bg-gradient-to-br ${bgColor} rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 h-full`}>
                              {/* Foto del Mentor */}
                              <div className="flex justify-center mb-4">
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-white/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/80 shadow-2xl relative z-10 group-hover:border-white transition-all duration-300"
                                  />
                                  {/* Indicador de disponibilidad en la foto */}
                                  <div
                                    className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white shadow-lg z-20 ${
                                      mentor.available ? 'bg-green-400' : 'bg-gray-400'
                                    }`}
                                  />
                                </div>
                              </div>

                              {/* Nombre */}
                              <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-2 drop-shadow-md">
                                {mentor.name}
                              </h3>

                              {/* Área / Especialidad */}
                              <div className="text-center mb-3">
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30">
                                  {mentor.area}
                                </span>
                              </div>

                              {/* Descripción */}
                              <p className="text-white/95 text-sm md:text-base text-center mb-4 leading-relaxed min-h-[3rem] drop-shadow-sm">
                                {mentor.description}
                              </p>

                              {/* Indicador de Disponibilidad */}
                              <div className="flex justify-center">
                                <span
                                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
                                    mentor.available
                                      ? 'bg-white/30 text-white border border-white/40 backdrop-blur-sm'
                                      : 'bg-black/20 text-white/80 border border-white/20 backdrop-blur-sm'
                                  }`}
                                >
                                  {mentor.available ? 'Disponible' : 'Ocupado'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botones de Navegación */}
            <button
              onClick={goToMentorPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-600 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 z-20 border-2 border-teal-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToMentorNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-600 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 z-20 border-2 border-teal-200"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: getTotalSlides() }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMentorSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === mentorCarouselIndex
                      ? 'bg-teal-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>




      

      {/* ===== D) ¿CÓMO FUNCIONA? - TIMELINE ===== */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un proceso claro, seguro y orientado a ofrecer el mejor acompañamiento para tus estudiantes.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                <div className="w-1 h-16 bg-gray-300 mt-2" />
              </div>
              <div className="pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Solicitud enviada por la institución</h4>
                <p className="text-gray-600">Completa el formulario con los datos de tu institución y la información de la mentoría que requieres.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                <div className="w-1 h-16 bg-gray-300 mt-2" />
              </div>
              <div className="pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Validación de datos institucionales</h4>
                <p className="text-gray-600">Nuestro equipo verifica la acreditación de tu institución y confirma los datos proporcionados.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                <div className="w-1 h-16 bg-gray-300 mt-2" />
              </div>
              <div className="pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Asignación de mentor según necesidad</h4>
                <p className="text-gray-600">Asignamos un mentor experimentado en el área de interés de tu institución y contactamos para coordinar detalles.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">4</div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Sesión educativa (taller, charla o acompañamiento)</h4>
                <p className="text-gray-600">Se realiza la sesión según la modalidad acordada. Nuestro mentor acompaña a los estudiantes con contenido dinámico e inspirador.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== C) ¿POR QUÉ SOLO INSTITUCIONES? ===== */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">¿Por qué solo instituciones?</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                En SumaqTech priorizamos la seguridad y ética al trabajar con menores de edad. Por eso, solo ofrecemos mentorías a través de instituciones educativas acreditadas: colegios, academias e institutos verificados. Esto nos permite garantizar un ambiente seguro, profesional y transparente para todos nuestros estudiantes, manteniendo protocolos claros y supervisión adecuada en cada sesión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp overflow-hidden"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-600 flex-shrink-0 transition-transform duration-300 ${
                      faqOpenId === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    faqOpenId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARRUSEL DE CASOS DE ÉXITO ===== */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-teal-50/20 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Título */}
          <div className="text-center mb-12 md:mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Casos de Éxito
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce las experiencias de instituciones que han transformado la educación STEM de sus estudiantes
            </p>
          </div>

          {/* Carrusel de Tarjetas */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ 
                  transform: `translateX(-${testimonialCarouselIndex * (100 / getTestimonialItemsPerView())}%)` 
                }}
              >
                {Array.from({ length: getTestimonialTotalSlides() }).map((_, slideIndex) => {
                  const itemsPerView = getTestimonialItemsPerView();
                  const startIndex = slideIndex * itemsPerView;
                  const testimonialsInSlide = testimonials.slice(startIndex, startIndex + itemsPerView);
                  
                  return (
                    <div
                      key={slideIndex}
                      className="min-w-full flex gap-4 md:gap-6 px-2"
                    >
                      {testimonialsInSlide.map((testimonial) => {
                        const colorVariants = [
                          'from-teal-50 via-cyan-50 to-blue-50',
                          'from-purple-50 via-pink-50 to-rose-50',
                          'from-emerald-50 via-teal-50 to-cyan-50',
                          'from-orange-50 via-amber-50 to-yellow-50',
                          'from-indigo-50 via-purple-50 to-pink-50',
                          'from-cyan-50 via-blue-50 to-indigo-50',
                          'from-teal-50 via-emerald-50 to-green-50',
                          'from-rose-50 via-pink-50 to-purple-50',
                        ];
                        const bgGradient = colorVariants[testimonial.id % colorVariants.length];
                        const borderColors = [
                          'border-teal-200 group-hover:border-teal-400',
                          'border-purple-200 group-hover:border-purple-400',
                          'border-emerald-200 group-hover:border-emerald-400',
                          'border-orange-200 group-hover:border-orange-400',
                          'border-indigo-200 group-hover:border-indigo-400',
                          'border-cyan-200 group-hover:border-cyan-400',
                          'border-teal-200 group-hover:border-teal-400',
                          'border-rose-200 group-hover:border-rose-400',
                        ];
                        const borderColor = borderColors[testimonial.id % borderColors.length];
                        const textColors = [
                          'group-hover:text-teal-700',
                          'group-hover:text-purple-700',
                          'group-hover:text-emerald-700',
                          'group-hover:text-orange-700',
                          'group-hover:text-indigo-700',
                          'group-hover:text-cyan-700',
                          'group-hover:text-teal-700',
                          'group-hover:text-rose-700',
                        ];
                        const textColor = textColors[testimonial.id % textColors.length];
                        
                        return (
                          <div
                            key={testimonial.id}
                            className="flex-1 min-w-0"
                          >
                            <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl shadow-xl hover:shadow-2xl border-2 ${borderColor} overflow-hidden transition-all duration-500 transform hover:scale-105 group relative h-full`}>
                              {/* Overlay con brillo suave al hover */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-500 pointer-events-none z-10"></div>
                              
                              <div className="p-6 md:p-8 relative z-20 flex flex-col items-center text-center h-full">
                                {/* Foto circular grande */}
                                <div className="mb-6 relative">
                                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                                  <img
                                    src={testimonial.image}
                                    alt={testimonial.institution}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-teal-100 group-hover:border-teal-300 shadow-xl relative z-10 transition-all duration-500"
                                  />
                                </div>
                                
                                {/* Nombre */}
                                <h3 className={`text-xl md:text-2xl font-bold text-gray-900 mb-3 ${textColor} transition-colors duration-300`}>
                                  {testimonial.institution}
                                </h3>
                                
                                {/* Estrellas (placeholder) */}
                                <div className="flex gap-1 mb-4">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                      key={star}
                                      className="w-5 h-5 text-yellow-400"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                
                                {/* Mini descripción */}
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                                  {testimonial.testimonial}
                                </p>
                                
                                {/* Botón Conocer más */}
                                <button
                                  onClick={() => setSelectedTestimonial(testimonial.id)}
                                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:scale-105"
                                >
                                  Conocer más
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botones de Navegación */}
            <button
              onClick={goToTestimonialPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-teal-600 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-30 border-2 border-teal-200 backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToTestimonialNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-teal-600 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-30 border-2 border-teal-200 backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicadores tipo dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: getTestimonialTotalSlides() }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonialSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === testimonialCarouselIndex
                      ? 'bg-teal-600 w-10 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Detalles del Caso de Éxito */}
      {selectedTestimonial !== null && (
        <>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
            .animate-scaleIn {
              animation: scaleIn 0.3s ease-out;
            }
          `}</style>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedTestimonial(null)}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
            {(() => {
              const testimonial = testimonials.find(t => t.id === selectedTestimonial);
              if (!testimonial) return null;
              
              return (
                <>
                  {/* Header del Modal */}
                  <div className="sticky top-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white border-b border-teal-400 px-6 py-4 flex items-center justify-between z-10 shadow-lg">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{testimonial.institution}</h3>
                      <p className="text-sm text-white/90">{testimonial.area}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTestimonial(null)}
                      className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    {/* Información Principal */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-100">
                          <p className="text-xs text-gray-600 mb-1">Estudiantes</p>
                          <p className="text-2xl font-bold text-teal-700">{testimonial.estudiantes}</p>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-4 text-center border border-cyan-100">
                          <p className="text-xs text-gray-600 mb-1">Duración</p>
                          <p className="text-lg font-bold text-cyan-700">{testimonial.duracion}</p>
                        </div>
                        <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-100">
                          <p className="text-xs text-gray-600 mb-1">Mentor</p>
                          <p className="text-sm font-bold text-teal-700">{testimonial.mentor}</p>
                        </div>
                        <div className="bg-cyan-50 rounded-lg p-4 text-center border border-cyan-100">
                          <p className="text-xs text-gray-600 mb-1">Modalidad</p>
                          <p className="text-sm font-bold text-cyan-700">{testimonial.modalidad}</p>
                        </div>
                      </div>
                      
                      {/* Descripción */}
                      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-xl p-6 mb-6 border-l-4 border-teal-500 shadow-md">
                        <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
                          Descripción de la Mentoría
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{testimonial.descripcion}</p>
                      </div>
                    </div>
                    
                    {/* Galería de Fotos de la Sesión */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></span>
                        Fotos de la Sesión
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {testimonial.sessionPhotos.map((photo, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedPhoto({ url: photo, index })}
                            className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-teal-400 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                          >
                            <img
                              src={photo}
                              alt={`Sesión ${index + 1} - ${testimonial.institution}`}
                              className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-2">
                              <span className="text-white text-xs font-semibold">Click para ampliar</span>
                            </div>
                            <div className="absolute top-2 right-2 bg-teal-500/90 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
            </div>
          </div>
        </>
      )}

     {/* Lightbox para Fotos */}
{selectedPhoto !== null && (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6 animate-fadeIn"
    onClick={() => setSelectedPhoto(null)}
  >
    <div
      className="relative w-full max-w-3xl max-h-[75vh] flex flex-col items-center animate-scaleIn"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Botón cerrar */}
      <button
        onClick={() => setSelectedPhoto(null)}
        className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Imagen */}
      <img
        src={selectedPhoto.url}
        alt={`Foto ${selectedPhoto.index + 1}`}
        className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
      />

      {/* Contador */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
        Foto {selectedPhoto.index + 1} de{" "}
        {testimonials.find(t => t.id === selectedTestimonial)?.sessionPhotos.length || 0}
      </div>
    </div>

    {/* Botón anterior (SIEMPRE CENTRADO VERTICALMENTE) */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        const photos = testimonials.find(t => t.id === selectedTestimonial)?.sessionPhotos || [];
        const newIndex =
          selectedPhoto.index === 0 ? photos.length - 1 : selectedPhoto.index - 1;
        setSelectedPhoto({ url: photos[newIndex], index: newIndex });
      }}
      className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full hover:scale-110 transition-all backdrop-blur-sm z-[70]"
    >
      <ChevronLeft className="w-8 h-8" />
    </button>

    {/* Botón siguiente (SIEMPRE CENTRADO VERTICALMENTE) */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        const photos = testimonials.find(t => t.id === selectedTestimonial)?.sessionPhotos || [];
        const newIndex =
          selectedPhoto.index === photos.length - 1 ? 0 : selectedPhoto.index + 1;
        setSelectedPhoto({ url: photos[newIndex], index: newIndex });
      }}
      className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full hover:scale-110 transition-all backdrop-blur-sm z-[70]"
    >
      <ChevronRight className="w-8 h-8" />
    </button>
  </div>
)}


      {/* ===== F) FORMULARIO DE SOLICITUD ===== */}
      <section id="formulario-mentorias" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Solicitud de Mentoría</h2>
            <p className="text-gray-600 text-lg">
              Completa el formulario y nuestro equipo se pondrá en contacto contigo en breve.
            </p>
            <p className="text-sm text-black-600 mt-2 font-semibold">
              *Solo instituciones educativas acreditadas (colegios, academias o institutos) pueden solicitar mentorías.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✓ ¡Solicitud enviada exitosamente! Te contactaremos pronto.
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            {/* A. DATOS DE LA INSTITUCIÓN */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
                A. Datos de la Institución
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Tipo de Institución *
                  </label>
                  <select
                    name="institucionType"
                    value={formData.institucionType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="colegio">Colegio</option>
                    <option value="academia">Academia</option>
                    <option value="institucion">Institución Acreditada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nombre de la Institución *
                  </label>
                  <input
                    type="text"
                    name="institucionName"
                    value={formData.institucionName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Instituto Técnico Profesional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Lima"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">País</label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Perú"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Página Web (opcional)</label>
                <input
                  type="url"
                  name="webSite"
                  value={formData.webSite}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Ej: www.institucion.edu.pe"
                />
              </div>
            </div>

            {/* B. RESPONSABLE */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
                B. Responsable
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="responsableName"
                    value={formData.responsableName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cargo</label>
                  <input
                    type="text"
                    name="responsableRole"
                    value={formData.responsableRole}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Coordinador de Actividades"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Correo Institucional *
                  </label>
                  <input
                    type="email"
                    name="responsableEmail"
                    value={formData.responsableEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="contacto@institucion.edu.pe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono Institucional</label>
                  <input
                    type="tel"
                    name="responsablePhone"
                    value={formData.responsablePhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+51 XXX XXX XXX"
                  />
                </div>
              </div>
            </div>

            {/* C. INFORMACIÓN SOBRE LA MENTORÍA */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
                C. Información sobre la Mentoría
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Descripción breve de la necesidad
                </label>
                <textarea
                  name="menoriaDescription"
                  value={formData.menoriaDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Cuéntanos qué tipo de mentoría buscas y qué objetivos tienes..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Área de Interés
                  </label>
                  <select
                    name="areaInteres"
                    value={formData.areaInteres}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Selecciona un área</option>
                    <option value="stem">STEM General</option>
                    <option value="vocacional">Orientación Vocacional</option>
                    <option value="taller">Taller Técnico</option>
                    <option value="charla">Charla Motivacional</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Modalidad
                  </label>
                  <select
                    name="modalidad"
                    value={formData.modalidad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Selecciona modalidad</option>
                    <option value="virtual">Virtual</option>
                    <option value="presencial">Presencial</option>
                    <option value="mixta">Mixta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* D. CONFIRMACIÓN */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-teal-500">
                D. Confirmación
              </h3>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="confirmacion"
                  checked={formData.confirmacion}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <label className="text-sm text-gray-700">
                  Confirmo que esta solicitud proviene de una institución acreditada. *
                </label>
              </div>
            </div>

            {/* BOTÓN ENVIAR */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md"
              >
                <Send className="w-5 h-5" />
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ===== CTA SECUNDARIO ===== */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¿Aún tienes dudas? Contáctanos.
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Estamos aquí para ayudarte. Si tienes alguna pregunta adicional sobre nuestras mentorías, no dudes en escribirnos.
          </p>
          <button
            onClick={handleEmailClick}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" />
            Enviar correo
          </button>
        </div>
      </section>
      
    </div>
  );
};

export default Mentorias;