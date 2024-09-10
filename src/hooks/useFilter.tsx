import { useLocation, useNavigate } from "react-router-dom";

type UseFiltersReturn = {
  getSearchParam: (param: string) => string | null;
  getAllSearchParam: () => Record<string, string | string[]>;
  getAllValuesFromParam: (param: string) => string[] | null;
  setSearchParams: (param: string, value?: string) => void;
  setMultipleSearchParams: (
    params: Array<Record<string, string | string[]>>
  ) => void;
  cleanSearchParams: () => void;
};

export const useFilters = (): UseFiltersReturn => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const getSearchParam = (param: string): string | null =>
    searchParams.get(param);

  const getAllValuesFromParam = (param: string): string[] | null => {
    const values = searchParams.getAll(param);
    return values.length > 0 ? values : null;
  };

  const getAllSearchParam = (): Record<string, string | string[]> =>
    Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

  const setSearchParams = (param: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    ); // `replace: true` para evitar criar um novo histórico de navegação
  };

  const setMultipleSearchParams = (
    values: Array<Record<string, string | string[]>>
  ) => {
    const params = new URLSearchParams(searchParams);

    values.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            const paramExists = params.getAll(key).includes(item);
            if (!paramExists) {
              params.append(key, item);
            }
          });
        } else {
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        }
      });
    });

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  const cleanSearchParams = () => {
    navigate(
      {
        pathname: location.pathname,
        search: "",
      },
      { replace: true }
    );
  };

  return {
    getSearchParam,
    getAllSearchParam,
    setSearchParams,
    setMultipleSearchParams,
    cleanSearchParams,
    getAllValuesFromParam,
  };
};
