import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getCompanies } from "../../requests";
import { GetCompaniesParams, GetCompaniesResponse } from "../../types";

export const useGetCompanies = (params: GetCompaniesParams) =>
  useQuery<GetCompaniesResponse, AxiosError>({
    queryFn: () => getCompanies(params),
    queryKey: ["get-companies", params],
  });
