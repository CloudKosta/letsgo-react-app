import { create } from 'zustand';

interface ToastState {
    isOpen: boolean;
    message: string;
    showToast: (message: string) => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set, get) => {
    let timeoutId: any = null;

    return {
        isOpen: false,
        message: '',
        showToast: (message) => {
            if (timeoutId) clearTimeout(timeoutId);
            set({ isOpen: true, message });
            timeoutId = setTimeout(() => {
                get().hideToast();
            }, 2000);
        },
        hideToast: () => set({ isOpen: false, message: '' }),
    };
});
