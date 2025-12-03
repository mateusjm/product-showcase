import { createContext, useState, useRef } from "react";
import type { ReactNode } from "react";

interface Toast {
  message: string;
  type?: "info" | "success" | "error";
}

interface ToastContextProps {
  toast: Toast | null;
  showToast: (message: string, type?: Toast["type"]) => void;
  clearToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: null,
  showToast: () => {},
  clearToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<number | null>(null);

  function showToast(message: string, type: Toast["type"] = "info") {
    setToast({ message, type });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, 2500);
  }

  function clearToast() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(null);
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, clearToast }}>
      {children}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg shadow-lg bg-blue-600 text-white text-lg animate-fade ">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
