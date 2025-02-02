import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (type: Notification['type'], message: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: Notification['type'], message: string) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      {/* Notification container */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg max-w-sm ${
              notification.type === 'success' ? 'bg-green-100 text-green-800' :
              notification.type === 'error' ? 'bg-red-100 text-red-800' :
              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}
          >
            <div className="flex justify-between items-center">
              <p>{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 