import React, { useState, useEffect } from 'react';
import { Thread, User, Topic } from './types';
import ThreadList from './components/ThreadList';
import ThreadDetail from './components/ThreadDetail';
import TopicSelector from './components/TopicSelector';
import NewThreadModal from './components/NewThreadModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';

interface MentoringForumProps {
  currentUser: User;
}

const MentoringForum: React.FC<MentoringForumProps> = ({ currentUser }) => {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  // Simulación de carga de datos
  useEffect(() => {
    // TODO: Reemplazar con llamadas API reales
    const fetchData = async () => {
      // Simular carga de hilos y temas
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con barra de búsqueda y botón de nuevo hilo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar en el foro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex"
              >
                <Filter className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => setIsNewThreadModalOpen(true)}
                className="bg-teal-600 text-white hover:bg-teal-700 flex items-center"
              >
                <Plus className="h-5 w-5 mr-1" />
                Nueva Pregunta
              </Button>
            </div>
          </div>

          {/* Selector de temas */}
          <div className="mt-4">
            <TopicSelector
              topics={topics}
              selectedTopic={selectedTopic}
              onTopicSelect={setSelectedTopic}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lista de hilos */}
          <div className={`lg:col-span-${selectedThread ? '5' : '12'}`}>
            <ThreadList
              threads={threads}
              selectedThread={selectedThread}
              onThreadSelect={setSelectedThread}
              searchQuery={searchQuery}
              selectedTopic={selectedTopic}
            />
          </div>

          {/* Detalle del hilo */}
          {selectedThread && (
            <div className="lg:col-span-7">
              <ThreadDetail
                thread={selectedThread}
                currentUser={currentUser}
                onClose={() => setSelectedThread(null)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal para nuevo hilo */}
      <NewThreadModal
        isOpen={isNewThreadModalOpen}
        onClose={() => setIsNewThreadModalOpen(false)}
        currentUser={currentUser}
        topics={topics}
        onThreadCreated={(newThread) => {
          setThreads([newThread, ...threads]);
          setIsNewThreadModalOpen(false);
        }}
      />
    </div>
  );
};

export default MentoringForum;