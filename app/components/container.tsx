import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Container({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        className,
        "min-h-screen flex flex-col items-center justify-center p-4",
      )}
      {...props}
    >
      {children}
    </div>
  );
}
