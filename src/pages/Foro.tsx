import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, User, Calendar, Tag, Search, Plus } from 'lucide-react';

const Foro: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
  { id: 'all', name: 'Comunidad', count: 142 },
    { id: 'programming', name: 'Programación', count: 45 },
    { id: 'data-science', name: 'Ciencia de Datos', count: 23 },
    { id: 'design', name: 'Diseño UX/UI', count: 18 },
    { id: 'cybersecurity', name: 'Ciberseguridad', count: 15 },
    { id: 'career', name: 'Carrera Profesional', count: 32 },
    { id: 'projects', name: 'Proyectos', count: 9 }
  ];

  const initialDiscussions = [
    {
      id: 1,
      title: '¿Cuál es la mejor forma de empezar en React?',
      author: 'Carlos Mendoza ✨ Primer post',
      category: 'programming',
      replies: 23,
      likes: 15,
      time: 'hace 2 horas',
      excerpt: 'Soy nuevo en el desarrollo web y quiero aprender React. ¿Qué recursos recomiendan para empezar?',
      tags: ['React', 'JavaScript', 'Frontend'],
      isAnswered: false
    },
    {
      id: 2,
      title: 'Compartiendo mi primer proyecto de Data Science',
      author: 'María González 🚀 Innovador',
      category: 'data-science',
      replies: 8,
      likes: 32,
      time: 'hace 5 horas',
      excerpt: 'Hice un análisis de datos de ventas usando Python y pandas. ¿Qué opinan?',
      tags: ['Python', 'Pandas', 'Análisis'],
      isAnswered: true
    },
    {
      id: 3,
      title: 'Tips para hacer un buen portfolio de diseño',
      author: 'Ana Rodríguez 💡 Respuesta útil',
      category: 'design',
      replies: 17,
      likes: 28,
      time: 'hace 1 día',
      excerpt: 'Quiero compartir algunos consejos para crear un portfolio que destaque en el mundo del diseño UX/UI.',
      tags: ['Portfolio', 'UX', 'UI', 'Diseño'],
      isAnswered: true
    },
    {
      id: 4,
      title: 'Consejos para prepararse en una entrevista tech',
      author: 'Diego Torres 🎓 Mentor',
      category: 'career',
      replies: 41,
      likes: 67,
      time: 'hace 2 días',
      excerpt: 'Muchos estudiantes y jóvenes desarrolladores me preguntan cómo afrontar su primera entrevista.\nAquí algunos tips que recomiendo:\n- Repasar fundamentos de programación y estructuras de datos.\n- Practicar ejercicios de lógica en plataformas como HackerRank o LeetCode.\n- Preparar ejemplos de proyectos personales para mostrar.\n- Ensayar respuestas a preguntas típicas de trabajo en equipo y resolución de problemas.\n\n¿Qué otros consejos agregarían?',
      tags: ['🏷️ Mentoría', '🏷️ Carrera', '🏷️ Entrevista'],
      isAnswered: true
    },
    {
      id: 5,
      title: 'Ayuda con vulnerabilidades web',
      author: 'Luis Paredes',
      category: 'cybersecurity',
      replies: 12,
      likes: 19,
      time: 'hace 3 días',
      excerpt: 'Estoy aprendiendo sobre seguridad web. ¿Pueden explicarme qué es XSS de forma simple?',
      tags: ['Seguridad', 'XSS', 'Web'],
      isAnswered: false
    },
    {
      id: 6,
      title: '¿Qué carrera STEM combina más con mi interés en arte y ciencia?',
      author: 'Ana Torres ✨ Primer Post',
      category: 'career',
      replies: 0,
      likes: 0,
      time: 'hace unos minutos',
      excerpt: 'Estoy en secundaria y no sé si estudiar Diseño o Ingeniería Biomédica...',
      tags: ['STEM', 'Arte', 'Ciencia', 'Orientación'],
      isAnswered: false
    }
  ];

  const trendingTopics = [
    { name: 'React 18', posts: 45 },
    { name: 'Machine Learning', posts: 32 },
    { name: 'Figma', posts: 28 },
    { name: 'Python', posts: 56 },
    { name: 'Job Interview', posts: 23 }
  ];

  const [discussions, setDiscussions] = useState(initialDiscussions);
  const filteredDiscussions = selectedCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span style={{ color: '#00BFA5' }}>Foro de la Comunidad</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecta, aprende y comparte conocimientos con estudiantes y profesionales de tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* New Discussion Button */}
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Nueva Discusión</span>
            </button>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-teal-100 text-teal-800'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">
                      {category.id === 'programming' && '💻 '}
                      {category.id === 'data-science' && '📊 '}
                      {category.id === 'design' && '🎨 '}
                      {category.id === 'cybersecurity' && '🛡️ '}
                      {category.id === 'career' && '🎓 '}
                      {category.id === 'all' && '🌐 '}
                      {category.id === 'projects' && '🚀 '}
                      {category.name}
                    </span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendencias</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">#{topic.name}</span>
                    <span className="text-sm text-gray-500">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar discusiones..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200${discussion.author.includes('Carlos Mendoza') ? ' border-2 border-teal-400' : ''}${discussion.author.includes('Ana Rodríguez') ? ' border-2 border-purple-400' : ''}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{discussion.author}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{discussion.time}</span>
                        </div>
                      </div>
                    </div>
                    {discussion.isAnswered && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Respondido
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-teal-600 cursor-pointer">
                    {discussion.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4">{discussion.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          <Tag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        className="flex items-center space-x-1 text-gray-500 hover:text-teal-600 focus:outline-none"
                        onClick={() => {
                          setDiscussions(prev => prev.map(d =>
                            d.id === discussion.id ? { ...d, likes: d.likes + 1 } : d
                          ));
                        }}
                        type="button"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{discussion.likes}</span>
                      </button>
                      <button
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                        onClick={() => {
                          // Aquí podrías abrir un modal o enfocar el área de comentarios
                          alert('Funcionalidad de comentarios próximamente');
                        }}
                        type="button"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{discussion.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                Cargar más discusiones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foro;