import { useState, useEffect } from 'react';
import { getCourse } from '../../firebase/courseService';
import type { Course } from '../../types';

export const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const data = await getCourse(courseId);
      setCourse(data);
    } catch (err) {
      console.error('Error cargando curso:', err);
      setError('Error cargando el curso');
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, error, reload: loadCourse };
};