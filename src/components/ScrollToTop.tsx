// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // 1) Evitar que el navegador restaure la posición al recargar
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        // restaurar el comportamiento original cuando el componente se desmonte
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  // 2) Mover al inicio cada vez que cambie la ruta
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
