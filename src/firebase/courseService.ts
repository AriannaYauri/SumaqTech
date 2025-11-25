import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { Course, Module, Section } from '../types';

// ==================== LEER (READ) ====================

/**
 * Obtener un curso completo con todos sus módulos y secciones
 * @param courseId - ID del curso (ej: "python-101")
 * @returns Course o null si no existe
 */
export const getCourse = async (courseId: string): Promise<Course | null> => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      console.log(`Curso "${courseId}" no encontrado en Firebase`);
      return null;
    }

    const data = courseSnap.data();
    
    return {
      id: courseSnap.id,
      title: data.title,
      description: data.description,
      image: data.image,
      modules: data.modules || [],
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate()
    } as Course;
  } catch (error) {
    console.error('Error obteniendo curso:', error);
    return null;
  }
};

/**
 * Obtener todos los cursos disponibles
 * @returns Array de cursos
 */
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, 'courses');
    const snapshot = await getDocs(coursesRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Course[];
  } catch (error) {
    console.error('Error obteniendo todos los cursos:', error);
    return [];
  }
};

/**
 * Obtener un módulo específico de un curso
 * @param course - Curso completo
 * @param moduleId - ID del módulo
 * @returns Module o null
 */
export const getModule = (course: Course, moduleId: string): Module | null => {
  return course.modules.find(m => m.id === moduleId) || null;
};

/**
 * Obtener una sección específica de un módulo
 * @param module - Módulo completo
 * @param sectionId - ID de la sección
 * @returns Section o null
 */
export const getSection = (module: Module, sectionId: string): Section | null => {
  return module.sections.find(s => s.id === sectionId) || null;
};

/**
 * Buscar una sección en todo el curso (en cualquier módulo)
 * @param course - Curso completo
 * @param sectionId - ID de la sección
 * @returns Section o null
 */
export const findSectionInCourse = (course: Course, sectionId: string): Section | null => {
  for (const module of course.modules) {
    const section = module.sections.find(s => s.id === sectionId);
    if (section) return section;
  }
  return null;
};

// ==================== CREAR/ACTUALIZAR (CREATE/UPDATE) ====================

/**
 * Guardar o actualizar un curso completo
 * @param courseId - ID del curso
 * @param courseData - Datos del curso (parciales o completos)
 * @returns true si se guardó exitosamente
 */
export const saveCourse = async (courseId: string, courseData: Partial<Course>): Promise<boolean> => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    
    await setDoc(courseRef, {
      ...courseData,
      updatedAt: new Date()
    }, { merge: true });
    
    console.log(`✅ Curso "${courseId}" guardado exitosamente`);
    return true;
  } catch (error) {
    console.error('❌ Error guardando curso:', error);
    return false;
  }
};

/**
 * Crear un nuevo curso vacío
 * @param courseId - ID único para el curso
 * @param title - Título del curso
 * @param description - Descripción del curso
 * @returns true si se creó exitosamente
 */
export const createCourse = async (
  courseId: string, 
  title: string, 
  description: string,
  image?: string
): Promise<boolean> => {
  try {
    const courseData: Course = {
      id: courseId,
      title,
      description,
      image,
      modules: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return await saveCourse(courseId, courseData);
  } catch (error) {
    console.error('Error creando curso:', error);
    return false;
  }
};

/**
 * Agregar o actualizar un módulo en un curso
 * @param courseId - ID del curso
 * @param moduleData - Datos del módulo
 * @returns true si se guardó exitosamente
 */
export const saveModule = async (courseId: string, moduleData: Module): Promise<boolean> => {
  try {
    const course = await getCourse(courseId);
    if (!course) {
      console.error(`Curso "${courseId}" no encontrado`);
      return false;
    }

    // Buscar si el módulo ya existe
    const moduleIndex = course.modules.findIndex(m => m.id === moduleData.id);
    
    if (moduleIndex >= 0) {
      // Actualizar módulo existente
      course.modules[moduleIndex] = moduleData;
      console.log(`📝 Módulo "${moduleData.id}" actualizado`);
    } else {
      // Agregar nuevo módulo
      course.modules.push(moduleData);
      console.log(`➕ Módulo "${moduleData.id}" agregado`);
    }

    // Ordenar módulos por order
    course.modules.sort((a, b) => a.order - b.order);

    // Guardar curso actualizado
    return await saveCourse(courseId, { modules: course.modules });
  } catch (error) {
    console.error('Error guardando módulo:', error);
    return false;
  }
};

/**
 * Agregar o actualizar una sección en un módulo
 * @param courseId - ID del curso
 * @param moduleId - ID del módulo
 * @param sectionData - Datos de la sección
 * @returns true si se guardó exitosamente
 */
export const saveSection = async (
  courseId: string,
  moduleId: string,
  sectionData: Section
): Promise<boolean> => {
  try {
    const course = await getCourse(courseId);
    if (!course) {
      console.error(`Curso "${courseId}" no encontrado`);
      return false;
    }

    const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex < 0) {
      console.error(`Módulo "${moduleId}" no encontrado en curso "${courseId}"`);
      return false;
    }

    const module = course.modules[moduleIndex];
    const sectionIndex = module.sections.findIndex(s => s.id === sectionData.id);

    if (sectionIndex >= 0) {
      // Actualizar sección existente
      module.sections[sectionIndex] = sectionData;
      console.log(`📝 Sección "${sectionData.id}" actualizada`);
    } else {
      // Agregar nueva sección
      module.sections.push(sectionData);
      console.log(`➕ Sección "${sectionData.id}" agregada`);
    }

    // Ordenar secciones por order
    module.sections.sort((a, b) => a.order - b.order);

    return await saveCourse(courseId, { modules: course.modules });
  } catch (error) {
    console.error('Error guardando sección:', error);
    return false;
  }
};

