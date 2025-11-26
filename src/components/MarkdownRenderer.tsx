import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Agregar notificación de "¡Copiado!" con toast
  };

  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // ==================== TÍTULOS ====================
          h1: ({ node, ...props }) => (
            <h1 
              className="text-4xl font-bold text-gray-900 mb-6 mt-8 flex items-center gap-3" 
              {...props}
            >
              <div className="w-2 h-10 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full"></div>
              {props.children}
            </h1>
          ),

          h2: ({ node, ...props }) => (
            <h2 
              className="text-3xl font-bold text-gray-800 mb-4 mt-8 flex items-center gap-3" 
              {...props}
            >
              <div className="w-1.5 h-8 bg-gradient-to-b from-teal-400 to-teal-500 rounded-full"></div>
              {props.children}
            </h2>
          ),

          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6" {...props} />
          ),

          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4" {...props} />
          ),

          h5: ({ node, ...props }) => (
            <h5 className="text-lg font-semibold text-gray-700 mb-2 mt-3" {...props} />
          ),

          h6: ({ node, ...props }) => (
            <h6 className="text-base font-semibold text-gray-700 mb-2 mt-3" {...props} />
          ),

          // ==================== PÁRRAFOS (CORREGIDO) ====================
          p: ({ node, children, ...props }) => {
            // Detectar si contiene elementos de bloque que no deberían estar en <p>
            const hasBlockContent = React.Children.toArray(children).some((child) => {
              if (React.isValidElement(child)) {
                const type = child.type as any;
                return (
                  type === 'pre' ||
                  type === 'div' ||
                  typeof type === 'function' ||
                  child.props?.className?.includes('language-')
                );
              }
              return false;
            });

            // Si tiene contenido de bloque, no usar <p>
            if (hasBlockContent) {
              return <div className="my-4">{children}</div>;
            }

            return <p className="text-gray-700 leading-relaxed mb-4 text-base" {...props}>{children}</p>;
          },

          // ==================== BLOCKQUOTES (CORREGIDO) ====================
          blockquote: ({ node, children, ...props }) => {
            const text = String(children).toLowerCase();

            // 💡 Tip de Qori
            if (text.includes('💡') || text.includes('tip')) {
              return (
                <div className="not-prose bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">💡</span>
                  <div className="flex-1 text-gray-800 space-y-2">{children}</div>
                </div>
              );
            }

            // ⚠️ Advertencia/Importante
            if (text.includes('⚠️') || text.includes('importante') || text.includes('warning')) {
              return (
                <div className="not-prose bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">⚠️</span>
                  <div className="flex-1 text-gray-800 space-y-2">{children}</div>
                </div>
              );
            }

            // 🏆 Logro/Nivel desbloqueado
            if (text.includes('🏆') || text.includes('nivel') || text.includes('logro')) {
              return (
                <div className="not-prose bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-md">
                  <span className="text-3xl flex-shrink-0">🏆</span>
                  <div className="flex-1 text-gray-800 font-semibold space-y-2">{children}</div>
                </div>
              );
            }

            // ℹ️ Info/Nota
            if (text.includes('ℹ️') || text.includes('nota')) {
              return (
                <div className="not-prose bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">ℹ️</span>
                  <div className="flex-1 text-gray-800 space-y-2">{children}</div>
                </div>
              );
            }

            // ✅ Correcto/Éxito
            if (text.includes('✅') || text.includes('correcto')) {
              return (
                <div className="not-prose bg-green-50 border-l-4 border-green-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">✅</span>
                  <div className="flex-1 text-gray-800 space-y-2">{children}</div>
                </div>
              );
            }

            // ❌ Error/Incorrecto
            if (text.includes('❌') || text.includes('incorrecto') || text.includes('error')) {
              return (
                <div className="not-prose bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">❌</span>
                  <div className="flex-1 text-gray-800 space-y-2">{children}</div>
                </div>
              );
            }

            // 🔥 Próximamente
            if (text.includes('🔥') || text.includes('próximamente')) {
              return (
                <div className="not-prose bg-orange-50 border-l-4 border-orange-400 p-5 rounded-r-xl my-6 flex gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">🔥</span>
                  <div className="flex-1 text-gray-800 space-y-2">{children}</div>
                </div>
              );
            }

            // Blockquote normal
            return (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props}>
                {children}
              </blockquote>
            );
          },

          // ==================== CÓDIGO ====================
          code: ({ node, inline, className, children, ...props }: any) => {
            const codeString = String(children).replace(/\n$/, '');

            // Código inline
            if (inline) {
              return (
                <code 
                  className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono" 
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Bloque de código
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';

            return (
              <div className="not-prose relative group my-6">
                {/* Etiqueta del lenguaje */}
                <div className="absolute top-0 right-0 px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-bl-lg rounded-tr-xl z-10">
                  {language}
                </div>

                {/* Código */}
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto border border-gray-700 shadow-lg">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>

                {/* Botón copiar (aparece al hover) */}
                <button
                  onClick={() => copyToClipboard(codeString)}
                  className="absolute top-12 right-3 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all shadow-lg flex items-center gap-1"
                  title="Copiar código"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar
                </button>
              </div>
            );
          },

          // ==================== LISTAS ====================
          ul: ({ node, ...props }) => (
            <ul className="space-y-2 my-4 ml-6 list-disc list-outside" {...props} />
          ),

          ol: ({ node, ...props }) => (
            <ol className="space-y-2 my-4 ml-6 list-decimal list-outside" {...props} />
          ),

          li: ({ node, ...props }) => (
            <li className="text-gray-700 leading-relaxed" {...props} />
          ),

          // ==================== ENLACES ====================
          a: ({ node, ...props }) => (
            <a
              className="text-teal-600 hover:text-teal-700 underline font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // ==================== TABLAS ====================
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
          ),

          thead: ({ node, ...props }) => (
            <thead className="bg-gradient-to-r from-teal-50 to-teal-100" {...props} />
          ),

          th: ({ node, ...props }) => (
            <th 
              className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-teal-200" 
              {...props} 
            />
          ),

          tbody: ({ node, ...props }) => (
            <tbody className="bg-white divide-y divide-gray-200" {...props} />
          ),

          td: ({ node, ...props }) => (
            <td className="px-6 py-4 text-sm text-gray-700" {...props} />
          ),

          tr: ({ node, ...props }) => (
            <tr className="hover:bg-gray-50 transition-colors" {...props} />
          ),

          // ==================== IMÁGENES ====================
          img: ({ node, ...props }) => (
            <img
              className="rounded-xl shadow-lg my-6 max-w-full h-auto mx-auto"
              loading="lazy"
              {...props}
            />
          ),

          // ==================== LÍNEA HORIZONTAL ====================
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-t-2 border-gray-200" {...props} />
          ),

          // ==================== TEXTO RESALTADO ====================
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-gray-900" {...props} />
          ),

          em: ({ node, ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),

          // ==================== DETALLES (spoilers/acordeones) ====================
          details: ({ node, ...props }) => (
            <details className="my-4 p-4 bg-gray-50 border border-gray-200 rounded-lg" {...props} />
          ),

          summary: ({ node, ...props }) => (
            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-teal-600 transition-colors" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer;