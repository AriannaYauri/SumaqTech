import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, User, Calendar, Tag, Search, Plus } from 'lucide-react';


const Foro: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState('all');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

  const categories = [
  { id: 'all', name: 'Comunidad', count: 142 },
  { id: 'programming', name: 'Programación', count: 45 },
  { id: 'data-science', name: 'Ciencia de Datos', count: 23 },
  { id: 'design', name: 'Diseño UX/UI', count: 18 },
  { id: 'cybersecurity', name: 'Ciberseguridad', count: 15 },
  { id: 'career', name: 'Carrera Profesional', count: 32 },
  { id: 'mentorias', name: 'Mentorías', count: 12 },
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
      category: 'projects',
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
  author: 'Diego Mendoza 🎓 Mentor',
  category: 'mentorias',
  replies: 41,
  likes: 67,
  time: 'hace 2 días',
  excerpt: 'Muchos estudiantes y jóvenes desarrolladores me preguntan cómo afrontar su primera entrevista.\nAquí algunos tips que recomiendo:\n- Repasar fundamentos de programación y estructuras de datos.\n- Practicar ejercicios de lógica en plataformas como HackerRank o LeetCode.\n- Preparar ejemplos de proyectos personales para mostrar.\n- Ensayar respuestas a preguntas típicas de trabajo en equipo y resolución de problemas.\n\n¿Qué otros consejos agregarían?',
  tags: ['Carrera Tech', 'Entrevistas', 'Preparación Laboral'],
  isAnswered: true
    },
    {
      id: 5,
      title: 'Ayuda con vulnerabilidades web',
      author: 'Luis Paredes 💡 Buena pregunta',
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
  const [likedDiscussions, setLikedDiscussions] = useState<number[]>([]);
  const filteredDiscussions =
    selectedCategory === 'all'
      ? discussions.filter((d, idx, arr) => arr.findIndex(dd => dd.id === d.id) === idx)
      : discussions.filter((d) => d.category === selectedCategory);

  // Estado para edición
  const [editId, setEditId] = useState<number|null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  // Estado para mensajes emergentes (toast)
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  // Función para manejar el cierre automático del toast

  return (
  <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-teal-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            <span>Foro de la Comunidad SumaqTech</span>
          </h1>

          {/* Texto introductorio */}
          <div className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span className="block text-center">
                Explora, pregunta y construye tu futuro en el mundo STEM con nosotros.
            </span>
              <div style={{ height: '24px' }}></div>
          </div>

          {/* Banner Tema de la Semana */}
           <div className="bg-teal-100 text-black p-6 rounded-2xl shadow-lg mb-6 transition-transform duration-200 hover:scale-105">
             <style>
               {`
                 @keyframes bounceCloud {
                   0%, 100% { transform: translateY(0); }
                   10% { transform: translateY(-12px); }
                   20% { transform: translateY(0); }
                 }
               `}
             </style>
             <div className="flex items-center mb-2">
               <span
                 className="text-2xl mr-2"
                 style={{
                   display: 'inline-block',
                   animation: 'bounceCloud 3s infinite'
                 }}
               >
                 🗨️
               </span>
               <span className="font-bold text-lg">Tema de la Semana</span>
             </div>
             <div className="text-base mb-2 text-left">¿Cómo descubriste tu interés por la tecnología?</div>
             <div className="w-full flex justify-center">
               <button
                 className="bg-[#00BFA5] hover:bg-[#009e88] text-white font-semibold rounded-lg px-6 py-3 mt-4 shadow-lg transition-all duration-200 text-base"
                 onClick={() => {
                   const section = document.getElementById('foro-discussions');
                   if (section) {
                     section.scrollIntoView({ behavior: 'smooth' });
                   }
                 }}
               >
                 Participa
               </button>
             </div>
           </div>
        </div>

        {/* Grid principal reorganizado */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar mejorado */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Botón Nueva Discusión destacado */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <button className="w-full bg-[#00BFA5] hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2 mb-2" onClick={() => setShowForm(true)}>
                <Plus className="w-5 h-5" />
                <span>Nueva Discusión</span>
              </button>
            </div>
      {/* Modal Formulario Nueva Discusión */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowForm(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-[#00BFA5] mb-4 text-center">Nueva Discusión</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                // Verificar si es la primera publicación del usuario
                const yaTienePublicacion = discussions.some(d => d.author === 'Tú');
                const nuevaDiscusion = {
                  id: Date.now(),
                  title: formTitle,
                  author: 'Tú',
                  category: formCategory,
                  replies: 0,
                  likes: 0,
                  time: 'ahora',
                  excerpt: formContent,
                  tags: [],
                  isAnswered: false
                };
                setDiscussions(prev => [nuevaDiscusion, ...prev]);
                setShowForm(false);
                setFormTitle('');
                setFormContent('');
                setFormCategory('all');
                setToastMsg(
                  !yaTienePublicacion
                    ? '¡Tu primera publicación ha sido finalizada con éxito! 🎉'
                    : '¡Publicación exitosa!'
                );
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3500);
              }}
              className="space-y-4"
            >
      {/* Toast flotante */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] bg-[#00BFA5] text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-base animate-fadeIn">
          {toastMsg}
        </div>
      )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value)}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="Escribe el título de tu discusión"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  placeholder="Comparte tu experiencia o pregunta"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00BFA5] hover:bg-[#009e88] text-white font-semibold rounded-lg px-6 py-3 mt-2 shadow-lg transition-all duration-200 text-base"
              >
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}

            {/* Categorías organizadas */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-[#E3F6FD] text-teal-800 border-l-4 border-[#00BFA5]'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="font-medium flex items-center">
                      {category.id === 'programming' && <span className="mr-2">💻</span>}
                      {category.id === 'data-science' && <span className="mr-2">📊</span>}
                      {category.id === 'design' && <span className="mr-2">🎨</span>}
                      {category.id === 'cybersecurity' && <span className="mr-2">🛡️</span>}
                      {category.id === 'career' && <span className="mr-2">💼</span>}
                      {category.id === 'mentorias' && <span className="mr-2">🎓</span>}
                      {category.id === 'all' && <span className="mr-2">🌐</span>}
                      {category.id === 'projects' && <span className="mr-2">🚀</span>}
                      {category.name}
                    </span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tendencias */}
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
          </aside>

          {/* Contenido principal mejorado */}
          <main className="lg:col-span-3">
            {/* Barra de búsqueda */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar discusiones..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                />
              </div>
            </div>

            {/* Lista de discusiones */}
            <div id="foro-discussions" className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border-2 relative"
                  style={
                    discussion.author.includes('Carlos Mendoza')
                      ? { borderColor: '#B3E5FC' }
                      : discussion.author.includes('María González')
                      ? { borderColor: '#D1B3FF' }
                      : discussion.author.includes('Ana Rodríguez')
                      ? { borderColor: '#FFB6C1' }
                      : discussion.author.includes('Luis Paredes')
                      ? { borderColor: '#B9FBC0' }
                      : discussion.author.includes('Diego Mendoza') ||
                        discussion.author.includes('Ana Torres')
                      ? { borderColor: '#B3C6FF' }
                      : undefined
                  }
                >
                  {/* Opciones de editar/eliminar solo para publicaciones propias */}
                  {discussion.author === 'Tú' && editId !== discussion.id && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 text-xs font-semibold shadow"
                        onClick={() => {
                          setEditId(discussion.id);
                          setEditTitle(discussion.title);
                          setEditContent(discussion.excerpt);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 text-xs font-semibold shadow"
                        onClick={() => {
                          if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
                            setDiscussions(prev => prev.filter(d => d.id !== discussion.id));
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                  {/* Formulario de edición inline */}
                  {editId === discussion.id ? (
                    <form
                      className="space-y-2 mb-4"
                      onSubmit={e => {
                        e.preventDefault();
                        setDiscussions(prev => prev.map(d => d.id === discussion.id ? { ...d, title: editTitle, excerpt: editContent } : d));
                        setEditId(null);
                      }}
                    >
                      <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        required
                      />
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={3}
                        required
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="bg-[#00BFA5] text-white px-4 py-2 rounded font-semibold shadow hover:bg-[#009e88]">Guardar</button>
                        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold shadow" onClick={() => setEditId(null)}>Cancelar</button>
                      </div>
                    </form>
                  ) : null}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {/* Nombre del autor con insignias */}
                          {(() => {
                            const [nombre, apellido] = discussion.author.split(' ');
                            const nameFull = apellido ? `${nombre} ${apellido}` : nombre;
                            let rest = discussion.author.replace(nameFull, '').trim();
                            return (
                              <>
                                {nameFull}
                                {rest.includes('Buena pregunta') && (
                                  <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                    💡 Buena pregunta
                                  </span>
                                )}
                                {rest.includes('Primer') && (
                                  <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                    ✨ Primer post
                                  </span>
                                )}
                                {rest.includes('Respuesta') && (
                                  <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                    💡 Respuesta útil
                                  </span>
                                )}
                                {rest.includes('Innovador') && (
                                  <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                    🚀 Innovador
                                  </span>
                                )}
                                {rest.includes('Mentor') && (
                                  <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>
                                    🎓 Mentor
                                  </span>
                                )}
                              </>
                            );
                          })()}
                        </p>
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
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-[#00BFA5] cursor-pointer">
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
                        className={`flex items-center space-x-1 focus:outline-none ${likedDiscussions.includes(discussion.id) ? 'text-[#00BFA5]' : 'text-gray-500 hover:text-[#00BFA5]'}`}
                        onClick={() => {
                          if (!likedDiscussions.includes(discussion.id)) {
                            setDiscussions((prev) =>
                              prev.map((d) =>
                                d.id === discussion.id ? { ...d, likes: d.likes + 1 } : d
                              )
                            );
                            setLikedDiscussions((prev) => [...prev, discussion.id]);
                          } else {
                            setDiscussions((prev) =>
                              prev.map((d) =>
                                d.id === discussion.id ? { ...d, likes: d.likes - 1 } : d
                              )
                            );
                            setLikedDiscussions((prev) => prev.filter((id) => id !== discussion.id));
                          }
                        }}
                        type="button"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{discussion.likes}</span>
                      </button>
                      <button
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 focus:outline-none"
                        onClick={() => {
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

            {/* Botón cargar más */}
            <div className="text-center mt-8">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                Cargar más discusiones
              </button>
            </div>
          </main>
        </div> {/* 👈 Cierre del grid reorganizado */}
      </div>
    </div>
  );
};

export default Foro;