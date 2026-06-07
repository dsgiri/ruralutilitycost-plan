import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { calculateSeedCost } from './calculator';
import { SeedProduct, SeedResult } from './seed-types';
import { formatCurrency, formatNumber } from '../shared/formatters';

const DEFAULT_PRODUCT: SeedProduct = {
  id: '1',
  name: 'Corn Hybrid A',
  pricePerUnit: 300,
  unitType: 'bag',
  seedsPerUnit: 80000,
  seedingRate: 32000,
  seedingRateType: 'seeds',
  acres: 100,
  technologyFee: 0,
};

export function SeedCostPage() {
  const [product, setProduct] = useState<SeedProduct>(DEFAULT_PRODUCT);

  const handleInputChange = (field: keyof SeedProduct, value: string | number) => {
    setProduct(prev => ({
      ...prev,
      [field]: typeof value === 'string' && value !== '' ? parseFloat(value) || 0 : value
    }));
  };

  const result: SeedResult = calculateSeedCost(product);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold text-[#1A1C1A] tracking-tight">Seed Density Ledger</h2>
        <p className="text-gray-500 mt-1">Calculate seeding rates, total acreage limits, and seed pricing adherence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle><span className="text-[#2D5A27]">01</span> Input Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seed-name">Seed Identity / Variety</Label>
              <Input 
                id="seed-name" 
                value={product.name} 
                onChange={(e) => handleInputChange('name', e.target.value)} 
                className="font-mono text-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={product.pricePerUnit || ''} 
                  onChange={(e) => handleInputChange('pricePerUnit', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech-fee">Tech Fee ($/Unit)</Label>
                <Input 
                  id="tech-fee" 
                  type="number" 
                  value={product.technologyFee || ''} 
                  onChange={(e) => handleInputChange('technologyFee', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate-type">Calculation Basis</Label>
                <select 
                  id="rate-type"
                  value={product.seedingRateType}
                  onChange={(e) => handleInputChange('seedingRateType', e.target.value as 'seeds' | 'pounds')}
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 font-mono"
                >
                  <option value="seeds">Seeds per Acre</option>
                  <option value="pounds">Pounds per Acre</option>
                </select>
              </div>
              
              <div className="space-y-2">
                 <Label htmlFor="seeds-unit">
                   {product.seedingRateType === 'seeds' ? 'Seeds per Unit' : 'Lbs per Unit'}
                 </Label>
                 <Input 
                   id="seeds-unit" 
                   type="number" 
                   value={product.seedsPerUnit || ''} 
                   onChange={(e) => handleInputChange('seedsPerUnit', e.target.value)} 
                   className="font-mono text-sm"
                 />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seeding-rate">
                  App Rate ({product.seedingRateType === 'seeds' ? 'seeds/ac' : 'lbs/ac'})
                </Label>
                <Input 
                  id="seeding-rate" 
                  type="number" 
                  value={product.seedingRate || ''} 
                  onChange={(e) => handleInputChange('seedingRate', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acres">Acres Validated</Label>
                <Input 
                  id="acres" 
                  type="number" 
                  value={product.acres || ''} 
                  onChange={(e) => handleInputChange('acres', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
            </div>

          </CardContent>
        </Card>

        <Card className="bg-white border-[#D1D5D2] relative overflow-hidden flex flex-col">
          {result.isMissingValues ? (
             <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-6 text-center z-10 border border-red-200">
               <div className="text-3xl mb-2">⚠️</div>
               <h3 className="text-red-800 font-bold mb-2">Validation Failure</h3>
               <ul className="text-red-700 text-sm space-y-1 font-mono">
                 {result.errors.map((err, i) => <li key={i}>{err}</li>)}
               </ul>
             </div>
          ) : null}

          <CardHeader>
            <CardTitle><span className="text-[#2D5A27]">02</span> Compliance Output Worksheet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#2D5A27] p-4 rounded text-white shadow shadow-inner">
                <Label className="text-[#A7C0A4] opacity-80 text-[10px] tracking-widest uppercase mb-1">Cost per Acre</Label>
                <div className="text-3xl font-bold font-mono tracking-tight mt-1">{formatCurrency(result.costPerAcre)}</div>
              </div>
              <div className="bg-[#F1F3F2] p-4 rounded border border-[#D1D5D2]">
                <Label className="text-gray-500 text-[10px] tracking-widest uppercase mb-1">Total Field Cost</Label>
                <div className="text-xl font-bold text-[#2D5A27] font-mono mt-1">{formatCurrency(result.totalCost)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Metrics Verification</Label>
              <div className="bg-white rounded border border-[#D1D5D2] divide-y divide-[#D1D5D2]">
                <div className="grid grid-cols-2 p-3 gap-2 text-sm font-mono text-gray-700">
                  <div className="font-sans font-medium">Total Units Required</div>
                  <div className="text-right text-[#2D5A27] font-bold">{formatNumber(result.unitsRequired, 1)}</div>
                </div>
                {product.seedingRateType === 'seeds' && (
                  <>
                    <div className="grid grid-cols-2 p-3 gap-2 text-sm font-mono text-gray-700">
                      <div className="font-sans font-medium">Total Seeds</div>
                      <div className="text-right font-semibold">{formatNumber(result.totalSeedsRequired, 0)}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 gap-2 text-sm font-mono text-gray-700">
                      <div className="font-sans font-medium">Cost / 1k Seeds</div>
                      <div className="text-right text-gray-500">{formatCurrency(result.costPerThousandSeeds)}</div>
                    </div>
                  </>
                )}
                {product.technologyFee > 0 && (
                   <div className="grid grid-cols-2 p-3 gap-2 text-sm font-mono text-gray-700">
                     <div className="font-sans font-medium">Tech Fee Subtotal</div>
                     <div className="text-right text-orange-600 font-bold">{formatCurrency(result.unitsRequired * product.technologyFee)}</div>
                   </div>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <div className="px-4 py-2 bg-gray-50 border border-[#D1D5D2] rounded text-[10px] text-gray-500">
                 <span className="font-bold text-gray-600 uppercase tracking-widest mr-2">System Log: </span>
                 Effective Price Per Unit is {formatCurrency(product.pricePerUnit + product.technologyFee)} (includes base + tech fees).
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
