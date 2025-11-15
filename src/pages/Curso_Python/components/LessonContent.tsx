import React from 'react';
import Playground from '../interactive/Playground';
import { saveProgress, loadProgress } from '../useProgress';

type Exercise = { id: string; title: string; prompt: string };
type CodeExample = { id: string; language: string; code: string };
type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
  tips?: string[];
  challenges?: string[];
};

const COURSE_ID = 'curso-python-fundamentos';

const LessonContent: React.FC<{ section: Section; onMarked?: () => void }> = ({ section, onMarked }) => {
  const markComplete = () => {
    const p = loadProgress(COURSE_ID);
    p[section.id] = { completed: true };
    saveProgress(COURSE_ID, p);
    onMarked && onMarked();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Título de sección */}
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
        {section.title}
      </h2>

      {/* Párrafos generales */}
      {section.paragraphs?.map((p, i) => (
        <div key={i} className="bg-gray-800 p-5 rounded-xl shadow-md text-gray-200 hover:bg-gray-700 transition-colors duration-200">
          <p>{p}</p>
        </div>
      ))}

      {/* Tips */}
      {section.tips?.map((tip, i) => (
        <div key={i} className="bg-teal-700 border-l-4 border-cyan-400 p-4 rounded-xl shadow-md text-white">
          <strong>💡 Tip:</strong> {tip}
        </div>
      ))}

      {/* Desafíos o retos */}
      {section.challenges?.map((ch, i) => (
        <div key={i} className="bg-yellow-600 text-gray-900 p-4 rounded-xl shadow-md">
          <strong>🎯 Desafío:</strong> {ch}
        </div>
      ))}

      {/* Ejemplos de código interactivos */}
      {section.codeExamples?.map(ex => (
        <div key={ex.id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-2 flex items-center justify-between bg-gray-800 border-b border-gray-700">
            <h4 className="font-medium text-sm text-gray-300">{ex.language.toUpperCase()} — Ejemplo</h4>
            <span className="text-gray-400 text-xs">Interactivo</span>
          </div>
          <pre className="p-4 bg-gray-950 text-sm font-mono text-green-200 whitespace-pre-wrap">{ex.code}</pre>
          <div className="p-4">
            <Playground initialCode={ex.code} />
          </div>
        </div>
      ))}

      {/* Ejercicios como cards expandibles */}
      {(section.exercises?.length ?? 0) > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-lg text-gray-200">Actividades</h4>
          {section.exercises?.map(ex => (
            <details key={ex.id} className="bg-gray-800 rounded-xl p-3 shadow-md hover:bg-gray-700 transition-colors duration-200">
              <summary className="cursor-pointer font-medium text-gray-200">{ex.title}</summary>
              <p className="mt-2 text-gray-300 text-sm">{ex.prompt}</p>
            </details>
          ))}
        </div>
      )}

      {/* Botón de marcar completado */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={markComplete}
          className="px-5 py-2 font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Marcar como completado
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
