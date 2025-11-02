import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Mail, Globe, GraduationCap, Lock, Eye, EyeOff, Sparkles, Rocket, BookOpen, Code, Lightbulb} from 'lucide-react';

const Auth: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const isLogin = type === 'ingresa';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Columna izquierda - Mensaje de bienvenida */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#00BFA5] via-[#00D4B5] to-[#26E5D0] items-center justify-center p-12 relative overflow-hidden">
        {/* Formas geométricas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-40 w-28 h-28 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 bg-white/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
    
        {/* Contenido principal */}
        <div className="relative z-10 text-center space-y-8 animate-fadeInLeft">
          <div className="flex justify-center space-x-4 mb-6">
            <Rocket className="w-12 h-12 text-white animate-float" style={{ animationDelay: '0s' }} />
            <BookOpen className="w-12 h-12 text-white animate-float" style={{ animationDelay: '0.5s' }} />
            <Code className="w-12 h-12 text-white animate-float" style={{ animationDelay: '1s' }} />
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            {isLogin ? '¡Qué bueno verte de nuevo!' : '¡Bienvenido a SumaqTech!'}
          </h1>

          <p className="text-white/95 text-base sm:text-lg md:text-xl font-medium md:font-semibold max-w-xl mx-auto leading-relaxed text-center">
            {isLogin
              ? 'Tu comunidad de aprendizaje te está esperando. Continúa tu viaje en STEM.'
              : 'Únete a la comunidad estudiantil más vibrante. Aprende, comparte y crece en tecnología.'}
          </p>


          <div className="flex justify-center items-center space-x-6 pt-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/95 text-sm font-medium">Aprendizaje</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/95 text-sm font-medium">Innovación</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/95 text-sm font-medium">Futuro</span>
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse-slow" />
              <span className="text-white font-medium">Una comunidad en expanción</span>
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha - Formulario */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 relative">
        <div className="w-full max-w-md space-y-8 animate-fadeInRight">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA5] to-[#00D4B5] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#00BFA5] to-[#00D4B5] bg-clip-text text-transparent">
              SumaqTech
            </span>
          </Link>

          {/* Encabezado del formulario */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Ingresa tus credenciales para continuar'
                : 'Completa el formulario para unirte'}
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative group animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00BFA5] transition-colors duration-200" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre completo"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00BFA5] focus:ring-4 focus:ring-[#00BFA5]/10 transition-all duration-200 bg-white"
                />
              </div>
            )}

            <div className="relative group animate-fadeInUp" style={{ animationDelay: isLogin ? '0.1s' : '0.2s' }}>
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00BFA5] transition-colors duration-200" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo electrónico"
                required
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00BFA5] focus:ring-4 focus:ring-[#00BFA5]/10 transition-all duration-200 bg-white"
              />
            </div>

            <div className="relative group animate-fadeInUp" style={{ animationDelay: isLogin ? '0.2s' : '0.3s' }}>
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00BFA5] transition-colors duration-200" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
                required
                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00BFA5] focus:ring-4 focus:ring-[#00BFA5]/10 transition-all duration-200 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00BFA5] transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative group animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00BFA5] transition-colors duration-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar contraseña"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00BFA5] focus:ring-4 focus:ring-[#00BFA5]/10 transition-all duration-200 bg-white"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-[#00BFA5] to-[#00D4B5] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00BFA5]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 group animate-fadeInUp"
              style={{ animationDelay: isLogin ? '0.3s' : '0.5s' }}
            >
              <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            </button>
          </form>

          {/* Link alternativo */}
          <div
            className="text-center animate-fadeInUp"
            style={{ animationDelay: isLogin ? '0.4s' : '0.6s' }}
          >
            <p className="text-gray-600">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <Link
                to={isLogin ? '/auth/registrate' : '/auth/ingresa'}
                replace
                className="text-[#00BFA5] hover:text-[#00D4B5] font-semibold hover:underline transition-all duration-200"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </Link>
            </p>
          </div>


          {/* Badges decorativos */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 animate-fadeInUp" style={{ animationDelay: isLogin ? '0.5s' : '0.7s' }}>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse-slow"></div>
              <span>100% Gratis</span>
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse-slow"></div>
              <span>Comunidad Activa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
