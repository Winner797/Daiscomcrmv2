import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ModalWindow from './components/ModalWindow';
import ConversationsSection from './components/sections/ConversationsSection';
import WhatsAppSection from './components/sections/WhatsAppSection';
import EmailSection from './components/sections/EmailSection';
import ChatWebSection from './components/sections/ChatWebSection';

interface OpenWindow {
  id: string;
  type: 'whatsapp' | 'email' | 'chatweb' | 'conversations';
  title: string;
  isMinimized: boolean;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);

  const handleSectionChange = (section: string) => {
    if (section === 'whatsapp' || section === 'email' || section === 'chatweb') {
      const windowExists = openWindows.find(w => w.type === section);
      if (!windowExists) {
        const titles = {
          whatsapp: 'WhatsApp - Todas las conversaciones',
          email: 'Email - Todas las conversaciones',
          chatweb: 'Chat Web - Todas las conversaciones'
        };
        setOpenWindows([...openWindows, {
          id: `${section}-${Date.now()}`,
          type: section as 'whatsapp' | 'email' | 'chatweb',
          title: titles[section as keyof typeof titles],
          isMinimized: false
        }]);
      }
    } else {
      setActiveSection(section);
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const toggleMinimize = (id: string) => {
    setOpenWindows(openWindows.map(w =>
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const renderWindowContent = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <WhatsAppSection />;
      case 'email':
        return <EmailSection />;
      case 'chatweb':
        return <ChatWebSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <Dashboard activeSection={activeSection} />
      </main>

      {openWindows.map((window) => (
        <ModalWindow
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          isMinimized={window.isMinimized}
          onToggleMinimize={() => toggleMinimize(window.id)}
        >
          {renderWindowContent(window.type)}
        </ModalWindow>
      ))}
    </div>
  );
}

export default App;
