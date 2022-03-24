import { atom } from 'recoil';

export const UserGender = atom<number | null>({
  key: 'UserGender',
  default: null,
});
