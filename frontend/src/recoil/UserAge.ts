import { atom } from 'recoil';

export const UserAge = atom<number | null>({
  key: 'UserAge',
  default: null,
});
