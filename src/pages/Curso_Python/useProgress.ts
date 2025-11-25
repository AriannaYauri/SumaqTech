import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';

export interface SectionProgress {
  completed: boolean;
  completedAt?: string;
  timeSpent?: number;
}

export type ProgressMap = Record<string, SectionProgress>;

export const useProgress = (courseId: string) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProgress();
    } else {
      setLoading(false);
    }
  }, [user, courseId]);

  const loadProgress = async () => {
    if (!user) return;

    try {
      const progressDoc = await getDoc(
        doc(db, 'users', user.uid, 'progress', courseId)
      );

      if (progressDoc.exists()) {
        setProgress(progressDoc.data().sections || {});
      }
    } catch (error) {
      console.error('Error cargando progreso:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (sectionId: string, completed: boolean) => {
    if (!user) return;

    const newProgress = {
      ...progress,
      [sectionId]: {
        completed,
        completedAt: completed ? new Date().toISOString() : undefined,
      },
    };

    setProgress(newProgress);

    try {
      await setDoc(
        doc(db, 'users', user.uid, 'progress', courseId),
        { sections: newProgress },
        { merge: true }
      );
    } catch (error) {
      console.error('Error guardando progreso:', error);
    }
  };

  return { progress, loading, updateProgress };
};