import React, { useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// TEXT_SELECTORS  – every element type that should trigger the expanded state
// ─────────────────────────────────────────────────────────────────────────────
const TEXT_SELECTORS =
  'h1, h2, h3, h4, h5, h6, p, a, button, li, label, ' +
  'span, blockquote, cite, figcaption, dt, dd, em, strong, ' +
  'input[type="text"], textarea';

// ─────────────────────────────────────────────────────────────────────────────
// Size constants
// ─────────────────────────────────────────────────────────────────────────────
const SIZE_DEFAULT = 140;   // resting radius (px)
const SIZE_TEXT    = 380;   // expanded radius when on text (px)  ≈ 2.7×
const LERP_POS     = 0.11;  // position smoothing  (lower = more lag)
const LERP_SIZE    = 0.09;  // size smoothing

// ─────────────────────────────────────────────────────────────────────────────
// Utility: linear interpolation
// ─────────────────────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─────────────────────────────────────────────────────────────────────────────
// MaskEffect Component
// ─────────────────────────────────────────────────────────────────────────────
const MaskEffect = () => {
  // ── refs (never cause re-renders) ──────────────────────────────────────────
  const spotRef        = useRef(null);  // main glow blob
  const ringRef        = useRef(null);  // hard neon ring
  const ringInnerRef   = useRef(null);  // inner ring
  const crosshairRef   = useRef(null);  // crosshair lines
  const labelRef       = useRef(null);  // "EXPLORE" label

  const pos     = useRef({ x: -600, y: -600 });
  const target  = useRef({ x: -600, y: -600 });
  const size    = useRef(SIZE_DEFAULT);
  const tgtSize = useRef(SIZE_DEFAULT);
  const onText  = useRef(false);
  const rafId   = useRef(null);
  const isTouch = useRef(false);

  // ── RAF animation loop ─────────────────────────────────────────────────────
  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, LERP_POS);
    pos.current.y = lerp(pos.current.y, target.current.y, LERP_POS);
    size.current  = lerp(size.current,  tgtSize.current,  LERP_SIZE);

    const x = pos.current.x;
    const y = pos.current.y;
    const s = size.current;
    const isExpanded = s > (SIZE_DEFAULT + SIZE_TEXT) / 2;

    // ── Spotlight blob ──────────────────────────────────────────────────────
    if (spotRef.current) {
      spotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      spotRef.current.style.width     = `${s * 2.2}px`;
      spotRef.current.style.height    = `${s * 2.2}px`;
      spotRef.current.style.marginLeft = `-${s * 1.1}px`;
      spotRef.current.style.marginTop  = `-${s * 1.1}px`;
      spotRef.current.style.opacity   = isExpanded ? '1' : '0.55';
    }

    // ── Hard neon ring ──────────────────────────────────────────────────────
    if (ringRef.current) {
      const r = s * 0.72;
      ringRef.current.style.transform  = `translate3d(${x}px,${y}px,0)`;
      ringRef.current.style.width      = `${r * 2}px`;
      ringRef.current.style.height     = `${r * 2}px`;
      ringRef.current.style.marginLeft = `-${r}px`;
      ringRef.current.style.marginTop  = `-${r}px`;
      ringRef.current.style.borderWidth = isExpanded ? '1.5px' : '1px';
      ringRef.current.style.opacity    = isExpanded ? '0.9' : '0.35';
    }

    // ── Inner ring ─────────────────────────────────────────────────────────
    if (ringInnerRef.current) {
      const ri = s * 0.35;
      ringInnerRef.current.style.transform  = `translate3d(${x}px,${y}px,0)`;
      ringInnerRef.current.style.width      = `${ri * 2}px`;
      ringInnerRef.current.style.height     = `${ri * 2}px`;
      ringInnerRef.current.style.marginLeft = `-${ri}px`;
      ringInnerRef.current.style.marginTop  = `-${ri}px`;
      ringInnerRef.current.style.opacity    = isExpanded ? '0.6' : '0';
    }

    // ── Crosshair ──────────────────────────────────────────────────────────
    if (crosshairRef.current) {
      crosshairRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      crosshairRef.current.style.opacity   = isExpanded ? '0.5' : '0';
    }

    // ── Label ──────────────────────────────────────────────────────────────
    if (labelRef.current) {
      labelRef.current.style.transform = `translate3d(${x + s * 0.52}px,${y - 14}px,0)`;
      labelRef.current.style.opacity   = isExpanded ? '0.85' : '0';
    }

    // ── Root CSS vars for text-level effect ────────────────────────────────
    document.documentElement.style.setProperty('--mask-x',    `${x}px`);
    document.documentElement.style.setProperty('--mask-y',    `${y}px`);
    document.documentElement.style.setProperty('--mask-size', `${s * 0.6}px`);

    rafId.current = requestAnimationFrame(animate);
  }, []);

  // ── Mouse events ───────────────────────────────────────────────────────────
  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const hit = el.matches(TEXT_SELECTORS) || el.closest(TEXT_SELECTORS) !== null;
        if (hit !== onText.current) {
          onText.current  = hit;
          tgtSize.current = hit ? SIZE_TEXT : SIZE_DEFAULT;
          document.documentElement.style.setProperty(
            '--mask-active', hit ? '1' : '0'
          );
          // Toggle body class so CSS text-shadow glow can activate
          document.body.classList.toggle('mask-text-glow', hit);
        }
      }
    };

    const onLeave = () => {
      target.current = { x: -600, y: -600 };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* ── Injected styles ─────────────────────────────────────────────── */}
      <style>{`
        /* ── Global CSS vars ── */
        :root {
          --mask-x:      -500px;
          --mask-y:      -500px;
          --mask-size:   0px;
          --mask-active: 0;
          --neon-cyan:   #00f0ff;
          --neon-blue:   #0066ff;
          --neon-violet: #7c3aed;
          --neon-mid:    #00aaff;
        }

        /* ── Pulsing glow on the spotlight blob ── */
        @keyframes mask-pulse {
          0%, 100% { filter: blur(28px) brightness(1);   }
          50%       { filter: blur(32px) brightness(1.3); }
        }

        /* ── Rotating dashed ring ── */
        @keyframes ring-spin {
          to { transform: translate3d(var(--rx,0px), var(--ry,0px), 0) rotate(360deg); }
        }

        /* ── Neon label appear ── */
        @keyframes label-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        /* ─────────────────────────────────────────────────────────────────
           TEXT NEON REVEAL
           Uses CSS paint-order trick: background-clip:text with a
           radial-gradient centred on the cursor reveals neon tones.
           We layer this OVER the existing colour (mix-blend: lighten).
           Works on: all text elements. Falls back gracefully on old browsers.
        ───────────────────────────────────────────────────────────────── */
        @supports (background-clip: text) or (-webkit-background-clip: text) {
          .mask-neon-layer {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9985;
            overflow: hidden;
            mix-blend-mode: screen;
            /* clip the neon layer to a circle around the cursor */
            clip-path: circle(
              calc(var(--mask-size) * 1px)
              at var(--mask-x) var(--mask-y)
            );
            /* smooth clip-path expansion */
            transition: clip-path 0ms linear;
          }
        }

        /* ── Neon glow text-shadow on all text when mask is expanded ── */
        h1, h2, h3, h4, h5, h6, p, a, li, button, span, label, blockquote {
          transition: text-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Subtle always-on ambient glow — mask modulates it */
        .mask-text-ambient {
          text-shadow:
            0 0 0px transparent;
          transition: text-shadow 0.5s ease;
        }
      `}</style>

      {/* ── Main glow spotlight (mix-blend-mode: screen) ───────────────────── */}
      <div
        ref={spotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          zIndex: 9986,
          background: `radial-gradient(circle,
            rgba(0,240,255,0.22)   0%,
            rgba(0,140,255,0.16)  30%,
            rgba(90,0,255,0.10)   60%,
            rgba(0,240,255,0.04)  80%,
            transparent          100%)`,
          mixBlendMode: 'screen',
          animation: 'mask-pulse 2.8s ease-in-out infinite',
          transition: 'opacity 0.4s ease',
          willChange: 'transform, width, height',
        }}
      />

      {/* ── Hard neon outer ring ────────────────────────────────────────────── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          zIndex: 9987,
          border: '1px solid rgba(0,240,255,0.6)',
          boxShadow: `
            0 0 8px  rgba(0,240,255,0.35),
            0 0 20px rgba(0,140,255,0.20),
            inset 0 0 8px rgba(0,240,255,0.15)
          `,
          transition: 'opacity 0.35s cubic-bezier(0.23,1,0.32,1), border-width 0.35s ease',
          willChange: 'transform, width, height',
        }}
      />

      {/* ── Inner neon ring ─────────────────────────────────────────────────── */}
      <div
        ref={ringInnerRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          zIndex: 9988,
          border: '1px dashed rgba(0,200,255,0.5)',
          boxShadow: '0 0 6px rgba(0,200,255,0.25)',
          transition: 'opacity 0.5s cubic-bezier(0.23,1,0.32,1)',
          willChange: 'transform, width, height',
        }}
      />

      {/* ── Crosshair centre marker ──────────────────────────────────────────── */}
      <div
        ref={crosshairRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          zIndex: 9989,
          width: '20px',
          height: '20px',
          marginLeft: '-10px',
          marginTop: '-10px',
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* horizontal line */}
        <div style={{
          position: 'absolute',
          top: '50%', left: 0, right: 0,
          height: '1px',
          background: 'rgba(0,240,255,0.7)',
          boxShadow: '0 0 4px rgba(0,240,255,0.6)',
        }} />
        {/* vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%', top: 0, bottom: 0,
          width: '1px',
          background: 'rgba(0,240,255,0.7)',
          boxShadow: '0 0 4px rgba(0,240,255,0.6)',
        }} />
        {/* centre dot */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '4px', height: '4px',
          borderRadius: '50%',
          background: '#00f0ff',
          transform: 'translate(-50%,-50%)',
          boxShadow: '0 0 8px #00f0ff, 0 0 16px rgba(0,240,255,0.5)',
        }} />
      </div>

      {/* ── "EXPLORE" floating label ─────────────────────────────────────────── */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          zIndex: 9989,
          fontFamily: "'Inter', monospace",
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: '#00f0ff',
          textTransform: 'uppercase',
          textShadow: '0 0 8px rgba(0,240,255,0.8)',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.4s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        EXPLORE ↗
      </div>
    </>
  );
};

export default MaskEffect;
