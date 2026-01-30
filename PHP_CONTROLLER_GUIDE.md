# Guía del Controlador PHP para WhatsApp CRM

Esta guía detalla cómo implementar el controlador `ApiWhatsAppCrmModuleFrontController` para conectar el frontend con la base de datos.

## URL Base
```
https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm
```

## Estructura del Controlador

```php
<?php

require_once _PS_MODULE_DIR_ . 'daiscomcrm/src/Channels/WhatsApp/WebhookHandler.php';
require_once _PS_MODULE_DIR_ . 'daiscomcrm/src/Core/AutomationManager.php';
require_once _PS_MODULE_DIR_ . 'daiscomcrm/src/Core/MessageDispatcher.php';

use DaiscomCRM\src\Core\MessageDispatcher;

class daiscomcrmApiWhatsAppCrmModuleFrontController extends ModuleFrontController
{
    public $ssl = true;

    public function initContent()
    {
        // Deshabilitar el template de PrestaShop para respuestas JSON
        $this->ajax = true;

        // Configurar CORS headers
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Content-Type: application/json');

        // Manejar OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        // Obtener la acción del parámetro
        $action = Tools::getValue('action');

        try {
            switch ($action) {
                case 'getThreads':
                    $this->getThreads();
                    break;
                case 'getThread':
                    $this->getThread();
                    break;
                case 'getMessages':
                    $this->getMessages();
                    break;
                case 'sendMessage':
                    $this->sendMessage();
                    break;
                case 'markAsRead':
                    $this->markAsRead();
                    break;
                case 'getConfiguration':
                    $this->getConfiguration();
                    break;
                case 'searchThreads':
                    $this->searchThreads();
                    break;
                case 'getUnreadCount':
                    $this->getUnreadCount();
                    break;
                case 'updateThreadStatus':
                    $this->updateThreadStatus();
                    break;
                case 'assignThread':
                    $this->assignThread();
                    break;
                case 'webhook':
                    $this->handleWebhook();
                    break;
                default:
                    $this->sendError('Acción no válida', 400);
            }
        } catch (Exception $e) {
            $this->sendError($e->getMessage(), 500);
        }
    }

    /**
     * GET /api?action=getThreads&id_shop=1
     * Obtener todas las conversaciones de una tienda con información del último mensaje
     */
    private function getThreads()
    {
        $idShop = (int)Tools::getValue('id_shop');

        if (!$idShop) {
            $this->sendError('id_shop es requerido', 400);
            return;
        }

        $sql = "
            SELECT
                t.*,
                COUNT(CASE WHEN m.is_read = 0 AND m.direction = 'incoming' THEN 1 END) as unread_count,
                (SELECT message_text FROM tv_crm_whatsapp_messages
                 WHERE id_crm_threands_channels = t.id
                 ORDER BY created_at DESC LIMIT 1) as last_message,
                (SELECT created_at FROM tv_crm_whatsapp_messages
                 WHERE id_crm_threands_channels = t.id
                 ORDER BY created_at DESC LIMIT 1) as last_message_time
            FROM tv_crm_threads_channels t
            LEFT JOIN tv_crm_whatsapp_messages m ON m.id_crm_threands_channels = t.id
            WHERE t.id_shop = " . $idShop . " AND t.channel = 'whatsapp'
            GROUP BY t.id
            ORDER BY last_message_time DESC
        ";

        $threads = Db::getInstance()->executeS($sql);
        $this->sendSuccess($threads);
    }

    /**
     * GET /api?action=getThread&thread_id=1
     * Obtener una conversación específica con todos sus mensajes
     */
    private function getThread()
    {
        $threadId = (int)Tools::getValue('thread_id');

        if (!$threadId) {
            $this->sendError('thread_id es requerido', 400);
            return;
        }

        $thread = Db::getInstance()->getRow("
            SELECT * FROM tv_crm_threads_channels
            WHERE id = " . $threadId
        );

        if (!$thread) {
            $this->sendError('Conversación no encontrada', 404);
            return;
        }

        $messages = Db::getInstance()->executeS("
            SELECT * FROM tv_crm_whatsapp_messages
            WHERE id_crm_threands_channels = " . $threadId . "
            ORDER BY created_at ASC
        ");

        $thread['messages'] = $messages;
        $this->sendSuccess($thread);
    }

    /**
     * GET /api?action=getMessages&thread_id=1&limit=50
     * Obtener mensajes de una conversación
     */
    private function getMessages()
    {
        $threadId = (int)Tools::getValue('thread_id');
        $limit = (int)Tools::getValue('limit', 50);

        if (!$threadId) {
            $this->sendError('thread_id es requerido', 400);
            return;
        }

        $sql = "
            SELECT * FROM tv_crm_whatsapp_messages
            WHERE id_crm_threands_channels = " . $threadId . "
            ORDER BY created_at DESC
            LIMIT " . $limit;

        $messages = Db::getInstance()->executeS($sql);

        // Invertir el orden para que el más antiguo esté primero
        $messages = array_reverse($messages);

        $this->sendSuccess($messages);
    }

    /**
     * POST /api?action=sendMessage
     * Body: { "id_thread": 1, "message_text": "Hola", "recipient_id": "34612345678", "id_shop": 1 }
     * Enviar un mensaje de WhatsApp
     */
    private function sendMessage()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $idThread = (int)$data['id_thread'];
        $messageText = $data['message_text'];
        $recipientId = $data['recipient_id'];
        $idShop = (int)$data['id_shop'];

        if (!$idThread || !$messageText || !$recipientId) {
            $this->sendError('Datos incompletos', 400);
            return;
        }

        // Obtener configuración de WhatsApp para la tienda
        $config = Db::getInstance()->getRow("
            SELECT * FROM tv_crm_configuration
            WHERE id_shop = " . $idShop . " AND channel = 'whatsapp'
            LIMIT 1
        ");

        if (!$config) {
            $this->sendError('Configuración de WhatsApp no encontrada', 404);
            return;
        }

        // Enviar mensaje a través de la API de WhatsApp
        $messageId = $this->sendWhatsAppMessage(
            $config['token_access'],
            $config['id_phone_meta'],
            $recipientId,
            $messageText
        );

        if (!$messageId) {
            $this->sendError('Error al enviar mensaje', 500);
            return;
        }

        // Guardar mensaje en la base de datos
        $sql = "
            INSERT INTO tv_crm_whatsapp_messages (
                id_crm_threands_channels, object_type, entry_id, phone_number_id,
                display_phone_number, wa_id, recipient_id, message_id, message_type,
                message_text, direction, status, id_shop, name_user, created_at
            ) VALUES (
                " . $idThread . ",
                'whatsapp_business_account',
                '" . pSQL($config['id_whatsapp']) . "',
                '" . pSQL($config['id_phone_meta']) . "',
                '" . pSQL($config['number_whatsapp']) . "',
                '" . pSQL($recipientId) . "',
                '" . pSQL($recipientId) . "',
                '" . pSQL($messageId) . "',
                'text',
                '" . pSQL($messageText) . "',
                'outgoing',
                'sent',
                " . $idShop . ",
                'Agent',
                NOW()
            )
        ";

        Db::getInstance()->execute($sql);
        $insertId = Db::getInstance()->Insert_ID();

        $message = Db::getInstance()->getRow("
            SELECT * FROM tv_crm_whatsapp_messages WHERE id = " . $insertId
        );

        $this->sendSuccess($message);
    }

    /**
     * POST /api?action=markAsRead
     * Body: { "message_id": "wamid.xxx", "thread_id": 1 }
     * Marcar mensaje como leído
     */
    private function markAsRead()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $messageId = $data['message_id'];
        $threadId = (int)$data['thread_id'];

        $sql = "
            UPDATE tv_crm_whatsapp_messages
            SET `read` = 1
            WHERE message_id = '" . pSQL($messageId) . "'
            AND id_crm_threands_channels = " . $threadId;

        Db::getInstance()->execute($sql);

        $this->sendSuccess(['success' => true]);
    }

    /**
     * GET /api?action=getConfiguration&id_shop=1
     * Obtener configuración de WhatsApp
     */
    private function getConfiguration()
    {
        $idShop = (int)Tools::getValue('id_shop');

        $configs = Db::getInstance()->executeS("
            SELECT * FROM tv_crm_configuration
            WHERE id_shop = " . $idShop . " AND channel = 'whatsapp'
        ");

        $this->sendSuccess($configs);
    }

    /**
     * GET /api?action=searchThreads&id_shop=1&q=Carlos
     * Buscar conversaciones por nombre o teléfono
     */
    private function searchThreads()
    {
        $idShop = (int)Tools::getValue('id_shop');
        $query = pSQL(Tools::getValue('q'));

        $sql = "
            SELECT * FROM tv_crm_threads_channels
            WHERE id_shop = " . $idShop . "
            AND channel = 'whatsapp'
            AND (contact_name LIKE '%" . $query . "%'
                 OR contact_recipient_id LIKE '%" . $query . "%')
            ORDER BY date_add DESC
        ";

        $threads = Db::getInstance()->executeS($sql);
        $this->sendSuccess($threads);
    }

    /**
     * GET /api?action=getUnreadCount&id_shop=1
     * Obtener contador de mensajes no leídos
     */
    private function getUnreadCount()
    {
        $idShop = (int)Tools::getValue('id_shop');

        $result = Db::getInstance()->getRow("
            SELECT COUNT(*) as count
            FROM tv_crm_whatsapp_messages m
            INNER JOIN tv_crm_threads_channels t ON t.id = m.id_crm_threands_channels
            WHERE t.id_shop = " . $idShop . "
            AND m.`read` = 0
            AND m.direction = 'incoming'
        ");

        $this->sendSuccess(['count' => (int)$result['count']]);
    }

    /**
     * POST /api?action=updateThreadStatus
     * Body: { "thread_id": 1, "status": "closed" }
     * Actualizar estado de conversación
     */
    private function updateThreadStatus()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $threadId = (int)$data['thread_id'];
        $status = pSQL($data['status']);

        $sql = "
            UPDATE tv_crm_threads_channels
            SET assistant_chat = " . ($status === 'bot' ? 1 : 0) . "
            WHERE id = " . $threadId;

        Db::getInstance()->execute($sql);

        $this->sendSuccess(['success' => true]);
    }

    /**
     * POST /api?action=assignThread
     * Body: { "thread_id": 1, "employee_id": 5 }
     * Asignar conversación a un empleado
     */
    private function assignThread()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $threadId = (int)$data['thread_id'];
        $employeeId = (int)$data['employee_id'];

        // Actualizar el thread
        $sql = "
            UPDATE tv_crm_threads_channels
            SET assistant_chat = 0
            WHERE id = " . $threadId;

        Db::getInstance()->execute($sql);

        $this->sendSuccess(['success' => true]);
    }

    /**
     * POST /api?action=webhook
     * Manejar webhooks de WhatsApp
     */
    private function handleWebhook()
    {
        $rawInput = file_get_contents('php://input');
        $data = json_decode($rawInput, true);

        // Guardar en log para debugging
        $this->logWebhook($rawInput);

        // Procesar webhook
        if (isset($data['entry']) && is_array($data['entry'])) {
            foreach ($data['entry'] as $entry) {
                if (isset($entry['changes'])) {
                    foreach ($entry['changes'] as $change) {
                        if ($change['field'] === 'messages') {
                            $this->processIncomingMessage($change['value']);
                        }
                        if (isset($change['value']['statuses'])) {
                            $this->processStatusUpdate($change['value']['statuses']);
                        }
                    }
                }
            }
        }

        $this->sendSuccess(['success' => true]);
    }

    /**
     * Enviar mensaje a través de la API de WhatsApp
     */
    private function sendWhatsAppMessage($accessToken, $phoneNumberId, $to, $text)
    {
        $url = "https://graph.facebook.com/v18.0/" . $phoneNumberId . "/messages";

        $payload = json_encode([
            'messaging_product' => 'whatsapp',
            'to' => $to,
            'type' => 'text',
            'text' => ['body' => $text]
        ]);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json'
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            $result = json_decode($response, true);
            return $result['messages'][0]['id'] ?? null;
        }

        return null;
    }

    /**
     * Procesar mensaje entrante del webhook
     */
    private function processIncomingMessage($value)
    {
        if (!isset($value['messages']) || empty($value['messages'])) {
            return;
        }

        $metadata = $value['metadata'];
        $contact = $value['contacts'][0];
        $message = $value['messages'][0];

        $waId = $contact['wa_id'];
        $contactName = $contact['profile']['name'] ?? 'Unknown';

        // Buscar o crear thread
        $thread = $this->findOrCreateThread($waId, $contactName, $metadata);

        // Guardar mensaje
        $this->saveIncomingMessage($thread['id'], $message, $metadata, $contact);
    }

    /**
     * Procesar actualización de estado del mensaje
     */
    private function processStatusUpdate($statuses)
    {
        foreach ($statuses as $status) {
            $sql = "
                UPDATE tv_crm_whatsapp_messages
                SET status = '" . pSQL($status['status']) . "',
                    status_timestamp = FROM_UNIXTIME(" . $status['timestamp'] . ")
                WHERE message_id = '" . pSQL($status['id']) . "'
            ";
            Db::getInstance()->execute($sql);
        }
    }

    /**
     * Encontrar o crear conversación
     */
    private function findOrCreateThread($waId, $contactName, $metadata)
    {
        // Buscar thread existente
        $thread = Db::getInstance()->getRow("
            SELECT * FROM tv_crm_threads_channels
            WHERE contact_recipient_id = '" . pSQL($waId) . "'
            AND channel = 'whatsapp'
            LIMIT 1
        ");

        if ($thread) {
            return $thread;
        }

        // Crear nuevo thread
        $entryId = 'wa_' . $waId . '_' . time();

        $sql = "
            INSERT INTO tv_crm_threads_channels (
                entry_id, id_shop, channel, contact_name,
                contact_recipient_id, assistant_chat, date_add
            ) VALUES (
                '" . pSQL($entryId) . "',
                1,
                'whatsapp',
                '" . pSQL($contactName) . "',
                '" . pSQL($waId) . "',
                1,
                NOW()
            )
        ";

        Db::getInstance()->execute($sql);
        $threadId = Db::getInstance()->Insert_ID();

        return Db::getInstance()->getRow("
            SELECT * FROM tv_crm_threads_channels WHERE id = " . $threadId
        ");
    }

    /**
     * Guardar mensaje entrante
     */
    private function saveIncomingMessage($threadId, $message, $metadata, $contact)
    {
        $messageText = '';
        $messageType = $message['type'];

        if ($messageType === 'text') {
            $messageText = $message['text']['body'];
        }

        $sql = "
            INSERT INTO tv_crm_whatsapp_messages (
                id_crm_threands_channels, object_type, entry_id, phone_number_id,
                display_phone_number, wa_id, contact_name, message_id, message_type,
                message_text, direction, status, received_timestamp, id_shop, name_user, created_at
            ) VALUES (
                " . $threadId . ",
                'whatsapp_business_account',
                '" . pSQL($metadata['phone_number_id']) . "',
                '" . pSQL($metadata['phone_number_id']) . "',
                '" . pSQL($metadata['display_phone_number']) . "',
                '" . pSQL($contact['wa_id']) . "',
                '" . pSQL($contact['profile']['name'] ?? '') . "',
                '" . pSQL($message['id']) . "',
                '" . pSQL($messageType) . "',
                '" . pSQL($messageText) . "',
                'incoming',
                'received',
                " . $message['timestamp'] . ",
                1,
                '" . pSQL($contact['profile']['name'] ?? 'Customer') . "',
                NOW()
            )
        ";

        Db::getInstance()->execute($sql);
    }

    /**
     * Guardar webhook en log
     */
    private function logWebhook($data)
    {
        $filePath = __DIR__ . '/webhook_log.txt';
        $timestamp = date('Y-m-d H:i:s');
        file_put_contents($filePath, "[$timestamp] $data\n", FILE_APPEND);
    }

    /**
     * Enviar respuesta exitosa
     */
    private function sendSuccess($data)
    {
        echo json_encode($data);
        exit;
    }

    /**
     * Enviar respuesta de error
     */
    private function sendError($message, $code = 400)
    {
        http_response_code($code);
        echo json_encode(['error' => $message]);
        exit;
    }
}
```

