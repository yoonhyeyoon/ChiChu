import { atom } from 'recoil';

export const UserAge = atom<number | null>({
  key: 'UserAge',
  default: null,
});

// 뒤로가기해도 그대로 보일 수 있게
export const UserBirthDate = atom<string | undefined>({
  key: 'UserBirthDate',
  default: undefined,
});
