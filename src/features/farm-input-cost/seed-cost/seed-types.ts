export type SeedProduct = {
  id: string;
  name: string;
  pricePerUnit: number;
  unitType: 'bag' | 'pound' | 'bulk';
  seedsPerUnit: number; // How many seeds in one bag/unit
  seedingRate: number; // seeds per acre OR pounds per acre
  seedingRateType: 'seeds' | 'pounds';
  acres: number;
  technologyFee: number; // per unit
};

export type SeedResult = {
  totalCost: number;
  costPerAcre: number;
  unitsRequired: number;
  totalSeedsRequired: number;
  costPerThousandSeeds: number;
  isMissingValues: boolean;
  errors: string[];
};
