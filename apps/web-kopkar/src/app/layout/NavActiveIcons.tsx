import React from 'react';

export interface NavIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * ActiveBarChartIcon — Versi Solid (terisi) untuk Beranda / Analisis
 * Memiliki 3 pilar batang vertikal padat dengan sudut membulat dan celah pemisah yang tegas.
 */
export const ActiveBarChartIcon: React.FC<NavIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.035 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75C3.84 21.75 3 20.91 3 19.875v-6.75Z" />
  </svg>
);

/**
 * ActiveShoppingBagIcon — Versi Solid (terisi) untuk Pesanan
 * Tas belanja padat dengan lubang pegangan cutout dan lipatan yang terlihat jelas.
 */
export const ActiveShoppingBagIcon: React.FC<NavIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.68l-1.272 12.072A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.874-1.998L20.352 8.43a1.875 1.875 0 0 0-1.865-1.68H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a1.5 1.5 0 0 0-1.5 1.5V6h3V4.5A1.5 1.5 0 0 0 12 3Zm-3 6.75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0v-3Zm6 0a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0v-3Z"
    />
  </svg>
);

/**
 * ActivePackageIcon — Versi Solid (terisi) untuk Produk
 * Paket kardus isometrik 3D dengan garis celah segel & lakban negatif yang jelas.
 */
export const ActivePackageIcon: React.FC<NavIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M21.993 7.95a1 1 0 0 0-.029-.214c-.007-.025-.021-.049-.03-.074c-.021-.057-.04-.113-.07-.165c-.016-.027-.038-.049-.057-.075c-.032-.045-.063-.091-.102-.13c-.023-.022-.053-.04-.078-.061c-.039-.032-.075-.067-.12-.094l-.014-.006l-.008-.006l-8.979-4.99a1 1 0 0 0-.97-.001l-9.021 4.99q-.004.005-.011.01l-.01.004c-.035.02-.061.049-.094.073c-.036.027-.074.051-.106.082c-.03.031-.053.067-.079.102s-.057.066-.079.104c-.026.043-.04.092-.059.139c-.014.033-.032.064-.041.1a1 1 0 0 0-.029.21c-.001.017-.007.032-.007.05V16c0 .363.197.698.515.874l8.978 4.987l.001.001l.002.001l.02.011c.043.024.09.037.135.054c.032.013.063.03.097.039a1 1 0 0 0 .506 0c.033-.009.064-.026.097-.039c.045-.017.092-.029.135-.054l.02-.011l.002-.001l.001-.001l8.978-4.987c.316-.176.513-.511.513-.874V7.998c0-.017-.006-.031-.007-.048m-10.021 3.922L5.058 8.005L7.82 6.477l6.834 3.905zm.048-7.719L18.941 8l-2.244 1.247l-6.83-3.903zM13 19.301l.002-5.679L16 11.944V15l2-1v-3.175l2-1.119v5.705z" />
  </svg>
);

/**
 * ActiveWalletIcon — Versi Solid (terisi) untuk Simpan Pinjam (SinJam)
 * Dompet kulit padat dengan celah kartu dan kancing pengait cutout yang tegas.
 */
export const ActiveWalletIcon: React.FC<NavIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M16 12h2v4h-2z" />
    <path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2M5 5h13v2H5a1.001 1.001 0 0 1 0-2m15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15z" />
  </svg>
);

/**
 * ActiveHouseIcon — Versi Solid alternatif untuk Beranda (Rumah)
 * Rumah padat dengan lubang pintu cutout.
 */
export const ActiveHouseIcon: React.FC<NavIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>
);
