import type React from "react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function Root({ children, ...props }: ComponentProps<"nav">) {
  return (
    <nav {...props} aria-label="パンくずリスト">
      {children}
    </nav>
  );
}

function List({ children, className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={twMerge(
        className,
        "flex flex-row items-center gap-x-2 text-sm text-slate-500",
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

function Item({ children, ...props }: ComponentProps<"li">) {
  return <li {...props}>{children}</li>;
}

function CurrentItem({ children, ...props }: ComponentProps<"li">) {
  return (
    <li className="text-slate-800" aria-current="page" {...props}>
      {children}
    </li>
  );
}

function Link({
  children,
}: {
  children: ({ className }: { className?: string }) => React.ReactNode;
}) {
  return children({ className: "transition-colors hover:text-slate-700" });
}

function Separator() {
  return <li className="text-slate-300">/</li>;
}

export const Breadcrumb = {
  Root,
  List,
  Item,
  CurrentItem,
  Link,
  Separator,
};
