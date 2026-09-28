import React from 'react';

interface MoonLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'horizontal' | 'vertical' | 'mark-only';
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
}

export const MoonSymbol: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 28,
  className = '',
  color = 'currentColor'
}) => {
  return (
    <svg
      width={size * 1.8}
      height={size}
      viewBox="0 0 54 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 transition-transform ${className}`}
      aria-hidden="true"
    >
      <defs>
        <mask id="crescent-mask">
          <rect width="54" height="30" fill="white" />
          {/* circle that cuts the crescent on the right */}
          <circle cx="21" cy="15" r="10" fill="black" />
        </mask>
      </defs>
      {/* Left Crescent Moon */}
      <circle
        cx="14"
        cy="15"
        r="11"
        fill={color}
        mask="url(#crescent-mask)"
      />
      {/* Right Full Moon Circle */}
      <circle
        cx="37"
        cy="15"
        r="11"
        fill={color}
      />
    </svg>
  );
};

export const MoonSpinner: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ''
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-[spin_2.5s_linear_infinite]"
      >
        <circle cx="16" cy="16" r="14" stroke="#E6E4DF" strokeWidth="1.5" />
        <path
          d="M 16 2 A 14 14 0 0 1 16 30 Z"
          fill="#161615"
          className="transition-all"
        />
      </svg>
    </div>
  );
};

export const MoonLogo: React.FC<MoonLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'horizontal',
  className = '',
  theme = 'auto'
}) => {
  const textColor = theme === 'light' ? 'text-white' : 'text-[#161615]';
  const symbolColor = theme === 'light' ? '#FFFFFF' : '#161615';

  const markSizes = {
    sm: 18,
    md: 22,
    lg: 28,
    xl: 38
  };

  const textSizes = {
    sm: 'text-[11px] tracking-[0.24em]',
    md: 'text-[13px] tracking-[0.26em]',
    lg: 'text-[16px] tracking-[0.28em]',
    xl: 'text-[22px] tracking-[0.32em]'
  };

  if (variant === 'mark-only' || !showText) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <MoonSymbol size={markSizes[size]} color={symbolColor} />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center gap-2 select-none ${className}`}>
        <MoonSymbol size={markSizes[size] * 1.2} color={symbolColor} />
        <span className={`font-semibold uppercase font-sans ${textSizes[size]} ${textColor} ml-[0.28em]`}>
          BE&MOON
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <MoonSymbol size={markSizes[size]} color={symbolColor} />
      <div className="flex flex-col">
        <span className={`font-semibold uppercase font-sans ${textSizes[size]} ${textColor} ml-[0.26em]`}>
          BE&MOON
        </span>
      </div>
    </div>
  );
};
