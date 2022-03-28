export type PlanPreviewType = {
  logo_img: string;
  brand_name: string;
  plan_name: string;
  plan_type: string;
  plan_cost: string;
  plan_score: number;
  moving?: boolean;
};

export type ComparisonTableRowType = {
  option_name: string;
  coverage: string[];
};

export type ComparisonTableType = {
  치아보철치료비?: ComparisonTableRowType[];
  치아보존치료비?: ComparisonTableRowType[];
  치수치료비?: ComparisonTableRowType[];
};

export type ProgressBarWithNumberType = {
  plan_score: number;
  plan_average: number;
};

export interface PlanTagType {
  id: number;
  plan_tag: string;
}
