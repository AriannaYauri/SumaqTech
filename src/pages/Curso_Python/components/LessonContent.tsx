import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useProgress } from '../useProgress';
import MarkdownRenderer from '../../../components/MarkdownRenderer'; // ← IMPORTAR

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

  // Paleta de colores
  const colors = {
    primary: '#00BFA5',
    primaryDark: '#008F7A',
    textLight: '#64748B'
  };

  return (
    <div className="space-y-6">
      {/* Contenido en Markdown usando MarkdownRenderer */}
      <MarkdownRenderer content={section.content} />

      {/* Botón de marcar completado */}
      <div className="mt-8 flex justify-between items-center border-t pt-6" style={{ borderColor: `${colors.primary}20` }}>
        <div className="text-sm" style={{ color: colors.textLight }}>
          {isCompleted && (
            <span className="flex items-center gap-2" style={{ color: colors.primary }}>
              <CheckCircle2 className="w-5 h-5" />
              Completado {progress[section.id]?.completedAt && 
                `el ${new Date(progress[section.id].completedAt!).toLocaleDateString()}`
              }
            </span>
          )}
        </div>
        
        <button
          onClick={markComplete}
          disabled={isCompleted}
          className={`px-6 py-3 font-semibold rounded-xl text-white shadow-lg transition-all duration-300 
            ${isCompleted ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105 active:scale-95'}
          `}
          style={{
            backgroundColor: isCompleted ? '#10B981' : colors.primary,
            boxShadow: isCompleted ? 'none' : `0 8px 24px ${colors.primary}40`
          }}
        >
          {isCompleted ? '✓ Completado' : 'Marcar como completado'}
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
