import { useState } from "react"

const asyncFn = (): Promise<{success: boolean}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 3000);
  });
};

export const useCurrencyConvertForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async ({onSuccess}: {
    onSuccess: () => void
  }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFn();
      onSuccess();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit
  };
}