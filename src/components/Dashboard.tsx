import React from 'react';
import DashboardHome from './sections/DashboardHome';
<<<<<<< HEAD
import ConversationsSection from './sections/ConversationsSection';
import WhatsAppSection from './sections/WhatsAppSection';
=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
import ChatWebSection from './sections/ChatWebSection';
import EmailSection from './sections/EmailSection';
import PermissionsSection from './sections/PermissionsSection';
import SettingsSection from './sections/SettingsSection';

interface DashboardProps {
  activeSection: string;
}

export default function Dashboard({ activeSection }: DashboardProps) {
<<<<<<< HEAD
  const isFullHeight = ['conversations', 'whatsapp', 'emails', 'chatweb'].includes(activeSection);

  return (
    <div className={isFullHeight ? '' : 'p-8 min-h-screen'}>
      {activeSection === 'dashboard' && <DashboardHome />}
      {activeSection === 'conversations' && <ConversationsSection />}
      {activeSection === 'whatsapp' && <WhatsAppSection />}
=======
  return (
    <div className="p-8 min-h-screen">
      {activeSection === 'dashboard' && <DashboardHome />}
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
      {activeSection === 'chatweb' && <ChatWebSection />}
      {activeSection === 'emails' && <EmailSection />}
      {activeSection === 'permissions' && <PermissionsSection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  );
}
