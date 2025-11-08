import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
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

# Diccionario para mapear opciones a prompts del sistema (Mantenido igual)
ROLES = {
    'programacion': "Eres un experto en programación. Tu objetivo es interpretar y resolver problemas de código, proporcionando la lógica, el código y la salida esperada.",
    'matematicas': "Eres un experto en matemáticas. Tu objetivo es interpretar y resolver problemas matemáticos, mostrando la fórmula, los cálculos y la respuesta final.",
    'calculo': "Eres un experto en cálculo. Tu objetivo es interpretar y resolver problemas de cálculo diferencial e integral, explicando la teoría, los pasos de la solución y el resultado.",
    'iot': "Eres un experto en IoT (Internet de las Cosas). Tu objetivo es interpretar y resolver problemas relacionados con la conexión de dispositivos, sensores, arquitecturas y protocolos.",
    'ciberseguridad': "Eres un experto en ciberseguridad. Tu objetivo es interpretar y resolver problemas de seguridad informática, explicando conceptos, vulnerabilidades y mejores prácticas."
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
    
    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        
        prompt_content = f"""
        {rol_ia}

        Responde directamente al siguiente problema. Tu respuesta debe incluir:
        1. Una breve interpretación del problema (qué se pide y qué datos tienes).
        2. Los pasos de la solución o los cálculos.
        3. La respuesta final.

        IMPORTANTE: Usa notación LaTeX para todas las fórmulas matemáticas, encerrándolas entre signos de dólar ($...$) para expresiones en línea y doble signo de dólar ($$...$$) para bloques de ecuaciones.

        Problema del Usuario: {user_message}
        """
        
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
    app.run(host='0.0.0.0', port=9579, debug=False)