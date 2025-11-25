import React, { useState, useEffect } from 'react';
import MarkdownRenderer from '../MarkdownRenderer';
import type { Section } from '../../types';

interface SectionEditorProps {
  section: Section | null;
  moduleId: string;
  onSave: (section: Section) => Promise<boolean>;
  onCancel: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  moduleId,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Section>({
    id: section?.id || '',
    title: section?.title || '',
    description: section?.description || '',
    content: section?.content || '',
    duration: section?.duration || '',
    level: section?.level || '',
    order: section?.order || 1
  });

  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Actualizar formData cuando cambie la sección
  useEffect(() => {
    if (section) {
      setFormData(section);
    }
  }, [section]);

  // Validar formulario
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.id.trim()) {
      newErrors.id = 'El ID es requerido';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    if (formData.order < 1) {
      newErrors.order = 'El orden debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 1 : value
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Guardar sección
  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      const success = await onSave(formData);
      
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error guardando sección:', error);
    } finally {
      setSaving(false);
    }
  };

  // Atajos de teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+S para guardar
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {section ? 'Editar Sección' : 'Nueva Sección'}
          </h2>
          <p className="text-teal-100 text-sm mt-1">
            Módulo: {moduleId}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Preview */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {showPreview ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ocultar Preview
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                Mostrar Preview
              </>
            )}
          </button>

          {/* Botón Cancelar */}
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>

          {/* Botón Guardar */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : saveSuccess
                ? 'bg-green-500 text-white'
                : 'bg-white text-teal-600 hover:bg-gray-100'
            }`}
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : saveSuccess ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Guardado!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Guardar (Ctrl+S)
              </>
            )}
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 overflow-hidden flex">
        {/* PANEL IZQUIERDO: Formulario */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} p-6 overflow-y-auto border-r border-gray-200`}>
          <div className="space-y-6">
            {/* ID de la sección */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID de la Sección *
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="m2-s1"
                disabled={!!section} // No editable si ya existe
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.id ? 'border-red-500' : 'border-gray-300'
                } ${section ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
              {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
              <p className="text-gray-500 text-xs mt-1">
                Formato: m[número]-s[número] (ej: m2-s1)
              </p>
            </div>

            {/* Título */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Conoce a Python 🐍"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Descripción corta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción Corta
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Después de preparar su laboratorio..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-gray-500 text-xs mt-1">
                Para mostrar en la lista de secciones
              </p>
            </div>

            {/* Duración */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duración
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="20 min"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Nivel */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nivel/Logro
              </label>
              <input
                type="text"
                name="level"
                value={formData.level}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Explorador del Lenguaje Python"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Orden */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Orden *
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.order ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
              <p className="text-gray-500 text-xs mt-1">
                Define el orden de aparición en el curso
              </p>
            </div>

            {/* Contenido Markdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contenido (Markdown) *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="# 🐍 SECCIÓN 1: Conoce a Python

## Historia introductoria

Después de preparar su laboratorio digital..."
                rows={20}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              <p className="text-gray-500 text-xs mt-1">
                Usa Markdown para formato. <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Ver guía de Markdown</a>
              </p>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Preview */}
        {showPreview && (
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Preview
                </h3>
                <p className="text-xs text-gray-400">
                  Así se verá el contenido en el curso
                </p>
              </div>
              
              {formData.content ? (
                <MarkdownRenderer content={formData.content} />
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>El preview aparecerá aquí al escribir contenido</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionEditor;