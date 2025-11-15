import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

interface LayoutProps {
  hideNavbar?: boolean;
  hideFooter?: boolean;
  children?: ReactNode; // ← aquí agregamos children
}

const Layout: React.FC<LayoutProps> = ({ hideNavbar = false, hideFooter = false, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

      <div className="flex-1">
        {/* Si se pasa children, renderízalo; si no, renderiza <Outlet /> */}
        {children || <Outlet />}
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
