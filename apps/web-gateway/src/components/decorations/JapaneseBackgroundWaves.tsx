import React from 'react';

export const JapaneseBackgroundWaves: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Large Soft Radial Background Halo Circle centered behind hero / promo slider */}
      <div
        id="bg-halo-circle"
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] lg:w-[1100px] lg:h-[1100px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(253, 238, 241, 0.65) 0%, rgba(254, 245, 247, 0.35) 45%, rgba(255, 249, 249, 0) 72%)',
          boxShadow: 'inset 0 0 80px rgba(252, 228, 233, 0.4)',
        }}
      />

      {/* Subtle secondary aura for upper ambient glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, #FBB6CE 0%, transparent 70%)',
        }}
      />

      {/* Lower-Left Japanese Seigaiha / Flowing Wave Motif (100% Pure CSS & Inline SVG) */}
      <div
        id="bg-seigaiha-waves"
        className="absolute bottom-0 left-0 w-72 sm:w-96 md:w-[480px] lg:w-[560px] h-48 sm:h-64 md:h-80 pointer-events-none"
      >
        <svg
          viewBox="0 0 600 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom-left"
        >
          <defs>
            {/* Wave gradient layers */}
            <linearGradient id="wave-grad-base" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F9CBD5" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#FDE4E9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFF9F9" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="wave-grad-deep" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A3B5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFF9F9" stopOpacity="0" />
            </linearGradient>

            {/* Pattern for delicate Seigaiha concentric arcs */}
            <pattern
              id="seigaiha-pattern"
              x="0"
              y="0"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 20 A 20 20 0 0 0 0 20 A 15 15 0 0 1 15 20 A 10 10 0 0 1 20 20 A 10 10 0 0 1 25 20 A 15 15 0 0 1 40 20 A 20 20 0 0 0 20 20 Z"
                fill="none"
                stroke="#F9CBD5"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            </pattern>
          </defs>

          {/* Deepest flowing base wave (cascades downward smoothly into the bottom baseline) */}
          <path
            d="M 0 350 L 0 220 C 70 185, 130 255, 190 240 C 245 225, 275 185, 325 190 C 375 195, 420 245, 470 285 C 515 320, 550 348, 590 350 L 600 350 L 600 350 Z"
            fill="url(#wave-grad-base)"
          />

          {/* Secondary crest with subtle pattern */}
          <path
            d="M 0 350 L 0 258 C 70 223, 130 293, 190 278 C 245 263, 275 223, 325 228 C 370 233, 405 275, 445 310 C 480 338, 505 348, 530 350 L 600 350 Z"
            fill="url(#wave-grad-deep)"
          />

          {/* Concentric ornamental crest lines (flowing down to floor without flattening prematurely) */}
          <path
            d="M 0 220 C 70 185, 130 255, 190 240 C 245 225, 275 185, 325 190 C 375 195, 420 245, 470 285 C 515 320, 550 348, 590 350"
            stroke="#F5A3B5"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeDasharray="4 3"
          />

          <path
            d="M 0 238 C 70 203, 130 273, 190 258 C 245 243, 275 203, 325 208 C 375 213, 415 260, 460 298 C 500 330, 530 348, 560 350"
            stroke="#FBB6CE"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />

          <path
            d="M 0 258 C 70 223, 130 293, 190 278 C 245 263, 275 223, 325 228 C 370 233, 405 275, 445 310 C 480 338, 505 348, 530 350"
            stroke="#FCE4E9"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Geometric Seigaiha arc accent section in corner */}
          <path
            d="M 0 350 L 0 285 C 70 260, 130 305, 190 285 C 245 265, 290 300, 340 320 C 375 335, 405 346, 430 350 Z"
            fill="url(#seigaiha-pattern)"
          />
        </svg>
      </div>
    </div>
  );
};
