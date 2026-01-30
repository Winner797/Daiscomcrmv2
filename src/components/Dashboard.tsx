import React from 'react';
import DashboardHome from './sections/DashboardHome';
import ConversationsSection from './sections/ConversationsSection';
import NotificationsSection from './sections/NotificationsSection';
import ContactsSection from './sections/ContactsSection';
import GroupsSection from './sections/GroupsSection';
import TemplatesSection from './sections/TemplatesSection';
import AnalyticsSection from './sections/AnalyticsSection';
import AutomationSection from './sections/AutomationSection';
import CompanyNumbersSection from './sections/CompanyNumbersSection';
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
      {activeSection === 'notifications' && <NotificationsSection />}
      {activeSection === 'contacts' && <ContactsSection />}
      {activeSection === 'groups' && <GroupsSection />}
      {activeSection === 'templates' && <TemplatesSection />}
      {activeSection === 'analytics' && <AnalyticsSection />}
      {activeSection === 'automation' && <AutomationSection />}
      {activeSection === 'company-numbers' && <CompanyNumbersSection />}
      {activeSection === 'permissions' && <PermissionsSection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  );
}
