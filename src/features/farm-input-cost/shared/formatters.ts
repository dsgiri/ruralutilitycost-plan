export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatNumber = (value: number, maximumFractionDigits = 2) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(value);
};
