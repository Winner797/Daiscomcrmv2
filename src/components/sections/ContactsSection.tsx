import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Tag, MoreVertical, User } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  tags: string[];
  lastContact: string;
}

export default function ContactsSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const contacts: Contact[] = [
    { id: 1, name: 'María González', email: 'maria@empresa.com', phone: '+57 350 720 5374', company: 'Empresa ABC', tags: ['Cliente VIP', 'Frecuente'], lastContact: 'Hace 2 días' },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos@tech.com', phone: '+57 312 456 7890', company: 'Tech Solutions', tags: ['Potencial'], lastContact: 'Hace 1 semana' },
    { id: 3, name: 'Ana Martínez', email: 'ana@startup.io', phone: '+57 320 987 6543', company: 'StartUp XYZ', tags: ['Cliente', 'Premium'], lastContact: 'Ayer' },
    { id: 4, name: 'Pedro Ruiz', email: 'pedro@gmail.com', phone: '+57 333 777 888', tags: ['Nuevo'], lastContact: 'Hace 3 horas' },
    { id: 5, name: 'Laura Fernández', email: 'laura@design.com', phone: '+57 399 111 222', company: 'Design Studio', tags: ['Cliente VIP'], lastContact: 'Hace 5 días' },
    { id: 6, name: 'Miguel Sánchez', email: 'miguel@corp.com', phone: '+57 344 555 666', company: 'Corporation Ltd', tags: ['Frecuente'], lastContact: 'Hace 1 día' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
              <p className="text-sm text-gray-600 mt-1">{contacts.length} contactos en total</p>
            </div>
            <button className="px-4 py-2 bg-[var(--primary-orange)] text-white rounded-lg hover:bg-[var(--primary-orange-hover)] transition-colors flex items-center gap-2">
              <Plus size={20} />
              Nuevo Contacto
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-orange)] to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {contact.name.charAt(0)}
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                {contact.company && (
                  <p className="text-sm text-gray-600 mb-3">{contact.company}</p>
                )}

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone size={14} className="text-gray-400" />
                    <span>{contact.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {contact.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-[var(--primary-orange-light)] text-[var(--primary-orange)] text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500">Último contacto: {contact.lastContact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
