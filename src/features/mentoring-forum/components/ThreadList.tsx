import React from 'react';
import { Thread, User } from '../types';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface ThreadListProps {
  threads: Thread[];
  selectedThread: Thread | null;
  onThreadSelect: (thread: Thread) => void;
  searchQuery: string;
  selectedTopic: string | null;
}

const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  selectedThread,
  onThreadSelect,
  searchQuery,
  selectedTopic,
}) => {
  // Filtrar hilos basados en búsqueda y tema
  const filteredThreads = threads.filter((thread) => {
    const matchesSearch = searchQuery
      ? thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesTopic = selectedTopic ? thread.topic === selectedTopic : true;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-4">
      {filteredThreads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => onThreadSelect(thread)}
          className={`w-full text-left p-4 rounded-lg border transition-all ${
            selectedThread?.id === thread.id
              ? 'border-teal-500 bg-teal-50'
              : 'border-gray-200 bg-white hover:border-teal-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {thread.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {thread.content}
              </p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {thread.viewCount} vistas
                </span>
                <span>
                  {formatDistance(new Date(thread.createdAt), new Date(), {
                    addSuffix: true,
                    locale: es,
                  })}
                </span>
              </div>
            </div>
            <ThreadStatusBadge status={thread.status} />
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {thread.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </button>
      ))}

      {filteredThreads.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No se encontraron hilos que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

const ThreadStatusBadge: React.FC<{ status: Thread['status'] }> = ({ status }) => {
  const statusConfig = {
    'open': {
      color: 'bg-blue-100 text-blue-800',
      icon: Clock,
      text: 'Abierto'
    },
    'solved': {
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      text: 'Resuelto'
    },
    'in-mentoring': {
      color: 'bg-purple-100 text-purple-800',
      icon: MessageSquare,
      text: 'En mentoría'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </span>
  );
};

export default ThreadList;