import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop"; 

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Componente que controla el scroll automático */}
      <ScrollToTop />
            
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenido principal que ocupa todo el espacio disponible */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer siempre al final */}
      <Footer />
    </div>
  );
};

export default Layout;
