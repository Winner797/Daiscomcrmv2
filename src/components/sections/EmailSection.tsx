import React, { useState } from 'react';
<<<<<<< HEAD
import { Mail, Search, Filter, Plus, Archive, Trash2, Flag, Star, Send, Paperclip, Folder, Inbox, FolderOpen, X, ArrowLeft } from 'lucide-react';
=======
import { Mail, Search, Filter, Plus, Archive, Trash2, Flag, Star } from 'lucide-react';
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55

interface EmailThread {
  id: number;
  from_email: string;
  from_name: string;
  subject: string;
  preview: string;
  status: 'open' | 'closed' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  unread_count: number;
  last_message_date: string;
  assigned_to?: string;
<<<<<<< HEAD
  folder: string;
  body?: string;
}

interface EmailMessage {
  id: number;
  from: string;
  text: string;
  time: string;
  sent: boolean;
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
}

export default function EmailSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed' | 'archived'>('open');
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
<<<<<<< HEAD
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [viewMode, setViewMode] = useState<'list' | 'read' | 'compose'>('list');
  const [selectedEmail, setSelectedEmail] = useState<EmailThread | null>(null);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });

  const folders = [
    { id: 'inbox', label: 'Bandeja de entrada', icon: Inbox, count: 15 },
    { id: 'sent', label: 'Enviados', icon: Send, count: 0 },
    { id: 'archived', label: 'Archivados', icon: Archive, count: 48 },
    { id: 'trash', label: 'Papelera', icon: Trash2, count: 3 },
  ];
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55

  const mockEmails: EmailThread[] = [
    {
      id: 1,
      from_email: 'cliente@example.com',
      from_name: 'José María García',
      subject: 'Consulta sobre producto',
      preview: 'Quisiera saber más sobre las características del producto...',
<<<<<<< HEAD
      body: 'Hola,\n\nQuisiera saber más sobre las características del producto XYZ que ofrecen. ¿Tienen disponibilidad inmediata?\n\nSaludos.',
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
      status: 'open',
      priority: 'high',
      unread_count: 2,
      last_message_date: 'Hace 2 horas',
<<<<<<< HEAD
      assigned_to: 'Juan López',
      folder: 'inbox'
=======
      assigned_to: 'Juan López'
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    },
    {
      id: 2,
      from_email: 'info@empresa.com',
      from_name: 'Empresa XYZ',
      subject: 'Propuesta de colaboración',
      preview: 'Nos gustaría explorar oportunidades de trabajo conjunto...',
<<<<<<< HEAD
      body: 'Estimados,\n\nNos gustaría explorar oportunidades de trabajo conjunto. Adjunto nuestra propuesta comercial.\n\nQuedamos atentos.',
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
      status: 'open',
      priority: 'normal',
      unread_count: 1,
      last_message_date: 'Hace 5 horas',
<<<<<<< HEAD
      assigned_to: 'María López',
      folder: 'inbox'
=======
      assigned_to: 'María López'
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    },
    {
      id: 3,
      from_email: 'support@vendor.com',
      from_name: 'Soporte Vendor',
      subject: 'Confirmación de pedido #1234',
      preview: 'Su pedido ha sido confirmado y será enviado pronto...',
<<<<<<< HEAD
      body: 'Hola,\n\nSu pedido #1234 ha sido confirmado y será enviado en las próximas 24 horas.\n\nGracias por su compra.',
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
      status: 'closed',
      priority: 'low',
      unread_count: 0,
      last_message_date: 'Ayer',
<<<<<<< HEAD
      assigned_to: 'Carlos Ruiz',
      folder: 'archived'
=======
      assigned_to: 'Carlos Ruiz'
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    }
  ];

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.from_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || email.status === filter;
<<<<<<< HEAD
    const matchesFolder = selectedFolder === 'inbox' ? email.folder === 'inbox' :
                          selectedFolder === 'sent' ? email.folder === 'sent' :
                          selectedFolder === 'archived' ? email.folder === 'archived' :
                          selectedFolder === 'trash' ? email.folder === 'trash' : true;
    return matchesSearch && matchesFilter && matchesFolder;
  });

  const emailMessages: EmailMessage[] = selectedEmail ? [
    { id: 1, from: selectedEmail.from_email, text: selectedEmail.body || '', time: selectedEmail.last_message_date, sent: false },
  ] : [];

  const handleSendEmail = () => {
    console.log('Sending email:', composeData);
    setViewMode('list');
    setComposeData({ to: '', subject: '', body: '' });
  };

  const handleDeleteEmails = () => {
    console.log('Deleting emails:', selectedEmails);
    setSelectedEmails([]);
  };

  const handleArchiveEmails = () => {
    console.log('Archiving emails:', selectedEmails);
    setSelectedEmails([]);
  };

=======
    return matchesSearch && matchesFilter;
  });

