import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carga variables de entorno (necesario si lo ejecutas en la terminal)
load_dotenv()

def listar_modelos_disponibles():
    """
    Se conecta a la API de Gemini y lista todos los modelos accesibles 
    que soportan la generación de contenido de texto.
    """
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        print("ERROR: La clave GOOGLE_API_KEY no está configurada en el archivo .env o en el entorno.")
        return

    try:
        genai.configure(api_key=api_key)
        
        print("\n--- Modelos de Gemini disponibles para tu clave API ---")
        
        encontrados = []
        for model in genai.list_models():
            # Filtra solo los modelos que pueden generar contenido de texto
            if 'generateContent' in model.supported_generation_methods:
                encontrados.append(model.name)

        if encontrados:
            for nombre_modelo in encontrados:
                # Muestra el nombre exacto que debes usar en tu app.py
                print(f"✅ PUEDES USAR: '{nombre_modelo}'")
            print("\n¡Usa el nombre de uno de estos modelos en tu archivo app.py!")
        else:
            print("❌ No se encontraron modelos disponibles para la generación de contenido. Verifica la configuración de tu cuenta en Google AI Studio.")

    except Exception as e:
        print(f"\nError al conectar con la API: {e}")
        print("Asegúrate de que tu clave GOOGLE_API_KEY sea correcta.")

if __name__ == "__main__":
    listar_modelos_disponibles()