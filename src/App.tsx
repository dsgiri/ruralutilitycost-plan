/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ticker } from './features/farm-input-cost/ticker/Ticker';
import { FertilizerCostPage } from './features/farm-input-cost/fertilizer-cost/FertilizerCostPage';
import { SeedCostPage } from './features/farm-input-cost/seed-cost/SeedCostPage';
import { SpotRatesPage } from './features/farm-input-cost/spot-rates/SpotRatesPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'seed' | 'spot'>('fertilizer');

  return (
    <div className="min-h-screen bg-[#F4F5F4] text-[#1A1C1A] flex flex-col font-sans selection:bg-[#2D5A27] selection:text-white">
      <Ticker />
      
      {/* Header */}
      <header className="bg-white border-b border-[#D1D5D2] flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-6 py-3 md:py-0 md:h-16 shrink-0 sticky top-0 z-50 gap-3 md:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2D5A27] rounded flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">RuralUtilityCost.com</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 hidden sm:block">Farm Input Cost Engineering Cluster</p>
          </div>
        </div>
        <div className="flex gap-1 text-sm font-medium w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button 
            className="px-3 py-1.5 text-sm font-medium rounded transition-colors text-gray-400 hover:text-gray-600 border-r border-[#D1D5D2] mr-2 pr-4 flex items-center gap-1 uppercase tracking-wider text-[11px] font-bold whitespace-nowrap shrink-0"
          >
            <span className="text-[14px]">🔒</span> Vault
          </button>
          <button 
            onClick={() => setActiveTab('fertilizer')}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shrink-0 ${activeTab === 'fertilizer' ? 'bg-[#2D5A27] text-white shadow-sm' : 'text-gray-600 hover:text-[#2D5A27] hover:bg-gray-100'}`}
          >
            Fertilizer Cost
          </button>
          <button 
            onClick={() => setActiveTab('seed')}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shrink-0 ${activeTab === 'seed' ? 'bg-[#2D5A27] text-white shadow-sm' : 'text-gray-600 hover:text-[#2D5A27] hover:bg-gray-100'}`}
          >
            Seed Cost
          </button>
          <button 
            onClick={() => setActiveTab('spot')}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shrink-0 ${activeTab === 'spot' ? 'bg-[#2D5A27] text-white shadow-sm' : 'text-gray-600 hover:text-[#2D5A27] hover:bg-gray-100'}`}
          >
             Inspector Mode
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center space-x-2 bg-white border border-[#D1D5D2] px-3 py-1 rounded shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D5A27]"></span>
              </span>
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">SYSTEM ACTIVE : ENVIRO-COMPLIANCE ENGINE</span>
            </div>
        </div>

        {activeTab === 'fertilizer' && <FertilizerCostPage />}
        {activeTab === 'seed' && <SeedCostPage />}
        {activeTab === 'spot' && <SpotRatesPage />}
      </main>

      <footer className="py-4 md:h-10 bg-white border-t border-[#D1D5D2] px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 shrink-0 gap-3 md:gap-0">
        <div className="flex gap-2 md:gap-4 flex-wrap justify-center text-center">
          <span>&copy; {new Date().getFullYear()} RuralUtilityCost.com</span>
          <span className="opacity-30 hidden md:inline">|</span>
          <span className="font-medium text-[#2D5A27]">Service Connectivity: Optimal</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 uppercase tracking-wider font-bold mt-2 md:mt-0">
          <a href="https://ruralutilitycost.com/about" className="hover:text-[#2D5A27]">About Us</a>
          <a href="https://ruralutilitycost.com/contact" className="hover:text-[#2D5A27]">Contact Us</a>
          <a href="https://ruralutilitycost.com/privacy-policy" className="hover:text-[#2D5A27]">Privacy Policy</a>
          <a href="https://ruralutilitycost.com/terms-of-use" className="hover:text-[#2D5A27]">Terms of Use</a>
          <a href="https://ruralutilitycost.com/disclaimer" className="hover:text-[#2D5A27]">Disclaimer</a>
        </div>
      </footer>
    </div>
  );
}
