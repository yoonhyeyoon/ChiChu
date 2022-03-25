import { atom } from 'recoil';

import { PlanPreviewType } from '../types/types';
import sample from '../components/SearchResult/sample.json';

export const planListState = atom<PlanPreviewType[]>({
  key: 'planListState',
  default: sample,
});
