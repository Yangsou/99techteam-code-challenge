export interface Price {
  currency: string;
  date: string;
  price: number;
}

export const fetchPrices = async (): Promise<Price[]> => {
  try {
    const response = await fetch('https://interview.switcheo.com/prices.json');
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
}
