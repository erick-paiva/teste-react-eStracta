import axios from "@/lib/axios";
import { GetCompaniesParams, GetCompaniesResponse } from "./types";

export const getCompanies = async ({
  config,
}: GetCompaniesParams): Promise<GetCompaniesResponse> =>
  await axios.authorized().get(`/companies`, config);
