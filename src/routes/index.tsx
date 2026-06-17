import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Clock, BookOpen, Trophy, ArrowUpRight, Sparkles, TrendingUp,
  Play, ChevronRight, Target, Zap, Crown, Map, ArrowRight, ShieldCheck, Terminal, Cpu, Database, Network
} from "lucide-react";
import { useState } from "react";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import {
  weeklyActivity, skillRadar, achievements,
} from "@/lib/mock-data";
import { allRoadmapLessons, TOTAL_LESSONS, roadmapPhases } from "@/lib/roadmap-data";
import { useProgressStore } from "@/lib/progress-store";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIMastery · Elevate to Chief AI Architect" },
      { name: "description", content: "Master LLMs, MLOps, RAG, and Deep Learning in a Stripe-grade 365-day curriculum." },
    ],
  }),
  component: EntryWrapper,
});

// Custom Premium 3D-Styled Brand Logos
const PythonLogo = () => (
  <svg viewBox="0 0 128 128" className="h-9 w-9 filter drop-shadow-[0_4px_6px_rgba(55,118,171,0.3)]">
    <defs>
      <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5A9FD4" />
        <stop offset="50%" stopColor="#306998" />
        <stop offset="100%" stopColor="#1E4666" />
      </linearGradient>
      <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE873" />
        <stop offset="50%" stopColor="#FFD343" />
        <stop offset="100%" stopColor="#DCA413" />
      </linearGradient>
    </defs>
    <path d="M64 8C35.5 8 36.6 20.3 36.6 20.3l.1 12.6h27.8v3.9H25.4S8 35.1 8 64.3c0 29.2 15.2 28.1 15.2 28.1h9.1V79.8c0-14.8 12.1-24.8 26.9-24.8h25.5V36.8c0-12.7-11-28.8-30.7-28.8H64z" fill="url(#pyBlue)" />
    <path d="M64 120c28.5 0 27.4-12.3 27.4-12.3l-.1-12.6H63.5v-3.9h39.1s17.4 1.7 17.4-27.5c0-29.2-15.2-28.1-15.2-28.1h-9.1v12.6c0 14.8-12.1 24.8-26.9 24.8H43.3v18.2c0 12.7 11 28.8 30.7 28.8H64z" fill="url(#pyYellow)" />
    <circle cx="48.5" cy="22.5" r="5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="79.5" cy="105.5" r="5" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

const PyTorchLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_6px_rgba(238,76,44,0.3)]">
    <defs>
      <linearGradient id="ptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA47A" />
        <stop offset="40%" stopColor="#EE4C2C" />
        <stop offset="100%" stopColor="#B31B00" />
      </linearGradient>
      <linearGradient id="ptGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EE4C2C" />
        <stop offset="100%" stopColor="#5A0B00" />
      </linearGradient>
    </defs>
    <path d="M60 15c-3.1 0-6.1.4-9 1.1l7.8 7.8c.4.4.4 1 0 1.4L51 33.2c-.4.4-1 .4-1.4 0l-7.8-7.8c-.7 2.9-1.1 5.9-1.1 9 0 20.2 13.9 37.1 32.7 41.5L66 83.2c-.4.4-.4 1 0 1.4l7.8 7.8c.4.4 1 .4 1.4 0l7.8-7.8c18.8-4.4 32.7-21.3 32.7-41.5 0-24.8-20.2-45-45-45z" fill="url(#ptGrad)" />
    <path d="M36 45c0-10.2 6.1-18.9 14.9-22.7L42.2 13.6C27.9 19.3 18 33.4 18 50c0 20.3 14.9 37.1 34.3 40l-8.7-8.7C28.2 78.4 18 65.4 18 50c0-1.7.1-3.3.4-5h17.6z" fill="url(#ptGradDark)" opacity="0.95" />
  </svg>
);

const TensorFlowLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_6px_8px_rgba(255,158,15,0.3)]">
    <defs>
      <linearGradient id="tfOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF275" />
        <stop offset="50%" stopColor="#FF9E0F" />
        <stop offset="100%" stopColor="#D35400" />
      </linearGradient>
    </defs>
    <path d="M60 10L18 34.2v48.4L60 107V60.4L38 47.7V25.2L60 12.7z" fill="url(#tfOrange)" />
    <path d="M60 10l42 24.2v48.4L60 107V60.4l22-12.7V25.2L60 12.7z" fill="url(#tfOrange)" opacity="0.85" />
    <path d="M60 10L38 22.7L60 35.4l22-12.7z" fill="#FFF8C5" opacity="0.9" />
    <path d="M60 35.4L38 47.7v25.4L60 85.8V35.4z" fill="url(#tfOrange)" opacity="0.75" />
    <path d="M60 35.4l22 12.3v25.4L60 85.8V35.4z" fill="url(#tfOrange)" opacity="0.6" />
  </svg>
);

const KerasLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_6px_rgba(208,0,0,0.3)]">
    <defs>
      <radialGradient id="kerasSph" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FF4D4D" />
        <stop offset="60%" stopColor="#D00000" />
        <stop offset="100%" stopColor="#5E0000" />
      </radialGradient>
      <linearGradient id="kerasK" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0E0E0" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="50" fill="url(#kerasSph)" />
    <path d="M48 35h10v20l15-20h12l-16 21 18 29H75l-17-27v27H48V35z" fill="url(#kerasK)" />
    <path d="M20 40c10-15 25-22 40-22s30 7 40 22c-10-12-25-18-40-18S30 28 20 40z" fill="#FFFFFF" opacity="0.35" />
  </svg>
);

const OpenAILogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(16,163,127,0.35)]">
    <defs>
      <linearGradient id="oaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#66BB6A" />
        <stop offset="50%" stopColor="#10A37F" />
        <stop offset="100%" stopColor="#0B664F" />
      </linearGradient>
      <linearGradient id="oaShine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g transform="translate(60,60)">
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d="M0 0c10-25 35-25 45-10s-5 35-25 35c-15 0-20-10-20-25z"
          fill="url(#oaGrad)"
          transform={`rotate(${i * 60})`}
          opacity={0.9}
        />
      ))}
      <circle cx="0" cy="0" r="10" fill="url(#oaShine)" />
    </g>
  </svg>
);

const GCPGeminiLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_10px_rgba(0,180,216,0.4)]">
    <defs>
      <linearGradient id="geminiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A5F3FC" />
        <stop offset="50%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="geminiGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#D946EF" />
        <stop offset="100%" stopColor="#701A75" />
      </linearGradient>
    </defs>
    <path d="M60 10C60 40 40 60 10 60c30 0 50 20 50 50c0-30 20-50 50-50C80 60 60 40 60 10z" fill="url(#geminiGrad1)" />
    <path d="M85 25c0 15-10 25-25 25c15 0 25 10 25 25c0-15 10-25 25-25c-15 0-25-10-25-25z" fill="url(#geminiGrad2)" opacity="0.85" />
  </svg>
);

const dbtLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(255,107,74,0.35)]">
    <defs>
      <linearGradient id="dbtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8E75" />
        <stop offset="50%" stopColor="#FF6B4A" />
        <stop offset="100%" stopColor="#C43112" />
      </linearGradient>
    </defs>
    <path d="M60 15L15 40v40l45 25l45-25V40L60 15z" fill="url(#dbtGrad)" />
    <path d="M60 15v90L15 80V40L60 15z" fill="#FFFFFF" opacity="0.15" />
    <path d="M60 55l35-20L60 15L25 35l35 20z" fill="#FFFFFF" opacity="0.25" />
  </svg>
);

const DuckDBLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(253,224,71,0.3)]">
    <defs>
      <linearGradient id="duckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#FACC15" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="48" fill="url(#duckGrad)" />
    <path d="M50 65c0 10 30 10 30 0H50z" fill="#EA580C" />
    <path d="M48 65c0-8 16-12 32 0H48z" fill="#F97316" />
    <circle cx="42" cy="45" r="7" fill="#0F172A" />
    <circle cx="70" cy="45" r="7" fill="#0F172A" />
    <circle cx="44" cy="43" r="2.5" fill="#FFF" />
    <circle cx="72" cy="43" r="2.5" fill="#FFF" />
  </svg>
);

const ClickHouseLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(249,115,22,0.35)]">
    <defs>
      <linearGradient id="chOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <path d="M15 20l15-8v80l-15 8V20z" fill="url(#chOrange)" />
    <path d="M30 12l15 8v80l-15-8V12z" fill="url(#chOrange)" opacity="0.8" />
    <path d="M50 35l15-8v50l-15 8V35z" fill="url(#chOrange)" />
    <path d="M65 27l15 8v50l-15-8V27z" fill="url(#chOrange)" opacity="0.8" />
    <path d="M85 20l15-8v80l-15 8V20z" fill="url(#chOrange)" />
    <path d="M100 12l15 8v80l-15-8V12z" fill="url(#chOrange)" opacity="0.8" />
  </svg>
);

const HuggingFaceLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(255,214,0,0.4)]">
    <defs>
      <radialGradient id="hfFace" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="70%" stopColor="#FBC02D" />
        <stop offset="100%" stopColor="#F57F17" />
      </radialGradient>
      <radialGradient id="hfCheek" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8A80" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FF8A80" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="46" fill="url(#hfFace)" />
    <circle cx="34" cy="66" r="10" fill="url(#hfCheek)" />
    <circle cx="86" cy="66" r="10" fill="url(#hfCheek)" />
    <ellipse cx="40" cy="48" rx="6" ry="8" fill="#3E2723" />
    <ellipse cx="80" cy="48" rx="6" ry="8" fill="#3E2723" />
    <circle cx="38" cy="46" r="2" fill="#FFFFFF" />
    <circle cx="78" cy="46" r="2" fill="#FFFFFF" />
    <path d="M42 66c0 10 8 18 18 18s18-8 18-18H42z" fill="#3E2723" />
    <path d="M52 74c2 4 5 6 8 6s6-2 8-6H52z" fill="#FF8A80" />
    <path d="M22 86c5-4 12-4 16 1l10 10-6 6L22 86z" fill="#FFF9C4" opacity="0.95" />
    <path d="M98 86c-5-4-12-4-16 1L72 97l6 6 20-17z" fill="#FFF9C4" opacity="0.95" />
  </svg>
);

const NumPyLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_7px_rgba(77,121,255,0.3)]">
    <defs>
      <linearGradient id="npB1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#85C1E9" />
        <stop offset="100%" stopColor="#01579B" />
      </linearGradient>
      <linearGradient id="npB2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4183D7" />
        <stop offset="100%" stopColor="#0B3C5D" />
      </linearGradient>
      <linearGradient id="npB3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3A539B" />
        <stop offset="100%" stopColor="#1F2A44" />
      </linearGradient>
    </defs>
    <path d="M40 75l-20-11V42l20 11.5V75z" fill="url(#npB2)" />
    <path d="M40 75l20-11V42.5L40 54V75z" fill="url(#npB3)" />
    <path d="M40 54l-20-11.5L40 31l20 11.5L40 54z" fill="url(#npB1)" />
    <path d="M80 50l-20-11V17l20 11.5V50z" fill="url(#npB2)" opacity="0.9" />
    <path d="M80 50l20-11V17.5L80 29V50z" fill="url(#npB3)" opacity="0.9" />
    <path d="M80 29L60 17.5L80 6l20 11.5L80 29z" fill="url(#npB1)" opacity="0.9" />
    <path d="M75 90l-20-11V57l20 11.5V90z" fill="url(#npB2)" />
    <path d="M75 90l20-11V57.5L75 69V90z" fill="url(#npB3)" />
    <path d="M75 69L55 57.5L75 46l20 11.5L75 69z" fill="url(#npB1)" />
  </svg>
);

const PandasLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_6px_rgba(25,18,52,0.3)]">
    <defs>
      <linearGradient id="pdDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3A3258" />
        <stop offset="100%" stopColor="#130F26" />
      </linearGradient>
      <linearGradient id="pdLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB380" />
        <stop offset="100%" stopColor="#FF7A28" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="50" fill="url(#pdDark)" />
    <circle cx="28" cy="28" r="18" fill="#130F26" />
    <circle cx="92" cy="28" r="18" fill="#130F26" />
    <circle cx="28" cy="28" r="10" fill="url(#pdLight)" />
    <circle cx="92" cy="28" r="10" fill="url(#pdLight)" />
    <ellipse cx="60" cy="68" rx="36" ry="30" fill="#FFFFFF" />
    <ellipse cx="44" cy="62" rx="10" ry="14" fill="#130F26" />
    <ellipse cx="76" cy="62" rx="10" ry="14" fill="#130F26" />
    <circle cx="46" cy="60" r="4" fill="#FFFFFF" />
    <circle cx="74" cy="60" r="4" fill="#FFFFFF" />
    <polygon points="60,70 54,78 66,78" fill="url(#pdLight)" />
  </svg>
);

const PolarsLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(56,189,248,0.35)]">
    <defs>
      <linearGradient id="polarsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="polarsHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M60 10L100 35v50L60 110L20 85v-50L60 10z" fill="url(#polarsGrad)" />
    <path d="M60 10v100L20 85v-50L60 10z" fill="#FFFFFF" opacity="0.1" />
    <polygon points="60,30 85,55 60,80 35,55" fill="url(#polarsHighlight)" opacity="0.25" />
    <polygon points="60,45 75,60 60,75 45,60" fill="#FFFFFF" opacity="0.4" />
    <circle cx="60" cy="60" r="5" fill="#38BDF8" />
  </svg>
);

const ScikitLearnLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_6px_rgba(242,142,43,0.3)]">
    <defs>
      <linearGradient id="skOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F89C48" />
        <stop offset="100%" stopColor="#A65306" />
      </linearGradient>
      <linearGradient id="skBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#51A2DA" />
        <stop offset="100%" stopColor="#1E547E" />
      </linearGradient>
      <linearGradient id="skGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5EBA67" />
        <stop offset="100%" stopColor="#2A6B30" />
      </linearGradient>
    </defs>
    <circle cx="45" cy="45" r="32" fill="url(#skOrange)" />
    <circle cx="75" cy="55" r="30" fill="url(#skBlue)" opacity="0.9" />
    <circle cx="58" cy="80" r="28" fill="url(#skGreen)" opacity="0.85" />
    <circle cx="37" cy="37" r="8" fill="#FFFFFF" opacity="0.3" />
    <circle cx="69" cy="47" r="7" fill="#FFFFFF" opacity="0.3" />
    <circle cx="52" cy="74" r="7" fill="#FFFFFF" opacity="0.3" />
  </svg>
);

const XGBoostLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_7px_rgba(30,144,255,0.3)]">
    <defs>
      <linearGradient id="xgbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64B5F6" />
        <stop offset="50%" stopColor="#1976D2" />
        <stop offset="100%" stopColor="#0D47A1" />
      </linearGradient>
      <linearGradient id="xgbSpeed" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFB300" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
    </defs>
    <polygon points="60,95 90,80 60,65 30,80" fill="#2C3E50" opacity="0.5" />
    <polygon points="60,75 80,65 60,55 40,65" fill="url(#xgbGrad)" />
    <polygon points="60,55 75,47 60,39 45,47" fill="url(#xgbGrad)" opacity="0.9" />
    <polygon points="60,39 70,33 60,27 50,33" fill="url(#xgbGrad)" opacity="0.8" />
    <rect x="57" y="75" width="6" height="15" fill="#5D4037" />
    <path d="M25 50l15-20v10h20v20H40v10z" fill="url(#xgbSpeed)" />
  </svg>
);

const JAXLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(240,98,146,0.35)]">
    <defs>
      <linearGradient id="jaxPink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F06292" />
        <stop offset="50%" stopColor="#E91E63" />
        <stop offset="100%" stopColor="#880E4F" />
      </linearGradient>
      <linearGradient id="jaxCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4DD0E1" />
        <stop offset="100%" stopColor="#006064" />
      </linearGradient>
    </defs>
    <path d="M25 30l30 15v40L25 70V30z" fill="url(#jaxPink)" />
    <path d="M55 45l30-15v40L55 85V45z" fill="url(#jaxCyan)" opacity="0.9" />
    <path d="M25 30l30 15L55 45L25 30z" fill="#FFF" opacity="0.2" />
    <path d="M55 45l30-15L85 30L55 45z" fill="#FFF" opacity="0.3" />
    <path d="M85 30l20 10v40l-20-10V30z" fill="url(#jaxPink)" opacity="0.8" />
  </svg>
);

const ClaudeLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(217,119,6,0.3)]">
    <defs>
      <linearGradient id="clGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="45" fill="url(#clGrad)" />
    <path d="M30 45h60l-30 30z" fill="#FFFFFF" opacity="0.3" />
    <path d="M30 45l30 30V45z" fill="#000000" opacity="0.15" />
  </svg>
);

const LangChainLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(34,197,94,0.3)]">
    <defs>
      <linearGradient id="lcGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="50%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#14532D" />
      </linearGradient>
      <linearGradient id="lcBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    <g transform="rotate(-30 60 60)">
      <rect x="25" y="45" width="40" height="30" rx="15" stroke="url(#lcGreen)" strokeWidth="12" fill="none" />
      <rect x="55" y="45" width="40" height="30" rx="15" stroke="url(#lcBlue)" strokeWidth="12" fill="none" />
      <path d="M55 45a15 15 0 0 1 10 5" stroke="url(#lcBlue)" strokeWidth="12" fill="none" />
    </g>
  </svg>
);

const LangGraphLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(139,92,246,0.35)]">
    <defs>
      <linearGradient id="lgNode" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
      <linearGradient id="lgNodeOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDBA74" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>
    </defs>
    <line x1="30" y1="90" x2="60" y2="40" stroke="#8B5CF6" strokeWidth="6" strokeDasharray="2 2" />
    <line x1="60" y1="40" x2="90" y2="90" stroke="#F97316" strokeWidth="6" />
    <line x1="30" y1="90" x2="90" y2="90" stroke="#3B82F6" strokeWidth="4" />
    <circle cx="60" cy="40" r="18" fill="url(#lgNode)" />
    <circle cx="55" cy="35" r="5" fill="#FFF" opacity="0.4" />
    <circle cx="30" cy="90" r="14" fill="url(#lgNodeOrange)" />
    <circle cx="90" cy="90" r="14" fill="url(#lgNode)" opacity="0.8" />
  </svg>
);

const LlamaIndexLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(236,72,153,0.3)]">
    <defs>
      <linearGradient id="liGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#9D174D" />
      </linearGradient>
      <linearGradient id="liIndex" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
    </defs>
    <path d="M40 90h15V65h10v25h15V50c0-10-8-15-18-15H45L35 20h-8l8 20v50z" fill="url(#liGrad)" />
    <circle cx="75" cy="50" r="18" stroke="url(#liIndex)" strokeWidth="4" fill="none" opacity="0.8" />
    <circle cx="75" cy="50" r="8" fill="url(#liIndex)" />
  </svg>
);

const OllamaLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(168,85,247,0.35)]">
    <defs>
      <linearGradient id="olGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="48" fill="url(#olGrad)" />
    <path d="M35 25c0-10 10-15 10-15s5 10 5 15-5 5-15 0z" fill="#581C87" />
    <path d="M85 25c0-10-10-15-10-15s-5 10-5 15 5 5 15 0z" fill="#581C87" />
    <ellipse cx="44" cy="55" rx="12" ry="12" fill="#1E1B4B" />
    <ellipse cx="76" cy="55" rx="12" ry="12" fill="#1E1B4B" />
    <circle cx="44" cy="55" r="4" fill="#FFF" />
    <circle cx="76" cy="55" r="4" fill="#FFF" />
    <rect x="52" y="52" width="16" height="5" fill="#1E1B4B" />
    <ellipse cx="60" cy="78" rx="15" ry="10" fill="#FFF" opacity="0.9" />
    <circle cx="55" cy="76" r="2" fill="#581C87" />
    <circle cx="65" cy="76" r="2" fill="#581C87" />
  </svg>
);

const MLflowLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(14,165,233,0.3)]">
    <defs>
      <linearGradient id="mlfBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="mlfOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <path d="M20 60a25 25 0 0 1 50-15c10 15 20 30 30 15a25 25 0 0 0-50 15c-10-15-20-30-30-15z" fill="url(#mlfBlue)" />
    <path d="M100 60a25 25 0 0 1-50 15c-10-15-20-30-30-15a25 25 0 0 0 50-15c10 15 20 30 30 15z" fill="url(#mlfOrange)" opacity="0.85" />
  </svg>
);

const ZenMLLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(167,139,250,0.35)]">
    <defs>
      <linearGradient id="zenViolet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>
    </defs>
    <ellipse cx="60" cy="80" rx="42" ry="20" fill="url(#zenViolet)" />
    <ellipse cx="60" cy="55" rx="32" ry="15" fill="url(#zenViolet)" opacity="0.85" />
    <ellipse cx="60" cy="35" rx="22" ry="10" fill="url(#zenViolet)" opacity="0.7" />
    <line x1="60" y1="20" x2="60" y2="85" stroke="#FFF" strokeWidth="4" opacity="0.6" />
  </svg>
);

const HopsworksLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(16,185,129,0.3)]">
    <defs>
      <linearGradient id="hopsGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <g transform="translate(10, 10)">
      <path d="M20 40v30c0 8 20 8 20 0V40" fill="url(#hopsGreen)" />
      <ellipse cx="30" cy="40" rx="10" ry="5" fill="#A7F3D0" />
      <path d="M50 50v30c0 8 20 8 20 0V50" fill="url(#hopsGreen)" />
      <ellipse cx="60" cy="50" rx="10" ry="5" fill="#A7F3D0" />
      <path d="M80 30v30c0 8 20 8 20 0V30" fill="url(#hopsGreen)" />
      <ellipse cx="90" cy="30" rx="10" ry="5" fill="#A7F3D0" />
    </g>
  </svg>
);

const TritonLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_5px_8px_rgba(244,63,94,0.35)]">
    <defs>
      <linearGradient id="triGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDA4AF" />
        <stop offset="50%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
    </defs>
    <path d="M60 10L75 40H65v45H55V40H45L60 10z" fill="url(#triGold)" />
    <path d="M35 30l10 20H38v35h-8V50h-7l12-20z" fill="url(#triGold)" opacity="0.8" />
    <path d="M85 30l10 20H88v35h-8V50h-7l12-20z" fill="url(#triGold)" opacity="0.8" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(14,165,233,0.3)]">
    <defs>
      <linearGradient id="dockBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <path d="M10 70c5-15 20-25 45-25c20 0 35 10 45 25c5 8 0 18-10 18H20c-10 0-15-10-10-18z" fill="url(#dockBlue)" />
    <path d="M90 70c10-5 15-15 15-15s-2 15-10 20z" fill="#0284C7" />
    <rect x="30" y="32" width="12" height="10" rx="2" fill="#BAE6FD" />
    <rect x="46" y="32" width="12" height="10" rx="2" fill="#BAE6FD" />
    <rect x="62" y="32" width="12" height="10" rx="2" fill="#BAE6FD" />
    <rect x="38" y="20" width="12" height="10" rx="2" fill="#7DD3FC" />
    <rect x="54" y="20" width="12" height="10" rx="2" fill="#7DD3FC" />
  </svg>
);

const GitLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_6px_rgba(240,80,51,0.3)]">
    <defs>
      <linearGradient id="gitOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F37052" />
        <stop offset="100%" stopColor="#F05032" />
      </linearGradient>
    </defs>
    <rect x="25" y="25" width="70" height="70" rx="12" fill="url(#gitOrange)" transform="rotate(45 60 60)" />
    <line x1="60" y1="35" x2="60" y2="85" stroke="#FFFFFF" strokeWidth="6" />
    <line x1="60" y1="60" x2="80" y2="60" stroke="#FFFFFF" strokeWidth="6" />
    <circle cx="60" cy="35" r="10" fill="#FFFFFF" />
    <circle cx="60" cy="85" r="10" fill="#FFFFFF" />
    <circle cx="80" cy="60" r="10" fill="#FFFFFF" />
  </svg>
);

const PostgresLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(51,103,145,0.3)]">
    <defs>
      <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F83A3" />
        <stop offset="100%" stopColor="#336791" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="48" fill="url(#pgGrad)" />
    <path d="M35 55c0-10 15-15 25-15s25 10 25 25c0 15-10 25-20 25s-15-5-15-15" fill="#FFF" opacity="0.35" />
    <path d="M55 45c10 0 20 10 20 25s-10 20-20 20s-10-10-10-25s5-40 10-40z" fill="#1D3E56" opacity="0.75" />
    <path d="M32 68c5 5 15 5 15 0" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 120 120" className="h-9 w-9 filter drop-shadow-[0_4px_7px_rgba(220,38,38,0.3)]">
    <defs>
      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    <path d="M20 35l40-15l40 15l-40 15l-40-15z" fill="url(#redGrad)" />
    <path d="M20 35v10l40 15l40-15V35l-40 15l-40-15z" fill="url(#redGrad)" opacity="0.95" />
    <path d="M20 55v10l40 15l40-15V55l-40 15l-40-15z" fill="url(#redGrad)" opacity="0.85" />
    <path d="M20 75v10l40 15l40-15V75l-40 15l-40-15z" fill="url(#redGrad)" opacity="0.75" />
  </svg>
);

function EntryWrapper() {
  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("aimastery_entered") !== "true";
    }
    return true;
  });

  const handleEnterWorkspace = () => {
    sessionStorage.setItem("aimastery_entered", "true");
    setShowLanding(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <PremiumLandingPage onEnter={handleEnterWorkspace} />
      ) : (
        <HubDashboard onBackToLanding={() => {
          sessionStorage.setItem("aimastery_entered", "false");
          setShowLanding(true);
        }} />
      )}
    </AnimatePresence>
  );
}

