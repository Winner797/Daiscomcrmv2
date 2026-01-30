import React from 'react';
import { Bot, Plus, Play, Pause, Settings as SettingsIcon, MessageSquare, Clock, Zap } from 'lucide-react';

interface Automation {
  id: number;
  name: string;
  description: string;
  trigger: string;
  actions: number;
  status: 'active' | 'paused';
  executions: number;
  successRate: number;
}

export default function AutomationSection() {
  const automations: Automation[] = [
    { id: 1, name: 'Respuesta Automática Fuera de Horario', description: 'Envía mensaje automático cuando se recibe un mensaje fuera del horario laboral', trigger: 'Mensaje recibido fuera de horario', actions: 2, status: 'active', executions: 234, successRate: 98 },
    { id: 2, name: 'Asignación Inteligente de Conversaciones', description: 'Asigna conversaciones automáticamente al agente disponible', trigger: 'Nueva conversación', actions: 3, status: 'active', executions: 456, successRate: 95 },
    { id: 3, name: 'Recordatorio de Seguimiento', description: 'Envía recordatorio a agentes sobre conversaciones pendientes', trigger: 'Conversación sin respuesta por 24h', actions: 2, status: 'active', executions: 89, successRate: 100 },
    { id: 4, name: 'Encuesta de Satisfacción', description: 'Envía encuesta automática al cerrar una conversación', trigger: 'Conversación cerrada', actions: 1, status: 'paused', executions: 178, successRate: 92 },
    { id: 5, name: 'Etiquetado Automático', description: 'Etiqueta conversaciones según palabras clave detectadas', trigger: 'Mensaje con palabras clave', actions: 1, status: 'active', executions: 567, successRate: 96 },
    { id: 6, name: 'Escalamiento VIP', description: 'Prioriza y escala conversaciones de clientes VIP', trigger: 'Mensaje de cliente VIP', actions: 4, status: 'active', executions: 123, successRate: 99 },
  ];

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Automatización</h1>
              <p className="text-sm text-gray-600 mt-1">Gestiona tus flujos de trabajo automatizados</p>
            </div>
            <button className="px-4 py-2 bg-[var(--primary-orange)] text-white rounded-lg hover:bg-[var(--primary-orange-hover)] transition-colors flex items-center gap-2">
              <Plus size={20} />
              Nueva Automatización
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Automatizaciones Activas</p>
                  <p className="text-2xl font-bold text-gray-900">{automations.filter(a => a.status === 'active').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Play size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Ejecuciones</p>
                  <p className="text-2xl font-bold text-gray-900">{automations.reduce((sum, a) => sum + a.executions, 0)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tasa de Éxito Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(automations.reduce((sum, a) => sum + a.successRate, 0) / automations.length)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {automations.map((automation) => (
            <div key={automation.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    automation.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Bot size={24} className={automation.status === 'active' ? 'text-green-600' : 'text-gray-600'} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{automation.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        automation.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {automation.status === 'active' ? 'Activa' : 'Pausada'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{automation.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-gray-700">Trigger: {automation.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-gray-400" />
                        <span className="text-gray-700">{automation.actions} acciones</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Configuración">
                    <SettingsIcon size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title={automation.status === 'active' ? 'Pausar' : 'Activar'}>
                    {automation.status === 'active' ? (
                      <Pause size={18} className="text-[var(--primary-orange)]" />
                    ) : (
                      <Play size={18} className="text-green-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-8 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Ejecuciones</p>
                  <p className="text-lg font-bold text-gray-900">{automation.executions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tasa de Éxito</p>
                  <p className="text-lg font-bold text-green-600">{automation.successRate}%</p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${automation.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
