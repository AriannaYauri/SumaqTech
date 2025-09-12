import React from 'react';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/ingresa" element={<Auth />} />
        <Route path="/registrate" element={<Auth />} />
        
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