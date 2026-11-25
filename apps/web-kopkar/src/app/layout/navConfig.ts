import {
  BarChart3,
  ShoppingBag,
  Package,
  Wallet,
  TrendingUp,
  FlaskConical,
  History,
  UserCheck,
  ShieldCheck,
  AlertOctagon,
  type LucideIcon,
} from 'lucide-react';
import type { RoutePath } from '../router';

export interface NavItemConfig {
  path: RoutePath;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

export interface NavGroup {
  groupTitle: string;
  items: NavItemConfig[];
}

export interface PageHeaderMeta {
  title: string;
  kanji: string;
}

export const NAV_GROUPS: NavGroup[] = [
  {
    groupTitle: 'Menu Anggota',
    items: [
      { path: '/', label: 'Beranda Koperasi', icon: BarChart3 },
      { path: '/orders', label: 'Pesanan Masuk & PO', icon: ShoppingBag, badge: 2 },
      { path: '/products', label: 'Manajemen Produk Mitra', icon: Package },
      { path: '/financial', label: 'Layanan SinJam', icon: Wallet },
      { path: '/analytics', label: 'Rekomendasi Suplai', icon: TrendingUp },
    ],
  },
  {
    groupTitle: 'Mitra Supplier',
    items: [
      { path: '/supplier/samples', label: 'Uji Sampel Fisik', icon: FlaskConical },
      { path: '/supplier/revisions', label: 'Log Siklus Revisi', icon: History },
    ],
  },
  {
    groupTitle: 'Admin & Otorisasi',
    items: [
      { path: '/admin/verification', label: 'Verifikasi Anggota Baru', icon: UserCheck, badge: 1 },
      { path: '/admin/approval', label: 'Persetujuan Final Kepala', icon: ShieldCheck, badge: 1 },
      { path: '/admin/suppliers', label: 'Monitoring & Sanksi', icon: AlertOctagon },
    ],
  },
];

export function getKopkarPageMeta(path: string): PageHeaderMeta {
  switch (path) {
    case '/':
      return { title: 'Beranda Koperasi', kanji: '組合ホーム' };
    case '/orders':
      return { title: 'Pesanan Masuk & PO H-1', kanji: '受注管理' };
    case '/products':
      return { title: 'Manajemen Produk Mitra', kanji: '提携商品管理' };
    case '/products/new':
      return { title: 'Ajukan Produk Baru', kanji: '新規商品申請' };
    case '/products/detail':
      return { title: 'Detail Produk Mitra', kanji: '商品詳細' };
    case '/supplier/samples':
      return { title: 'Jadwal & Pengujian Sampel', kanji: '実物検査' };
    case '/supplier/revisions':
      return { title: 'Log Histori & Siklus Revisi', kanji: '改訂履歴' };
    case '/admin/verification':
      return { title: 'Verifikasi Anggota Baru', kanji: '書類審査' };
    case '/admin/approval':
      return { title: 'Persetujuan Final Keanggotaan', kanji: '最終承認' };
    case '/admin/suppliers':
      return { title: 'Monitoring & Sanksi Supplier', kanji: '業者監視' };
    case '/financial':
      return { title: 'Simulasi Simpan Pinjam', kanji: '貯蓄融資管理' };
    case '/profile':
      return { title: 'Akun & E-Card Saya', kanji: '会員証・マイページ' };
    case '/analytics':
      return { title: 'Rekomendasi Suplai Harian', kanji: '供給分析' };
    default:
      return { title: 'Beranda Koperasi', kanji: '組合ホーム' };
  }
}
