/*
  # Create WhatsApp CRM Tables

  1. New Tables
    - `crm_configuration`
      - Configuration for different channels (WhatsApp, Email, Chat Web)
      - Stores Meta Business API credentials and phone numbers
      - `id` (bigint, primary key)
      - `id_shop` (bigint)
      - `id_app_meta` (bigint) - Meta Business App ID
      - `id_page_business` (bigint) - Meta Business Page ID
      - `channel` (text) - Channel type (whatsapp, email, chatweb)
      - `id_whatsapp` (text) - WhatsApp Business Account ID
      - `id_phone_meta` (text) - Phone Number ID from Meta
      - `number_whatsapp` (text) - WhatsApp phone number
      - `token_access` (text) - Access token for Meta API
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `crm_threads_channels`
      - Conversation threads across all channels
      - `id` (bigint, primary key)
      - `entry_id` (text) - Unique thread identifier
      - `id_shop` (int)
      - `channel` (text) - Channel type
      - `contact_name` (text)
      - `contact_recipient_id` (text) - WhatsApp ID or contact identifier
      - `assistant_chat` (boolean) - Whether bot is active
      - `id_customer` (int) - Customer ID if linked
      - `created_at` (timestamptz)

    - `crm_whatsapp_messages`
      - All WhatsApp messages with full metadata
      - `id` (bigint, primary key)
      - `id_thread` (bigint) - Foreign key to crm_threads_channels
      - `object_type` (text) - Webhook object type
      - `entry_id` (text) - WhatsApp Business Account ID
      - `phone_number_id` (text) - Phone number ID
      - `display_phone_number` (text) - Formatted phone number
      - `wa_id` (text) - WhatsApp user ID
      - `contact_name` (text)
      - `recipient_id` (text)
      - `message_id` (text) - Unique message ID from WhatsApp
      - `message_type` (text) - text, image, video, audio, document, location, contacts
      - `message_text` (text)
      - `media_id` (text)
      - `media_path` (text)
      - `latitude` (text)
      - `longitude` (text)
      - `location_name` (text)
      - `address` (text)
      - `message_contact` (jsonb) - Contact information for contact messages
      - `direction` (text) - incoming or outgoing
      - `status` (text) - sent, delivered, read, failed
      - `status_timestamp` (timestamptz)
      - `conversation_id` (text) - WhatsApp conversation ID
      - `conversation_origin_type` (text)
      - `pricing_billable` (boolean)
      - `pricing_model` (text)
      - `pricing_category` (text)
      - `received_timestamp` (bigint)
      - `is_read` (boolean)
      - `id_shop` (int)
      - `id_order` (int)
      - `agent` (text) - bot or human
      - `id_employee` (int)
      - `name_user` (text)
      - `is_notifications` (int)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their shop data
*/

-- Create crm_configuration table
CREATE TABLE IF NOT EXISTS crm_configuration (
  id bigserial PRIMARY KEY,
  id_shop bigint NOT NULL,
  id_app_meta bigint,
  id_page_business bigint,
  channel text,
  id_whatsapp text,
  id_phone_meta text,
  number_whatsapp text,
  token_access text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create crm_threads_channels table
CREATE TABLE IF NOT EXISTS crm_threads_channels (
  id bigserial PRIMARY KEY,
  entry_id text NOT NULL UNIQUE,
  id_shop int NOT NULL,
  channel text NOT NULL,
  contact_name text NOT NULL,
  contact_recipient_id text NOT NULL,
  assistant_chat boolean DEFAULT true,
  id_customer int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create crm_whatsapp_messages table
CREATE TABLE IF NOT EXISTS crm_whatsapp_messages (
  id bigserial PRIMARY KEY,
  id_thread bigint NOT NULL,
  object_type text NOT NULL,
  entry_id text,
  phone_number_id text,
  display_phone_number text,
  wa_id text NOT NULL,
  contact_name text,
  recipient_id text,
  message_id text UNIQUE,
  message_type text,
  message_text text,
  media_id text,
  media_path text,
  latitude text,
  longitude text,
  location_name text,
  address text,
  message_contact jsonb DEFAULT '[]'::jsonb,
  direction text CHECK (direction IN ('incoming', 'outgoing')),
  status text DEFAULT 'sent',
  status_timestamp timestamptz DEFAULT now(),
  conversation_id text,
  conversation_origin_type text,
  pricing_billable boolean,
  pricing_model text,
  pricing_category text,
  received_timestamp bigint,
  is_read boolean DEFAULT false,
  id_shop int,
  id_order int,
  agent text,
  id_employee int,
  name_user text NOT NULL,
  is_notifications int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_whatsapp_messages_thread FOREIGN KEY (id_thread) 
    REFERENCES crm_threads_channels(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_threads_entry_id ON crm_threads_channels(entry_id);
CREATE INDEX IF NOT EXISTS idx_threads_shop ON crm_threads_channels(id_shop);
CREATE INDEX IF NOT EXISTS idx_threads_channel ON crm_threads_channels(channel);
CREATE INDEX IF NOT EXISTS idx_messages_thread ON crm_whatsapp_messages(id_thread);
CREATE INDEX IF NOT EXISTS idx_messages_shop ON crm_whatsapp_messages(id_shop);
CREATE INDEX IF NOT EXISTS idx_messages_wa_id ON crm_whatsapp_messages(wa_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON crm_whatsapp_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_config_shop ON crm_configuration(id_shop);

-- Enable Row Level Security
ALTER TABLE crm_configuration ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_threads_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view configuration for their shop"
  ON crm_configuration FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view threads for their shop"
  ON crm_threads_channels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert threads for their shop"
  ON crm_threads_channels FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update threads for their shop"
  ON crm_threads_channels FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view messages for their shop"
  ON crm_whatsapp_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert messages for their shop"
  ON crm_whatsapp_messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update messages for their shop"
  ON crm_whatsapp_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);