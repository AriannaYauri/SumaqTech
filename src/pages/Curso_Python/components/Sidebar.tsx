import React from 'react';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';

interface SidebarProps {
  module: any;
  currentSectionId: string | null;
  progress: Record<string, { completed: boolean }>;
  onSectionClick: (sectionId: string) => void;
  onBackToCourse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  module,
  currentSectionId,
  progress,
  onSectionClick,
  onBackToCourse
}) => {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={onBackToCourse}
          className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-4 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al curso</span>
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-1">{module.title}</h2>
        {module.subtitle && (
          <p className="text-sm text-gray-500">{module.subtitle}</p>
        )}
      </div>

      {/* Lista de secciones */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
          Contenido del módulo
        </h3>
        
        <div className="space-y-1">
          {module.sections.map((section: any, index: number) => {
            const isCompleted = progress[section.id]?.completed;
            const isCurrent = section.id === currentSectionId;

            return (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                  isCurrent
                    ? 'bg-teal-50 border-2 border-teal-500'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                {/* Icono de estado */}
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className={`w-5 h-5 ${isCurrent ? 'text-teal-500' : 'text-gray-300'}`} />
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      Lección {index + 1}
                    </span>
                  </div>
                  <h4 className={`text-sm font-semibold ${
                    isCurrent ? 'text-teal-700' : 'text-gray-700'
                  }`}>
                    {section.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer con progreso */}
      <div className="p-6 border-t border-gray-200 mt-auto">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Progreso del módulo</span>
          <span className="font-semibold text-teal-600">
            {module.sections.filter((s: any) => progress[s.id]?.completed).length}/{module.sections.length}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500"
            style={{
              width: `${(module.sections.filter((s: any) => progress[s.id]?.completed).length / module.sections.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;