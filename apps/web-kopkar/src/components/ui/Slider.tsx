import React from 'react';
import { cn } from '../../lib/utils';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
  helperText?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  helperText,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="font-semibold text-kopkar-dark">{label}</span>
        <span className="font-bold text-kopkar-primary font-mono bg-kopkar-mint px-2.5 py-0.5 rounded-full text-xs sm:text-sm border border-emerald-200/60">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>

      <div className="relative py-1.5 flex items-center">
        {/* Track background */}
        <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden relative">
          {/* Filled track in emerald/gold */}
          <div
            className="h-full bg-gradient-to-r from-kopkar-primary to-emerald-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real HTML Range Input overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
        <span>{formatValue ? formatValue(min) : min}</span>
        {helperText && <span className="text-kopkar-primary/80 font-semibold">{helperText}</span>}
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
};
