import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import CourseData from './CourseData';
import ModuleCard from './components/ModuleCard';
import { loadProgress } from './useProgress';

const COURSE_ID = CourseData.id;

const Curso_Python: React.FC = () => {
  const navigate = useNavigate();
  const progress = loadProgress(COURSE_ID);

  return (
    <AuthGuard>
      <div className="min-h-screen p-6 max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold">{CourseData.title}</h1>
          <p className="text-gray-600 mt-2">{CourseData.subtitle}</p>
        </header>

        <section className="grid gap-4">
          {CourseData.sections.map(s => (
            <ModuleCard
              key={s.id}
              section={s}
              progress={!!progress[s.id]?.completed}
              onStart={() => navigate(`/curso-python/section/${s.id}`)}
              onView={() => navigate(`/curso-python/section/${s.id}`)}
            />
          ))}
        </section>
      </div>
    </AuthGuard>
  );
};

export default Curso_Python;