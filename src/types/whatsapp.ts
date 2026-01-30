export interface WhatsAppThread {
  id: number;
  entry_id?: string;
  id_shop: number;
  channel: string;
  contact_name: string;
  contact_recipient_id: string;
  assistant_chat?: boolean;
  id_customer?: number;
  date_add?: string;
  created_at?: string;
  updated_at?: string;
  unread_count?: number;
  last_message?: string;
  last_message_time?: string;
  employee_assign?: number;
  status?: string;
  id_configuration?: number;
}

export interface WhatsAppMessage {
  id: number;
  id_thread: number;
  object_type: string;
  entry_id: string;
  phone_number_id: string;
  display_phone_number: string;
  wa_id: string;
  contact_name: string;
  recipient_id: string;
  message_id: string;
  message_type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contacts';
  message_text: string;
  media_id?: string;
  media_path?: string;
  latitude?: string;
  longitude?: string;
  location_name?: string;
  address?: string;
  message_contact?: any;
  direction: 'incoming' | 'outgoing';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  status_timestamp: string;
  conversation_id: string;
  conversation_origin_type?: string;
  pricing_billable?: boolean;
  pricing_model?: string;
  pricing_category?: string;
  received_timestamp?: number;
  is_read: boolean;
  id_shop: number;
  id_order?: number;
  agent?: string;
  id_employee?: number;
  name_user: string;
  is_notifications?: number;
  created_at: string;
  updated_at: string;
}

export interface WhatsAppConfiguration {
  id: number;
  id_shop: number;
  id_app_meta: number;
  id_page_business: number;
  channel: string;
  id_whatsapp: string;
  id_phone_meta: string;
  number_whatsapp: string;
  token_access: string;
  created_at: string;
  updated_at: string;
}

export interface ThreadWithMessages extends WhatsAppThread {
  messages: WhatsAppMessage[];
}

export interface SendMessagePayload {
  id_thread: number;
  message_text: string;
  recipient_id: string;
  id_shop: number;
}

export interface WebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: Array<{
          profile: {
            name: string;
          };
          wa_id: string;
        }>;
        messages?: Array<{
          from: string;
          id: string;
          timestamp: string;
          type: string;
          text?: {
            body: string;
          };
          image?: {
            id: string;
            mime_type: string;
            sha256: string;
          };
        }>;
        statuses?: Array<{
          id: string;
          status: string;
          timestamp: string;
          recipient_id: string;
        }>;
      };
      field: string;
    }>;
  }>;
}
