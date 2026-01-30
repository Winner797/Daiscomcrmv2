import React from 'react';
import { Users, Plus, MessageSquare, User } from 'lucide-react';

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  activeConversations: number;
  type: 'whatsapp' | 'internal';
  color: string;
}

export default function GroupsSection() {
  const groups: Group[] = [
    { id: 1, name: 'Ventas Principal', description: 'Equipo de ventas y atención al cliente', members: 8, activeConversations: 23, type: 'whatsapp', color: 'bg-blue-500' },
    { id: 2, name: 'Soporte Técnico', description: 'Equipo de soporte y ayuda técnica', members: 5, activeConversations: 12, type: 'whatsapp', color: 'bg-green-500' },
    { id: 3, name: 'Marketing', description: 'Equipo de marketing y comunicaciones', members: 6, activeConversations: 8, type: 'internal', color: 'bg-purple-500' },
    { id: 4, name: 'Administración', description: 'Equipo administrativo y gerencia', members: 4, activeConversations: 5, type: 'internal', color: 'bg-orange-500' },
    { id: 5, name: 'Desarrollo', description: 'Equipo de desarrollo de producto', members: 7, activeConversations: 3, type: 'internal', color: 'bg-indigo-500' },
    { id: 6, name: 'Clientes VIP', description: 'Atención especializada para clientes premium', members: 3, activeConversations: 15, type: 'whatsapp', color: 'bg-yellow-500' },
  ];

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Grupos</h1>
              <p className="text-sm text-gray-600 mt-1">{groups.length} grupos activos</p>
            </div>
            <button className="px-4 py-2 bg-[var(--primary-orange)] text-white rounded-lg hover:bg-[var(--primary-orange-hover)] transition-colors flex items-center gap-2">
              <Plus size={20} />
              Nuevo Grupo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 ${group.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                    <Users size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{group.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      group.type === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {group.type === 'whatsapp' ? 'WhatsApp' : 'Interno'}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{group.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{group.members} miembros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-[var(--primary-orange)]" />
                    <span className="text-sm font-medium text-[var(--primary-orange)]">{group.activeConversations} chats</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 border border-[var(--primary-orange)] text-[var(--primary-orange)] rounded-lg hover:bg-[var(--primary-orange-light)] transition-colors font-medium">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
