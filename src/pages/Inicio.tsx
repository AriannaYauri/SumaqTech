import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, BookOpen, Target, MessageCircle } from 'lucide-react';
import Bot1 from "../components/bot/bot_1.svg";
import Brillito from "../components/brillitos.svg";
import FocoIdea from "../components/foco-idea.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SaraL from "../components/historias_inicio/SARA_L.jpg";
import JulioR from "../components/historias_inicio/JULIO_R.jpg";
import CarlosF from "../components/historias_inicio/CARLOS_F.jpg";
import JuanV from "../components/historias_inicio/JUAN_V.jpg";
import Linkedin from "../components/iconos/linkedin.svg";
import IG from "../components/iconos/ig.svg";
import Github from "../components/iconos/github.svg";

import { Autoplay, Pagination, Navigation } from "swiper";

const Inicio: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 space-y-8 flex items-center justify-center">
              <img src={Bot1} alt="Mascota del robot" className="w-64 h-auto mx-auto" />
            </div>
            <div className="lg:w-2/3 text-center space-y-6 mt-8 lg:mt-0">
              <h1 className="text-5xl lg:text-5xl font-bold text-center">
                <span className="text-teal-500">¿Listo para dominar la tecnología?</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed text-center font-bold">
                Empieza tu camino tech con SumaqTech.
              </p>
              <Link
                to="/registrate"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 transform hover:scale-105 mx-auto block text-center"
              >
                Comienza
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative h-96 flex items-center justify-center">
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

          {/* Grid de testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <p className="text-gray-700 italic mb-6">
                "Yo creía que la programación era solo para genios. Pero con
                <span className="font-semibold text-[#00BFA5]"> SumaqTech </span>
                aprendí cosas nuevas, ahora quiero estudiar ingeniería de software."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={SaraL}
                    alt="Sara L."
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Sara L.</h4>
                    <p className="text-sm text-gray-500">Estudiante</p>
                  </div>
                </div>
                <img src={Brillito} alt="estrella" className="w-6 h-6" />
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <p className="text-gray-700 italic mb-6">
                "Mi hijo estaba desmotivado con la escuela, pero cuando descubrió los
                talleres de tecnología de
                <span className="font-semibold text-[#00BFA5]"> SumaqTech </span>,
                empezó a interesarse por las carreras STEM."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={JuanV}
                    alt="Juan V."
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Juan V.</h4>
                    <p className="text-sm text-gray-500">Padre de familia</p>
                  </div>
                </div>
                <img src={Brillito} alt="estrella" className="w-6 h-6" />
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <p className="text-gray-700 italic mb-6">
                "Como docente rural, tener acceso a materiales de calidad me ha
                permitido enseñar tecnología de forma más clara y divertida. Gracias
                <span className="font-semibold text-[#00BFA5]"> SumaqTech</span>."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={JulioR}
                    alt="Julio R."
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Julio R.</h4>
                    <p className="text-sm text-gray-500">Docente rural</p>
                  </div>
                </div>
                <img src={Brillito} alt="estrella" className="w-6 h-6" />
              </div>
            </div>

            {/* Testimonio 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#00BFA5] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
              <p className="text-gray-700 italic mb-6">
                "Ser voluntario en
                <span className="font-semibold text-[#00BFA5]"> SumaqTech </span> me
                permitió compartir mis conocimientos y motivar a estudiantes que hoy
                sueñan con una carrera en tecnología."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                      src={CarlosF}
                    alt="Carlos F."
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">Carlos F.</h4>
                    <p className="text-sm text-gray-500">Voluntario</p>
                  </div>
                </div>
                <img src={Brillito} alt="estrella" className="w-6 h-6" />
              </div>
            </div>
          </div>

          

        {/* CTA final */}
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4 flex items-center justify-center gap-2">
            <img src={FocoIdea} alt="idea" className="w-6 h-6" />
            ¿Te inspiró alguna historia? Todos tenemos algo valioso que contar. Anímate a compartir tu experiencia con SumaqTech y ayudar a inspirar a más personas.
          </p>
          <button className="px-8 py-3 bg-[#00BFA5] text-white font-semibold rounded-xl shadow-md hover:bg-[#009e88] transition">
            Compartir mi experiencia
          </button>
        </div>


        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between md:items-start">
          
          {/* Logo y descripción */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2">SumaqTech</h3>
            <p className="text-gray-400 max-w-xs">
              Inspirando a jóvenes a descubrir la ciencia, tecnología, ingeniería y matemáticas.
            </p>
          </div>

          {/* Enlaces */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-white mb-2">Explorar</h4>
              <ul className="text-gray-400 space-y-1">
                <li><a href="#" className="hover:text-[#00BFA5]">Inicio</a></li>
                <li><a href="#" className="hover:text-[#00BFA5]">Historias</a></li>
                <li><a href="#" className="hover:text-[#00BFA5]">Talleres</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Comunidad</h4>
              <ul className="text-gray-400 space-y-1">
                <li><a href="#" className="hover:text-[#00BFA5]">Mentores</a></li>
                <li><a href="#" className="hover:text-[#00BFA5]">Estudiantes</a></li>
                <li><a href="#" className="hover:text-[#00BFA5]">Voluntarios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Contacto</h4>
              <ul className="text-gray-400 space-y-1">
                <li>Email: contacto@sumaqtech.com</li>
                <li>Tel: +51 987 654 321</li>
                <li className="flex items-center gap-3 mt-2">
                  {/* Iconos de redes sociales */}
                  <a href="#" className="hover:text-[#00BFA5]">
                    <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-[#00BFA5]">
                    <img src={IG} alt="Instagram" className="w-6 h-6" />
                  </a>
                  <a href="#" className="hover:text-[#00BFA5]">
                    <img src={Github} alt="GitHub" className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-8">
          © 2025 SumaqTech. Todos los derechos reservados.
        </div>
      </footer>



    </div>
  );
};

export default Inicio;