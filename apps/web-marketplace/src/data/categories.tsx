import React from 'react';
import { MainCategoryId, SubCategoryId } from '../types/food';

export const CategoryIcons = {
  Jajanan: () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22c0 3.5 5.5 6 12 6s12-2.5 12-6" />
      <path d="M4 22h24" />
      <path d="M8 22c0-6 3.5-11 8-11s8 5 8 11" />
      <path d="M16 11v4" />
      <path d="M13 14c1 1 5 1 6 0" />
      <path d="M16 11c-1-3 2-5 4-4-1 2-2 3-4 4z" />
    </svg>
  ),
  Roti: () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 21c-2-3-1-9 2-12 4-4 16-4 20 0 3 3 4 9 2 12-2 3-6 4-12 4s-10-1-12-4z" />
      <path d="M11 11c2 3 3 7 3 10" />
      <path d="M16 9c1 3 2 8 2 12" />
      <path d="M21 11c-1 3-2 7-2 10" />
    </svg>
  ),
  Camilan: () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17h24a12 9 0 0 1-24 0z" />
      <path d="M12 26h8" />
      <path d="M9 13c1-4 5-6 8-4s3 6 1 8" />
      <path d="M18 10c2-3 6-3 8 0s0 6-3 7" />
      <path d="M13 17l4-5" />
    </svg>
  ),
  SiapSantap: () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="26" x2="26" y2="6" />
      <circle cx="11" cy="21" r="3.5" />
      <circle cx="16" cy="16" r="3.5" />
      <circle cx="21" cy="11" r="3.5" />
      <path d="M19 5c1-2 3-2 3-4" />
      <path d="M25 9c2-1 3 1 4 0" />
    </svg>
  ),
  Minuman: () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8h16l-2 18a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2L8 8z" />
      <line x1="7" y1="8" x2="25" y2="8" />
      <line x1="9" y1="13" x2="23" y2="13" />
      <path d="M18 4l-4 8v10" />
      <rect x="13" y="16" width="4" height="4" rx="1" />
    </svg>
  ),
};

export interface MainCategoryItem {
  id: MainCategoryId;
  label: string;
  kanji: string;
  icon: () => React.JSX.Element;
}

export interface SubCategoryItem {
  id: SubCategoryId;
  label: string;
  kanji: string;
}

export const MAIN_CATEGORIES: readonly MainCategoryItem[] = [
  { id: 'jajanan', label: 'Jajanan Pasar', kanji: '和菓子 Wagashi', icon: CategoryIcons.Jajanan },
  { id: 'roti', label: 'Roti & Pastry', kanji: 'パン Pan', icon: CategoryIcons.Roti },
  { id: 'camilan', label: 'Camilan Gurih', kanji: 'スナック Sunakku', icon: CategoryIcons.Camilan },
  { id: 'siap-santap', label: 'Siap Santap', kanji: '惣菜 Souzai', icon: CategoryIcons.SiapSantap },
  { id: 'minuman', label: 'Minuman Segar', kanji: '飲み物 Nomimono', icon: CategoryIcons.Minuman },
] as const;

export const SUB_CATEGORIES: readonly SubCategoryItem[] = [
  { id: 'all', label: 'Semua', kanji: '全' },
  { id: 'manis', label: 'Manis', kanji: '甘' },
  { id: 'gurih', label: 'Gurih', kanji: '塩' },
  { id: 'pedas', label: 'Pedas', kanji: '辛' },
  { id: 'dingin', label: 'Dingin & Segar', kanji: '冷' },
] as const;

