/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { loginSchema } from "../validators";
import { useAuth } from "../../../context";

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      );
      const token = response.data.token; // Supondo que a API retorna um token
      login(token);
    } catch (_) {
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input type="text" {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
