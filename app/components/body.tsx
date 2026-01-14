import { twMerge } from "tailwind-merge";

export function Body({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
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
