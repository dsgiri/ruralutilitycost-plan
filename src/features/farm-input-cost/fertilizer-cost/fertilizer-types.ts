export type FertilizerProduct = {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: 'ton' | 'gallon';
  applicationRate: number; // lbs per acre or gallons per acre
  acres: number;
  n: number; // Nitrogen %
  p: number; // Phosphorus %
  k: number; // Potassium %
  s: number; // Sulfur %
  density?: number; // lbs per gallon (only required if unit is gallon)
};

export type FertilizerResult = {
  totalCost: number;
  costPerAcre: number;
  totalPoundsRequired: number;
  totalGallonsRequired: number;
  nutrientPoundsPerTon: {
    n: number;
    p: number;
    k: number;
    s: number;
  };
  costPerPoundOfNutrient: {
    n: number;
    p: number;
    k: number;
    s: number;
  };
  totalNutrientAppliedPerAcre: {
    n: number;
    p: number;
    k: number;
    s: number;
  };
  costPerTotalNutrientPound: number;
  isMissingValues: boolean;
  errors: string[];
};
