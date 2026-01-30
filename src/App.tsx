import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <Dashboard activeSection={activeSection} />
      </main>
    </div>
  );
}

export default App;
