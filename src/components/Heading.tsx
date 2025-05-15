import type { HeadingProps } from "@/types/Index";

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="flex flex-col items-centerjustify-center w-full py-8 space-y-2 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
        {title}
      </h1>
      <h3 className="text-lg font-medium text-white">{subtitle}</h3>
    </div>
  );
};

export default Heading;
