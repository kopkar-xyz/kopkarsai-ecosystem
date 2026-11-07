import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * 8 Clockwise Petal Paths computed faithfully from the official KOPKARSAI emblem (Gambar 1).
 * Origin is strictly at (100, 100) inside viewBox 0 0 200 200.
 *
 * Sequence starts at 12 o'clock (Top, 270°) and proceeds strictly CLOCKWISE:
 * - Petal 0: Top (12:00, North, 270°)
 * - Petal 1: Top-Right (1:30, 315°)
 * - Petal 2: Right (3:00, East, 0°)
 * - Petal 3: Bottom-Right (4:30, 45°)
 * - Petal 4: Bottom (6:00, South, 90°)
 * - Petal 5: Bottom-Left (7:30, 135°)
 * - Petal 6: Left (9:00, West, 180°)
 * - Petal 7: Top-Left (10:30, 225°)
 *
 * Siluet luar kompak dan nyaris melingkar (lekukan scallop lembut, bukan bilah lancip tajam).
 * Batas kelopak rapat dan menyatu, tanpa celah hijau tebal.
 */
export const PETAL_PATHS: { id: string; name: string; d: string }[] = [
  {
    id: 'petal-top',
    name: 'Top (12:00)',
    d: 'M 100.00 100.00 L 69.77 27.01 L 70.41 20.85 Q 86.00 24.49 100.00 20.50 Q 114.00 24.49 129.59 20.85 L 130.23 27.01 Z',
  },
  {
    id: 'petal-top-right',
    name: 'Top-Right (1:30)',
    d: 'M 100.00 100.00 L 130.23 27.01 L 135.04 23.11 Q 143.50 36.71 156.21 43.79 Q 163.29 56.50 176.89 64.96 L 172.99 69.77 Z',
  },
  {
    id: 'petal-right',
    name: 'Right (3:00)',
    d: 'M 100.00 100.00 L 172.99 69.77 L 179.15 70.41 Q 175.51 86.00 179.50 100.00 Q 175.51 114.00 179.15 129.59 L 172.99 130.23 Z',
  },
  {
    id: 'petal-bottom-right',
    name: 'Bottom-Right (4:30)',
    d: 'M 100.00 100.00 L 172.99 130.23 L 176.89 135.04 Q 163.29 143.50 156.21 156.21 Q 143.50 163.29 135.04 176.89 L 130.23 172.99 Z',
  },
  {
    id: 'petal-bottom',
    name: 'Bottom (6:00)',
    d: 'M 100.00 100.00 L 130.23 172.99 L 129.59 179.15 Q 114.00 175.51 100.00 179.50 Q 86.00 175.51 70.41 179.15 L 69.77 172.99 Z',
  },
  {
    id: 'petal-bottom-left',
    name: 'Bottom-Left (7:30)',
    d: 'M 100.00 100.00 L 69.77 172.99 L 64.96 176.89 Q 56.50 163.29 43.79 156.21 Q 36.71 143.50 23.11 135.04 L 27.01 130.23 Z',
  },
  {
    id: 'petal-left',
    name: 'Left (9:00)',
    d: 'M 100.00 100.00 L 27.01 130.23 L 20.85 129.59 Q 24.49 114.00 20.50 100.00 Q 24.49 86.00 20.85 70.41 L 27.01 69.77 Z',
  },
  {
    id: 'petal-top-left',
    name: 'Top-Left (10:30)',
    d: 'M 100.00 100.00 L 27.01 69.77 L 23.11 64.96 Q 36.71 56.50 43.79 43.79 Q 56.50 36.71 64.96 23.11 L 69.77 27.01 Z',
  },
];

/**
 * 8 Thin, tapered radial fold crease lines along the seams between petals.
 * Ordered clockwise to match the petal reveal.
 */
export const CREASE_LINES = [
  // Between Petal 0 and Petal 1: angle 292.5°
  { x1: '102.68', y1: '93.53', x2: '130.23', y2: '27.01' },
  // Between Petal 1 and Petal 2: angle 337.5°
  { x1: '106.47', y1: '97.32', x2: '172.99', y2: '69.77' },
  // Between Petal 2 and Petal 3: angle 22.5°
  { x1: '106.47', y1: '102.68', x2: '172.99', y2: '130.23' },
  // Between Petal 3 and Petal 4: angle 67.5°
  { x1: '102.68', y1: '106.47', x2: '130.23', y2: '172.99' },
  // Between Petal 4 and Petal 5: angle 112.5°
  { x1: '97.32', y1: '106.47', x2: '69.77', y2: '172.99' },
  // Between Petal 5 and Petal 6: angle 157.5°
  { x1: '93.53', y1: '102.68', x2: '27.01', y2: '130.23' },
  // Between Petal 6 and Petal 7: angle 202.5°
  { x1: '93.53', y1: '97.32', x2: '27.01', y2: '69.77' },
  // Between Petal 7 and Petal 0: angle 247.5°
  { x1: '97.32', y1: '93.53', x2: '69.77', y2: '27.01' },
];

/**
 * BrandLogo — Precision SVG emblem of KOPKARSAI.
 * Faithfully matches Gambar 1 (Original Logo) with:
 * - 8 interlocking petals in canonical clockwise orientation
 * - Fine, tapered crease lines (no thick green gaps)
 * - Warm, subtle golden-yellow tonal gradient (no harsh orange or white hotspots)
 * - Complete, gapless static presentation
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={size !== undefined ? { width: size, height: size } : undefined}
      role="img"
      aria-label="Logo KOPKARSAI"
    >
      <svg
        id="kopkarsai-logo-svg"
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle warm golden gradient matching original KOPKARSAI emblem */}
          <radialGradient
            id="kopkarsai-gold-grad"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFE28A" />
            <stop offset="28%" stopColor="#FDD246" />
            <stop offset="70%" stopColor="#F7C924" />
            <stop offset="100%" stopColor="#EEB310" />
          </radialGradient>
        </defs>

        {/* Master logo group strictly centered at (100, 100) */}
        <g id="logo-root" className="logo-root" style={{ transformOrigin: '100px 100px' }}>
          {/* 8 Clockwise Petals */}
          <g id="logo-petals-group" className="logo-petals-group">
            {PETAL_PATHS.map((petal, index) => (
              <path
                key={petal.id}
                id={`logo-petal-${index}`}
                className="logo-petal"
                d={petal.d}
                fill="url(#kopkarsai-gold-grad)"
                style={{ transformOrigin: '100px 100px' }}
              />
            ))}
          </g>

          {/* 8 Thin, tapered radial fold crease lines */}
          <g id="logo-fold-lines" className="logo-fold-lines">
            {CREASE_LINES.map((coords, index) => (
              <line
                key={`fold-${index}`}
                id={`logo-fold-${index}`}
                className="logo-fold-line"
                x1={coords.x1}
                y1={coords.y1}
                x2={coords.x2}
                y2={coords.y2}
                stroke="#032D15"
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.75"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
