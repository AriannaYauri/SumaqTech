import React from 'react';
import { Topic } from '../types';
import { cn } from '@/lib/utils';

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopic: string | null;
  onTopicSelect: (topicId: string | null) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  selectedTopic,
  onTopicSelect,
}) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onTopicSelect(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          selectedTopic === null
            ? "bg-teal-100 text-teal-800"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        Todos los temas
      </button>
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onTopicSelect(topic.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center space-x-2",
            selectedTopic === topic.id
              ? "bg-teal-100 text-teal-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          <span className="w-4 h-4">{topic.icon}</span>
          <span>{topic.name}</span>
        </button>
      ))}
    </div>
  );
};

export default TopicSelector;