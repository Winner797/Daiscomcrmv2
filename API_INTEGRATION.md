# Integración API WhatsApp - Guía Rápida

## URL de la API Configurada

```
https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm
```

## Cómo Probar la Conexión

### 1. En el Frontend

1. Ejecuta el proyecto:
   ```bash
   npm run dev
   ```

2. Ve a la sección **Configuración** en el sidebar

3. Encontrarás el componente **"Prueba de Conexión API"** al principio

4. Haz clic en el botón **"Probar Conexión"**

5. El componente probará la conexión con:
   ```
   https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm&action=getThreads&id_shop=1
   ```

6. Verás uno de estos resultados:
   - **Éxito**: La API respondió correctamente y muestra el número de conversaciones
   - **Error**: Muestra el mensaje de error específico

### 2. En el Navegador (DevTools)

Abre la consola del navegador (F12) y verás logs detallados:
- `API Request URL:` - La URL completa que se está llamando
- `API Response status:` - El código de estado HTTP
- `API Response data:` - Los datos recibidos

### 3. Prueba Manual con cURL

```bash
curl "https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm&action=getThreads&id_shop=1"
```

## Archivos Importantes

### Configuración de API
`src/config/api.ts`
- Define la URL base y todos los endpoints
- Puedes cambiar fácilmente la URL o agregar nuevos endpoints aquí

### Servicio de WhatsApp
`src/services/whatsappService.ts`
- Maneja todas las peticiones HTTP
- Incluye logs detallados en la consola
- Manejo de errores robusto

### Componente de Prueba
`src/components/ApiConnectionTest.tsx`
- Interfaz gráfica para probar la conexión
- Muestra la URL completa que se está usando
- Disponible en la sección de Configuración

## Endpoints Disponibles

| Acción | Método | Endpoint |
|--------|--------|----------|
| Obtener conversaciones | GET | `&action=getThreads&id_shop=1` |
| Obtener conversación | GET | `&action=getThread&thread_id=1` |
| Obtener mensajes | GET | `&action=getMessages&thread_id=1&limit=50` |
| Enviar mensaje | POST | `&action=sendMessage` |
| Marcar como leído | POST | `&action=markAsRead` |
| Obtener configuración | GET | `&action=getConfiguration&id_shop=1` |
| Buscar conversaciones | GET | `&action=searchThreads&id_shop=1&q=texto` |
| Contador no leídos | GET | `&action=getUnreadCount&id_shop=1` |
| Actualizar estado | POST | `&action=updateThreadStatus` |
| Asignar conversación | POST | `&action=assignThread` |

## Estructura de la URL

La URL se construye de la siguiente manera:

```
Base URL + Endpoint
```

**Ejemplo:**
```
https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm
+
&action=getThreads&id_shop=1
=
https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm&action=getThreads&id_shop=1
```

## Configuración del ID de Tienda

En `src/components/sections/WhatsAppSection.tsx`, línea 21:

```typescript
const idShop = 1; // Cambia esto al ID de tu tienda
```

## Solución de Problemas Comunes

### Error: CORS

Si ves errores de CORS en la consola:

```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solución**: El backend PHP necesita incluir estos headers:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### Error: 404 Not Found

Si la API devuelve 404:

1. Verifica que el módulo `daiscomcrm` esté instalado
2. Verifica que el controlador `ApiWhatsAppCrm.php` exista
3. Verifica que la URL sea correcta

### Error: No devuelve JSON

Si ves el error "API no devolvió JSON válido":

1. El backend está devolviendo HTML o texto plano en lugar de JSON
2. Verifica que el controlador use `echo json_encode($data);`
3. Verifica que no haya `print_r()` o `var_dump()` en el código

### No hay conversaciones

Si la API responde pero no muestra conversaciones:

1. Verifica que haya datos en la tabla `tv_crm_threads_channels`
2. Verifica que el `id_shop` sea correcto
3. Verifica que el `channel` sea 'whatsapp'

## Próximo Paso: Implementar el Backend

Si la prueba de conexión falla, necesitas implementar el controlador PHP usando:

1. `PHP_CONTROLLER_GUIDE.md` - Código completo del controlador
2. `WHATSAPP_SETUP.md` - Guía de configuración paso a paso

## Logs y Debugging

El servicio incluye logs automáticos en la consola del navegador:

```javascript
console.log('API Request URL:', url);
console.log('API Response status:', response.status);
console.log('API Response data:', data);
console.error('API Error Response:', errorText);
```

Para ver estos logs:
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Filtra por "API" para ver solo logs relacionados

## Cambiar la URL de la API

Si necesitas cambiar la URL (por ejemplo, de staging a producción):

Edita `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  baseUrl: 'https://TU-DOMINIO.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm',
  defaultShop: 1,
  // ...
};
```

## Datos de Prueba

Si quieres probar con datos fake mientras desarrollas el backend, puedes:

1. Modificar `whatsappService.ts` temporalmente para devolver datos mock
2. O crear un servidor de desarrollo local que devuelva JSON de prueba

## Soporte

Si encuentras problemas:

1. Revisa los logs de la consola del navegador
2. Usa el componente de prueba en Configuración
3. Prueba la URL manualmente con cURL
4. Verifica que el backend esté devolviendo JSON válido
