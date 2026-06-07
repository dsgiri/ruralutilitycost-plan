import { FertilizerProduct, FertilizerResult } from './fertilizer-types';

export function calculateFertilizerCost(product: FertilizerProduct): FertilizerResult {
  const errors: string[] = [];
  
  if (product.pricePerUnit < 0) errors.push("Price cannot be negative.");
  if (product.acres <= 0) errors.push("Acres must be greater than zero.");
  if (product.applicationRate <= 0) errors.push("Application rate must be greater than zero.");
  if (product.unit === 'gallon' && (!product.density || product.density <= 0)) {
    errors.push("Density is required for liquid fertilizer.");
  }

  if (errors.length > 0) {
    return {
      totalCost: 0,
      costPerAcre: 0,
      totalPoundsRequired: 0,
      totalGallonsRequired: 0,
      nutrientPoundsPerTon: { n: 0, p: 0, k: 0, s: 0 },
      costPerPoundOfNutrient: { n: 0, p: 0, k: 0, s: 0 },
      totalNutrientAppliedPerAcre: { n: 0, p: 0, k: 0, s: 0 },
      costPerTotalNutrientPound: 0,
      isMissingValues: true,
      errors
    };
  }

  let totalCost = 0;
  let totalPoundsRequired = 0;
  let totalGallonsRequired = 0;
  
  // Nutrient calculations
  const nPoundsPerTon = 2000 * (product.n / 100);
  const pPoundsPerTon = 2000 * (product.p / 100);
  const kPoundsPerTon = 2000 * (product.k / 100);
  const sPoundsPerTon = 2000 * (product.s / 100);

  let nCostPerPound = 0;
  let pCostPerPound = 0;
  let kCostPerPound = 0;
  let sCostPerPound = 0;
  let costPerTotalNutrientPound = 0;

  let nAppliedPerAcre = 0;
  let pAppliedPerAcre = 0;
  let kAppliedPerAcre = 0;
  let sAppliedPerAcre = 0;

  if (product.unit === 'ton') {
    // Dry
    totalPoundsRequired = product.applicationRate * product.acres;
    const tonsRequired = totalPoundsRequired / 2000;
    totalCost = tonsRequired * product.pricePerUnit;

    nCostPerPound = nPoundsPerTon > 0 ? product.pricePerUnit / nPoundsPerTon : 0;
    pCostPerPound = pPoundsPerTon > 0 ? product.pricePerUnit / pPoundsPerTon : 0;
    kCostPerPound = kPoundsPerTon > 0 ? product.pricePerUnit / kPoundsPerTon : 0;
    sCostPerPound = sPoundsPerTon > 0 ? product.pricePerUnit / sPoundsPerTon : 0;
    
    const totalNutrientPoundsPerTon = nPoundsPerTon + pPoundsPerTon + kPoundsPerTon + sPoundsPerTon;
    costPerTotalNutrientPound = totalNutrientPoundsPerTon > 0 ? product.pricePerUnit / totalNutrientPoundsPerTon : 0;

    nAppliedPerAcre = product.applicationRate * (product.n / 100);
    pAppliedPerAcre = product.applicationRate * (product.p / 100);
    kAppliedPerAcre = product.applicationRate * (product.k / 100);
    sAppliedPerAcre = product.applicationRate * (product.s / 100);

  } else if (product.unit === 'gallon' && product.density) {
    // Liquid
    totalGallonsRequired = product.applicationRate * product.acres;
    totalCost = totalGallonsRequired * product.pricePerUnit;
    
    // Convert to tons equivalent to calculate nutrient cost
    totalPoundsRequired = totalGallonsRequired * product.density;
    
    const pricePerPound = product.pricePerUnit / product.density;
    const pricePerTonEquivalent = pricePerPound * 2000;

    nCostPerPound = nPoundsPerTon > 0 ? pricePerTonEquivalent / nPoundsPerTon : 0;
    pCostPerPound = pPoundsPerTon > 0 ? pricePerTonEquivalent / pPoundsPerTon : 0;
    kCostPerPound = kPoundsPerTon > 0 ? pricePerTonEquivalent / kPoundsPerTon : 0;
    sCostPerPound = sPoundsPerTon > 0 ? pricePerTonEquivalent / sPoundsPerTon : 0;

    const totalNutrientPoundsPerTon = nPoundsPerTon + pPoundsPerTon + kPoundsPerTon + sPoundsPerTon;
    costPerTotalNutrientPound = totalNutrientPoundsPerTon > 0 ? pricePerTonEquivalent / totalNutrientPoundsPerTon : 0;

    const lbsAppliedPerAcre = product.applicationRate * product.density;
    nAppliedPerAcre = lbsAppliedPerAcre * (product.n / 100);
    pAppliedPerAcre = lbsAppliedPerAcre * (product.p / 100);
    kAppliedPerAcre = lbsAppliedPerAcre * (product.k / 100);
    sAppliedPerAcre = lbsAppliedPerAcre * (product.s / 100);
  }

  const costPerAcre = totalCost / product.acres;

  return {
    totalCost,
    costPerAcre,
    totalPoundsRequired,
    totalGallonsRequired,
    nutrientPoundsPerTon: { n: nPoundsPerTon, p: pPoundsPerTon, k: kPoundsPerTon, s: sPoundsPerTon },
    costPerPoundOfNutrient: { n: nCostPerPound, p: pCostPerPound, k: kCostPerPound, s: sCostPerPound },
    totalNutrientAppliedPerAcre: { n: nAppliedPerAcre, p: pAppliedPerAcre, k: kAppliedPerAcre, s: sAppliedPerAcre },
    costPerTotalNutrientPound,
    isMissingValues: false,
    errors: []
  };
}
