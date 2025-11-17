import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, User, Calendar, Tag, Search, Plus, Trash2, Send, Edit2, Heart, X } from 'lucide-react';
import RecommendedMentors from '../components/RecommendedMentors';

// Interfaz para la estructura de las discusiones
interface Discussion {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  time: string;
  excerpt: string;
  tags: string[]; // <-- Acepta los tags
  isAnswered: boolean;
  colorClass: string; 
}

// Interfaz para la estructura de los comentarios
interface Comment {
  id: number;
  discussionId: number;
  author: string;
  content: string;
  time: string;
  commentLikes: number;
  commentHearts: number;
}

// --- CONFIGURACIÓN DE COLORES Y CATEGORÍAS ---

const categoryColors: { [key: string]: { name: string, count: number, color: string, bgColor: string, icon: string } } = {
    // Colores base neutros
    'all': { name: 'Todas las Discusiones', count: 142, color: '#6B7280', bgColor: '#F3F4F6', icon: '✨' }, // Gris
    
    // Categorías con paleta suave
    // 🌐 Comunidad (Rosa Claro)
    'comunidad': { name: 'Comunidad', count: 45, color: '#FBCFE8', bgColor: '#FDF2F8', icon: '🌐' }, 
    // 💻 Programación Fácil (Azul Suave)
    'programacion-facil': { name: 'Programación Fácil', count: 23, color: '#BFDBFE', bgColor: '#EFF6FF', icon: '💻' }, 
    // 📊 Ciencia de Datos & IA (Menta Suave)
    'ciencia-datos-ia': { name: 'Ciencia de Datos & IA', count: 18, color: '#A7F3D0', bgColor: '#F0FFFF', icon: '📊' }, 
    // 🎨 Creatividad Digital (Amarillo Pastel)
    'creatividad-digital': { name: 'Creatividad Digital', count: 15, color: '#FDE68A', bgColor: '#FFFBEB', icon: '🎨' }, 
    // 🛡️ Seguridad en Internet (Celeste Claro)
    'seguridad-internet': { name: 'Seguridad en Internet', count: 32, color: '#93C5FD', bgColor: '#F3F4FF', icon: '🛡️' }, 
    // 🚀 Proyectos y Retos (Melocotón Suave)
    'proyectos-retos': { name: 'Proyectos y Retos', count: 12, color: '#FECACA', bgColor: '#FEF2F2', icon: '🚀' }, 
    // 💼 Tu Futuro en STEM (Lavanda)
    'futuro-stem': { name: 'Tu Futuro en STEM', count: 9, color: '#DDD6FE', bgColor: '#F5F3FF', icon: '💼' }, 
    // 📚 Recursos Útiles (Beige Suave)
    'recursos-utiles': { name: 'Recursos Útiles', count: 10, color: '#FDEBD0', bgColor: '#FFF7ED', icon: '📚' },
};

const getCategoryConfig = (categoryKey: string) => categoryColors[categoryKey] || categoryColors['all'];


// --- COMPONENTE SVG DEL ROBOTITO (Diseño solicitado por el usuario) ---
const RobotIdeaSVG: React.FC<{ size?: string, ideaColor?: string, bodyColor?: string }> = ({ size = 'w-10 h-10', ideaColor = '#FDE047', bodyColor = '#E0F2F1' }) => (
    <svg 
        className={size} 
        viewBox="0 0 512 512" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid meet"
    >
        {/* Colores usados para replicar el estilo de la imagen: Teal Oscuro para bordes, Light Teal para cuerpo, Azul/Gris para base */}
        {/* Base / Pies */}
        <rect x="180" y="440" width="152" height="40" rx="10" fill="#9CA3AF" stroke="#6B7280" strokeWidth="8" />

        {/* Cuerpo Principal (Rectángulo redondeado - Teal Claro) */}
        <rect x="110" y="270" width="292" height="170" rx="20" fill={bodyColor} stroke="#00A896" strokeWidth="10" />

        {/* Cabeza (Rectángulo más pequeño redondeado - Teal Claro) */}
        <rect x="150" y="160" width="212" height="110" rx="15" fill={bodyColor} stroke="#00A896" strokeWidth="10" />

        {/* Pantalla / Ojo (Darker Teal) */}
        <rect 
            x="200" y="185" width="112" height="60" 
            rx="8" 
            fill="#00796B" 
            stroke="#00A896"
            strokeWidth="4" 
        />

        {/* Antena (Derecha) */}
        <line 
            x1="300" y1="160" x2="300" y2="100" 
            stroke="#00A896" 
            strokeWidth="8" 
            strokeLinecap="round" 
        />
        <circle 
            cx="300" cy="96" r="10" 
            fill="#00A896" 
        />

        {/* Antena (Izquierda) */}
        <line 
            x1="212" y1="160" x2="212" y2="100" 
            stroke="#00A896" 
            strokeWidth="8" 
            strokeLinecap="round" 
        />
        <circle 
            cx="212" cy="96" r="10" 
            fill="#00A896" 
        />

        {/* Brazos (Izquierda) */}
        <path 
            d="M110 320 L70 340 L70 410" 
            fill="none" 
            stroke="#00A896" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        {/* Brazos (Derecha) */}
        <path 
            d="M402 320 L442 340 L442 410" 
            fill="none" 
            stroke="#00A896" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />

        {/* Bombilla de Idea (en el centro de la pantalla, color amarillo) */}
        <g transform="translate(256, 215) scale(0.1)" style={{ transition: 'transform 0.3s ease-in-out' }}>
            <path 
                fill={ideaColor} /* Amarillo Brillante */
                d="M448 352c0-85.73-77-128-77-128C320 100 280 64 256 64s-64 36-95 160c0 0-77 42.27-77 128 0 70.6 57.4 128 128 128s128-57.4 128-128zM256 448c-44.1 0-80-35.9-80-80 0-38.3 27-75.3 80-160 53 84.7 80 121.7 80 160 0 44.1-35.9 80-80 80z"
            />
        </g>
    </svg>
);


// --- FUNCIONES DE UTILIDAD ---

/**
 * Función para obtener las iniciales de un nombre.
 * @param name Nombre completo del autor.
 * @returns Iniciales en mayúsculas (ej: "Juan Pérez" -> "JP").
 */
