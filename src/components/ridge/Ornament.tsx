export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 text-accent ${className}`}
      aria-hidden
    >
      <span className="rule-gold h-px w-16 opacity-60 sm:w-24" />
      <svg
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        className="opacity-80"
      >
        <path d="M13 1c0 3.6-2.6 6-6 6 0-3.6 2.6-6 6-6Z" />
        <path d="M13 1c0 3.6 2.6 6 6 6 0-3.6-2.6-6-6-6Z" />
        <path d="M13 7v6" />
        <circle cx="13" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
      <span className="rule-gold h-px w-16 opacity-60 sm:w-24" />
    </div>
  );
}

export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      className={className}
      aria-hidden
    >
      <path d="M20 38C20 20 28 6 38 2c2 16-6 30-18 36Z" />
      <path d="M20 38C20 20 12 6 2 2c-2 16 6 30 18 36Z" />
      <path d="M20 38V14" />
    </svg>
  );
}
