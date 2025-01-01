import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Price } from '../api'

interface State {
  prices: Record<string, Price>;
  loading: boolean;
  error?: Error | null;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setPrices: (payload: Record<string, Price>) => void;
}

const usePriceStore = create<State>()(
  persist(
    (set) => ({
      prices: {},
      error: null,
      loading: false,
      setLoading: (loading: boolean) => set({loading}),
      setError: (error: Error | null) => set({error}),
      setPrices: (prices: Record<string, Price>) => set({ prices }),
    }),
    {
      name: 'price-storage',
    }
  )
)

export default usePriceStore