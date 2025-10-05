import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, BookOpen, Target, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Bot1 from "../components/bot/bot_1.svg";
import Bot2 from "../components/bot/bot_2.svg";
import Bot3 from "../components/bot/bot_3.svg";
import Bot4 from "../components/bot/bot_4.svg";
import Bot5 from "../components/bot/bot_5.svg";
import Bot6 from "../components/bot/bot_6.svg";
import Bot7 from "../components/bot/bot_7.svg";
import Bot8 from "../components/bot/bot_8.svg";
import Brillito from "../components/brillitos.svg";
import FocoIdea from "../components/foco-idea.svg";
import SaraL from "../components/historias_inicio/SARA_L.jpg";
import JulioR from "../components/historias_inicio/JULIO_R.jpg";
import CarlosF from "../components/historias_inicio/CARLOS_F.jpg";
import JuanV from "../components/historias_inicio/JUAN_V.jpg";

// ===== DATOS DEL CARRUSEL =====
// Array con todos los robots y sus mensajes correspondientes
// Cada objeto contiene: robot (imagen), message (texto), y color (clase CSS)
// Movido fuera del componente para mejor rendimiento y organización
const carouselData = [
  {
    robot: Bot1,
    message: "¿Listo para dominar la tecnología?",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot2,
    message: "¡Ya viste el nuevo tema de la semana en el foro? ¡Participa y comparte tus ideas!",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot3,
    message: "Explora el mundo de la ingeniería y la innovación",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot4,
    message: "Crea, programa y da vida a tus ideas",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot5,
    message: "Conecta con la tecnología del futuro y crea soluciones reales",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot6,
    message: "Desarrolla habilidades STEM que te abrirán puertas",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot7,
    message: "¡Tu futuro tech comienza aquí, en SumaqTech!",
    color: "text-[#00BFA5]"
  },
  {
    robot: Bot8,
    message: "Transforma tus ideas en proyectos que impacten",
    color: "text-[#00BFA5]"
  }
];

// ===== DATOS DE LOS TESTIMONIOS =====
// Array con todos los testimonios para el carrusel de historias
const testimonialsData = [
  {
    id: 1,
    text: "Yo creía que la programación era solo para genios. Pero con SumaqTech aprendí cosas nuevas, ahora quiero estudiar ingeniería de software.",
    name: "Sara L.",
    role: "Estudiante",
    image: SaraL
  },
  {
    id: 2,
    text: "Mi hijo estaba desmotivado con la escuela, pero cuando descubrió los talleres de tecnología de SumaqTech, empezó a interesarse por las carreras STEM.",
    name: "Juan V.",
    role: "Padre de familia",
    image: JuanV
  },
  {
    id: 3,
    text: "Como docente rural, tener acceso a materiales de calidad me ha permitido enseñar tecnología de forma más clara y divertida. Gracias SumaqTech.",
    name: "Julio R.",
    role: "Docente rural",
    image: JulioR
  },
  {
    id: 4,
    text: "Ser voluntario en SumaqTech me permitió compartir mis conocimientos y motivar a estudiantes que hoy sueñan con una carrera en tecnología.",
    name: "Carlos F.",
    role: "Voluntario",
    image: CarlosF
  }
];

const Inicio: React.FC = () => {
  // ===== ESTADO DEL CARRUSEL PRINCIPAL =====
  // useState para controlar qué slide está activo (0-7)
  const [currentSlide, setCurrentSlide] = useState(0);

// ===== ESTADO DEL CARRUSEL DE HISTORIAS =====
// useState para controlar qué testimonio está activo (0-3)
const [currentTestimonial, setCurrentTestimonial] = useState(0);

// ===== EFECTO AUTOMÁTICO DEL CARRUSEL DE SLIDES =====
// useEffect que cambia el slide automáticamente cada 4 segundos
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  }, 4000);

  return () => clearInterval(interval);
}, [carouselData.length]);

// ===== FUNCIONES DE NAVEGACIÓN MANUAL (SLIDES) =====
const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % carouselData.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
};

// ===== EFECTO AUTOMÁTICO DEL CARRUSEL DE HISTORIAS =====
// Cambia el testimonio automáticamente cada 10 segundos
useEffect(() => {
  const testimonialInterval = setInterval(() => {
    setCurrentTestimonial((prev) => (prev + 1) % 4);
  }, 10000); // 10 segundos

  return () => clearInterval(testimonialInterval);
}, []);

