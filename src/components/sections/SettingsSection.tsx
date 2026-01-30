import React from 'react';
import { Settings, User, Bell, Shield, Palette, Link } from 'lucide-react';
import ApiConnectionTest from '../ApiConnectionTest';

export default function SettingsSection() {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600 mt-1">Ajusta las preferencias de tu cuenta</p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Link className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Prueba de Conexión API</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Usa esta herramienta para verificar que la conexión con la API de WhatsApp esté funcionando correctamente.
                </p>
              </div>
            </div>
          </div>

          <ApiConnectionTest />

          <div className="border-t pt-6"></div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>
            </div>
            <p className="text-gray-600">Configuración de perfil de usuario</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
            </div>
            <p className="text-gray-600">Preferencias de notificaciones</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
            </div>
            <p className="text-gray-600">Configuración de seguridad y privacidad</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-gray-700 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Apariencia</h2>
            </div>
            <p className="text-gray-600">Personaliza la apariencia de la aplicación</p>
          </div>
        </div>
      </div>
    </div>
  );
}
