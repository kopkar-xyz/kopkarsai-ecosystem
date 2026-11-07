import React, { useMemo } from 'react';

type TumbleState = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Petal {
  id: number;
  left: number; // percentage across screen
  size: number; // pixels
  fallDuration: number; // seconds
  fallDelay: number; // seconds
  swayDuration: number;
  tumbleDuration: number;
  tumbleDelay: number; // seconds (desynchronization phase)
  tumbleType: TumbleState; // 1 to 7 distinct rotation profiles
  swayType: 1 | 2;
  opacity: number;
}

export const SakuraPetalsOverlay: React.FC = () => {
  // Generate 28 petals with randomized, desynchronized 3D tumbling states
  const petals: Petal[] = useMemo(() => {
    const totalPetals = 28;
    const items: Petal[] = [];

    // Shuffle pattern to ensure adjacent petals get different tumble types (1..7)
    const tumbleSequence: TumbleState[] = [1, 4, 7, 2, 5, 3, 6];

    for (let i = 0; i < totalPetals; i++) {
      // Natural distribution across horizontal axis with slight organic jitter
      const left = (i / totalPetals) * 100 + ((i * 13) % 7) - 3;
      const size = 13 + ((i * 7) % 12); // 13px to 25px
      const fallDuration = 8.5 + ((i * 2.3) % 6.5); // 8.5s to 15s
      const fallDelay = -1 * (i * 0.6); // Instant spread across viewport height
      const swayDuration = 3.2 + ((i * 1.7) % 2.6); // 3.2s to 5.8s

      // 7 distinct tumble states distributed and shuffled
      const tumbleType = tumbleSequence[(i + (i % 3)) % 7];
      // Varied rotation speeds (fast tumble 2.8s to lazy drift 6.8s)
      const tumbleDuration = 2.8 + ((i * 1.4) % 4.0);
      // Critical desynchronization: negative delay ensures no petals flip at the same time
      const tumbleDelay = -1 * (((i * 2.7) % 5.5) + 0.3);

      const swayType = i % 2 === 0 ? 1 : 2;
      const opacity = 0.72 + ((i % 5) * 0.05); // 0.72 to 0.92

      items.push({
        id: i,
        left: Math.max(1, Math.min(99, left)),
        size,
        fallDuration,
        fallDelay,
        swayDuration,
        tumbleDuration,
        tumbleDelay,
        tumbleType,
        swayType,
        opacity,
      });
    }

    return items;
  }, []);

  return (
    <div
      id="sakura-petals-overlay"
      className="pointer-events-none fixed inset-0 overflow-hidden z-[2]"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal-item absolute pointer-events-none will-change-transform"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animation: `petal-fall ${petal.fallDuration}s linear ${petal.fallDelay}s infinite`,
            opacity: petal.opacity,
          }}
        >
          {/* Nested wrapper for horizontal sinusoidal swaying */}
          <div
            style={{
              animation: `petal-sway-${petal.swayType} ${petal.swayDuration}s ease-in-out infinite alternate`,
              width: '100%',
              height: '100%',
            }}
          >
            {/* Nested wrapper for 3D tumbling (Uses 1 of 7 randomized states & desynchronized delays) */}
            <div
              style={{
                animation: `petal-tumble-${petal.tumbleType} ${petal.tumbleDuration}s linear ${petal.tumbleDelay}s infinite`,
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
              }}
            >
              <svg
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_1px_2px_rgba(237,118,145,0.25)]"
              >
                <defs>
                  <linearGradient id={`sakura-grad-${petal.id % 4}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2F4" />
                    <stop offset="50%" stopColor="#FBB6CE" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>
                {/* Organic curved petal silhouette with cherry blossom notch */}
                <path
                  d="M12 0 C9.5 2.2 7 6.5 4.5 12 C1.5 18 0.5 24 3 27.5 C5.5 30.5 13.5 30.5 18 28 C22 25.5 23.5 19 21.5 13 C19.5 7 15.5 2.5 12 0 Z"
                  fill={`url(#sakura-grad-${petal.id % 4})`}
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