// ===== FUNCIONES DE NAVEGACIÓN MANUAL (HISTORIAS) =====
const nextTestimonial = () => {
  setCurrentTestimonial((prev) => (prev + 1) % 4);
};

const prevTestimonial = () => {
  setCurrentTestimonial((prev) => (prev - 1 + 4) % 4);
};

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION CON CARRUSEL ===== */}
      <section className="bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* ===== CONTENEDOR PRINCIPAL DEL CARRUSEL ===== */}
          {/* Layout con botones a los lados y contenido en el centro */}
          <div className="flex items-center justify-center gap-4">
            
            {/* ===== BOTÓN ANTERIOR (IZQUIERDA) ===== */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* ===== CONTENEDOR FIJO DEL CONTENIDO DEL CARRUSEL ===== */}
            {/* Contenedor con ancho fijo para evitar que los botones afecten el layout */}
            <div className="flex-1 max-w-4xl">
              <div className="flex flex-row items-center justify-center gap-8">
                
                {/* ===== CONTENEDOR DEL ROBOT CON TRANSICIONES (IZQUIERDA) ===== */}
                {/* Contenedor fijo para el robot con dimensiones específicas */}
                <div className="w-60 h-60 flex items-center justify-center relative flex-shrink-0">
                  {/* Mapeo de todos los robots del carrusel */}
                  {carouselData.map((item, index) => (
                    <img
                      key={index}
                      src={item.robot}
                      alt={`Mascota del robot ${index + 1}`}
                      className={`absolute w-64 h-auto transition-all duration-500 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 scale-100' // Robot activo: visible y tamaño normal
                          : 'opacity-0 scale-95'     // Robots inactivos: invisibles y ligeramente más pequeños
                      }`}
                    />
                  ))}
                </div>

                {/* ===== CONTENEDOR DEL MENSAJE CON TRANSICIONES (DERECHA) ===== */}
                {/* Contenedor fijo para el mensaje con altura específica */}
                <div className="flex-1 text-center">
                  <div className="h-20 flex items-center justify-center relative">
                    {/* Mapeo de todos los mensajes del carrusel */}
                    {carouselData.map((item, index) => (
                      <h1
                        key={index}
                        className={`absolute text-3xl sm:text-4xl lg:text-5xl font-bold text-center transition-all duration-500 ease-in-out px-4 ${
                          index === currentSlide
                            ? 'opacity-100 translate-y-0' // Mensaje activo: visible y en posición normal
                            : 'opacity-0 translate-y-4'   // Mensajes inactivos: invisibles y desplazados hacia abajo
                        }`}
                      >
                        {/* Aplicar el color específico de cada mensaje (todos usan #00BFA5) */}
                        <span className={item.color}>{item.message}</span>
                      </h1>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ===== BOTÓN SIGUIENTE (DERECHA) ===== */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
              aria-label="Siguiente slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* ===== INDICADORES DEL CARRUSEL ===== */}
          {/* Puntos en la parte inferior para mostrar el slide actual y permitir navegación */}
          <div className="flex justify-center mt-8 space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)} // Al hacer clic, va directamente a ese slide
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-[#00BFA5] scale-125'        // Indicador activo: color principal y más grande
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75' // Indicadores inactivos: blancos semitransparentes
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mensaje de comienzo */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight">
            ¡Empieza tu camino tech con SumaqTech!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Únete a nuestra comunidad y accede a recursos, cursos y apoyo en tu camino hacia el éxito en tecnología.
          </p>
          <Link
            to="/auth/registrate"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Comienza
          </Link>
        </div>
      </section>


      {/* Video + Mensaje Section */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* ===== VIDEO A LA IZQUIERDA ===== */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative h-80 flex items-center justify-center">
                  <img
                    src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Estudiantes trabajando en tecnología"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                  />
                  <button
                    aria-label="Reproducir video"
                    className="relative z-10 w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110 shadow-lg"
                  >
                    <Play className="w-6 h-6 text-gray-700 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== MENSAJE A LA DERECHA ===== */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Descubre tu potencial con SumaqTech 🚀
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                En <span className="font-semibold text-teal-600">SumaqTech</span> encontrarás cursos, mentorías 
                y orientación vocacional que te ayudarán a desarrollar tus habilidades, explorar nuevas áreas 
                del conocimiento y prepararte para el futuro.
              </p>

              <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
                Explorar Cursos
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ¿Qué es SumaqTech? Section */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 tracking-tight">
            ¿Qué es SumaqTech?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            SumaqTech es una plataforma educativa gratuita creada por estudiantes para estudiantes de secundaria y preuniversitarios. Nuestra
            misión es acercar el mundo de la ciencia, la tecnología, la ingeniería y las matemáticas (STEM) a estudiantes de secundaria y
            preuniversitarios. Queremos ayudarte a descubrir tus intereses, conocer carreras y tomar decisiones informadas sobre tu futuro.
          </p>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 tracking-tight">
              Conoce los beneficios de SumaqTech
            </h2>
          </div>
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Beneficio 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start border-t-4 border-[#00BFA5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="text-3xl font-bold text-[#00BFA5] mb-2">01</span>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Aprende desde cero</h3>
              <p className="text-gray-600">
                Ideal para estudiantes de secundaria y preuniversitarios. No necesitas experiencia previa, te acompañamos desde lo más básico.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start border-t-4 border-[#00BFA5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="text-3xl font-bold text-[#00BFA5] mb-2">02</span>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Explora carreras STEM</h3>
              <p className="text-gray-600">
                Conoce el mundo de la ingeniería, la programación, la robótica y las telecomunicaciones. Encuentra lo que más te inspira en ciencia y tecnología.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start border-t-4 border-[#00BFA5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="text-3xl font-bold text-[#00BFA5] mb-2">03</span>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Orientación Personalizada</h3>
              <p className="text-gray-600">
                Recibe orientación directa de profesionales del sector tecnológico y estudiantes del área. Sesiones virtuales y presenciales.
              </p>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start border-t-4 border-[#00BFA5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="text-3xl font-bold text-[#00BFA5] mb-2">04</span>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Acceso 100% gratuito</h3>
              <p className="text-gray-600">
                Todo nuestro contenido, herramientas y orientación personalizada son 100% gratuitos para estudiantes e instituciones.
              </p>
            </div>

            {/* Beneficio 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start border-t-4 border-[#00BFA5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="text-3xl font-bold text-[#00BFA5] mb-2">05</span>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Aprendizaje sin límites</h3>
              <p className="text-gray-600">
                Explora, experimenta y aprende a tu ritmo. Accede a este contenido desde cualquier lugar y en cualquier momento.
              </p>
            </div>

            {/* Beneficio 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start border-t-4 border-[#00BFA5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <span className="text-3xl font-bold text-[#00BFA5] mb-2">06</span>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Prepárate para el futuro</h3>
              <p className="text-gray-600">
                Desarrolla habilidades útiles como programación, redes, electrónica, liderazgo y pensamiento lógico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 tracking-tight">
            Explora nuestras funciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Módulos</h3>
              <p className="text-gray-600 text-sm">
                Contenido educativo estructurado para aprender tecnología paso a paso.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Test Vocacional</h3>
              <p className="text-gray-600 text-sm">
                Descubre tu vocación y las carreras que mejor se adaptan a ti.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mentorías</h3>
              <p className="text-gray-600 text-sm">
                Conecta con mentores expertos que te guiarán en tu camino.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Foro</h3>
              <p className="text-gray-600 text-sm">
                Participa en discusiones y comparte conocimientos con la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historias que inspiran Section */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Título y mensaje inicial */}
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 tracking-tight">
            Historias que inspiran
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Descubre cómo otros jóvenes como tú encontraron su pasión por la ciencia,
            la tecnología, la ingeniería y las matemáticas. Sus historias te mostrarán
            que nunca es tarde para empezar a soñar en grande.
          </p>

          {/* Contenedor principal en 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* ===== CARRUSEL DE HISTORIAS A LA IZQUIERDA ===== */}
            <div className="relative flex justify-center items-center h-full">
              {/* Botón anterior */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>

              {/* Contenedor del carrusel centrado */}
              <div className="flex justify-center items-center overflow-hidden w-full py-6 lg:py-8">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className="flex-shrink-0 w-full px-4 flex justify-center items-center">
                      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg transition-all duration-300 max-w-md flex flex-col justify-between h-75">
                        {/* Testimonio */}
                        <p className="text-gray-700 italic mb-6 text-center flex-grow flex items-center justify-center">
                          "{testimonial.text}"
                        </p>

                        {/* Información fija abajo */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                              <p className="text-base
                               text-gray-500">{testimonial.role}</p>
                            </div>
                          </div>
                          <img src={Brillito} alt="estrella" className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón siguiente */}
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* ===== MENSAJE CTA A LA DERECHA ===== */}        
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center justify-center gap-6 lg:gap-8">
                
                {/* Texto del mensaje */}
                <div className="flex flex-col space-y-2 max-w-xs text-center lg:text-left">
                  <p className="text-gray-600 text-base">
                    Tu testimonio puede inspirar a otros jóvenes a descubrir su pasión por la tecnología.
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 justify-center lg:justify-start">
                    <img src={FocoIdea} alt="idea" className="w-5 h-5" />
                    <span className="text-base">Comparte tu experiencia y ayuda a inspirar a más personas</span>
                  </div>
                </div>

                {/* Imagen del robot */}
                <div className="flex-shrink-0">
                  <img src={Bot1} alt="robot SumaqTech" className="w-40 h-40 object-contain" />
                </div>
              </div>

              {/* Botón centrado debajo */}
              <div className="flex justify-center mt-6">
                <button className="w-full lg:w-auto px-8 py-3 bg-[#00BFA5] text-white font-semibold rounded-xl shadow-md hover:bg-[#009e88] transition-all duration-200 transform hover:scale-105">
                  Compartir mi experiencia
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes Section */}
      <section className="max-w-6xl mx-auto px-6 py-14 mb-10 bg-white rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Preguntas Frecuentes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Columna del bot */}
          <div className="flex flex-col items-center text-center">
            <img
              src="src/components/bot/bot_5.svg"
              alt="Asistente virtual"
              className="w-52 h-52 mb-6"
            />
            <p className="text-gray-600 text-center md:text-left mb-4">
              Soy tu asistente virtual 🤖. Aquí resolvemos las dudas más comunes sobre{" "}
              <span className="font-semibold text-[#00BFA5]">SumaqTech</span>.
            </p>
            {/* Botón debajo */}
            <Link
                to="/auth/registrate"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 transform hover:scale-105 mx-auto block text-center"
              >
                Comienza
              </Link>
          </div>

          {/* Columna de preguntas (ocupa 2/3) */}
          <div className="md:col-span-2 space-y-4">
            {/* Pregunta 1 */}
            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-700">
                ¿Los cursos son gratuitos?
                <span className="transition-transform group-open:rotate-45 text-[#00BFA5] font-bold">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Sí, todo el contenido, recursos y orientación están disponibles sin
                costo para estudiantes e instituciones.
              </p>
            </details>

            {/* Pregunta 2 */}
            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-700">
                ¿Necesito experiencia previa?
                <span className="transition-transform group-open:rotate-45 text-[#00BFA5] font-bold">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                No, puedes empezar desde cero. La plataforma está diseñada para
                acompañarte paso a paso.
              </p>
            </details>

            {/* Pregunta 3 */}
            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-700">
                ¿Cómo accedo a una sesión de orientación?
                <span className="transition-transform group-open:rotate-45 text-[#00BFA5] font-bold">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Desde tu cuenta podrás solicitar orientación, eligiendo si prefieres
                una sesión virtual o presencial.
              </p>
            </details>

            {/* Pregunta 4 */}
            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-700">
                ¿Qué necesito para usar la plataforma?
                <span className="transition-transform group-open:rotate-45 text-[#00BFA5] font-bold">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Solo necesitas una conexión a internet y un dispositivo como
                computadora, tablet o celular.
              </p>
            </details>

            {/* Pregunta 5 */}
            <details className="group border border-gray-200 rounded-lg p-4">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-700">
                ¿Quiénes pueden registrarse?
                <span className="transition-transform group-open:rotate-45 text-[#00BFA5] font-bold">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-600">
                Estudiantes de secundaria, preuniversitarios y centros educativos
                interesados en el mundo STEM.
              </p>
            </details>
          </div>
        </div>
      </section>


      



    </div>
  );
};

export default Inicio;