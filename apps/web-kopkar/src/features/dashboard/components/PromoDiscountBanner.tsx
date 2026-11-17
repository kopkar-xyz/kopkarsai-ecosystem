import React, { useState, useEffect } from 'react';
import { useRouter } from '../../../app/router';
import { LanternsArt } from './ads/LanternsArt';
import { CoinsArt } from './ads/CoinsArt';
import { BentoArt } from './ads/BentoArt';

/**
 * PromoDiscountBanner — Carousel Banner Iklan Koperasi
 * 100% Slicing Persis Sesuai kopkar-sai-beranda (1).html dengan Motif Seigaiha & Ilustrasi SVG Jepang
 * Budget: < 200 LOC.
 */
export const PromoDiscountBanner: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { navigate } = useRouter();

  // Auto-play interval 5s
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      className="ads"
      aria-roledescription="carousel"
      aria-label="Promo koperasi"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="viewport">
        <div
          className="track"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {/* Slide 1: Special Offer Toko Koperasi */}
          <div className="slide s1">
            <div className="txt">
              <span className="badge">Limited time!</span>
              <div className="t">Get Special Offer</div>
              <div className="big">
                <small>Up to</small>
                <strong>40%</strong>
              </div>
              <p className="fine">Semua Produk Toko Koperasi | T&amp;C Applied</p>
              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="btn"
              >
                Claim
              </button>
            </div>
            <LanternsArt />
          </div>

          {/* Slide 2: Pinjaman Kesejahteraan */}
          <div className="slide s2">
            <div className="txt">
              <span className="badge">Bunga Ringan</span>
              <div className="t">Pinjaman Kesejahteraan</div>
              <div className="big">
                <small>Bunga</small>
                <strong>0,8%</strong>
              </div>
              <p className="fine">
                Plafon Pinjaman s.d. Rp 15 Juta | Approval Cepat
              </p>
              <button
                type="button"
                onClick={() => navigate('/financial')}
                className="btn"
              >
                Ajukan
              </button>
            </div>
            <CoinsArt />
          </div>

          {/* Slide 3: Promo Katering */}
          <div className="slide s3">
            <div className="txt">
              <span className="badge">Promo Katering</span>
              <div className="t">Paket Hemat Makan Siang</div>
              <div className="big">
                <small>Mulai</small>
                <strong>15rb</strong>
              </div>
              <p className="fine">
                Menu Makanan Basah &amp; Segar Mitra UMKM | Kuota Terbatas
              </p>
              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="btn"
              >
                Pesan
              </button>
            </div>
            <BentoArt />
          </div>
        </div>
      </div>

      {/* Carousel Dots Indicators */}
      <div className="dots" role="tablist">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIdx(idx)}
            aria-current={currentIdx === idx ? 'true' : 'false'}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
