import { atom, useAtom } from "jotai";

export const mobileSidebarAtom = atom(false);

// Actions
export const useMobileSidebar = () => {
  const [isOpen, setIsOpen] = useAtom(mobileSidebarAtom);

  return {
    isOpen,
    openSidebar: () => setIsOpen(true),
    closeSidebar: () => setIsOpen(false),
    toggleSidebar: () => setIsOpen((prev: boolean) => !prev),
  };
};
