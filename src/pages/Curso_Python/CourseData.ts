export type Section = {
  id: string;
  title: string;
  summary?: string;
  paragraphs?: string[];
  codeExamples?: { id: string; language: string; code: string }[];
  exercises?: { id: string; title: string; prompt: string }[];
};

const CourseData = {
  id: 'curso-python-fundamentos',
  title: 'Fundamentos de Python — SumaqTech',
  subtitle: '7 secciones: lógica, Python básico y mini proyectos interactivos',
  sections: [
    {
      id: 's1',
      title: 'Sección 1 — Lógica de programación (Chef Robot)',
      summary: 'Secuencias, decisiones, repeticiones y diagrama de flujo. Mini-proyecto Chef Robot.',
      paragraphs: [
        'Bienvenido. Aquí aprenderás a dar instrucciones claras (secuencias) y a tomar decisiones (condicionales).',
        'Actividad: planifica una receta como secuencia y dibuja su diagrama de flujo.'
      ],
      exercises: [
        { id: 'ex-s1-1', title: 'Ordena pasos', prompt: 'Ordena: Lavar frutas / Exprimir / Verter en vaso / Servir' }
      ]
    },
    {
      id: 's2',
      title: 'Sección 2 — Introducción a Python',
      summary: 'Instalación, print(), primer script y entorno.',
      paragraphs: ['Instala Python o usa un entorno online. Escribe tu primer print("Hola Mundo").'],
      codeExamples: [{ id: 'ex-py-1', language: 'python', code: 'print("Hola, SumaqTech")' }]
    },
    {
      id: 's3',
      title: 'Sección 3 — Variables y tipos',
      summary: 'Strings, int, float, bool y f-strings.',
      paragraphs: ['Aprende a guardar y mostrar datos usando variables.'],
      codeExamples: [{ id: 'ex-py-2', language: 'python', code: 'nombre = "Inti"\nedad = 16\nprint(f"{nombre} tiene {edad} años")' }]
    },
    {
      id: 's4',
      title: 'Sección 4 — Condicionales',
      summary: 'if / elif / else y operadores lógicos.',
      paragraphs: ['Toma decisiones en tu programa según condiciones.']
    },
    {
      id: 's5',
      title: 'Sección 5 — Bucles',
      summary: 'for, while, break, continue y ejemplos prácticos.',
      codeExamples: [{ id: 'ex-py-3', language: 'python', code: 'for i in range(1,6):\n    print("Vuelta", i)' }]
    },
    {
      id: 's6',
      title: 'Sección 6 — Estructuras de datos',
      summary: 'Listas, tuplas y diccionarios; recorrer con bucles.',
      codeExamples: [{ id: 'ex-py-4', language: 'python', code: "amigos = ['Apu','Nina','Sumaq']\nfor a in amigos:\n    print(a)" }]
    },
    {
      id: 's7',
      title: 'Sección 7 — Mini proyecto final (Chef Robot)',
      summary: 'Integra todo: secuencias, decisiones y bucles. Entrega plantilla y playground.',
      paragraphs: ['Proyecto: preparar desayuno para N personas. Debe incluir >=8 pasos, >=3 decisiones y >=1 bucle.'],
      codeExamples: [
        {
          id: 'proj-template',
          language: 'python',
          code:
`def preparar_bebida(tipo):
    if tipo == "cafe":
        return "Café listo"
    elif tipo == "te":
        return "Té listo"
    else:
        return "Agua"

def preparar_para(personas):
    for p in range(personas):
        print(f"Preparando desayuno para persona {p+1}")
        print(preparar_bebida("cafe"))

preparar_para(2)`
        }
      ]
    }
  ]
};

export default CourseData;