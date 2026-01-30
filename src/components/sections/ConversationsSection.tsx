import React, { useState } from 'react';
import { MessageCircle, Mail, MessageSquare, Search, Send, Phone, MoreVertical, Paperclip, Smile, User, MapPin, Tag, X } from 'lucide-react';

interface Conversation {
  id: number;
  type: 'whatsapp' | 'email' | 'chatweb';
  contact: string;
  contactInfo: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'active' | 'pending' | 'closed';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  location?: string;
  tags?: string[];
  lastContact?: string;
}

interface ConversationsSectionProps {
  filterType?: 'all' | 'whatsapp' | 'email' | 'chatweb';
}

export default function ConversationsSection({ filterType: initialFilterType = 'all' }: ConversationsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'whatsapp' | 'email' | 'chatweb'>(initialFilterType);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showClientInfo, setShowClientInfo] = useState(true);

  const mockConversations: Conversation[] = [
    { id: 1, type: 'whatsapp', contact: 'Carlos Rodríguez', contactInfo: '+34 612 345 678', lastMessage: 'Perfecto, gracias por la información', time: '10:30', unread: 0, status: 'active' },
    { id: 2, type: 'email', contact: 'Ana Martínez', contactInfo: 'ana@empresa.com', lastMessage: 'Consulta sobre facturación', time: '10:15', unread: 2, status: 'active', priority: 'high' },
    { id: 3, type: 'chatweb', contact: 'Visitante #1234', contactInfo: 'jose@gmail.com', lastMessage: '¿Tienen envío gratis?', time: '10:10', unread: 1, status: 'pending' },
    { id: 4, type: 'whatsapp', contact: 'Laura Fernández', contactInfo: '+34 699 111 222', lastMessage: 'Ok, entendido', time: '09:45', unread: 0, status: 'active' },
    { id: 5, type: 'email', contact: 'Miguel Sánchez', contactInfo: 'miguel@tech.com', lastMessage: 'Propuesta comercial adjunta', time: '09:30', unread: 3, status: 'pending', priority: 'urgent' },
    { id: 6, type: 'chatweb', contact: 'Visitante #1235', contactInfo: 'isabel@outlook.com', lastMessage: 'Muchas gracias', time: '09:20', unread: 0, status: 'closed' },
    { id: 7, type: 'whatsapp', contact: 'Pedro Ruiz', contactInfo: '+34 633 777 888', lastMessage: '¿Está disponible el producto?', time: '09:00', unread: 1, status: 'active' },
    { id: 8, type: 'email', contact: 'Carmen Jiménez', contactInfo: 'carmen@startup.io', lastMessage: 'Solicitud de información', time: '08:50', unread: 0, status: 'active', priority: 'normal' },
    { id: 9, type: 'chatweb', contact: 'Francisco Moreno', contactInfo: 'fran@yahoo.es', lastMessage: 'Hola, buenos días', time: '08:30', unread: 0, status: 'pending' },
    { id: 10, type: 'whatsapp', contact: 'Lucía Navarro', contactInfo: '+34 699 444 555', lastMessage: 'Perfecto, nos vemos', time: '08:15', unread: 0, status: 'closed' },
    { id: 11, type: 'email', contact: 'Roberto Díaz', contactInfo: 'roberto@corp.com', lastMessage: 'Renovación de contrato', time: 'Ayer', unread: 1, status: 'active', priority: 'high' },
    { id: 12, type: 'chatweb', contact: 'Visitante #1236', contactInfo: 'maria@hotmail.com', lastMessage: '¿Aceptan devoluciones?', time: 'Ayer', unread: 2, status: 'active' },
  ];

  const clientInfo: ClientInfo = {
    name: selectedConversation?.contact || '',
    email: selectedConversation?.type === 'email' || selectedConversation?.type === 'chatweb' ? selectedConversation.contactInfo : '',
    phone: selectedConversation?.type === 'whatsapp' ? selectedConversation.contactInfo : '',
    location: 'Madrid, España',
    tags: ['Cliente VIP', 'Frecuente'],
    lastContact: 'Hace 2 días'
  };

  const conversationMessages: Message[] = selectedConversation ? [
    { id: 1, text: '¡Hola! ¿En qué puedo ayudarte?', time: '09:00', sent: true },
    { id: 2, text: 'Buenos días, quería información sobre el producto', time: '09:05', sent: false },
    { id: 3, text: 'Claro, con gusto. ¿Qué necesitas saber?', time: '09:06', sent: true },
    { id: 4, text: selectedConversation.lastMessage, time: selectedConversation.time, sent: false },
  ] : [];

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.contactInfo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || conv.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageCircle size={14} />;
      case 'email': return <Mail size={14} />;
      case 'chatweb': return <MessageSquare size={14} />;
      default: return <MessageCircle size={14} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'whatsapp': return 'bg-green-500';
      case 'email': return 'bg-blue-500';
      case 'chatweb': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-2 border-b space-y-2">
          <div className="relative">
            <Search size={16} className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setFilterType('all')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filterType === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('whatsapp')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filterType === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setFilterType('email')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filterType === 'email' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setFilterType('chatweb')}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                filterType === 'chatweb' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chat
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full px-2 py-2 border-b hover:bg-gray-50 transition-colors text-left ${
                selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <div className={`w-9 h-9 rounded-full ${getTypeColor(conv.type)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                  {conv.contact.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                      <p className="font-medium text-xs text-gray-900 truncate">{conv.contact}</p>
                      <span className={`${getTypeColor(conv.type)} rounded-full p-0.5 flex-shrink-0`}>
                        {getTypeIcon(conv.type)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-1">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className={`ml-1 flex-shrink-0 w-4 h-4 ${getTypeColor(conv.type)} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedConversation ? (
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="px-4 py-2 bg-white border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${getTypeColor(selectedConversation.type)} flex items-center justify-center text-white font-semibold`}>
                  {selectedConversation.contact.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-gray-900">{selectedConversation.contact}</p>
                    <span className={`${getTypeColor(selectedConversation.type)} text-white rounded-full px-2 py-0.5 text-xs flex items-center gap-1`}>
                      {getTypeIcon(selectedConversation.type)}
                      {selectedConversation.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{selectedConversation.contactInfo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowClientInfo(!showClientInfo)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {showClientInfo ? 'Ocultar' : 'Mostrar'} Info
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {conversationMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md px-3 py-2 rounded-lg ${
                    msg.sent
                      ? `${getTypeColor(selectedConversation.type)} text-white`
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sent ? 'opacity-75' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white border-t">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Smile size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className={`p-2 ${getTypeColor(selectedConversation.type)} hover:opacity-90 rounded-full transition-colors`}
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {showClientInfo && (
            <div className="w-72 bg-white border-l flex flex-col overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Información del Cliente</h3>
                  <button onClick={() => setShowClientInfo(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
                <div className="flex flex-col items-center text-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${getTypeColor(selectedConversation.type)} flex items-center justify-center text-white font-bold text-xl mb-2`}>
                    {clientInfo.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-gray-900">{clientInfo.name}</p>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Mail size={14} />
                    <span className="text-xs font-medium">Email</span>
                  </div>
                  <p className="text-sm text-gray-900 ml-6">{clientInfo.email || 'No disponible'}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Phone size={14} />
                    <span className="text-xs font-medium">Teléfono</span>
                  </div>
                  <p className="text-sm text-gray-900 ml-6">{clientInfo.phone || 'No disponible'}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin size={14} />
                    <span className="text-xs font-medium">Ubicación</span>
                  </div>
                  <p className="text-sm text-gray-900 ml-6">{clientInfo.location}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Tag size={14} />
                    <span className="text-xs font-medium">Etiquetas</span>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-6">
                    {clientInfo.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <User size={14} />
                    <span className="text-xs font-medium">Último contacto</span>
                  </div>
                  <p className="text-sm text-gray-900 ml-6">{clientInfo.lastContact}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Selecciona una conversación para comenzar</p>
          </div>
        </div>
      )}
    </div>
  );
}
