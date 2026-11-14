import React from 'react';
import { PieChart, Utensils, Store, ShoppingBag } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { CategoryShare } from '../types';

interface CategoryDistributionChartProps {
  distribution: CategoryShare[];
}

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  distribution,
}) => {
  const icons = [Utensils, Store, ShoppingBag];

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45]">
            <PieChart size={19} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1A2421]">
              Distribusi Kanal Belanja
            </h2>
            <p className="text-xs font-body text-[#5C6F67]">
              Pangsa omset per jenis pemesanan
            </p>
          </div>
        </div>
      </div>

      {/* Stacked Multi-Color Progress Bar */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded-full bg-[#EAF4EE] overflow-hidden flex shadow-inner">
          {distribution.map((cat, idx) => (
            <div
              key={idx}
              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
              className="h-full transition-all duration-300"
              title={`${cat.name}: ${cat.percentage}%`}
            />
          ))}
        </div>

        {/* Legend & Breakdown List */}
        <div className="space-y-2.5 pt-2">
          {distribution.map((cat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#F8F4EC] border border-[#DED5C3] flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ backgroundColor: cat.color }}
                    className="w-3.5 h-3.5 rounded-md flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs font-heading font-bold text-[#1A2421] flex items-center gap-1.5">
                      <Icon size={13} className="text-[#2F6F56]" />
                      <span>{cat.name}</span>
                    </p>
                    <p className="text-[10px] font-body text-[#5C6F67]">{cat.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-heading font-extrabold text-[#1F5B45]">
                    {cat.percentage}%
                  </span>
                  <p className="text-[10px] font-body text-[#5C6F67]">
                    {formatCurrencyIDR(cat.totalAmount)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
