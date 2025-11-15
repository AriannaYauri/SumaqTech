import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Modulos from './pages/Modulos';
import OrientacionVocacional from './pages/OrientacionVocacional';
import TestVocacional from './pages/TestVocacional';
import Mentorias from './pages/Mentorias';
import Foro from './pages/Foro';
import Nosotros from './pages/Nosotros';
import Auth from './pages/Auth';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext'; // o donde tengas tu provider
import ProtectedRoute from './components/ProtectedRoute';
import Curso_Python from './pages/Curso_Python/Curso_Python';
import ModulePlayer from './pages/Curso_Python/ModulePlayer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> {/* 👈 Esto hace el scroll al inicio en cada cambio de página */}
        <Routes>
          {/* Auth route without layout */}
          <Route path="/auth/:type" element={<Auth />} />
          
          {/* Main routes with layout */}
          <Route path="/" element={<Layout />}>
            {/* Rutas públicas */}
            <Route index element={<Inicio />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="modulos" element={<Modulos />} />
            <Route path="orientacion-vocacional" element={<OrientacionVocacional />} />
            <Route path="test-vocacional" element={<TestVocacional />} />
            <Route path="mentorias" element={<Mentorias />} />
            <Route path="foro" element={<Foro />} />
            
            {/* Rutas protegidas - Solo el curso de Python requiere autenticación */}
            <Route 
              path="/curso-python" 
              element={
                <ProtectedRoute>
                  <Curso_Python />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/curso-python/section/:sectionId" 
              element={
                <ProtectedRoute>
                  <ModulePlayer />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;