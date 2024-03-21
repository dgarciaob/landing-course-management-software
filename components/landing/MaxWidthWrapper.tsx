import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
