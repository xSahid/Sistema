import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CustomAlert from '../../components/CustomAlert';

interface Document {
  id: string;
  providerId: string;
  providerName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: 'legal' | 'financial' | 'technical' | 'commercial' | 'other';
  uploadDate: string;
  uploadedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
  tags: string[];
}

interface DocumentFormData {
  providerId: string;
  category: 'legal' | 'financial' | 'technical' | 'commercial' | 'other';
  description: string;
  tags: string;
  file: File | null;
}

interface FormErrors {
  providerId?: string;
  category?: string;
  description?: string;
  tags?: string;
  file?: string;
}

const DocumentManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'list' | 'folders'>('list');
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      providerId: 'PROV-001',
      providerName: 'Proveedor ABC',
      fileName: 'acta_constitutiva.pdf',
      fileType: 'pdf',
      fileSize: 2048576,
      category: 'legal',
      uploadDate: '2025-01-15T10:30:00Z',
      uploadedBy: 'Juan Pérez',
      status: 'approved',
      description: 'Acta constitutiva de la empresa',
      tags: ['legal', 'constitutiva', 'empresa']
    },
    {
      id: '2',
      providerId: 'PROV-001',
      providerName: 'Proveedor ABC',
      fileName: 'opinion_sat.xml',
      fileType: 'xml',
      fileSize: 512000,
      category: 'financial',
      uploadDate: '2025-01-16T14:20:00Z',
      uploadedBy: 'María García',
      status: 'pending',
      description: 'Opinión del SAT sobre cumplimiento fiscal',
      tags: ['sat', 'fiscal', 'opinion']
    },
    {
      id: '3',
      providerId: 'PROV-002',
      providerName: 'Proveedor XYZ',
      fileName: 'certificado_iso.pdf',
      fileType: 'pdf',
      fileSize: 1536000,
      category: 'technical',
      uploadDate: '2025-01-17T09:15:00Z',
      uploadedBy: 'Carlos López',
      status: 'approved',
      description: 'Certificado ISO 9001:2015',
      tags: ['iso', 'certificado', 'calidad']
    },
    {
      id: '4',
      providerId: 'PROV-003',
      providerName: 'Proveedor DEF',
      fileName: 'cotizacion_servicios.pdf',
      fileType: 'pdf',
      fileSize: 1024000,
      category: 'commercial',
      uploadDate: '2025-01-18T11:45:00Z',
      uploadedBy: 'Ana Rodríguez',
      status: 'rejected',
      description: 'Cotización de servicios de mantenimiento',
      tags: ['cotizacion', 'servicios', 'mantenimiento']
    }
  ]);

  const [providers] = useState([
    { id: 'PROV-001', name: 'Proveedor ABC' },
    { id: 'PROV-002', name: 'Proveedor XYZ' },
    { id: 'PROV-003', name: 'Proveedor DEF' },
    { id: 'PROV-004', name: 'Proveedor GHI' }
  ]);

  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<DocumentFormData>({
    providerId: '',
    category: 'legal',
    description: '',
    tags: '',
    file: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Funciones de validación
  const validateProviderId = (providerId: string): string | undefined => {
    if (!providerId.trim()) return 'El proveedor es requerido';
    return undefined;
  };

  const validateCategory = (category: string): string | undefined => {
    if (!category) return 'La categoría es requerida';
    return undefined;
  };

  const validateDescription = (description: string): string | undefined => {
    if (!description.trim()) return 'La descripción es requerida';
    if (description.length < 10) return 'La descripción debe tener al menos 10 caracteres';
    return undefined;
  };

  const validateFile = (file: File | null): string | undefined => {
    if (!file) return 'El archivo es requerido';
    
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return 'El archivo no debe exceder 50MB';
    }

    const allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'xml', 'jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return 'Tipo de archivo no permitido';
    }

    return undefined;
  };

  const validateField = (name: string, value: string | File | null): string | undefined => {
    switch (name) {
      case 'providerId':
        return validateProviderId(value as string);
      case 'category':
        return validateCategory(value as string);
      case 'description':
        return validateDescription(value as string);
      case 'file':
        return validateFile(value as File);
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files ? files[0] : null;
    
    setFormData(prev => ({
      ...prev,
      file
    }));

    if (touched.file) {
      const error = validateFile(file);
      setErrors(prev => ({
        ...prev,
        file: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFileBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({
      ...prev,
      file: true
    }));

    const error = validateFile(formData.file);
    setErrors(prev => ({
      ...prev,
      file: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof DocumentFormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setAlert({
        isOpen: true,
        title: 'Error de Validación',
        message: 'Por favor, corrige los errores en el formulario',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const provider = providers.find(p => p.id === formData.providerId);
      
      const newDocument: Document = {
        id: Date.now().toString(),
        providerId: formData.providerId,
        providerName: provider?.name || '',
        fileName: formData.file?.name || '',
        fileType: formData.file?.name.split('.').pop()?.toLowerCase() || '',
        fileSize: formData.file?.size || 0,
        category: formData.category,
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Usuario Actual',
        status: 'pending',
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      setDocuments(prev => [newDocument, ...prev]);
      
      setAlert({
        isOpen: true,
        title: 'Documento Cargado',
        message: 'El documento se ha cargado exitosamente',
        type: 'success'
      });

      handleClear();
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error al cargar el documento. Intenta nuevamente.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      providerId: '',
      category: 'legal',
      description: '',
      tags: '',
      file: null
    });
    setErrors({});
    setTouched({});
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const handleStatusChange = (documentId: string, newStatus: Document['status']) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: newStatus }
          : doc
      )
    );
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este documento?')) {
      return;
    }

    try {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      setAlert({
        isOpen: true,
        title: 'Documento Eliminado',
        message: 'El documento se ha eliminado exitosamente',
        type: 'success'
      });
    } catch (error) {
      setAlert({
        isOpen: true,
        title: 'Error',
        message: 'Error al eliminar el documento',
        type: 'error'
      });
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'approved': return 'green';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  const getCategoryText = (category: Document['category']) => {
    switch (category) {
      case 'legal': return 'Legal';
      case 'financial': return 'Financiero';
      case 'technical': return 'Técnico';
      case 'commercial': return 'Comercial';
      case 'other': return 'Otro';
      default: return 'Desconocido';
    }
  };

  const getCategoryIcon = (category: Document['category']) => {
    switch (category) {
      case 'legal': return '⚖️';
      case 'financial': return '💰';
      case 'technical': return '🔧';
      case 'commercial': return '📋';
      case 'other': return '📄';
      default: return '📄';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesProvider = !selectedProvider || doc.providerId === selectedProvider;
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesProvider && matchesCategory && matchesSearch;
  });

  const FormSkeleton = () => (
    <div className="form-skeleton">
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-input"></div>
      <div className="skeleton-textarea"></div>
      <div className="skeleton-file"></div>
      <div className="skeleton-button"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Gestión de Documentos</h1>
          <FormSkeleton />
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">Gestión de Documentos</h1>
          <p className="hero-subtitle">
            Carga, organiza y gestiona documentos de proveedores de forma segura
          </p>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              📋 Lista de Documentos
            </button>
            <button
              className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              📤 Cargar Documento
            </button>
            <button
              className={`tab ${activeTab === 'folders' ? 'active' : ''}`}
              onClick={() => setActiveTab('folders')}
            >
              📁 Carpetas por Proveedor
            </button>
          </div>

          {activeTab === 'list' && (
            <div className="documents-list">
              <div className="list-header">
                <h3>Documentos del Sistema</h3>
                <div className="list-filters">
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input"
                  />
                  <select 
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="form-input"
                  >
                    <option value="">Todos los proveedores</option>
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-input"
                  >
                    <option value="">Todas las categorías</option>
                    <option value="legal">Legal</option>
                    <option value="financial">Financiero</option>
                    <option value="technical">Técnico</option>
                    <option value="commercial">Comercial</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              <div className="documents-grid">
                {filteredDocuments.map(document => (
                  <div key={document.id} className="document-card">
                    <div className="document-header">
                      <div className="document-info">
                        <h4>{document.fileName}</h4>
                        <p className="document-provider">{document.providerName}</p>
                        <div className="document-meta">
                          <span className={`category-badge ${document.category}`}>
                            {getCategoryIcon(document.category)} {getCategoryText(document.category)}
                          </span>
                          <span className={`status-badge ${getStatusColor(document.status)}`}>
                            {getStatusIcon(document.status)} {getStatusText(document.status)}
                          </span>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-primary btn-sm">
                          📥 Descargar
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          👁️ Ver
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(document.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="document-details">
                      <div className="detail-row">
                        <span className="detail-label">Tamaño:</span>
                        <span className="detail-value">{formatFileSize(document.fileSize)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Tipo:</span>
                        <span className="detail-value">{document.fileType.toUpperCase()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Subido:</span>
                        <span className="detail-value">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Por:</span>
                        <span className="detail-value">{document.uploadedBy}</span>
                      </div>
                    </div>

                    {document.description && (
                      <div className="document-description">
                        <h5>Descripción:</h5>
                        <p>{document.description}</p>
                      </div>
                    )}

                    {document.tags.length > 0 && (
                      <div className="document-tags">
                        <h5>Etiquetas:</h5>
                        <div className="tags-list">
                          {document.tags.map(tag => (
                            <span key={tag} className="tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="document-status-actions">
                      {document.status === 'pending' && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(document.id, 'approved')}
                          >
                            ✅ Aprobar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleStatusChange(document.id, 'rejected')}
                          >
                            ❌ Rechazar
                          </button>
                        </>
                      )}
                      {document.status === 'rejected' && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleStatusChange(document.id, 'approved')}
                        >
                          ✅ Aprobar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="form-container">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="providerId" className="form-label">
                      Proveedor *
                    </label>
                    <select
                      id="providerId"
                      name="providerId"
                      value={formData.providerId}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.providerId ? 'error' : ''}`}
                    >
                      <option value="">Selecciona un proveedor</option>
                      {providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </select>
                    {errors.providerId && (
                      <span className="error-message">{errors.providerId}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Categoría *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.category ? 'error' : ''}`}
                    >
                      <option value="legal">Legal</option>
                      <option value="financial">Financiero</option>
                      <option value="technical">Técnico</option>
                      <option value="commercial">Comercial</option>
                      <option value="other">Otro</option>
                    </select>
                    {errors.category && (
                      <span className="error-message">{errors.category}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Descripción *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.description ? 'error' : ''}`}
                    placeholder="Describe el contenido del documento..."
                    rows={3}
                  />
                  {errors.description && (
                    <span className="error-message">{errors.description}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="tags" className="form-label">
                    Etiquetas
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`form-input ${errors.tags ? 'error' : ''}`}
                    placeholder="etiqueta1, etiqueta2, etiqueta3"
                  />
                  <small className="form-help">
                    Separa las etiquetas con comas
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="file" className="form-label">
                    Archivo *
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    onBlur={handleFileBlur}
                    className={`form-input ${errors.file ? 'error' : ''}`}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.xml,.jpg,.jpeg,.png"
                  />
                  {errors.file && (
                    <span className="error-message">{errors.file}</span>
                  )}
                  <small className="form-help">
                    Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX, XML, JPG, JPEG, PNG. Máximo 50MB.
                  </small>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subiendo...' : 'Subir Documento'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClear}
                    disabled={isSubmitting}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'folders' && (
            <div className="folders-view">
              <h3>Carpetas por Proveedor</h3>
              <div className="folders-grid">
                {providers.map(provider => {
                  const providerDocs = documents.filter(doc => doc.providerId === provider.id);
                  const categories = [...new Set(providerDocs.map(doc => doc.category))];
                  
                  return (
                    <div key={provider.id} className="folder-card">
                      <div className="folder-header">
                        <h4>{provider.name}</h4>
                        <span className="documents-count">
                          {providerDocs.length} documentos
                        </span>
                      </div>
                      
                      <div className="folder-categories">
                        {categories.map(category => {
                          const categoryDocs = providerDocs.filter(doc => doc.category === category);
                          return (
                            <div key={category} className="category-section">
                              <h5>
                                {getCategoryIcon(category)} {getCategoryText(category)}
                                <span className="category-count">({categoryDocs.length})</span>
                              </h5>
                              <div className="category-documents">
                                {categoryDocs.slice(0, 3).map(doc => (
                                  <div key={doc.id} className="folder-document">
                                    <span className="document-name">{doc.fileName}</span>
                                    <span className={`document-status ${getStatusColor(doc.status)}`}>
                                      {getStatusIcon(doc.status)}
                                    </span>
                                  </div>
                                ))}
                                {categoryDocs.length > 3 && (
                                  <div className="more-documents">
                                    +{categoryDocs.length - 3} más
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="folder-actions">
                        <button className="btn btn-primary btn-sm">
                          📁 Abrir Carpeta
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          📤 Subir Documento
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      {alert.isOpen && createPortal(
        <CustomAlert
          isOpen={alert.isOpen}
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
        />,
        document.body
      )}
    </>
  );
};

export default DocumentManagementPage; 