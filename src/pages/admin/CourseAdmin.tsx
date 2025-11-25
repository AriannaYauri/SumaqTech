import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourse, saveModule, saveSection, deleteModule, deleteSection } from '../../firebase/courseService';
import SectionEditor from '../../components/admin/SectionEditor';
import type { Course, Module, Section } from '../../types';

interface CourseAdminProps {
  courseId: string;
}

const CourseAdmin: React.FC<CourseAdminProps> = ({ courseId }) => {
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  
  // Estados para crear nuevo módulo
  const [showNewModuleForm, setShowNewModuleForm] = useState(false);
  const [newModuleData, setNewModuleData] = useState({
    id: '',
    title: '',
    subtitle: '',
    order: 1
  });

  // Cargar curso
  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    setLoading(true);
    try {
      const data = await getCourse(courseId);
      if (data) {
        setCourse(data);
        // Expandir todos los módulos por defecto
        setExpandedModules(new Set(data.modules.map(m => m.id)));
      }
    } catch (error) {
      console.error('Error cargando curso:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle expandir/colapsar módulo
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Crear nuevo módulo
  const handleCreateModule = async () => {
    if (!newModuleData.id || !newModuleData.title) {
      alert('El ID y título del módulo son requeridos');
      return;
    }

    const newModule: Module = {
      id: newModuleData.id,
      title: newModuleData.title,
      subtitle: newModuleData.subtitle,
      sections: [],
      order: newModuleData.order
    };

    const success = await saveModule(courseId, newModule);
    
    if (success) {
      await loadCourse();
      setShowNewModuleForm(false);
      setNewModuleData({ id: '', title: '', subtitle: '', order: 1 });
      alert('✅ Módulo creado exitosamente');
    } else {
      alert('❌ Error creando módulo');
    }
  };

  // Eliminar módulo
  const handleDeleteModule = async (moduleId: string) => {
    const module = course?.modules.find(m => m.id === moduleId);
    if (!module) return;

    const confirmDelete = window.confirm(
      `¿Eliminar módulo "${module.title}"?\n\n` +
      `Esto eliminará también todas sus ${module.sections.length} secciones.\n\n` +
      `Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) return;

    const success = await deleteModule(courseId, moduleId);
    
    if (success) {
      await loadCourse();
      alert('🗑️ Módulo eliminado');
    } else {
      alert('❌ Error eliminando módulo');
    }
  };

  // Crear nueva sección
  const handleCreateSection = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSelectedSection(null);
    setShowSectionEditor(true);
  };

  // Editar sección existente
  const handleEditSection = (moduleId: string, section: Section) => {
    setSelectedModule(moduleId);
    setSelectedSection(section);
    setShowSectionEditor(true);
  };

  // Guardar sección
  const handleSaveSection = async (section: Section): Promise<boolean> => {
    if (!selectedModule) return false;

    const success = await saveSection(courseId, selectedModule, section);
    
    if (success) {
      await loadCourse();
      return true;
    }
    
    return false;
  };

  // Eliminar sección
  const handleDeleteSection = async (moduleId: string, sectionId: string) => {
    const module = course?.modules.find(m => m.id === moduleId);
    const section = module?.sections.find(s => s.id === sectionId);
    
    if (!section) return;

    const confirmDelete = window.confirm(
      `¿Eliminar sección "${section.title}"?\n\n` +
      `Esta acción no se puede deshacer.`
    );

    if (!confirmDelete) return;

    const success = await deleteSection(courseId, moduleId, sectionId);
    
    if (success) {
      await loadCourse();
      alert('🗑️ Sección eliminada');
    } else {
      alert('❌ Error eliminando sección');
    }
  };

  // Cerrar editor
  const handleCloseEditor = () => {
    setShowSectionEditor(false);
    setSelectedSection(null);
    setSelectedModule(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-teal-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">❌ Curso no encontrado</p>
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Volver al admin
          </button>
        </div>
      </div>
    );
  }

  // Si está editando una sección, mostrar solo el editor
  if (showSectionEditor && selectedModule) {
    return (
      <div className="h-screen">
        <SectionEditor
          section={selectedSection}
          moduleId={selectedModule}
          onSave={handleSaveSection}
          onCancel={handleCloseEditor}
        />
      </div>
    );
  }

  // Vista principal del admin
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/admin')}
            className="mb-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>

          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-teal-100">{course.description}</p>
          
          <div className="mt-4 flex gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              📚 {course.modules.length} módulos
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              📝 {course.modules.reduce((acc, m) => acc + m.sections.length, 0)} secciones
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Botón crear módulo */}
        <div className="mb-6">
          {!showNewModuleForm ? (
            <button
              onClick={() => setShowNewModuleForm(true)}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Nuevo Módulo
            </button>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nuevo Módulo</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ID del Módulo *
                  </label>
                  <input
                    type="text"
                    value={newModuleData.id}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="m3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={newModuleData.title}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Funciones en Python"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={newModuleData.subtitle}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Aprende a crear funciones reutilizables"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Orden
                  </label>
                  <input
                    type="number"
                    value={newModuleData.order}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCreateModule}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold"
                  >
                    Crear Módulo
                  </button>
                  <button
                    onClick={() => {
                      setShowNewModuleForm(false);
                      setNewModuleData({ id: '', title: '', subtitle: '', order: 1 });
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de módulos */}
        <div className="space-y-4">
          {course.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header del módulo */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <svg
                      className={`w-5 h-5 transition-transform ${expandedModules.has(module.id) ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {module.title}
                    </h3>
                    {module.subtitle && (
                      <p className="text-sm text-gray-600">{module.subtitle}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {module.id} | Orden: {module.order} | {module.sections.length} secciones
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCreateSection(module.id)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Sección
                  </button>

                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar módulo"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Secciones del módulo */}
              {expandedModules.has(module.id) && (
                <div className="p-6">
                  {module.sections.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>No hay secciones en este módulo</p>
                      <button
                        onClick={() => handleCreateSection(module.id)}
                        className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                      >
                        Crear Primera Sección
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {module.sections.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{section.title}</h4>
                            {section.description && (
                              <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                            )}
                            <div className="flex gap-4 mt-2 text-xs text-gray-500">
                              <span>ID: {section.id}</span>
                              <span>Orden: {section.order}</span>
                              {section.duration && <span>⏱️ {section.duration}</span>}
                              {section.level && <span>🏆 {section.level}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditSection(module.id, section)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteSection(module.id, section.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar sección"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {course.modules.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay módulos todavía
            </h3>
            <p className="text-gray-500 mb-6">
              Crea el primer módulo para comenzar a agregar contenido
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAdmin;