import { useState, useCallback } from "react";

interface ModalState<T = unknown> {
  isOpen: boolean;
  data: T | null;
}

interface UseModalReturn<T = unknown> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
}

export function useModal<T = unknown>(): UseModalReturn<T> {
  const [modalState, setModalState] = useState<ModalState<T>>({
    isOpen: false,
    data: null,
  });

  const open = useCallback((data?: T) => {
    setModalState({
      isOpen: true,
      data: data || null,
    });
  }, []);

  const close = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    // Clear data after animation
    setTimeout(() => {
      setModalState((prev) => ({ ...prev, data: null }));
    }, 300);
  }, []);

  return {
    isOpen: modalState.isOpen,
    data: modalState.data,
    open,
    close,
  };
}
