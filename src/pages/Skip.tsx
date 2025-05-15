import { memo } from "react";
// Redux
import { CardComponent } from "@/components/Card/Card";
import { useGetProductsQuery } from "@/app/api/productApiSlice";
// Components
import Heading from "@/components/Heading";
import CardSkeleton from "@/components/Card/CardSkeleton";
import CardError from "@/components/Card/CardError";

function SkipPage({ isDarkMode }: { isDarkMode: boolean }) {
  const { data = [], isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <Heading
        title="Choose Your Skip Size"
        subtitle="Select the skip size that best suits your needs"
      />

      <div className="flex justify-center items-center w-full h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8 w-full max-w-6xl mx-auto">
          {isLoading &&
            Array.from({ length: 9 }).map((_, i) => (
              <CardSkeleton key={i} isDarkMode={isDarkMode} />
            ))}

          {!isLoading &&
            !isError &&
            data.map((product) => (
              <CardComponent
                key={product.id}
                isLoading={false}
                isError={false}
                data={product}
                isDarkMode={isDarkMode}
              />
            ))}

          {!isLoading && isError && <CardError isDarkMode={isDarkMode} />}
        </div>
      </div>
    </>
  );
}

const Skip = memo(SkipPage);
export default Skip;
