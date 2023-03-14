import { create } from 'zustand';

interface FunStoreProps {
  currentFun: string;
  setCurrentFun: (currentFun: string) => void;
}

export const useFunStore = create<FunStoreProps>((set) => {
  const setCurrentFun = (currentFun: string) => {
    set({ currentFun });
  };

  return {
    currentFun: '',
    setCurrentFun,
  };
});
