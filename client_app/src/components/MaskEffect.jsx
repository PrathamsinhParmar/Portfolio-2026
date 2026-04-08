import React, { useEffect, useRef, useCallback } from 'react';

/**
 * MaskEffect — Cursor-driven contrast mask
 *
 * Behaviour:
 *  • A circle follows the cursor at all times (small, 0-opacity when not on text)
 *  • When the cursor enters ANY text element the circle expands to 180px radius (~3×)
 *  • Inside the circle: backdrop-filter inverts colours + hue-shifts to produce
 *      → NEON-BLUE background  (dark site bg becomes bright neon)
 *      → DARK contrasted text  (white site text becomes near-black / readable)
 *    creating the "blue text · neon background" mask effect described
 *  • Smooth lerp interpolation on both position and radius
 *  • Touch-device safe (disabled on coarse pointers)
 */

const TEXT_SELECTORS =
  'h1,h2,h3,h4,h5,h6,p,a,button,li,label,span,blockquote,strong,em,dt,dd';

const RADIUS_REST = 0;    // hidden when not on text
const RADIUS_TEXT = 100;  // px — mask size on text hover (reduced)
const LERP_POS    = 0.13;
const LERP_RAD    = 0.10;

const lerp = (a, b, t) => a + (b - a) * t;

export default function MaskEffect() {
  const maskRef   = useRef(null);
  const glowRef   = useRef(null);
  const labelRef  = useRef(null);

  const pos    = useRef({ x: -999, y: -999 });
  const tgt    = useRef({ x: -999, y: -999 });
  const rad    = useRef(0);
  const tgtRad = useRef(0);
  const onText = useRef(false);
  const rafId  = useRef(null);

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, tgt.current.x, LERP_POS);
    pos.current.y = lerp(pos.current.y, tgt.current.y, LERP_POS);
    rad.current   = lerp(rad.current,   tgtRad.current, LERP_RAD);

    const x = pos.current.x;
    const y = pos.current.y;
    const r = rad.current;

    /* ── Inversion mask circle ── */
    if (maskRef.current) {
      maskRef.current.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
      maskRef.current.style.opacity  = r > 2 ? '1' : '0';
    }

    /* ── Neon glow ring (drawn around the mask) ── */
    if (glowRef.current) {
      const d = r * 2 + 6;
      glowRef.current.style.width      = `${d}px`;
      glowRef.current.style.height     = `${d}px`;
      glowRef.current.style.transform  = `translate3d(${x - d / 2}px,${y - d / 2}px,0)`;
      glowRef.current.style.opacity    = r > 10 ? '1' : '0';
    }

    /* ── "READ" label ── */
    if (labelRef.current) {
      labelRef.current.style.transform = `translate3d(${x + r * 0.55}px,${y - 12}px,0)`;
      labelRef.current.style.opacity   = r > 80 ? '1' : '0';
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      tgt.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);

      // ── Exclusion zones: navbar + any image/media element ──────────────
      const inNav   = el ? !!el.closest('nav, header, [data-no-mask]') : true;
      const isMedia = el
        ? el.matches('img, picture, video, canvas, svg, [class*="avatar"], [class*="photo"]') ||
          !!el.closest('img, picture, video, canvas, [class*="avatar"], [class*="photo"]')
        : true;

      const hit =
        !inNav &&
        !isMedia &&
        el &&
        (el.matches(TEXT_SELECTORS) || !!el.closest(TEXT_SELECTORS));

      if (hit !== onText.current) {
        onText.current  = hit;
        tgtRad.current  = hit ? RADIUS_TEXT : RADIUS_REST;
        document.body.classList.toggle('mask-on', hit);
      }
    };

    const onLeave = () => {
      tgt.current    = { x: -999, y: -999 };
      tgtRad.current = RADIUS_REST;
      onText.current = false;
      document.body.classList.remove('mask-on');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
      document.body.classList.remove('mask-on');
    };
  }, [animate]);

  /* SSR / touch guard */
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <style>{`
        /* ── Cursor hide on desktop ── */
        @media (pointer: fine) {
          *, body { cursor: none !important; }
        }

        /* ── Keyframes ── */
        @keyframes mask-ring-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,200,255,0.5), 0 0 20px rgba(0,150,255,0.3); }
          50%      { box-shadow: 0 0 0 6px rgba(0,200,255,0), 0 0 40px rgba(0,150,255,0.5); }
        }
        @keyframes mask-label-in {
          from { opacity:0; transform-origin: left; }
          to   { opacity:1; }
        }
      `}</style>

      {/*
        ── INVERSION MASK OVERLAY ──────────────────────────────────────────
        position: fixed; covers entire viewport.
        clip-path cuts it to a circle at cursor position.
        backdrop-filter inverts what's BEHIND it:
          - dark background  → bright blue/neon background  ✓
          - white/light text → dark contrasted text          ✓
        The hue-rotate(195deg) + saturate(2) push neutrals into neon-blue territory.
        ───────────────────────────────────────────────────────────────────
      */}
      <div
        ref={maskRef}
        style={{
          position:      'fixed',
          inset:         0,
          pointerEvents: 'none',
          zIndex:        9994,
          willChange:    'clip-path',
          /* These two lines do all the heavy lifting */
          backdropFilter:         'invert(1) hue-rotate(110deg) saturate(2.4) brightness(1.1)',
          WebkitBackdropFilter:   'invert(1) hue-rotate(110deg) saturate(2.4) brightness(1.1)',
          /* Vibrant neon-blue tint remains for neutral areas */
          background:    'rgba(0, 70, 255, 0.1)',
          transition:    'opacity 0.25s ease',
        }}
      />

      {/*
        ── NEON GLOW RING ─────────────────────────────────────────────────
        A hard neon border that sits around the inversion circle.
        Purely decorative — indicates the mask boundary.
        ───────────────────────────────────────────────────────────────────
      */}
      <div
        ref={glowRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          borderRadius:  '50%',
          pointerEvents: 'none',
          zIndex:        9995,
          willChange:    'transform, width, height',
          border:        '1.5px solid rgba(0, 220, 255, 0.75)',
          boxShadow:     '0 0 10px rgba(0,200,255,0.5), 0 0 30px rgba(0,100,255,0.3), inset 0 0 10px rgba(0,200,255,0.1)',
          animation:     'mask-ring-pulse 2.4s ease-in-out infinite',
          transition:    'opacity 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/*
        ── FLOATING LABEL ─────────────────────────────────────────────────
      */}
      <div
        ref={labelRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          pointerEvents: 'none',
          zIndex:        9996,
          willChange:    'transform',
          fontFamily:    "'Inter', sans-serif",
          fontSize:      '9px',
          fontWeight:    700,
          letterSpacing: '0.2em',
          color:         '#00dcff',
          textTransform: 'uppercase',
          textShadow:    '0 0 8px rgba(0,220,255,0.9)',
          whiteSpace:    'nowrap',
          transition:    'opacity 0.35s ease',
        }}
      >
        ↗ EXPLORE
      </div>
    </>
  );
}
