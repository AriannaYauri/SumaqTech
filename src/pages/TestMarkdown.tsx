import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

const TestMarkdown: React.FC = () => {
  const testContent = `
# 🐍 SECCIÓN 1: Conoce a Python

## Historia introductoria

Después de preparar su laboratorio digital, Inti abre Python por primera vez.

---

## 1. ¿Qué es Python?

Python es un lenguaje de programación **muy poderoso** y *fácil de aprender*.

### Ejemplo básico

\`\`\`python
# Mi primer programa
nombre = "Inti"
print(f"Hola, {nombre}!")
\`\`\`

**Salida:**
\`\`\`
Hola, Inti!
\`\`\`

---

## 2. Tipos de datos

| Tipo | Significado | Ejemplo |
|------|-------------|---------|
| \`str\` | Texto | \`"Hola"\` |
| \`int\` | Número entero | \`42\` |
| \`float\` | Decimal | \`3.14\` |

---

## 3. Tips importantes

> 💡 **Tip de Qori:** Usa nombres descriptivos para tus variables.

> ⚠️ **Importante:** Python distingue mayúsculas y minúsculas.

> ℹ️ **Nota:** Puedes usar \`input()\` para pedir datos.

> ✅ **Correcto:** \`nombre = "Inti"\`

> ❌ **Incorrecto:** \`2nombre = "Inti"\`

---

## 4. Actividad práctica

Crea un programa que:
1. Pida tu nombre
2. Pida tu edad
3. Muestre un saludo personalizado

\`\`\`python
nombre = input("¿Cómo te llamas? ")
edad = int(input("¿Cuántos años tienes? "))
print(f"¡Hola {nombre}! Tienes {edad} años.")
\`\`\`

---

## 5. Recursos adicionales

- [Documentación oficial](https://docs.python.org)
- Tutorial en video
- Ejercicios interactivos

---

> 🏆 **¡Nivel 1 Desbloqueado!** - "Explorador del Lenguaje Python"

¡Felicidades! Has completado la primera sección.
  `;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <MarkdownRenderer content={testContent} />
        </div>
      </div>
    </div>
  );
};

export default TestMarkdown;