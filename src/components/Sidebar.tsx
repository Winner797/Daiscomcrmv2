import React from 'react';
import { MessageSquare, Mail, Users, Settings, Bell, BookOpen, PieChart, Bot, Building, Cog, Facebook } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ isOpen, onToggle, activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'conversations', label: 'Conversaciones', icon: MessageSquare, badge: '7' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'messenger', label: 'Messenger', icon: Facebook },
    { id: 'email', label: 'Correo', icon: Mail },
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
                    <Icon size={20} />
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