## Endpoints Disponibles

### 1. GET getThreads
Obtiene todas las conversaciones con contador de mensajes no leídos
```
GET /api?action=getThreads&id_shop=1
```

### 2. GET getThread
Obtiene una conversación específica con todos sus mensajes
```
GET /api?action=getThread&thread_id=1
```

### 3. GET getMessages
Obtiene mensajes de una conversación
```
GET /api?action=getMessages&thread_id=1&limit=50
```

### 4. POST sendMessage
Envía un mensaje de WhatsApp
```
POST /api?action=sendMessage
Body: {
  "id_thread": 1,
  "message_text": "Hola, ¿cómo estás?",
  "recipient_id": "34612345678",
  "id_shop": 1
}
```

### 5. POST markAsRead
Marca un mensaje como leído
```
POST /api?action=markAsRead
Body: {
  "message_id": "wamid.xxx",
  "thread_id": 1
}
```

### 6. GET getConfiguration
Obtiene la configuración de WhatsApp
```
GET /api?action=getConfiguration&id_shop=1
```

### 7. GET searchThreads
Busca conversaciones por nombre o teléfono
```
GET /api?action=searchThreads&id_shop=1&q=Carlos
```

### 8. GET getUnreadCount
Obtiene el contador de mensajes no leídos
```
GET /api?action=getUnreadCount&id_shop=1
```

### 9. POST webhook
Maneja los webhooks de WhatsApp (Meta Business)
```
POST /api?action=webhook
```

## Notas Importantes

1. **CORS**: Los headers CORS están configurados para permitir todas las fuentes. En producción, debes restringir esto.

2. **Autenticación**: Este ejemplo no incluye autenticación. Debes agregar validación de tokens o sesiones.

3. **Webhook de Meta**: Necesitas configurar el webhook en Meta Business Suite apuntando a `/api?action=webhook`

4. **Logs**: Los webhooks se guardan en `webhook_log.txt` para debugging.

5. **IDs de Tienda**: Actualmente usa `id_shop = 1` como default en algunos lugares. Debes ajustar según tu lógica de negocio.

6. **Token de Acceso**: El token de WhatsApp debe estar almacenado en `tv_crm_configuration` y debe ser válido.
