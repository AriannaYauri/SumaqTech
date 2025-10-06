import { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  User, 
  Calendar, 
  Tag, 
  ThumbsUp, 
  MessageCircle,
  Edit2,
  Trash2,
  Save,
  X
} from 'lucide-react';

interface Discussion {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  time: string;
  excerpt: string;
  tags: string[];
  isAnswered: boolean;
}

const Foro = () => {
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

  const initialDiscussions: Discussion[] = [
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
      excerpt: 'Muchos estudiantes y jóvenes desarrolladores me preguntan cómo afrontar su primera entrevista. Aquí algunos tips que recomiendo...',
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

  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [likedDiscussions, setLikedDiscussions] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const filteredDiscussions = selectedCategory === 'all' ? discussions : discussions.filter((d) => d.category === selectedCategory);

  const handleSubmitDiscussion = () => {
    if (!formTitle.trim() || !formContent.trim()) return;
    
    const nuevaDiscusion: Discussion = {
      id: Date.now(),
      title: formTitle,
      author: 'Tú ✨ Primer post',
      category: formCategory,
      replies: 0,
      likes: 0,
      time: 'ahora',
      excerpt: formContent,
      tags: [],
      isAnswered: false
    };
    setDiscussions((prev) => [nuevaDiscusion, ...prev]);
    setFormTitle('');
    setFormContent('');
    setFormCategory('all');
    setShowForm(false);
    setToastMsg('¡Tu publicación ha sido creada! Bienvenido a la comunidad SumaqTech 🎉');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleEditDiscussion = (discussion: Discussion) => {
    setEditId(discussion.id);
    setEditTitle(discussion.title);
    setEditContent(discussion.excerpt);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === editId
          ? { ...d, title: editTitle, excerpt: editContent }
          : d
      )
    );
    setEditId(null);
    setEditTitle('');
    setEditContent('');
    setToastMsg('✅ Discusión actualizada correctamente');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleDeleteDiscussion = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta discusión?')) {
      setDiscussions((prev) => prev.filter((d) => d.id !== id));
      setToastMsg('🗑️ Discusión eliminada');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-teal-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            Foro de la Comunidad SumaqTech
          </h1>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Explora, pregunta y construye tu futuro en el mundo STEM con nosotros.
          </div>

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
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl mr-2" style={{ display: 'inline-block', animation: 'bounceCloud 3s infinite' }}>
                🗨️
              </span>
              <span className="font-bold text-lg">Tema de la Semana</span>
            </div>
            <div className="text-base mb-2">¿Cómo descubriste tu interés por la tecnología?</div>
            <button className="bg-[#00BFA5] hover:bg-[#009e88] text-white font-semibold rounded-lg px-6 py-3 mt-4 shadow-lg transition-all duration-200 text-base" onClick={() => { const section = document.getElementById('foro-discussions'); if (section) { section.scrollIntoView({ behavior: 'smooth' }); } }}>
              Participa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <button onClick={() => setShowForm(true)} className="w-full bg-[#00BFA5] hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Nueva Discusión</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${selectedCategory === category.id ? 'bg-[#E3F6FD] text-teal-800 border-l-4 border-[#00BFA5]' : 'hover:bg-gray-100 text-gray-700'}`}>
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

          <main className="lg:col-span-3" id="foro-discussions">
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Buscar discusiones..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>

            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  {editId === discussion.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                          rows={4}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center space-x-1 bg-[#00BFA5] hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Guardar</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancelar</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
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
                        <div className="flex items-center space-x-2">
                          {discussion.isAnswered && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Respondido
                            </span>
                          )}
                          {discussion.author.startsWith('Tú') && (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEditDiscussion(discussion)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteDiscussion(discussion.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">{discussion.title}</h2>
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
                          <button className={`flex items-center space-x-1 ${likedDiscussions.includes(discussion.id) ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'}`} onClick={() => { if (!likedDiscussions.includes(discussion.id)) { setDiscussions((prev) => prev.map((d) => d.id === discussion.id ? { ...d, likes: d.likes + 1 } : d)); setLikedDiscussions((prev) => [...prev, discussion.id]); } else { setDiscussions((prev) => prev.map((d) => d.id === discussion.id ? { ...d, likes: d.likes - 1 } : d)); setLikedDiscussions((prev) => prev.filter((id) => id !== discussion.id)); } }} type="button">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{discussion.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600" onClick={() => { alert('Funcionalidad de comentarios próximamente'); }} type="button">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{discussion.replies}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                Cargar más discusiones
              </button>
            </div>
          </main>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold" onClick={() => setShowForm(false)}>
              ×
            </button>
            <h2 className="text-2xl font-bold text-[#00BFA5] mb-6">Nueva Discusión</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]" placeholder="Escribe un título descriptivo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BFA5]" rows={4} placeholder="Describe tu pregunta o comparte tu experiencia" />
              </div>
              <button type="button" onClick={handleSubmitDiscussion} className="w-full bg-[#00BFA5] hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-200">
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] bg-[#00BFA5] text-white px-6 py-3 rounded-xl shadow-lg">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Foro;