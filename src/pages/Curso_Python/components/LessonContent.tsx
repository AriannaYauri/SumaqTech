import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useProgress } from '../useProgress';

interface LessonContentProps {
  courseId: string;
  section: {
    id: string;
    title: string;
    content: string;
    description?: string;
    duration?: string;
    level?: string;
  };
  onMarked?: () => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ courseId, section, onMarked }) => {
  const { progress, updateProgress } = useProgress(courseId);
  
  const markComplete = async () => {
    await updateProgress(section.id, true);
    onMarked && onMarked();
  };

  const isCompleted = progress[section.id]?.completed || false;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Header con título y metadata */}
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
          {section.title}
        </h2>
        
        {section.description && (
          <p className="text-gray-400 text-lg">{section.description}</p>
        )}

        <div className="flex gap-4 text-sm text-gray-500">
          {section.duration && (
            <span className="flex items-center gap-1">
              ⏱️ {section.duration}
            </span>
          )}
          {section.level && (
            <span className="flex items-center gap-1">
              📊 {section.level}
            </span>
          )}
        </div>
      </div>

      {/* Contenido en Markdown */}
      <div className="prose prose-invert prose-cyan max-w-none bg-gray-800 p-6 rounded-xl shadow-md">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Bloques de código con syntax highlighting
            code(props) {
              const { children, className } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={vscDarkPlus as any}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>
                  {children}
                </code>
              );
            },
            // Párrafos
            p(props) {
              return <p className="text-gray-200 leading-relaxed mb-4">{props.children}</p>;
            },
            // Títulos
            h1(props) {
              return <h1 className="text-3xl font-bold text-cyan-400 mb-4 mt-8">{props.children}</h1>;
            },
            h2(props) {
              return <h2 className="text-2xl font-bold text-teal-400 mb-3 mt-6">{props.children}</h2>;
            },
            h3(props) {
              return <h3 className="text-xl font-bold text-emerald-400 mb-2 mt-4">{props.children}</h3>;
            },
            // Listas
            ul(props) {
              return <ul className="list-disc list-inside space-y-2 text-gray-200 mb-4">{props.children}</ul>;
            },
            ol(props) {
              return <ol className="list-decimal list-inside space-y-2 text-gray-200 mb-4">{props.children}</ol>;
            },
            // Links
            a(props) {
              return (
                <a 
                  href={props.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                >
                  {props.children}
                </a>
              );
            },
            // Blockquotes (tips/notas)
            blockquote(props) {
              return (
                <blockquote className="border-l-4 border-cyan-500 bg-gray-900 p-4 rounded-r-lg my-4">
                  <div className="text-gray-300">{props.children}</div>
                </blockquote>
              );
            },
            // Tablas
            table(props) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-700 rounded-lg">{props.children}</table>
                </div>
              );
            },
            th(props) {
              return <th className="bg-gray-900 text-cyan-400 font-semibold p-3 border border-gray-700">{props.children}</th>;
            },
            td(props) {
              return <td className="bg-gray-800 text-gray-200 p-3 border border-gray-700">{props.children}</td>;
            },
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>

      {/* Botón de marcar completado */}
      <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400">
          {isCompleted && (
            <span className="flex items-center gap-2 text-green-400">
              ✓ Completado {progress[section.id]?.completedAt && 
                `el ${new Date(progress[section.id].completedAt!).toLocaleDateString()}`
              }
            </span>
          )}
        </div>
        
        <button
          onClick={markComplete}
          disabled={isCompleted}
          className={`px-6 py-3 font-semibold rounded-xl text-white shadow-lg transition-all duration-300 ${
            isCompleted 
              ? 'bg-green-600 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 hover:scale-105 active:scale-95'
          }`}
        >
          {isCompleted ? '✓ Completado' : 'Marcar como completado'}
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
