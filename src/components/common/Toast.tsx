import { useToastStore } from '../../store/toastStore';
import './Toast.css';

export default function Toast() {
    const { isOpen, message } = useToastStore();

    if (!isOpen) return null;

    return (
        <div className="toast-wrapper">
            <div className="toast-content">
                {message}
            </div>
        </div>
    );
}
