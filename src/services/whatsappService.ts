import type {
  WhatsAppThread,
  WhatsAppMessage,
  WhatsAppConfiguration,
  SendMessagePayload,
  ThreadWithMessages
} from '../types/whatsapp';
import { API_CONFIG } from '../config/api';

class WhatsAppService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const url = `${API_CONFIG.baseUrl}${endpoint}`;
      console.log('API Request URL:', url);

      const response = await fetch(url, {
        mode: 'cors',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON Response:', text);
        throw new Error('API no devolvió JSON válido');
      }

      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getThreads(idShop: number): Promise<WhatsAppThread[]> {
    return this.request<WhatsAppThread[]>(API_CONFIG.endpoints.getThreads(idShop));
  }

  async getThreadWithMessages(threadId: number): Promise<ThreadWithMessages> {
    return this.request<ThreadWithMessages>(API_CONFIG.endpoints.getThread(threadId));
  }

  async getMessages(threadId: number, limit: number = 50): Promise<WhatsAppMessage[]> {
    return this.request<WhatsAppMessage[]>(API_CONFIG.endpoints.getMessages(threadId, limit));
  }

  async sendMessage(payload: SendMessagePayload): Promise<WhatsAppMessage> {
    return this.request<WhatsAppMessage>(API_CONFIG.endpoints.sendMessage(), {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async markAsRead(messageId: string, threadId: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(API_CONFIG.endpoints.markAsRead(), {
      method: 'POST',
      body: JSON.stringify({ message_id: messageId, thread_id: threadId }),
    });
  }

  async getConfiguration(idShop: number): Promise<WhatsAppConfiguration[]> {
    return this.request<WhatsAppConfiguration[]>(API_CONFIG.endpoints.getConfiguration(idShop));
  }

  async searchThreads(idShop: number, query: string): Promise<WhatsAppThread[]> {
    return this.request<WhatsAppThread[]>(API_CONFIG.endpoints.searchThreads(idShop, query));
  }

  async getUnreadCount(idShop: number): Promise<{ count: number }> {
    return this.request<{ count: number }>(API_CONFIG.endpoints.getUnreadCount(idShop));
  }

  async updateThreadStatus(threadId: number, status: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(API_CONFIG.endpoints.updateThreadStatus(), {
      method: 'POST',
      body: JSON.stringify({ thread_id: threadId, status }),
    });
  }

  async assignThread(threadId: number, employeeId: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(API_CONFIG.endpoints.assignThread(), {
      method: 'POST',
      body: JSON.stringify({ thread_id: threadId, employee_id: employeeId }),
    });
  }
}

export const whatsappService = new WhatsAppService();
