// Redux
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { clearCart } from "../app/features/cart/CartSlice";
// Types
import type { RootState } from "@/app/store";
// Ui
import { Button } from "./ui/button";
import { Icon } from "./icons";
import { calcPrice, formatCurrency } from "@/lib/utils";

const SelectedItemBar = ({ isDarkMode }: { isDarkMode: boolean }) => {
  // Redux
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state: RootState) => state.cart);
  // Memoized price calculation
  const price = useMemo(
    () =>
      formatCurrency(
        calcPrice(selectedProduct.price_before_vat, selectedProduct.vat)
      ),
    [selectedProduct.price_before_vat, selectedProduct.vat]
  );

  const barClasses = isDarkMode
    ? "bg-gray-900 border-t border-gray-700 text-white"
    : "bg-white border-t border-gray-200 text-gray-700";

  const badgeClasses = isDarkMode
    ? "bg-gray-700 text-white"
    : "bg-amber-100 text-amber-700";

  return (
    <>
      {selectedProduct.id > 0 && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 shadow-md p-4 animate-slideIn ${barClasses}`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            {/* Product Summary */}
            <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
              <Icon name="check" className="text-amber-500 min-w-5 mt-1 sm:mt-0" />
              <span className="text-sm font-medium text-[1.1em]">
                <span className={`inline-block px-3 py-1 rounded-full ${badgeClasses}`}>
                  {selectedProduct.size} Yard Skip -{" "}
                  <span className="text-yellow-300">{price}</span> -{" "}
                  {selectedProduct.hire_period_days} Hire Days
                </span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="ghost"
                className={`hover:text-red-600 mr-2 sm:mr-5 ${
                  isDarkMode ? "text-red-400" : "text-red-500"
                }`}
                onClick={() => dispatch(clearCart(undefined))}
              >
                Clear
              </Button>
              <Button
                className={`text-white h-[3em] ${
                  isDarkMode
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedItemBar;
