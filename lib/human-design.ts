import sweph from 'sweph';
import { DateTime } from 'luxon';

export type HdType = 'Generator' | 'Manifesting Generator' | 'Projector' | 'Manifestor' | 'Reflector';
export type HdAuthority = 'Sacral' | 'Emotional' | 'Splenic' | 'Ego' | 'Self-Projected' | 'Mental' | 'Lunar';

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

type PlanetActivation = { planet: string; gate: number; line: number; longitude: number };

const C = sweph.constants;
const SWISS_FLAGS = C.SEFLG_SWIEPH | C.SEFLG_SPEED;
const MOSEPH_FLAGS = C.SEFLG_MOSEPH | C.SEFLG_SPEED;

const GATE_ORDER = [41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60] as const;
// Human Design mandala starts at Gate 41 around 2° Aquarius (tropical zodiac).
// Using 0° Aries as the start causes type/profile drift.
const HD_MANDALA_START_DEG = 302;

const CENTER_GATES: Record<CenterKey, number[]> = {
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

const CHANNELS: Array<{ gateA: number; gateB: number; centerA: CenterKey; centerB: CenterKey; name: string }> = [
  { gateA: 64, gateB: 47, centerA: 'HEAD', centerB: 'AJNA', name: 'Abstraction' },
  { gateA: 61, gateB: 24, centerA: 'HEAD', centerB: 'AJNA', name: 'Awareness' },
  { gateA: 63, gateB: 4, centerA: 'HEAD', centerB: 'AJNA', name: 'Logic' },
  { gateA: 17, gateB: 62, centerA: 'AJNA', centerB: 'THROAT', name: 'Acceptance' },
  { gateA: 43, gateB: 23, centerA: 'AJNA', centerB: 'THROAT', name: 'Structuring' },
  { gateA: 11, gateB: 56, centerA: 'AJNA', centerB: 'THROAT', name: 'Curiosity' },
  { gateA: 16, gateB: 48, centerA: 'THROAT', centerB: 'SPLEEN', name: 'Wavelength' },
  { gateA: 20, gateB: 57, centerA: 'THROAT', centerB: 'SPLEEN', name: 'Brainwave' },
  { gateA: 31, gateB: 7, centerA: 'THROAT', centerB: 'G', name: 'Alpha' },
  { gateA: 8, gateB: 1, centerA: 'THROAT', centerB: 'G', name: 'Inspiration' },
  { gateA: 33, gateB: 13, centerA: 'THROAT', centerB: 'G', name: 'Prodigal' },
  { gateA: 35, gateB: 36, centerA: 'THROAT', centerB: 'SOLAR_PLEXUS', name: 'Transitoriness' },
  { gateA: 12, gateB: 22, centerA: 'THROAT', centerB: 'SOLAR_PLEXUS', name: 'Openness' },
  { gateA: 45, gateB: 21, centerA: 'THROAT', centerB: 'HEART', name: 'Money Line' },
  { gateA: 10, gateB: 20, centerA: 'G', centerB: 'THROAT', name: 'Awakening' },
  { gateA: 10, gateB: 57, centerA: 'G', centerB: 'SPLEEN', name: 'Perfected Form' },
  { gateA: 25, gateB: 51, centerA: 'G', centerB: 'HEART', name: 'Initiation' },
  { gateA: 46, gateB: 29, centerA: 'G', centerB: 'SACRAL', name: 'Discovery' },
  { gateA: 2, gateB: 14, centerA: 'G', centerB: 'SACRAL', name: 'The Beat' },
  { gateA: 15, gateB: 5, centerA: 'G', centerB: 'SACRAL', name: 'Rhythm' },
  { gateA: 44, gateB: 26, centerA: 'SPLEEN', centerB: 'HEART', name: 'Surrender' },
  { gateA: 50, gateB: 27, centerA: 'SPLEEN', centerB: 'SACRAL', name: 'Preservation' },
  { gateA: 32, gateB: 54, centerA: 'SPLEEN', centerB: 'ROOT', name: 'Transformation' },
  { gateA: 28, gateB: 38, centerA: 'SPLEEN', centerB: 'ROOT', name: 'Struggle' },
  { gateA: 18, gateB: 58, centerA: 'SPLEEN', centerB: 'ROOT', name: 'Judgment' },
  { gateA: 57, gateB: 34, centerA: 'SPLEEN', centerB: 'SACRAL', name: 'Power' },
  { gateA: 59, gateB: 6, centerA: 'SACRAL', centerB: 'SOLAR_PLEXUS', name: 'Mating' },
  { gateA: 34, gateB: 20, centerA: 'SACRAL', centerB: 'THROAT', name: 'Charisma' },
  { gateA: 9, gateB: 52, centerA: 'SACRAL', centerB: 'ROOT', name: 'Concentration' },
  { gateA: 3, gateB: 60, centerA: 'SACRAL', centerB: 'ROOT', name: 'Mutation' },
  { gateA: 42, gateB: 53, centerA: 'SACRAL', centerB: 'ROOT', name: 'Maturation' },
  { gateA: 37, gateB: 40, centerA: 'SOLAR_PLEXUS', centerB: 'HEART', name: 'Community' },
  { gateA: 30, gateB: 41, centerA: 'SOLAR_PLEXUS', centerB: 'ROOT', name: 'Recognition' },
  { gateA: 55, gateB: 39, centerA: 'SOLAR_PLEXUS', centerB: 'ROOT', name: 'Emoting' },
  { gateA: 49, gateB: 19, centerA: 'SOLAR_PLEXUS', centerB: 'ROOT', name: 'Synthesis' },
  { gateA: 21, gateB: 45, centerA: 'HEART', centerB: 'THROAT', name: 'Money Line' },
];

function normalizeTimezone(input: string): string {
  return input.trim().replace(/\s*\/\s*/g, '/').replace(/\s+/g, '_');
}

function mod360(x: number): number {
  const m = x % 360;
  return m < 0 ? m + 360 : m;
}

function longitudeToGateLine(longitude: number): { gate: number; line: number } {
  const normalized = mod360(longitude - HD_MANDALA_START_DEG);
  const gateArc = 360 / 64;
  const lineArc = gateArc / 6;
  const gateIndex = Math.floor(normalized / gateArc) % 64;
  const withinGate = normalized - gateIndex * gateArc;
  const line = Math.min(6, Math.floor(withinGate / lineArc) + 1);
  return { gate: GATE_ORDER[gateIndex], line };
}

function jdFromUtc(utcDate: Date): number {
  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();
  const hour = utcDate.getUTCHours() + utcDate.getUTCMinutes() / 60 + utcDate.getUTCSeconds() / 3600 + utcDate.getUTCMilliseconds() / 3600000;
  return sweph.julday(year, month, day, hour, C.SE_GREG_CAL);
}

function calcLongitudeUT(jdUt: number, planetId: number): number {
  let result = sweph.calc_ut(jdUt, planetId, SWISS_FLAGS);
  if (result.flag === C.ERR) {
    result = sweph.calc_ut(jdUt, planetId, MOSEPH_FLAGS);
  }
  if (result.flag === C.ERR) {
    throw new Error(result.error || `Swiss Ephemeris failed for planet id ${planetId}`);
  }
  return mod360(result.data[0]);
}

function buildPlanetActivationsFromJd(jdUt: number): PlanetActivation[] {
  const sunLon = calcLongitudeUT(jdUt, C.SE_SUN);
  const northNodeLon = calcLongitudeUT(jdUt, C.SE_TRUE_NODE);

  const planets: Array<{ name: string; lon: number }> = [
    { name: 'Sun', lon: sunLon },
    { name: 'Earth', lon: mod360(sunLon + 180) },
    { name: 'Moon', lon: calcLongitudeUT(jdUt, C.SE_MOON) },
    { name: 'North Node', lon: northNodeLon },
    { name: 'South Node', lon: mod360(northNodeLon + 180) },
    { name: 'Mercury', lon: calcLongitudeUT(jdUt, C.SE_MERCURY) },
    { name: 'Venus', lon: calcLongitudeUT(jdUt, C.SE_VENUS) },
    { name: 'Mars', lon: calcLongitudeUT(jdUt, C.SE_MARS) },
    { name: 'Jupiter', lon: calcLongitudeUT(jdUt, C.SE_JUPITER) },
    { name: 'Saturn', lon: calcLongitudeUT(jdUt, C.SE_SATURN) },
    { name: 'Uranus', lon: calcLongitudeUT(jdUt, C.SE_URANUS) },
    { name: 'Neptune', lon: calcLongitudeUT(jdUt, C.SE_NEPTUNE) },
    { name: 'Pluto', lon: calcLongitudeUT(jdUt, C.SE_PLUTO) },
  ];

  return planets.map(({ name, lon }) => {
    const mapped = longitudeToGateLine(lon);
    return { planet: name, longitude: lon, gate: mapped.gate, line: mapped.line };
  });
}

function deriveDefinitionFromCenters(
  definedCenters: Set<CenterKey>,
  definedChannels: Array<{ centerA: CenterKey; centerB: CenterKey }>,
): 'Single' | 'Split' | 'Triple-Split' | 'Quadruple-Split' | 'None' {
  if (definedCenters.size === 0) return 'None';

  const adjacency = new Map<CenterKey, Set<CenterKey>>();
  definedCenters.forEach((center) => adjacency.set(center, new Set()));
  definedChannels.forEach((ch) => {
    adjacency.get(ch.centerA)?.add(ch.centerB);
    adjacency.get(ch.centerB)?.add(ch.centerA);
  });

  const visited = new Set<CenterKey>();
  let components = 0;

  for (const center of definedCenters) {
    if (visited.has(center)) continue;
    components += 1;
    const stack = [center];
    while (stack.length > 0) {
      const node = stack.pop() as CenterKey;
      if (visited.has(node)) continue;
      visited.add(node);
      adjacency.get(node)?.forEach((n) => {
        if (!visited.has(n)) stack.push(n);
      });
    }
  }

  if (components <= 1) return 'Single';
  if (components === 2) return 'Split';
  if (components === 3) return 'Triple-Split';
  return 'Quadruple-Split';
}

function deriveTypeAndAuthority(definedCenters: Set<CenterKey>, motorToThroat: boolean): { type: HdType; authority: HdAuthority; strategy: string; signature: string; notSelfTheme: string } {
  const sacral = definedCenters.has('SACRAL');
  const solar = definedCenters.has('SOLAR_PLEXUS');
  const spleen = definedCenters.has('SPLEEN');
  const heart = definedCenters.has('HEART');
  const g = definedCenters.has('G');
  const throat = definedCenters.has('THROAT');

  const authority: HdAuthority = solar
    ? 'Emotional'
    : sacral
      ? 'Sacral'
      : spleen
        ? 'Splenic'
        : heart
          ? 'Ego'
          : g && throat
            ? 'Self-Projected'
            : definedCenters.size === 0
              ? 'Lunar'
              : 'Mental';

  if (definedCenters.size === 0) {
    return { type: 'Reflector', authority, strategy: 'Wait 28 days', signature: 'Surprise', notSelfTheme: 'Disappointment' };
  }

  if (sacral && motorToThroat) {
    return { type: 'Manifesting Generator', authority, strategy: 'Respond, then inform', signature: 'Satisfaction', notSelfTheme: 'Frustration' };
  }

  if (sacral) {
    return { type: 'Generator', authority, strategy: 'Respond', signature: 'Satisfaction', notSelfTheme: 'Frustration' };
  }

  if (motorToThroat) {
    return { type: 'Manifestor', authority, strategy: 'Inform', signature: 'Peace', notSelfTheme: 'Anger' };
  }

  return { type: 'Projector', authority, strategy: 'Wait for invitation', signature: 'Success', notSelfTheme: 'Bitterness' };
}

export function calculateChart(input: { name: string; birthDate: string; birthTime: string; timezone: string; location: string; unknownBirthTime?: boolean }) {
  const birthTime = input.unknownBirthTime ? '12:00' : input.birthTime;
  const normalizedTimezone = normalizeTimezone(input.timezone);
  const dt = DateTime.fromISO(`${input.birthDate}T${birthTime}`, { zone: normalizedTimezone });
  if (!dt.isValid) {
    throw new Error('Invalid date/time/timezone combination.');
  }

  const birthUtc = dt.toUTC().toJSDate();
  const jdBirth = jdFromUtc(birthUtc);
  const sunLonBirth = calcLongitudeUT(jdBirth, C.SE_SUN);
  const targetDesignSunLon = mod360(sunLonBirth - 88);

  const designStart = jdBirth - 110;
  let cross = sweph.solcross_ut(targetDesignSunLon, designStart, SWISS_FLAGS);
  if (!(cross.date > designStart && cross.date < jdBirth)) {
    cross = sweph.solcross_ut(targetDesignSunLon, designStart, MOSEPH_FLAGS);
  }
  const jdDesign = cross.date;

  if (!(jdDesign > designStart && jdDesign < jdBirth)) {
    throw new Error(cross.error || 'Unable to compute design date from Swiss Ephemeris solar crossing.');
  }

  const personalityData = buildPlanetActivationsFromJd(jdBirth);
  const designData = buildPlanetActivationsFromJd(jdDesign);

  const personalityGates = new Set(personalityData.map((p) => p.gate));
  const designGates = new Set(designData.map((p) => p.gate));
  const allGates = new Set<number>([...personalityGates, ...designGates]);

  const definedChannels = CHANNELS.filter((ch) => allGates.has(ch.gateA) && allGates.has(ch.gateB)).map((ch) => {
    const inPersonality = personalityGates.has(ch.gateA) && personalityGates.has(ch.gateB);
    const inDesign = designGates.has(ch.gateA) && designGates.has(ch.gateB);
    return {
      gateA: ch.gateA,
      gateB: ch.gateB,
      name: ch.name,
      definedBy: inPersonality && inDesign ? 'both' : inDesign ? 'design' : 'personality',
      centerA: ch.centerA,
      centerB: ch.centerB,
    };
  });

  const definedCenters = new Set<CenterKey>();
  definedChannels.forEach((ch) => {
    definedCenters.add(ch.centerA);
    definedCenters.add(ch.centerB);
  });

  const centers = (Object.keys(CENTER_GATES) as CenterKey[]).reduce(
    (acc, center) => {
      const activeGates = CENTER_GATES[center].filter((g) => allGates.has(g));
      const fromPersonality = activeGates.some((g) => personalityGates.has(g));
      const fromDesign = activeGates.some((g) => designGates.has(g));
      acc[center] = {
        defined: definedCenters.has(center),
        open: activeGates.length === 0,
        activatedGates: activeGates,
        definedBy: definedCenters.has(center) ? (fromPersonality && fromDesign ? 'both' : fromDesign ? 'design' : 'personality') : null,
      };
      return acc;
    },
    {} as Record<CenterKey, { defined: boolean; open: boolean; definedBy: 'personality' | 'design' | 'both' | null; activatedGates: number[] }>,
  );

  const motorCenters: CenterKey[] = ['HEART', 'SACRAL', 'SOLAR_PLEXUS', 'ROOT'];
  const motorToThroat = definedChannels.some((ch) => {
    if (ch.centerA === 'THROAT' && motorCenters.includes(ch.centerB)) return true;
    if (ch.centerB === 'THROAT' && motorCenters.includes(ch.centerA)) return true;
    return false;
  });

  const typing = deriveTypeAndAuthority(definedCenters, motorToThroat);
  const profile = `${personalityData.find((p) => p.planet === 'Sun')?.line ?? 1}/${designData.find((p) => p.planet === 'Sun')?.line ?? 3}`;

  return {
    input: {
      name: input.name,
      location: input.location,
      birthDate: input.birthDate,
      birthTime,
      birthUtc: birthUtc.toISOString().slice(0, 16).replace('T', ' '),
      timezone: normalizedTimezone,
      unknownBirthTime: !!input.unknownBirthTime,
    },
    type: typing.type,
    authority: typing.authority,
    profile,
    definition: deriveDefinitionFromCenters(definedCenters, definedChannels),
    strategy: typing.strategy,
    notSelfTheme: typing.notSelfTheme,
    signature: typing.signature,
    incarnationCross: {
      name: `Cross from gates ${personalityData[0]?.gate ?? ''}/${personalityData[1]?.gate ?? ''} · ${designData[0]?.gate ?? ''}/${designData[1]?.gate ?? ''}`,
      gates: [
        personalityData.find((p) => p.planet === 'Sun')?.gate ?? 0,
        personalityData.find((p) => p.planet === 'Earth')?.gate ?? 0,
        designData.find((p) => p.planet === 'Sun')?.gate ?? 0,
        designData.find((p) => p.planet === 'Earth')?.gate ?? 0,
      ] as [number, number, number, number],
    },
    centers,
    definedChannels: definedChannels.map(({ centerA, centerB, ...rest }) => rest),
    personalityData,
    designData,
  };
}
