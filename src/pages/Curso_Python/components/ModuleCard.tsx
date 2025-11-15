import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ModuleCardProps {
  section: {
    id: string | number;
    title: string;
    summary?: string;
  };
  progress: boolean;
  onStart?: () => void;
  onView?: () => void;
  primaryColor?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  section,
  progress,
  onStart,
  onView,
  primaryColor = '#00BFA5',
}) => {
  return (
    <div
      className={`rounded-2xl p-5 shadow-md transition-all border border-gray-100 ${
        progress ? 'text-white' : 'bg-white hover:shadow-xl'
      }`}
      style={{
        background: progress ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)` : undefined,
        borderColor: progress ? `${primaryColor}80` : undefined,
      }}
    >
      {/* Título y resumen */}
      <h3 className={`text-lg font-bold mb-2 ${progress ? 'text-white' : 'text-gray-800'}`}>
        {section.title}
      </h3>
      {section.summary && (
        <p className={`text-sm mb-4 ${progress ? 'text-white/80' : 'text-gray-500'}`}>
          {section.summary}
        </p>
      )}

      {/* Progreso y botón */}
      <div className="flex items-center justify-between">
        {progress ? (
          <div className="flex items-center gap-2 font-medium text-white">
            <CheckCircle2 className="w-5 h-5" /> Completado
          </div>
        ) : (
          <span className="text-sm text-gray-400">Pendiente</span>
        )}

        <button
          onClick={progress ? onView : onStart}
          className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-md ${
            progress ? 'bg-white text-green-600 hover:bg-green-50' : 'text-white'
          }`}
          style={
            !progress
              ? {
                  background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                  boxShadow: `0 4px 15px ${primaryColor}50`,
                }
              : undefined
          }
        >
          {progress ? 'Repasar' : 'Comenzar'}
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
