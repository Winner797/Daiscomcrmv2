# Guía de Debug - Por qué no se ven los mensajes de WhatsApp

## Panel de Debug Integrado

He agregado un panel de debug directamente en la sección de WhatsApp que te ayudará a diagnosticar por qué no se están mostrando los mensajes.

## Cómo Usar el Panel de Debug

### 1. Acceder al Panel

1. Ve a la sección **WhatsApp** (primer icono en el sidebar)
2. En la parte superior derecha, verás un botón con un icono de bug 🐛
3. Haz clic en el botón para activar el panel de debug

### 2. Qué Información Muestra

El panel de debug muestra:

- **Endpoint**: Qué acción de la API se está llamando
- **Timestamp**: Cuándo se hizo la petición
- **Tipo de datos**: Si la API devolvió un array, objeto, null, etc.
- **Cantidad de items**: Cuántas conversaciones o mensajes se recibieron
- **Error**: Si hubo algún error, se muestra aquí
- **Datos completos**: Puedes expandir para ver el JSON completo

### 3. Escenarios Comunes

#### Escenario A: No hay conversaciones (API funciona pero devuelve array vacío)

```
Tipo de datos: array
Cantidad de items: 0
```

**Causa**: La API está funcionando pero no hay datos en la base de datos.

**Solución**:
- Verifica que la tabla `tv_crm_threads_channels` tenga datos
- Ejecuta este query en MySQL:
  ```sql
  SELECT * FROM tv_crm_threads_channels WHERE channel = 'whatsapp' AND id_shop = 1;
  ```
- Si no hay datos, necesitas crear registros de prueba

#### Escenario B: Error de conexión

```
Error: Failed to fetch
```

**Causa**: La API no está respondiendo o hay un problema de CORS.

**Solución**:
1. Verifica que la URL de la API sea correcta
2. Prueba la URL en el navegador directamente
3. Verifica que el backend tenga los headers CORS configurados

#### Escenario C: Error 404

```
Error: HTTP error! status: 404
```

**Causa**: El endpoint no existe.

**Solución**:
1. Verifica que el archivo `ApiWhatsAppCrm.php` exista en:
   ```
   modules/daiscomcrm/controllers/ApiWhatsAppCrm.php
   ```
2. Implementa el controlador usando `PHP_CONTROLLER_GUIDE.md`

#### Escenario D: Respuesta no es JSON

```
Error: API no devolvió JSON válido
```

**Causa**: El backend está devolviendo HTML o texto plano.

**Solución**:
1. El controlador PHP tiene errores de sintaxis o warnings
2. Hay un `echo` o `print_r` antes del `json_encode`
3. Verifica los logs de PHP para ver errores

#### Escenario E: Datos incorrectos

```
Tipo de datos: object
```

**Causa**: La API devuelve un objeto en lugar de un array.

**Solución**:
- El controlador debe devolver un array de conversaciones:
  ```php
  echo json_encode($threads); // debe ser un array
  ```
- No debe ser:
  ```php
  echo json_encode(['data' => $threads]); // esto es un objeto
  ```

## Pasos de Diagnóstico

### Paso 1: Verifica la Conexión

1. Ve a **Configuración** en el sidebar
2. Usa el componente **"Prueba de Conexión API"**
3. Si falla aquí, el problema está en el backend

### Paso 2: Verifica las Conversaciones

1. Ve a **WhatsApp** en el sidebar
2. Activa el panel de debug (botón 🐛)
3. Haz clic en el botón de actualizar (🔄)
4. Mira el panel de debug:
   - ¿Dice "Cantidad de items: 0"?
   - ¿Hay un error?
   - ¿Qué tipo de datos recibió?

### Paso 3: Verifica los Logs del Navegador

1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Busca mensajes que empiecen con:
   - `API Request URL:`
   - `API Response status:`
   - `API Response data:`
   - `Threads received:`
   - `Messages for thread X:`

### Paso 4: Prueba Manual

Abre una nueva pestaña y pega esta URL (ajusta el dominio):

```
https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm&action=getThreads&id_shop=1
```

**Resultado esperado**: Un JSON con un array de conversaciones

```json
[
  {
    "id": 1,
    "contact_name": "Juan Pérez",
    "contact_recipient_id": "5491234567890",
    "unread_count": 3,
    "created_at": "2024-01-30 10:00:00",
    ...
  }
]
```

## Estructura de Datos Esperada

### Para Conversaciones (getThreads)

