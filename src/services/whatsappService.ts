import type {
  WhatsAppThread,
  WhatsAppMessage,
  WhatsAppConfiguration,
  SendMessagePayload,
  ThreadWithMessages
} from '../types/whatsapp';

const API_BASE_URL = 'https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm';

class WhatsAppService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getThreads(idShop: number): Promise<WhatsAppThread[]> {
    return this.request<WhatsAppThread[]>(`&action=getThreads&id_shop=${idShop}`);
  }

  async getThreadWithMessages(threadId: number): Promise<ThreadWithMessages> {
    return this.request<ThreadWithMessages>(`&action=getThread&thread_id=${threadId}`);
  }

  async getMessages(threadId: number, limit: number = 50): Promise<WhatsAppMessage[]> {
    return this.request<WhatsAppMessage[]>(`&action=getMessages&thread_id=${threadId}&limit=${limit}`);
  }

  async sendMessage(payload: SendMessagePayload): Promise<WhatsAppMessage> {
    return this.request<WhatsAppMessage>('&action=sendMessage', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async markAsRead(messageId: string, threadId: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('&action=markAsRead', {
      method: 'POST',
      body: JSON.stringify({ message_id: messageId, thread_id: threadId }),
    });
  }

  async getConfiguration(idShop: number): Promise<WhatsAppConfiguration[]> {
    return this.request<WhatsAppConfiguration[]>(`&action=getConfiguration&id_shop=${idShop}`);
  }

  async searchThreads(idShop: number, query: string): Promise<WhatsAppThread[]> {
    return this.request<WhatsAppThread[]>(`&action=searchThreads&id_shop=${idShop}&q=${encodeURIComponent(query)}`);
  }

  async getUnreadCount(idShop: number): Promise<{ count: number }> {
    return this.request<{ count: number }>(`&action=getUnreadCount&id_shop=${idShop}`);
  }

  async updateThreadStatus(threadId: number, status: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('&action=updateThreadStatus', {
      method: 'POST',
      body: JSON.stringify({ thread_id: threadId, status }),
    });
  }

  async assignThread(threadId: number, employeeId: number): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>('&action=assignThread', {
      method: 'POST',
      body: JSON.stringify({ thread_id: threadId, employee_id: employeeId }),
    });
  }
}

export const whatsappService = new WhatsAppService();
