import { twMerge } from "tailwind-merge";

export function Header({
  children,
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={twMerge(className, "w-full max-w-2xl mx-auto")}
      {...props}
    >
      {children}
    </header>
  );
}
