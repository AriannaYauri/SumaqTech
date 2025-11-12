export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'mentor' | 'admin';
  badges?: string[];
  expertise?: string[];
  mentorVerified?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  status: 'open' | 'solved' | 'in-mentoring';
  mentorAssigned?: string;
  viewCount: number;
  upvotes: number;
}

export interface Comment {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  isSolution: boolean;
  upvotes: number;
  parentId?: string; // Para respuestas anidadas
}

export interface MentoringSession {
  id: string;
  threadId: string;
  mentorId: string;
  studentId: string;
  scheduledFor: Date;
  duration: number; // en minutos
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'call' | 'chat';
  notes?: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
}