import produce from 'immer';
import { create } from 'zustand';
import { oc } from '../lib/opencord';

interface IAuthCode {
  authCode: string;
  accessTime: number;
  getCodeFormOC: () => Promise<string | undefined>;
}

export const useAuthCode = create<IAuthCode>((set) => {
  const getCodeFormOC = async () => {
    const { data } = await oc.getCode();
    if ((data?.code?.length ?? 0) === 0) {
      return;
    }
    set((state) => {
      return produce(state, (draft) => {
        draft.authCode = data?.code ?? '';
        draft.accessTime = new Date().getTime();
      });
    });
    return data?.code ?? '';
  };
  return {
    authCode: '',
    accessTime: 0,
    getCodeFormOC,
  };
});