```json
[
  {
    "id": 1,
    "id_shop": 1,
    "channel": "whatsapp",
    "contact_name": "Juan Pérez",
    "contact_recipient_id": "5491234567890",
    "id_configuration": 1,
    "employee_assign": 1,
    "status": "open",
    "unread_count": 3,
    "created_at": "2024-01-30 10:00:00",
    "updated_at": "2024-01-30 15:30:00"
  }
]
```

### Para Mensajes (getMessages)

```json
[
  {
    "id": 1,
    "id_thread": 1,
    "message_id": "wamid.xxx",
    "message_type": "text",
    "message_text": "Hola, cómo estás?",
    "direction": "incoming",
    "status": "received",
    "created_at": "2024-01-30 10:00:00"
  }
]
```

## Verificar Base de Datos

Si la API funciona pero no hay datos:

```sql
-- Ver si hay conversaciones
SELECT
  t.*,
  COUNT(m.id) as message_count
FROM tv_crm_threads_channels t
LEFT JOIN tv_crm_messages_channels m ON m.id_thread = t.id
WHERE t.channel = 'whatsapp'
  AND t.id_shop = 1
GROUP BY t.id
ORDER BY t.updated_at DESC;

-- Ver si hay mensajes
SELECT *
FROM tv_crm_messages_channels
WHERE id_thread = 1  -- Reemplaza con un ID de thread real
ORDER BY created_at DESC
LIMIT 20;
```

## Crear Datos de Prueba

Si no hay datos en la base de datos, puedes crear datos de prueba:

```sql
-- Insertar conversación de prueba
INSERT INTO tv_crm_threads_channels (
  id_shop, channel, contact_name, contact_recipient_id,
  id_configuration, employee_assign, status, created_at, updated_at
) VALUES (
  1, 'whatsapp', 'Cliente Prueba', '5491234567890',
  1, 1, 'open', NOW(), NOW()
);

-- Obtener el ID de la conversación creada
SET @thread_id = LAST_INSERT_ID();

-- Insertar mensajes de prueba
INSERT INTO tv_crm_messages_channels (
  id_thread, message_id, message_type, message_text,
  direction, status, created_at
) VALUES
(@thread_id, 'msg_1', 'text', 'Hola, necesito ayuda', 'incoming', 'received', NOW()),
(@thread_id, 'msg_2', 'text', 'Claro, en qué puedo ayudarte?', 'outgoing', 'sent', NOW()),
(@thread_id, 'msg_3', 'text', 'Quiero información sobre productos', 'incoming', 'received', NOW());
```

## Solución Rápida: Mock Data

Si necesitas probar el frontend mientras arreglas el backend, puedes usar datos de prueba:

1. Edita `src/services/whatsappService.ts`
2. Comenta temporalmente las llamadas a la API
3. Devuelve datos hardcodeados:

```typescript
async getThreads(idShop: number): Promise<WhatsAppThread[]> {
  // return this.request<WhatsAppThread[]>(API_CONFIG.endpoints.getThreads(idShop));

  // Mock data temporal
  return [
    {
      id: 1,
      id_shop: 1,
      channel: 'whatsapp',
      contact_name: 'Cliente Demo',
      contact_recipient_id: '5491234567890',
      id_configuration: 1,
      employee_assign: 1,
      status: 'open',
      unread_count: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}
```

## Lista de Verificación

- [ ] El componente de prueba en Configuración funciona
- [ ] El panel de debug en WhatsApp está activado
- [ ] Los logs de la consola muestran las peticiones
- [ ] La URL manual en el navegador devuelve JSON
- [ ] La base de datos tiene conversaciones con channel='whatsapp'
- [ ] La base de datos tiene mensajes para esas conversaciones
- [ ] El backend tiene los headers CORS configurados
- [ ] El controlador PHP devuelve JSON válido

## Próximos Pasos

Una vez que identifiques el problema con el panel de debug:

1. **Si es un problema de backend**: Usa `PHP_CONTROLLER_GUIDE.md`
2. **Si no hay datos**: Inserta datos de prueba en la base de datos
3. **Si es CORS**: Agrega los headers en el backend PHP
4. **Si todo funciona**: Desactiva el panel de debug para producción

## Contacto de Soporte

Si después de revisar todo esto sigues sin ver mensajes:

1. Toma un screenshot del panel de debug
2. Copia los logs de la consola
3. Muestra el resultado de probar la URL manualmente
4. Comparte el resultado del query SQL de verificación
