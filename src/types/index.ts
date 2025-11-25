export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

export interface User {
  uid: string;
  email?: string;
  name?: string;
  role?: 'admin' | 'student';
}

// ========== TIPOS DE CURSOS ==========
export * from './course.types';

