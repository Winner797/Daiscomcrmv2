import React from 'react';
import { MessageSquare, Mail, Users, Bell, BookOpen, PieChart, Bot, Building, Cog } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
  </svg>
);

export default function Sidebar({ isOpen, onToggle, activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'conversations', label: 'Conversaciones', icon: MessageSquare, badge: '7' },
    { id: 'whatsapp', label: 'WhatsApp', customIcon: WhatsAppIcon, color: 'text-green-600' },
    { id: 'messenger', label: 'Messenger', customIcon: MessengerIcon, color: 'text-blue-600' },
    { id: 'email', label: 'Correo', icon: Mail, color: 'text-red-600' },
    { id: 'notifications', label: 'Notificaciones', icon: Bell, badge: '12' },
    { id: 'contacts', label: 'Contactos', icon: Users },
    { id: 'groups', label: 'Grupos', icon: Users },
    { id: 'templates', label: 'Plantillas', icon: BookOpen },
    { id: 'analytics', label: 'Analíticas', icon: PieChart },
    { id: 'automation', label: 'Automatización', icon: Bot },
    { id: 'company-numbers', label: 'Números Empresa', icon: Building },
    { id: 'settings', label: 'Configuración', icon: Cog },
  ];

  return (
    <aside className="w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] h-screen overflow-y-auto">
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const CustomIcon = item.customIcon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                      activeSection === item.id
                        ? 'bg-[var(--primary-orange-light)] text-[var(--primary-orange)]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className={item.color || ''}>
                      {CustomIcon ? <CustomIcon /> : Icon && <Icon size={20} />}
                    </span>
                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="bg-[var(--primary-orange)] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
