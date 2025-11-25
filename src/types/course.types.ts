export interface Section {
  id: string;
  title: string;
  description?: string;  // ← AGREGAR
  content: string;
  duration?: string;     // ← AGREGAR
  level?: string;        // ← AGREGAR
  order: number;
}

export interface Module {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  order: number;
  sections: Section[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
  modules: Module[];
  createdAt?: Date;
  updatedAt?: Date;
}