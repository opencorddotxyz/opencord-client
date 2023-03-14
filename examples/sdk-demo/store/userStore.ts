import produce from 'immer';
import { create } from 'zustand';

interface UserStoreProps {
  userId: string;
  channelId: string;
  serverId: string;
  address: string;
  currentFun: string;
  getLoginInfo: (params: {
    channelId: string;
    userId: string;
    address: string;
    serverId: string;
  }) => void;
  setCurrentFun: (currentFun: string) => void;
}

export const useUserStore = create<UserStoreProps>((set) => {
  const getLoginInfo = (params: {
    channelId: string;
    userId: string;
    address: string;
    serverId: string;
  }) => {
    set((state) => {
      return produce(state, (draft) => {
        draft.address = params.address;
        draft.channelId = params.channelId;
        draft.serverId = params.serverId;
        draft.userId = params.userId;
      });
    });
  };

  const setCurrentFun = (currentFun: string) => {
    set({ currentFun });
  };

  return {
    currentFun: '',
    address: '',
    userId: '',
    channelId: '',
    serverId: '',
    getLoginInfo,
    setCurrentFun,
  };
});
