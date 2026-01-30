import React from 'react';
import { Menu, X, MessageSquare, Mail, Settings, BarChart3, Lock, MessageCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ isOpen, onToggle, activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'chatweb', label: 'Chat Web', icon: MessageSquare },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'permissions', label: 'Permisos', icon: Lock },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <>
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-xl flex flex-col`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className={`font-bold text-xl ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            CRM
          </div>
          <button onClick={onToggle} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 shadow-lg'
                    : 'hover:bg-slate-700'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className={`flex items-center gap-3 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
            <div className="text-sm">
              <p className="font-medium">Admin</p>
              <p className="text-xs text-gray-400">super@crm.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`} />
    </>
  );
}
