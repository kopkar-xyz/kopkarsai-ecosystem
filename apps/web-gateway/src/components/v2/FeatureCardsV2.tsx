import React from 'react';
import { Landmark, ShoppingBag } from 'lucide-react';
import { gatewayServices } from '../../config/services';
import cardKoperasiBg from '../../assets/illustrations/card-koperasi-bg.jpg';
import cardMarketplaceBg from '../../assets/illustrations/card-marketplace-bg.jpg';
import { FeatureCardV2Item, type FeatureCardV2Config } from './FeatureCardV2Item';

const CRIMSON_CARD_THEME = {
  isDarkHero: true,
  cardClass:
    'bg-[#83273B] border-[#9E2A40] text-white hover:border-[#F6CE2C]/50 hover:shadow-[0_22px_44px_-12px_rgba(131,39,59,0.55)] focus-visible:ring-[#F6CE2C]',
  glowStyle: 'radial-gradient(circle at 85% 85%, rgba(246,206,44,0.22) 0%, transparent 60%)',
  numClass: 'text-[#F6CE2C]',
  eyebrowClass: 'text-white/70',
  arrowWrapClass: 'bg-white/15 text-white group-hover:bg-[#F6CE2C] group-hover:text-[#5E1526]',
  iconWrapClass: 'bg-white/15 border border-white/20 text-[#F6CE2C]',
  titleClass: 'text-white',
  descClass: 'text-white/85',
  footerClass: 'border-white/15 text-white/80',
  ctaClass: 'text-[#F6CE2C]',
  barClass: 'bg-[#F6CE2C]',
} as const;

export const FeatureCardsV2: React.FC = () => {
  const kopkarHref =
    gatewayServices.find((s) => s.id === 'cooperative')?.href || 'http://localhost:5173';
  const marketplaceHref =
    gatewayServices.find((s) => s.id === 'marketplace')?.href || 'http://localhost:5174';

  const cards: FeatureCardV2Config[] = [
    {
      ...CRIMSON_CARD_THEME,
      id: 'koperasi',
      num: '01',
      eyebrow: 'Portal Koperasi',
      title: 'Koperasi',
      desc: 'Keanggotaan digital, simpan pinjam SinJam, & kurasi mitra.',
      footerLeft: 'SinJam · E-Card · Kurasi',
      footerCta: 'Buka Portal →',
      kanji: '協同組合',
      icon: Landmark,
      bgImage: cardKoperasiBg,
      href: kopkarHref,
      cardClass: `${CRIMSON_CARD_THEME.cardClass} col-span-1 p-3.5 sm:p-5 md:p-6 flex flex-col justify-between min-h-[175px] sm:min-h-[190px] md:min-h-[240px]`,
    },
    {
      ...CRIMSON_CARD_THEME,
      id: 'marketplace',
      num: '02',
      eyebrow: 'Belanja Internal',
      title: 'Marketplace',
      desc: 'Belanja produk toko same-day, katering PO H-1, & antrean GA.',
      footerLeft: 'Toko · PO H-1 · Diskon 13%',
      footerCta: 'Belanja Sekarang →',
      kanji: '市場',
      icon: ShoppingBag,
      bgImage: cardMarketplaceBg,
      href: marketplaceHref,
      cardClass: `${CRIMSON_CARD_THEME.cardClass} col-span-1 p-3.5 sm:p-5 md:p-6 flex flex-col justify-between min-h-[175px] sm:min-h-[190px] md:min-h-[240px]`,
    },
  ];

  return (
    <section aria-label="Pilihan Aplikasi Ekosistem" className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        {cards.map((card) => (
          <FeatureCardV2Item key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};
