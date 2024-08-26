import { createWithEqualityFn, useStoreWithEqualityFn } from 'zustand/traditional';

export interface Toast {
  id: string;
  message: string;
  show: boolean;
  transitionToActive: boolean;
  positionIndex: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
  transitionToast: (id: string) => void;
  setToasts: (toasts: Toast[]) => void;
}

const TOAST_REMOVE_DELAY = 3000;

const toastStore = createWithEqualityFn<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message: string) => {
    const id = genId();
    const newToast: Toast = {
      id,
      message,
      show: true,
      transitionToActive: false,
      positionIndex: 0,
    };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      get().transitionToast(id);
      get().removeToast(id);
    }, TOAST_REMOVE_DELAY);
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  transitionToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, show: false, transitionToActive: true } : toast,
      ),
    }));
  },
  setToasts: (toasts: Toast[]) => {
    set({ toasts });
  },
}));

export const useToastStore = <T>(selector: (state: ToastStore) => T) =>
  useStoreWithEqualityFn(toastStore, selector);

const genId = (() => {
  let count = 0;
  return () => {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
  };
})();
