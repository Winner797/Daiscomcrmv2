import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, MessageSquare, Search, Send, Phone, MoreVertical, Paperclip, Smile, User, Settings as SettingsIcon, Plus, Filter, ChevronDown, CheckCheck } from 'lucide-react';

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
    { id: 1, type: 'whatsapp', contact: 'María González', contactInfo: '+57 350 720 5374', lastMessage: '¿Cuándo llega mi pedido?', time: '10:32 AM', unread: 0, companyNumber: 'Ventas Principal' },
    { id: 2, type: 'whatsapp', contact: 'Carlos Rodríguez', contactInfo: '+57 312 456 7890', lastMessage: 'Gracias por la información', time: '9:15 AM', unread: 0, companyNumber: 'Ventas Principal' },
    { id: 3, type: 'messenger', contact: 'Ana Martinez', contactInfo: '+57 320 987 6543', lastMessage: 'Ayer', time: 'Ayer', unread: 0, companyNumber: 'Facebook Principal' },
  ];

  const conversationMessages: Message[] = selectedConversation ? [
    { id: 1, text: '¡Hola! ¿Cómo estás?', time: '10:30 AM', sent: false },
    { id: 2, text: '¡Hola! Todo bien, gracias por preguntar. ¿En qué te puedo ayudar?', time: '10:32 AM', sent: true },
  ] : [];

  const filteredConversations = mockConversations.filter(conv =>
    conv.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contactInfo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <div className="w-10 h-10 bg-[var(--primary-orange)] rounded-full flex items-center justify-center">
                  <MessageSquare size={20} className="text-white" />
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
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {conv.type === 'messenger' ? (
                    <MessageCircle size={20} />
                  ) : (
                    <MessageSquare size={20} />
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
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
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
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {selectedConversation.contact.charAt(0)}
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
