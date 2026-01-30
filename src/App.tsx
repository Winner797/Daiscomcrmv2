import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('conversations');

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-hidden">
        <Dashboard activeSection={activeSection} onNavigate={setActiveSection} />
      </main>
    </div>
  );
}

export default App;
