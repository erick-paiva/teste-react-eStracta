import { z } from "zod";

const required_error = "Este campo é obrigatório";

export const loginSchema = z.object({
  username: z.string({ required_error }),
  password: z
    .string({ required_error })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});
