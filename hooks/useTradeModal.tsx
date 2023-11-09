import { create } from "zustand";

interface TradeModalStore {
  active: boolean;
  toggle: (toggleOption: boolean) => void;
}

const useTradeModal = create<TradeModalStore>((set) => ({
  active: false,
  toggle: (toggleOption: boolean) => {
    set((state) => ({ active: toggleOption }));
  },
}));

export default useTradeModal;
