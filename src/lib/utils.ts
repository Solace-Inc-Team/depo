// junta classes (o que os ícones da lucide-animated esperam de "@/lib/utils"), sem trazer clsx e tailwind-merge
export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");
