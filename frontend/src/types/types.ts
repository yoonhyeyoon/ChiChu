import internal from 'stream';

export type PlanCardType = {
  logo_img: string;
  brand_name: string;
  plan_name: string;
  plan_type: string;
  plan_cost: string;
};

export type ProgressBarType = {
  value: number;
};

export type QuestionModalType = {
  title: string;
  text: string;
};
