import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { CurrencyPricesSelect } from "./CurrencyPricesSelect";

export const CurrencyConvertFormResult = () => {
  const { getValues } = useFormContext();
  const priceTo = getValues("priceTo");

  return (
    <div className="mb-3 relative">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        To
      </label>
      <div
        className={clsx(
          "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          "border-gray-300"
        )}
      >
        {priceTo}
      </div>
      <CurrencyPricesSelect name="currencyTo" />

    </div>
  );
};
