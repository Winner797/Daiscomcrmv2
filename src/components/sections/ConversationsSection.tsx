import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, MessageSquare, Search, Send, Phone, MoreVertical, Paperclip, Smile, User, Settings as SettingsIcon, Plus, Filter, ChevronDown, CheckCheck } from 'lucide-react';

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const MessengerIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
  </svg>
);

interface Conversation {
  id: number;
  type: 'whatsapp' | 'messenger' | 'email';
  contact: string;
  contactInfo: string;
  lastMessage: string;
  time: string;
  unread: number;
  companyNumber: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
}

interface ConversationsSectionProps {
  filterType?: 'all' | 'whatsapp' | 'messenger' | 'email';
}

export default function ConversationsSection({ filterType: initialFilterType = 'all' }: ConversationsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [selectedCompanyNumber, setSelectedCompanyNumber] = useState('ventas-principal');

  const companyNumbers = [
    { id: 'ventas-principal', name: 'Ventas Principal', number: '+57 300 123 4567', status: 'active' },
    { id: 'soporte', name: 'Soporte Técnico', number: '+57 300 123 4568', status: 'active' },
    { id: 'facebook-principal', name: 'Facebook Principal', number: '@daiscom', status: 'active' },
  ];

  const mockConversations: Conversation[] = [
    { id: 1, type: 'whatsapp', contact: 'María González', contactInfo: '+57 350 720 5374', lastMessage: '¿Cuándo llega mi pedido?', time: '10:32 AM', unread: 2, companyNumber: 'Ventas Principal' },
    { id: 2, type: 'whatsapp', contact: 'Carlos Rodríguez', contactInfo: '+57 312 456 7890', lastMessage: 'Gracias por la información', time: '9:15 AM', unread: 0, companyNumber: 'Ventas Principal' },
    { id: 3, type: 'messenger', contact: 'Ana Martinez', contactInfo: '+57 320 987 6543', lastMessage: '¿Tienen disponibilidad?', time: '10:15 AM', unread: 1, companyNumber: 'Facebook Principal' },
    { id: 4, type: 'whatsapp', contact: 'Pedro Ramírez', contactInfo: '+57 301 234 5678', lastMessage: 'Perfecto, muchas gracias', time: '8:45 AM', unread: 0, companyNumber: 'Soporte Técnico' },
    { id: 5, type: 'email', contact: 'Laura Fernández', contactInfo: 'laura@empresa.com', lastMessage: 'Consulta sobre facturación', time: '10:00 AM', unread: 3, companyNumber: 'Ventas Principal' },
    { id: 6, type: 'messenger', contact: 'Roberto Silva', contactInfo: 'Roberto Silva', lastMessage: '¿Cuál es el precio?', time: '9:30 AM', unread: 1, companyNumber: 'Facebook Principal' },
    { id: 7, type: 'email', contact: 'Sofia Morales', contactInfo: 'sofia@tech.com', lastMessage: 'Solicitud de cotización', time: '8:20 AM', unread: 0, companyNumber: 'Ventas Principal' },
    { id: 8, type: 'whatsapp', contact: 'Juan López', contactInfo: '+57 315 678 9012', lastMessage: '¿Está disponible mañana?', time: 'Ayer', unread: 0, companyNumber: 'Ventas Principal' },
    { id: 9, type: 'messenger', contact: 'Carmen Ruiz', contactInfo: 'Carmen Ruiz', lastMessage: 'Ok, entendido', time: 'Ayer', unread: 0, companyNumber: 'Facebook Principal' },
    { id: 10, type: 'email', contact: 'Diego Torres', contactInfo: 'diego@startup.io', lastMessage: 'Propuesta comercial', time: 'Ayer', unread: 1, companyNumber: 'Ventas Principal' },
  ];

  const conversationMessages: Message[] = selectedConversation ? [
    { id: 1, text: '¡Hola! ¿Cómo estás?', time: '10:30 AM', sent: false },
    { id: 2, text: '¡Hola! Todo bien, gracias por preguntar. ¿En qué te puedo ayudar?', time: '10:32 AM', sent: true },
  ] : [];

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = conv.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.contactInfo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = initialFilterType === 'all' || conv.type === initialFilterType;
    return matchesSearch && matchesType;
  });

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const currentCompanyNumber = companyNumbers.find(cn => cn.id === selectedCompanyNumber);

  return (
    <div className="h-screen flex">
      <div className="w-80 bg-white border-r border-[var(--border-color)] flex flex-col">
        {initialFilterType === 'whatsapp' && (
          <div className="p-4 border-b border-[var(--border-color)]">
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500">NÚMERO ACTIVO</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <SettingsIcon size={16} className="text-[var(--primary-orange)]" />
                </button>
              </div>
              <select
                value={selectedCompanyNumber}
                onChange={(e) => setSelectedCompanyNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--primary-orange)] focus:border-[var(--primary-orange)]"
              >
                {companyNumbers.map((cn) => (
                  <option key={cn.id} value={cn.id}>
                    {cn.name} - {cn.number}
                  </option>
                ))}
              </select>
              {currentCompanyNumber && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{currentCompanyNumber.name}</p>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">
                        Activo
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{currentCompanyNumber.number}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-4 border-b border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Conversaciones</h2>
            <div className="flex gap-2">
              <button className="p-1.5 border border-[var(--primary-orange)] text-[var(--primary-orange)] rounded hover:bg-[var(--primary-orange-light)] transition-colors">
                <Filter size={16} />
              </button>
              <button className="p-1.5 bg-[var(--primary-orange)] text-white rounded hover:bg-[var(--primary-orange-hover)] transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[var(--primary-orange)] focus:border-[var(--primary-orange)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                selectedConversation?.id === conv.id ? 'bg-[var(--primary-orange-light)] border-l-4 border-l-[var(--primary-orange)]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                  conv.type === 'whatsapp' ? 'bg-green-500' :
                  conv.type === 'messenger' ? 'bg-blue-500' :
                  'bg-red-500'
                }`}>
                  {conv.type === 'whatsapp' ? (
                    <WhatsAppIcon size={24} />
                  ) : conv.type === 'messenger' ? (
                    <MessengerIcon size={24} />
                  ) : (
                    <Mail size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{conv.contact}</p>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{conv.contactInfo}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs font-semibold text-[var(--primary-orange)]">
                      📱 Línea: {conv.companyNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="ml-2 bg-[var(--primary-orange)] text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
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
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-6 py-4 bg-white border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                selectedConversation.type === 'whatsapp' ? 'bg-green-500' :
                selectedConversation.type === 'messenger' ? 'bg-blue-500' :
                'bg-red-500'
              }`}>
                {selectedConversation.type === 'whatsapp' ? (
                  <WhatsAppIcon size={24} />
                ) : selectedConversation.type === 'messenger' ? (
                  <MessengerIcon size={24} />
                ) : (
                  <Mail size={24} />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedConversation.contact}</p>
                <p className="text-sm text-[var(--primary-orange)] font-medium">{selectedConversation.contactInfo}</p>
                <p className="text-xs text-[var(--primary-orange)]">📱 Línea: {selectedConversation.companyNumber}</p>
                <p className="text-xs text-gray-500">En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Phone size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#f0f2f5]">
            <div className="space-y-2">
              {conversationMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md px-4 py-2 rounded-lg ${
                    msg.sent
                      ? 'bg-[var(--message-sent)] text-gray-900'
                      : 'bg-white text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      {msg.sent && (
                        <CheckCheck size={14} className="text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-white border-t border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Paperclip size={20} className="text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-[var(--primary-orange)] focus:border-[var(--primary-orange)]"
              />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Smile size={20} className="text-gray-600" />
              </button>
              <button
                onClick={handleSendMessage}
                className="p-3 bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] rounded-full transition-colors"
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Bienvenido a Daiscom</h3>
            <p className="text-gray-600">Selecciona una conversación para comenzar a chatear</p>
          </div>
        </div>
      )}
    </div>
  );
}