>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'text-red-600 bg-red-50',
      high: 'text-orange-600 bg-orange-50',
      normal: 'text-blue-600 bg-blue-50',
      low: 'text-gray-600 bg-gray-50'
    };
    return colors[priority] || colors.normal;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      urgent: 'Urgente',
      high: 'Alta',
      normal: 'Normal',
      low: 'Baja'
    };
    return labels[priority] || priority;
  };

  return (
<<<<<<< HEAD
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-56 bg-white border-r flex flex-col">
        <div className="p-3 border-b">
          <button
            onClick={() => { setViewMode('compose'); setComposeData({ to: '', subject: '', body: '' }); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Redactar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {folders.map((folder) => {
            const FolderIcon = folder.icon;
            return (
              <button
                key={folder.id}
                onClick={() => { setSelectedFolder(folder.id); setViewMode('list'); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors mb-1 ${
                  selectedFolder === folder.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderIcon size={18} />
                  <span className="text-sm font-medium">{folder.label}</span>
                </div>
                {folder.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedFolder === folder.id ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="px-4 py-3 bg-white border-b">
            <div className="flex gap-3 items-center">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {selectedEmails.length > 0 && (
                <>
                  <button onClick={handleArchiveEmails} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Archive size={18} className="text-gray-600" />
                  </button>
                  <button onClick={handleDeleteEmails} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            {filteredEmails.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Mail size={64} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No hay emails en esta carpeta</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => { setSelectedEmail(email); setViewMode('read'); }}
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedEmails.includes(email.id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(email.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          if (e.target.checked) {
                            setSelectedEmails([...selectedEmails, email.id]);
                          } else {
                            setSelectedEmails(selectedEmails.filter(id => id !== email.id));
                          }
                        }}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <p className={`text-sm truncate ${email.unread_count > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                              {email.from_name}
                            </p>
                            {email.unread_count > 0 && (
                              <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{email.last_message_date}</span>
                        </div>
                        <p className={`text-sm truncate ${email.unread_count > 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {email.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{email.preview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'read' && selectedEmail && (
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <button onClick={() => setViewMode('list')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{selectedEmail.subject}</p>
            </div>
            <button onClick={handleArchiveEmails} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Archive size={18} className="text-gray-600" />
            </button>
            <button onClick={handleDeleteEmails} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                  {selectedEmail.from_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{selectedEmail.from_name}</p>
                    <span className="text-sm text-gray-500">{selectedEmail.last_message_date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedEmail.from_email}</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedEmail.body}</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t bg-gray-50">
            <button
              onClick={() => {
                setComposeData({ to: selectedEmail.from_email, subject: `Re: ${selectedEmail.subject}`, body: '' });
                setViewMode('compose');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Responder
            </button>
          </div>
        </div>
      )}

      {viewMode === 'compose' && (
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setViewMode('list')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} className="text-gray-600" />
              </button>
              <p className="font-semibold text-gray-900">Nuevo email</p>
            </div>
            <button
              onClick={handleSendEmail}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
              Enviar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Para:</label>
                <input
                  type="email"
                  value={composeData.to}
                  onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                  placeholder="destinatario@ejemplo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto:</label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  placeholder="Asunto del email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje:</label>
                <textarea
                  value={composeData.body}
                  onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Paperclip size={18} />
                  Adjuntar archivo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
=======
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Emails</h1>
        <p className="text-gray-600 mt-2">Gestiona todos tus emails en un solo lugar</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              Nuevo Email
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('open')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Abiertos
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'closed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cerrados
            </button>
            <button
              onClick={() => setFilter('archived')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'archived' ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Archivados
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'all' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
          </div>
        </div>

        {selectedEmails.length > 0 && (
          <div className="bg-blue-50 px-6 py-3 border-b border-blue-200 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">{selectedEmails.length} seleccionado(s)</span>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Archive size={18} className="text-blue-600" />
              </button>
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                selectedEmails.includes(email.id) ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(email.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedEmails([...selectedEmails, email.id]);
                    } else {
                      setSelectedEmails(selectedEmails.filter(id => id !== email.id));
                    }
                  }}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 truncate">{email.from_name}</p>
                        {email.unread_count > 0 && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full flex-shrink-0">
                            {email.unread_count}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-700 truncate">{email.subject}</p>
                      <p className="text-sm text-gray-500 truncate mt-1">{email.preview}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                        <Star size={16} className="text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                        <Flag size={16} className={`${getPriorityColor(email.priority).split(' ')[0]}`} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(email.priority)}`}>
                      {getPriorityLabel(email.priority)}
                    </span>
                    {email.assigned_to && (
                      <span className="text-gray-600">Asignado a: {email.assigned_to}</span>
                    )}
                    <span className="text-gray-500 ml-auto">{email.last_message_date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No hay emails que mostrar</p>
          </div>
        )}
      </div>
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    </div>
  );
}
