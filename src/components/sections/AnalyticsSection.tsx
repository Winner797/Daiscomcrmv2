import React from 'react';
import { TrendingUp, TrendingDown, MessageSquare, Users, Clock, CheckCircle } from 'lucide-react';

export default function AnalyticsSection() {
  const stats = [
    { label: 'Conversaciones Totales', value: '1,234', change: '+12%', trend: 'up', icon: MessageSquare, color: 'bg-blue-500' },
    { label: 'Tiempo Promedio de Respuesta', value: '2.5 min', change: '-8%', trend: 'down', icon: Clock, color: 'bg-green-500' },
    { label: 'Tasa de Resolución', value: '94%', change: '+5%', trend: 'up', icon: CheckCircle, color: 'bg-purple-500' },
    { label: 'Clientes Atendidos', value: '856', change: '+18%', trend: 'up', icon: Users, color: 'bg-orange-500' },
  ];

  const channelStats = [
    { channel: 'WhatsApp', conversations: 678, percentage: 55, color: 'bg-green-500' },
    { channel: 'Email', conversations: 345, percentage: 28, color: 'bg-blue-500' },
    { channel: 'Messenger', conversations: 211, percentage: 17, color: 'bg-purple-500' },
  ];

  const topAgents = [
    { name: 'Ana Martínez', conversations: 145, satisfaction: 98, avgTime: '1.5 min' },
    { name: 'Carlos Rodríguez', conversations: 132, satisfaction: 96, avgTime: '2.1 min' },
    { name: 'María González', conversations: 128, satisfaction: 97, avgTime: '1.8 min' },
    { name: 'Pedro Ruiz', conversations: 115, satisfaction: 95, avgTime: '2.3 min' },
    { name: 'Laura Fernández', conversations: 98, satisfaction: 94, avgTime: '2.5 min' },
  ];

  const hourlyData = [
    { hour: '9:00', messages: 45 },
    { hour: '10:00', messages: 78 },
    { hour: '11:00', messages: 92 },
    { hour: '12:00', messages: 65 },
    { hour: '13:00', messages: 48 },
    { hour: '14:00', messages: 85 },
    { hour: '15:00', messages: 110 },
    { hour: '16:00', messages: 95 },
    { hour: '17:00', messages: 72 },
    { hour: '18:00', messages: 55 },
  ];

  const maxMessages = Math.max(...hourlyData.map(d => d.messages));

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analíticas</h1>
          <p className="text-sm text-gray-600 mt-1">Panel de métricas y estadísticas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Conversaciones por Canal</h2>
            <div className="space-y-4">
              {channelStats.map((channel, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{channel.channel}</span>
                    <span className="text-sm font-bold text-gray-900">{channel.conversations}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${channel.color} h-2 rounded-full transition-all`}
                      style={{ width: `${channel.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Agentes</h2>
            <div className="space-y-3">
              {topAgents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-orange)] to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{agent.name}</p>
                      <p className="text-xs text-gray-600">{agent.conversations} conversaciones</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{agent.satisfaction}%</p>
                    <p className="text-xs text-gray-600">{agent.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad por Hora</h2>
          <div className="flex items-end justify-between gap-2 h-64">
            {hourlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-48">
                  <div
                    className="w-full bg-[var(--primary-orange)] rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${(data.messages / maxMessages) * 100}%` }}
                    title={`${data.messages} mensajes`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{data.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
