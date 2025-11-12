import React, { useState } from 'react';
import { Thread, User, Comment, MentoringSession } from '../types';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageSquare, Calendar, X, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import MentorScheduler from './MentorScheduler';

interface ThreadDetailProps {
  thread: Thread;
  currentUser: User;
  onClose: () => void;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({
  thread,
  currentUser,
  onClose,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);
  const [mentoringSessions, setMentoringSessions] = useState<MentoringSession[]>([]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      threadId: thread.id,
      content: newComment,
      authorId: currentUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isSolution: false,
      upvotes: 0,
    };

    // TODO: Enviar a la API
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleScheduleMentoring = async (sessionData: Partial<MentoringSession>) => {
    const newSession: MentoringSession = {
      id: Date.now().toString(),
      threadId: thread.id,
      mentorId: currentUser.id,
      studentId: thread.authorId,
      scheduledFor: sessionData.scheduledFor!,
      duration: sessionData.duration || 30,
      status: 'scheduled',
      type: sessionData.type || 'chat',
    };

    // TODO: Enviar a la API
    setMentoringSessions([...mentoringSessions, newSession]);
    setShowScheduler(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{thread.title}</h2>
            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
              <span>
                {formatDistance(new Date(thread.createdAt), new Date(), {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
              <span>•</span>
              <span>{thread.viewCount} vistas</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4">
        <div className="prose max-w-none">
          {thread.content}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {thread.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="border-t border-gray-200">
        <div className="p-4 space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              onMarkAsSolution={() => {/* TODO */}}
            />
          ))}

          {/* Formulario de nuevo comentario */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu respuesta..."
              rows={3}
              className="mb-2"
            />
            <div className="flex justify-between items-center">
              {currentUser.role === 'mentor' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduler(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Programar mentoría
                </Button>
              )}
              <Button type="submit">
                <Send className="w-4 h-4 mr-2" />
                Enviar respuesta
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de programación de mentoría */}
      {showScheduler && (
        <MentorScheduler
          onSchedule={handleScheduleMentoring}
          onClose={() => setShowScheduler(false)}
        />
      )}
    </div>
  );
};

interface CommentCardProps {
  comment: Comment;
  currentUser: User;
  onMarkAsSolution: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  currentUser,
  onMarkAsSolution,
}) => {
  return (
    <div className={`p-4 rounded-lg ${comment.isSolution ? 'bg-green-50' : 'bg-gray-50'}`}>
      <div className="flex items-start space-x-3">
        <Avatar>
          <AvatarImage src="/path-to-avatar.jpg" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">Nombre del Usuario</span>
              {comment.isSolution && (
                <Badge variant="success" className="ml-2">
                  <Check className="w-3 h-3 mr-1" />
                  Solución
                </Badge>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true,
                locale: es,
              })}
            </span>
          </div>
          <p className="mt-1 text-gray-700">{comment.content}</p>
          
          <div className="mt-2 flex items-center space-x-4">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Responder
            </button>
            {currentUser.role === 'mentor' && !comment.isSolution && (
              <button
                onClick={onMarkAsSolution}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Marcar como solución
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;