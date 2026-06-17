import { cn } from "@/lib/utils";

export function AIMasteryLogo({ className = "h-8 w-8", glow = true }: { className?: string; glow?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("select-none transition-all duration-300", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Core theme linear gradient spanning from violet through fuchsia to cyan */}
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" /> {/* violet-500 */}
          <stop offset="50%" stopColor="#D946EF" /> {/* fuchsia-500 */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* cyan-500 */}
        </linearGradient>
        {/* Glowing backdrop radial gradient */}
        <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Decorative background glow */}
      {glow && <circle cx="50" cy="50" r="46" fill="url(#logoGlow)" />}

      {/* Main Hexagonal Circuit Shell */}
      <g stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Flowing ribbon-like outer curves representing brain hemispheres & hexagon boundaries */}
        <path d="M 46,12 C 24,14 18,34 24,54 C 28,68 40,76 50,88" strokeWidth="4.5" />
        <path d="M 54,12 C 76,14 82,34 76,54 C 72,68 60,76 50,88" strokeWidth="4.5" />
        <path d="M 50,88 C 43,78 30,70 30,50 C 30,32 44,24 50,12" strokeWidth="3" opacity="0.85" />

        {/* Central circuit trunk bus bar */}
        <path d="M 50,22 L 50,72" strokeWidth="2.5" />

        {/* Right-angled horizontal branching tracks */}
        <path d="M 50,35 L 41,35 L 37,41 L 32,41" strokeWidth="2" />
        <path d="M 50,45 L 59,45 L 63,51 L 68,51" strokeWidth="2" />
        <path d="M 50,57 L 41,57 L 37,63 L 32,63" strokeWidth="2" />
        <path d="M 50,65 L 59,65 L 63,71 L 68,71" strokeWidth="2" />

        {/* Outer dashed helper hexagon context */}
        <path d="M 50,9 L 82,27.5 L 82,64.5 L 50,83 L 18,64.5 L 18,27.5 Z" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.35" />

        {/* Connected neural network paths */}
        <path d="M 30,30 L 34,42 L 26,50" strokeWidth="1.5" opacity="0.7" />
        <path d="M 70,30 L 66,42 L 74,50" strokeWidth="1.5" opacity="0.7" />
        <path d="M 26,50 L 32,60 L 40,68" strokeWidth="1.5" opacity="0.7" />
        <path d="M 74,50 L 68,60 L 60,68" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Interconnected circuit nodes / dots */}
      <g fill="url(#logoGrad)">
        {/* Trunk termination points */}
        <circle cx="50" cy="22" r="3.5" />
        <circle cx="50" cy="72" r="3.5" />

        {/* Frame vertices/anchors */}
        <circle cx="46" cy="12" r="2.2" />
        <circle cx="54" cy="12" r="2.2" />
        <circle cx="50" cy="88" r="2.2" />

        {/* Left cluster nodes */}
        <circle cx="30" cy="30" r="3" />
        <circle cx="34" cy="42" r="3" />
        <circle cx="26" cy="50" r="3" />
        <circle cx="32" cy="60" r="3" />
        <circle cx="40" cy="68" r="3" />
        <circle cx="32" cy="41" r="1.8" />
        <circle cx="32" cy="63" r="1.8" />

        {/* Right cluster nodes */}
        <circle cx="70" cy="30" r="3" />
        <circle cx="66" cy="42" r="3" />
        <circle cx="74" cy="50" r="3" />
        <circle cx="68" cy="60" r="3" />
        <circle cx="60" cy="68" r="3" />
        <circle cx="68" cy="51" r="1.8" />
        <circle cx="68" cy="71" r="1.8" />
      </g>
    </svg>
  );
}
