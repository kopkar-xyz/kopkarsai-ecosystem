import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes cleanly and safely without conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Mandatory rupiah currency formatter following KopKar invariant:
 * e.g. formatCurrencyIDR(1250000) -> "Rp 1.250.000"
 */
export function formatCurrencyIDR(amount: number): string {
  if (isNaN(amount)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\u00A0/, ' ');
}

/**
 * Detailed Indonesian date formatter with Japanese seal representation
 */
export function formatDateID(dateInput: Date | string = new Date()): {
  dayName: string;
  dateFormatted: string;
  timeFormatted: string;
  fullDate: string;
  kanjiEraDate: string;
} {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = dayNames[d.getDay()];
  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  // Reiwa era: Year 2026 is Reiwa 8 (令和八年)
  const kanjiEraDate = '令和八年';

  return {
    dayName,
    dateFormatted: `${day} ${month} ${year}`,
    timeFormatted: `${hours}:${minutes} WIB`,
    fullDate: `${dayName}, ${day} ${month} ${year}`,
    kanjiEraDate,
  };
}
