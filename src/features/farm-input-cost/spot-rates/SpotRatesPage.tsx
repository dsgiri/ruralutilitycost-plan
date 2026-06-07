import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_SPOT_RATES } from './spotRates';

export function SpotRatesPage() {
  const chartData = useMemo(() => {
    // Group by date
    const dataByDate: Record<string, any> = {};
    MOCK_SPOT_RATES.forEach(rate => {
      if (!dataByDate[rate.date]) {
        dataByDate[rate.date] = { date: rate.date };
      }
      dataByDate[rate.date][rate.productName] = rate.price;
    });
    return Object.values(dataByDate).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  const productNames = Array.from(new Set(MOCK_SPOT_RATES.map(r => r.productName)));
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#1A1C1A] tracking-tight">Market Spot Rates</h2>
          <p className="text-gray-500 mt-1">Track and verify historical input pricing records.</p>
        </div>
        <button 
          className="text-[10px] font-bold text-[#2D5A27] hover:underline uppercase"
        >
          Export CSV
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle><span className="text-[#2D5A27]">03</span> Historical Price Ledger (USD / unit)</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-5">
          <div className="h-64 sm:h-96 w-full mt-2 sm:mt-4 bg-gray-50 rounded border border-dashed border-[#D1D5D2] p-2 sm:p-4 relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D1D5D2" />
                <XAxis dataKey="date" stroke="#6B7280" tick={{ fill: '#6B7280' }} fontSize={12} />
                <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D1D5D2', color: '#1A1C1A', fontSize: '12px' }}
                  itemStyle={{ color: '#1A1C1A' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                {productNames.map((name, idx) => (
                  <Line 
                    key={name}
                    type="monotone" 
                    dataKey={name} 
                    stroke={colors[idx % colors.length]} 
                    strokeWidth={2}
                    activeDot={{ r: 6 }} 
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-red-50 border border-red-200 rounded p-4 flex items-start">
        <div className="text-red-600 mr-3 text-lg leading-none mt-0.5">⚠️</div>
        <div>
          <h4 className="text-[11px] font-bold text-red-800 uppercase tracking-wider">Compliance Audit Warning</h4>
          <p className="text-sm text-red-700 mt-1">
            Prices displayed are compiled from voluntary entries and historical ledgers. They should not substitute official purchasing audits or binding contracts. Verification Chain is pending external validation.
          </p>
        </div>
      </div>
    </div>
  );
}
