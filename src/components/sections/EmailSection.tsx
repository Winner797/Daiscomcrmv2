import React, { useState, useRef, useEffect } from 'react';
import {
  Mail, Search, Star, Archive, Trash2, Reply, Forward, MoreVertical,
  Send, Paperclip, Image as ImageIcon, Smile, ChevronLeft, RefreshCw,
  Inbox, FileText, AlertCircle, Clock, FolderOpen, Tag, Users, Plus, X
} from 'lucide-react';

interface Email {
  id: number;
  from: { name: string; email: string };
  to: { name: string; email: string }[];
  cc?: { name: string; email: string }[];
  subject: string;
  preview: string;
  body: string;
  date: string;
  time: string;
  starred: boolean;
  read: boolean;
  hasAttachment: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'archived' | 'spam' | 'trash';
  labels: string[];
}

const folders = [
  { id: 'inbox', name: 'Bandeja de entrada', icon: Inbox, count: 5 },
  { id: 'sent', name: 'Enviados', icon: Send, count: 0 },
  { id: 'drafts', name: 'Borradores', icon: FileText, count: 2 },
  { id: 'archived', name: 'Archivados', icon: Archive, count: 12 },
  { id: 'spam', name: 'Spam', icon: AlertCircle, count: 3 },
  { id: 'trash', name: 'Papelera', icon: Trash2, count: 8 },
];

