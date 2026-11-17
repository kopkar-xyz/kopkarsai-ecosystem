export interface GatewayService {
  id: 'cooperative' | 'marketplace';
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  href: string | undefined;
  isConfigured: boolean;
  ctaText: string;
  theme: {
    cardBg: string;
    cardBorder: string;
    cardShadow: string;
    titleColor: string;
    textColor: string;
    mutedColor: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonHoverBg: string;
    buttonText: string;
    accentDot: string;
  };
}

/**
 * Validates whether a given URL string is a valid HTTP/HTTPS address.
 */
export function isValidHttpUrl(urlString?: string): boolean {
  if (!urlString || typeof urlString !== 'string') return false;
  const trimmed = urlString.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

const rawSystemUrl = import.meta.env.VITE_KOPKARSAI_SYSTEM_URL || 'http://localhost:5173';
const rawMarketplaceUrl = import.meta.env.VITE_KOPKARSAI_MARKETPLACE_URL || 'http://localhost:5175';

export const gatewayServices: GatewayService[] = [
  {
    id: 'cooperative',
    title: 'Sistem Koperasi',
    badge: 'PORTAL KOPERASI',
    subtitle: 'Pengelolaan Koperasi Karyawan Terpadu',
    description:
      'Layanan anggota, simpanan berkala, simulasi pinjaman instan, dan proses verifikasi dual-approval berjenjang.',
    href: isValidHttpUrl(rawSystemUrl) ? rawSystemUrl?.trim() : undefined,
    isConfigured: isValidHttpUrl(rawSystemUrl),
    ctaText: 'Buka Sistem Koperasi',
    theme: {
      cardBg: 'bg-[#F7F9F4]',
      cardBorder: 'border-white/90 hover:border-[#BEDACC]/60',
      cardShadow: 'hover:shadow-[0_24px_50px_-12px_rgba(4,61,29,0.28)]',
      titleColor: 'text-[#065C2B]',
      textColor: 'text-[#1B3828]',
      mutedColor: 'text-[#3E5C4B]',
      badgeBg: 'bg-[#065C2B]/10',
      badgeText: 'text-[#065C2B]',
      buttonBg: 'bg-[#065C2B]',
      buttonHoverBg: 'hover:bg-[#043D1D]',
      buttonText: 'text-[#FFFFFF]',
      accentDot: 'bg-[#065C2B]',
    },
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    badge: 'BELANJA KARYAWAN',
    subtitle: 'Toko Koperasi & Katering H-1',
    description:
      'Belanja produk fisik same-day dengan checklist rak toko, pemesanan katering PO H-1, serta antrean prioritas kantor.',
    href: isValidHttpUrl(rawMarketplaceUrl) ? rawMarketplaceUrl?.trim() : undefined,
    isConfigured: isValidHttpUrl(rawMarketplaceUrl),
    ctaText: 'Jelajahi Marketplace',
    theme: {
      cardBg: 'bg-white',
      cardBorder: 'border-white/90 hover:border-[#BEDACC]/60',
      cardShadow: 'hover:shadow-[0_24px_50px_-12px_rgba(4,61,29,0.28)]',
      titleColor: 'text-[#065C2B]',
      textColor: 'text-[#163B23]',
      mutedColor: 'text-[#2D563C]',
      badgeBg: 'bg-[#065C2B]/15',
      badgeText: 'text-[#065C2B]',
      buttonBg: 'bg-[#065C2B]',
      buttonHoverBg: 'hover:bg-[#043D1D]',
      buttonText: 'text-[#FFFFFF]',
      accentDot: 'bg-[#065C2B]',
    },
  },
];
