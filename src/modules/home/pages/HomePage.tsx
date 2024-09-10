import { Box } from "@mui/material";
import Table from "../components/table";

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <h1>Tabela de empresas</h1>
      <Table />
    </Box>
  );
};
