export type Section = {
  id: string;
  title: string;
  summary?: string;
  paragraphs?: string[];
  codeExamples?: { id: string; language: string; code: string }[];
  exercises?: { id: string; title: string; prompt: string }[];
  tips?: string[];
};

export type Module = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  sections: Section[];
};

const module1: Module = {
  id: 'modulo1-logica',
  title: 'Módulo 1 — Lógica de Programación',
  subtitle: 'Aprende a pensar como programador con secuencias, decisiones, bucles y diagramas de flujo',
  // Reemplaza esta URL con la URL directa de la imagen de ImgBB
  // La URL directa normalmente es: https://i.ibb.co/xxxxx/nombre-imagen.jpg
  // Para obtenerla: Haz clic derecho en la imagen en ImgBB > "Copiar dirección de la imagen"
  image: 'https://i.ibb.co/s9t2MWcN/SUMAQTECH-1.png', // CAMBIAR ESTA URL
  sections: [
    {
      id: 'm1-s1',
      title: 'Sección 1 — ¿Qué es programar?',
      summary: 'Aprende qué significa programar con ejemplos, analogías y actividades guiadas.',
      paragraphs: [
        'Inti llega a SumaqLab emocionado por comenzar su primer día. Qori lo recibe con una sonrisa y lo lleva a una mesa llena de pequeños robots. —“Hoy entenderás la base de todo lo que harás aquí: programar”, le dice.',
        'Programar significa dar instrucciones claras y ordenadas a una computadora para que realice una tarea. Es como escribir una receta: cada paso debe estar explicado con claridad y en el orden correcto.',
        'Gracias a la programación, podemos crear: juegos 🎮, aplicaciones 📱, sitios web 💻, herramientas científicas 🔬 y robots que obedecen instrucciones 🤖.',
        'Ejemplos de lenguajes de programación: Python, JavaScript, C++.',
        'Programar consiste en diseñar y escribir algoritmos, es decir, conjuntos de instrucciones lógicas y ordenadas, utilizando un lenguaje que la computadora pueda interpretar.',
        'Analogía: Programar es como decirle a un robot exactamente qué hacer, paso a paso.'
      ],
      exercises: [
        {
          id: 'm1-s1-ex1',
          title: 'Mini desafío — instrucciones cotidianas',
          prompt: 'Piensa en una acción cotidiana, como preparar un sándwich o lavarte los dientes. Escribe los pasos que seguirías en el orden correcto.'
        }
      ],
      tips: [
        'Asegúrate de que cada paso sea claro y sencillo.',
        'No te preocupes por equivocarte: los errores te ayudan a mejorar tus instrucciones.',
        'Recuerda: una computadora sigue EXACTAMENTE lo que dices… no lo que quieres decir.'
      ],
      codeExamples: []
    },
    {
      id: 'm1-s2',
      title: 'Sección 2 — Secuencias de pasos (EOS)',
      summary: 'Aprende a dar instrucciones en orden y comprender las secuencias.',
      paragraphs: [
        'Una secuencia de pasos es un conjunto de instrucciones que se ejecutan una tras otra, en orden. Es como seguir una receta de cocina: primero haces un paso, luego el siguiente, hasta terminar.',
        'Ejemplo cotidiano: Levantarse → Cepillarse los dientes → Vestirse → Desayunar.',
        'En programación, la Estructura de Operaciones Secuenciales (EOS) organiza pasos de arriba hacia abajo sin saltos ni decisiones. Es la base de todo programa.'
      ],
      exercises: [
        {
          id: 'm1-s2-ex1',
          title: 'Actividad guiada — Ordena tu mochila',
          prompt: 'Ordena los pasos para preparar tu mochila: Colocar lápices / Abrir mochila / Cerrar mochila / Colocar cuadernos. Solución correcta: 1. Abrir mochila 2. Colocar lápices 3. Colocar cuadernos 4. Cerrar mochila'
        },
        {
          id: 'm1-s2-ex2',
          title: 'Mini desafío',
          prompt: 'Piensa en una actividad cotidiana, escribe los pasos en el orden correcto y comprueba que todos los pasos estén claros y completos.'
        }
      ],
      tips: [
        'Cada paso debe ser claro y fácil de seguir.',
        'No importa si se te ocurre un paso extra; lo importante es mantener un orden lógico.',
        'Practicar secuencias te ayudará a organizar tus ideas antes de escribir un programa.'
      ],
      codeExamples: []
    },
    {
      id: 'm1-s3',
      title: 'Sección 3 — Decisiones (Condicionales)',
      summary: 'Aprende a usar condicionales para que el programa tome decisiones.',
      paragraphs: [
        'A veces no todos los pasos se hacen siempre; dependen de una condición. Un condicional permite que un programa tome una decisión: si se cumple una condición → hace una acción; si no se cumple → hace otra.',
        'Ejemplo cotidiano: Si está lloviendo → tomo paraguas; Si no → salgo sin paraguas.',
        'En programación, un condicional permite que el flujo del programa cambie según una condición. La estructura básica es: if (si) / else (si no).',
        'Analogía: Tomar decisiones en programación es como elegir qué ropa usar según el clima.'
      ],
      exercises: [
        {
          id: 'm1-s3-ex1',
          title: 'Actividad práctica — Decisiones diarias',
          prompt: 'Piensa en una decisión cotidiana que tomes todos los días. Escribe las posibles condiciones y las acciones para cada una.'
        }
      ],
      tips: [
        'Antes de decidir qué hacer, pregúntate: “¿qué condición cambia mi acción?”',
        'Identifica decisiones en tu rutina diaria: eso te ayudará a pensar como un programador.',
        'Las decisiones pueden ser simples al principio, pero se vuelven más complejas conforme avances.'
      ],
      codeExamples: []
    },
    {
      id: 'm1-s4',
      title: 'Sección 4 — Repeticiones (Bucles)',
      summary: 'Aprende a repetir acciones usando bucles for y while.',
      paragraphs: [
        'Un bucle permite repetir un conjunto de instrucciones varias veces sin escribir todo de nuevo.',
        'Ejemplo cotidiano: Saltar 5 veces → no escribes “saltar” cinco veces, solo dices “repetir 5 veces”.',
        'Tipos de bucles: for (repetir un número fijo de veces), while (repetir mientras se cumpla una condición).',
        'Usa for cuando sabes cuántas veces se repite la acción, while cuando no lo sabes y depende de una condición.'
      ],
      exercises: [
        {
          id: 'm1-s4-ex1',
          title: 'Actividad práctica — Bucle diario',
          prompt: 'Piensa en una acción que repitas varias veces (por ejemplo, escribir números del 1 al 10, saltar la cuerda). Escribe cómo lo harías paso a paso y luego simplifícalo usando un bucle.'
        }
      ],
      tips: [
        'Identifica acciones repetitivas en tu día a día: eso te ayudará a pensar en bucles.',
        'Usa bucles para ahorrar tiempo y evitar errores.',
        'Empieza con bucles simples y luego practica con otros más complejos.'
      ],
      codeExamples: [
        {
          id: 'm1-s4-py1',
          language: 'python',
          code: 'for i in range(1,6):\n    print("Vuelta", i)'
        }
      ]
    },
    {
      id: 'm1-s5',
      title: 'Sección 5 — Diagramas de flujo',
      summary: 'Visualiza tus programas usando diagramas de flujo.',
      paragraphs: [
        'Un diagrama de flujo muestra gráficamente pasos y decisiones de un programa. Sirve para planificar, visualizar y detectar errores.',
        'Símbolos: Óvalo (inicio/fin), Rectángulo (acción), Rombo (decisión), Paralelogramo (entrada/salida), Flechas (flujo).',
        'Ejemplo cotidiano: Preparar un jugo → Lavar frutas → Exprimir → Decidir si agregar agua → Servir.'
      ],
      exercises: [
        {
          id: 'm1-s5-ex1',
          title: 'Desafío de diagramas — Nivel 1',
          prompt: 'Dibuja un diagrama para “Cepillarse los dientes” con inicio, pasos secuenciales y fin.'
        },
        {
          id: 'm1-s5-ex2',
          title: 'Desafío de diagramas — Nivel 2',
          prompt: 'Dibuja un diagrama para “Elegir qué ponerte” con una decisión sobre el clima y al menos 4 pasos.'
        }
      ],
      tips: [
        'Dibuja tus ideas antes de escribir código.',
        'Empieza con diagramas simples y aumenta la complejidad poco a poco.',
        'Asegúrate de que cualquiera pueda seguir tu diagrama sin confundirse.'
      ],
      codeExamples: []
    },
    {
      id: 'm1-s6',
      title: 'Sección 6 — Mini proyecto final: ¡Programemos al Chef Robot!',
      summary: 'Integra todo lo aprendido: secuencias, decisiones, bucles y diagramas de flujo.',
      paragraphs: [
        'Es domingo por la mañana en SumaqLab. Inti encuentra a SumaqBot muy emocionado. Tu misión será crear un programa que permita a SumaqBot preparar un desayuno completo.',
        'Requisitos del proyecto:'
      ],
      exercises: [
        {
          id: 'm1-s6-ex1',
          title: 'Actividad práctica — Planificación del desayuno',
          prompt: `Paso 1: Planificación 📝
1. ¿Cuántas personas van a desayunar?
2. ¿Qué opciones de bebida ofrecerás?
3. ¿Qué opciones de plato principal?
4. ¿Permitirá personalizaciones?
5. ¿En qué orden realizará SumaqBot cada tarea?

Paso 2: Dibuja el diagrama de flujo 🎨
Crea un diagrama que muestre TODO el proceso usando símbolos: Óvalos (inicio/fin), Rectángulos (acciones), Rombos (decisiones), Paralelogramos (entradas/salidas), Flechas (flujo).

Paso 3: Actividad práctica 💡
1. Escoge un tipo de desayuno.
2. Escribe todos los pasos en orden (secuencia).
3. Identifica las decisiones del proceso.
4. Identifica repeticiones necesarias.
5. Dibuja el diagrama de flujo completo.`
        }
      ],
      tips: [
        'Ordena primero lo que se prepara más rápido o lo que necesita esperar (como tostar pan).',
        'No hay una única solución correcta. Lo importante es que los pasos sean claros, completos y en orden lógico.'
      ],
      codeExamples: [
        {
          id: 'm1-s6-py1',
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

const module2: Module = {
  id: 'modulo2-python-intro',
  title: 'Módulo 2 — Introducción a la Programación con Python',
  subtitle: 'Aprende Python paso a paso: instalación, sintaxis básica y mini proyectos',
  // Reemplaza esta URL con la URL directa de la imagen de ImgBB
  // La URL directa normalmente es: https://i.ibb.co/xxxxx/nombre-imagen.jpg
  // Para obtenerla: Haz clic derecho en la imagen en ImgBB > "Copiar dirección de la imagen"
  image: 'https://i.ibb.co/6cH50HJk/SUMAQTECH.png', // CAMBIAR ESTA URL
  sections: [
    {
      id: 'm2-s0',
      title: 'Sección 0 — Prepara tu laboratorio de programación',
      summary: 'Configura tu espacio de programación y prepara Python para practicar.',
      paragraphs: [
        'Inti llega nuevamente a SumaqLab, listo para dar su siguiente paso. Qori lo recibe con una computadora encendida y varias herramientas digitales en pantalla.',
        '“Antes de aprender a hablar el lenguaje de las máquinas —dice Qori— necesitas preparar tu laboratorio de programación. Todo programador tiene un espacio propio para experimentar, equivocarse y crear. Hoy vas a construir el tuyo.”',
        'Opción 1 – En tu computadora: Ingresa a python.org/downloads, descarga la versión más reciente (Python 3.x recomendado). Durante la instalación, marca “Add Python to PATH”. Abre la terminal o CMD y escribe: python --version. Si aparece algo como Python 3.12.1, ¡tu laboratorio está listo!',
        'Opción 2 – Sin instalar (en línea): Si no puedes instalar programas, usa entornos gratuitos como Programiz Online Python, Replit o Trinket. Escribe tu código y presiona Run ▶️.',
        'Para escribir código, necesitarás un editor o IDE (ambiente de desarrollo). Algunas opciones: IDLE (incluido con Python), Thonny (ideal para principiantes) o VS Code (más completo). Cada editor te permitirá escribir instrucciones, ejecutarlas y corregir errores.'
      ],
      exercises: [],
      tips: [
        'Asegúrate de tener Python instalado correctamente antes de avanzar.',
        'Si no puedes instalarlo, usa un entorno en línea para practicar desde cualquier dispositivo.'
      ],
      codeExamples: []
    },
    {
      id: 'm2-s1',
      title: 'Sección 1 — Conoce a Python 🐍',
      summary: 'Descubre qué es Python, por qué se llama así y cómo se comunica con la computadora.',
      paragraphs: [
        'Después de preparar su laboratorio digital, Inti abre Python por primera vez. Qori sonríe y le dice: “Has despertado a tu nuevo amigo digital. Se llama Python, y si aprendes a hablar su idioma, podrás darle órdenes a la computadora tal como lo haría un verdadero programador.”',
        'Python es un lenguaje de programación que permite dar instrucciones claras y sencillas a una computadora. A diferencia de otros lenguajes más complejos, Python se parece mucho al lenguaje humano, por eso es ideal para aprender desde cero.',
        'Aunque su logo es una serpiente 🐍, el nombre viene de Monty Python, un grupo británico de comedia que a Guido van Rossum, el creador del lenguaje, le encantaba. Quiso que Python fuera divertido, claro y sencillo, igual que los sketches del grupo.',
        'Python se utiliza en muchos campos: Inteligencia Artificial y Robótica, Desarrollo Web y Aplicaciones, Ciencia de Datos, Videojuegos y Simulaciones. Aprender Python te abre la puerta a todas estas áreas.',
        'Python sigue reglas simples: lee línea por línea, el orden importa y la indentación es sagrada. Por ejemplo:',
      ],
      exercises: [
        {
          id: 'm2-s1-ex1',
          title: 'Actividad práctica — Descubre a Python',
          prompt: `1. Abre tu entorno de Python (IDLE, Replit o uno online).\n2. Escribe y ejecuta:\nprint("Hola, soy Python. ¡Encantado de conocerte!")\n3. Cambia el mensaje y ejecútalo de nuevo.\n4. Observa cómo cada texto entre comillas aparece en pantalla.`
        }
      ],
      tips: [
        'Todo lo que va entre comillas " " se mostrará en pantalla.',
        'Si aparece un error, significa que Python necesita una instrucción mejor escrita.',
        'Empieza con mensajes simples y luego prueba variaciones.'
      ],
      codeExamples: [
        {
          id: 'm2-s1-py1',
          language: 'python',
          code: 'print("Hola Mundo")'
        },
        {
          id: 'm2-s1-py2',
          language: 'python',
          code: 'if True:\n    print("Esto está dentro del bloque")\nprint("Esto está fuera del bloque")'
        }
      ]
    },
    {
      id: 'm2-s2',
      title: 'Sección 2 — Tu Primer Programa Paso a Paso',
      summary: 'Escribe tus primeras instrucciones y aprende a mostrar mensajes en pantalla.',
      paragraphs: [
        'Inti abre su editor de Python y observa la pantalla vacía. Qori le dice: “Este es el momento en que empiezas a hablar con la computadora. Hoy escribirás tus primeras instrucciones reales. No tengas miedo: Python es paciente y siempre responde.”',
        'La instrucción print() le dice a Python: “Muestra esto en pantalla.” Puedes mostrar un saludo simple o mensajes personalizados, y combinar varios prints en secuencia.',
        'Cuidado con los errores: si olvidas las comillas o los paréntesis, Python mostrará un error. Léelo con calma, ajusta el código y vuelve a intentarlo. Incluso los programadores expertos se equivocan todos los días.'
      ],
      exercises: [
        {
          id: 'm2-s2-ex1',
          title: 'Mini desafío',
          prompt: `Crea un programa que muestre:\n1. Tu nombre\n2. Tu edad\n3. Tu frase favorita`
        },
        {
          id: 'm2-s2-ex2',
          title: 'Actividad extra',
          prompt: `Escribe un mini diálogo entre tú y tu computadora usando print().\nEjemplo:\nprint("Computadora: Hola, ¿cómo estás?")\nprint("Yo: Muy bien, gracias. ¿Y tú?")\nprint("Computadora: Lista para programar")`
        }
      ],
      tips: [
        'Los errores son pistas: te dicen qué corregir.',
        'Léelos con calma, ajusta el código y vuelve a intentarlo.',
        'Incluso los programadores expertos se equivocan todos los días.'
      ],
      codeExamples: [
        {
          id: 'm2-s2-py1',
          language: 'python',
          code: 'print("¡Hola, mundo!")'
        },
        {
          id: 'm2-s2-py2',
          language: 'python',
          code: 'print("Hola")\nprint("Bienvenido al mundo de Python")'
        }
      ]
    },
    {
      id: 'm2-s3',
      title: 'Sección 3 — Las Variables ⚗️ La Memoria de Python',
      summary: 'Aprende a guardar y usar información en Python mediante variables.',
      paragraphs: [
        'Después de aprender a mostrar mensajes, Inti le pregunta a Qori: “¿Y si quiero que Python recuerde mi nombre o mi edad sin escribirlos cada vez?” Qori le sonríe: “Entonces necesitas usar variables. Son como pequeñas cajitas donde Python puede guardar información para usarla más tarde.”',
        'Una variable es como una caja con una etiqueta. Esa caja guarda un dato que puedes usar, cambiar o combinar.',
        'Ejemplo: Una caja llamada “nombre” podría guardar el texto “Inti”. Una llamada “edad” podría guardar el número 16.',
        'Reglas para crear variables: no pueden empezar con un número, no deben tener espacios, Python distingue mayúsculas y minúsculas, usa nombres que tengan sentido, y no pueden ser palabras reservadas.',
        'Algunas palabras reservadas son: True, False, if, else, for, while, print, class, def, return, import, and, or, not.',
        'Ejemplo de variables en Python:',
      ],
      exercises: [
        {
          id: 'm2-s3-ex1',
          title: 'Actividad guiada — Crea tu ficha digital',
          prompt: `Crea variables para guardar tu nombre, edad, ciudad y altura. Luego muéstralas en pantalla.\n\nEjemplo:\nnombre = "Fernanda"\nedad = 16\nciudad = "Cusco"\naltura = 1.65\n\nprint("Mi nombre es", nombre)\nprint("Tengo", edad, "años")\nprint("Vivo en", ciudad)\nprint("Mido", altura, "metros")`
        },
        {
          id: 'm2-s3-ex2',
          title: 'Mini desafío — Calculadora básica',
          prompt: `Crea un programa que:\n1. Guarde dos números en variables\n2. Los sume\n3. Muestre el resultado`
        }
      ],
      tips: [
        'Nombra tus variables como si fueran personajes de tu historia: cada una debe tener un propósito claro.',
        'print("Inti") muestra texto literal, mientras que print(nombre) muestra el contenido de la variable.',
        'Usa f-strings para combinar texto y variables de forma moderna: print(f"Mi nombre es {nombre} y tengo {edad} años.")'
      ],
      codeExamples: [
        {
          id: 'm2-s3-py1',
          language: 'python',
          code: 'nombre = "Inti"\nedad = 16\naltura = 1.70\n\nprint(nombre)\nprint(edad)\nprint(altura)'
        },
        {
          id: 'm2-s3-py2',
          language: 'python',
          code: 'print("Mi nombre es", nombre, "y tengo", edad, "años.")'
        },
        {
          id: 'm2-s3-py3',
          language: 'python',
          code: 'print(f"Mi nombre es {nombre} y tengo {edad} años.")'
        },
        {
          id: 'm2-s3-py4',
          language: 'python',
          code: 'print(type(nombre))\nprint(type(edad))'
        }
      ]
    },
    {
      id: 'm2-s4',
      title: 'Sección 4 — Decisiones con Python ⚖️ “Si esto, entonces aquello”',
      summary: 'Aprende a usar estructuras condicionales para que Python tome decisiones según las condiciones.',
      paragraphs: [
        'Mientras Inti programa un pequeño juego, le pregunta a Qori: “¿Cómo hago para que mi programa decida algo dependiendo de la edad del jugador?” Qori le responde: “Python puede pensar lógicamente usando la palabra mágica: if. Hoy aprenderás cómo toma decisiones.”',
        'Una estructura condicional permite que un programa elija qué hacer según una condición. Python piensa así: “Si esto es verdad, hago esto. Si no, hago otra cosa.”',
        'Reglas importantes: la indentación es obligatoria (4 espacios o 1 tab), los bloques if/elif/else terminan con dos puntos (:), y Python ejecuta solo el primer bloque verdadero.',
        'Operadores relacionales: ==, !=, >, <, >=, <= permiten comparar valores.',
        'Usando elif podemos agregar más caminos posibles para decisiones complejas.',
        'Operadores lógicos (and, or, not) permiten combinar o negar condiciones.'
      ],
      exercises: [
        {
          id: 'm2-s4-ex1',
          title: 'Actividad guiada — Control de acceso digital',
          prompt: `Crea un programa que decida si una persona puede entrar según su edad.\n\nEjemplo:\nedad = 14\nif edad >= 18:\n    print("Acceso permitido ✅")\nelse:\n    print("Acceso denegado 🚫")`
        },
        {
          id: 'm2-s4-ex2',
          title: 'Mini desafío — El oráculo de Qori 🔮',
          prompt: `Crea un programa que:\n1. Guarde tu nombre y edad\n2. Use if, elif y else\n3. Muestre un mensaje distinto según la edad`
        }
      ],
      tips: [
        'Cada decisión es un cruce de caminos: si guías bien a Python, nunca se perderá.',
        'Recuerda siempre usar sangría correcta para evitar errores de indentación.',
        'Usa f-strings o concatenación para combinar mensajes y variables según la condición.'
      ],
      codeExamples: [
        {
          id: 'm2-s4-py1',
          language: 'python',
          code: 'edad = 16\nif edad >= 18:\n    print("Eres mayor de edad.")\nelse:\n    print("Eres menor de edad.")'
        },
        {
          id: 'm2-s4-py2',
          language: 'python',
          code: 'nota = 15\nif nota >= 18:\n    print("Excelente 🌟")\nelif nota >= 14:\n    print("Aprobado 👍")\nelse:\n    print("Necesitas practicar más 💪")'
        },
        {
          id: 'm2-s4-py3',
          language: 'python',
          code: 'edad = 15\ncontraseña = "python123"\nif edad > 13 and contraseña == "python123":\n    print("Acceso concedido 🌀 Bienvenido al portal del conocimiento.")\nelse:\n    print("Acceso denegado 🚫 Verifica tus datos.")'
        },
        {
          id: 'm2-s4-py4',
          language: 'python',
          code: 'edad = 15\nif not (edad >= 18):\n    print("Aún no tienes la edad permitida 🚫")\nelse:\n    print("Puedes ingresar")'
        }
      ]
    },
    {
      id: 'm2-s5',
      title: 'Sección 5 — Las Operaciones 🔢 El Lenguaje de los Números',
      summary: 'Aprende a usar Python para realizar operaciones matemáticas básicas y avanzadas con números y variables.',
      paragraphs: [
        'Una mañana, Inti se sienta frente a su computadora y le pregunta a Qori: “Ya sé guardar números en variables… pero ¿cómo hago para que Python los sume o los reste?” Qori sonríe: “Has descubierto el lenguaje secreto de los números. Python puede hacer cálculos igual que tú, solo que mucho más rápido.”',
        'Python puede realizar las mismas operaciones que una calculadora: suma (+), resta (-), multiplicación (*), división (/).',
        'Además, existen operadores especiales: división entera (//), resto o módulo (%), y potencia (**).',
        'Python sigue un orden de prioridad en las operaciones, igual que las matemáticas: paréntesis (), potencias **, multiplicación/división, suma/resta.',
        'Puedes usar variables para cálculos más complejos y actualizar su valor con operadores como +=, -=, *=, /=.'
      ],
      exercises: [
        {
          id: 'm2-s5-ex1',
          title: 'Actividad guiada — La calculadora de Inti',
          prompt: `Define dos variables y muestra su suma, resta, multiplicación y división.\n\nEjemplo:\na = 12\nb = 5\nprint("Suma:", a + b)\nprint("Resta:", a - b)\nprint("Multiplicación:", a * b)\nprint("División:", a / b)`
        },
        {
          id: 'm2-s5-ex2',
          title: 'Mini desafío — El presupuesto mágico 🪙',
          prompt: `Crea un programa que calcule cuánto dinero le queda a Inti después de comprar varios objetos usando operadores como -=, += y %`
        }
      ],
      tips: [
        'Prueba tus operaciones con diferentes variables (x, y, num1, num2).',
        'Explorar distintos cálculos te ayuda a entender cómo piensa Python.',
        'Recuerda que Python respeta el orden de operaciones igual que en matemáticas.'
      ],
      codeExamples: [
        {
          id: 'm2-s5-py1',
          language: 'python',
          code: 'a = 10\nb = 4\nprint(a + b)   # Suma\nprint(a - b)   # Resta\nprint(a * b)   # Multiplicación\nprint(a / b)   # División'
        },
        {
          id: 'm2-s5-py2',
          language: 'python',
          code: 'resultado = (2 + 3) * 4 ** 2\nprint(resultado)'
        },
        {
          id: 'm2-s5-py3',
          language: 'python',
          code: 'base = 8\naltura = 3\narea = (base * altura) / 2\nprint("El área del triángulo es:", area)'
        },
        {
          id: 'm2-s5-py4',
          language: 'python',
          code: 'energia = 100\nprint("Energía inicial:", energia)\nenergia -= 15\nprint("Después de la batalla:", energia)\nenergia += 20\nprint("Energía recargada:", energia)'
        }
      ]
    },
    {
      id: 'm2-s6',
      title: 'Sección 6 — Los Bucles 🔁 El Poder de la Repetición',
      summary: 'Aprende a repetir acciones automáticamente usando bucles for y while, y a controlar su flujo con break y continue.',
      paragraphs: [
        'Mientras exploran un viejo templo digital, Inti observa una inscripción brillante que dice: “El verdadero poder del programador está en repetir sin cansarse.” Intrigado, le pregunta a Qori: “¿Repetir sin cansarse? ¿Cómo puede Python hacer eso?” Qori sonríe: “Con los bucles. Son los hechizos que le permiten a Python hacer algo una y otra vez sin que tú lo escribas mil veces.”',
        'Un bucle es una estructura que repite un bloque de código mientras se cumpla una condición o durante un número de veces. Sirve para automatizar tareas tediosas si las escribieras a mano.',
        'Bucle for: se usa cuando sabes cuántas veces repetir algo. range(n) genera números del 0 al n-1. Puedes personalizar inicio, fin y pasos, y usar break o continue para controlar el flujo.',
        'Bucle while: se usa cuando no sabes cuántas veces se repetirá, pero sí la condición para detenerse. Asegúrate de modificar algo dentro del while para evitar bucles infinitos.',
        'Puedes combinar bucles con condiciones para tomar decisiones en cada iteración.'
      ],
      exercises: [
        {
          id: 'm2-s6-ex1',
          title: 'Actividad guiada 1 — Saludos en la ceremonia',
          prompt: `Usa un bucle for para saludar a 5 sabios:\nfor sabio in range(1, 6):\n    print(f"Inti saluda al sabio número {sabio}")`
        },
        {
          id: 'm2-s6-ex2',
          title: 'Actividad guiada 2 — Contando pasos con Inti',
          prompt: `Usa un bucle while para avanzar del paso 1 al 10, pero detente si encuentras la piedra sagrada en el paso 7:\npaso = 1\nwhile paso <= 10:\n    if paso == 7:\n        print("Piedra sagrada encontrada. Deteniendo el viaje...")\n        break\n    print(f"Inti da el paso número {paso}")\n    paso += 1`
        },
        {
          id: 'm2-s6-ex3',
          title: 'Mini desafío — For y While',
          prompt: `1. Inti debe tocar el tambor 8 veces usando un for.\n2. Luego debe avanzar del paso 1 al 10, pero debe saltar el paso 5 usando while y continue.`
        }
      ],
      tips: [
        'Usa for cuando ya sabes cuántas veces quieres repetir la acción.',
        'El while es ideal cuando solo sabes cuándo debe detenerse, no cuántas veces se repetirá.',
        'Asegúrate de que algo cambie dentro del while, o Python repetirá para siempre.'
      ],
      codeExamples: [
        {
          id: 'm2-s6-py1',
          language: 'python',
          code: 'for i in range(5):\n    print("Hola, Inti!")'
        },
        {
          id: 'm2-s6-py2',
          language: 'python',
          code: 'for i in range(1, 6):\n    print(f"Vuelta número {i}")'
        },
        {
          id: 'm2-s6-py3',
          language: 'python',
          code: 'for i in range(0, 10, 2):\n    print(i)'
        },
        {
          id: 'm2-s6-py4',
          language: 'python',
          code: 'for i in range(1, 6):\n    if i == 3:\n        continue\n    if i == 5:\n        break\n    print("Número:", i)'
        },
        {
          id: 'm2-s6-py5',
          language: 'python',
          code: 'mensaje = "Inti"\nfor letra in mensaje:\n    print(letra)'
        },
        {
          id: 'm2-s6-py6',
          language: 'python',
          code: 'contador = 1\nwhile contador <= 5:\n    print(f"Vuelta número {contador}")\n    contador += 1'
        },
        {
          id: 'm2-s6-py7',
          language: 'python',
          code: 'contador = 1\nwhile contador <= 5:\n    print(f"Vuelta número {contador}")\n    if contador == 3:\n        print("¡Qori dice alto!")\n        break\n    contador += 1'
        },
        {
          id: 'm2-s6-py8',
          language: 'python',
          code: 'contador = 0\nwhile contador < 5:\n    contador += 1\n    if contador == 3:\n        print("Inti salta la tercera vuelta!")\n        continue\n    print(f"Vuelta número {contador}")'
        },
        {
          id: 'm2-s6-py9',
          language: 'python',
          code: 'for i in range(1, 6):\n    if i % 2 == 0:\n        print(f"{i} es par")\n    else:\n        print(f"{i} es impar")'
        }
      ]
    },
    {
      id: 'm2-s7',
      title: 'Sección 7 — Estructuras de Datos: Las Cajitas Mágicas de Python',
      summary: 'Aprende a organizar información usando listas, tuplas y diccionarios, y a recorrerlas con bucles para procesar datos de forma eficiente.',
      paragraphs: [
        'Inti quiere organizar la información de todos sus amigos: sus nombres, edades y ciudades. Qori le explica que para manejar muchos datos sin perderse necesita usar estructuras de datos: cajitas mágicas que guardan información de forma ordenada.',
        'Una estructura de datos es una forma de almacenar y organizar información para usarla de manera eficiente. En Python, las principales son listas, tuplas y diccionarios.',
        'Las listas son cajitas flexibles que pueden modificarse: permiten agregar, cambiar o eliminar elementos. Cada elemento tiene un índice que indica su posición.',
        'Las tuplas son cajitas selladas que no pueden modificarse una vez creadas. Son ideales para datos que deben mantenerse fijos, como coordenadas o días de la semana.',
        'Los diccionarios guardan información mediante pares clave: valor. Son útiles para relacionar datos usando etiquetas.',
        'Los bucles permiten recorrer listas, tuplas y diccionarios sin escribir cada valor manualmente.'
      ],
      codeExamples: [
        {
          id: 'm2-s7-py1',
          language: 'python',
          code: 'amigos = ["Apu", "Nina", "Sumaq"]\nprint(amigos)'
        },
        {
          id: 'm2-s7-py2',
          language: 'python',
          code: 'amigos = ["Apu", "Nina", "Sumaq"]\namigos.append("Inti")\nprint(amigos)\n\namigos.remove("Nina")\nprint(amigos)\n\nprint("Número de amigos:", len(amigos))'
        },
        {
          id: 'm2-s7-py3',
          language: 'python',
          code: 'coordenadas = (10, 20, 10)\nprint("Cantidad de 10:", coordenadas.count(10))\nprint("Índice de 20:", coordenadas.index(20))'
        },
        {
          id: 'm2-s7-py4',
          language: 'python',
          code: 'estudiante = {"nombre": "Inti", "edad": 16, "ciudad": "Cusco"}\nestudiante["edad"] = 17\ndel estudiante["ciudad"]\n\nprint("Claves:", estudiante.keys())\nprint("Valores:", estudiante.values())\nprint("Todo:", estudiante.items())'
        },
        {
          id: 'm2-s7-py5',
          language: 'python',
          code: 'amigos = ["Apu", "Sumaq", "Inti"]\nfor amigo in amigos:\n    print(f"Hola, {amigo}!")'
        },
        {
          id: 'm2-s7-py6',
          language: 'python',
          code: 'estudiante = {"nombre": "Inti", "edad": 17}\nfor clave, valor in estudiante.items():\n    print(clave, "->", valor)'
        }
      ],
      tips: [
        'Los índices funcionan como etiquetas que indican la posición de cada elemento.',
        'Usa tuplas cuando los datos no deben cambiar.',
        'Los diccionarios son perfectos cuando necesitas etiquetas para relacionar información.',
        'Con bucles puedes recorrer cualquier estructura sin escribir cada elemento manualmente.'
      ],
      exercises: [
        {
          id: 'm2-s7-ex1',
          title: 'Actividad guiada 1 — Lista',
          prompt: 'Crea una lista con tus 5 comidas favoritas y recórrela con un for.\n\ncomidas = ["Pizza", "Sushi", "Hamburguesa", "Ensalada", "Helado"]\nfor comida in comidas:\n    print(comida)'
        },
        {
          id: 'm2-s7-ex2',
          title: 'Actividad guiada 2 — Tupla',
          prompt: 'Crea una tupla con los días de la semana y muestra cuáles son fin de semana.\n\ndias = ("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo")\nfor dia in dias:\n    if dia in ("Sábado", "Domingo"):\n        print(f"{dia} es fin de semana")'
        },
        {
          id: 'm2-s7-ex3',
          title: 'Actividad guiada 3 — Diccionario',
          prompt: 'Crea un diccionario con tu nombre, edad y ciudad. Recorre sus claves y valores.\n\npersona = {"nombre": "Ana", "edad": 16, "ciudad": "Lima"}\nfor clave, valor in persona.items():\n    print(f"{clave}: {valor}")'
        },
        {
          id: 'm2-s7-ex4',
          title: 'Mini desafío — Listas, Tuplas y Diccionarios',
          prompt: 'Crea una lista, una tupla y un diccionario para guardar información sobre tus amigos (nombres, edades y ciudades). Luego recorre cada estructura con un bucle for y muestra todos los datos.'
        }
      ]
    },
    {
      id: 'm2-s8',
      title: 'Sección 8 — Funciones: Magia en tu Código',
      summary: 'Aprende a crear funciones para reutilizar código, recibir parámetros y devolver resultados —haz tu código más ordenado y poderoso.',
      paragraphs: [
        'Inti está escribiendo muchos bloques de código muy parecidos y empieza a cansarse de repetir instrucciones una y otra vez. Qori lo observa y le dice: “Inti, es hora de aprender funciones. Son como hechizos: los escribes una vez y puedes usarlos cuando quieras.”',
        'Una función es un bloque de código que realiza una tarea específica y que puedes llamar cuando lo necesites. Evitas repetir código, tu programa queda más organizado y tu código es más fácil de leer y reutilizar.',
        'Para definir una función se usa la palabra clave def seguida del nombre y paréntesis. Todo lo que tenga sangría debajo pertenece a la función. Llamar a la función ejecuta ese bloque de código.',
        'Las funciones pueden recibir parámetros (datos que les pasas para que actúen de forma personalizada) y pueden devolver valores con return, que luego puedes usar en otras partes del programa.'
      ],
      codeExamples: [
        {
          id: 'm2-s8-py1',
          language: 'python',
          code: 'def saludar():\n    print("¡Hola, Inti!")\n\nsaludar()\nsaludar()'
        },
        {
          id: 'm2-s8-py2',
          language: 'python',
          code: 'def saludar(nombre):\n    print(f"¡Hola, {nombre}!")\n\nsaludar("Inti")\nsaludar("Sumaq")'
        },
        {
          id: 'm2-s8-py3',
          language: 'python',
          code: 'def sumar(a, b):\n    return a + b\n\nresultado = sumar(5, 3)\nprint("La suma es:", resultado)'
        },
        {
          id: 'm2-s8-py4',
          language: 'python',
          code: 'def multiplicar(a, b):\n    return a * b\n\nprint(multiplicar(3, 4))\nprint(multiplicar(10, 2))'
        },
        {
          id: 'm2-s8-py5',
          language: 'python',
          code: 'def sumar_lista(numeros):\n    total = 0\n    for n in numeros:\n        total += n\n    return total\n\nprint(sumar_lista([1, 2, 3]))\nprint(sumar_lista([10, 20, 30, 40]))'
        }
      ],
      tips: [
        'Define funciones para tareas que repites varias veces; así evitas errores y haces el código más legible.',
        'Usa nombres descriptivos para las funciones y sus parámetros (por ejemplo: calcular_area, nombre_usuario).',
        'Recuerda que return devuelve un valor; sin return la función puede realizar acciones pero no devolver resultados reutilizables.'
      ],
      exercises: [
        {
          id: 'm2-s8-ex1',
          title: 'Actividad guiada — Saludo personalizado',
          prompt: 'Crea una función que reciba tu nombre y tu edad, y muestre un mensaje: "Hola, soy [nombre] y tengo [edad] años." \n\nEjemplo guía:\n\ndef presentar(nombre, edad):\n    print(f"Hola, soy {nombre} y tengo {edad} años.")\n\npresentar("Fernanda", 16)'
        },
        {
          id: 'm2-s8-ex2',
          title: 'Actividad guiada — Calculadora básica con función',
          prompt: 'Crea una función multiplicar que reciba dos números y devuelva su producto. Luego úsala con varios pares de números.\n\nEjemplo guía:\n\ndef multiplicar(a, b):\n    return a * b\n\nprint(multiplicar(3, 4))'
        },
        {
          id: 'm2-s8-ex3',
          title: 'Mini desafío — Suma de listas',
          prompt: 'Crea una función que reciba una lista de números y devuelva la suma total. Llama a la función con distintas listas y muestra los resultados.\n\nFormato esperado:\n\ndef sumar_lista(numeros):\n    total = 0\n    for n in numeros:\n        total += n\n    return total\n\nprint(sumar_lista([1, 2, 3]))'
        }
      ]
    },
    {
      id: 'm2-final',
      title: 'Sección Final — Proyecto: ¡Da Vida a SumaqBot 1.0! 🤖✨',
      summary: 'Proyecto final del Módulo 2 donde el estudiante combina variables, condicionales, bucles, estructuras de datos y funciones para crear un asistente digital básico.',
      
      paragraphs: [
        'Después de completar todos los fundamentos de Python, Inti llega a SumaqLab emocionado. Ese día, SumaqBot lo recibe con un mensaje: “¡Inti! Qori me dijo que hoy me darás una actualización. Estoy listo para convertirme en SumaqBot 1.0.”',
        'Qori explica que este será su proyecto más importante: combinar todo lo aprendido —variables, decisiones, bucles, estructuras de datos y funciones— para crear un asistente digital funcional.',
        'El objetivo del proyecto es que SumaqBot pueda registrar información, tomar decisiones, repetir acciones, usar listas o diccionarios y organizar su código con funciones claras.',
        'Para que SumaqBot funcione correctamente, debe registrar datos del usuario, mostrar un menú, ejecutar opciones, guardar información y repetirse hasta que el usuario decida salir.'
      ],

      codeExamples: [
        {
          id: 'm2-final-py1',
          language: 'python',
          code:
    `def saludar(nombre):
        print(f"Hola {nombre}, soy SumaqBot.")

    def sumar(a, b):
        return a + b

    def mostrar_menu():
        print("\\n--- MENÚ DE SUMAQBOT ---")
        print("1. Ver mis datos")
        print("2. Sumar dos números")
        print("3. Agregar una tarea")
        print("4. Mostrar tareas")
        print("5. Salir")

    usuario = {}
    tareas = []

    # Registro inicial
    usuario["nombre"] = input("Ingresa tu nombre: ")
    usuario["edad"] = int(input("Ingresa tu edad: "))

    saludar(usuario["nombre"])

    while True:
        mostrar_menu()
        opcion = input("Elige una opción: ")

        if opcion == "1":
            print(usuario)

        elif opcion == "2":
            a = int(input("Número 1: "))
            b = int(input("Número 2: "))
            print("Resultado:", sumar(a, b))

        elif opcion == "3":
            tarea = input("Nueva tarea: ")
            tareas.append(tarea)

        elif opcion == "4":
            for t in tareas:
                print("-", t)

        elif opcion == "5":
            print("Hasta pronto.")
            break

        else:
            print("Opción inválida")`
        }
      ],

      tips: [
        'Organiza primero tus funciones: son la base del proyecto.',
        'Usa listas o diccionarios para guardar datos que cambiarán durante la ejecución.',
        'El bucle while es perfecto para mantener activo el menú hasta que el usuario decida salir.',
        'Procura que SumaqBot sea claro, fácil de usar y con mensajes amigables.'
      ],

      exercises: [
        {
          id: 'm2-final-ex1',
          title: 'Paso 1 — Planificación',
          prompt:
            'Antes de programar, responde:\n1. ¿Qué funciones tendrá tu SumaqBot?\n2. ¿Qué datos debe guardar?\n3. ¿Qué decisiones tomará?\n4. ¿Qué partes usarán bucles?\n5. ¿Cómo será el menú?'
        },
        {
          id: 'm2-final-ex2',
          title: 'Paso 2 — Construcción del menú y funciones',
          prompt:
            'Crea las funciones principales: saludar(), mostrar_menu(), y al menos otra función personalizada.\nUsa un while para mantener el menú activo.'
        },
        {
          id: 'm2-final-ex3',
          title: 'Paso 3 — Gestión de datos',
          prompt:
            'Usa listas o diccionarios para guardar información del usuario, tareas, acciones o cualquier dato relevante. Debes usar al menos dos estructuras de datos.'
        },
        {
          id: 'm2-final-ex4',
          title: 'Reto final — Crea tu SumaqBot 1.0',
          prompt:
            'Crea un asistente funcional con mínimo 4 acciones diferentes. Usa variables, condicionales, bucles, listas/diccionarios y funciones. Dale personalidad propia a tu SumaqBot.'
        }
      ]
    }




  ]
};

// Estructura principal que agrupa todos los módulos
const CourseData = {
  id: 'curso-python',
  title: 'Curso de Python',
  modules: [module1, module2],
  // Función helper para obtener todas las secciones de todos los módulos (retrocompatibilidad)
  get allSections() {
    return this.modules.flatMap(module => module.sections);
  },
  // Función helper para obtener una sección por ID
  getSectionById(sectionId: string): Section | undefined {
    for (const module of this.modules) {
      const section = module.sections.find(s => s.id === sectionId);
      if (section) return section;
    }
    return undefined;
  },
  // Función helper para obtener un módulo por ID
  getModuleById(moduleId: string): Module | undefined {
    return this.modules.find(m => m.id === moduleId);
  }
};

// Exportar también los datos del primer módulo para retrocompatibilidad
export const CourseDataModule1 = module1;
export const CourseDataModule2 = module2;

export default CourseData;
