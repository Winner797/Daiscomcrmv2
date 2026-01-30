import React from 'react';
import { Plus, Phone, MessageSquare, Settings as SettingsIcon, CheckCircle, XCircle } from 'lucide-react';

interface CompanyNumber {
  id: number;
  name: string;
  number: string;
  type: 'whatsapp' | 'voice' | 'messenger';
  status: 'active' | 'inactive' | 'maintenance';
  assignedAgents: number;
  activeChats: number;
  dailyLimit: number;
  usedToday: number;
}

export default function CompanyNumbersSection() {
  const numbers: CompanyNumber[] = [
    { id: 1, name: 'Ventas Principal', number: '+57 300 123 4567', type: 'whatsapp', status: 'active', assignedAgents: 8, activeChats: 23, dailyLimit: 1000, usedToday: 456 },
    { id: 2, name: 'Soporte Técnico', number: '+57 300 123 4568', type: 'whatsapp', status: 'active', assignedAgents: 5, activeChats: 12, dailyLimit: 500, usedToday: 234 },
    { id: 3, name: 'Facebook Principal', number: '@daiscom', type: 'messenger', status: 'active', assignedAgents: 4, activeChats: 8, dailyLimit: 800, usedToday: 123 },
    { id: 4, name: 'Marketing', number: '+57 300 123 4569', type: 'whatsapp', status: 'inactive', assignedAgents: 3, activeChats: 0, dailyLimit: 300, usedToday: 0 },
    { id: 5, name: 'Administración', number: '+57 300 123 4570', type: 'voice', status: 'maintenance', assignedAgents: 2, activeChats: 0, dailyLimit: 200, usedToday: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'maintenance': return 'Mantenimiento';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare size={24} className="text-green-600" />;
      case 'voice': return <Phone size={24} className="text-blue-600" />;
      case 'messenger': return <MessageSquare size={24} className="text-purple-600" />;
      default: return <Phone size={24} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'whatsapp': return 'bg-green-500';
      case 'voice': return 'bg-blue-500';
      case 'messenger': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Números de Empresa</h1>
              <p className="text-sm text-gray-600 mt-1">Gestiona los números y canales de comunicación</p>
            </div>
            <button className="px-4 py-2 bg-[var(--primary-orange)] text-white rounded-lg hover:bg-[var(--primary-orange-hover)] transition-colors flex items-center gap-2">
              <Plus size={20} />
              Agregar Número
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {numbers.map((number) => (
            <div key={number.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-2 ${getTypeColor(number.type)}`}></div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${getTypeColor(number.type)} rounded-lg flex items-center justify-center text-white`}>
                      {getTypeIcon(number.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{number.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{number.number}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(number.status)}`}>
                        {getStatusText(number.status)}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <SettingsIcon size={18} className="text-gray-600" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Agentes Asignados</span>
                    <span className="font-semibold text-gray-900">{number.assignedAgents}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Chats Activos</span>
                    <span className="font-semibold text-[var(--primary-orange)]">{number.activeChats}</span>
                  </div>

                  <div className="py-2 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Uso Diario</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {number.usedToday} / {number.dailyLimit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${getTypeColor(number.type)} h-2 rounded-full transition-all`}
                        style={{ width: `${(number.usedToday / number.dailyLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {number.status === 'active' ? (
                    <>
                      <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <XCircle size={16} />
                        Desactivar
                      </button>
                      <button className="flex-1 px-4 py-2 bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] text-white rounded-lg transition-colors">
                        Ver Estadísticas
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      <CheckCircle size={16} />
                      Activar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
