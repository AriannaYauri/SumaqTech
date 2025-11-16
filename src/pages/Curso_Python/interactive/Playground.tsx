import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2, Code2, Terminal } from 'lucide-react';

const Playground: React.FC<{ initialCode?: string }> = ({ initialCode }) => {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<string>('Cargando Pyodide...');
  const [code, setCode] = useState(initialCode || '# Escribe tu código Python aquí\nprint("¡Hola SumaqTech!")');
  const pyodideRef = useRef<any>(null);

  // Función para cargar Pyodide dinámicamente
  const loadPyodideScript = () => {
    return new Promise<void>((resolve, reject) => {
      if ((window as any).pyodide) {
        pyodideRef.current = (window as any).pyodide;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
      script.async = true;

      script.onload = async () => {
        try {
          const pyodide = await (window as any).loadPyodide();
          (window as any).pyodide = pyodide;
          pyodideRef.current = pyodide;
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      script.onerror = () => reject(new Error('Error cargando Pyodide'));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        await loadPyodideScript();
        if (!cancelled) {
          setLoading(false);
          setOutput('Pyodide cargado ✅');
        }
      } catch (err) {
        if (!cancelled) {
          setLoading(false);
          setOutput('❌ No se pudo cargar Pyodide');
          console.error(err);
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const run = async () => {
    setOutput('⚡ Ejecutando...');
    try {
      const pyodide = pyodideRef.current;
      if (!pyodide) throw new Error('Pyodide no cargado');

      const wrapped = `
import sys, io
buf = io.StringIO()
sys.stdout = buf
sys.stderr = buf
try:
${code.split('\n').map(l => '    ' + l).join('\n')}
except Exception as e:
    print("ERROR:", e)
buf.getvalue()
`;
      const res = await pyodide.runPythonAsync(wrapped);
      setOutput(res || '✓ Código ejecutado correctamente (sin salida)');
    } catch (err: any) {
      setOutput(`❌ Error:\n${String(err)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        

        {/* Editor container */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-2xl blur opacity-20 animate-pulse"></div>
          <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">

            {/* Tab bar */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 ml-4 text-gray-400">
                <Code2 className="w-4 h-4" />
                <span className="text-sm font-medium">main.py</span>
              </div>
            </div>

            {/* Editor */}
            <Editor
              height="450px"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value ?? '')}
              theme="vs-dark"
              options={{
                fontSize: 15,
                minimap: { enabled: false },
                fontFamily: 'Fira Code, Consolas, monospace',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                padding: { top: 16, bottom: 16 },
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
              }}
            />

            {/* Botones */}
            <div className="bg-gray-800 border-t border-gray-700 p-4 flex gap-3">
              <button
                onClick={run}
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl text-white shadow-lg transition-all duration-300 ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 hover:scale-[1.02] hover:shadow-cyan-500/50 active:scale-[0.98]'
                }`}
              >
                <Play className="w-5 h-5" fill="currentColor" />
                <span>{loading ? 'Cargando Python...' : 'Ejecutar Código'}</span>
              </button>

              <button
                onClick={() => {
                  setCode('');
                  setOutput('');
                }}
                className="px-5 py-3 flex items-center gap-2 border-2 border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                <Trash2 className="w-5 h-5" />
                <span>Limpiar</span>
              </button>
            </div>

            {/* Output terminal */}
            <div className="bg-gray-950 border-t border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                <Terminal className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Salida</span>
              </div>
              <div className="bg-black/40 text-gray-100 p-4 rounded-lg font-mono text-sm h-56 overflow-auto shadow-inner border border-gray-800 whitespace-pre-wrap scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {output || <span className="text-gray-500 italic">La salida aparecerá aquí...</span>}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scrollbar custom */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 8px; }
        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb { background-color: #374151; border-radius: 4px; }
        .scrollbar-track-gray-900::-webkit-scrollbar-track { background-color: #111827; }
      `}</style>
    </div>
  );
};

export default Playground;
