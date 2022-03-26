export type PlanPreviewType = {
  logo_img: string;
  brand_name: string;
  plan_name: string;
  plan_type: string;
  plan_cost: string;
  plan_score: number;
  moving?: boolean;
};

export type ProgressBarWithNumberType = {
  plan_score: number;
  plan_average: number;
};
