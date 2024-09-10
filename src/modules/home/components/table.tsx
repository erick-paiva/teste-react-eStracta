import React, { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
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
} from "@mui/material";
import { Mask } from "@/utils";

// Mock de dados
const mock = {
  companies: [
    {
      cnae: "62010",
      cnpj: "37858684000177",
      id: 2,
      legal_name: "Acme Corp 22",
      trade_name: "Acme",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
    {
      cnae: "62010",
      cnpj: "55113070000148",
      id: 1,
      legal_name: "Acme Corp 4",
      trade_name: "Acme 4",
    },
  ],
  listed_items: 2,
  total_items: 2,
};

interface Company {
  cnae: string;
  cnpj: string;
  id: number;
  legal_name: string;
  trade_name: string;
}

const Table: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtro para busca por nome fantasia ou razão social
  const filteredData = useMemo(() => {
    if (!searchTerm) return mock.companies;
    return mock.companies.filter(
      (company) =>
        company.legal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.trade_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ maxWidth: "90%" }}
      />
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        style={{ background: "#f0f0f0a4", width: "100%" }}
        count={mock.total_items}
        page={pageIndex}
        onPageChange={(_event, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
        rowsPerPageOptions={[25, 30]}
        labelRowsPerPage="Linhas por página"
      />
    </Paper>
  );
};

export default Table;
