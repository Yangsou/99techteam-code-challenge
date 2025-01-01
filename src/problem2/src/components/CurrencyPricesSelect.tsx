import { FC } from "react";
import usePriceStore from "../stores/usePriceStore";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { getIconPath } from "../libs";

interface Props {
  name: string;
}

export const CurrencyPricesSelect: FC<Props> = ({ name }) => {
  const { loading, prices } = usePriceStore();
  const { setValue, getValues } = useFormContext();

  const handleChange = (value: string) => {
    setValue(name, value, {
      shouldValidate: true,
    });
  };
  return (
    <div className="absolute top-[29px] right-0.5 grid grid-cols-1">
      {loading && (
        <div className="animate-pulse w-28 h-10">
          <div className="bg-slate-200 h-full w-full"></div>
        </div>
      )}
      <Select onValueChange={handleChange}>
        <SelectTrigger
          value={getValues(name)}
          className="w-[180px] focus:ring-0 focus:ring-offset-0"
        >
          <SelectValue placeholder={getValues(name)} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(prices).map(({ currency }) => (
            <SelectItem
              key={currency}
              value={currency}
              className="cursor-pointer bg-white"
            >
              <div className="flex space-x-2 items-center">
                <img src={getIconPath(currency)} />
                <span>{currency}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
