import { SeedProduct, SeedResult } from './seed-types';

export function calculateSeedCost(product: SeedProduct): SeedResult {
  const errors: string[] = [];

  if (product.pricePerUnit < 0) errors.push("Price cannot be negative.");
  if (product.acres <= 0) errors.push("Acres must be greater than zero.");
  if (product.seedingRate <= 0) errors.push("Seeding rate must be greater than zero.");
  
  if (product.seedingRateType === 'seeds' && product.seedsPerUnit <= 0) {
    errors.push("Seeds per unit must be greater than zero when using seeds/acre.");
  }

  if (errors.length > 0) {
    return {
      totalCost: 0,
      costPerAcre: 0,
      unitsRequired: 0,
      totalSeedsRequired: 0,
      costPerThousandSeeds: 0,
      isMissingValues: true,
      errors
    };
  }

  let unitsRequired = 0;
  let totalSeedsRequired = 0;

  if (product.seedingRateType === 'seeds') {
    totalSeedsRequired = product.seedingRate * product.acres;
    unitsRequired = totalSeedsRequired / product.seedsPerUnit;
  } else {
    // Pounds per acre
    // In this mode, we assume the unitType is 'pound' or similar, so price is per pound
    // Re-verify logic: seedingRate * acres = total pounds required
    // If unitType is bag, we need the lbs per bag. Let's assume seedsPerUnit acts as units metric.
    // simpler: If seeding rate is in lbs, and price is per lb (or we know lbs per unit).
    // Let's assume product.seedsPerUnit is now "lbs per unit".
    const totalPoundsRequired = product.seedingRate * product.acres;
    unitsRequired = totalPoundsRequired / (product.seedsPerUnit || 1); // 1 if unit is pound
    totalSeedsRequired = 0; // Not applicable or unknown
  }

  const effectivePricePerUnit = product.pricePerUnit + (product.technologyFee || 0);
  const totalCost = unitsRequired * effectivePricePerUnit;
  const costPerAcre = totalCost / product.acres;
  
  const costPerThousandSeeds = product.seedingRateType === 'seeds' 
    ? (totalCost / totalSeedsRequired) * 1000 
    : 0;

  return {
    totalCost,
    costPerAcre,
    unitsRequired,
    totalSeedsRequired,
    costPerThousandSeeds,
    isMissingValues: false,
    errors
  };
}
