import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() do shadcn: os componentes do Magic UI instalados pela CLI importam daqui
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
