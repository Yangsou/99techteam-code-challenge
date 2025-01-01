import { useEffect } from "react";
import { fetchPrices, Price } from "../api";
import usePriceStore from "../stores/usePriceStore";

export const usePrices = () => {
  const priceStore = usePriceStore();

  const sortAndFilterPrices = (data: Price[]) => {
    return data
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((item) => ({
        ...item,
        price: item.price
      }))
      .reduce((acc: Record<string, Price>, curr) => {
        if (!acc[curr.currency]) {
          acc[curr.currency] = curr;
        }
        return acc;
      }, {});
  };

  useEffect(() => {
    const getPrices = async () => {
      try {
        if (Object.keys(priceStore.prices).length > 0) {
          return priceStore.prices;
        }
        priceStore.setLoading(true);
        const data = await fetchPrices();
        priceStore.setPrices(sortAndFilterPrices(data))
        priceStore.setError(null);
      } catch (err) {
        priceStore.setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        priceStore.setLoading(false);
      }
    };

    getPrices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
