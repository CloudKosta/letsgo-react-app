import { CheckCircle2, XCircle } from "lucide-react";
import { useToastStore } from "../../store/toastStore";
import "./Toaster.css";

/** 앱 전역 토스트 표시 영역. PhoneLayout 루트에 한 번만 마운트한다. */
export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="toaster">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`toast toast-${t.type}`}
          onClick={() => dismiss(t.id)}
        >
          {t.type === "success" ? (
            <CheckCircle2 className="toast-icon" />
          ) : (
            <XCircle className="toast-icon" />
          )}
          <span className="toast-message">{t.message}</span>
        </button>
      ))}
    </div>
  );
}
