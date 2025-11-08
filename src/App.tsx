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

// --- Importar el componente del chat flotante ---
import FloatingChatIA from './components/FloatingChatIA'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* 👈 RENDERIZADO DEL CHAT FLOTANTE: Se coloca aquí para que esté siempre visible en todas las rutas. */}
      <FloatingChatIA /> 

      <Routes>
        {/* Auth route without layout, actualización para diferenciación login y signup */}
        <Route path="/auth/:type" element={<Auth />} />

        {/* Main routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="modulos" element={<Modulos />} />
          <Route path="orientacion-vocacional" element={<OrientacionVocacional />} />
          <Route path="test-vocacional" element={<TestVocacional />} />
          <Route path="mentorias" element={<Mentorias />} />
          <Route path="foro" element={<Foro />} />
          <Route path="nosotros" element={<Nosotros />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;