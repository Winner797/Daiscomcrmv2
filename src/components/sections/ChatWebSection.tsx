import React, { useState } from 'react';
<<<<<<< HEAD
import { MessageSquare, Search, Filter, Plus, Clock, User, MapPin, Loader2 } from 'lucide-react';
import { useChatWebThreads, useChatWebActions } from '../../hooks/useChatWeb';

export default function ChatWebSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [selectedTab, setSelectedTab] = useState<'visitors' | 'conversations'>('visitors');

  const { threads, loading, error, refetch } = useChatWebThreads();
  const { closeThread, assignAgent } = useChatWebActions();

  const filteredThreads = threads.filter(thread => {
    const matchesSearch =
      thread.visitor?.visitor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.visitor?.visitor_email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || thread.thread_status === filter;
=======
import { MessageSquare, Search, Filter, Plus, Clock, User, MapPin } from 'lucide-react';

interface Visitor {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  page_url: string;
  messages: number;
  duration: number;
  country: string;
}

export default function ChatWebSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedTab, setSelectedTab] = useState<'visitors' | 'conversations'>('visitors');

  const mockVisitors: Visitor[] = [
    {
      id: 1,
      name: 'Juan González',
      email: 'juan@example.com',
      status: 'active',
      page_url: '/productos/laptop',
      messages: 5,
      duration: 12,
      country: 'España'
    },
    {
      id: 2,
      name: 'María Pérez',
      email: 'maria@example.com',
      status: 'active',
      page_url: '/precios',
      messages: 3,
      duration: 8,
      country: 'España'
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      status: 'inactive',
      page_url: '/contacto',
      messages: 1,
      duration: 2,
      country: 'España'
    }
  ];

  const filteredVisitors = mockVisitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || visitor.status === filter;
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    return matchesSearch && matchesFilter;
  });

  return (
<<<<<<< HEAD
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white">
      <div className="px-4 py-2 border-b bg-white flex items-center gap-4">
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedTab('visitors')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === 'visitors'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Visitantes
          </button>
          <button
            onClick={() => setSelectedTab('conversations')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === 'conversations'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Conversaciones
          </button>
        </div>

        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filter === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Abiertos
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filter === 'closed' ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cerrados
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedTab === 'visitors' && (
          <div className="h-full">{loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-blue-600" size={32} />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={refetch}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reintentar
                </button>
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No hay conversaciones disponibles</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Visitante</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Página</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Canal</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Fecha</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Prioridad</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Estado</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredThreads.map((thread) => (
                      <tr key={thread.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {thread.visitor?.visitor_name || 'Anónimo'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {thread.visitor?.visitor_email || 'Sin email'}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600 max-w-xs truncate">
                          {thread.visitor?.page_url || '-'}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">{thread.channel}</td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {new Date(thread.date_add).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            thread.priority === 'high' ? 'bg-red-100 text-red-700' :
                            thread.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {thread.priority}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            thread.thread_status === 'open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              thread.thread_status === 'open' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            {thread.thread_status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                            Ver Chat
=======
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chat Web</h1>
        <p className="text-gray-600 mt-2">Gestiona las conversaciones en vivo con tus visitantes</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setSelectedTab('visitors')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                selectedTab === 'visitors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="inline mr-2" size={18} />
              Visitantes
            </button>
            <button
              onClick={() => setSelectedTab('conversations')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                selectedTab === 'conversations'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="inline mr-2" size={18} />
              Conversaciones
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar visitantes..."
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
              Nuevo
            </button>
          </div>

          {selectedTab === 'visitors' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Activos
                </button>
                <button
                  onClick={() => setFilter('inactive')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === 'inactive' ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inactivos
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Visitante</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Página</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Mensajes</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Duración</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">País</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Estado</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredVisitors.map((visitor) => (
                      <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{visitor.name}</p>
                            <p className="text-xs text-gray-500">{visitor.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{visitor.page_url}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{visitor.messages}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {visitor.duration}m
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {visitor.country}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            visitor.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${visitor.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            {visitor.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Abrir Chat
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
<<<<<<< HEAD
            )}
          </div>
        )}

        {selectedTab === 'conversations' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No hay conversaciones pendientes</p>
            </div>
          </div>
        )}
=======
            </div>
          )}

          {selectedTab === 'conversations' && (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No hay conversaciones pendientes</p>
            </div>
          )}
        </div>
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
      </div>
    </div>
  );
}
