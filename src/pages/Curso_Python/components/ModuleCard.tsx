import React from 'react';

type Props = {
  section: { id: string; title: string; summary?: string };
  progress?: boolean;
  onStart?: () => void;
  onView?: () => void;
};

const ModuleCard: React.FC<Props> = ({ section, progress, onStart, onView }) => {
  return (
    <article className="p-4 rounded-lg shadow-sm bg-white border flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-lg">{section.title}</h3>
        {section.summary && <p className="text-sm text-gray-500 mt-1">{section.summary}</p>}
        <p className="text-xs mt-2 text-gray-600">{progress ? 'Completado' : 'Pendiente'}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onView} className="px-3 py-1 rounded border text-sm">Ver</button>
        <button onClick={onStart} className="bg-[#00BFA5] text-white px-3 py-1 rounded text-sm">Entrar</button>
      </div>
    </article>
  );
};

export default ModuleCard;