// ─── Premium Landing Page Component ───────────────────────────
function PremiumLandingPage({ onEnter }: { onEnter: () => void }) {
  // Rich visual stack representation of 13 levels with dynamic coordinates for 3D fanning
  const floatingLevels = [
    { num: 12, name: "Chief AI Architect Leadership", color: "from-pink-500 to-rose-600", y: -110, scale: 0.82, rotate: -4 },
    { num: 11, name: "AI Architecture & System Design", color: "from-amber-400 to-orange-600", y: -90, scale: 0.85, rotate: 2 },
    { num: 10, name: "MLOps & Production AI Pipelines", color: "from-emerald-400 to-teal-600", y: -70, scale: 0.88, rotate: -2 },
    { num: 9, name: "LLM Engineering & RAG Systems", color: "from-cyan-400 to-blue-600", y: -50, scale: 0.91, rotate: 3 },
    { num: 7, name: "Natural Language Processing (NLP)", color: "from-violet-500 to-purple-600", y: -30, scale: 0.94, rotate: -3 },
    { num: 6, name: "Deep Learning Foundations & Frameworks", color: "from-fuchsia-500 to-indigo-600", y: -10, scale: 0.97, rotate: 1 },
    { num: 4, name: "Core & Classical Machine Learning", color: "from-violet-400 to-cyan-500", y: 10, scale: 1.0, rotate: 0 }
  ];

  return (
    <div className="min-h-screen w-full bg-[#030014] text-slate-100 flex flex-col relative overflow-hidden font-sans selection:bg-violet-500/30 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[45%] h-[45%] rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0c2915_1px,transparent_1px),linear-gradient(to_bottom,#0f0c2915_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full h-16 border-b border-white/5 backdrop-blur-xl bg-black/20 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 grid place-items-center shadow-[0_0_24px_-4px_oklch(0.62_0.22_295/0.8)]">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-md bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">AIMastery</span>
        </div>
        <button
          onClick={onEnter}
          className="flex h-9 px-4 items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-all cursor-pointer"
        >
          Launch Workspace <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium"
            >
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              Complete 365-Day Curriculum
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white"
            >
              Master LLMs & <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Frontier AI Systems
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-base lg:text-lg leading-relaxed max-w-xl"
            >
              A premium, interactive curriculum covering PyTorch, TensorFlow, LLM engineering, advanced Graph RAG, MLOps, and trillion-parameter multi-agent frameworks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={onEnter}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white text-sm font-semibold shadow-[0_0_32px_oklch(0.62_0.22_295/0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Open AI Mastery <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#ecosystem"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-sm font-semibold border border-white/5 hover:border-white/10 transition-all"
              >
                Explore Syllabus
              </a>
            </motion.div>
          </div>

          {/* Right 3D Style Floating Level Stack */}
          <div className="lg:col-span-5 flex items-center justify-center min-h-[380px] relative">
            <div className="relative w-full max-w-[340px] h-[320px] flex items-center justify-center" style={{ transformStyle: "preserve-3d", perspective: "1200px", transform: "rotateX(15deg) rotateY(-12deg) rotateZ(2deg)" }}>
              {floatingLevels.map((lvl, idx) => (
                <motion.div
                  key={lvl.num}
                  initial={{
                    opacity: 0,
                    y: 120,
                    scale: 0.7,
                    rotate: 0,
                    z: -120
                  }}
                  animate={{
                    opacity: 1,
                    y: [lvl.y, lvl.y - 8, lvl.y],
                    scale: lvl.scale,
                    rotate: [lvl.rotate, lvl.rotate + 1.5, lvl.rotate],
                    z: 0
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: idx * 0.12 },
                    scale: { duration: 0.8, delay: idx * 0.12 },
                    y: {
                      duration: 4.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: idx * 0.25,
                    },
                    rotate: {
                      duration: 5.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: idx * 0.2,
                    }
                  }}
                  className="absolute w-full rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur-md p-4 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-3 select-none hover:border-violet-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: idx,
                  }}
                  whileHover={{
                    z: 50,
                    scale: lvl.scale * 1.05,
                    y: lvl.y - 15,
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md", lvl.color)}>
                    P{lvl.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Level {lvl.num}</div>
                    <div className="text-xs font-bold text-white truncate">{lvl.name}</div>
                  </div>
                  <ChevronRight className="h-4.5 w-4.5 text-slate-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Visual Tool Logos & Ecosystem ── */}
        <section id="ecosystem" className="mt-24 pt-16 border-t border-white/5 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Master 2026's Core Libraries & Ecosystem Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
            {[
              { logo: PythonLogo, name: "Python 3.11", color: "hover:border-[#3776AB]/30 hover:shadow-[0_0_20px_rgba(55,118,171,0.15)]" },
              { logo: PyTorchLogo, name: "PyTorch", color: "hover:border-[#EE4C2C]/30 hover:shadow-[0_0_20px_rgba(238,76,44,0.15)]" },
              { logo: TensorFlowLogo, name: "TensorFlow", color: "hover:border-[#FF9E0F]/30 hover:shadow-[0_0_20px_rgba(255,158,15,0.15)]" },
              { logo: KerasLogo, name: "Keras 3", color: "hover:border-[#D00000]/30 hover:shadow-[0_0_20px_rgba(208,0,0,0.15)]" },
              { logo: NumPyLogo, name: "NumPy", color: "hover:border-[#01579B]/30 hover:shadow-[0_0_20px_rgba(1,87,155,0.15)]" },
              { logo: PandasLogo, name: "Pandas", color: "hover:border-[#130F26]/30 hover:shadow-[0_0_20px_rgba(58,50,88,0.15)]" },
              { logo: PolarsLogo, name: "Polars Dataframe", color: "hover:border-[#38BDF8]/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]" },
              { logo: ScikitLearnLogo, name: "Scikit-Learn", color: "hover:border-[#F89C48]/30 hover:shadow-[0_0_20px_rgba(248,156,72,0.15)]" },
              { logo: XGBoostLogo, name: "XGBoost", color: "hover:border-[#1976D2]/30 hover:shadow-[0_0_20px_rgba(25,118,210,0.15)]" },
              { logo: JAXLogo, name: "JAX Compute", color: "hover:border-[#E91E63]/30 hover:shadow-[0_0_20px_rgba(233,30,99,0.15)]" },
              { logo: HuggingFaceLogo, name: "Hugging Face", color: "hover:border-[#FBC02D]/30 hover:shadow-[0_0_20px_rgba(251,192,45,0.15)]" },
              { logo: OpenAILogo, name: "OpenAI API", color: "hover:border-[#10A37F]/30 hover:shadow-[0_0_20px_rgba(16,163,127,0.15)]" },
              { logo: GCPGeminiLogo, name: "Google Gemini", color: "hover:border-[#06B6D4]/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
              { logo: ClaudeLogo, name: "Anthropic Claude", color: "hover:border-[#D97706]/30 hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]" },
              { logo: LangChainLogo, name: "LangChain Engine", color: "hover:border-[#22C55E]/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]" },
              { logo: LangGraphLogo, name: "LangGraph Agent", color: "hover:border-[#8B5CF6]/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]" },
              { logo: LlamaIndexLogo, name: "LlamaIndex RAG", color: "hover:border-[#EC4899]/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]" },
              { logo: OllamaLogo, name: "Ollama Local", color: "hover:border-[#A855F7]/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]" },
              { logo: dbtLogo, name: "dbt Core Pipeline", color: "hover:border-[#FF6B4A]/30 hover:shadow-[0_0_20px_rgba(255,107,74,0.15)]" },
              { logo: DuckDBLogo, name: "DuckDB Analytics", color: "hover:border-[#FACC15]/30 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)]" },
              { logo: ClickHouseLogo, name: "ClickHouse OLAP", color: "hover:border-[#EA580C]/30 hover:shadow-[0_0_20px_rgba(234,88,12,0.15)]" },
              { logo: MLflowLogo, name: "MLflow Registry", color: "hover:border-[#0284C7]/30 hover:shadow-[0_0_20px_rgba(2,132,199,0.15)]" },
              { logo: ZenMLLogo, name: "ZenML Orchestrator", color: "hover:border-[#5B21B6]/30 hover:shadow-[0_0_20px_rgba(91,33,182,0.15)]" },
              { logo: HopsworksLogo, name: "Hopsworks Store", color: "hover:border-[#059669]/30 hover:shadow-[0_0_20px_rgba(5,150,105,0.15)]" },
              { logo: TritonLogo, name: "Triton Inference", color: "hover:border-[#F43F5E]/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]" },
              { logo: DockerLogo, name: "Docker Container", color: "hover:border-[#0284C7]/30 hover:shadow-[0_0_20px_rgba(2,132,199,0.15)]" },
              { logo: GitLogo, name: "Git Control", color: "hover:border-[#F05032]/30 hover:shadow-[0_0_20px_rgba(240,80,50,0.15)]" },
              { logo: PostgresLogo, name: "Postgres DB", color: "hover:border-[#336791]/30 hover:shadow-[0_0_20px_rgba(51,103,145,0.15)]" },
              { logo: RedisLogo, name: "Redis Cache", color: "hover:border-[#EF4444]/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]" },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className={cn(
                  "rounded-xl border border-white/5 bg-white/[0.01] p-4 flex flex-col items-center justify-center gap-2.5 hover:bg-white/[0.03] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 group",
                  tool.color
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:translate-z-10">
                  <tool.logo />
                </div>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-white/5 text-center text-xs text-slate-500">
        © 2026 AIMastery · Built for Abhishek Panda · Powered by Panda AI
      </footer>
    </div>
  );
}

// ─── Dashboard Content Page ───────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, accent }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; sub: string; accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl glass p-5 gradient-border"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
        </div>
        <div className={`h-9 w-9 rounded-lg grid place-items-center ${accent}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function ProgressRing({ value, label }: { value: number; label: string }) {
  const r = 38, c = 2 * Math.PI * r;
  return (
    <div className="relative h-24 w-24 grid place-items-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} strokeWidth="6" className="stroke-muted/40 fill-none" />
        <motion.circle
          cx="50" cy="50" r={r} strokeWidth="6" strokeLinecap="round" className="fill-none"
          stroke="url(#ringGrad)"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.22 295)" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 200)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <div className="text-lg font-semibold leading-none">{value}%</div>
        <div className="mt-0.5 text-[9px] text-muted-foreground uppercase">{label}</div>
      </div>
    </div>
  );
}

function HubDashboard({ onBackToLanding }: { onBackToLanding: () => void }) {
  const store = useProgressStore();

  const continueLessons = allRoadmapLessons
    .filter(l => store.isInProgress(l.id))
    .slice(0, 3);

  // Phase progress overview
  const phaseProgressList = roadmapPhases.slice(0, 6).map(p => ({
    phase: p,
    progress: store.getPhaseProgress(p.id),
  }));

  const xpProgressPct = ((500 - store.xpToNextLevel) / 500) * 100;

  return (
    <AppShell>
      <PageShell>
        {/* Hero */}
        <div className="mb-8 relative overflow-hidden rounded-2xl glass-strong p-6 lg:p-8 gradient-border">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                  <Sparkles className="h-3 w-3 animate-pulse" /> Welcome back
                </span>
                <button
                  onClick={onBackToLanding}
                  className="text-[9px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition-colors cursor-pointer"
                >
                  ← Home Screen
                </button>
              </div>
              <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                Welcome, <span className="gradient-text">Abhishek Panda</span>
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
                {store.completedCount} lessons completed · {store.overallProgress}% of the road to Chief AI Architect
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/roadmap" className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-white text-xs font-medium shadow-[0_0_24px_-6px_oklch(0.62_0.22_295/0.7)] hover:opacity-90">
                  <Map className="h-3.5 w-3.5" /> AI Roadmap <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <ProgressRing value={store.overallProgress} label="Roadmap" />
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-amber-400">{store.totalXp.toLocaleString()}</div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Total XP</div>
                <div className="text-xs text-muted-foreground">Level {store.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Flame} label="Streak" value={`${store.streak}d`} sub="Keep it up!" accent="bg-gradient-to-br from-rose-500 to-orange-500" />
          <StatCard icon={Clock} label="Hours Studied" value={`${store.totalHoursStudied}h`} sub="This journey" accent="bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          <StatCard icon={BookOpen} label="Lessons Done" value={`${store.completedCount}`} sub={`of ${TOTAL_LESSONS} total`} accent="bg-gradient-to-br from-cyan-400 to-blue-500" />
          <StatCard icon={Trophy} label="Milestones" value={`${store.unlockedMilestoneCount}`} sub="phases unlocked" accent="bg-gradient-to-br from-amber-400 to-orange-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Activity chart */}
          <div className="lg:col-span-2 rounded-xl glass p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">Weekly Activity</div>
                <div className="text-xs text-muted-foreground">Hours studied · last 7 days</div>
              </div>
              <div className="text-xs text-emerald-400 inline-flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Keep going!
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivity}>
                  <defs>
                    <linearGradient id="ar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.22 295)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.62 0.22 295)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="oklch(0.66 0.012 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.17 0.007 285)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="hours" stroke="oklch(0.62 0.22 295)" strokeWidth={2} fill="url(#ar)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills radar */}
          <div className="rounded-xl glass p-5">
            <div className="text-sm font-semibold">Skill Map</div>
            <div className="text-xs text-muted-foreground mb-2">Mastery across domains</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="oklch(1 0 0 / 0.08)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.66 0.012 270)", fontSize: 10 }} />
                  <Radar dataKey="score" stroke="oklch(0.78 0.14 200)" fill="oklch(0.78 0.14 200)" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Phase progress overview */}
        <div className="rounded-xl glass p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold inline-flex items-center gap-1.5">
              <Map className="h-4 w-4 text-violet-400" /> Phase Progress
            </div>
            <Link to="/roadmap" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              Open Roadmap <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {phaseProgressList.map(({ phase, progress }) => (
              <div key={phase.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div
                  className="h-8 w-8 rounded-lg grid place-items-center text-sm shrink-0 font-bold text-white"
                  style={{ background: `${phase.color}55` }}
                >
                  {phase.phase}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{phase.title}</div>
                  <div className="h-1.5 rounded-full bg-muted/50 mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${progress}%`, background: phase.color }}
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold shrink-0" style={{ color: phase.color }}>{progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue learning */}
        {continueLessons.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Continue Learning</div>
              <Link to="/roadmap" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                View roadmap <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {continueLessons.map(l => (
                <motion.div
                  key={l.id}
                  whileHover={{ y: -2 }}
                  className="group relative rounded-xl glass p-4 cursor-pointer overflow-hidden"
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{l.phaseTitle}</div>
                  <div className="text-sm font-medium mb-1 line-clamp-2">{l.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mb-3">{l.description}</div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-muted-foreground"><Clock className="inline h-3 w-3 mr-1" />{l.duration} min</div>
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 grid place-items-center opacity-80 group-hover:opacity-100 transition">
                      <Play className="h-3 w-3 text-white fill-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row: achievements + XP progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl glass p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold inline-flex items-center gap-1.5"><Trophy className="h-4 w-4 text-amber-400" /> Recent Achievements</div>
              <Link to="/achievements" className="text-xs text-muted-foreground hover:text-foreground">All</Link>
            </div>
            <div className="space-y-2">
              {achievements.filter(a => a.unlocked).slice(0, 3).map(a => (
                <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30 grid place-items-center text-base">🏆</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.description}</div>
                  </div>
                  <div className="text-xs text-amber-400 font-medium">+{a.xp} XP</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl glass p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold inline-flex items-center gap-1.5"><Target className="h-4 w-4 text-cyan-400" /> XP Progress</div>
              <div className="text-xs text-muted-foreground">Level {store.level}</div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{store.totalXp.toLocaleString()} XP</span>
                <span className="text-muted-foreground">{(store.level * 500).toLocaleString()} XP</span>
              </div>
              <div className="h-3 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgressPct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1.5">{store.xpToNextLevel} XP to Level {store.level + 1}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <div className="text-lg font-bold text-violet-400">{store.completedCount}</div>
                <div className="text-[10px] text-muted-foreground">Lessons Done</div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 text-center">
                <div className="text-lg font-bold text-emerald-400">{store.unlockedMilestoneCount}</div>
                <div className="text-[10px] text-muted-foreground">Milestones</div>
              </div>
            </div>
          </div>
        </div>

        {/* Suppress unused */}
        <div className="hidden"><PageHeader title="" /></div>
      </PageShell>
    </AppShell>
  );
}
