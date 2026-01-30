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
    <div className="h-screen overflow-hidden">
      {activeSection === 'dashboard' && <DashboardHome onNavigate={onNavigate} />}
      {activeSection === 'conversations' && <ConversationsSection filterType="all" />}
      {activeSection === 'whatsapp' && <ConversationsSection filterType="whatsapp" />}
      {activeSection === 'messenger' && <ConversationsSection filterType="messenger" />}
      {activeSection === 'email' && <ConversationsSection filterType="email" />}
      {activeSection === 'permissions' && <PermissionsSection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  );
}
