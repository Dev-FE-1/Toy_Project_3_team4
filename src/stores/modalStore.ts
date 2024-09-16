import create from 'zustand';

type ModalStore = {
  openModals: string[];
  openModal: (modalType: string) => void;
  closeModal: (modalType: string) => void;
  closeAllModals: () => void;
  isAnyModalOpen: () => boolean;
};

export const useModalStore = create<ModalStore>((set, get) => ({
  openModals: [],
  openModal: (modalId) => {
    set((state) => ({ openModals: [...state.openModals, modalId] }));
  },
  closeModal: (modalId) => {
    set((state) => ({ openModals: state.openModals.filter((id) => id !== modalId) }));
  },
  closeAllModals: () => set({ openModals: [] }),
  isAnyModalOpen: () => get().openModals.length > 0,
}));
