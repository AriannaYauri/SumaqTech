import React, { useState, useRef } from 'react';
import { migratePythonCourse } from '../scripts/migratePythonCourse';

const MigrateCourse: React.FC = () => {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRun = useRef(false); // ← NUEVO: evita múltiples ejecuciones

  const migrate = async () => {
    // ← NUEVO: prevenir múltiples clicks
    if (hasRun.current || loading) {
      console.log('⚠️ Ya se está ejecutando la migración');
      return;
    }

    hasRun.current = true;
    console.log('🔵 Botón clickeado');
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔵 Llamando a migratePythonCourse...');
      const result = await migratePythonCourse();
      console.log('🔵 Resultado:', result);
      
      if (result) {
        setDone(true);
        console.log('✅ Migración completada exitosamente');
      } else {
        setError('Error al copiar el curso');
        hasRun.current = false; // ← Permitir reintentar si falla
      }
    } catch (err) {
      console.error('🔴 Error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      hasRun.current = false; // ← Permitir reintentar si falla
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '20px',
          color: '#1f2937'
        }}>
          🔄 Copiar Curso a Firebase
        </h1>
        
        {loading && (
          <div style={{
            padding: '20px',
            backgroundColor: '#dbeafe',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ margin: 0, color: '#1e40af' }}>
              ⏳ Copiando curso a Firebase...
            </p>
          </div>
        )}

        {error && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fee2e2',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ margin: 0, color: '#991b1b' }}>
              ❌ {error}
            </p>
          </div>
        )}
        
        {!done ? (
          <button 
            onClick={migrate}
            disabled={loading}
            style={{
              padding: '20px 40px',
              fontSize: '20px',
              background: loading ? '#9ca3af' : '#14b8a6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#0d9488';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#14b8a6';
              }
            }}
          >
            {loading ? '⏳ Copiando...' : '🚀 Copiar Ahora'}
          </button>
        ) : (
          <div>
            <div style={{
              fontSize: '64px',
              marginBottom: '20px'
            }}>
              ✅
            </div>
            <h2 style={{ 
              color: '#059669',
              marginBottom: '10px'
            }}>
              ¡Listo!
            </h2>
            <p style={{ 
              color: '#6b7280',
              marginBottom: '30px'
            }}>
              Tu curso ya está en Firebase
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'center' 
            }}>
              <a 
                href="/admin/python"
                style={{
                  padding: '12px 24px',
                  background: '#14b8a6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}
              >
                Ver en Admin
              </a>
              <a 
                href="/curso-python"
                style={{
                  padding: '12px 24px',
                  background: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}
              >
                Ver Curso
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MigrateCourse;