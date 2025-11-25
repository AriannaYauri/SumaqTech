import { db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { Course } from '../types';

// Aquí está tu curso
const pythonCourse: Course = {
  id: 'python-101',
  title: '🐍 Aventurero Python',
  description: 'Embárcate en una aventura épica para dominar Python desde cero',
  modules: [
    {
      id: 'm1',
      title: 'MÓDULO 1: Los Primeros Pasos',
      subtitle: 'Configura tu laboratorio',
      order: 1,
      sections: [
        {
          id: 'm1-s1',
          title: '🐍 Conoce a Python',
          description: 'Tu primera sección',
          duration: '20 min',
          level: 'Explorador',
          order: 1,
          content: `# Hola Python\n\nEste es un ejemplo de contenido.`
        }
      ]
    }
  ]
};

// Función que copia a Firebase
export async function migratePythonCourse() {
  console.log('🚀 Copiando curso a Firebase...');
  
  try {
    const courseRef = doc(db, 'courses', 'python-101');
    await setDoc(courseRef, pythonCourse);
    
    console.log('✅ ¡Listo!');
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
}