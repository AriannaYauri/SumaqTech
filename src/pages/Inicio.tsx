import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, BookOpen, Target, MessageCircle } from 'lucide-react';
import Bot1 from "../components/bot/bot_1.svg";


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
                <button className="relative z-10 w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110 shadow-lg">
                  <Play className="w-6 h-6 text-gray-700 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is SumaqTech Section */}
      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
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

      {/* Features Grid */}
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
    </div>
  );
};

export default Inicio;