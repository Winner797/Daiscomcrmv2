import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';
import { whatsappService } from '../services/whatsappService';
import { API_CONFIG } from '../config/api';

export default function ApiConnectionTest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  const testConnection = async () => {
    setTesting(true);
    setResult(null);

    try {
      const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.getThreads(API_CONFIG.defaultShop)}`;
      console.log('Testing URL:', url);

      const threads = await whatsappService.getThreads(API_CONFIG.defaultShop);

      setResult({
        success: true,
        message: `Conexión exitosa. ${threads.length} conversaciones encontradas.`,
        data: threads
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Error desconocido',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Prueba de Conexión API</h3>

      <div className="space-y-3 mb-4">
        <div className="text-sm">
          <span className="font-medium">URL Base:</span>
          <div className="mt-1 p-2 bg-gray-50 rounded text-xs font-mono break-all">
            {API_CONFIG.baseUrl}
          </div>
        </div>

        <div className="text-sm">
          <span className="font-medium">Endpoint de prueba:</span>
          <div className="mt-1 p-2 bg-gray-50 rounded text-xs font-mono break-all">
            {API_CONFIG.baseUrl}{API_CONFIG.endpoints.getThreads(API_CONFIG.defaultShop)}
          </div>
        </div>
      </div>

      <button
        onClick={testConnection}
        disabled={testing}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {testing ? (
          <>
            <Loader size={16} className="animate-spin" />
            Probando...
          </>
        ) : (
          <>
            <RefreshCw size={16} />
            Probar Conexión
          </>
        )}
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            result.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-start gap-2">
            {result.success ? (
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                {result.success ? 'Éxito' : 'Error'}
              </p>
              <p className={`text-sm mt-1 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                {result.message}
              </p>
              {result.data && (
                <details className="mt-2">
                  <summary className="text-sm cursor-pointer text-green-700 hover:text-green-900">
                    Ver datos recibidos
                  </summary>
                  <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-60">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
