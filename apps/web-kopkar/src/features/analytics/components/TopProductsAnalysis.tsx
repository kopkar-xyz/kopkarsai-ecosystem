import React from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { TopProductMetric } from '../types';

interface TopProductsAnalysisProps {
  products: TopProductMetric[];
}

export const TopProductsAnalysis: React.FC<TopProductsAnalysisProps> = ({ products }) => {
  const maxUnits = Math.max(...products.map((p) => p.soldUnits), 100);

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45]">
            <Award size={19} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1A2421]">
              Produk Terlaris
            </h2>
            <p className="text-xs font-body text-[#5C6F67]">
              Peringkat produk dengan kontribusi jualan tertinggi
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {products.map((item, idx) => {
          const barPercent = Math.round((item.soldUnits / maxUnits) * 100);

          return (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-[#F8F4EC] hover:bg-[#EAF4EE]/60 border border-[#DED5C3] transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-[#1F5B45] text-white text-[11px] sm:text-xs font-heading font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col items-start gap-1 min-w-0">
                    <span className="text-sm sm:text-base font-heading font-extrabold text-[#1A2421] leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-md bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]/60 leading-none">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-sm sm:text-base font-heading font-extrabold text-[#1F5B45]">
                    {formatCurrencyIDR(item.totalRevenue)}
                  </span>
                  <div className="flex items-center justify-end gap-1 text-[10px] font-accent font-bold text-[#2F6F56] mt-0.5">
                    <TrendingUp size={11} />
                    <span>+{item.growthPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Progress bar of sold units */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 h-2 rounded-full bg-[#EAF4EE] overflow-hidden">
                  <div
                    style={{ width: `${barPercent}%` }}
                    className="h-full bg-gradient-to-r from-[#2F6F56] to-[#1F5B45] rounded-full"
                  />
                </div>
                <span className="text-[11px] font-body text-[#5C6F67] whitespace-nowrap">
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
