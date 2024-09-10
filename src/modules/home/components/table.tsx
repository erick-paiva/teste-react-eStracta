import React, { ChangeEvent, MouseEvent, useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
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
  const { setSearchParams, getSearchParam } = useFilters();

  const name = getSearchParam("name") ?? "";

  const pageSize = Number(getSearchParam("pageSize") ?? "25");

  const pageIndex = Number(getSearchParam("pageIndex") ?? "0");

  const { data, isPending } = useGetCompanies({
    config: {
      params: {
        ...(name && { name }),
        ...(pageIndex && !name && { start: pageIndex * pageSize }),
        limit: pageSize,
      },
    },
  });

  const totalItems = data?.total_items ?? 0;

  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      { accessorKey: "legal_name", header: "Nome Razão" },
      { accessorKey: "trade_name", header: "Nome Fantasia" },
      { accessorKey: "cnae", header: "CNAE" },
      {
        accessorKey: "cnpj",
        header: "CNPJ",
        cell: (info) => Mask.formatCNPJ(String(info.getValue())),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data?.companies ?? [],
    columns,

    getCoreRowModel: getCoreRowModel(),
    // getSortedRowModel: getSortedRowModel(),
  });

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

  const debouncedChangeHandler = debounce((value) => {
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
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        fontWeight: "bold",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#fff",
                        zIndex: 1,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <TableSortLabel
                          active={!!header.column.getIsSorted()}
                          direction={
                            header.column.getIsSorted() === "desc"
                              ? "desc"
                              : "asc"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableSortLabel>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
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
