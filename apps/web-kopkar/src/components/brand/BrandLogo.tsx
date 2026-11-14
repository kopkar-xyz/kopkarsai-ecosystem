import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
}

export const PETAL_PATHS = [
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

export const CREASE_LINES = [
  { x1: '102.68', y1: '93.53', x2: '130.23', y2: '27.01' },
  { x1: '106.47', y1: '97.32', x2: '172.99', y2: '69.77' },
  { x1: '106.47', y1: '102.68', x2: '172.99', y2: '130.23' },
  { x1: '102.68', y1: '106.47', x2: '130.23', y2: '172.99' },
  { x1: '97.32', y1: '106.47', x2: '69.77', y2: '172.99' },
  { x1: '93.53', y1: '102.68', x2: '27.01', y2: '130.23' },
  { x1: '93.53', y1: '97.32', x2: '27.01', y2: '69.77' },
  { x1: '97.32', y1: '93.53', x2: '69.77', y2: '27.01' },
];

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={size !== undefined ? { width: size, height: size } : undefined}
      role="img"
      aria-label="Logo KOPKARSAI"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="kopkar-gold-gradient"
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

        <g style={{ transformOrigin: '100px 100px' }}>
          {PETAL_PATHS.map((petal, index) => (
            <path
              key={petal.id}
              id={`kopkar-petal-${index}`}
              d={petal.d}
              fill="url(#kopkar-gold-gradient)"
            />
          ))}
          {CREASE_LINES.map((coords, index) => (
            <line
              key={`crease-${index}`}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke="#1F5B45"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.8"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
