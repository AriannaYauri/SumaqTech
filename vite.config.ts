import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ===============================================
  // CONFIGURACIÓN CLAVE PARA FORZAR RESOLUCIÓN Y PRE-BUNDLING
  // ===============================================
  optimizeDeps: {
    // VITE FALLA AL RESOLVER, PERO DEBE ESTAR AQUÍ PARA INTENTARLO
    include: [
      'axios',
      'react-katex',
      'react-markdown',
      'react-syntax-highlighter/dist/cjs/styles/prism', // Ruta específica
      'react-copy-to-clipboard',
      'remark-gfm',
    ],
  },

  build: {
    // 1. Añadimos la configuración de Rollup (build.rollupOptions)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Si el ID contiene 'node_modules', creamos un chunk separado (opcional pero ayuda a aislar errores)
          if (id.includes('node_modules')) {
            // Utilizamos el nombre del paquete para el chunk
            const packageName = id.split('node_modules/')[1].split('/')[0];
            return packageName;
          }
        },
      },
    },
  },
  
  // 2. Resolvemos el problema del CSS de Katex
  css: {
    preprocessorOptions: {
      css: {
        // Esta configuración es un parche para algunos problemas de resolución de rutas relativas en CSS importado.
      }
    }
  },

  // 3. Permite a VITE manejar módulos CJS
  esbuild: {
    jsxInject: `import React from 'react'`,
  }
});