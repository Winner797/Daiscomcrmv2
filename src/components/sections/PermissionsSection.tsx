import React from 'react';
import { Shield, Users, Lock } from 'lucide-react';

export default function PermissionsSection() {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Permisos y Roles</h1>
          <p className="text-gray-600 mt-1">Gestiona los permisos y roles de usuario</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-center h-64 text-gray-400">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Sistema de permisos</p>
              <p className="text-sm mt-2">Configura roles y permisos de usuario</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
