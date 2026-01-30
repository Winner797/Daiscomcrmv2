import React, { useState } from 'react';
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
    const matchesFilter = filter === 'all' || visitor.status === filter;    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
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
                            Abrir Chat                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'conversations' && (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No hay conversaciones pendientes</p>
            </div>
          )}
        </div>      </div>
    </div>
  );
}
