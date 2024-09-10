import { AxiosRequestConfig } from "axios";

export type GetCompaniesParams = {
  config?: AxiosRequestConfig<unknown>;
};

export type GetCompaniesResponse = {
  companies: Company[];
  listed_items: number;
  total_items: number;
};

export type Company = {
  cnae: string;
  cnpj: string;
  id: number;
  legal_name: string;
  trade_name: string;
};
