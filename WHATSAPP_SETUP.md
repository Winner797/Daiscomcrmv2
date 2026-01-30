# Configuración de WhatsApp CRM

Esta guía explica cómo configurar y conectar el sistema de WhatsApp CRM entre el frontend React y el backend PHP.

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Base de Datos](#configuración-de-base-de-datos)
3. [Configuración del Backend PHP](#configuración-del-backend-php)
4. [Configuración del Frontend](#configuración-del-frontend)
5. [Configuración de WhatsApp Business API](#configuración-de-whatsapp-business-api)
6. [Pruebas](#pruebas)

## Requisitos Previos

- Cuenta de Meta Business (Facebook Business)
- WhatsApp Business API configurada
- Servidor PHP 7.4+
- PrestaShop instalado
- Node.js 18+ (para el frontend)
- Base de datos MySQL o Supabase

## Configuración de Base de Datos

### Opción 1: Supabase (Recomendado para el proyecto actual)

Las migraciones ya están aplicadas en Supabase. Las tablas creadas son:

- `crm_configuration` - Configuración de canales
- `crm_threads_channels` - Conversaciones/Threads
- `crm_whatsapp_messages` - Mensajes de WhatsApp

### Opción 2: MySQL (Para backend PHP existente)

Usa las tablas que ya tienes definidas:

- `tv_crm_configuration`
- `tv_crm_threads_channels`
- `tv_crm_whatsapp_messages`

## Configuración del Backend PHP

### 1. Implementar el Controlador

Copia el código del archivo `PHP_CONTROLLER_GUIDE.md` en tu controlador:

```
/modules/daiscomcrm/controllers/front/ApiWhatsAppCrm.php
```

### 2. Configurar la Base de Datos

Inserta tu configuración de WhatsApp en la tabla:

```sql
INSERT INTO tv_crm_configuration (
    id_shop,
    id_app_meta,
    id_page_business,
    channel,
    id_whatsapp,
    id_phone_meta,
    number_whatsapp,
    token_access
) VALUES (
    1,
    'TU_APP_ID',
    'TU_PAGE_ID',
    'whatsapp',
    'TU_WHATSAPP_BUSINESS_ACCOUNT_ID',
    'TU_PHONE_NUMBER_ID',
    '+34600123456',
    'TU_TOKEN_DE_ACCESO'
);
```

### 3. Obtener Credenciales de Meta

1. Ve a [Meta for Developers](https://developers.facebook.com/)
2. Crea o selecciona tu app de WhatsApp Business
3. Ve a WhatsApp > Configuración
4. Obtén:
   - **Phone Number ID**: ID del número de teléfono
   - **WhatsApp Business Account ID**: ID de la cuenta
   - **Token de Acceso**: Token temporal o permanente

### 4. Configurar Webhooks

1. En Meta for Developers, ve a WhatsApp > Configuración
2. Configura el webhook:
   ```
   URL: https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm&action=webhook
   Verify Token: TU_TOKEN_DE_VERIFICACION
   ```
3. Suscríbete a estos eventos:
   - messages
   - message_status
   - message_echoes

### 5. Agregar Verificación de Webhook

Agrega este método al controlador para la verificación inicial:

```php
public function init()
{
    parent::init();

    // Verificación del webhook de Meta
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && Tools::getValue('hub_mode')) {
        $mode = Tools::getValue('hub_mode');
        $token = Tools::getValue('hub_verify_token');
        $challenge = Tools::getValue('hub_challenge');

        if ($mode === 'subscribe' && $token === 'TU_TOKEN_DE_VERIFICACION') {
            echo $challenge;
            exit;
        } else {
            http_response_code(403);
            exit;
        }
    }
}
```

## Configuración del Frontend

### 1. Variables de Entorno

No es necesario configurar variables de entorno adicionales. El servicio ya está configurado para usar la URL de staging:

```typescript
const API_BASE_URL = 'https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm';
```

### 2. Archivos Creados

El proyecto ya incluye:

- `src/types/whatsapp.ts` - Tipos TypeScript
- `src/services/whatsappService.ts` - Servicio API
- `src/components/sections/WhatsAppSection.tsx` - Componente actualizado

### 3. Configurar ID de Tienda

En `WhatsAppSection.tsx`, actualiza el ID de la tienda:

```typescript
const idShop = 1; // Cambia esto al ID de tu tienda
```

## Configuración de WhatsApp Business API

### 1. Crear App de WhatsApp Business

1. Ve a [Meta for Developers](https://developers.facebook.com/)
2. Crea una nueva app
3. Agrega el producto "WhatsApp"
4. Completa la configuración

### 2. Agregar Número de Teléfono

1. En la consola de WhatsApp, ve a "Números de teléfono"
2. Agrega un número de teléfono verificado
3. Este será el número desde el que se enviarán mensajes

### 3. Tokens de Acceso

Para producción, genera un **Token de Acceso del Sistema**:

1. Ve a Configuración de la App > Configuración básica
2. Copia el ID de la app y el secreto
3. Genera un token permanente usando la Graph API:

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?
  grant_type=client_credentials&
  client_id=TU_APP_ID&
  client_secret=TU_APP_SECRET"
```

## Pruebas

### 1. Probar Conexión del Frontend

```bash
npm run dev
```

Abre el navegador y ve a la sección de WhatsApp. Deberías ver:
- El número de WhatsApp configurado
- La lista de conversaciones (vacía inicialmente)

### 2. Probar Webhook

Envía un mensaje de prueba desde WhatsApp Web a tu número de negocio:

1. El webhook debería recibir el mensaje
2. Se creará un thread nuevo en `tv_crm_threads_channels`
3. El mensaje se guardará en `tv_crm_whatsapp_messages`
4. El frontend debería mostrar la conversación automáticamente

### 3. Probar Envío de Mensajes

1. Selecciona una conversación en el frontend
2. Escribe un mensaje y envía
3. El mensaje debería:
   - Enviarse a través de la API de WhatsApp
   - Guardarse en la base de datos
   - Aparecer en la conversación

### 4. Verificar Logs

Revisa los logs del webhook:

```
/modules/daiscomcrm/controllers/front/webhook_log.txt
```

## Flujo de Datos

### Mensaje Entrante (Incoming)

```
WhatsApp → Meta Webhook → Backend PHP → Base de Datos → Frontend (polling o websockets)
```

### Mensaje Saliente (Outgoing)

```
Frontend → Backend PHP → WhatsApp Graph API → WhatsApp → Webhook (status updates)
```

## Solución de Problemas

### El frontend no muestra conversaciones

1. Verifica que el backend esté devolviendo datos:
   ```bash
   curl "https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm&action=getThreads&id_shop=1"
   ```

2. Abre la consola del navegador y busca errores de CORS

3. Verifica que los headers CORS estén configurados en el backend

### Los mensajes no se envían

1. Verifica que el token de acceso sea válido
2. Comprueba que el `phone_number_id` sea correcto
3. Revisa los logs de errores en el backend
4. Usa la herramienta de prueba de API de Meta

### El webhook no recibe mensajes

1. Verifica que la URL del webhook esté configurada correctamente
2. Asegúrate de que el servidor sea accesible públicamente (no localhost)
3. Verifica que el token de verificación coincida
4. Revisa los logs de Meta Developer Console

### Errores de CORS

Si ves errores de CORS en el navegador:

1. Asegúrate de que estos headers estén en el backend:
   ```php
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
   header('Access-Control-Allow-Headers: Content-Type, Authorization');
   ```

2. Maneja las peticiones OPTIONS:
   ```php
   if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
       http_response_code(200);
       exit;
   }
   ```

## Seguridad

### Recomendaciones para Producción

1. **Restringir CORS**: Cambia `*` por tu dominio específico
2. **Autenticación**: Agrega autenticación JWT o sesiones
3. **Validación de Webhook**: Verifica la firma del webhook de Meta
4. **Rate Limiting**: Implementa límites de peticiones
5. **Sanitización**: Usa `pSQL()` para todas las queries SQL
6. **Tokens**: Usa tokens permanentes en producción, no temporales

### Validar Firma del Webhook (Recomendado)

```php
private function verifyWebhookSignature($payload, $signature)
{
    $appSecret = 'TU_APP_SECRET';
    $expectedSignature = 'sha256=' . hash_hmac('sha256', $payload, $appSecret);
    return hash_equals($expectedSignature, $signature);
}
```

## Próximos Pasos

1. Implementar polling o WebSockets para actualizaciones en tiempo real
2. Agregar soporte para multimedia (imágenes, videos, documentos)
3. Implementar plantillas de mensajes
4. Agregar asignación automática de conversaciones
5. Implementar bot de respuestas automáticas
6. Agregar métricas y analytics

## Recursos Adicionales

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Graph API Reference](https://developers.facebook.com/docs/graph-api)
- [Webhook Setup Guide](https://developers.facebook.com/docs/graph-api/webhooks)
- [Message Templates](https://developers.facebook.com/docs/whatsapp/message-templates)

## Soporte

Si tienes problemas, verifica:

1. Los logs del servidor PHP
2. Los logs del webhook (`webhook_log.txt`)
3. La consola del navegador
4. Los logs de Meta Developer Console
