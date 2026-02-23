'use client';

import { FormEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
import { DateTime } from 'luxon';
import { Compass, Sparkles, Footprints, Frown, Target, Orbit, Waypoints, Clock3 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type CenterKey =
  | 'HEAD'
  | 'AJNA'
  | 'THROAT'
  | 'G'
  | 'HEART'
  | 'SACRAL'
  | 'SOLAR_PLEXUS'
  | 'SPLEEN'
  | 'ROOT';

type CenterState = {
  defined: boolean;
  open: boolean;
  definedBy: 'personality' | 'design' | 'both' | null;
  activatedGates: number[];
};

type ChartData = {
  input: {
    name: string;
    location: string;
    birthDate: string;
    birthTime: string;
    birthUtc: string;
    timezone: string;
    unknownBirthTime: boolean;
  };
  type: 'Generator' | 'Manifesting Generator' | 'Projector' | 'Manifestor' | 'Reflector';
  authority: 'Sacral' | 'Emotional' | 'Splenic' | 'Ego' | 'Self-Projected' | 'Mental' | 'Lunar';
  profile: string;
  definition: 'Single' | 'Split' | 'Triple-Split' | 'Quadruple-Split' | 'None';
  strategy: string;
  notSelfTheme: string;
  signature: string;
  incarnationCross: { name: string; gates: [number, number, number, number] };
  centers: Record<CenterKey, CenterState>;
  definedChannels: Array<{ gateA: number; gateB: number; name: string; definedBy: 'personality' | 'design' | 'both' }>;
  personalityData: Array<{ planet: string; gate: number; line: number }>;
  designData: Array<{ planet: string; gate: number; line: number }>;
};

type FormState = {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  timezone: string;
  location: string;
  unknownBirthTime: boolean;
  email: string;
};

const initialForm: FormState = {
  name: '',
  dateOfBirth: '',
  timeOfBirth: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  location: '',
  unknownBirthTime: false,
  email: '',
};

const fallbackTimezones = [
  'UTC',
  'Europe/Brussels',
  'Europe/London',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Australia/Sydney',
];

function normalizeTimezone(input: string): string {
  return input.trim().replace(/\s*\/\s*/g, '/').replace(/\s+/g, '_');
}

type GateActivation = 'none' | 'personality' | 'design' | 'both';

const CHART_TOKENS = {
  chartBg: '#FAFAF7',
  chartCream: '#F5F0E8',
  chartBorder: '#D4C9B8',
  centerOpen: '#FFFFFF',
  centerOpenStroke: '#D4C9B8',
  centerUndefinedStroke: '#B8A898',
  centerPersonality: '#2A2218',
  centerDesign: '#C8643C',
  channelUndefined: '#E0D9CF',
  channelPersonality: '#2A2218',
  channelDesign: '#C8643C',
  gateActivePersonality: '#1A1714',
  gateActiveDesign: '#C8643C',
  gateActiveBoth: '#8B4513',
  gateInactive: '#D4C9B8',
} as const;

const CENTER_DEFINED_FILL: Record<CenterKey, string> = {
  HEAD: '#0F1116',
  AJNA: '#86B9B0',
  THROAT: '#5E4F4B',
  G: '#E5E1A1',
  HEART: '#D35F5A',
  SACRAL: '#D65E5E',
  SOLAR_PLEXUS: '#5E4F4B',
  SPLEEN: '#0F1116',
  ROOT: '#5E4F4B',
};

function centerFill(centerKey: CenterKey, center: CenterState): string {
  if (!center.defined) return CHART_TOKENS.centerOpen;
  if (center.definedBy === 'both') return 'url(#both-defined)';
  return CENTER_DEFINED_FILL[centerKey];
}

function centerStroke(center: CenterState): string {
  if (center.defined) return '#1A1714';
  return center.open ? CHART_TOKENS.centerOpenStroke : CHART_TOKENS.centerUndefinedStroke;
}

function centerStrokeDash(center: CenterState): string | undefined {
  if (center.defined) return undefined;
  return center.open ? undefined : '4 3';
}

const PLANET_ORDER = [
  'Sun',
  'Earth',
  'Moon',
  'North Node',
  'South Node',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
] as const;

const PLANET_GLYPH: Record<string, string> = {
  Sun: '☉',
  Earth: '⊕',
  Moon: '☽',
  'North Node': '☊',
  'South Node': '☋',
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄',
  Uranus: '♅',
  Neptune: '♆',
  Pluto: '♇',
};

const GATE_COORDS: Record<number, { x: number; y: number }> = {
  64: { x: 394, y: 103 }, 61: { x: 420, y: 94 }, 63: { x: 446, y: 103 },
  47: { x: 392, y: 152 }, 24: { x: 420, y: 166 }, 4: { x: 446, y: 152 }, 17: { x: 374, y: 188 }, 43: { x: 420, y: 206 }, 11: { x: 466, y: 188 },
  62: { x: 386, y: 258 }, 23: { x: 420, y: 258 }, 56: { x: 454, y: 258 }, 35: { x: 468, y: 284 }, 12: { x: 468, y: 314 }, 45: { x: 452, y: 340 }, 33: { x: 420, y: 348 }, 8: { x: 388, y: 340 }, 31: { x: 372, y: 314 }, 20: { x: 372, y: 284 }, 16: { x: 386, y: 258 },
  1: { x: 420, y: 383 }, 13: { x: 455, y: 411 }, 25: { x: 452, y: 450 }, 46: { x: 420, y: 479 }, 2: { x: 388, y: 450 }, 15: { x: 385, y: 411 }, 10: { x: 420, y: 429 }, 7: { x: 420, y: 478 },
  21: { x: 496, y: 406 }, 40: { x: 525, y: 447 }, 26: { x: 496, y: 478 }, 51: { x: 474, y: 447 },
  5: { x: 390, y: 537 }, 14: { x: 420, y: 529 }, 29: { x: 450, y: 537 }, 59: { x: 456, y: 578 }, 9: { x: 450, y: 616 }, 3: { x: 420, y: 624 }, 42: { x: 390, y: 616 }, 27: { x: 384, y: 578 }, 34: { x: 420, y: 578 },
  6: { x: 528, y: 526 }, 37: { x: 552, y: 562 }, 22: { x: 552, y: 601 }, 36: { x: 528, y: 635 }, 30: { x: 500, y: 635 }, 55: { x: 488, y: 601 }, 49: { x: 500, y: 562 },
  48: { x: 305, y: 524 }, 57: { x: 330, y: 562 }, 44: { x: 330, y: 601 }, 50: { x: 305, y: 635 }, 32: { x: 277, y: 635 }, 28: { x: 265, y: 601 }, 18: { x: 277, y: 562 },
  58: { x: 386, y: 726 }, 38: { x: 410, y: 749 }, 54: { x: 434, y: 749 }, 53: { x: 458, y: 726 }, 60: { x: 458, y: 767 }, 52: { x: 434, y: 785 }, 19: { x: 410, y: 785 }, 39: { x: 386, y: 767 }, 41: { x: 420, y: 767 },
};

const BODYGRAPH_CHANNELS = [
  [64, 47], [61, 24], [63, 4], [17, 62], [43, 23], [11, 56], [16, 48], [20, 57],
  [31, 7], [8, 1], [33, 13], [35, 36], [12, 22], [45, 21], [10, 20], [10, 57],
  [25, 51], [46, 29], [2, 14], [15, 5], [44, 26], [50, 27], [32, 54], [28, 38],
  [18, 58], [57, 34], [59, 6], [34, 20], [9, 52], [3, 60], [42, 53], [37, 40],
  [30, 41], [55, 39], [49, 19], [21, 45],
] as const;

const CHANNEL_CURVE_OFFSETS: Record<string, { x: number; y: number }> = {
  '16-48': { x: -60, y: -8 },
  '57-34': { x: -58, y: 12 },
  '32-54': { x: -54, y: 16 },
  '28-38': { x: -52, y: 10 },
  '18-58': { x: -56, y: 10 },
  '44-26': { x: -40, y: -14 },
  '50-27': { x: -36, y: -10 },
  '35-36': { x: 44, y: 8 },
  '12-22': { x: 46, y: 8 },
  '37-40': { x: 42, y: 5 },
  '55-39': { x: 44, y: 10 },
  '49-19': { x: 42, y: 6 },
  '30-41': { x: 38, y: 12 },
  '59-6': { x: 30, y: 0 },
};

const CENTER_GATES_BY_CENTER: Record<CenterKey, number[]> = {
  HEAD: [64, 61, 63],
  AJNA: [47, 24, 4, 17, 43, 11],
  THROAT: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
  G: [1, 13, 25, 46, 2, 15, 10, 7],
  HEART: [21, 40, 26, 51],
  SACRAL: [5, 14, 29, 59, 9, 3, 42, 27, 34],
  SOLAR_PLEXUS: [6, 37, 22, 36, 30, 55, 49],
  SPLEEN: [48, 57, 44, 50, 32, 28, 18],
  ROOT: [58, 38, 54, 53, 60, 52, 19, 39, 41],
};

const GATE_TO_CENTER = (Object.entries(CENTER_GATES_BY_CENTER) as Array<[CenterKey, number[]]>).reduce((acc, [center, gates]) => {
  gates.forEach((gate) => {
    acc[gate] = center;
  });
  return acc;
}, {} as Record<number, CenterKey>);

const channelKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

function getChannelSegments(a: number, b: number) {
  const p1 = GATE_COORDS[a];
  const p2 = GATE_COORDS[b];
  const key = channelKey(a, b);
  const offset = CHANNEL_CURVE_OFFSETS[key];

  if (!offset) {
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    return {
      full: `M${p1.x} ${p1.y} L${p2.x} ${p2.y}`,
      first: `M${p1.x} ${p1.y} L${mx} ${my}`,
      second: `M${p2.x} ${p2.y} L${mx} ${my}`,
    };
  }

  const cx = (p1.x + p2.x) / 2 + offset.x;
  const cy = (p1.y + p2.y) / 2 + offset.y;
  const q0x = (p1.x + cx) / 2;
  const q0y = (p1.y + cy) / 2;
  const q1x = (cx + p2.x) / 2;
  const q1y = (cy + p2.y) / 2;
  const mx = (q0x + q1x) / 2;
  const my = (q0y + q1y) / 2;

  return {
    full: `M${p1.x} ${p1.y} Q${cx} ${cy} ${p2.x} ${p2.y}`,
    first: `M${p1.x} ${p1.y} Q${q0x} ${q0y} ${mx} ${my}`,
    second: `M${p2.x} ${p2.y} Q${q1x} ${q1y} ${mx} ${my}`,
  };
}

type HighlightState = {
  gate?: number;
  center?: CenterKey;
  channel?: [number, number];
  source?: GateActivation;
  planet?: string;
  side?: 'design' | 'personality';
};

function BodyGraph({ chart, blurred }: { chart: ChartData; blurred: boolean }) {
  const definedMap = new Map(chart.definedChannels.map((c) => [channelKey(c.gateA, c.gateB), c]));
  const personalityGateSet = new Set(chart.personalityData.map((p) => p.gate));
  const designGateSet = new Set(chart.designData.map((p) => p.gate));
  const designMap = new Map(chart.designData.map((p) => [p.planet, p]));
  const personalityMap = new Map(chart.personalityData.map((p) => [p.planet, p]));
  const [highlight, setHighlight] = useState<HighlightState | null>(null);

  const activationForGate = (gate: number): GateActivation => {
    const inP = personalityGateSet.has(gate);
    const inD = designGateSet.has(gate);
    if (inP && inD) return 'both';
    if (inP) return 'personality';
    if (inD) return 'design';
    return 'none';
  };

  const segmentColor = (activation: GateActivation) => {
    if (activation === 'design') return CHART_TOKENS.channelDesign;
    if (activation === 'personality') return CHART_TOKENS.channelPersonality;
    if (activation === 'both') return CHART_TOKENS.gateActiveBoth;
    return CHART_TOKENS.channelUndefined;
  };

  const hasHighlight = !!highlight;

  const highlightedSets = useMemo(() => {
    const gates = new Set<number>();
    const channels = new Set<string>();
    const centers = new Set<CenterKey>();

    if (!highlight) return { gates, channels, centers };

    const includeChannel = (a: number, b: number) => {
      const key = channelKey(a, b);
      if (definedMap.has(key)) channels.add(key);
      gates.add(a);
      gates.add(b);
      centers.add(GATE_TO_CENTER[a]);
      centers.add(GATE_TO_CENTER[b]);
    };

    if (highlight.gate) {
      gates.add(highlight.gate);
      centers.add(GATE_TO_CENTER[highlight.gate]);
      BODYGRAPH_CHANNELS.forEach(([a, b]) => {
        if (a === highlight.gate || b === highlight.gate) {
          includeChannel(a, b);
        }
      });
    }

    if (highlight.center) {
      centers.add(highlight.center);
      CENTER_GATES_BY_CENTER[highlight.center].forEach((gate) => gates.add(gate));
      BODYGRAPH_CHANNELS.forEach(([a, b]) => {
        const centerA = GATE_TO_CENTER[a];
        const centerB = GATE_TO_CENTER[b];
        if (centerA === highlight.center || centerB === highlight.center) {
          includeChannel(a, b);
        }
      });
    }

    if (highlight.channel) {
      includeChannel(highlight.channel[0], highlight.channel[1]);
    }

    return { gates, channels, centers };
  }, [highlight, definedMap]);

  const designRows = PLANET_ORDER.map((planet) => ({ planet, data: designMap.get(planet) }));
  const personalityRows = PLANET_ORDER.map((planet) => ({ planet, data: personalityMap.get(planet) }));

  const centerVisual = (centerKey: CenterKey) => {
    const center = chart.centers[centerKey];
    const emphasized = hasHighlight && highlightedSets.centers.has(centerKey);
    const faded = hasHighlight && !highlightedSets.centers.has(centerKey);
    return {
      fill: centerFill(centerKey, center),
      stroke: emphasized ? '#D4785A' : centerStroke(center),
      strokeWidth: emphasized ? 3.2 : center.defined ? 2.2 : 1.6,
      strokeDasharray: centerStrokeDash(center),
      opacity: faded ? 0.22 : 1,
      filter: emphasized ? 'url(#center-glow)' : undefined,
    };
  };

  return (
    <div
      className={`relative transition-all duration-700 ${blurred ? 'blur-[8px]' : 'blur-0'}`}
      onMouseLeave={() => setHighlight(null)}
    >
      <svg
        viewBox="0 0 860 820"
        className="w-full h-auto rounded-2xl"
        role="img"
        aria-label={`Human Design Bodygraph for ${chart.input.name}: ${chart.type} type, Profile ${chart.profile}, ${chart.authority} Authority.`}
      >
        <defs>
          <linearGradient id="chart-bg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#23252D" />
            <stop offset="30%" stopColor="#151820" />
            <stop offset="50%" stopColor="#0F1219" />
            <stop offset="70%" stopColor="#151820" />
            <stop offset="100%" stopColor="#22242D" />
          </linearGradient>
          <radialGradient id="chart-vignette" cx="50%" cy="20%" r="85%">
            <stop offset="0%" stopColor="#2A2F3F" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#090C12" stopOpacity="0.72" />
          </radialGradient>
          <pattern id="both-defined" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="4" height="8" fill={CHART_TOKENS.channelPersonality} />
            <rect x="4" width="4" height="8" fill={CHART_TOKENS.channelDesign} />
          </pattern>
          <filter id="center-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.2" floodColor="#D4785A" floodOpacity="0.5" />
          </filter>
          <filter id="channel-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor="#CDEAE1" floodOpacity="0.45" />
          </filter>
        </defs>

        <rect x="0" y="0" width="860" height="820" rx="20" fill="url(#chart-bg-grad)" />
        <rect x="0" y="0" width="860" height="820" rx="20" fill="url(#chart-vignette)" />

        <path
          d="M420 58 C456 94 463 138 456 176 C503 212 518 286 506 370 C594 420 632 528 652 662 C661 734 622 788 548 796 L292 796 C218 788 179 734 188 662 C208 528 246 420 334 370 C322 286 337 212 384 176 C377 138 384 94 420 58 Z"
          fill="#D7D9E2"
          opacity={hasHighlight ? 0.12 : 0.21}
        />

        <g>
          <text x="66" y="76" fill="#C6B79D" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" letterSpacing="2.2">
            DESIGN
          </text>
          <line x1="26" y1="86" x2="174" y2="86" stroke="#9CB7E8" strokeWidth="1.4" />
          {designRows.map(({ planet, data }, idx) => {
            const y = 110 + idx * 44;
            const isActive = highlight?.side === 'design' && highlight.planet === planet;
            return (
              <g
                key={`d-${planet}`}
                onMouseEnter={() => {
                  if (!data) return;
                  setHighlight({ gate: data.gate, source: 'design', planet, side: 'design' });
                }}
                style={{ cursor: data ? 'pointer' : 'default' }}
                opacity={hasHighlight && !isActive && highlight?.side === 'design' ? 0.45 : 1}
              >
                {isActive ? (
                  <rect x={18} y={y - 20} rx={10} ry={10} width={160} height={38} fill="#FFFFFF2A" />
                ) : null}
                <text x={30} y={y} fill="#D4785A" fontSize="15" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                  {data ? `${data.gate}.${data.line}` : '--'}
                </text>
                <text x={120} y={y} fill="#F1E7DB" fontSize="18" fontFamily="var(--font-sans)">
                  {PLANET_GLYPH[planet]}
                </text>
              </g>
            );
          })}
        </g>

        <g textAnchor="end">
          <text x="794" y="76" fill="#9ACEC2" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" letterSpacing="2.2">
            PERSONALITY
          </text>
          <line x1="686" y1="86" x2="834" y2="86" stroke="#9ACEC2" strokeWidth="1.4" />
          {personalityRows.map(({ planet, data }, idx) => {
            const y = 110 + idx * 44;
            const isActive = highlight?.side === 'personality' && highlight.planet === planet;
            return (
              <g
                key={`p-${planet}`}
                onMouseEnter={() => {
                  if (!data) return;
                  setHighlight({ gate: data.gate, source: 'personality', planet, side: 'personality' });
                }}
                style={{ cursor: data ? 'pointer' : 'default' }}
                opacity={hasHighlight && !isActive && highlight?.side === 'personality' ? 0.45 : 1}
              >
                {isActive ? (
                  <rect x={684} y={y - 20} rx={10} ry={10} width={160} height={38} fill="#FFFFFF2A" />
                ) : null}
                <text x={734} y={y} fill="#A5DACD" fontSize="15" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                  {data ? `${data.gate}.${data.line}` : '--'}
                </text>
                <text x={804} y={y} fill="#A5DACD" fontSize="18" fontFamily="var(--font-sans)">
                  {PLANET_GLYPH[planet]}
                </text>
              </g>
            );
          })}
        </g>

        {BODYGRAPH_CHANNELS.map(([a, b]) => {
          const key = channelKey(a, b);
          const hit = definedMap.get(key);
          const firstActivation = activationForGate(a);
          const secondActivation = activationForGate(b);
          const segments = getChannelSegments(a, b);
          const focused = !hasHighlight || highlightedSets.channels.has(key);
          const direct = !!(
            (highlight?.gate && (highlight.gate === a || highlight.gate === b)) ||
            (highlight?.channel && channelKey(highlight.channel[0], highlight.channel[1]) === key)
          );
          const channelOpacity = focused ? 1 : 0.12;

          if (!hit) {
            return (
              <path
                key={key}
                d={segments.full}
                fill="none"
                stroke={CHART_TOKENS.channelUndefined}
                strokeWidth={4}
                strokeLinecap="round"
                opacity={channelOpacity}
              />
            );
          }

          return (
            <g
              key={key}
              opacity={channelOpacity}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHighlight({ channel: [a, b] })}
            >
              <path d={segments.full} fill="none" stroke="#0A0D12" strokeWidth={13} strokeLinecap="round" />
              {direct ? (
                <path d={segments.full} fill="none" stroke="#CDEAE1" strokeWidth={16} strokeLinecap="round" opacity={0.28} filter="url(#channel-glow)" />
              ) : null}
              {firstActivation === 'both' ? (
                <path d={segments.first} fill="none" stroke="url(#both-defined)" strokeWidth={8.2} strokeLinecap="round" />
              ) : (
                <path d={segments.first} fill="none" stroke={segmentColor(firstActivation)} strokeWidth={8.2} strokeLinecap="round" />
              )}
              {secondActivation === 'both' ? (
                <path d={segments.second} fill="none" stroke="url(#both-defined)" strokeWidth={8.2} strokeLinecap="round" />
              ) : (
                <path d={segments.second} fill="none" stroke={segmentColor(secondActivation)} strokeWidth={8.2} strokeLinecap="round" />
              )}
            </g>
          );
        })}

        <g
          onMouseEnter={() => setHighlight({ center: 'HEAD' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('HEAD').opacity}
        >
          <polygon
            points="370,70 470,70 420,145"
            fill={centerVisual('HEAD').fill}
            stroke={centerVisual('HEAD').stroke}
            strokeWidth={centerVisual('HEAD').strokeWidth}
            strokeDasharray={centerVisual('HEAD').strokeDasharray}
            filter={centerVisual('HEAD').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'AJNA' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('AJNA').opacity}
        >
          <polygon
            points="370,190 470,190 420,115"
            fill={centerVisual('AJNA').fill}
            stroke={centerVisual('AJNA').stroke}
            strokeWidth={centerVisual('AJNA').strokeWidth}
            strokeDasharray={centerVisual('AJNA').strokeDasharray}
            filter={centerVisual('AJNA').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'THROAT' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('THROAT').opacity}
        >
          <rect
            x="375"
            y="245"
            width="90"
            height="90"
            rx="16"
            fill={centerVisual('THROAT').fill}
            stroke={centerVisual('THROAT').stroke}
            strokeWidth={centerVisual('THROAT').strokeWidth}
            strokeDasharray={centerVisual('THROAT').strokeDasharray}
            filter={centerVisual('THROAT').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'G' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('G').opacity}
        >
          <polygon
            points="420,352 470,412 420,478 370,412"
            fill={centerVisual('G').fill}
            stroke={centerVisual('G').stroke}
            strokeWidth={centerVisual('G').strokeWidth}
            strokeDasharray={centerVisual('G').strokeDasharray}
            filter={centerVisual('G').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'HEART' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('HEART').opacity}
        >
          <polygon
            points="475,383 535,383 505,450"
            fill={centerVisual('HEART').fill}
            stroke={centerVisual('HEART').stroke}
            strokeWidth={centerVisual('HEART').strokeWidth}
            strokeDasharray={centerVisual('HEART').strokeDasharray}
            filter={centerVisual('HEART').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'SACRAL' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('SACRAL').opacity}
        >
          <rect
            x="375"
            y="514"
            width="90"
            height="108"
            rx="16"
            fill={centerVisual('SACRAL').fill}
            stroke={centerVisual('SACRAL').stroke}
            strokeWidth={centerVisual('SACRAL').strokeWidth}
            strokeDasharray={centerVisual('SACRAL').strokeDasharray}
            filter={centerVisual('SACRAL').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'SOLAR_PLEXUS' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('SOLAR_PLEXUS').opacity}
        >
          <polygon
            points="500,501 565,501 532,578"
            fill={centerVisual('SOLAR_PLEXUS').fill}
            stroke={centerVisual('SOLAR_PLEXUS').stroke}
            strokeWidth={centerVisual('SOLAR_PLEXUS').strokeWidth}
            strokeDasharray={centerVisual('SOLAR_PLEXUS').strokeDasharray}
            filter={centerVisual('SOLAR_PLEXUS').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'SPLEEN' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('SPLEEN').opacity}
        >
          <polygon
            points="275,469 340,469 307,546"
            fill={centerVisual('SPLEEN').fill}
            stroke={centerVisual('SPLEEN').stroke}
            strokeWidth={centerVisual('SPLEEN').strokeWidth}
            strokeDasharray={centerVisual('SPLEEN').strokeDasharray}
            filter={centerVisual('SPLEEN').filter}
          />
        </g>
        <g
          onMouseEnter={() => setHighlight({ center: 'ROOT' })}
          style={{ cursor: 'pointer' }}
          opacity={centerVisual('ROOT').opacity}
        >
          <rect
            x="375"
            y="693"
            width="90"
            height="92"
            rx="12"
            fill={centerVisual('ROOT').fill}
            stroke={centerVisual('ROOT').stroke}
            strokeWidth={centerVisual('ROOT').strokeWidth}
            strokeDasharray={centerVisual('ROOT').strokeDasharray}
            filter={centerVisual('ROOT').filter}
          />
        </g>

        <g fill="#D8D1C4" fontSize="11" textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" opacity={hasHighlight ? 0.75 : 1}>
          <text x="420" y="112">HEAD</text>
          <text x="420" y="163">AJNA</text>
          <text x="420" y="292">THROAT</text>
          <text x="420" y="420">G</text>
          <text x="505" y="436">EGO</text>
          <text x="420" y="573">SACRAL</text>
          <text x="532" y="548">SP</text>
          <text x="307" y="515">SPLEEN</text>
          <text x="420" y="746">ROOT</text>
        </g>

        <g fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" textAnchor="middle">
          {Object.entries(GATE_COORDS).map(([gate, pos]) => {
            const gateNum = Number(gate);
            const activation = activationForGate(gateNum);
            const active = activation !== 'none';
            const focused = !hasHighlight || highlightedSets.gates.has(gateNum);
            const isPrimary = highlight?.gate === gateNum;
            const fill =
              activation === 'design'
                ? CHART_TOKENS.gateActiveDesign
                : activation === 'personality'
                  ? CHART_TOKENS.gateActivePersonality
                  : activation === 'both'
                    ? CHART_TOKENS.gateActiveBoth
                    : '#F6F2EA';
            const text = active ? '#F7F4EF' : '#B8A898';
            const stroke = active ? '#06080C' : '#CEC5B6';
            return (
              <g
                key={`gate-${gate}`}
                onMouseEnter={() => setHighlight({ gate: gateNum, source: activation })}
                style={{ cursor: 'pointer' }}
                opacity={focused ? 1 : 0.22}
              >
                {isPrimary ? (
                  <circle cx={pos.x} cy={pos.y} r={13.5} fill="none" stroke="#D4785A" strokeWidth={2.6} />
                ) : null}
                <circle cx={pos.x} cy={pos.y} r={active ? 10.8 : 8.5} fill={fill} stroke={stroke} strokeWidth={active ? 2.1 : 1.3} />
                <text x={pos.x} y={pos.y + 3} fill={text} fontWeight={active ? 700 : 500}>
                  {gate}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function Field({ label, children, helper }: { label: string; children: React.ReactNode; helper?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[12px] uppercase tracking-[0.08em] text-[#5A4F47] font-medium">{label}</label>
      {children}
      {helper ? <p className="text-[13px] text-[#8F7F6F]">{helper}</p> : null}
    </div>
  );
}

export default function ChartPage() {
  const [phase, setPhase] = useState<'form' | 'loading' | 'preview' | 'revealed'>('form');
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [chart, setChart] = useState<ChartData | null>(null);
  const [apiError, setApiError] = useState<string>('');

  const timezones = useMemo(() => {
    if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
      try {
        const intlWithSupported = Intl as unknown as { supportedValuesOf: (key: string) => string[] };
        return intlWithSupported.supportedValuesOf('timeZone');
      } catch {
        return fallbackTimezones;
      }
    }
    return fallbackTimezones;
  }, []);

  const validation = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!form.dateOfBirth) next.dateOfBirth = 'Date of birth is required.';
    if (!form.unknownBirthTime && !form.timeOfBirth) next.timeOfBirth = 'Time of birth is required or select unknown.';
    if (!form.location.trim()) next.location = 'Location is required.';
    if (!form.timezone.trim()) next.timezone = 'Timezone is required.';
    return next;
  }, [form]);

  const utcPreview = useMemo(() => {
    const hasDate = !!form.dateOfBirth;
    const hasTime = form.unknownBirthTime || !!form.timeOfBirth;
    if (!hasDate || !hasTime || !form.timezone) return '';

    const localTime = form.unknownBirthTime ? '12:00' : form.timeOfBirth;
    const dt = DateTime.fromISO(`${form.dateOfBirth}T${localTime}`, {
      zone: normalizeTimezone(form.timezone),
    });

    if (!dt.isValid) return '';
    return dt.toUTC().toFormat("dd LLL yyyy 'at' HH:mm 'UTC'");
  }, [form.dateOfBirth, form.timeOfBirth, form.unknownBirthTime, form.timezone]);

  const onCalculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setPhase('loading');

    try {
      const res = await fetch('/api/chart/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          birthDate: form.dateOfBirth,
          birthTime: form.timeOfBirth,
          timezone: normalizeTimezone(form.timezone),
          location: form.location,
          unknownBirthTime: form.unknownBirthTime,
        }),
      });

      const raw = await res.text();
      let payload: { error?: string; chart?: ChartData } = {};
      try {
        payload = raw ? (JSON.parse(raw) as { error?: string; chart?: ChartData }) : {};
      } catch {
        payload = {};
      }

      if (!res.ok) {
        throw new Error(payload?.error || raw || 'Failed to calculate chart.');
      }
      if (!payload?.chart) {
        throw new Error('Chart service returned an empty response.');
      }

      setChart(payload.chart);
      window.setTimeout(() => setPhase('preview'), 900);
    } catch (error) {
      setPhase('form');
      setApiError(error instanceof Error ? error.message : 'Failed to calculate chart.');
    }
  };

  const onReveal = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email.' }));
      return;
    }
    setErrors((prev) => ({ ...prev, email: undefined }));
    setPhase('revealed');
  };

  const onDownload = () => {
    if (!chart) return;

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.setFillColor(245, 240, 232);
    doc.rect(0, 0, 595, 842, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(26, 23, 20);
    doc.text('Human Design Chart', 50, 90);

    doc.setFont('times', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(90, 79, 71);
    doc.text(`Name: ${chart.input.name}`, 50, 130);
    doc.text(`Birth: ${chart.input.birthDate} ${chart.input.birthTime} (${chart.input.timezone})`, 50, 152);
    doc.text(`Location: ${chart.input.location}`, 50, 174);

    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(26, 23, 20);
    doc.text(`${chart.type} · ${chart.profile}`, 50, 230);

    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.text(`Authority: ${chart.authority}`, 50, 262);
    doc.text(`Strategy: ${chart.strategy}`, 50, 286);
    doc.text(`Definition: ${chart.definition}`, 50, 310);
    doc.text(`Signature / Not-Self: ${chart.signature} / ${chart.notSelfTheme}`, 50, 334);

    doc.setFontSize(12);
    doc.setTextColor(44, 44, 44);
    const channels = chart.definedChannels.map((ch) => `${ch.gateA}-${ch.gateB} ${ch.name}`).join('  •  ');
    const wrapped = doc.splitTextToSize(`Defined Channels: ${channels || 'None'}`, 495);
    doc.text(wrapped, 50, 374);

    doc.setFont('times', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(90, 79, 71);
    doc.text('Understanding your design is one thing. Living it is another.', 50, 780);
    doc.text('Book a personal chart reading with Dirk: https://dirk.respira.cafe/sessions#chart-analysis', 50, 800);

    const safe = chart.input.name.toLowerCase().replace(/\s+/g, '-');
    doc.save(`${safe || 'human-design'}-chart.pdf`);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#1A1714]">
      <Navigation />

      <section className="pt-36 pb-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto bg-[#F5F0E8] border border-[#D4C9B8] rounded-xl p-6 md:p-8">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[#5A4F47] mb-4">Get Your Chart</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-5">Human Design Bodygraph</h1>
            <blockquote className="italic text-[#5A4F47] leading-relaxed mb-8">
              "Your birth data is the starting point for understanding your energetic design. Enter your details below to generate your unique Human Design chart."
            </blockquote>

            <form onSubmit={onCalculate} className="space-y-5">
              <Field label="Full Name" helper="Your name will appear on your chart.">
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-[52px] w-full rounded-md border border-[#D4C9B8] bg-white px-4 text-[16px] focus:outline-none focus:border-[#C8643C] focus:shadow-[0_0_0_3px_rgba(200,100,60,0.15)]"
                  placeholder="Your full name"
                />
                {errors.name ? <p className="text-sm text-[#A84E2C]">{errors.name}</p> : null}
              </Field>

              <Field label="Date of Birth" helper="Even a day's difference can shift your chart.">
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => setForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  max={new Date().toISOString().split('T')[0]}
                  className="h-[52px] w-full rounded-md border border-[#D4C9B8] bg-white px-4 text-[16px] focus:outline-none focus:border-[#C8643C] focus:shadow-[0_0_0_3px_rgba(200,100,60,0.15)]"
                />
                {errors.dateOfBirth ? <p className="text-sm text-[#A84E2C]">{errors.dateOfBirth}</p> : null}
              </Field>

              <Field label="Time of Birth" helper="Exact time matters for your Authority and Centers. Check your birth certificate if unsure.">
                <div className="space-y-3">
                  <input
                    type="time"
                    disabled={form.unknownBirthTime}
                    value={form.timeOfBirth}
                    onChange={(e) => setForm((prev) => ({ ...prev, timeOfBirth: e.target.value }))}
                    className="h-[52px] w-full rounded-md border border-[#D4C9B8] bg-white px-4 text-[16px] focus:outline-none focus:border-[#C8643C] focus:shadow-[0_0_0_3px_rgba(200,100,60,0.15)] disabled:bg-[#EFE7DB] disabled:text-[#8A7B72]"
                  />
                  <label className="flex items-center gap-3 text-[14px] text-[#5A4F47]">
                    <input
                      type="checkbox"
                      checked={form.unknownBirthTime}
                      onChange={(e) => setForm((prev) => ({ ...prev, unknownBirthTime: e.target.checked }))}
                      className="h-4 w-4 rounded border-[#D4C9B8]"
                    />
                    I don't know my birth time
                  </label>
                </div>
                {errors.timeOfBirth ? <p className="text-sm text-[#A84E2C]">{errors.timeOfBirth}</p> : null}
              </Field>

              <Field label="Timezone" helper="Required for accurate universal time conversion.">
                <select
                  value={form.timezone}
                  onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
                  className="h-[52px] w-full rounded-md border border-[#D4C9B8] bg-white px-4 text-[16px] focus:outline-none focus:border-[#C8643C] focus:shadow-[0_0_0_3px_rgba(200,100,60,0.15)]"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
                {utcPreview ? (
                  <p className="text-[13px] text-[#5A4F47]">
                    UTC preview: <span className="font-medium">{utcPreview}</span>
                  </p>
                ) : null}
                {errors.timezone ? <p className="text-sm text-[#A84E2C]">{errors.timezone}</p> : null}
              </Field>

              <Field label="Location of Birth" helper="City and country is enough.">
                <input
                  value={form.location}
                  onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  className="h-[52px] w-full rounded-md border border-[#D4C9B8] bg-white px-4 text-[16px] focus:outline-none focus:border-[#C8643C] focus:shadow-[0_0_0_3px_rgba(200,100,60,0.15)]"
                  placeholder="City, Country"
                />
                {errors.location ? <p className="text-sm text-[#A84E2C]">{errors.location}</p> : null}
              </Field>

              {form.unknownBirthTime ? (
                <p className="text-[13px] leading-relaxed text-[#7A5D4C] bg-[#FFF8F5] border border-[#F0C4A8] rounded-md p-3">
                  Without an exact birth time, your Authority and some Centers may be inaccurate. Consider requesting your birth certificate for a full reading.
                </p>
              ) : null}

              {apiError ? <p className="text-sm text-[#A84E2C]">{apiError}</p> : null}

              <button type="submit" className="h-[54px] w-full rounded-md bg-[#C8643C] text-white text-[15px] tracking-[0.05em] hover:bg-[#B95733] transition-colors">
                Generate My Chart →
              </button>
              <p className="text-[12px] text-center text-[#8A7B72]">
                We calculate your chart in real time and do not store your birth data on our servers.
              </p>
            </form>
        </div>
      </section>

      <section className="pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#101319] border border-[#2B2F38] rounded-2xl p-4 md:p-6 relative overflow-hidden">
            <div className="mb-6">
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#9DA7B8]">Preview</p>
              <h2 className="font-serif text-3xl mt-1 text-white">{chart ? `${chart.type} · ${chart.profile}` : 'Your Type · Your Profile'}</h2>
              <p className="text-[#C9D2E3] mt-2">Authority: {chart?.authority ?? 'Pending calculation'}</p>
            </div>

            {phase === 'loading' ? (
              <div className="h-[760px] flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.8] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[160px] h-[160px] border-2 border-[#C8643C] rounded-full border-dashed"
                />
                <p className="mt-6 text-[#C9D2E3]">Calculating your chart...</p>
              </div>
            ) : chart ? (
              <>
                <BodyGraph chart={chart} blurred={phase === 'preview'} />

                {phase === 'preview' ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6 bg-[#F5F0E8]/55">
                    <div className="w-full max-w-[420px] bg-white rounded-xl border border-[#D4C9B8] p-6 shadow-2xl">
                      <p className="text-[22px] leading-tight text-[#1A1714] mb-3 font-serif italic">Your chart is ready.</p>
                      <p className="text-[15px] text-[#5A4F47] mb-6">Enter your email to reveal your Human Design and unlock a downloadable PDF.</p>
                      <input
                        value={form.email}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full h-[52px] border border-[#D4C9B8] rounded-md px-4 text-[16px] mb-3"
                      />
                      {errors.email ? <p className="text-sm text-[#A84E2C] mb-3">{errors.email}</p> : null}
                      <button
                        onClick={onReveal}
                        className="w-full h-[52px] bg-[#C8643C] text-white rounded-md text-[15px] tracking-[0.05em] hover:bg-[#B95733] transition-colors"
                      >
                        Reveal My Chart →
                      </button>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="h-[760px] flex items-center justify-center text-[#A9B3C7]">Generate your chart to see the bodygraph preview.</div>
            )}
          </div>
        </div>
      </section>

      {phase === 'revealed' && chart ? (
        <section className="pb-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="rounded-2xl p-6 md:p-10 text-[#ECE7DD] bg-[radial-gradient(circle_at_top_left,_#383838_0%,_#1F1F23_45%,_#17171A_100%)] border border-white/10">
              <div className="flex items-center gap-3 text-[#C9B7A0]">
                <Clock3 className="h-5 w-5" />
                <p className="text-sm tracking-wide uppercase">Birth Data (UTC)</p>
              </div>
              <p className="mt-2 text-3xl font-semibold font-sans">{chart.input.birthUtc}</p>

              <h3 className="mt-10 text-4xl font-serif">Foundational Properties</h3>

              <div className="mt-8 grid md:grid-cols-3 gap-8">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Type</p>
                      <p className="text-5xl font-semibold text-white">{chart.type}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Target className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Signature</p>
                      <p className="text-5xl font-semibold text-white">{chart.signature}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Orbit className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Profile</p>
                      <p className="text-5xl font-semibold text-white">{chart.profile}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Footprints className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Strategy</p>
                      <p className="text-5xl font-semibold text-white">{chart.strategy}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Waypoints className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Definition</p>
                      <p className="text-5xl font-semibold text-white">{chart.definition}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Compass className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Incarnation Cross</p>
                      <p className="text-3xl font-semibold text-white">{chart.incarnationCross.name}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Frown className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Not-Self Theme</p>
                      <p className="text-5xl font-semibold text-white">{chart.notSelfTheme}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Compass className="h-8 w-8 mt-1 text-[#F2E9DB]" />
                    <div>
                      <p className="text-[#B5AA98] text-2xl">Authority</p>
                      <p className="text-5xl font-semibold text-white">{chart.authority}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#D4C9B8] rounded-xl p-6 md:p-8">
              <p className="font-serif text-[36px] leading-tight text-[#2B2218]">You are a {chart.type} · Profile {chart.profile}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6 text-[#5A4F47]">
                <p><strong className="text-[#1A1714] font-medium">Strategy:</strong> {chart.strategy}</p>
                <p><strong className="text-[#1A1714] font-medium">Authority:</strong> {chart.authority}</p>
                <p><strong className="text-[#1A1714] font-medium">Definition:</strong> {chart.definition}</p>
                <p><strong className="text-[#1A1714] font-medium">Not-Self Theme:</strong> {chart.notSelfTheme}</p>
                <p><strong className="text-[#1A1714] font-medium">Signature:</strong> {chart.signature}</p>
                <p><strong className="text-[#1A1714] font-medium">Incarnation Cross:</strong> {chart.incarnationCross.name}</p>
              </div>

              <div className="mt-8">
                <p className="text-[12px] uppercase tracking-[0.12em] text-[#5A4F47] mb-3">Defined Channels</p>
                <div className="flex flex-wrap gap-2">
                  {chart.definedChannels.map((ch) => (
                    <span key={`${ch.gateA}-${ch.gateB}`} className="px-3 py-1.5 rounded-full text-sm bg-[#F5F0E8] border border-[#D4C9B8] text-[#2B2218]">
                      {ch.gateA}-{ch.gateB} · {ch.name}
                    </span>
                  ))}
                </div>
              </div>

              <button onClick={onDownload} className="mt-8 h-[52px] px-7 rounded-md bg-[#2A2218] text-white text-sm tracking-[0.06em] hover:bg-black transition-colors">
                Download Your Chart →
              </button>
            </div>

            <div className="bg-[#F5F0E8] border border-[#D4C9B8] rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image src="/images/dirk-3.jpg" alt="Dirk Nellens" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div>
                <h3 className="font-serif text-3xl leading-tight mb-4">Now integrate your {chart.type} design in real life</h3>
                <blockquote className="italic text-[#5A4F47] leading-relaxed mb-5">
                  "Understanding your design is one thing. Living it is another. A personal reading with Dirk integrates therapeutic and meditative pathways with your chart — giving you not just knowledge, but a felt sense of who you are."
                </blockquote>
                <Link href="/sessions#chart-analysis" className="inline-flex h-[50px] items-center px-6 rounded-md bg-[#C8643C] text-white tracking-[0.05em] hover:bg-[#B95733] transition-colors">
                  Book a Session with Dirk
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
