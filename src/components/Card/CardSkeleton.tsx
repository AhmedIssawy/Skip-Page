import { Skeleton } from "../ui/skeleton";
const CardSkeleton = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div
    className={`rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto transition-all duration-300 hover:shadow-xl border ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Skeleton className="h-16 rounded-md" />
        <Skeleton className="h-16 rounded-md" />
      </div>
      <div className="pt-2">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  </div>
);

export default CardSkeleton;