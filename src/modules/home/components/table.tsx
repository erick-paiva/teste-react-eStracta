import React, { ChangeEvent, MouseEvent } from "react";
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  CircularProgress,
} from "@mui/material";
import { debounce, Mask } from "@/utils";
import { useGetCompanies } from "../api";
import { useFilters } from "@/hooks";

interface Company {
  cnae: string;
  cnpj: string;
  id: number;
  legal_name: string;
  trade_name: string;
}

const Table: React.FC = () => {
  const { setSearchParams, getSearchParam, setMultipleSearchParams } =
    useFilters();

  const sort = getSearchParam("sort") || "legal_name";
  const dir = (getSearchParam("dir") as "asc" | "desc") || "asc";

  const name = getSearchParam("name") ?? "";
  const pageSize = Number(getSearchParam("pageSize") ?? "25");
  const pageIndex = Number(getSearchParam("pageIndex") ?? "0");

  const { data, isPending } = useGetCompanies({
    config: {
      params: {
        ...(name && { name }),
        ...(pageIndex && !name && { start: pageIndex * pageSize }),
        limit: pageSize,
        sort,
        dir,
      },
    },
  });

  const totalItems = data?.total_items ?? 0;

  const handleSort = (column: string) => {
    const isAsc = sort === column && dir === "asc";
    const newOrder = isAsc ? "desc" : "asc";

    setMultipleSearchParams([
      {
        sort: column,
        dir: newOrder,
      },
    ]);
  };

  const onRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchParams("pageSize", event.target.value);
  };

  const onPageChange = (
    _event: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setSearchParams("pageIndex", page.toString());
  };

  const debouncedChangeHandler = debounce((value: string) => {
    setSearchParams("name", value);
  }, 500);

  const handleSearch = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    debouncedChangeHandler(value);
  };

  return (
    <Paper
      style={{
        width: "90%",
        maxHeight: "85%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Buscar por Nome Fantasia ou Nome Razão"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={name}
        onChange={handleSearch}
        style={{ maxWidth: "90%" }}
      />
      {isPending ? (
        <CircularProgress />
      ) : (
        <TableContainer style={{ overflow: "auto", maxHeight: "40rem" }}>
          <MuiTable stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sort === "legal_name"}
                    direction={sort === "legal_name" ? dir : "asc"}
                    onClick={() => handleSort("legal_name")}
                  >
                    Nome Razão
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort === "trade_name"}
                    direction={sort === "trade_name" ? dir : "asc"}
                    onClick={() => handleSort("trade_name")}
                  >
                    Nome Fantasia
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort === "cnae"}
                    direction={sort === "cnae" ? dir : "asc"}
                    onClick={() => handleSort("cnae")}
                  >
                    CNAE
                  </TableSortLabel>
                </TableCell>
                <TableCell>CNPJ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.companies.map((company: Company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.legal_name}</TableCell>
                  <TableCell>{company.trade_name}</TableCell>
                  <TableCell>{company.cnae}</TableCell>
                  <TableCell>{Mask.formatCNPJ(company.cnpj)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      )}
      {totalItems === 0 && !isPending && <h2>Sem dados</h2>}
      <TablePagination
        component="div"
        style={{ background: "#f0f0f0a4", width: "100%" }}
        count={totalItems}
        page={pageIndex}
        onPageChange={onPageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[25, 30]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais do que ${to}`}`
        }
        labelRowsPerPage="Linhas por página"
      />
    </Paper>
  );
};

export default Table;
