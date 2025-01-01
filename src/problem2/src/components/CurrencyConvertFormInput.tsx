import { FC, useMemo } from "react";
import { CurrencyPricesSelect } from "./CurrencyPricesSelect";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
};
export const CurrencyConvertFormInput: FC<Props> = ({ 
  name,
 }) => {
  const { register, formState } = useFormContext();
  const {errors} = formState;

  const error = useMemo(
    () => errors?.[name]?.message?.toString(),
    [errors, name]
  );

  return (
    <div className="mb-3 relative">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={name}
      >
        From
      </label>
      <input
        id={name}
        placeholder="0.00"
        {...register(name)}
        className={
          clsx(
            "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            {
              "border-gray-300": !error,
              "border-red-500": error
            }
          )
        }
      />
      <CurrencyPricesSelect name="currencyFrom" />
      {
        error && <p className="text-red-500 text-sm">{error}</p>
      }
    </div>
  );
};
