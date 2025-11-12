import { Thread, Comment, MentoringSession, User } from './types';

// Base URL de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Función auxiliar para manejar errores
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ocurrió un error');
  }
  return response.json();
};

// Servicios para hilos
export const threadService = {
  getAll: async (): Promise<Thread[]> => {
    const response = await fetch(`${API_BASE_URL}/threads`);
    return handleResponse(response);
  },

  getById: async (id: string): Promise<Thread> => {
    const response = await fetch(`${API_BASE_URL}/threads/${id}`);
    return handleResponse(response);
  },

  create: async (threadData: Omit<Thread, 'id' | 'createdAt' | 'updatedAt'>): Promise<Thread> => {
    const response = await fetch(`${API_BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(threadData),
    });
    return handleResponse(response);
  },

  update: async (id: string, threadData: Partial<Thread>): Promise<Thread> => {
    const response = await fetch(`${API_BASE_URL}/threads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(threadData),
    });
    return handleResponse(response);
  },
};

// Servicios para comentarios
export const commentService = {
  getByThreadId: async (threadId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/threads/${threadId}/comments`);
    return handleResponse(response);
  },

  create: async (commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    return handleResponse(response);
  },

  markAsSolution: async (commentId: string): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}/solution`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  },
};

// Servicios para mentorías
export const mentoringService = {
  schedule: async (sessionData: Omit<MentoringSession, 'id'>): Promise<MentoringSession> => {
    const response = await fetch(`${API_BASE_URL}/mentoring-sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    });
    return handleResponse(response);
  },

  getByUser: async (userId: string): Promise<MentoringSession[]> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/mentoring-sessions`);
    return handleResponse(response);
  },

  updateStatus: async (
    sessionId: string, 
    status: MentoringSession['status']
  ): Promise<MentoringSession> => {
    const response = await fetch(`${API_BASE_URL}/mentoring-sessions/${sessionId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },
};

// Servicios para usuarios
export const userService = {
  getMentors: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users?role=mentor`);
    return handleResponse(response);
  },

  getProfile: async (userId: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return handleResponse(response);
  },
};