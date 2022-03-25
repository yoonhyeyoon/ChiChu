export type PlanPreviewType = {
  logo_img: string;
  brand_name: string;
  plan_name: string;
  plan_type: string;
  plan_cost: string;
  plan_score: number;
};

export interface PlanTagType {
  id: number;
  plan_tag: string;
}
