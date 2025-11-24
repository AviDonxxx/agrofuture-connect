const BrandLogo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      <span className="relative inline-flex h-12 w-12 items-center justify-center">
        <svg viewBox="0 0 64 64" className="h-12 w-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <defs>
            <linearGradient id="soil" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c67d2e" />
              <stop offset="100%" stopColor="#5a3d1b" />
            </linearGradient>
            <linearGradient id="sprout" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="42" rx="26" ry="12" fill="url(#soil)" />
          <path d="M32 42 L32 18" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 28 C22 24 20 16 25 14 C30 12 34 20 32 28Z" fill="url(#sprout)" />
          <path d="M32 28 C42 24 44 16 39 14 C34 12 30 20 32 28Z" fill="url(#sprout)" />
          <circle cx="32" cy="18" r="2" fill="#15803d" />
          <ellipse cx="16" cy="40" rx="6" ry="2" fill="#8b5a2b" opacity="0.6" />
          <ellipse cx="48" cy="44" rx="8" ry="3" fill="#8b5a2b" opacity="0.6" />
        </svg>
      </span>
      <div className="leading-tight">
        <p className="text-lg font-black tracking-wide text-primary">АгроПоле-242</p>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">земля • ai • фермеры</p>
      </div>
    </div>
  );
};

export default BrandLogo;

