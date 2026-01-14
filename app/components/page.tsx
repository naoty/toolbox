import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function Container({ children, className, ...props }: ComponentProps<"div">) {
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

function Header({ children, className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={twMerge(className, "w-full max-w-2xl mx-auto")}
      {...props}
    >
      {children}
    </header>
  );
}

function Body({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        className,
        "w-full flex-grow flex items-center justify-center",
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Main({ children, className, ...props }: ComponentProps<"main">) {
  return (
    <main
      className={twMerge(
        className,
        "w-full max-w-2xl p-4 space-y-6 bg-white shadow-sm border border-slate-200",
      )}
      {...props}
    >
      {children}
    </main>
  );
}

export const Page = {
  Container,
  Header,
  Body,
  Main,
};
