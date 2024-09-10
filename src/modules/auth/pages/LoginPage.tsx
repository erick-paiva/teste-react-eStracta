import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { loginSchema } from "../validators";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import { useLoginWithUsernameAndPassword } from "@/api";

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const { mutate, isPending } = useLoginWithUsernameAndPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    mutate(data, {
      onSuccess: (response) => {
        const token = response.token;
        login(token);
        toast.success("Login feito com sucesso!", { autoClose: 1000 });
      },
      onError: () => {
        toast.error("Nome do usuário ou senha incorretos!", {
          autoClose: 1500,
        });
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Login gerenciamento de empresas
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Nome do usuário"
              margin="normal"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isPending}
              >
                {isPending ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
