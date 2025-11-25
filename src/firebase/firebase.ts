import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // ← Agregar getDoc
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';

// ===== VALIDACIÓN DE VARIABLES DE ENTORNO =====
const requiredEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Verificar que todas las variables requeridas estén definidas
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingVars);
  console.error('Por favor, asegúrate de tener un archivo .env.local o .env con todas las variables VITE_FIREBASE_*');
  console.error('Recomendación: Usa .env.local para desarrollo (está en .gitignore por defecto)');
}

const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey,
  authDomain: requiredEnvVars.authDomain,
  projectId: requiredEnvVars.projectId,
  storageBucket: requiredEnvVars.storageBucket,
  messagingSenderId: requiredEnvVars.messagingSenderId,
  appId: requiredEnvVars.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Opcional
};

// ===== INICIALIZACIÓN DE FIREBASE =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const firebaseApp = app;
export const firebaseAuth = auth;
export { db };

// ===== FUNCIÓN PARA MAPEAR ERRORES DE FIREBASE =====
function getErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada';
    case 'auth/user-not-found':
      return 'No existe una cuenta con este correo';
    case 'auth/wrong-password':
      return 'La contraseña es incorrecta';
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña es muy débil. Debe tener al menos 6 caracteres';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde';
    default:
      return error.message || 'Ocurrió un error inesperado';
  }
}

// ===== FUNCIÓN DE LOGIN =====
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    return { 
      success: true, 
      token, 
      user: await mapUserWithFirestore(cred.user), // ← CAMBIADO
      error: null 
    };
  } catch (error) {
    const authError = error as AuthError;
    return {
      success: false,
      token: null,
      user: null,
      error: getErrorMessage(authError)
    };
  }
};

// ===== FUNCIÓN DE REGISTRO =====
export const signupWithEmail = async (name: string, email: string, password: string) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    
    if (name) {
      await updateProfile(cred.user, {
        displayName: name
      });
    }
    
    // Guardar usuario en Firestore con rol 'student' por defecto
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      name: name,
      role: 'student',
      createdAt: new Date().toISOString()
    });
    
    const token = await cred.user.getIdToken();
    return { 
      success: true, 
      token, 
      user: await mapUserWithFirestore(cred.user), // ← CAMBIADO
      error: null 
    };
  } catch (error) {
    const authError = error as AuthError;
    return {
      success: false,
      token: null,
      user: null,
      error: getErrorMessage(authError)
    };
  }
};

// ===== FUNCIÓN DE LOGOUT =====
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    const authError = error as AuthError;
    return {
      success: false,
      error: getErrorMessage(authError)
    };
  }
};

// ===== FUNCIÓN DE LOGIN CON GOOGLE =====
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    
    // Verificar si el usuario ya existe en Firestore
    const userDocRef = doc(db, 'users', cred.user.uid);
    const userDoc = await getDoc(userDocRef);
    
    // Si no existe, crearlo con role 'student'
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        name: cred.user.displayName,
        role: 'student',
        createdAt: new Date().toISOString()
      });
    }
    
    const token = await cred.user.getIdToken();
    return { 
      success: true, 
      token, 
      user: await mapUserWithFirestore(cred.user), // ← CAMBIADO
      error: null 
    };
  } catch (error) {
    const authError = error as AuthError;
    return {
      success: false,
      token: null,
      user: null,
      error: getErrorMessage(authError)
    };
  }
};

// ===== LISTENER DE CAMBIOS DE AUTENTICACIÓN (MEJORADO) =====
export const onAuthChange = (cb: (user: { uid: string; email?: string; name?: string; role?: 'admin' | 'student' } | null) => void) => {
  return onAuthStateChanged(auth, async (u) => {
    if (u) {
      const userWithRole = await mapUserWithFirestore(u);
      console.log('🔥 Usuario cargado con role desde Firestore:', userWithRole);
      cb(userWithRole);
    } else {
      cb(null);
    }
  });
};

// ===== FUNCIÓN PARA MAPEAR USUARIO BÁSICO (solo Firebase Auth) =====
function mapUser(u: FirebaseUser) {
  return { 
    uid: u.uid, 
    email: u.email ?? undefined, 
    name: u.displayName ?? undefined 
  };
}

// ===== NUEVA FUNCIÓN: MAPEAR USUARIO CON DATOS DE FIRESTORE =====
async function mapUserWithFirestore(u: FirebaseUser) {
  const basicUser = mapUser(u);
  
  try {
    // Cargar datos adicionales desde Firestore
    const userDocRef = doc(db, 'users', u.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      console.log('📄 Datos de Firestore para', u.uid, ':', userData);
      
      return {
        ...basicUser,
        name: userData.name || basicUser.name,
        role: userData.role || 'student'
      };
    } else {
      console.warn('⚠️ No se encontró documento en Firestore para:', u.uid);
      console.warn('   El usuario solo tiene datos de Firebase Auth');
      return {
        ...basicUser,
        role: 'student' as const
      };
    }
  } catch (error) {
    console.error('❌ Error al cargar datos de Firestore:', error);
    return {
      ...basicUser,
      role: 'student' as const
    };
  }
}

