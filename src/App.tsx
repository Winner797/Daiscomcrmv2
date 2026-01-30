<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { websocketService } from './services/websocket.service';
=======
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

<<<<<<< HEAD
  useEffect(() => {
    websocketService.connect();

    return () => {
      websocketService.disconnect();
    };
  }, []);

=======
>>>>>>> 2eb68f7df882a0a1b2a455bd4dcf0bf49cceeb55
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
