export type PlanPreviewType = {
  logo_img: string;
  brand_name: string;
  plan_name: string;
  plan_type: string;
  plan_cost: string;
  plan_score: number;
  moving?: boolean;
};

export type PlanPickerType = {
  product_name: string;
  product_code: string;
  company_code: string;
  company_name: string;
};

export type ComparisonTableCompanyType = {
  product_code: string;
  company_code: string;
  company_name: string;
  total_index: number;
};

export type ComparisonTableRowType = {
  option_code: string;
  option_name: string;
  product_code: string[];
  coverage: string[];
};

export type ComparisonTableType = {
  company: PlanPickerType[];
  치츄지수: { product_code: string; total_index: number }[];
  치아보철치료: ComparisonTableRowType[];
  치아보전치료: ComparisonTableRowType[];
  치수치료: ComparisonTableRowType[];
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
  company_code: string;
  company_name: string;
  subtype_code: number;
  rate: number;
  py: number;
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
