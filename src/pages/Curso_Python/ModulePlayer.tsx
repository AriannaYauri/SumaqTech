import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseData from './CourseData';
import LessonContent from './components/LessonContent';
import { loadProgress } from './useProgress';

const COURSE_ID = CourseData.id;

const ModulePlayer: React.FC = () => {
  const { sectionId } = useParams<{ sectionId?: string }>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(sectionId ?? CourseData.sections[0].id);
  const [progress, setProgress] = useState<Record<string, { completed: boolean }>>({});

  useEffect(() => {
    setProgress(loadProgress(COURSE_ID));
  }, []);

  const section = CourseData.sections.find(s => s.id === selected) ?? CourseData.sections[0];

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <button onClick={() => navigate('/curso-python')} className="text-sm text-gray-600 mb-4">← Volver al curso</button>
      <h1 className="text-2xl font-extrabold mb-2">{CourseData.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{CourseData.subtitle}</p>

      <div className="grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-3">Secciones</h4>
          <ol className="space-y-2 text-sm">
            {CourseData.sections.map(s => (
              <li key={s.id}>
                <button
                  onClick={() => setSelected(s.id)}
                  className={`w-full text-left p-2 rounded ${s.id === selected ? 'bg-[#00BFA5] text-white' : 'hover:bg-gray-50'}`}
                >
                  {s.title} {progress[s.id]?.completed ? '✓' : ''}
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <main className="md:col-span-3 bg-white p-4 rounded shadow">
          <LessonContent section={section} onMarked={() => setProgress(loadProgress(COURSE_ID))} />
        </main>
      </div>
    </div>
  );
};

export default ModulePlayer;