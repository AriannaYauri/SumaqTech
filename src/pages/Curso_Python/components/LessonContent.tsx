import React from 'react';
import Playground from '../interactive/Playground';
import { saveProgress, loadProgress } from '../useProgress';

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  codeExamples?: { id: string; language: string; code: string }[];
  exercises?: { id: string; title: string; prompt: string }[];
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
    <div>
      <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
      {section.paragraphs?.map((p, i) => <p key={i} className="mb-3 text-gray-700">{p}</p>)}

      {section.codeExamples?.map(ex => (
        <div key={ex.id} className="mb-4">
          <h4 className="font-medium mb-1">{ex.language.toUpperCase()} — Ejemplo</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{ex.code}</pre>
          <div className="mt-2">
            <Playground initialCode={ex.code} />
          </div>
        </div>
      ))}

      {section.exercises && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Actividades</h4>
          <ul className="list-disc pl-5 text-sm">
            {section.exercises.map(ex => <li key={ex.id} className="mb-2">{ex.title}: {ex.prompt}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button onClick={markComplete} className="px-3 py-1 bg-[#00BFA5] text-white rounded">Marcar como completado</button>
      </div>
    </div>
  );
};

export default LessonContent;