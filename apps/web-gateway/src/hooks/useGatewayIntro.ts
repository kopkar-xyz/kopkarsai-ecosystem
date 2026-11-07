import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface UseGatewayIntroOptions {
  scopeRef: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
}

// Synchronous check on initial mount to prevent FOUC
const checkShouldSkipIntro = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const isDebug =
      new URLSearchParams(window.location.search).get('motionDebug') === '1';
    if (isDebug) return false;
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return true;
    return sessionStorage.getItem('kopkarsai_gateway_intro_seen') === 'true';
  } catch {
    return false;
  }
};

export function useGatewayIntro({ scopeRef, onComplete }: UseGatewayIntroOptions) {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(checkShouldSkipIntro);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Check if reduced motion is requested
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check if user has already experienced intro in this browser session
  const hasSeenIntroInSession = useCallback(() => {
    try {
      const isDebug =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('motionDebug') === '1';
      if (isDebug) return false;
      return sessionStorage.getItem('kopkarsai_gateway_intro_seen') === 'true';
    } catch {
      return false;
    }
  }, []);

  const markIntroSeen = useCallback(() => {
    try {
      sessionStorage.setItem('kopkarsai_gateway_intro_seen', 'true');
    } catch {
      // ignore storage errors
    }
  }, []);

  // Jump immediately to final state
  const skipIntro = useCallback(() => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.progress(1);
    }
    setIsIntroComplete(true);
    setCanSkip(false);
    markIntroSeen();
    onComplete?.();
  }, [markIntroSeen, onComplete]);

  // Replay intro on demand
  const replayIntro = useCallback(() => {
    if (!masterTimelineRef.current || !scopeRef.current) return;
    setIsIntroComplete(false);
    setCanSkip(true);
    masterTimelineRef.current.restart();
  }, [scopeRef]);

  // Seek to specific label for debugging
  const seekToCheckpoint = useCallback((label: string) => {
    if (masterTimelineRef.current) {
      masterTimelineRef.current.pause();
      masterTimelineRef.current.seek(label);
    }
  }, []);

  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    const isDebug =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('motionDebug') === '1';
    setIsDebugMode(isDebug);

    const shouldSkipAnimation = prefersReducedMotion || hasSeenIntroInSession();

    const ctx = gsap.context(() => {
      // Elements selection
      const brandStage = scopeRef.current?.querySelector<HTMLElement>('#brand-stage');
      const emblemWrapper = scopeRef.current?.querySelector<HTMLElement>('#emblem-wrapper');
      const petals = scopeRef.current?.querySelectorAll<SVGElement>('.logo-petal');
      const folds = scopeRef.current?.querySelectorAll<SVGElement>('.logo-fold-line');
      const wordmarkText = scopeRef.current?.querySelector<HTMLElement>('.wordmark-text');
      const cards = scopeRef.current?.querySelectorAll<HTMLElement>('.gateway-card-item');
      const bottomCopy = scopeRef.current?.querySelector<HTMLElement>('#gateway-bottom-copy');
      const footerMeta = scopeRef.current?.querySelector<HTMLElement>('#gateway-footer-meta');

      if (
        !brandStage ||
        !emblemWrapper ||
        !petals ||
        petals.length === 0 ||
        !folds ||
        folds.length === 0 ||
        !wordmarkText ||
        !cards ||
        cards.length === 0 ||
        !bottomCopy ||
        !footerMeta
      ) {
        return;
      }

      // Fast path: if reduced motion or already seen in this session, render final state immediately
      if (shouldSkipAnimation) {
        gsap.set(brandStage, { y: 0, opacity: 1 });
        gsap.set(emblemWrapper, { y: 0 });
        gsap.set(petals, { opacity: 1, scale: 1, rotation: 0, transformOrigin: '100px 100px' });
        gsap.set(folds, { opacity: 0.65 });
        gsap.set(wordmarkText, { yPercent: 0, opacity: 1 });
        gsap.set(cards, { opacity: 1, y: 0 });
        gsap.set(bottomCopy, { opacity: 1, y: 0 });
        gsap.set(footerMeta, { opacity: 1 });
        setIsIntroComplete(true);
        setCanSkip(false);
        return;
      }

      // Calculate vertical delta so emblem center is initially at optical viewport center
      // Centerline X is strictly locked by parent CSS flex items-center (50vw).
      const emblemRect = emblemWrapper.getBoundingClientRect();
      const viewportCenterY = window.innerHeight / 2;
      const emblemCenterY = emblemRect.top + emblemRect.height / 2;
      const initialDeltaY = viewportCenterY - emblemCenterY;

      // --- INITIAL STATIC SETUP (Synchronous, Zero FOUC) ---
      gsap.set(brandStage, { y: initialDeltaY, opacity: 1 });
      gsap.set(emblemWrapper, { y: 0 });
      gsap.set(wordmarkText, { yPercent: 120, opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.set(bottomCopy, { opacity: 0, y: 12 });
      gsap.set(footerMeta, { opacity: 0 });
      gsap.set(folds, { opacity: 0 });

      // All petals start hidden at their exact coordinate location (no translation)
      // Slight -8° rotation offset to produce subtle clockwise sweep when revealing
      petals.forEach((petal) => {
        gsap.set(petal, {
          opacity: 0,
          scale: 0.94,
          rotation: -8,
          transformOrigin: '100px 100px',
        });
      });

      // Show skip button after threshold
      gsap.delayedCall(0.35, () => {
        setCanSkip(true);
      });

      // --- MASTER CHOREOGRAPHY TIMELINE ---
      const tl = gsap.timeline({
        paused: isDebug,
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          setIsIntroComplete(true);
          setCanSkip(false);
          markIntroSeen();
          onComplete?.();
        },
      });

      masterTimelineRef.current = tl;

      // Label 1: Full Green Screen (0.00 - 0.15s)
      // Screen is 100% full green, brand stage centered, no content visible
      tl.addLabel('green-screen', 0);
      tl.to({}, { duration: 0.15 });

      // Label 2: Clockwise Petal Reveal (0.15 - 1.18s)
      // Emblem center is 100% stationary at viewport center.
      // Petals reveal sequentially starting from Top (12 o'clock) clockwise!
      tl.addLabel('clockwise-reveal', 0.15);

      petals.forEach((petal, index) => {
        const petalTime = 0.15 + index * 0.115;
        // Reveal petal
        tl.to(
          petal,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          petalTime
        );

        // Corresponding fold crease line appears along with petal
        if (folds[index]) {
          tl.to(
            folds[index],
            {
              opacity: 0.65,
              duration: 0.18,
              ease: 'power2.out',
            },
            petalTime + 0.05
          );
        }
      });

      // Label 3: Logo Complete + Hold (1.18 - 1.33s)
      // Emblem rests completely formed at screen center for visual appreciation
      tl.addLabel('logo-complete-hold', 1.18);
      tl.to({}, { duration: 0.15 });

      // Label 4: Logo Vertical Lift (1.33 - 1.71s)
      // ONLY moves straight vertically UP along Y axis (deltaX = 0).
      tl.addLabel('vertical-lift', 1.33);
      tl.to(
        brandStage,
        {
          y: 0,
          duration: 0.38,
          ease: 'power2.inOut',
        },
        'vertical-lift'
      );

      // Label 5: Wordmark Reveal (1.58 - 1.90s)
      // KOPKARSAI reveals from under mask directly below emblem
      tl.addLabel('wordmark-reveal', 1.58);
      tl.to(
        wordmarkText,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.32,
          ease: 'power2.out',
        },
        'wordmark-reveal'
      );

      // Label 6: Stable Cards Reveal (1.88 - 2.33s)
      // Both cards reveal smoothly in their pre-allocated grid slots without pushing layout
      tl.addLabel('cards-reveal', 1.88);
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        },
        'cards-reveal'
      );

      // Label 7: Bottom Descriptive Copy Reveal (2.18 - 2.56s)
      // Exactly one copy block appears under both cards
      tl.addLabel('bottom-copy-reveal', 2.18);
      tl.to(
        bottomCopy,
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          ease: 'power2.out',
        },
        'bottom-copy-reveal'
      );

      tl.to(
        footerMeta,
        {
          opacity: 1,
          duration: 0.32,
          ease: 'power2.out',
        },
        'bottom-copy-reveal+=0.1'
      );

      tl.addLabel('final-state', 2.65);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, [scopeRef, prefersReducedMotion, hasSeenIntroInSession, markIntroSeen, onComplete]);

  return {
    isIntroComplete,
    canSkip,
    isDebugMode,
    skipIntro,
    replayIntro,
    seekToCheckpoint,
  };
}
