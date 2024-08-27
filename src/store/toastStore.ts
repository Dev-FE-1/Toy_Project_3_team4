import { createWithEqualityFn, useStoreWithEqualityFn } from 'zustand/traditional';

export interface ToastModel {
  id: string;
  message: string;
  show: boolean;
  transitionToActive: boolean;
  positionIndex: number;
}

interface ToastStore {
  toasts: ToastModel[];
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
  transitionToast: (id: string) => void;
  setToasts: (toasts: ToastModel[]) => void;
}

const TOAST_REMOVE_DELAY = 3000;

const toastStore = createWithEqualityFn<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message: string) => {
    const id = generateToastId();
    const newToast: ToastModel = {
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
  setToasts: (toasts: ToastModel[]) => {
    set({ toasts });
  },
}));

export const useToastStore = <T>(selector: (state: ToastStore) => T) =>
  useStoreWithEqualityFn(toastStore, selector);

const generateToastId = (() => {
  let count = 0;
  return () => {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
  };
})();
