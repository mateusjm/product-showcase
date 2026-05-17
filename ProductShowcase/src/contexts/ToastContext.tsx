import type { CSSProperties, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaStar } from "react-icons/fa";
import { HiExclamationCircle, HiInformationCircle, HiX } from "react-icons/hi";

const TOAST_DURATION_MS = 2800;

type ToastType = "info" | "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  toast: Toast | null;
  showToast: (message: string, type?: ToastType) => void;
  clearToast: () => void;
}

const toastStyles: Record<
  ToastType,
  {
    container: string;
    iconWrap: string;
    progress: string;
  }
> = {
  success: {
    container:
      "border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-white text-emerald-950 shadow-emerald-500/15",
    iconWrap: "bg-emerald-100 text-emerald-600",
    progress: "bg-emerald-500",
  },
  error: {
    container:
      "border-red-200/80 bg-gradient-to-r from-red-50 to-white text-red-950 shadow-red-500/15",
    iconWrap: "bg-red-100 text-[var(--color-poke-red)]",
    progress: "bg-[var(--color-poke-red)]",
  },
  info: {
    container:
      "border-blue-200/80 bg-gradient-to-r from-blue-50 to-white text-slate-900 shadow-blue-500/15",
    iconWrap: "bg-blue-100 text-[var(--color-poke-blue)]",
    progress: "bg-[var(--color-poke-blue)]",
  },
};

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") return <FaStar className="text-base" />;
  if (type === "error") return <HiExclamationCircle className="text-xl" />;
  return <HiInformationCircle className="text-xl" />;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: null,
  showToast: () => {},
  clearToast: () => {},
});

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }
  return context;
}

function ToastNotification({
  toast,
  exiting,
  onDismiss,
}: {
  toast: Toast;
  exiting: boolean;
  onDismiss: () => void;
}) {
  const style = toastStyles[toast.type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-[4.75rem] right-4 z-[100] w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-2xl border shadow-xl backdrop-blur-md sm:right-6 ${style.container} ${
        exiting ? "animate-toast-out" : "animate-toast-in"
      }`}
      style={{ "--toast-duration": `${TOAST_DURATION_MS}ms` } as CSSProperties}
    >
      <div className="flex items-start gap-3 px-4 py-3.5 pr-3">
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.iconWrap}`}
        >
          <ToastIcon type={toast.type} />
        </span>

        <p className="m-0 flex-1 pt-1.5 text-sm font-medium leading-snug">
          {toast.message}
        </p>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar notificação"
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-black/5 hover:text-slate-600"
        >
          <HiX className="text-lg" />
        </button>
      </div>

      <div
        className={`h-1 origin-left ${style.progress} ${exiting ? "" : "animate-toast-progress"}`}
      />
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [exiting, setExiting] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const idRef = useRef(0);
  const toastRef = useRef<Toast | null>(null);

  toastRef.current = toast;

  const dismiss = useCallback(() => {
    if (!toastRef.current) return;

    setExiting(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
      setExiting(false);
      exitTimeoutRef.current = null;
    }, 250);
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

      idRef.current += 1;
      setExiting(false);
      setToast({ id: idRef.current, message, type });

      timeoutRef.current = window.setTimeout(dismiss, TOAST_DURATION_MS);
    },
    [dismiss],
  );

  const clearToast = useCallback(() => {
    dismiss();
  }, [dismiss]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, clearToast }}>
      {children}

      {toast && (
        <ToastNotification
          toast={toast}
          exiting={exiting}
          onDismiss={clearToast}
        />
      )}
    </ToastContext.Provider>
  );
}
