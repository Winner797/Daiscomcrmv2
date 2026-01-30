import React from 'react';
import DashboardHome from './sections/DashboardHome';
import PermissionsSection from './sections/PermissionsSection';
import SettingsSection from './sections/SettingsSection';

interface DashboardProps {
  activeSection: string;
}

export default function Dashboard({ activeSection }: DashboardProps) {
  return (
    <div className="p-8 min-h-screen">
      {activeSection === 'dashboard' && <DashboardHome />}
      {activeSection === 'permissions' && <PermissionsSection />}
      {activeSection === 'settings' && <SettingsSection />}
    </div>
  );
}
