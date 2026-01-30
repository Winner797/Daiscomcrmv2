import React from 'react';
import { MessageSquare, Mail, Users, TrendingUp, MessageCircle } from 'lucide-react';

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
  section?: string;
}

interface DashboardHomeProps {
  onNavigate: (section: string) => void;
}

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const stats: StatCard[] = [
    {
      label: 'WhatsApp',
      value: '24',
      change: '+3 hoy',
      icon: <MessageCircle size={24} />,
      color: 'from-green-500 to-green-600',
      section: 'whatsapp'
    },
    {
      label: 'Emails',
      value: '48',
      change: '+5 esta hora',
      icon: <Mail size={24} />,
      color: 'from-blue-500 to-blue-600',
      section: 'email'
    },
    {
      label: 'Chat Web',
      value: '12',
      change: '+2 hoy',
      icon: <MessageSquare size={24} />,
      color: 'from-orange-500 to-orange-600',
      section: 'chatweb'
    },
    {
      label: 'Total Conversaciones',
      value: '84',
      change: '+10 hoy',
      icon: <TrendingUp size={24} />,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido al panel de control CRM</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => stat.section && onNavigate(stat.section)}
            className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100 ${stat.section ? 'cursor-pointer hover:scale-105' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Nueva conversación en chat</p>
                  <p className="text-xs text-gray-500 mt-1">Hace 5 minutos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Estado de Equipo</h2>
          <div className="space-y-3">
            {['Juan García', 'María López', 'Carlos Ruiz'].map((name, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{name}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
