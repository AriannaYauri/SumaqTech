import React, { useEffect, useRef, useState } from 'react';

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';

const Playground: React.FC<{ initialCode?: string }> = ({ initialCode }) => {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<string>('');
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if ((window as any).pyodide) {
        pyodideRef.current = (window as any).pyodide;
        setLoading(false);
        return;
      }
      const s = document.createElement('script');
      s.src = PYODIDE_CDN;
      s.onload = async () => {
        // @ts-ignore
        pyodideRef.current = await (window as any).loadPyodide();
        (window as any).pyodide = pyodideRef.current;
        if (!cancelled) setLoading(false);
      };
      document.body.appendChild(s);
    };
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (initialCode && editorRef.current) editorRef.current.value = initialCode;
  }, [initialCode]);

  const run = async () => {
    const code = editorRef.current?.value || '';
    setOutput('Ejecutando...');
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
print(buf.getvalue())
`;
      const res = await pyodide.runPythonAsync(wrapped);
      setOutput(String(res ?? 'OK'));
    } catch (err: any) {
      setOutput(String(err));
    }
  };

  return (
    <div>
      <textarea ref={editorRef} defaultValue={initialCode ?? '# Escribe tu código aquí'} className="w-full h-40 p-2 border rounded" />
      <div className="flex gap-2 mt-2">
        <button onClick={run} disabled={loading} className="px-3 py-1 bg-[#00BFA5] text-white rounded">{loading ? 'Cargando...' : 'Ejecutar'}</button>
        <button onClick={() => { if (editorRef.current) editorRef.current.value = ''; }} className="px-3 py-1 border rounded">Limpiar</button>
      </div>
      <pre className="mt-3 bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{output}</pre>
    </div>
  );
};

export default Playground;