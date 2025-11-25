import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Globe, GraduationCap, Lock, Eye, EyeOff, Sparkles, Rocket, BookOpen, Code, Lightbulb, AlertCircle, Loader2} from 'lucide-react';
import { loginWithEmail, signupWithEmail, loginWithGoogle } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const isLogin = type === 'ingresa';
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Obtener la ruta de origen desde el estado de navegación
  const from = (location.state as { from?: string })?.from || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validaciones
      if (!isLogin) {
        // Validación para registro
        if (formData.password !== formData.confirmPassword) {
          setError('Las contraseñas no coinciden');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setIsLoading(false);
          return;
        }
        if (!formData.name.trim()) {
          setError('El nombre es requerido');
          setIsLoading(false);
          return;
        }
      }

      // Llamar a Firebase
      let result;
      if (isLogin) {
        result = await loginWithEmail(formData.email, formData.password);
      } else {
        result = await signupWithEmail(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        // Redirigir a la ruta de origen o al inicio después de login/signup exitoso
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Ocurrió un error');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      console.error('Error en autenticación:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para login con Google
  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await loginWithGoogle();
      if (result.success) {
        // Redirigir a la ruta de origen o al inicio después de login con Google
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Ocurrió un error al iniciar sesión con Google');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      console.error('Error en autenticación con Google:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00BFA5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

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

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fadeInUp">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

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
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#00BFA5] to-[#00D4B5] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00BFA5]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 group animate-fadeInUp disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ animationDelay: isLogin ? '0.3s' : '0.5s' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">o</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Botón de Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-6 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>

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