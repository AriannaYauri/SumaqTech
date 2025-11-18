import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Permitir cualquier origen para la ruta /chat para el desarrollo (CORS)
CORS(app, resources={r"/chat": {"origins": "*"}})

def configurar_gemini():
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        print("ERROR: La clave de API de Gemini no está configurada en las variables de entorno.")
        print("Asegúrate de tener un archivo .env con GOOGLE_API_KEY='TU_CLAVE'.")
        return False
    
    genai.configure(api_key=api_key)
    print("Clave de API de Gemini configurada.")
    return True

# Diccionario de roles mejorado para sonar como especialistas
ROLES = {
    'programacion': "Eres un Arquitecto de Software y Desarrollador Senior. Tu objetivo es interpretar y resolver problemas de código, proporcionando la lógica, el código limpio (en bloques de código) y una explicación detallada de la solución.",
    'matematicas': "Eres un Matemático Aplicado con experiencia. Tu objetivo es interpretar y resolver problemas matemáticos, asegurando que la fórmula, los cálculos y la respuesta final sean rigurosos y estén correctamente expresados en LaTeX.",
    'calculo': "Eres un Profesor Universitario de Cálculo Avanzado. Tu objetivo es interpretar y resolver problemas de cálculo diferencial e integral, explicando la teoría subyacente, los pasos de la solución y el resultado con precisión en LaTeX.",
    'iot': "Eres un Ingeniero en Sistemas Embebidos y IoT. Tu objetivo es interpretar y resolver problemas relacionados con la conexión de dispositivos, sensores, arquitecturas de red M2M y protocolos (MQTT, CoAP).",
    'networking': "Eres un Especialista en Redes e Infraestructura (CCNA/CCNP). Tu objetivo es interpretar y resolver problemas de redes y conectividad, explicando conceptos de enrutamiento, conmutación, protocolos TCP/IP y seguridad de red.",
    'ciberseguridad': "Eres un Analista de Ciberseguridad y experto en Ethical Hacking. Tu objetivo es interpretar y resolver problemas de seguridad informática, explicando conceptos, vulnerabilidades, vectores de ataque y mejores prácticas de defensa.",
}

# Nombre del modelo de Gemini que usarás (Mantenido el que te funciona)
GEMINI_MODEL_NAME = 'models/gemini-2.5-flash' 

# Inicializar Gemini al iniciar el servidor
if configurar_gemini():
    print(f"Usando el modelo Gemini: {GEMINI_MODEL_NAME}")
else:
    print("El servidor Flask no podrá interactuar con Gemini debido a la falta de API Key.")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    selected_role_key = data.get('role', 'matematicas') 
    
    if not user_message:
        return jsonify({"error": "Mensaje no proporcionado"}), 400

    rol_ia = ROLES.get(selected_role_key, ROLES['matematicas'])
    
    # --- CONSTRUCCIÓN CONDICIONAL DEL PROMPT (CORRECCIÓN CLAVE) ---
    prompt_base = f"""
        {rol_ia}

        Responde directamente al siguiente problema. Tu respuesta debe incluir:
        1. Una breve interpretación del problema.
        2. Los pasos de la solución o los cálculos (usa **Markdown** para formato).
        3. La respuesta final.
    """
    
    latex_rule = ""
    # Solo añadir la regla de LaTeX para roles que la necesitan
    if selected_role_key in ['matematicas', 'calculo']:
        latex_rule = "\nREGLA CLAVE: Usa notación LaTeX para TODAS las fórmulas matemáticas, encerrándolas entre signos de dólar ($...$) para expresiones en línea y doble signo de dólar ($$...$$) para bloques de ecuaciones."
    
    # Agregamos la regla de código para Programación
    code_rule = ""
    if selected_role_key == 'programacion':
        code_rule = "\nREGLA CLAVE: Usa bloques de código de Markdown (```python) para el código de programación."

    prompt_content = f"""
        {prompt_base}
        {latex_rule}
        {code_rule}

        Problema del Usuario: {user_message}
        """
    # --- FIN CONSTRUCCIÓN CONDICIONAL ---
        
    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        
        response = model.generate_content(
            prompt_content,
            generation_config=genai.types.GenerationConfig(
                temperature=0.4,
                max_output_tokens=500,
            )
        )
        
        if response.candidates and response.candidates[0].finish_reason == 2:
            return jsonify({
                "response": "Lo siento, la respuesta fue bloqueada por el filtro de seguridad de la IA de Google. Por favor, intenta reformular tu pregunta."
            }), 200

        return jsonify({"response": response.text.strip()})
        
    except Exception as e:
        print(f"Error al interactuar con Gemini: {e}")
        error_message = str(e)
        if "404 POST" in error_message or "insufficient_quota" in error_message:
            return jsonify({"error": "Error de la API de Gemini: verifica el nombre del modelo o tu cuota."}), 500
        return jsonify({"error": f"Ocurrió un error inesperado en el servidor: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9520, debug=False)