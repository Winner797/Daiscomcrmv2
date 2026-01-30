import React, { useState } from 'react';
import { Mail, Search, Filter, Plus, Archive, Trash2, Flag, Star } from 'lucide-react';
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
}

export default function EmailSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed' | 'archived'>('open');
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const mockEmails: EmailThread[] = [
    {
      id: 1,
      from_email: 'cliente@example.com',
      from_name: 'José María García',
      subject: 'Consulta sobre producto',
      preview: 'Quisiera saber más sobre las características del producto...',
      status: 'open',
      priority: 'high',
      unread_count: 2,
      last_message_date: 'Hace 2 horas',
      assigned_to: 'Juan López'
    },
    {
      id: 2,
      from_email: 'info@empresa.com',
      from_name: 'Empresa XYZ',
      subject: 'Propuesta de colaboración',
      preview: 'Nos gustaría explorar oportunidades de trabajo conjunto...',
      status: 'open',
      priority: 'normal',
      unread_count: 1,
      last_message_date: 'Hace 5 horas',
      assigned_to: 'María López'
    },
    {
      id: 3,
      from_email: 'support@vendor.com',
      from_name: 'Soporte Vendor',
      subject: 'Confirmación de pedido #1234',
      preview: 'Su pedido ha sido confirmado y será enviado pronto...',
      status: 'closed',
      priority: 'low',
      unread_count: 0,
      last_message_date: 'Ayer',
      assigned_to: 'Carlos Ruiz'
    }
  ];

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.from_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || email.status === filter;
    return matchesSearch && matchesFilter;
  });
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
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
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

        <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
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
      </div>    </div>
  );
}
