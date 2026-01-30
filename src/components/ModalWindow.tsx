import React from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface ModalWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export default function ModalWindow({ id, title, children, onClose, isMinimized, onToggleMinimize }: ModalWindowProps) {
  return (
    <div
      className={`fixed bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 z-50 ${
        isMinimized ? 'w-80 h-14' : 'w-[90vw] h-[85vh]'
      }`}
      style={{
        top: isMinimized ? 'auto' : '50%',
        left: isMinimized ? 'auto' : '50%',
        bottom: isMinimized ? '20px' : 'auto',
        right: isMinimized ? '20px' : 'auto',
        transform: isMinimized ? 'none' : 'translate(-50%, -50%)',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="flex items-center gap-2">
          {onToggleMinimize && (
            <button
              onClick={onToggleMinimize}
              className="p-1 hover:bg-blue-500 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}
