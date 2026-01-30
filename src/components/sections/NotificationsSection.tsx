import React from 'react';
import { Bell, MessageSquare, Mail, Phone, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: number;
  type: 'whatsapp' | 'email' | 'system' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsSection() {
  const notifications: Notification[] = [
    { id: 1, type: 'whatsapp', title: 'Nuevo mensaje de WhatsApp', message: 'María González te ha enviado un mensaje', time: 'Hace 5 min', read: false },
    { id: 2, type: 'email', title: 'Nuevo correo recibido', message: 'Carlos Rodríguez: Consulta sobre facturación', time: 'Hace 15 min', read: false },
    { id: 3, type: 'success', title: 'Mensaje enviado exitosamente', message: 'Tu mensaje a Ana Martínez fue entregado', time: 'Hace 1 hora', read: true },
    { id: 4, type: 'system', title: 'Actualización del sistema', message: 'Nueva versión disponible 2.5.0', time: 'Hace 2 horas', read: true },
    { id: 5, type: 'warning', title: 'Número inactivo', message: 'El número +57 300 123 4568 está temporalmente inactivo', time: 'Hace 3 horas', read: true },
    { id: 6, type: 'whatsapp', title: 'Conversación asignada', message: 'Se te ha asignado la conversación con Pedro Ruiz', time: 'Hace 5 horas', read: true },
    { id: 7, type: 'email', title: 'Respuesta automática enviada', message: 'Se envió respuesta automática a luis@empresa.com', time: 'Ayer', read: true },
    { id: 8, type: 'success', title: 'Ticket cerrado', message: 'El ticket #1234 fue cerrado exitosamente', time: 'Ayer', read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare size={20} className="text-green-600" />;
      case 'email': return <Mail size={20} className="text-blue-600" />;
      case 'success': return <CheckCircle size={20} className="text-green-600" />;
      case 'warning': return <AlertCircle size={20} className="text-[var(--primary-orange)]" />;
      case 'system': return <Info size={20} className="text-gray-600" />;
      default: return <Bell size={20} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
              <p className="text-sm text-gray-600 mt-1">
                Tienes {unreadCount} notificaciones sin leer
              </p>
            </div>
            <button className="px-4 py-2 text-sm bg-[var(--primary-orange)] text-white rounded-lg hover:bg-[var(--primary-orange-hover)] transition-colors">
              Marcar todas como leídas
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all ${
                  !notification.read
                    ? 'bg-[var(--primary-orange-light)] border-[var(--primary-orange)]'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[var(--primary-orange)] rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
