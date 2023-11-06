import { create } from "zustand";

interface ConfettiStore {
  active: boolean;
  toggle: () => void;
}

const useConfetti = create<ConfettiStore>((set) => ({
  active: false,
  toggle: () => {
    set((state) => ({ active: true }));
    setTimeout(() => {
      set((state) => ({ active: false }));
    }, 7500);
  },
}));

export default useConfetti;