// ==================== ELIMINAR (DELETE) ====================

/**
 * Eliminar un curso completo
 * @param courseId - ID del curso a eliminar
 * @returns true si se eliminó exitosamente
 */
export const deleteCourse = async (courseId: string): Promise<boolean> => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    await deleteDoc(courseRef);
    console.log(`🗑️ Curso "${courseId}" eliminado`);
    return true;
  } catch (error) {
    console.error('Error eliminando curso:', error);
    return false;
  }
};

/**
 * Eliminar un módulo de un curso
 * @param courseId - ID del curso
 * @param moduleId - ID del módulo a eliminar
 * @returns true si se eliminó exitosamente
 */
export const deleteModule = async (courseId: string, moduleId: string): Promise<boolean> => {
  try {
    const course = await getCourse(courseId);
    if (!course) return false;

    course.modules = course.modules.filter(m => m.id !== moduleId);
    console.log(`🗑️ Módulo "${moduleId}" eliminado`);
    
    return await saveCourse(courseId, { modules: course.modules });
  } catch (error) {
    console.error('Error eliminando módulo:', error);
    return false;
  }
};

/**
 * Eliminar una sección de un módulo
 * @param courseId - ID del curso
 * @param moduleId - ID del módulo
 * @param sectionId - ID de la sección a eliminar
 * @returns true si se eliminó exitosamente
 */
export const deleteSection = async (
  courseId: string,
  moduleId: string,
  sectionId: string
): Promise<boolean> => {
  try {
    const course = await getCourse(courseId);
    if (!course) return false;

    const module = course.modules.find(m => m.id === moduleId);
    if (!module) {
      console.error(`Módulo "${moduleId}" no encontrado`);
      return false;
    }

    module.sections = module.sections.filter(s => s.id !== sectionId);
    console.log(`🗑️ Sección "${sectionId}" eliminada`);

    return await saveCourse(courseId, { modules: course.modules });
  } catch (error) {
    console.error('Error eliminando sección:', error);
    return false;
  }
};

// ==================== UTILIDADES ====================

/**
 * Obtener todas las secciones de un curso (aplanadas)
 * @param course - Curso completo
 * @returns Array de todas las secciones
 */
export const getAllSections = (course: Course): Section[] => {
  return course.modules.flatMap(module => module.sections);
};

/**
 * Contar total de secciones en un curso
 * @param course - Curso completo
 * @returns Número total de secciones
 */
export const getTotalSections = (course: Course): number => {
  return getAllSections(course).length;
};

/**
 * Contar total de módulos en un curso
 * @param course - Curso completo
 * @returns Número total de módulos
 */
export const getTotalModules = (course: Course): number => {
  return course.modules.length;
};

/**
 * Obtener la siguiente sección después de una dada
 * @param course - Curso completo
 * @param currentSectionId - ID de la sección actual
 * @returns Siguiente sección o null si es la última
 */
export const getNextSection = (course: Course, currentSectionId: string): Section | null => {
  const allSections = getAllSections(course);
  const currentIndex = allSections.findIndex(s => s.id === currentSectionId);
  
  if (currentIndex === -1 || currentIndex === allSections.length - 1) {
    return null;
  }
  
  return allSections[currentIndex + 1];
};

/**
 * Obtener la sección anterior a una dada
 * @param course - Curso completo
 * @param currentSectionId - ID de la sección actual
 * @returns Sección anterior o null si es la primera
 */
export const getPreviousSection = (course: Course, currentSectionId: string): Section | null => {
  const allSections = getAllSections(course);
  const currentIndex = allSections.findIndex(s => s.id === currentSectionId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return allSections[currentIndex - 1];
};