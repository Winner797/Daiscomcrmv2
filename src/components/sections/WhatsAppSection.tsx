import React, { useState } from 'react';
import { MessageCircle, Search, Send, Phone, MoreVertical, Paperclip, Smile, X, Check, CheckCheck } from 'lucide-react';

interface WhatsAppMessage {
  id: number;
  contact: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'active' | 'pending' | 'closed';
  avatar?: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  messageStatus: 'sent' | 'delivered' | 'read';
}

export default function WhatsAppSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<WhatsAppMessage | null>(null);
  const [messageText, setMessageText] = useState('');
  const [activeNumber, setActiveNumber] = useState('+34 600 123 456');
  const [messages, setMessages] = useState<Message[]>([]);

  const mockMessages: WhatsAppMessage[] = [
    { id: 1, contact: 'Carlos Rodríguez', phone: '+34 612 345 678', lastMessage: 'Perfecto, gracias por la información', time: '10:30', unread: 0, status: 'active' },
    { id: 2, contact: 'Ana Martínez', phone: '+34 687 123 456', lastMessage: '¿Cuándo podemos reunirnos?', time: '10:15', unread: 2, status: 'active' },
    { id: 3, contact: 'José García', phone: '+34 654 987 321', lastMessage: 'Te envío el documento ahora', time: '09:45', unread: 1, status: 'pending' },
    { id: 4, contact: 'Laura Fernández', phone: '+34 699 111 222', lastMessage: 'Ok, entendido', time: '09:20', unread: 0, status: 'active' },
    { id: 5, contact: 'Miguel Sánchez', phone: '+34 677 333 444', lastMessage: 'Necesito más información', time: '08:50', unread: 3, status: 'pending' },
    { id: 6, contact: 'Isabel López', phone: '+34 644 555 666', lastMessage: 'Muchas gracias', time: '08:30', unread: 0, status: 'closed' },
    { id: 7, contact: 'Pedro Ruiz', phone: '+34 633 777 888', lastMessage: '¿Está disponible el producto?', time: 'Ayer', unread: 1, status: 'active' },
    { id: 8, contact: 'Carmen Jiménez', phone: '+34 622 999 000', lastMessage: 'Me parece bien', time: 'Ayer', unread: 0, status: 'active' },
    { id: 9, contact: 'Francisco Moreno', phone: '+34 611 222 333', lastMessage: 'Hola, buenos días', time: 'Ayer', unread: 0, status: 'pending' },
    { id: 10, contact: 'Lucía Navarro', phone: '+34 699 444 555', lastMessage: 'Perfecto, nos vemos', time: 'Ayer', unread: 0, status: 'closed' },
  ];

  const conversationMessages: Message[] = selectedContact ? [
    { id: 1, text: '¡Hola! ¿En qué puedo ayudarte?', time: '09:00', sent: true, messageStatus: 'read' },
    { id: 2, text: 'Buenos días, quería información sobre el producto', time: '09:05', sent: false, messageStatus: 'delivered' },
    { id: 3, text: 'Claro, con gusto. ¿Qué necesitas saber?', time: '09:06', sent: true, messageStatus: 'read' },
    { id: 4, text: selectedContact.lastMessage, time: selectedContact.time, sent: false, messageStatus: 'delivered' },
    ...messages
  ] : [];

  const filteredMessages = mockMessages.filter(msg =>
    msg.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.phone.includes(searchTerm)
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedContact) {
      const newMessage: Message = {
        id: Date.now(),
        text: messageText,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        sent: true,
        messageStatus: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessageText('');

      setTimeout(() => {
        setMessages(msgs => msgs.map(msg =>
          msg.id === newMessage.id ? { ...msg, messageStatus: 'delivered' } : msg
        ));
      }, 1000);

      setTimeout(() => {
        setMessages(msgs => msgs.map(msg =>
          msg.id === newMessage.id ? { ...msg, messageStatus: 'read' } : msg
        ));
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Número activo:</span>
          <select
            value={activeNumber}
            onChange={(e) => setActiveNumber(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="+34 600 123 456">+34 600 123 456</option>
            <option value="+34 600 654 321">+34 600 654 321</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-2 border-b">
            <div className="relative">
              <Search size={16} className="absolute left-2 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedContact(msg)}
                className={`w-full px-3 py-2 border-b hover:bg-gray-50 transition-colors text-left ${
                  selectedContact?.id === msg.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {msg.contact.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-medium text-sm text-gray-900 truncate">{msg.contact}</p>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-1">{msg.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 truncate">{msg.lastMessage}</p>
                      {msg.unread > 0 && (
                        <span className="ml-1 flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedContact ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="px-4 py-2 bg-white border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                  {selectedContact.contact.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{selectedContact.contact}</p>
                  <p className="text-xs text-gray-500">{selectedContact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className={`text-xs ${msg.sent ? 'text-green-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </span>
                      {msg.sent && (
                        msg.messageStatus === 'sent' ? (
                          <Check size={14} className="text-green-100" />
                        ) : msg.messageStatus === 'delivered' ? (
                          <CheckCheck size={14} className="text-green-100" />
                        ) : (
                          <CheckCheck size={14} className="text-blue-400" />
                        )
                      )}
                    </div>
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
                  className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
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
    </div>
  );
}
