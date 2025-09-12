import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, BarChart3, Brain } from 'lucide-react';

const TestVocacional: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "¿Qué te resulta más interesante?",
      options: [
        { text: "Resolver problemas complejos paso a paso", value: "logic" },
        { text: "Crear diseños visuales atractivos", value: "design" },
        { text: "Analizar datos y encontrar patrones", value: "data" },
        { text: "Proteger sistemas de amenazas", value: "security" }
      ]
    },
    {
      id: 2,
      question: "En tu tiempo libre prefieres...",
      options: [
        { text: "Programar pequeños proyectos", value: "logic" },
        { text: "Editar fotos o videos", value: "design" },
        { text: "Leer sobre nuevas tecnologías", value: "data" },
        { text: "Investigar sobre ciberseguridad", value: "security" }
      ]
    },
    {
      id: 3,
      question: "¿Cuál de estas actividades te emociona más?",
      options: [
        { text: "Construir una aplicación desde cero", value: "logic" },
        { text: "Diseñar la interfaz de usuario", value: "design" },
        { text: "Predecir tendencias con machine learning", value: "data" },
        { text: "Encontrar vulnerabilidades en sistemas", value: "security" }
      ]
    },
    {
      id: 4,
      question: "¿Cómo prefieres trabajar?",
      options: [
        { text: "Solo, concentrado en código", value: "logic" },
        { text: "En equipo, creando experiencias", value: "design" },
        { text: "Con datos, buscando insights", value: "data" },
        { text: "Investigando amenazas y protecciones", value: "security" }
      ]
    },
    {
      id: 5,
      question: "¿Qué te motiva más en un proyecto?",
      options: [
        { text: "Que funcione perfectamente", value: "logic" },
        { text: "Que sea visualmente impactante", value: "design" },
        { text: "Que genere valor con datos", value: "data" },
        { text: "Que esté completamente seguro", value: "security" }
      ]
    }
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores: { [key: string]: number } = {
      logic: 0,
      design: 0,
      data: 0,
      security: 0
    };

    answers.forEach((answerIndex, questionIndex) => {
      const selectedOption = questions[questionIndex].options[answerIndex];
      scores[selectedOption.value]++;
    });

    setShowResults(true);
  };

  const getRecommendation = () => {
    const scores: { [key: string]: number } = {
      logic: 0,
      design: 0,
      data: 0,
      security: 0
    };

    answers.forEach((answerIndex, questionIndex) => {
      const selectedOption = questions[questionIndex].options[answerIndex];
      scores[selectedOption.value]++;
    });

    const maxScore = Math.max(...Object.values(scores));
    const recommendation = Object.keys(scores).find(key => scores[key] === maxScore);

    const recommendations = {
      logic: {
        career: "Desarrollo de Software",
        description: "Tienes una mentalidad lógica y estructurada. Te destacarías creando aplicaciones, sistemas y resolviendo problemas complejos a través del código.",
        skills: ["JavaScript", "Python", "React", "Node.js"],
        color: "bg-blue-500"
      },
      design: {
        career: "UX/UI Design & Frontend",
        description: "Tienes ojo para el diseño y la experiencia del usuario. Combinar creatividad con tecnología es tu fuerte.",
        skills: ["Figma", "CSS", "React", "Design Thinking"],
        color: "bg-purple-500"
      },
      data: {
        career: "Ciencia de Datos",
        description: "Te apasiona encontrar patrones y generar insights. Los datos son tu lenguaje y el análisis tu herramienta.",
        skills: ["Python", "SQL", "Machine Learning", "Estadística"],
        color: "bg-green-500"
      },
      security: {
        career: "Ciberseguridad",
        description: "Tienes mentalidad investigativa y te interesa proteger sistemas. La seguridad digital es fundamental hoy en día.",
        skills: ["Ethical Hacking", "Análisis de Vulnerabilidades", "Criptografía"],
        color: "bg-red-500"
      }
    };

    return recommendations[recommendation as keyof typeof recommendations];
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Resultados de tu Test Vocacional!
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className={`w-full h-2 ${recommendation.color} rounded-full mb-6`}></div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrera recomendada: {recommendation.career}
            </h2>
            
            <p className="text-gray-600 text-lg mb-6">
              {recommendation.description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Tecnologías recomendadas para empezar:
              </h3>
              <div className="flex flex-wrap gap-3">
                {recommendation.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Ver Módulos Recomendados
              </button>
              <button 
                onClick={resetTest}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Repetir Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Test Vocacional Tecnológico
          </h1>
          <p className="text-gray-600">
            Descubre qué carrera tecnológica se adapta mejor a tu personalidad
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 flex items-center justify-between group"
              >
                <span className="text-gray-700 group-hover:text-teal-700">
                  {option.text}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Pregunta anterior
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestVocacional;