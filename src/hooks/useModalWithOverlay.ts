import { useCallback } from 'react';

import { useModalStore } from '@/stores/modalStore';

export const useModalWithOverlay = (modalType: string, identifier?: string) => {
  const { openModals, openModal, closeModal } = useModalStore();

  const isOpen = openModals.includes(`${modalType}-${identifier}`);

  const open = useCallback(() => {
    openModal(`${modalType}-${identifier}`);
  }, [modalType, identifier, openModal]);

  const close = useCallback(() => {
    closeModal(`${modalType}-${identifier}`);
  }, [modalType, identifier, closeModal]);

  return { isOpen, open, close };
};
