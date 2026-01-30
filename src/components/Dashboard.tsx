import React from 'react';
import DashboardHome from './sections/DashboardHome';
import ConversationsSection from './sections/ConversationsSection';
import PermissionsSection from './sections/PermissionsSection';
import SettingsSection from './sections/SettingsSection';

interface DashboardProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Dashboard({ activeSection, onNavigate }: DashboardProps) {
  return (
    <div className="p-8 min-h-screen">
      {activeSection === 'dashboard' && <DashboardHome onNavigate={onNavigate} />}
      {activeSection === 'whatsapp' && <ConversationsSection filterType="whatsapp" />}
      {activeSection === 'email' && <ConversationsSection filterType="email" />}
      {activeSection === 'chatweb' && <ConversationsSection filterType="chatweb" />}
      {activeSection === 'permissions' && <PermissionsSection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  );
}
