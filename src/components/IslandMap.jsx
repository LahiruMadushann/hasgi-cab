import { useMemo } from "react";

// Simple equirectangular projection onto a 300×480 canvas
const W = 300;
const H = 480;
const LNG0 = 79.5, LNG1 = 82.05, LAT0 = 5.8, LAT1 = 9.95;
const project = (lat, lng) => [
  ((lng - LNG0) / (LNG1 - LNG0)) * W,
  ((LAT1 - lat) / (LAT1 - LAT0)) * H,
];

// Stylised coastline (lat, lng), clockwise from the Jaffna peninsula
const COAST = [
  [9.83, 80.05], [9.82, 80.25], [9.6, 80.55], [9.27, 80.82], [8.95, 81.0],
  [8.58, 81.23], [8.2, 81.42], [7.72, 81.7], [7.3, 81.85], [6.84, 81.85],
  [6.5, 81.73], [6.2, 81.36], [6.12, 81.12], [6.02, 80.8], [5.92, 80.59],
  [5.97, 80.4], [6.03, 80.22], [6.25, 80.05], [6.42, 80.0], [6.6, 79.95],
  [6.93, 79.85], [7.2, 79.83], [7.58, 79.79], [8.0, 79.82], [8.23, 79.72],
  [8.55, 79.88], [8.98, 79.92], [9.2, 80.08], [9.45, 80.15], [9.65, 79.95],
];

// Catmull-Rom → cubic Bézier for an organic closed outline
function smoothClosed(points) {
  const p = points.map(([la, ln]) => project(la, ln));
  const n = p.length;
  let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

const ISLAND = smoothClosed(COAST);

// Gently curved leg between two points
function legPath(a, b) {
  const [x1, y1] = a, [x2, y2] = b;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const bend = 0.18;
  return `M${x1},${y1} Q${mx - dy * bend},${my + dx * bend} ${x2},${y2}`;
}

export default function IslandMap({ stops = [], ghost = [], className = "", onPick }) {
  const pts = useMemo(() => stops.map((s) => project(s.lat, s.lng)), [stops]);
  const ghostPts = useMemo(
    () => ghost.filter((g) => !stops.some((s) => s.name === g.name)),
    [ghost, stops]
  );

  return (
    <svg viewBox={`-20 -10 ${W + 40} ${H + 20}`} className={className} role="img" aria-label="Map of Sri Lanka showing your route">
      <defs>
        <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(255,255,255,0.16)" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#ff2e4d" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ff2e4d" stopOpacity="0" />
        </radialGradient>
        <clipPath id="isle"><path d={ISLAND} /></clipPath>
      </defs>

      <ellipse cx={W / 2} cy={H * 0.62} rx={W * 0.7} ry={H * 0.5} fill="url(#glow)" />
      <path d={ISLAND} fill="#121216" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <rect x="0" y="0" width={W} height={H} fill="url(#dots)" clipPath="url(#isle)" />

      {/* Clickable suggestion pins */}
      {ghostPts.map((g) => {
        const [x, y] = project(g.lat, g.lng);
        return (
          <g key={g.name} className={onPick ? "cursor-pointer group" : ""} onClick={() => onPick?.(g)}>
            <circle cx={x} cy={y} r="9" fill="transparent" />
            <circle cx={x} cy={y} r="2.6" fill="rgba(255,255,255,0.45)" className="transition-all group-hover:fill-[#ff2e4d]" />
            <text x={x + 6} y={y + 3} fontSize="8.5" fill="rgba(255,255,255,0.45)" fontFamily="JetBrains Mono" className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              {g.name}
            </text>
          </g>
        );
      })}

      {/* Route legs */}
      {pts.slice(1).map((p, i) => (
        <g key={`leg-${i}`}>
          <path d={legPath(pts[i], p)} fill="none" stroke="#ff2e4d" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
          <path d={legPath(pts[i], p)} fill="none" stroke="#ff2e4d" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" className="animate-dash" />
        </g>
      ))}

      {/* Stops */}
      {pts.map(([x, y], i) => {
        const first = i === 0, last = i === pts.length - 1 && pts.length > 1;
        const labelLeft = x > W * 0.62;
        return (
          <g key={stops[i].name}>
            {(first || last) && (
              <circle cx={x} cy={y} r="7" fill="#ff2e4d" opacity="0.5" className="animate-pulse-ring" style={{ transformOrigin: `${x}px ${y}px` }} />
            )}
            <circle cx={x} cy={y} r="8.5" fill="#08080a" stroke="#ff2e4d" strokeWidth="2" />
            <text x={x} y={y + 3.2} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="JetBrains Mono">
              {i + 1}
            </text>
            <text
              x={labelLeft ? x - 13 : x + 13}
              y={y + 3.5}
              textAnchor={labelLeft ? "end" : "start"}
              fontSize="10.5"
              fontWeight="600"
              fill="#f4f1ea"
              stroke="#08080a"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {stops[i].name}
            </text>
          </g>
        );
      })}

      {/* Compass */}
      <g transform={`translate(${W - 8}, 16)`} fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.5)">
        <path d="M0,-10 L4,4 L0,1 L-4,4Z" fill="#ff2e4d" />
        <text y="16" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
