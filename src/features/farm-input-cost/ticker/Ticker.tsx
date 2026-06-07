import React from 'react';
import { MOCK_SPOT_RATES } from '../spot-rates/spotRates';
import { formatCurrency } from '../shared/formatters';

export function Ticker() {
  const latestRates = Object.values(
    MOCK_SPOT_RATES.reduce((acc, curr) => {
      // Get most recent date for each product
      if (!acc[curr.productName] || new Date(curr.date) > new Date(acc[curr.productName].date)) {
        acc[curr.productName] = curr;
      }
      return acc;
    }, {} as Record<string, typeof MOCK_SPOT_RATES[0]>)
  );

  return (
    <div className="h-8 bg-[#1A2619] text-[#A7C0A4] w-full overflow-hidden border-b border-[#2D3F2D] flex items-center px-4 gap-8 text-[11px] font-mono shrink-0">
      <div className="h-full flex items-center shrink-0">
        <span className="opacity-60 whitespace-nowrap">LIVE DATA FEED: ACTIVE</span>
        <span className="mx-4 text-[#2D3F2D]">|</span>
      </div>
      <div className="flex items-center animate-[ticker_30s_linear_infinite] whitespace-nowrap">
        {latestRates.map((rate, i) => (
          <div key={rate.id} className="inline-flex items-center mx-6 gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="uppercase">{rate.productName}: {formatCurrency(rate.price)}/{rate.unit}</span>
          </div>
        ))}
      </div>
      <style suppressHydrationWarning>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
