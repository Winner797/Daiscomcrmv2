export const API_CONFIG = {
  baseUrl: 'https://staging.daiscom.com/index.php?fc=module&module=daiscomcrm&controller=ApiWhatsAppCrm',
  defaultShop: 1,
  endpoints: {
    getThreads: (idShop: number) => `&action=getThreads&id_shop=${idShop}`,
    getThread: (threadId: number) => `&action=getThread&thread_id=${threadId}`,
    getMessages: (threadId: number, limit: number = 50) => `&action=getMessages&thread_id=${threadId}&limit=${limit}`,
    sendMessage: () => `&action=sendMessage`,
    markAsRead: () => `&action=markAsRead`,
    getConfiguration: (idShop: number) => `&action=getConfiguration&id_shop=${idShop}`,
    searchThreads: (idShop: number, query: string) => `&action=searchThreads&id_shop=${idShop}&q=${encodeURIComponent(query)}`,
    getUnreadCount: (idShop: number) => `&action=getUnreadCount&id_shop=${idShop}`,
    updateThreadStatus: () => `&action=updateThreadStatus`,
    assignThread: () => `&action=assignThread`,
  }
};
