import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { TopProductMetric } from '../types';

interface TopProductsAnalysisProps {
  products: TopProductMetric[];
  className?: string;
}

export const TopProductsAnalysis: React.FC<TopProductsAnalysisProps> = ({ products, className = '' }) => {
  const maxUnits = Math.max(...products.map((p) => p.soldUnits), 100);

  return (
    <Card
      padding="md"
      className={`flex flex-col justify-between overflow-hidden lg:h-[391px] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45]">
            <Award size={18} />
          </div>
          <div>
            <h2 className="text-base font-heading font-extrabold text-[#1A2421]">
              Produk Terlaris
            </h2>
            <p className="text-[11px] font-body text-[#5C6F67]">
              Peringkat produk dengan kontribusi jualan tertinggi
            </p>
          </div>
        </div>
      </div>

      {/* Spacer & Scrollable Product List (Space nyaman dari border pemisah, scroll lancar) */}
      <div className="flex-1 min-h-0 mt-3 sm:mt-3.5 overflow-y-auto space-y-2 pr-1.5 pb-1 scrollbar-thin">
        {products.map((item, idx) => {
          const barPercent = Math.round((item.soldUnits / maxUnits) * 100);

          return (
            <div
              key={item.id}
              className="p-2.5 sm:p-3 rounded-xl bg-[#F8F4EC] hover:bg-[#EAF4EE]/60 border border-[#DED5C3] transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#1F5B45] text-white text-[10px] font-heading font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col items-start gap-0.5 min-w-0">
                    <span className="text-xs sm:text-sm font-heading font-extrabold text-[#1A2421] leading-tight truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] font-accent font-bold px-1.5 py-0.2 rounded bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]/60 leading-none">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs sm:text-sm font-heading font-extrabold text-[#1F5B45]">
                    {formatCurrencyIDR(item.totalRevenue)}
                  </span>
                  <div className="flex items-center justify-end gap-1 text-[9px] font-accent font-bold text-[#2F6F56]">
                    <TrendingUp size={10} />
                    <span>+{item.growthPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Progress bar of sold units */}
              <div className="flex items-center gap-2 pt-0.5">
                <div className="flex-1 h-1.5 rounded-full bg-[#EAF4EE] overflow-hidden">
                  <div
                    style={{ width: `${barPercent}%` }}
                    className="h-full bg-gradient-to-r from-[#2F6F56] to-[#1F5B45] rounded-full"
                  />
                </div>
                <span className="text-[10px] font-body text-[#5C6F67] whitespace-nowrap">
                  {item.soldUnits} terjual
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
