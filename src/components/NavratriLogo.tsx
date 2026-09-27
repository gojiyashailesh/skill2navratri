import React from 'react';

interface NavratriLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'gold';
  onClick?: () => void;
}

export const NavratriLogo: React.FC<NavratriLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'light',
  onClick,
}) => {
  // Sizing definitions
  const dimensions = {
    sm: { width: 140, height: 42, iconSize: 34, titleSize: 'text-base sm:text-lg', subSize: 'text-[9px]' },
    md: { width: 190, height: 48, iconSize: 42, titleSize: 'text-xl sm:text-2xl', subSize: 'text-[10px]' },
    lg: { width: 230, height: 56, iconSize: 50, titleSize: 'text-2xl sm:text-3xl', subSize: 'text-xs' },
    hero: { width: 280, height: 68, iconSize: 58, titleSize: 'text-3xl sm:text-4xl', subSize: 'text-xs' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      title="Navratri - નવરાત્રિ ગુજરાત"
    >
      {/* Traditional Ceremonial Icon: Garbi Diya + Crossed Dandiya Sticks + Mirror-work Mandala */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
      >
        <svg
          viewBox="0 0 80 80"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Royal Crimson & Vermilion Gradient */}
            <linearGradient id="navCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="60%" stopColor="#7A2337" />
              <stop offset="100%" stopColor="#4A0E17" />
            </linearGradient>

            {/* Sacred Saffron & Gold Sun Flame */}
            <linearGradient id="navFlameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Dandiya Wood & Zari Band Gold */}
            <linearGradient id="dandiyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Sacred Lotus Petal Shadow */}
            <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Outer Ashtadal Garba Circle - 8 Sacred Dots (Bandhani / Aabhla Motif) */}
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#D97706"
            strokeWidth="1.2"
            strokeDasharray="2.5 3.5"
            opacity="0.45"
          />

          {/* Traditional 8-corner Decorative Mirror-gems */}
          <circle cx="40" cy="5" r="2.2" fill="#B45309" />
          <circle cx="64.7" cy="15.3" r="2.2" fill="#991B1B" />
          <circle cx="75" cy="40" r="2.2" fill="#B45309" />
          <circle cx="64.7" cy="64.7" r="2.2" fill="#991B1B" />
          <circle cx="40" cy="75" r="2.2" fill="#B45309" />
          <circle cx="15.3" cy="64.7" r="2.2" fill="#991B1B" />
          <circle cx="5" cy="40" r="2.2" fill="#B45309" />
          <circle cx="15.3" cy="15.3" r="2.2" fill="#991B1B" />

          {/* Crossed Gujarati Wooden Dandiya Sticks with Embroidered Bands */}
          {/* Dandiya 1 (Left to Right downward) */}
          <g transform="rotate(38 40 40)">
            {/* Stick body */}
            <rect x="37.5" y="10" width="5" height="60" rx="2.5" fill="url(#dandiyaGrad)" />
            {/* Decorative colored rings (Red & Green Zari) */}
            <rect x="37.5" y="20" width="5" height="3" fill="#7A2337" />
            <rect x="37.5" y="27" width="5" height="2" fill="#226046" />
            <rect x="37.5" y="50" width="5" height="2" fill="#226046" />
            <rect x="37.5" y="56" width="5" height="3" fill="#7A2337" />
            {/* Ghungroo bead tip */}
            <circle cx="40" cy="11" r="2.5" fill="#F59E0B" />
            <circle cx="40" cy="69" r="2.5" fill="#F59E0B" />
          </g>

          {/* Dandiya 2 (Right to Left downward) */}
          <g transform="rotate(-38 40 40)">
            {/* Stick body */}
            <rect x="37.5" y="10" width="5" height="60" rx="2.5" fill="url(#dandiyaGrad)" />
            {/* Decorative colored rings */}
            <rect x="37.5" y="20" width="5" height="3" fill="#7A2337" />
            <rect x="37.5" y="27" width="5" height="2" fill="#226046" />
            <rect x="37.5" y="50" width="5" height="2" fill="#226046" />
            <rect x="37.5" y="56" width="5" height="3" fill="#7A2337" />
            {/* Ghungroo bead tip */}
            <circle cx="40" cy="11" r="2.5" fill="#F59E0B" />
            <circle cx="40" cy="69" r="2.5" fill="#F59E0B" />
          </g>

          {/* Central Sacred Garbo / Diya (Clay Pot with holy perforations) */}
          {/* Base earthen lamp (માટીનો દીવો) */}
          <path
            d="M26 47 C26 58, 54 58, 54 47 C54 43, 26 43, 26 47 Z"
            fill="url(#navCrimsonGrad)"
            stroke="#F59E0B"
            strokeWidth="1.2"
          />

          {/* Garbo Pot Body */}
          <path
            d="M31 43 C28 35, 52 35, 49 43 Z"
            fill="#B45309"
            opacity="0.8"
          />

          {/* Perforations on Garbi pot (light holes) */}
          <circle cx="35" cy="48" r="1.3" fill="#FEF08A" />
          <circle cx="40" cy="49" r="1.5" fill="#FEF08A" />
          <circle cx="45" cy="48" r="1.3" fill="#FEF08A" />

          {/* Holy Eternal Flame (અખંડ જ્યોત / Diya Jyot) with glow */}
          <g filter="url(#flameGlow)">
            <path
              d="M40 21 C44 28, 47 34, 45 40 C43 43, 37 43, 35 40 C33 34, 36 28, 40 21 Z"
              fill="url(#navFlameGrad)"
            />
            {/* Inner intense golden core */}
            <path
              d="M40 27 C42 31, 43 35, 42 39 C41 41, 39 41, 38 39 C37 35, 38 31, 40 27 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>

          {/* Auspicious Kumkum Chandlo (તિલક / ચાંદલો) with sacred rice grain */}
          <circle cx="40" cy="13" r="2.2" fill="#991B1B" />
          <ellipse cx="40" cy="11.5" rx="0.7" ry="1.2" fill="#FEF08A" />
        </svg>
      </div>

      {/* Traditional Gujarati Calligraphy + English Typography */}
      <div className="flex flex-col justify-center leading-none">
        {/* Main Calligraphy Row: Gujarati Script + English */}
        <div className="flex items-baseline gap-2">
          {/* Gujarati Calligraphic Wordmark "નવરાત્રિ" */}
          <span
            className={`font-black tracking-wide font-serif transition-colors ${
              theme === 'dark'
                ? 'text-white group-hover:text-[#FBBF24]'
                : theme === 'gold'
                ? 'text-[#B45309]'
                : 'text-[#7A2337] group-hover:text-[#991B1B]'
            } ${dimensions.titleSize}`}
            style={{
              fontFamily: "'Anek Gujarati', 'Shruti', 'Noto Sans Gujarati', 'Gujarati Sangam MN', serif",
              textShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.4)' : '0 0.5px 0.5px rgba(122,35,55,0.15)',
            }}
          >
            નવરાત્રિ
          </span>

          {/* English Partner Text with Festive Diamond Separator */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#D97706] text-xs font-bold">✦</span>
            <span
              className={`font-bold tracking-tight uppercase ${
                theme === 'dark'
                  ? 'text-amber-200/90'
                  : 'text-[#251F21]'
              } ${size === 'sm' ? 'text-xs' : size === 'hero' ? 'text-xl' : 'text-sm'}`}
            >
              Navratri
            </span>
          </div>
        </div>

        {/* Traditional Cultural Subtitle / Tagline */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`font-semibold tracking-widest uppercase ${dimensions.subSize} ${
                theme === 'dark' ? 'text-amber-300/80' : 'text-[#8C4308]'
              }`}
            >
              ગુજરાત ગરબા મહોત્સવ · 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]/70 hidden sm:inline-block"></span>
            <span
              className={`text-[9px] font-medium tracking-wider hidden sm:inline-block ${
                theme === 'dark' ? 'text-stone-300' : 'text-[#665D60]'
              }`}
            >
              Discovery &amp; Wayfinding
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
