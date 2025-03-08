import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// Toast types
type ToastType = 'success' | 'error' | 'info';

// Toast message structure
interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Context to manage toasts globally
interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Container component
interface ToastContainerProps {
  toasts: Toast[];
  hideToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  hideToast,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Individual Toast component
interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  // Icon based on toast type
  const IconComponent = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  // Background color based on toast type
  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'info':
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center p-3 rounded-lg shadow-md border ${getBgColor()} min-w-80 max-w-md`}>
      <IconComponent />
      <div className="ml-3 mr-6 text-sm">{toast.message}</div>
      <button
        onClick={onClose}
        className="ml-auto p-1 rounded-full hover:bg-gray-200">
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </motion.div>
  );
};
