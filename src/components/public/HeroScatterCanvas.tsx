import React, { useEffect, useRef, useState } from 'react';
import { HeroContent } from '../../types';

interface HeroScatterProps {
  hero: HeroContent;
}

// Authentic Matrix code glyphs: Katakana, numbers, Latin capitals, and mathematical operators
const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜN0123456789:・."=*+-<>¦|ZMYWEVROKTXABEFHKPR';

interface MatrixStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  fontSize: number;
  opacity: number;
  isForeground: boolean;
  mutateInterval: number;
  frameCount: number;
}

export const HeroScatterCanvas: React.FC<HeroScatterProps> = ({ hero }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [underlineDrawn, setUnderlineDrawn] = useState(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  useEffect(() => {
    const timer = setTimeout(() => setUnderlineDrawn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let clientWidth = container.clientWidth;
    let clientHeight = container.clientHeight;

    const getRandomChar = () => {
      return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    };

    let streams: MatrixStream[] = [];

    const initStreams = () => {
      streams = [];
      const isMobile = clientWidth < 768;
      // Column spacing: distinct columns with clean dark margins matching the film aesthetic
      const columnSpacing = isMobile ? 22 : 28;
      const columnCount = Math.floor(clientWidth / columnSpacing);

      for (let i = 0; i < columnCount; i++) {
        const isForeground = Math.random() > 0.35;
        const fontSize = isForeground ? (isMobile ? 14 : 16) : (isMobile ? 11 : 13);
        const length = Math.floor(Math.random() * 16) + 12; // 12 to 28 characters
        const chars: string[] = [];
        for (let c = 0; c < length; c++) {
          chars.push(getRandomChar());
        }

        // Stagger initial Y positions so the rain starts populated across the entire canvas
        const initialY = Math.random() * (clientHeight + 400) - 200;
        const baseSpeed = isForeground ? (Math.random() * 2.2 + 2.4) : (Math.random() * 1.4 + 1.2);

        streams.push({
          x: i * columnSpacing + columnSpacing / 2 + (Math.random() * 4 - 2),
          y: initialY,
          speed: baseSpeed,
          length,
          chars,
          fontSize,
          opacity: isForeground ? (Math.random() * 0.25 + 0.75) : (Math.random() * 0.25 + 0.4),
          isForeground,
          mutateInterval: Math.floor(Math.random() * 4) + 2,
          frameCount: 0,
        });
      }
    };

    const setupCanvas = () => {
      clientWidth = container.clientWidth;
      clientHeight = container.clientHeight;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
      initStreams();
    };

    setupCanvas();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container || !canvas) return;
      setupCanvas();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      if (isVisible) {
        // Deep pure black backdrop with high contrast
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, clientWidth, clientHeight);

        const mouse = mouseRef.current;

        for (let s = 0; s < streams.length; s++) {
          const stream = streams[s];
          stream.frameCount++;

          // Random glyph mutation in the stream for dynamic authentic movie feel
          if (stream.frameCount % stream.mutateInterval === 0) {
            const mutateIdx = Math.floor(Math.random() * stream.chars.length);
            stream.chars[mutateIdx] = getRandomChar();
          }

          // Advance stream downwards
          if (!prefersReducedMotion) {
            // Subtle interactive burst when mouse hovers nearby
            const distToMouse = Math.abs(stream.x - mouse.x);
            const mouseBoost = distToMouse < 80 ? 1.5 : 1.0;
            stream.y += stream.speed * mouseBoost;
          }

          const lineHeight = stream.fontSize * 1.35;
          const totalStreamHeight = stream.length * lineHeight;

          // Loop stream back to top once it falls past the bottom
          if (stream.y - totalStreamHeight > clientHeight) {
            stream.y = -Math.random() * 180 - 40;
            stream.speed = stream.isForeground
              ? (Math.random() * 2.2 + 2.4)
              : (Math.random() * 1.4 + 1.2);
            stream.length = Math.floor(Math.random() * 16) + 12;
            stream.chars = [];
            for (let c = 0; c < stream.length; c++) {
              stream.chars.push(getRandomChar());
            }
          }

          ctx.font = `600 ${stream.fontSize}px 'IBM Plex Mono', 'Courier New', monospace`;
          ctx.textAlign = 'center';

          // Draw characters along the vertical stream
          for (let i = 0; i < stream.length; i++) {
            const charY = stream.y - i * lineHeight;

            // Cull offscreen characters
            if (charY < -stream.fontSize || charY > clientHeight + stream.fontSize) {
              continue;
            }

            const char = stream.chars[i] || getRandomChar();

            if (i === 0) {
              // Leading head character: glowing white with matrix neon green aura
              ctx.shadowColor = '#00FF66';
              ctx.shadowBlur = stream.isForeground ? 10 : 6;
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText(char, stream.x, charY);
              ctx.shadowBlur = 0; // reset
            } else if (i === 1) {
              // Immediate trailing glyph: intense bright lime/electric white-green
              ctx.shadowColor = '#00FF41';
              ctx.shadowBlur = stream.isForeground ? 6 : 3;
              ctx.fillStyle = stream.isForeground ? '#A3FFB8' : '#72E58C';
              ctx.fillText(char, stream.x, charY);
              ctx.shadowBlur = 0;
            } else if (i < 4) {
              // Core luminous Matrix Green
              ctx.fillStyle = `rgba(0, 255, 65, ${stream.opacity})`;
              ctx.fillText(char, stream.x, charY);
            } else {
              // Trailing descent: progressively fades down to deep matrix emerald and dark green
              const fadeRatio = 1 - (i / stream.length);
              const alpha = Math.max(0.08, fadeRatio * stream.opacity);
              
              if (fadeRatio > 0.5) {
                ctx.fillStyle = `rgba(0, 204, 51, ${alpha})`;
              } else if (fadeRatio > 0.25) {
                ctx.fillStyle = `rgba(0, 143, 17, ${alpha})`;
              } else {
                ctx.fillStyle = `rgba(0, 75, 12, ${alpha})`;
              }
              ctx.fillText(char, stream.x, charY);
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-20 sm:pt-24 pb-14 sm:pb-16 overflow-hidden select-none bg-[#000000]"
    >
      {/* Matrix Digital Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Atmospheric Radial Vignette ensuring perfect text legibility over the green code rain */}
      <div
        className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#000000]/60 to-[#000000] z-1"
        aria-hidden="true"
      />

      {/* Smooth bottom transition into subsequent section */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-b from-transparent to-[#0A0E1A] z-1"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Archival Tag with Matrix Green Glow Accent */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 sm:mb-6 border border-[#00FF41]/40 bg-[#000000]/85 text-[#00FF41] font-mono text-[11px] sm:text-xs uppercase tracking-widest backdrop-blur-xs shadow-[0_0_15px_rgba(0,255,65,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
          ICE Futures Methodology · Daniel Ferrera
        </div>

        {/* H1 Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#F5F0E8] font-normal leading-[1.08] tracking-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          The market is <span className="italic font-light text-[#C9A84C] drop-shadow-[0_0_12px_rgba(201,168,76,0.3)]">not</span> random.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl font-serif text-[#F5F0E8]/90 max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {hero.subheading || "You already know this. That's why you're here."}
        </p>

        {/* Dynamic Speculation Underline Motif */}
        <div className="relative mb-8 sm:mb-10 w-56 sm:w-80 h-4">
          <svg className="w-full h-full" viewBox="0 0 320 16" fill="none">
            <line
              x1="0"
              y1="8"
              x2="320"
              y2="8"
              stroke="#C9A84C"
              strokeWidth="1.25"
              strokeDasharray="320"
              strokeDashoffset={underlineDrawn ? '0' : '320'}
              style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            />
            {/* Center Geometric Accent Diamond */}
            <polygon
              points="160,3 165,8 160,13 155,8"
              fill="#C9A84C"
              className={underlineDrawn ? 'opacity-100 transition-opacity duration-1000 delay-700' : 'opacity-0'}
            />
          </svg>
        </div>

        {/* Primary CTA */}
        <a
          href={hero.ctaURL || '#pattern'}
          id="hero-cta-button"
          aria-label="Discover the Keys to Speculation"
          className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#C9A84C] text-[#0A0E1A] font-serif text-base font-semibold tracking-wide hover:bg-[#d8b85c] active:scale-[0.99] transition-all duration-200 border border-[#C9A84C] focus-visible:outline-2 focus-visible:outline-[#C9A84C] shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          <span>{hero.ctaText || 'Discover the Keys ↓'}</span>
          <span className="transform group-hover:translate-y-1 transition-transform duration-200" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5F0E8]/70">
          Scroll to Align
        </span>
        <div className="w-[1px] h-5 sm:h-6 bg-[#00FF41]/60" />
      </div>
    </section>
  );
};

