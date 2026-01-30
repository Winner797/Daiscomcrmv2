import React from 'react';
<<<<<<< HEAD
import { Menu, X, MessageSquare, Mail, Settings, BarChart3, Lock, MessageCircle, Users } from 'lucide-react';
=======
import { Menu, X, MessageSquare, Mail, Settings, BarChart3, Lock } from 'lucide-react';
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ isOpen, onToggle, activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
<<<<<<< HEAD
    { id: 'conversations', label: 'Conversaciones', icon: Users },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    { id: 'chatweb', label: 'Chat Web', icon: MessageSquare },
    { id: 'emails', label: 'Emails', icon: Mail },
    { id: 'permissions', label: 'Permisos', icon: Lock },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <>
<<<<<<< HEAD
      <div className={`${isOpen ? 'w-64' : 'w-16'} bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-xl flex flex-col z-50`}>
        <div className={`${isOpen ? 'p-4' : 'p-2'} border-b border-slate-700 flex items-center justify-between`}>
          <div className={`font-bold text-xl ${isOpen ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300 overflow-hidden whitespace-nowrap`}>
            CRM
          </div>
          <button onClick={onToggle} className="p-2 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0">
=======
      <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 fixed h-screen left-0 top-0 shadow-xl flex flex-col`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className={`font-bold text-xl ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            CRM
          </div>
          <button onClick={onToggle} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

<<<<<<< HEAD
        <nav className={`flex-1 ${isOpen ? 'py-6 px-3' : 'py-4 px-2'} space-y-1 overflow-y-auto`}>
=======
        <nav className="flex-1 py-6 px-3 space-y-2">
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
<<<<<<< HEAD
                className={`w-full flex items-center ${isOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3'} rounded-lg transition-all duration-200 ${
=======
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
                  activeSection === item.id
                    ? 'bg-blue-600 shadow-lg'
                    : 'hover:bg-slate-700'
                }`}
<<<<<<< HEAD
                title={!isOpen ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
=======
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
              </button>
            );
          })}
        </nav>

<<<<<<< HEAD
        {isOpen && (
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
              <div className="text-sm overflow-hidden">
                <p className="font-medium truncate">Admin</p>
                <p className="text-xs text-gray-400 truncate">super@crm.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex-shrink-0`} />
=======
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
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
    </>
  );
}
