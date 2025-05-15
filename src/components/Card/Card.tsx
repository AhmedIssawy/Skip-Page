import { useMemo, useState } from "react";
import { memo, lazy } from "react";
// Utils
import { calcPrice, formatCurrency, formatDate } from "@/lib/utils";
// UI
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icon } from "../icons";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct, clearCart } from "@/app/features/cart/CartSlice";
import type { AppDispatch, RootState } from "@/app/store";
// Types
import type { CardProps, ProductType } from "@/types/Index";
import { toast } from "react-toastify";
// Components
const CardError = lazy(() => import("./CardError"));

function CardComponent({ data, isDarkMode, isError }: CardProps) {
  // States
  const [unavailabeMessage, setUnavailabeMessage] = useState(false);

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const selectedProduct = useSelector((state: RootState) => state.cart);

  // Handlers
  const handleBookingClick = (product: ProductType) => {
    if (!product.allows_heavy_waste) {
      return toast.error(
        "This skip is not available for booking due to heavy waste restrictions."
      );
    }

    if (Number(selectedProduct.id) === product.id) {
      dispatch(clearCart(undefined));
      return;
    }
    dispatch(addProduct(product));
  };

  // Memoized values
  const totalPrice = useMemo(
    () => calcPrice(data.price_before_vat ?? 0, data.vat ?? 0),
    [data.price_before_vat, data.vat]
  );

  const vatAmount = useMemo(
    () => data.price_before_vat * (data.vat / 100),
    [data.price_before_vat, data.vat]
  );

  if (isError || !data) return <CardError isDarkMode={isDarkMode} />;

  return (
    <div>
      <div
        title={
          !data.allows_heavy_waste
            ? "Unavailable due to heavy waste restriction"
            : ""
        }
        className={`rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto  hover:shadow-xl border ${
          isDarkMode ? "bg-gray-800 " : "bg-white"
        } ${!data.allows_heavy_waste ? "opacity-40 cursor-not-allowed" : ""} ${
          Number(selectedProduct.id) === data.id
            ? "border-l-2 border-r-2 border-b-2 border-green-600"
            : "ring-2 border-gray-700"
        }`}
      >
        {/* ------------------ {Title & post code} ------------------ */}
        <section
          className={`p-4 ${
            isDarkMode
              ? "bg-gradient-to-r from-teal-900 to-teal-800"
              : "bg-gradient-to-r  from-teal-700 to-teal-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {data.size} Yard Skip
            </h2>
            {data.allows_heavy_waste ? (
              <Badge
                variant={data.forbidden ? "error" : "success"}
                className="animate-fadeIn"
              >
                {data.forbidden ? "Unavailable" : "Available"}
              </Badge>
            ) : (
              <Icon
                onMouseDown={() => setUnavailabeMessage((prev) => !prev)}
                name="error"
                className="animate-fadeIn text-red-500 cursor-pointer"
                size={30}
              />
            )}
            {unavailabeMessage && (
              <div
                className={`
                           absolute z-100 mt-2 w-48 p-2 text-sm font-bold text-red-700 bg-white rounded-md
                          shadow-lg animate-fadeIn
                        `}
              >
                Adjust the weight of your waste to book this skip.
              </div>
            )}
          </div>
          <p className="text-sm mt-1 text-teal-100">
            Postcode: {data.postcode}
          </p>
        </section>

        <div className="p-5">
          {/* ------------ {Hire Days and Transport Cose} ---------- */}
          <section className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Hire Period</p>
              <div className="flex items-center mt-1">
                <Icon name="clock" size={18} className="text-teal-400 mr-1" />
                <span className="font-semibold text-gray-200">
                  {data.hire_period_days} Days
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Transport Cost</p>
              <div className="flex items-center mt-1">
                <Icon name="truck" size={18} className="text-teal-400 mr-1" />
                <span className="font-semibold text-gray-200">
                  {data.transport_cost && data.transport_cost > 0
                    ? formatCurrency(data.transport_cost)
                    : "Free"}
                </span>
              </div>
            </div>
          </section>
          {/* ------------ {Allowed on Road & Heavy Waste & per tonne & Area} ---------- */}
          <section className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center">
              <Icon
                name={data.allowed_on_road ? "check" : "cross"}
                size={18}
                className={
                  data.allowed_on_road ? "text-green-400" : "text-red-400"
                }
              />
              <span
                className={`ml-2 text-sm ${
                  !data.allowed_on_road ? "text-red-400" : "text-gray-300"
                }`}
              >
                Road Placement
              </span>
            </div>
            <div className="flex items-center">
              <Icon
                name={data.allows_heavy_waste ? "check" : "cross"}
                size={18}
                className={
                  data.allows_heavy_waste ? "text-green-400" : "text-red-400"
                }
              />
              <span
                className={`ml-2 text-sm ${
                  data.allows_heavy_waste ? "text-gray-300" : "text-red-400"
                }`}
              >
                Heavy Waste
              </span>
            </div>
            <div className="flex items-center">
              <Icon name="currency" size={18} className="text-teal-400" />
              <span className="ml-2 text-sm text-gray-300">
                Per Tonne:{" "}
                {data.per_tonne_cost
                  ? formatCurrency(data.per_tonne_cost)
                  : "Free"}
              </span>
            </div>
            <div className="flex items-center">
              <Icon name="location" size={18} className="text-teal-400" />
              <span className="ml-2 text-sm text-gray-300">
                {data.area || "Area N/A"}
              </span>
            </div>
          </section>
          {/* ------------ {Price Breakdown} ---------- */}
          <section className="mt-5 flex flex-col">
            <div className="text-sm text-gray-400 flex justify-between">
              <span>Price (ex. VAT)</span>
              <span>{formatCurrency(data.price_before_vat)}</span>
            </div>
            <div className="text-sm text-gray-400 flex justify-between">
              <span>VAT ({data.vat}%)</span>
              <span>{formatCurrency(vatAmount)}</span>
            </div>
            <div className="text-lg font-bold text-teal-300 flex justify-between mt-2 pt-2 border-t border-gray-700">
              <span>Total Price</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </section>
          {/* ------------ {Booking buttons} ---------- */}
          {Number(selectedProduct.id) === data.id ? (
            <button
              className="w-full flex justify-center font-semibold mt-4 bg-green-500 hover:bg-green-600 cursor-pointer text-gray-900 py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => handleBookingClick(data)}
            >
              <Icon name="check" size={20} className="mr-2 mt-1" />
              Booked
            </button>
          ) : (
            <Button
              className={`w-full font-semibold text-[15px] mt-4 h-12 bg-amber-500 hover:bg-amber-600 text-gray-900 py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                data.allows_heavy_waste ? "" : "opacity-50"
              }`}
              onMouseEnter={() =>
                !data.allows_heavy_waste && setUnavailabeMessage(true)
              }
              onMouseLeave={() =>
                !data.allows_heavy_waste && setUnavailabeMessage(false)
              }
              onClick={() => handleBookingClick(data)}
            >
              {data.allows_heavy_waste ? "Book Now" : "skip is not available"}
            </Button>
          )}

          <p className="text-xs text-gray-500 mt-3 text-center">
            Last updated: {formatDate(data.updated_at)}
          </p>
        </div>
      </div>
    </div>
  );
}

const Card = memo(CardComponent);
export default Card;
export { CardComponent };
