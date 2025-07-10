import { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
    id: number;
    type: "info" | "success" | "error";
    message: string;
};

type ToastContextType = {
    showToast: (type: Toast["type"], message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

const alertClassMap: Record<Toast["type"], string> = {
    info: "alert-info",
    success: "alert-success",
    error: "alert-error",
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: Toast["type"], message: string) => {
        const id = toastId++;
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="z-50 toast toast-end">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`alert ${
                            alertClassMap[toast.type]
                        } shadow-lg`}
                    >
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
