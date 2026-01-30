import React, { useState } from 'react';
import { Plus, Search, FileText, Copy, Edit, Trash2 } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  category: string;
  content: string;
  usageCount: number;
  lastUsed: string;
}

export default function TemplatesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    { id: 1, name: 'Saludo Inicial', category: 'Saludos', content: '¡Hola! Gracias por contactarnos. ¿En qué puedo ayudarte hoy?', usageCount: 145, lastUsed: 'Hace 1 hora' },
    { id: 2, name: 'Información de Productos', category: 'Ventas', content: 'Nuestros productos están disponibles en varios modelos. ¿Te gustaría conocer las especificaciones y precios?', usageCount: 89, lastUsed: 'Hace 2 horas' },
    { id: 3, name: 'Seguimiento de Pedido', category: 'Envíos', content: 'Tu pedido #[NUMERO] está en camino. Puedes rastrearlo con el código: [CODIGO]', usageCount: 234, lastUsed: 'Hace 30 min' },
    { id: 4, name: 'Despedida Cortés', category: 'Despedidas', content: 'Gracias por tu tiempo. Si necesitas más ayuda, no dudes en contactarnos. ¡Que tengas un excelente día!', usageCount: 198, lastUsed: 'Hace 15 min' },
    { id: 5, name: 'Horarios de Atención', category: 'Información', content: 'Nuestro horario de atención es de Lunes a Viernes: 9:00 AM - 6:00 PM. Sábados: 9:00 AM - 2:00 PM', usageCount: 67, lastUsed: 'Ayer' },
    { id: 6, name: 'Disculpa por Demora', category: 'Soporte', content: 'Lamentamos la demora en la respuesta. Estamos trabajando para resolver tu caso lo antes posible.', usageCount: 45, lastUsed: 'Hace 3 horas' },
    { id: 7, name: 'Confirmación de Cita', category: 'Citas', content: 'Tu cita ha sido confirmada para el día [FECHA] a las [HORA]. Te esperamos.', usageCount: 112, lastUsed: 'Hace 5 horas' },
    { id: 8, name: 'Cotización', category: 'Ventas', content: 'Con gusto te enviamos una cotización personalizada. Por favor, compártenos más detalles sobre lo que necesitas.', usageCount: 156, lastUsed: 'Hace 1 día' },
  ];

  const categories = ['all', 'Saludos', 'Ventas', 'Envíos', 'Despedidas', 'Información', 'Soporte', 'Citas'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen bg-[#f0f2f5] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plantillas de Mensajes</h1>
              <p className="text-sm text-gray-600 mt-1">{templates.length} plantillas disponibles</p>
            </div>
            <button className="px-4 py-2 bg-[var(--primary-orange)] text-white rounded-lg hover:bg-[var(--primary-orange-hover)] transition-colors flex items-center gap-2">
              <Plus size={20} />
              Nueva Plantilla
            </button>
          </div>

          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar plantillas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-orange)] focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[var(--primary-orange)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'Todas' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-[var(--primary-orange-light)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={20} className="text-[var(--primary-orange)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Usado {template.usageCount} veces</span>
                        <span>•</span>
                        <span>Último uso: {template.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Copiar">
                      <Copy size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                      <Edit size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Eliminar">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
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
