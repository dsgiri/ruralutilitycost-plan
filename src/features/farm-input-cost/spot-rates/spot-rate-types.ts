export type SpotRateRecord = {
  id: string;
  productName: string;
  price: number;
  unit: string;
  date: string;
  category: 'fertilizer' | 'seed' | 'chemical' | 'other';
};
