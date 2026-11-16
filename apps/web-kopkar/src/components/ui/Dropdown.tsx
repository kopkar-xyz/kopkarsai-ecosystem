import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export interface DropdownProps<T extends string = string> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  align?: 'left' | 'right';
  size?: 'sm' | 'md';
}

/**
 * Dropdown — Reusable Custom Dropdown Primitive
 * Mengadopsi Japanese Green Theme dengan animasi popover dan accessibility click-outside.
 * Strictly adheres to the 200-line budget invariant.
 */
export function Dropdown<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = 'Pilih opsi',
  icon,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  align = 'right',
  size = 'sm',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const sizeStyles = {
    sm: 'text-xs sm:text-sm py-1.5 px-3',
    md: 'text-sm sm:text-base py-2 px-4',
  }[size];

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 rounded-xl bg-white hover:bg-[#EAF4EE] border transition-all duration-150 cursor-pointer shadow-xs font-heading font-bold text-[#1A2421] ${sizeStyles} ${
          isOpen
            ? 'border-[#1F5B45] ring-2 ring-[#1F5B45]/20 bg-[#EAF4EE]'
            : 'border-[#DED5C3] hover:border-[#1F5B45]/40'
        } ${buttonClassName}`}
      >
        {/* Custom icon or option icon */}
        {icon || selectedOption?.icon}

        {/* Selected Label */}
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Animated Chevron */}
        <ChevronDown
          size={14}
          className={`text-[#5C6F67] transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-[#1F5B45]' : ''
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute top-full mt-1.5 z-50 min-w-[170px] bg-white rounded-2xl border border-[#DED5C3] p-1.5 shadow-xl shadow-[#1F5B45]/10 animate-in fade-in zoom-in-95 duration-100 ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${menuClassName}`}
        >
          <div className="space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  type="button"
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-heading transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#EAF4EE] text-[#1F5B45] font-extrabold'
                      : 'text-[#1A2421] hover:bg-[#EAF4EE] hover:text-[#1F5B45] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon}
                    <div className="truncate">
                      <p className="truncate">{option.label}</p>
                      {option.sublabel && (
                        <p className="text-[10px] font-body text-[#5C6F67]">{option.sublabel}</p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={14} className="text-[#1F5B45] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
