import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Send, Phone, MoreVertical, Paperclip, Smile, X, Check, CheckCheck, RefreshCw } from 'lucide-react';
import { whatsappService } from '../../services/whatsappService';
import type { WhatsAppThread, WhatsAppMessage as WhatsAppMessageType } from '../../types/whatsapp';

interface ThreadWithLastMessage extends WhatsAppThread {
  lastMessage?: string;
  lastMessageTime?: string;
}

export default function WhatsAppSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThread, setSelectedThread] = useState<ThreadWithLastMessage | null>(null);
  const [messageText, setMessageText] = useState('');
  const [activeNumber, setActiveNumber] = useState('');
  const [threads, setThreads] = useState<ThreadWithLastMessage[]>([]);
  const [messages, setMessages] = useState<WhatsAppMessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idShop = 1;

  useEffect(() => {
    loadThreads();
    loadConfiguration();
  }, []);

  useEffect(() => {
    if (selectedThread) {
      loadMessages(selectedThread.id);
    }
  }, [selectedThread]);

  const loadThreads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await whatsappService.getThreads(idShop);
      setThreads(data);
    } catch (err) {
      setError('Error al cargar conversaciones');
      console.error('Error loading threads:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (threadId: number) => {
    try {
      const data = await whatsappService.getMessages(threadId);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const loadConfiguration = async () => {
    try {
      const configs = await whatsappService.getConfiguration(idShop);
      if (configs && configs.length > 0) {
        setActiveNumber(configs[0].number_whatsapp || '');
      }
    } catch (err) {
      console.error('Error loading configuration:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedThread || sending) return;

    try {
      setSending(true);
      await whatsappService.sendMessage({
        id_thread: selectedThread.id,
        message_text: messageText,
        recipient_id: selectedThread.contact_recipient_id,
        id_shop: idShop,
      });
      setMessageText('');
      await loadMessages(selectedThread.id);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    }
  };

  const getUnreadCount = (thread: ThreadWithLastMessage) => {
    return thread.unread_count || 0;
  };

  const filteredThreads = threads.filter(thread =>
    thread.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.contact_recipient_id.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Número activo:</span>
          <span className="text-sm font-medium">{activeNumber || 'Cargando...'}</span>
        </div>
        <button
          onClick={loadThreads}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          title="Actualizar conversaciones"
        >
          <RefreshCw size={16} className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw size={24} className="text-gray-400 animate-spin" />
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-gray-500">No hay conversaciones</p>
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full px-3 py-2 border-b hover:bg-gray-50 transition-colors text-left ${
                    selectedThread?.id === thread.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {thread.contact_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="font-medium text-sm text-gray-900 truncate">{thread.contact_name}</p>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-1">
                          {thread.lastMessageTime || formatTime(thread.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 truncate">
                          {thread.lastMessage || 'Nueva conversación'}
                        </p>
                        {getUnreadCount(thread) > 0 && (
                          <span className="ml-1 flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {getUnreadCount(thread)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {selectedThread ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="px-4 py-2 bg-white border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                  {selectedThread.contact_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{selectedThread.contact_name}</p>
                  <p className="text-xs text-gray-500">{selectedThread.contact_recipient_id}</p>
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
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-gray-500">No hay mensajes en esta conversación</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isOutgoing = msg.direction === 'outgoing';
                  return (
                    <div key={msg.id} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md px-3 py-2 rounded-lg ${
                        isOutgoing
                          ? 'bg-green-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}>
                        {msg.message_type === 'text' && (
                          <p className="text-sm">{msg.message_text}</p>
                        )}
                        {msg.message_type === 'image' && msg.media_path && (
                          <div>
                            <img src={msg.media_path} alt="Imagen" className="rounded max-w-xs" />
                            {msg.message_text && <p className="text-sm mt-2">{msg.message_text}</p>}
                          </div>
                        )}
                        {msg.message_type === 'location' && (
                          <div className="text-sm">
                            <p className="font-medium">{msg.location_name || 'Ubicación'}</p>
                            {msg.address && <p className="text-xs mt-1">{msg.address}</p>}
                          </div>
                        )}
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className={`text-xs ${isOutgoing ? 'text-green-100' : 'text-gray-500'}`}>
                            {formatTime(msg.created_at)}
                          </span>
                          {isOutgoing && (
                            msg.status === 'sent' ? (
                              <Check size={14} className="text-green-100" />
                            ) : msg.status === 'delivered' ? (
                              <CheckCheck size={14} className="text-green-100" />
                            ) : msg.status === 'read' ? (
                              <CheckCheck size={14} className="text-blue-400" />
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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
                  onKeyPress={(e) => e.key === 'Enter' && !sending && handleSendMessage()}
                  disabled={sending}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sending || !messageText.trim()}
                  className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
