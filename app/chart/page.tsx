'use client';

import { FormEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
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
    timezone: string;
    unknownBirthTime: boolean;
  };
  type: 'Generator' | 'Manifesting Generator' | 'Projector' | 'Manifestor' | 'Reflector';
  authority: 'Sacral' | 'Emotional' | 'Splenic' | 'Ego' | 'Self-Projected' | 'Mental' | 'Lunar';
  profile: string;
  definition: 'Single' | 'None';
  strategy: string;
  notSelfTheme: string;
  signature: string;
  incarnationCross: { name: string; gates: [number, number, number, number] };
  centers: Record<CenterKey, CenterState>;
  definedChannels: Array<{ gateA: number; gateB: number; name: string; definedBy: 'personality' | 'design' | 'both' }>;
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

function centerFill(center: CenterState): string {
  if (!center.defined) return '#FFFFFF';
  if (center.definedBy === 'design') return '#C8643C';
  if (center.definedBy === 'personality') return '#2A2218';
  return 'url(#both-defined)';
}

function BodyGraph({ chart, blurred }: { chart: ChartData; blurred: boolean }) {
  const channels = [
    { key: '43-23', x1: 300, y1: 198, x2: 300, y2: 220, gates: [43, 23] },
    { key: '34-20', x1: 300, y1: 430, x2: 300, y2: 300, gates: [34, 20] },
    { key: '9-52', x1: 300, y1: 520, x2: 300, y2: 570, gates: [9, 52] },
    { key: '10-20', x1: 300, y1: 315, x2: 300, y2: 305, gates: [10, 20] },
  ];

  const definedMap = new Map(chart.definedChannels.map((c) => [`${c.gateA}-${c.gateB}`, c]));

  return (
    <div className={`relative transition-all duration-700 ${blurred ? 'blur-[8px]' : 'blur-0'}`}>
      <svg viewBox="0 0 600 780" className="w-full h-auto" role="img" aria-label={`Human Design Bodygraph for ${chart.input.name}: ${chart.type} type, Profile ${chart.profile}, ${chart.authority} Authority.`}>
        <defs>
          <pattern id="both-defined" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="4" height="8" fill="#2A2218" />
            <rect x="4" width="4" height="8" fill="#C8643C" />
          </pattern>
        </defs>

        {channels.map((channel) => {
          const hit = definedMap.get(`${channel.gates[0]}-${channel.gates[1]}`) || definedMap.get(`${channel.gates[1]}-${channel.gates[0]}`);
          const color = hit?.definedBy === 'design' ? '#C8643C' : hit?.definedBy === 'personality' ? '#2A2218' : hit?.definedBy === 'both' ? '#2A2218' : '#D4C9B8';
          const strokeWidth = hit ? 12 : 4;
          return <line key={channel.key} x1={channel.x1} y1={channel.y1} x2={channel.x2} y2={channel.y2} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />;
        })}

        <polygon points="250,20 350,20 300,100" fill={centerFill(chart.centers.HEAD)} stroke="#D4C9B8" strokeWidth="2" />
        <polygon points="250,200 350,200 300,120" fill={centerFill(chart.centers.AJNA)} stroke="#D4C9B8" strokeWidth="2" />
        <rect x="260" y="220" width="80" height="80" fill={centerFill(chart.centers.THROAT)} stroke="#D4C9B8" strokeWidth="2" />
        <polygon points="300,315 345,360 300,405 255,360" fill={centerFill(chart.centers.G)} stroke="#D4C9B8" strokeWidth="2" />
        <polygon points="355,312 425,312 390,368" fill={centerFill(chart.centers.HEART)} stroke="#D4C9B8" strokeWidth="2" />
        <rect x="250" y="440" width="100" height="80" fill={centerFill(chart.centers.SACRAL)} stroke="#D4C9B8" strokeWidth="2" />
        <polygon points="385,424 475,424 430,496" fill={centerFill(chart.centers.SOLAR_PLEXUS)} stroke="#D4C9B8" strokeWidth="2" />
        <polygon points="125,404 215,404 170,476" fill={centerFill(chart.centers.SPLEEN)} stroke="#D4C9B8" strokeWidth="2" />
        <rect x="250" y="570" width="100" height="60" fill={centerFill(chart.centers.ROOT)} stroke="#D4C9B8" strokeWidth="2" />
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
          timezone: form.timezone,
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

      <section className="pt-36 pb-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
          <div className="bg-[#F5F0E8] border border-[#D4C9B8] rounded-xl p-6 md:p-8">
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
                <input
                  list="timezone-options"
                  value={form.timezone}
                  onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
                  className="h-[52px] w-full rounded-md border border-[#D4C9B8] bg-white px-4 text-[16px] focus:outline-none focus:border-[#C8643C] focus:shadow-[0_0_0_3px_rgba(200,100,60,0.15)]"
                  placeholder="e.g. Europe/Brussels"
                />
                <datalist id="timezone-options">
                  {timezones.map((tz) => (
                    <option key={tz} value={tz} />
                  ))}
                </datalist>
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

          <div className="space-y-5">
            <div className="bg-white border border-[#D4C9B8] rounded-xl p-6 md:p-8 relative overflow-hidden">
              <div className="mb-6">
                <p className="text-[12px] uppercase tracking-[0.14em] text-[#5A4F47]">Preview</p>
                <h2 className="font-serif text-3xl mt-1">{chart ? `${chart.type} · ${chart.profile}` : 'Your Type · Your Profile'}</h2>
                <p className="text-[#5A4F47] mt-2">Authority: {chart?.authority ?? 'Pending calculation'}</p>
              </div>

              {phase === 'loading' ? (
                <div className="h-[600px] flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.8] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[160px] h-[160px] border-2 border-[#C8643C] rounded-full border-dashed"
                  />
                  <p className="mt-6 text-[#5A4F47]">Calculating your chart...</p>
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
                <div className="h-[600px] flex items-center justify-center text-[#8A7B72]">Generate your chart to see the bodygraph preview.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {phase === 'revealed' && chart ? (
        <section className="pb-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto space-y-10">
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