const getInitials = (name: string): string => {
  if (name.includes('Tú')) return 'T'; // Caso especial para el usuario actual
  
  // Limpia insignias y extrae la parte del nombre
  const cleanName = name.split(/ \s*[\*✨🚀💡🎓]/)[0].trim();
  
  const parts = cleanName.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return 'U'; // Default si no hay nombre
  
  if (parts.length === 1) return parts[0][0].toUpperCase();
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Componente de Avatar que muestra las iniciales con color dinámico basado en la categoría.
 */
const Avatar: React.FC<{ author: string, category: string, size?: string }> = ({ author, category, size = 'w-10 h-10' }) => {
    const initials = getInitials(author);
    const config = getCategoryConfig(category);
    
    // Para colores de fondo muy claros (pasteles), usamos un texto oscuro para el contraste.
    const textColor = '#1F2937'; // Gris oscuro
    const bgColor = config.color;

    return (
        <div 
            className={`${size} rounded-full flex items-center justify-center font-bold text-sm select-none shadow-inner`}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {initials}
        </div>
    );
};

// --- COMPONENTE PRINCIPAL FORO ---
const Foro: React.FC = () => {
  // Estados existentes
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  
  // NUEVO ESTADO PARA HASHTAGS (ETIQUETAS)
  const [formTags, setFormTags] = useState<string[]>([]); 
  const [tagInput, setTagInput] = useState('');
  
  // --- Estados para el Popup central (diseño original) ---
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  const [isPopupClosing, setIsPopupClosing] = useState(false); 

  // --- Estados para el Toast simple ---
  const [showSimpleToast, setShowSimpleToast] = useState(false);
  const [simpleToastMsg, setSimpleToastMsg] = useState('');
  const [simpleToastType, setSimpleToastType] = useState<'success' | 'error' | 'info'>('success');

  // Estados para edición de discusión
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Estados para el Modal de Confirmación de Eliminación de discusión
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discussionToDeleteId, setDiscussionToDeleteId] = useState<number | null>(null);
  
  // ESTADOS para la eliminación de comentarios
  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<{ discussionId: number, commentId: number } | null>(null);

  // --- ESTADOS para comentarios y su visualización ---
  
  // 1. Definición de los comentarios iniciales
  const initialComments: Record<number, Comment[]> = {
    // Comentarios de ejemplo para las discusiones iniciales
    1: [
      { id: 101, discussionId: 1, author: "Juan Pérez", content: "¡Genial! Yo te recomiendo el curso de FreeCodeCamp, es muy completo.", time: 'hace 1 hora', commentLikes: 5, commentHearts: 2 },
      { id: 102, discussionId: 1, author: "Ana Lima", content: "El canal de 'Midudev' en YouTube tiene tutoriales muy prácticos y actualizados.", time: 'hace 30 minutos', commentLikes: 1, commentHearts: 0 },
    ],
    4: [
      { id: 401, discussionId: 4, author: "Diego Mendoza", content: "¡Excelente lista! Yo añadiría practicar soft skills, es clave.", time: 'hace 5 minutos', commentLikes: 8, commentHearts: 10 },
    ],
  };

  const [openComments, setOpenComments] = useState<number[]>([]);
  const [commentsByDiscussion, setCommentsByDiscussion] = useState<Record<number, Comment[]>>(() => {
    try {
      const raw = localStorage.getItem('sumaq_comments');
      return raw ? JSON.parse(raw) as Record<number, Comment[]> : initialComments;
    } catch {
      return initialComments;
    }
  });
  
  // ESTADOS para reacciones de comentarios (para el usuario actual)
  const [commentLikedIds, setCommentLikedIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('sumaq_comment_likes');
      return raw ? JSON.parse(raw) as number[] : [];
    } catch {
      return [];
    }
  });
  const [commentHeartedIds, setCommentHeartedIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('sumaq_comment_hearts');
      return raw ? JSON.parse(raw) as number[] : [];
    } catch {
      return [];
    }
  });
  // Estado para modal de mentores (abre al hacer click en 'Ver mentores')
  const [showMentorsModal, setShowMentorsModal] = useState(false);
  const [mentorsModalTags, setMentorsModalTags] = useState<string[]>([]);

  // Función para manejar la entrada de tags
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si la tecla es Enter o Coma, o Tab
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
        e.preventDefault();
        const input = tagInput.trim();
        // Permite la entrada de múltiples palabras separadas por espacios o comas
        const newTags = input.split(/[\s,]+/) 
                             .map(tag => tag.trim().toLowerCase()) 
                             .filter(tag => tag.length > 0 && !formTags.includes(tag))
                             .slice(0, 5 - formTags.length); // Limita a 5 tags en total

        if (newTags.length > 0) {
            setFormTags(prev => [...prev, ...newTags]);
            setTagInput('');
        }
    }
  };

  // Función para eliminar un tag
  const removeTag = (tagToRemove: string) => {
    setFormTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  // Función para mostrar el Popup central (diseño original)
  const showAnimatedPopup = (message: string) => {
    setPopupMsg(message);
    setIsPopupClosing(false); 
    setShowPopup(true);

    // DURACIÓN AJUSTADA: 2.3 segundos
    const displayDuration = 2300; 
    const fadeOutDuration = 600;

    setTimeout(() => {
      setIsPopupClosing(true);
      setTimeout(() => {
        setShowPopup(false);
      }, fadeOutDuration); 
    }, displayDuration); 
  };

  // Función para mostrar el Toast simple (para comentarios, editar, eliminar)
  const triggerSimpleToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setSimpleToastMsg(message);
    setSimpleToastType(type);
    setShowSimpleToast(true);

    setTimeout(() => {
      setShowSimpleToast(false);
    }, 3000); 
  };

  // Handler para la eliminación final de la discusión
  const handleDelete = () => {
    if (discussionToDeleteId !== null) {
      setCommentsByDiscussion(prev => {
        const newComments = { ...prev };
        delete newComments[discussionToDeleteId];
        return newComments;
      });

      setDiscussions(prev => prev.filter(d => d.id !== discussionToDeleteId));
      setShowDeleteModal(false);
      setDiscussionToDeleteId(null);
      triggerSimpleToast('Publicación eliminada correctamente. 🗑️', 'info');
    }
  };
  
  // Handler para la eliminación final del comentario
  const handleConfirmDeleteComment = () => {
    if (!commentToDelete) return;

    const { discussionId, commentId } = commentToDelete;

    // 1. Eliminar el comentario
    setCommentsByDiscussion(prev => ({
        ...prev,
        [discussionId]: prev[discussionId].filter(c => c.id !== commentId)
    }));

    // 2. Actualizar el contador de respuestas de la discusión principal
    setDiscussions(prev => prev.map(d => 
        d.id === discussionId ? { ...d, replies: (commentsByDiscussion[discussionId]?.length || 0) - 1 } : d
    ));

    // 3. Cerrar modal y mostrar toast
    setShowCommentDeleteModal(false);
    setCommentToDelete(null);
    triggerSimpleToast('Comentario eliminado con éxito. 🗑️', 'info');
  };

  // Handler para el envío del formulario de nueva discusión
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de la categoría
    if (formCategory === '') {
        triggerSimpleToast('Por favor, selecciona una categoría válida antes de publicar.', 'error');
        return;
    }
    
    const categoryConfig = getCategoryConfig(formCategory);

    const yaTienePublicacion = discussions.some(d => d.author === 'Tú');
    
    // Obtener y limpiar los tags finales (por si el usuario dejó algo en el input)
    const finalTags = [...formTags];
    const remainingInput = tagInput.trim();
    if (remainingInput.length > 0) {
      remainingInput.split(/[\s,]+/)
                    .map(tag => tag.trim().toLowerCase())
                    .filter(tag => tag.length > 0 && !finalTags.includes(tag))
                    .forEach(tag => finalTags.push(tag));
    }
    
    const nuevaDiscusion: Discussion = {
      id: Date.now(),
      title: formTitle,
      author: 'Tú', // El usuario actual se identifica como "Tú"
      category: formCategory,
      replies: 0,
      likes: 0,
      time: 'hace unos segundos',
      excerpt: formContent,
      tags: finalTags.slice(0, 5), // Limita a 5 tags finales
      isAnswered: false,
      colorClass: categoryConfig.color, // Usar el color de la categoría
    };
    
    setDiscussions(prev => [nuevaDiscusion, ...prev]);
    setCommentsByDiscussion(prev => ({...prev, [nuevaDiscusion.id]: []})); // Inicializar comentarios

    // Limpieza y cierre del formulario
    setShowForm(false);
    setFormTitle('');
    setFormContent('');
    setFormCategory(''); 
    setFormTags([]); // Limpiar tags
    setTagInput(''); // Limpiar input de tags

    // Usar el POPUP animado para la publicación (diseño original)
  showAnimatedPopup(
  !yaTienePublicacion
    ? '¡Felicidades! Bienvenido/a a la comunidad SumaqTech. 🎉'
    : ''
);

  };
  
  // Handler para el envío del formulario de edición de discusión
  const handleEditSubmit = (e: React.FormEvent, discussionId: number) => {
      e.preventDefault();
      setDiscussions(prev => prev.map(d => d.id === discussionId ? { ...d, title: editTitle, excerpt: editContent } : d));
      setEditId(null);
      triggerSimpleToast('Publicación actualizada con éxito. ✨', 'success'); // Usar Toast simple para edición
  };

  // --- LÓGICA: Handler para alternar la visibilidad de los comentarios ---
  const toggleComments = (discussionId: number) => {
    setOpenComments(prev => 
      prev.includes(discussionId)
        ? prev.filter(id => id !== discussionId) 
        : [...prev, discussionId] 
    );
  };

  // 2. Datos iniciales de discusiones, calculando 'replies' basados en 'initialComments'
  const initialDiscussions: Discussion[] = [
    {
      id: 1,
      title: '¿Cómo empezar mi primer proyecto de automatización simple con Python?',
      author: 'Carlos Mendoza ✨ Primer post',
      category: 'programacion-facil', // Programación Fácil
      replies: initialComments[1] ? initialComments[1].length : 0, // 2 comentarios
      likes: 15,
      time: 'hace 2 horas',
      excerpt: 'Soy nuevo y necesito ideas para un proyecto inicial en Python. Algo fácil para empezar a programar.',
      tags: ['python', 'principiantes', 'automatizacion'],
      isAnswered: false,
      colorClass: getCategoryConfig('programacion-facil').color,
    },
    {
      id: 2,
      title: '¿Qué herramientas de visualización de datos recomiendan para un portafolio?',
      author: 'María González 🚀 Innovador',
      category: 'ciencia-datos-ia', // Ciencia de Datos & IA
      replies: initialComments[2] ? initialComments[2].length : 0, // 0 comentarios
      likes: 32,
      time: 'hace 5 horas',
      excerpt: 'Estoy creando un portafolio de Ciencia de Datos. ¿Es mejor Tableau, Power BI o algo más open source?',
      tags: ['data science', 'visualizacion', 'portafolio'],
      isAnswered: true,
      colorClass: getCategoryConfig('ciencia-datos-ia').color,
    },
    {
      id: 3,
      title: 'Mi experiencia creando un NFT con ilustraciones a mano',
      author: 'Ana Rodríguez 💡 Respuesta útil',
      category: 'creatividad-digital', // Creatividad Digital
      replies: initialComments[3] ? initialComments[3].length : 0, // 0 comentarios
      likes: 28,
      time: 'hace 1 día',
      excerpt: 'Quiero compartir mi proceso de diseño y publicación de mi primera colección de arte digital como NFT. ¡Dudas bienvenidas!',
      tags: ['diseño', 'nft', 'arte digital', 'blockchain'],
      isAnswered: true,
      colorClass: getCategoryConfig('creatividad-digital').color,
    },
    {
      id: 4,
      title: 'Preparación para el primer año como desarrollador junior',
      author: 'Diego Mendoza 🎓 Mentor',
      category: 'futuro-stem', // Tu Futuro en STEM
      replies: initialComments[4] ? initialComments[4].length : 0, // 1 comentario
      likes: 67,
      time: 'hace 2 días',
      excerpt: 'Consejos clave para pasar de la universidad/bootcamp al primer año de trabajo en una empresa tech.',
      tags: ['carrera', 'empleo', 'primer trabajo', 'soft skills'],
      isAnswered: true,
      colorClass: getCategoryConfig('futuro-stem').color,
    },
    {
      id: 5,
      title: '¿Son seguras las nuevas VPNs gratuitas que promocionan?',
      author: 'Luis Paredes 💡 Buena pregunta',
      category: 'seguridad-internet', // Seguridad en Internet
      replies: initialComments[5] ? initialComments[5].length : 0, // 0 comentarios
      likes: 19,
      time: 'hace 3 días',
      excerpt: 'Vi una app de VPN gratuita muy popular, pero me da desconfianza. ¿Qué riesgos tienen?',
      tags: ['seguridad', 'vpn', 'privacidad'],
      isAnswered: false,
      colorClass: getCategoryConfig('seguridad-internet').color,
    },
    {
      id: 6,
      title: 'Guía de 5 minutos para aprender a usar Tailwind CSS',
      author: 'Ana Torres ✨ Primer Post',
      category: 'recursos-utiles', // Recursos Útiles
      replies: initialComments[6] ? initialComments[6].length : 0, // 0 comentarios
      likes: 0,
      time: 'hace unos minutos',
      excerpt: 'Comparto una guía rápida para empezar a usar Tailwind en sus proyectos de frontend. ¡Es muy útil!',
      tags: ['css', 'frontend', 'tutorial', 'tailwind'],
      isAnswered: false,
      colorClass: getCategoryConfig('recursos-utiles').color,
    }
  ];

  const trendingTopics = [
    { name: 'Python', posts: 56 },
    { name: 'React', posts: 45 },
    { name: 'Machine Learning', posts: 32 },
    { name: 'Diseño UX', posts: 28 },
    { name: 'Trabajo Remoto', posts: 23 }
  ];

  const [discussions, setDiscussions] = useState<Discussion[]>(() => {
    try {
      const raw = localStorage.getItem('sumaq_discussions');
      return raw ? JSON.parse(raw) as Discussion[] : initialDiscussions;
    } catch {
      return initialDiscussions;
    }
  });

  const [likedDiscussions, setLikedDiscussions] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('sumaq_liked_discussions');
      return raw ? JSON.parse(raw) as number[] : [];
    } catch {
      return [];
    }
  });
  
  // Filtra discusiones
  const filteredDiscussions =
    selectedCategory === 'all'
      ? discussions.filter((d, idx, arr) => arr.findIndex(dd => dd.id === d.id) === idx)
      : discussions.filter((d) => d.category === selectedCategory);

  // Guardar en localStorage cuando cambian discusiones, likes o comentarios
  React.useEffect(() => {
    try { localStorage.setItem('sumaq_discussions', JSON.stringify(discussions)); } catch {}
  }, [discussions]);

  React.useEffect(() => {
    try { localStorage.setItem('sumaq_liked_discussions', JSON.stringify(likedDiscussions)); } catch {}
  }, [likedDiscussions]);

  React.useEffect(() => {
    try { localStorage.setItem('sumaq_comments', JSON.stringify(commentsByDiscussion)); } catch {}
  }, [commentsByDiscussion]);

  React.useEffect(() => {
    try { localStorage.setItem('sumaq_comment_likes', JSON.stringify(commentLikedIds)); } catch {}
  }, [commentLikedIds]);

  React.useEffect(() => {
    try { localStorage.setItem('sumaq_comment_hearts', JSON.stringify(commentHeartedIds)); } catch {}
  }, [commentHeartedIds]);

  /**
   * Componente interno para la sección de comentarios.
   */
  const CommentSection: React.FC<{ discussionId: number }> = ({ discussionId }) => {
    const comments = commentsByDiscussion[discussionId] || [];
    const [newCommentContent, setNewCommentContent] = useState('');
    
    // Encuentra la discusión actual para obtener su categoría y color
    const discussion = discussions.find(d => d.id === discussionId);
    const categoryKey = discussion?.category || 'all'; 
    const categoryConfig = getCategoryConfig(categoryKey);

    // Nuevo estado para la edición de comentarios
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editCommentContent, setEditCommentContent] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!newCommentContent.trim()) {
        triggerSimpleToast('El contenido del comentario no puede estar vacío.', 'error');
        return;
      }

      const newComment: Comment = {
        id: Date.now() + Math.random(),
        discussionId: discussionId,
        author: 'Tú',
        content: newCommentContent.trim(),
        time: 'hace unos segundos',
        commentLikes: 0,
        commentHearts: 0,
      };

      // 1. Añadir el comentario al estado
      setCommentsByDiscussion(prev => ({
        ...prev,
        [discussionId]: [...(prev[discussionId] || []), newComment]
      }));

      // 2. Actualizar el contador de respuestas de la discusión principal
      // NOTA: Se actualiza en función del nuevo tamaño del array de comentarios
      setDiscussions(prev => prev.map(d => 
        d.id === discussionId ? { ...d, replies: (commentsByDiscussion[discussionId]?.length || 0) + 1 } : d
      ));

      // 3. Mostrar toast y limpiar formulario
      triggerSimpleToast('Comentario enviado con éxito. 💬', 'success');
      setNewCommentContent('');
    };

    // Función para iniciar la edición de un comentario
    const startEditComment = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditCommentContent(comment.content);
    };

    // Función para guardar el comentario editado
    const saveEditedComment = (commentId: number) => {
        if (!editCommentContent.trim()) {
            triggerSimpleToast('El comentario no puede estar vacío.', 'error');
            return;
        }

        setCommentsByDiscussion(prev => ({
            ...prev,
            [discussionId]: prev[discussionId].map(c => 
                c.id === commentId ? { ...c, content: editCommentContent.trim(), time: 'editado ahora' } : c
            )
        }));
        setEditingCommentId(null);
        triggerSimpleToast('Comentario editado con éxito. ✏️', 'success');
    };

    // Función para abrir el modal de confirmación de eliminación
    const confirmDeleteComment = (commentId: number) => {
        setCommentToDelete({ discussionId, commentId });
        setShowCommentDeleteModal(true);
    };
    
    // LÓGICA CLAVE: Reaccionar a un comentario (Like o Heart), asegurando la exclusividad
    const handleReaction = (commentId: number, reactionType: 'like' | 'heart') => {
        const isLiked = commentLikedIds.includes(commentId);
        const isHearted = commentHeartedIds.includes(commentId);

        let newLikedIds = [...commentLikedIds];
        let newHeartedIds = [...commentHeartedIds];
        
        let likeChange = 0; 
        let heartChange = 0; 

        if (reactionType === 'like') {
            if (isLiked) {
                newLikedIds = newLikedIds.filter(id => id !== commentId);
                likeChange = -1;
            } else {
                newLikedIds = [...newLikedIds, commentId];
                likeChange = 1;

                if (isHearted) {
                    newHeartedIds = newHeartedIds.filter(id => id !== commentId);
                    heartChange = -1;
                }
            }
        } else if (reactionType === 'heart') {
            if (isHearted) {
                newHeartedIds = newHeartedIds.filter(id => id !== commentId);
                heartChange = -1;
            } else {
                newHeartedIds = [...newHeartedIds, commentId];
                heartChange = 1;

                if (isLiked) {
                    newLikedIds = newLikedIds.filter(id => id !== commentId);
                    likeChange = -1;
                }
            }
        }

        // 1. Actualizar el estado del usuario (quién dio qué)
        setCommentLikedIds(newLikedIds);
        setCommentHeartedIds(newHeartedIds);

        // 2. Actualizar el conteo global en el estado del comentario
        setCommentsByDiscussion(prev => ({
            ...prev,
            [discussionId]: prev[discussionId].map(c => {
                if (c.id === commentId) {
                    return { 
                        ...c, 
                        commentLikes: c.commentLikes + likeChange,
                        commentHearts: c.commentHearts + heartChange
                    };
                }
                return c;
            })
        }));
    };


    return (
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-teal-600"/>
            <span>{comments.length} Comentarios</span> {/* Muestra la cantidad correcta de comentarios */}
        </h3>

        {/* Formulario de Comentario */}
        <form onSubmit={handleCommentSubmit} className="space-y-4 mb-6 p-4 border rounded-xl bg-gray-50 border-teal-200">
          <div className="relative">
            <textarea
              className="w-full border rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors resize-y text-sm border-gray-300"
              value={newCommentContent}
              onChange={e => setNewCommentContent(e.target.value)}
              placeholder="Escribe tu comentario..."
              rows={3}
              required
            />
            <button
              type="submit"
              aria-label="Publicar comentario"
              // Botón de Comentario USA el TEAL de SumaqTech
              className="absolute right-2 bottom-2 hover:opacity-80 text-white p-2 rounded-lg transition-colors duration-200 shadow-md bg-teal-600 hover:bg-teal-700"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Lista de Comentarios */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map(comment => {
                const isLiked = commentLikedIds.includes(comment.id);
                const isHearted = commentHeartedIds.includes(comment.id);
                
                return (
              <div key={comment.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="flex items-center space-x-3 mb-2">
                  {/* AVATAR con iniciales en comentarios (usa el color de la discusión) */}
                  <Avatar author={comment.author} category={categoryKey} size="w-8 h-8" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{comment.author}</p>
                    <p className="text-xs text-gray-500">{comment.time}</p>
                  </div>
                </div>

                {/* Contenido del comentario / Formulario de edición */}
                {editingCommentId === comment.id ? (
                    <div className="mt-2">
                        <textarea
                            className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm border-gray-300"
                            value={editCommentContent}
                            onChange={e => setEditCommentContent(e.target.value)}
                            rows={2}
                            required
                        />
                        <div className="flex gap-2 justify-end">
                            <button 
                                type="button" 
                                className="bg-teal-600 text-white px-3 py-1 text-xs rounded font-semibold shadow hover:bg-teal-700 transition-colors"
                                onClick={() => saveEditedComment(comment.id)}
                            >
                                Guardar
                            </button>
                            <button 
                                type="button" 
                                className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded font-semibold shadow hover:bg-gray-300 transition-colors"
                                onClick={() => setEditingCommentId(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700 text-sm pl-8 border-l-2 border-gray-100 ml-2 whitespace-pre-wrap">{comment.content}</p>
                )}


                {/* Opciones de Editar/Eliminar solo para comentarios del usuario actual ("Tú") */}
                {comment.author === 'Tú' && editingCommentId !== comment.id && (
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            className="text-gray-500 hover:text-teal-600 transition-colors p-1 rounded-full bg-gray-50 hover:bg-teal-100"
                            onClick={() => startEditComment(comment)}
                            aria-label="Editar comentario"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full bg-gray-50 hover:bg-red-100"
                            onClick={() => confirmDeleteComment(comment.id)} // Llama al modal de confirmación
                            aria-label="Eliminar comentario"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
                
                {/* Reacciones de Comentario (Likes y Corazones) */}
                <div className="flex mt-3 pt-3 border-t border-gray-50/70 space-x-4 ml-10">
                    {/* Botón de Like - Usa el color TEAL de SumaqTech */}
                    <button
                        className={`flex items-center space-x-1 text-sm transition-colors focus:outline-none ${isLiked ? 'font-bold text-teal-600' : 'text-gray-500 hover:text-teal-500'}`}
                        onClick={() => handleReaction(comment.id, 'like')}
                        type="button"
                    >
                        <ThumbsUp 
                            className="w-4 h-4" 
                            fill={isLiked ? '#0D9488' : 'none'} // teal-600
                            style={{ color: isLiked ? '#0D9488' : 'inherit' }}
                        />
                        <span>{comment.commentLikes}</span>
                    </button>
                    
                    {/* Botón de Corazón - Usa el color rojo estándar */}
                    <button
                        className={`flex items-center space-x-1 text-sm transition-colors focus:outline-none ${isHearted ? 'text-red-500 font-bold' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => handleReaction(comment.id, 'heart')}
                        type="button"
                    >
                        <Heart className="w-4 h-4" fill={isHearted ? '#EF4444' : 'none'} style={{ color: isHearted ? '#EF4444' : 'inherit' }}/>
                        <span>{comment.commentHearts}</span>
                    </button>
                </div>

              </div>
            );
          })
          ) : (
            <p className="text-center text-gray-500 italic p-4 bg-gray-50 rounded-lg">Sé el primero en comentar esta publicación.</p>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 font-[Poppins] min-w-[375px]">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');

          @keyframes bounceCloud {
            0%, 100% { transform: translateY(0); }
            10% { transform: translateY(-12px); }
            20% { transform: translateY(0); }
          }
          /* Animaciones para el Toast Simple (esquina derecha) */
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
          }
          .animate-slideIn-toast {
            animation: slideInRight 0.3s ease-out forwards;
          }
          .animate-slideOut-toast {
            animation: slideOutRight 0.6s ease-in forwards;
          }

          /* Animaciones para el Popup Central (diseño original) */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          /* Animación de salto reutilizada para el emoji (saltitos) */
          @keyframes robotDance {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(5deg); }
            50% { transform: translateY(0) rotate(-5deg); }
            75% { transform: translateY(-5px) rotate(5deg); }
          }
          .animate-robot-dance {
            animation: robotDance 1s ease-in-out infinite;
          }

          /* Aplicamos fadeOut-popup al contenedor del popup al cerrar */
          .animate-fadeOut-popup {
            animation: fadeOut 0.6s ease-out forwards;
          }
          /* Aplicamos solo fadeIn al overlay para la apertura */
          .animate-fadeIn-overlay {
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          /* Animación para el confeti */
          @keyframes confetti-burst {
              0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
              100% { 
                  /* Usa variables CSS para simular explosión y caída */
                  transform: translate(var(--rand-x), var(--rand-y)) scale(0.1) rotate(720deg); 
                  opacity: 0; 
              }
          }


          .font-\[Poppins\] {
            font-family: 'Poppins', sans-serif; 
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* ICONO TURQUESA DE SUMAQTECH */}
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Foro de la Comunidad SumaqTech
          </h1>

          {/* Texto introductorio - AHORA CON SIGNOS DE EXCLAMACIÓN */}
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            ¡Explora, pregunta y construye tu futuro en el mundo STEM con nosotros!
          </p>
          
          <div style={{ height: '24px' }}></div>

          {/* Banner Tema de la Semana: Usando el color TEAL bajo */}
          <div className="bg-teal-100 text-black p-4 rounded-2xl shadow-lg mb-6 transition-transform duration-200 hover:scale-[1.01] max-w-4xl mx-auto border border-teal-200">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              
              {/* Contenido del tema (alineado con el icono) */}
              <div className="flex items-center space-x-3 mb-2 sm:mb-0 sm:mr-4 flex-wrap justify-center sm:justify-start text-teal-800">
                <span
                  className="text-2xl"
                  style={{
                    display: 'inline-block',
                    animation: 'bounceCloud 3s infinite',
                    marginRight: '0.5rem'
                  }}
                >
                  🗨️
                </span>
                <span className="font-bold text-lg whitespace-nowrap">Tema de la Semana:</span>
                <span className="text-base text-center sm:text-left ml-1">- ¿Cómo descubriste tu interés por la tecnología?</span>
              </div>
              
              {/* Botón de Participación (Usando el color TURQUESA de la marca) */}
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg px-4 py-2 shadow-lg transition-all duration-200 text-sm mt-2 sm:mt-0 whitespace-nowrap"
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
            {/* Botón Nueva Discusión destacado (TURQUESA) */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky lg:top-4">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2" onClick={() => setShowForm(true)}>
                <Plus className="w-5 h-5" />
                <span>Nueva Discusión</span>
              </button>
            </div>

            {/* Categorías organizadas */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h3>
              <div className="space-y-2">
                {Object.keys(categoryColors).map((key) => {
                    const category = categoryColors[key];
                    return (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(key)}
                            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                              selectedCategory === key
                                ? 'border-l-4 font-semibold text-gray-800'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                            style={{ 
                                backgroundColor: selectedCategory === key ? category.bgColor : undefined,
                                borderColor: selectedCategory === key ? category.color : undefined
                            }}
                          >
                            <span className="flex items-center">
                              <span className="mr-2 text-lg">{category.icon}</span>
                              {category.name}
                            </span>
                            <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full min-w-[30px] text-center">
                              {category.count}
                            </span>
                          </button>
                    );
                })}
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="Buscar discusiones"
                />
              </div>
            </div>

            {/* Lista de discusiones */}
            <div id="foro-discussions" className="space-y-4">
              {filteredDiscussions.map((discussion) => {
                const categoryConfig = getCategoryConfig(discussion.category);
                return (
                <div
                  key={discussion.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border-2 relative"
                  style={{ 
                    borderColor: categoryConfig.color,
                    borderWidth: discussion.author === 'Tú' ? '3px' : '2px' // Borde más grueso para publicaciones propias
                  }}
                >
                  {/* Opciones de editar/eliminar solo para publicaciones propias */}
                  {discussion.author === 'Tú' && editId !== discussion.id && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        className="bg-teal-100 text-teal-700 px-2 py-1 rounded hover:bg-teal-200 text-xs font-semibold shadow transition-colors"
                        onClick={() => {
                          setEditId(discussion.id);
                          setEditTitle(discussion.title);
                          setEditContent(discussion.excerpt);
                        }}
                        aria-label="Editar publicación"
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 text-xs font-semibold shadow transition-colors flex items-center"
                        onClick={() => {
                          setDiscussionToDeleteId(discussion.id);
                          setShowDeleteModal(true);
                        }}
                        aria-label="Eliminar publicación"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Eliminar
                      </button>
                    </div>
                  )}
                  
                  {/* Formulario de edición inline */}
                  {editId === discussion.id ? (
                    <form
                      className="space-y-2 mb-4 pt-8"
                      onSubmit={(e) => handleEditSubmit(e, discussion.id)}
                    >
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        required
                        placeholder="Nuevo título"
                      />
                      <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={3}
                        required
                        placeholder="Nuevo contenido"
                      />
                      <div className="flex gap-2 justify-end">
                        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-teal-700 transition-colors">Guardar</button>
                        <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold shadow hover:bg-gray-300 transition-colors" onClick={() => setEditId(null)}>Cancelar</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {/* AVATAR con iniciales en la publicación, color de categoría */}
                          <Avatar author={discussion.author} category={discussion.category} size="w-10 h-10" />
                          <div>
                            <p className="font-medium text-gray-800">
                              {/* Lógica de insignias (badges) */}
                              {(() => {
                                const name = discussion.author.split(/ \s*[\*✨🚀💡🎓]/)[0];
                                const badgeIcons: { [key: string]: string } = {
                                  'Primer post': '✨ Primer post',
                                  'Innovador': '🚀 Innovador',
                                  'Respuesta útil': '💡 Respuesta útil',
                                  'Buena pregunta': '💡 Buena pregunta',
                                  'Mentor': '🎓 Mentor',
                                };

                                const displayBadges = Object.keys(badgeIcons)
                                  .filter(key => discussion.author.includes(key))
                                  .map(key => (
                                    <span key={key} style={{ marginLeft: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                                      {badgeIcons[key]}
                                    </span>
                                  ));

                                return (
                                  <>
                                    {name}
                                    {displayBadges}
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
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium h-fit">
                            Respondido
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-gray-700 cursor-pointer transition-colors">
                        {discussion.title}
                      </h2>
                      <p className="text-gray-600 mb-4 whitespace-pre-wrap">{discussion.excerpt}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                          {/* SECCIÓN DE TAGS (ETIQUETAS) */}
                          {discussion.tags.map((tag, index) => {
                            // Usar el color principal de la categoría como color de texto e icono
                            const tagColor = categoryConfig.color;
                            return (
                                <span 
                                  key={index} 
                                  className="text-gray-900 px-2 py-1 rounded text-sm font-semibold flex items-center border border-gray-300 capitalize"
                                  style={{ 
                                    backgroundColor: categoryConfig.bgColor, // Fondo suave de la categoría
                                    borderColor: tagColor // Borde con el color principal de la categoría
                                  }}
                                >
                                  {/* Ícono usando el color principal de la categoría */}
                                  <Tag className="w-3 h-3 inline mr-1" style={{ color: tagColor }}/>
                                  {tag}
                                </span>
                            );
                          })}
                          {/* Botón para abrir modal de mentores (visible junto a las tags) */}
                          <div className="mt-2 sm:mt-0 sm:ml-2">
                            <button
                              onClick={() => { setMentorsModalTags(discussion.tags); setShowMentorsModal(true); }}
                              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-sm transition-colors"
                            >
                              <span>🧑‍🏫</span>
                              <span>Ver mentores</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {/* Botón de Likes de la Discusión Principal - Usa el color TEAL de SumaqTech */}
                          <button
                            className={`flex items-center space-x-1 focus:outline-none transition-colors ${likedDiscussions.includes(discussion.id) ? 'font-bold text-teal-600' : 'text-gray-500 hover:text-teal-500'}`}
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
                            <ThumbsUp 
                                className="w-4 h-4" 
                                fill={likedDiscussions.includes(discussion.id) ? '#0D9488' : 'none'} // teal-600
                                style={{ color: likedDiscussions.includes(discussion.id) ? '#0D9488' : 'inherit' }}
                            />
                            <span className="text-sm">{discussion.likes}</span>
                          </button>
                          
                          {/* Botón de Comentarios - Usa el color de la categoría */}
                          <button
                            className={`flex items-center space-x-1 focus:outline-none transition-colors ${openComments.includes(discussion.id) ? 'font-bold' : 'text-gray-500'}`}
                            style={{ color: openComments.includes(discussion.id) ? categoryConfig.color : undefined }}
                            onClick={() => toggleComments(discussion.id)}
                            type="button"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{commentsByDiscussion[discussion.id]?.length || 0}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Sección de Comentarios */}
                  {openComments.includes(discussion.id) && (
                    <CommentSection discussionId={discussion.id} />
                  )}

                  {/* Mentores: movidos a modal o sidebar persistente. Ya no se muestran inline dentro de los comentarios. */}

                </div>
              );
            })}
            </div>

            {/* Botón cargar más */}
            <div className="text-center mt-8">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-200 shadow-md">
                Cargar más discusiones
              </button>
            </div>
          </main>
        </div> {/* 👈 Cierre del grid reorganizado */}
      </div>
      
      {/* -------------------- Modals -------------------- */}
      
      {/* Modal Formulario Nueva Discusión */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn-popup flex"> {/* Aumentar max-w-lg y usar flex */}
            
            {/* Columna Izquierda: Imagen del Robot (solo en escritorio) */}
            <div className="hidden md:flex flex-col items-center justify-center w-1/3 p-4 bg-teal-50/50 rounded-l-xl border-r border-teal-100">
                {/* Robot visualmente idéntico (bloque) */}
                <RobotIdeaSVG size="w-32 h-32" bodyColor="#E0F2F1" />
                <p className="mt-4 text-center font-semibold text-teal-800 text-sm">
                    ¡Anímate a compartir tu idea!
                </p>
                <p className="text-xs text-gray-500 mt-1 text-center">
                    La comunidad espera tu aporte.
                </p>
            </div>
            
            {/* Columna Derecha: Formulario */}
            <div className="w-full md:w-2/3 md:p-6">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold transition-colors"
                    onClick={() => setShowForm(false)}
                    aria-label="Cerrar"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center md:text-left flex items-center justify-center md:justify-start space-x-2">
                    {/* El Robot se usa solo como adorno en el título si la pantalla es pequeña */}
                    <span className="md:hidden">
                        <RobotIdeaSVG size="w-6 h-6" bodyColor="#E0F2F1" />
                    </span>
                    <span>Nueva Discusión</span>
                </h2>
                <form
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                >
                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <div className="relative"> 
                            <select
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-600 appearance-none"
                              value={formCategory}
                              onChange={e => setFormCategory(e.target.value)}
                              required
                              aria-label="Seleccionar Categoría"
                            >
                              <option value="" disabled>Selecciona una categoría...</option>
                              {Object.keys(categoryColors).filter(key => key !== 'all').map(key => {
                                const cat = categoryColors[key];
                                return <option key={cat.name} value={key}>{cat.icon} {cat.name}</option>;
                              })}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                            value={formTitle}
                            onChange={e => setFormTitle(e.target.value)}
                            placeholder="Escribe el título de tu discusión"
                            required
                            maxLength={100}
                        />
                    </div>

                    {/* Contenido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                            value={formContent}
                            onChange={e => setFormContent(e.target.value)}
                            placeholder="Comparte tu experiencia o pregunta"
                            rows={4}
                            required
                        />
                    </div>

                    {/* NUEVO CAMPO DE HASHTAGS (ETIQUETAS) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                            <span>Etiquetas (Máx. 5)</span>
                            <span className="text-xs text-gray-500">Separar con espacio, coma o Enter</span>
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={handleTagInput}
                            placeholder={formTags.length < 5 ? "Ej: python, frontend, tutorial" : "Has alcanzado el límite de 5 etiquetas"}
                            disabled={formTags.length >= 5}
                        />
                        
                        {/* Visualización de Etiquetas ingresadas */}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {formTags.map((tag, index) => (
                                <span key={index} className="flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all duration-150">
                                    #{tag}
                                    <button 
                                        type="button" 
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 text-teal-600 hover:text-teal-900 transition-colors p-0.5"
                                        aria-label={`Eliminar etiqueta ${tag}`}
                                    >
                                        <X className="w-3 h-3"/>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg px-6 py-3 mt-2 shadow-lg transition-all duration-200 text-base"
                    >
                        Publicar
                    </button>
                </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Confirmación de Eliminación de discusión */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-fadeIn-popup text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">Confirmar Eliminación de Publicación</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que deseas eliminar permanentemente esta publicación? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDiscussionToDeleteId(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NUEVO Modal de Confirmación de Eliminación de COMENTARIO */}
      {showCommentDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-fadeIn-popup text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">¿Eliminar Comentario?</h3>
            <p className="text-gray-700 mb-6">
              ¿Deseas eliminar este comentario? Se retirará permanentemente de la discusión.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowCommentDeleteModal(false);
                  setCommentToDelete(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
                onClick={handleConfirmDeleteComment}
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver mentores (abierto desde el botón en cada discusión) */}
      {showMentorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md" onClick={() => setShowMentorsModal(false)} />

          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4 z-10 overflow-hidden" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 pr-12">
              <button onClick={() => setShowMentorsModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-full">×</button>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">🧑‍🏫 Mentores Disponibles</h3>
                <p className="text-sm text-gray-500 truncate max-w-[60%]">{mentorsModalTags.length > 0 ? `Relacionado con: ${mentorsModalTags.join(', ')}` : ''}</p>
              </div>
              <RecommendedMentors tags={mentorsModalTags} />
            </div>
          </div>
        </div>
      )}

      {/* -------------------- Popup animado (Diseño original, para Publicar) -------------------- */}
      {showPopup && (
        <>
          {/* Overlay oscuro */}
          <div className={`fixed inset-0 bg-black bg-opacity-30 z-[100] ${isPopupClosing ? 'animate-fadeOut-popup' : 'animate-fadeIn-overlay'}`} />
          
          {/* Confeti (Puntos de Colores que se dispersan) - MEJORADO */}
          <div className="fixed inset-0 z-[101] pointer-events-none overflow-hidden">
              {/* Contenedor de Confeti que se anima y desaparece con el popup */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${isPopupClosing ? 'opacity-0' : 'opacity-100'}`}>
                  {/* Generar los puntos de confeti. AUMENTADO A 80 PARTÍCULAS, MÁS GRANDES Y MAYOR DISPERSIÓN */}
                  {Array.from({ length: 80 }).map((_, i) => {
                      // Confeti más grande (8px a 16px)
                      const size = 8 + Math.random() * 8; 
                      const top = 50; // Inicia en el centro Y
                      const left = 50; // Inicia en el centro X
                      const colors = ['#FDE047', '#34D399', '#60A5FA', '#F472B6', '#FCA5A5', '#A7F3D0']; // Colores de confeti
                      
                      // Mayor dispersión (hasta 400px en X y 600px en Y)
                      const randX = (Math.random() - 0.5) * 800; // -400px a 400px
                      const randY = 200 + Math.random() * 400; // 200px a 600px (hacia abajo)

                      return (
                          <div 
                              key={i}
                              className={`absolute rounded-full`}
                              style={{
                                  width: `${size}px`,
                                  height: `${size}px`,
                                  top: `${top}%`,
                                  left: `${left}%`,
                                  backgroundColor: colors[i % colors.length],
                                  // La animación dura 2.3s
                                  animation: `confetti-burst 2.3s ease-out forwards ${Math.random() * 0.1}s`,
                                  opacity: 0,
                                  '--rand-x': `${randX}px`,
                                  '--rand-y': `${randY}px`,
                              } as React.CSSProperties} // Tipado para propiedades CSS personalizadas
                          />
                      );
                  })}
              </div>
          </div>
          
          {/* Popup central - Aplicamos la animación de salida solo al cerrar */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[102] transition-opacity ${isPopupClosing ? 'animate-fadeOut-popup' : ''}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xs text-center border-4 border-teal-500">
              <div className="text-6xl mb-4 flex justify-center">
                {/* EMOJI DE CELEBRACIÓN CON ANIMACIÓN DE SALTO */}
                <span className={isPopupClosing ? '' : 'animate-robot-dance'}>
                    🎉
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {popupMsg.includes('primera') ? '¡Publicación exitosa!' : '¡Genial!'}
              </h3>
              <p className="text-lg text-gray-700 mb-2">
                {popupMsg.includes('primera') ? 'Tu primera publicación fue un éxito' : popupMsg}
              </p>
              <p className="text-teal-600 font-semibold text-base">
                ¡Gracias por tu aporte! 💙
              </p>
            </div>
          </div>
        </>
      )}

      {/* -------------------- Popup simple (Toast, para Comentarios/Editar/Eliminar) -------------------- */}
      {showSimpleToast && (
        <div className={`fixed bottom-4 right-4 z-[100] p-4 rounded-xl shadow-lg flex items-center space-x-3 transition-transform duration-300 ${simpleToastType === 'success' ? 'bg-green-500 text-white' : simpleToastType === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} ${showSimpleToast ? 'animate-slideIn-toast' : 'animate-slideOut-toast'}`}
             role="alert">
          {simpleToastType === 'success' && <ThumbsUp className="w-5 h-5" />}
          {simpleToastType === 'error' && <Trash2 className="w-5 h-5" />}
          {simpleToastType === 'info' && <MessageSquare className="w-5 h-5" />}
          <p className="font-medium text-sm">{simpleToastMsg}</p>
        </div>
      )}
    </div>
  );
};


export default Foro;