export default function EmailSection() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [listWidth, setListWidth] = useState(35); // porcentaje
  const [isResizing, setIsResizing] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const mockEmails: Email[] = [
    {
      id: 1,
      from: { name: 'María González', email: 'maria.gonzalez@empresa.com' },
      to: [{ name: 'Tu', email: 'tu@daiscom.com' }],
      cc: [{ name: 'Carlos López', email: 'carlos@empresa.com' }],
      subject: 'Propuesta de colaboración comercial',
      preview: 'Estimado equipo, me gustaría discutir una propuesta de colaboración...',
      body: `<p>Estimado equipo,</p>
      <p>Me pongo en contacto con ustedes para presentar una propuesta de colaboración comercial que considero beneficiosa para ambas partes.</p>
      <p>Nuestra empresa ha estado siguiendo de cerca su trabajo y creemos que existe una gran sinergia entre nuestros productos y servicios.</p>
      <p>¿Estarían disponibles para una reunión la próxima semana para discutir los detalles?</p>
      <p>Quedo atento a su respuesta.</p>
      <p>Saludos cordiales,<br>María González</p>`,
      date: 'Hoy',
      time: '10:32 AM',
      starred: true,
      read: false,
      hasAttachment: true,
      folder: 'inbox',
      labels: ['Importante', 'Negocios']
    },
    {
      id: 2,
      from: { name: 'Carlos Rodríguez', email: 'carlos.rodriguez@cliente.com' },
      to: [{ name: 'Tu', email: 'tu@daiscom.com' }],
      subject: 'Consulta sobre facturación',
      preview: 'Hola, tengo una duda sobre la factura del mes pasado...',
      body: `<p>Hola,</p>
      <p>Tengo una duda sobre la factura del mes pasado. He notado un cargo que no reconozco y me gustaría que lo revisaran.</p>
      <p>¿Podrían ayudarme a aclarar esto?</p>
      <p>Gracias,<br>Carlos</p>`,
      date: 'Hoy',
      time: '9:15 AM',
      starred: false,
      read: true,
      hasAttachment: false,
      folder: 'inbox',
      labels: ['Soporte']
    },
    {
      id: 3,
      from: { name: 'Ana Martínez', email: 'ana.martinez@proveedor.com' },
      to: [{ name: 'Tu', email: 'tu@daiscom.com' }],
      subject: 'Actualización de pedido #1234',
      preview: 'Su pedido ha sido procesado y está en camino...',
      body: `<p>Estimado cliente,</p>
      <p>Le informamos que su pedido #1234 ha sido procesado y enviado.</p>
      <p>Número de seguimiento: ABC123456789</p>
      <p>Fecha estimada de entrega: 3-5 días hábiles</p>
      <p>Gracias por su compra.</p>`,
      date: 'Ayer',
      time: '5:20 PM',
      starred: false,
      read: true,
      hasAttachment: true,
      folder: 'inbox',
      labels: ['Pedidos']
    },
    {
      id: 4,
      from: { name: 'Pedro Ramírez', email: 'pedro@startup.io' },
      to: [{ name: 'Tu', email: 'tu@daiscom.com' }],
      subject: 'Invitación a webinar sobre IA',
      preview: 'Te invitamos a nuestro próximo webinar sobre inteligencia artificial...',
      body: `<p>Hola,</p>
      <p>Nos complace invitarte a nuestro próximo webinar sobre inteligencia artificial aplicada a los negocios.</p>
      <p><strong>Fecha:</strong> 15 de febrero, 2026<br>
      <strong>Hora:</strong> 3:00 PM - 4:30 PM<br>
      <strong>Plataforma:</strong> Zoom</p>
      <p>¡Esperamos contar con tu participación!</p>`,
      date: 'Ayer',
      time: '2:45 PM',
      starred: true,
      read: false,
      hasAttachment: false,
      folder: 'inbox',
      labels: ['Eventos']
    },
    {
      id: 5,
      from: { name: 'Laura Fernández', email: 'laura@marketing.com' },
      to: [{ name: 'Tu', email: 'tu@daiscom.com' }],
      subject: 'Newsletter - Tendencias de Marketing 2026',
      preview: 'Descubre las últimas tendencias en marketing digital...',
      body: `<p>¡Hola!</p>
      <p>Este mes te traemos las tendencias más importantes en marketing digital para 2026.</p>
      <p>Temas destacados:</p>
      <ul>
        <li>IA y automatización</li>
        <li>Marketing de contenidos</li>
        <li>Redes sociales emergentes</li>
      </ul>
      <p>¡No te lo pierdas!</p>`,
      date: '28 Ene',
      time: '8:00 AM',
      starred: false,
      read: true,
      hasAttachment: false,
      folder: 'inbox',
      labels: ['Newsletter']
    }
  ];

  const filteredEmails = mockEmails.filter(email => {
    const matchesFolder = email.folder === selectedFolder;
    const matchesSearch = searchTerm === '' ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newWidth >= 25 && newWidth <= 60) {
        setListWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const toggleStarred = (emailId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle starred:', emailId);
  };

  const toggleEmailSelection = (emailId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedEmails([...selectedEmails, emailId]);
    } else {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Redactar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {folders.map(folder => {
            const Icon = folder.icon;
            const isActive = selectedFolder === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => {
                  setSelectedFolder(folder.id);
                  setSelectedEmail(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-[var(--primary-orange-light)] text-[var(--primary-orange)]'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="text-sm font-medium">{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[var(--primary-orange)] text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p className="mb-1">Almacenamiento</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div className="bg-[var(--primary-orange)] h-1.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p>4.5 GB de 10 GB usados</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        {/* Email List */}
        <div className="bg-white border-r border-gray-200 flex flex-col" style={{ width: `${listWidth}%` }}>
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar correos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[var(--primary-orange)]"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedEmails(filteredEmails.map(email => email.id));
                  } else {
                    setSelectedEmails([]);
                  }
                }}
              />
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Actualizar">
                <RefreshCw size={16} className="text-gray-600" />
              </button>
            </div>
            {selectedEmails.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{selectedEmails.length} seleccionado(s)</span>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Archivar">
                  <Archive size={16} className="text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Eliminar">
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            )}
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.map(email => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedEmail?.id === email.id ? 'bg-blue-50' : ''
                } ${!email.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(email.id)}
                    onChange={(e) => toggleEmailSelection(email.id, e)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[var(--primary-orange)]"
                  />
                  <button
                    onClick={(e) => toggleStarred(email.id, e)}
                    className="mt-0.5"
                  >
                    <Star
                      size={16}
                      className={email.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className={`text-sm truncate ${!email.read ? 'font-bold text-gray-900' : 'font-normal text-gray-700'}`}>
                        {email.from.name}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0">{email.time}</span>
                    </div>
                    <p className={`text-sm mb-1 truncate ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {email.subject}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{email.preview}</p>
                    {email.labels.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {email.labels.map(label => (
                          <span
                            key={label}
                            className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {email.hasAttachment && (
                    <Paperclip size={14} className="text-gray-400 flex-shrink-0 mt-1" />
                  )}
                </div>
              </div>
            ))}
            {filteredEmails.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Mail size={48} className="text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No hay correos</p>
                <p className="text-sm text-gray-400 mt-1">Esta carpeta está vacía</p>
              </div>
            )}
          </div>
        </div>

        {/* Resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 bg-gray-200 hover:bg-[var(--primary-orange)] cursor-col-resize transition-colors relative group"
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>

        {/* Email Detail */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
          {selectedEmail ? (
            <>
              {/* Email Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Responder">
                      <Reply size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Reenviar">
                      <Forward size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Archivar">
                      <Archive size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Eliminar">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Más opciones">
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedEmail.subject}</h1>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-orange)] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {selectedEmail.from.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{selectedEmail.from.name}</p>
                        <p className="text-sm text-gray-600">&lt;{selectedEmail.from.email}&gt;</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{selectedEmail.date}</p>
                        <p className="text-xs text-gray-500">{selectedEmail.time}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Para:</span> {selectedEmail.to.map(t => t.email).join(', ')}
                      </p>
                      {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                        <p>
                          <span className="font-medium">CC:</span> {selectedEmail.cc.map(c => c.email).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                />
                {selectedEmail.hasAttachment && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Archivos adjuntos</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <FileText size={20} className="text-[var(--primary-orange)]" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Propuesta_Comercial.pdf</p>
                          <p className="text-xs text-gray-500">2.4 MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reply Section */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] text-white rounded-lg font-medium transition-colors">
                  <Reply size={18} />
                  Responder
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={48} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecciona un correo</h3>
                <p className="text-gray-600">Elige un mensaje de la lista para leerlo</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Nuevo mensaje</h2>
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Para"
                  className="w-full px-4 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-[var(--primary-orange)]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="CC"
                  className="w-full px-4 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-[var(--primary-orange)]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Asunto"
                  className="w-full px-4 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-[var(--primary-orange)]"
                />
              </div>
              <div>
                <textarea
                  placeholder="Escribe tu mensaje..."
                  rows={12}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Adjuntar archivo">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Insertar imagen">
                  <ImageIcon size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Insertar emoji">
                  <Smile size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button className="flex items-center gap-2 px-6 py-2 bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] text-white rounded-lg font-medium transition-colors">
                  <Send size={18} />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
