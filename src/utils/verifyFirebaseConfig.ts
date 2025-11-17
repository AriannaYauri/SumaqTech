// ===== SCRIPT DE VERIFICACIÓN DE CONFIGURACIÓN FIREBASE =====
// Ejecuta este script en la consola del navegador para verificar tu configuración

export const verifyFirebaseConfig = () => {
  console.log('🔍 Verificando configuración de Firebase...\n');

  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missing: string[] = [];
  const present: string[] = [];

  requiredVars.forEach((varName) => {
    const value = import.meta.env[varName];
    if (!value || value.trim() === '') {
      missing.push(varName);
    } else {
      present.push(varName);
    }
  });

  console.log('📋 Resultados de la verificación:\n');

  if (present.length > 0) {
    console.log('✅ Variables presentes:');
    present.forEach((varName) => {
      const value = import.meta.env[varName];
      const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
      console.log(`   ✓ ${varName}: ${displayValue}`);
    });
    console.log('');
  }

  if (missing.length > 0) {
    console.log('❌ Variables faltantes:');
    missing.forEach((varName) => {
      console.log(`   ✗ ${varName}`);
    });
    console.log('');
    console.log('⚠️  Acción requerida:');
    console.log('   1. Verifica que tengas un archivo .env.local en la raíz del proyecto');
    console.log('   2. Asegúrate de que todas las variables estén definidas');
    console.log('   3. Reinicia el servidor de desarrollo (npm run dev)');
    return false;
  }

  console.log('✅ Todas las variables de entorno están configuradas correctamente!\n');
  console.log('📝 Próximos pasos:');
  console.log('   1. Verifica en Firebase Console que Email/Password esté habilitado');
  console.log('   2. Verifica en Firebase Console que Google Auth esté habilitado (opcional)');
  console.log('   3. Prueba crear una cuenta en /auth/registrate');
  
  return true;
};

// Ejecutar automáticamente en desarrollo
if (import.meta.env.DEV) {
  verifyFirebaseConfig();
}



