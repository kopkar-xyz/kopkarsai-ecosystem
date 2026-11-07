import { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

interface UseGatewayIntroOptions {
  scopeRef: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
}

const checkShouldSkipIntro = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

export function useGatewayIntro({ scopeRef, onComplete }: UseGatewayIntroOptions) {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(checkShouldSkipIntro);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jump immediately to final state for current view
  const skipIntro = useCallback(() => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.progress(1);
    }
    setIsIntroComplete(true);
    setCanSkip(false);
    onComplete?.();
  }, [onComplete]);

  // Replay intro on demand
  const replayIntro = useCallback(() => {
    if (!scopeRef.current) return;
    setIsIntroComplete(false);
    setCanSkip(true);
    if (masterTimelineRef.current) {
      masterTimelineRef.current.restart();
    }
  }, [scopeRef]);

  // Handle keyboard shortcuts (Esc to skip, R to replay when debug)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isIntroComplete) {
        e.preventDefault();
        skipIntro();
      } else if (isDebugMode && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        replayIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroComplete, isDebugMode, skipIntro, replayIntro]);

  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    const isDebug =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('motionDebug') === '1';
    setIsDebugMode(isDebug);

    // Clear any previous session storage key so intro runs on fresh page loads / refresh
    try {
      sessionStorage.removeItem('kopkarsai_gateway_intro_seen');
    } catch {
      // ignore
    }

    const shouldSkipAnimation = prefersReducedMotion;

    const ctx = gsap.context(() => {
      // Elements selection
      const bgHalo = scopeRef.current?.querySelector<HTMLElement>('#bg-halo-circle');
      const bgWaves = scopeRef.current?.querySelector<HTMLElement>('#bg-seigaiha-waves');
      const petalsOverlay = scopeRef.current?.querySelector<HTMLElement>('#sakura-petals-overlay');
      const branchTL = scopeRef.current?.querySelector<HTMLElement>('#branch-tl-entrance');
      const branchBR = scopeRef.current?.querySelector<HTMLElement>('#branch-br-entrance');
      const brandHeader = scopeRef.current?.querySelector<HTMLElement>('#gateway-brand-header');
      const logoPetals = scopeRef.current?.querySelectorAll<SVGElement>('.logo-petal');
      const logoFolds = scopeRef.current?.querySelectorAll<SVGElement>('.logo-fold-line');
      const wordmark = scopeRef.current?.querySelector<HTMLElement>('#brand-header-wordmark');
      const promoBanner = scopeRef.current?.querySelector<HTMLElement>('#gateway-promo-banner');
      const dividerLeft = scopeRef.current?.querySelector<HTMLElement>('.divider-line-left');
      const dividerRight = scopeRef.current?.querySelector<HTMLElement>('.divider-line-right');
      const dividerLabel = scopeRef.current?.querySelector<HTMLElement>('.divider-label');
      const featureCards = scopeRef.current?.querySelectorAll<HTMLElement>('.gateway-feature-card');

      // Helper function to set all elements to final state
      const setFinalInstantState = () => {
        if (bgHalo) gsap.set(bgHalo, { opacity: 1, scale: 1 });
        if (bgWaves) gsap.set(bgWaves, { opacity: 1, x: 0 });
        if (petalsOverlay) gsap.set(petalsOverlay, { opacity: 1 });
        if (branchTL) gsap.set(branchTL, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: 'top left' });
        if (branchBR) gsap.set(branchBR, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: '100% 60%' });
        if (brandHeader) gsap.set(brandHeader, { opacity: 1, y: 0 });
        if (logoPetals) gsap.set(logoPetals, { opacity: 1, scale: 1, rotation: 0, transformOrigin: '100px 100px' });
        if (logoFolds) gsap.set(logoFolds, { opacity: 0.75 });
        if (wordmark) gsap.set(wordmark, { opacity: 1, x: 0 });
        if (promoBanner) gsap.set(promoBanner, { opacity: 1, y: 0, scale: 1 });
        if (dividerLeft) gsap.set(dividerLeft, { scaleX: 1 });
        if (dividerRight) gsap.set(dividerRight, { scaleX: 1 });
        if (dividerLabel) gsap.set(dividerLabel, { opacity: 1, scale: 1 });
        if (featureCards) gsap.set(featureCards, { opacity: 1, y: 0, scale: 1 });
        setIsIntroComplete(true);
        setCanSkip(false);
      };

      // Fast path: if reduced motion or already seen in this session
      if (shouldSkipAnimation) {
        setFinalInstantState();
        return;
      }

      // --- INITIAL STATIC SETUP (Synchronous, Zero FOUC) ---
      if (bgHalo) gsap.set(bgHalo, { opacity: 0, scale: 0.85 });
      if (bgWaves) gsap.set(bgWaves, { opacity: 0, x: -35 });
      if (petalsOverlay) gsap.set(petalsOverlay, { opacity: 0 });
      // Branches start at their final placement, rotated ~32° with opacity 0 (no translation across screen)
      if (branchTL) {
        gsap.set(branchTL, {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotation: -32,
          transformOrigin: 'top left',
        });
      }
      if (branchBR) {
        gsap.set(branchBR, {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 32,
          transformOrigin: '100% 60%',
        });
      }
      if (brandHeader) gsap.set(brandHeader, { opacity: 0, y: -26 });

      if (logoPetals) {
        logoPetals.forEach((petal) => {
          gsap.set(petal, {
            opacity: 0,
            scale: 0.75,
            rotation: -15,
            transformOrigin: '100px 100px',
          });
        });
      }
      if (logoFolds) gsap.set(logoFolds, { opacity: 0 });
      if (wordmark) gsap.set(wordmark, { opacity: 0, x: -10 });
      if (promoBanner) gsap.set(promoBanner, { opacity: 0, y: 38, scale: 0.97 });
      if (dividerLeft) gsap.set(dividerLeft, { scaleX: 0, transformOrigin: 'right center' });
      if (dividerRight) gsap.set(dividerRight, { scaleX: 0, transformOrigin: 'left center' });
      if (dividerLabel) gsap.set(dividerLabel, { opacity: 0, scale: 0.92 });
      if (featureCards) gsap.set(featureCards, { opacity: 0, y: 44, scale: 0.96 });

      // Show skip button after a short moment
      gsap.delayedCall(0.3, () => {
        setCanSkip(true);
      });

      // --- MASTER "HARUKAZE" TIMELINE ---
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          setIsIntroComplete(true);
          setCanSkip(false);
          onComplete?.();
        },
      });

      masterTimelineRef.current = tl;

      // Phase 1: Ambient Spring Awakening (0.00 - 0.70s)
      tl.addLabel('awakening', 0);

      if (petalsOverlay) {
        tl.to(petalsOverlay, { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 'awakening');
      }
      if (bgHalo) {
        tl.to(bgHalo, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 'awakening+=0.05');
      }
      if (bgWaves) {
        tl.to(bgWaves, { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }, 'awakening+=0.1');
      }

      // Phase 2: Gentle Sakura Branches Fade In with In-Place Rotation (0.08 - 1.30s)
      // Top-Left rotates clockwise (-32° -> 0°) from top-left anchor in place
      if (branchTL) {
        tl.to(
          branchTL,
          {
            opacity: 1,
            rotation: 0,
            duration: 1.25,
            ease: 'power3.out',
          },
          'awakening+=0.08'
        );
      }
      // Bottom-Right rotates counter-clockwise (+32° -> 0°) from bottom-right wall anchor in place
      if (branchBR) {
        tl.to(
          branchBR,
          {
            opacity: 1,
            rotation: 0,
            duration: 1.3,
            ease: 'power3.out',
          },
          'awakening+=0.14'
        );
      }

      // Phase 3: Brand Header & Origami Petal Bloom (0.28 - 0.85s)
      tl.addLabel('brand-reveal', 0.28);

      if (brandHeader) {
        tl.to(brandHeader, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 'brand-reveal');
      }

      // 8 Clockwise Petals Bloom
      if (logoPetals && logoPetals.length > 0) {
        logoPetals.forEach((petal, index) => {
          const petalTime = 0.32 + index * 0.045;
          tl.to(
            petal,
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.24,
              ease: 'back.out(1.5)',
            },
            petalTime
          );

          if (logoFolds && logoFolds[index]) {
            tl.to(
              logoFolds[index],
              {
                opacity: 0.75,
                duration: 0.18,
                ease: 'power2.out',
              },
              petalTime + 0.04
            );
          }
        });
      }

      if (wordmark) {
        tl.to(wordmark, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, 'brand-reveal+=0.2');
      }

      // Phase 4: Pavilion Promo Banner Unfolds (0.55 - 1.25s)
      tl.addLabel('banner-reveal', 0.55);

      if (promoBanner) {
        tl.to(
          promoBanner,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          'banner-reveal'
        );
      }

      // Phase 5: Section Divider Expands (0.80 - 1.25s)
      tl.addLabel('divider-reveal', 0.80);

      if (dividerLeft) {
        tl.to(dividerLeft, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, 'divider-reveal');
      }
      if (dividerRight) {
        tl.to(dividerRight, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, 'divider-reveal');
      }
      if (dividerLabel) {
        tl.to(dividerLabel, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, 'divider-reveal+=0.1');
      }

      // Phase 6: Three Feature Cards Staggered Rise (0.95 - 1.65s)
      tl.addLabel('cards-reveal', 0.95);

      if (featureCards && featureCards.length > 0) {
        tl.to(
          featureCards,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
          },
          'cards-reveal'
        );
      }

      tl.addLabel('final-settled', 1.75);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, [scopeRef, prefersReducedMotion, onComplete]);

  return {
    isIntroComplete,
    canSkip,
    isDebugMode,
    skipIntro,
    replayIntro,
  };
}
