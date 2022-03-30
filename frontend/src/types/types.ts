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

export interface PlanTagType {
  id: number;
  plan_tag: string;
}

// planList selector

export type ProductType = {
  product_code: string;
  product_name: string;
  company_code: number;
  company_name: string;
  subtype_code: number;
  rate: number;
  option_code: string[];
  option_name: string[];
  moving?: boolean;
};

export type PlanListType = {
  cheap: ProductType[];
  chichu: ProductType[];
  coverage: ProductType[];
  popular: ProductType[];
  reasonable: ProductType[];
};

export type PlanDataType = {
  data: PlanListType;
  cheap: ProductType[];
  chichu: ProductType[];
  coverage: ProductType[];
  popular: ProductType[];
  reasonable: ProductType[];
};
