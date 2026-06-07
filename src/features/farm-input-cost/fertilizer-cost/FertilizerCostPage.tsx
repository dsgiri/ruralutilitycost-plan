import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { calculateFertilizerCost } from './calculator';
import { FertilizerProduct, FertilizerResult } from './fertilizer-types';
import { formatCurrency, formatNumber } from '../shared/formatters';

const DEFAULT_PRODUCT: FertilizerProduct = {
  id: '1',
  name: 'Urea',
  pricePerUnit: 450,
  unit: 'ton',
  applicationRate: 150,
  acres: 100,
  n: 46,
  p: 0,
  k: 0,
  s: 0,
  density: 0,
};

export function FertilizerCostPage() {
  const [product, setProduct] = useState<FertilizerProduct>(DEFAULT_PRODUCT);

  const handleInputChange = (field: keyof FertilizerProduct, value: string | number) => {
    setProduct(prev => ({
      ...prev,
      [field]: typeof value === 'string' && value !== '' ? parseFloat(value) || 0 : value
    }));
  };

  const result: FertilizerResult = calculateFertilizerCost(product);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#1A1C1A] tracking-tight">Fertilizer Ledger</h2>
          <p className="text-gray-500 mt-1">Audit nutrient application costs per acre and verify total field expenditures.</p>
        </div>
        <button 
          className="inline-flex items-center justify-center gap-2 bg-[#2D5A27] hover:bg-[#1A3816] text-white px-4 py-2 rounded text-xs tracking-wider uppercase font-bold transition-colors cursor-not-allowed opacity-80 w-full sm:w-auto mt-2 sm:mt-0"
          title="Module pending activation"
        >
          <span className="text-[#A7C0A4]">⎘</span> AI Lab Report Parsing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle><span className="text-[#2D5A27]">01</span> Input Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input 
                id="product-name" 
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
                <Label htmlFor="unit">Unit</Label>
                <select 
                  id="unit"
                  value={product.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value as 'ton' | 'gallon')}
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 font-mono"
                >
                  <option value="ton">Ton (Dry)</option>
                  <option value="gallon">Gallon (Liquid)</option>
                </select>
              </div>
            </div>

            {product.unit === 'gallon' && (
              <div className="space-y-2">
                <Label htmlFor="density">Density (lbs/gal)</Label>
                <Input 
                  id="density" 
                  type="number" 
                  value={product.density || ''} 
                  onChange={(e) => handleInputChange('density', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app-rate">App Rate ({product.unit === 'ton' ? 'lbs/ac' : 'gal/ac'})</Label>
                <Input 
                  id="app-rate" 
                  type="number" 
                  value={product.applicationRate || ''} 
                  onChange={(e) => handleInputChange('applicationRate', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acres">Acres</Label>
                <Input 
                  id="acres" 
                  type="number" 
                  value={product.acres || ''} 
                  onChange={(e) => handleInputChange('acres', e.target.value)} 
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <Label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">Nutrient Analysis (%)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="n" className="text-center block">N</Label>
                  <Input id="n" type="number" value={product.n || ''} onChange={(e) => handleInputChange('n', e.target.value)} className="font-mono text-center px-1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="p" className="text-center block">P</Label>
                  <Input id="p" type="number" value={product.p || ''} onChange={(e) => handleInputChange('p', e.target.value)} className="font-mono text-center px-1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="k" className="text-center block">K</Label>
                  <Input id="k" type="number" value={product.k || ''} onChange={(e) => handleInputChange('k', e.target.value)} className="font-mono text-center px-1" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="s" className="text-center block">S</Label>
                  <Input id="s" type="number" value={product.s || ''} onChange={(e) => handleInputChange('s', e.target.value)} className="font-mono text-center px-1" />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        <Card className="bg-white border-[#D1D5D2] relative overflow-hidden">
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
          <CardContent className="space-y-6">
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
              <Label className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 block">Nutrient Breakdown (per acre)</Label>
              <div className="bg-white rounded border border-[#D1D5D2] divide-y divide-[#D1D5D2]">
                <div className="grid grid-cols-3 p-3 gap-2 text-[11px] font-bold text-gray-500 bg-[#F9FAF9] uppercase tracking-wider">
                  <div>Nutrient</div>
                  <div className="text-right">Applied (lbs)</div>
                  <div className="text-right">Cost/lb</div>
                </div>
                {product.n > 0 && (
                  <div className="grid grid-cols-3 p-3 gap-2 text-sm font-mono text-gray-700">
                    <div className="font-sans font-medium">Nitrogen (N)</div>
                    <div className="text-right">{formatNumber(result.totalNutrientAppliedPerAcre.n)}</div>
                    <div className="text-right font-bold text-[#2D5A27]">{formatCurrency(result.costPerPoundOfNutrient.n)}</div>
                  </div>
                )}
                {product.p > 0 && (
                  <div className="grid grid-cols-3 p-3 gap-2 text-sm font-mono text-gray-700">
                    <div className="font-sans font-medium">Phosphorus (P)</div>
                    <div className="text-right">{formatNumber(result.totalNutrientAppliedPerAcre.p)}</div>
                    <div className="text-right font-bold text-[#2D5A27]">{formatCurrency(result.costPerPoundOfNutrient.p)}</div>
                  </div>
                )}
                {product.k > 0 && (
                  <div className="grid grid-cols-3 p-3 gap-2 text-sm font-mono text-gray-700">
                    <div className="font-sans font-medium">Potassium (K)</div>
                    <div className="text-right">{formatNumber(result.totalNutrientAppliedPerAcre.k)}</div>
                    <div className="text-right font-bold text-[#2D5A27]">{formatCurrency(result.costPerPoundOfNutrient.k)}</div>
                  </div>
                )}
                {product.s > 0 && (
                  <div className="grid grid-cols-3 p-3 gap-2 text-sm font-mono text-gray-700">
                    <div className="font-sans font-medium">Sulfur (S)</div>
                    <div className="text-right">{formatNumber(result.totalNutrientAppliedPerAcre.s)}</div>
                    <div className="text-right font-bold text-[#2D5A27]">{formatCurrency(result.costPerPoundOfNutrient.s)}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 border border-[#D1D5D2] rounded text-[10px] text-gray-500 mt-4">
                 <span className="font-bold text-gray-600 uppercase tracking-widest mr-2">System Log: </span>
                 Total Volume Required: {product.unit === 'ton' ? `${formatNumber(result.totalPoundsRequired)} lbs` : `${formatNumber(result.totalGallonsRequired)} gallons`}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
