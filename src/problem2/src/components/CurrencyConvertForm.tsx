import { FC, useEffect } from "react";
import { CurrencyConvertFormInput } from "./CurrencyConvertFormInput";
import usePriceStore from "../stores/usePriceStore";
import { usePrices } from "../hooks/usePrices";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CurrencyConvertFormResult } from "./CurrencyConvertFormResult";
import { useCurrencyConvertForm } from "../hooks";
import { CurrencyConvertFormButton } from "./CurrencyConvertFormButton";
import { toast } from "react-toastify";

interface IForm {
  currencyFrom: string;
  currencyTo: string;
  priceFrom: number;
  priceTo: number;
}
const schema = yup
  .object({
    currencyFrom: yup.string().required(),
    currencyTo: yup.string().required(),
    priceFrom: yup.number().positive().required(),
    priceTo: yup.number().positive().required(),
  })
  .required();

const CurrencyConvertForm: FC = () => {
  const { loading, handleSubmit, error } = useCurrencyConvertForm();

  const methods = useForm<IForm>({
    defaultValues: {
      currencyFrom: "ETH",
      currencyTo: "USD",
      priceFrom: 0,
      priceTo: 0,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = methods.watch((data, { name }) => {
      if (name === "priceTo") return;

      const { priceFrom, currencyFrom, currencyTo } = data;
      const { prices } = usePriceStore.getState();

      if (
        !priceFrom ||
        !currencyFrom ||
        !currencyTo ||
        !prices[currencyFrom] ||
        !prices[currencyTo]
      )
        return;

      const priceTo = Number.isNaN(Number(priceFrom))
        ? 0
        : (priceFrom * prices[currencyFrom].price) / prices[currencyTo].price;

      methods.setValue("priceTo", priceTo, { shouldValidate: true });
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const onSubmit = () => {
    handleSubmit({
      onSuccess: () => {
        toast.success("Swap currency successfully!");
        methods.reset();
      },
    });
  };

  usePrices();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto"
      >
        <h2 className="text-base/7 font-semibold text-gray-900">Fancy Form</h2>
        {/* <p className="mt-1 text-sm/6 text-gray-600">This information will be displayed publicly so be careful what you share.</p> */}

        <CurrencyConvertFormInput name="priceFrom" />
        <CurrencyConvertFormResult />

        <CurrencyConvertFormButton loading={loading} />

        <p className="text-red-500">{error?.message}</p>
      </form>
    </FormProvider>
  );
};

export default CurrencyConvertForm;
