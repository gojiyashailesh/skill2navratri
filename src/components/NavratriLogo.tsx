import React from 'react';

interface NavratriLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'gold';
  onClick?: () => void;
  compact?: boolean;
}

export const NavratriLogo: React.FC<NavratriLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'light',
  onClick,
  compact = false,
}) => {
  // Sizing definitions tuned for balance, elegance, and zero header overflow
  const dimensions = {
    sm: { width: 140, height: 42, iconSize: 36, titleSize: 'text-xl sm:text-2xl', subSize: 'text-[9.5px]' },
    md: { width: 180, height: 48, iconSize: 42, titleSize: 'text-2xl sm:text-3xl', subSize: 'text-[10.5px]' },
    lg: { width: 220, height: 56, iconSize: 50, titleSize: 'text-3xl sm:text-4xl', subSize: 'text-xs' },
    hero: { width: 280, height: 68, iconSize: 60, titleSize: 'text-4xl sm:text-5xl', subSize: 'text-sm' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${compact ? 'gap-2.5 whitespace-nowrap' : 'gap-3'} select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      title="નવરાત્રિ - ગુજરાત ગરબા મહોત્સવ"
    >
      {/* Creative Simple Monogram: Calligraphic Gujarati "ન" (Na) + Akhand Jyot Flame + Royal Gold & Crimson Medallion */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Royal Crimson-Burgundy Gradient */}
            <linearGradient id="navCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#881337" />
              <stop offset="45%" stopColor="#7A1C2C" />
              <stop offset="100%" stopColor="#4A0E17" />
            </linearGradient>

            {/* Molten Imperial Gold Gradient */}
            <linearGradient id="navGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="25%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Sacred Diya Flame Gradient */}
            <linearGradient id="navFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Flame Glow Filter */}
            <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Outer Royal Crimson Roundel */}
          <circle cx="32" cy="32" r="30" fill="url(#navCrimsonGrad)" stroke="url(#navGoldGrad)" strokeWidth="1.5" />

          {/* Inner Delicate Stippled Gold Ring */}
          <circle
            cx="32"
            cy="32"
            r="26.5"
            stroke="#FBBF24"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.55"
          />

          {/* 4 Cardinal Sacred Accent Diamonds */}
          <path d="M 32 4.2 L 33.2 6.5 L 32 8.8 L 30.8 6.5 Z" fill="#FBBF24" />
          <path d="M 59.8 32 L 57.5 33.2 L 55.2 32 L 57.5 30.8 Z" fill="#FBBF24" />
          <path d="M 32 59.8 L 33.2 57.5 L 32 55.2 L 30.8 57.5 Z" fill="#FBBF24" />
          <path d="M 4.2 32 L 6.5 33.2 L 8.8 32 L 6.5 30.8 Z" fill="#FBBF24" />

          {/* Holy Eternal Diya Flame (અખંડ જ્યોત) rising from within the "ન" */}
          <g filter="url(#flameGlow)">
            <path
              d="M 28 16.5 C 31.5 21, 33 25, 31 29 C 29.5 31.5, 26 31.5, 24.5 29 C 22.5 25, 24.5 21, 28 16.5 Z"
              fill="url(#navFlameGrad)"
            />
            {/* Inner Radiant Core */}
            <path
              d="M 28 20 C 29.5 22.5, 30.5 25, 29.5 27 C 28.5 28, 27.2 28, 26.2 27 C 25.2 25, 26.2 22.5, 28 20 Z"
              fill="#FFFFFF"
              opacity="0.95"
            />
          </g>

          {/* Calligraphic Gujarati Monogram "ન" (Na for Navratri) in Molten Gold Ribbon */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 41 20.5 L 46.5 19 L 46.5 48.5 L 41 48.5 L 41 39.5 L 32 39.5 C 33.5 42 33.5 45 31.5 47 C 29 49.5 24 50 19.5 47.5 C 16 45.5 15 41.5 17 37 C 19 33 24 32.5 28 35.5 L 41 35.5 L 41 20.5 Z M 21 42.5 C 20 40 22 37.5 24.5 37.5 C 27 37.5 28.5 39.5 28 42 C 27.5 44.5 25 45.5 23 45 C 21.8 44.5 21.4 43.5 21 42.5 Z"
            fill="url(#navGoldGrad)"
          />

          {/* Auspicious Kumkum Chandlo (તિલક / ચાંદલો) */}
          <circle cx="43.8" cy="13.8" r="2.6" fill="#DC2626" />
          <circle cx="43.8" cy="13.8" r="1.1" fill="#FEF08A" />
        </svg>
      </div>

      {/* Pure Gujarati Calligraphy Wordmark Lockup (NO English NAVRATRI) */}
      <div className="flex flex-col justify-center leading-none min-w-0">
        {/* Gujarati Calligraphic Wordmark "નવરાત્રિ" */}
        <span
          className={`font-black tracking-wide transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-white group-hover:text-[#FBBF24]'
              : theme === 'gold'
              ? 'text-[#B45309]'
              : 'text-[#7A1C2C] group-hover:text-[#991B1B]'
          } ${dimensions.titleSize}`}
          style={{
            fontFamily: "'Noto Serif Gujarati', 'Rasa', 'Rozha One', 'Anek Gujarati', serif",
            fontWeight: 800,
            letterSpacing: '0.02em',
            textShadow:
              theme === 'dark'
                ? '0 1px 3px rgba(0,0,0,0.6)'
                : '0 0.5px 1px rgba(122,28,44,0.15)',
          }}
        >
          નવરાત્રિ
        </span>

        {/* Traditional Cultural Subtitle / Tagline */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
            <span
              className={`font-semibold uppercase ${
                compact ? 'text-[8.5px] sm:text-[9.5px] tracking-wide' : `tracking-widest ${dimensions.subSize}`
              } ${theme === 'dark' ? 'text-amber-300/80' : 'text-[#8C4308]'}`}
              style={{ fontFamily: "'Anek Gujarati', 'Noto Sans Gujarati', sans-serif" }}
            >
              ગુજરાત ગરબા મહોત્સવ · 2026
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
