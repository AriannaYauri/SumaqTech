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
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Curso_Python from './pages/Curso_Python/Curso_Python';
import ModulePlayer from './pages/Curso_Python/ModulePlayer';
import ModuleSections from './pages/Curso_Python/ModuleSections';
import Estudiantes from './pages/Estudiantes';
import TestMarkdown from './pages/TestMarkdown';
import CourseAdmin from './pages/admin/CourseAdmin'; // ← AGREGAR ESTA LÍNEA
import MigrateCourse from './pages/MigrateCourse';  // ← AGREGAR ESTA LÍNEA
import FloatingChatIA from './components/FloatingChatIA';

function App() {
  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />

      <FloatingChatIA />

        <Routes>
        {/* Auth route without layout, actualización para diferenciación login y signup */}
          <Route path="/auth/:type" element={<Auth />} />

          {/* Main routes with standard layout */}
          <Route element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="modulos" element={<Modulos />} />
            <Route path="orientacion-vocacional" element={<OrientacionVocacional />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="test-vocacional" element={<TestVocacional />} />
            <Route path="mentorias" element={<Mentorias />} />
            <Route path="foro" element={<Foro />} />
          </Route>

          {/* Curso Python con layout limpio */}
          <Route 
            path="/curso-python" 
            element={
              <ProtectedRoute>
                <Layout hideNavbar hideFooter>
                  <Curso_Python />
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/curso-python/module/:moduleId" 
            element={
              <ProtectedRoute>
                <Layout hideNavbar hideFooter>
                  <ModuleSections />
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/curso-python/section/:sectionId" 
            element={
              <ProtectedRoute>
                <Layout hideNavbar hideFooter>
                  <ModulePlayer />
                </Layout>
              </ProtectedRoute>
            } 
          />

          {/* RUTAS DE ADMIN - CAMBIAR ProtectedRoute por AdminRoute */}
          <Route 
            path="/admin/python" 
            element={
              <AdminRoute>  // ← A ESTO
                <CourseAdmin courseId="python-101" />
              </AdminRoute>
            } 
          />

          <Route 
            path="/migrate" 
            element={
              <AdminRoute>  // ← A ESTO
                <MigrateCourse />
              </AdminRoute>
            } 
          />

          {/* RUTA TEMPORAL PARA PROBAR */}
          <Route path="/test-markdown" element={<TestMarkdown />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
