import { z } from "zod";
import { formatarTelefone, telefoneValido } from "@/lib/mascara";

// telefone: a mesma regra da máscara da tela; guarda sempre como (11) 91111-1111, venha como vier
export const telefoneSchema = z
  .string()
  .trim()
  .max(30, "Telefone muito longo.")
  .refine(telefoneValido, "Telefone com DDD, como (11) 91111-1111.")
  .transform(formatarTelefone);
