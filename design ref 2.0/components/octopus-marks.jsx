// Yuntona — octopus+Y marks
// Six distinct directions. Each takes { size, fg, accent }.
// All drawn in a 200×200 viewBox for consistency.

const DEFAULT_FG = '#0d1f2d';
const DEFAULT_ACCENT = '#c96442';

// Little eye helpers — keeps the friendly character from the sketch.
const Eye = ({ cx, cy, r = 4, fill = '#0d1f2d' }) => (
  <circle cx={cx} cy={cy} r={r} fill={fill} />
);
const Smile = ({ cx, cy, w = 8, stroke = '#0d1f2d', sw = 2 }) => (
  <path d={`M ${cx - w/2} ${cy} Q ${cx} ${cy + w*0.4} ${cx + w/2} ${cy}`}
        fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
);

// ─────────────────────────────────────────────────────────────
// 01 · Tentacle-Y
// Octopus head sits at the top; two thick tentacles descend and cross,
// forming the V of the Y. A stem tentacle drops straight down to make
// the stalk. Other tentacles curl out to the sides for character.
// ─────────────────────────────────────────────────────────────
function Mark_TentacleY({ size = 200, fg = DEFAULT_FG, accent = DEFAULT_ACCENT }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* outer side tentacles (background layer) */}
      <g fill="none" stroke={fg} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* far-left curl */}
        <path d="M 70 70 Q 40 70, 32 92 Q 28 108, 40 118"/>
        {/* far-right curl */}
        <path d="M 130 70 Q 160 70, 168 92 Q 172 108, 160 118"/>
        {/* mid-left */}
        <path d="M 78 82 Q 58 100, 60 128"/>
        {/* mid-right */}
        <path d="M 122 82 Q 142 100, 140 128"/>
      </g>

      {/* the Y itself — two front tentacles crossing, plus stem */}
      <g fill="none" stroke={fg} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
        {/* left arm of Y */}
        <path d="M 85 80 Q 78 115, 70 150 Q 68 162, 62 172"/>
        {/* right arm of Y */}
        <path d="M 115 80 Q 122 115, 130 150 Q 132 162, 138 172"/>
        {/* stem of Y (center tentacle) */}
        <path d="M 100 84 L 100 172"/>
      </g>

      {/* head / body — soft dome sitting over the Y fork */}
      <g>
        <path d="M 56 72
                 C 56 38, 144 38, 144 72
                 C 144 86, 136 94, 128 94
                 L 72 94
                 C 64 94, 56 86, 56 72 Z"
              fill={fg}/>
        {/* subtle mantle highlight */}
        <path d="M 70 52 Q 100 44, 130 52"
              fill="none" stroke="#f0eee9" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round"/>
      </g>

      {/* eyes + tiny smile */}
      <g>
        <circle cx="86" cy="72" r="6.5" fill="#f0eee9"/>
        <circle cx="114" cy="72" r="6.5" fill="#f0eee9"/>
        <circle cx="87.5" cy="73" r="3" fill={fg}/>
        <circle cx="115.5" cy="73" r="3" fill={fg}/>
        {/* accent cheek dot */}
        <circle cx="100" cy="83" r="2.5" fill={accent} opacity="0.9"/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 · Perched
// A clean geometric Y sits on its own; a round octopus is perched on top,
// its tentacles draping OVER the Y's fork and hanging down.
// ─────────────────────────────────────────────────────────────
function Mark_PerchedY({ size = 200, fg = DEFAULT_FG, accent = DEFAULT_ACCENT }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Y — clean strokes */}
      <g fill="none" stroke={fg} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        <path d="M 60 100 L 100 140"/>
        <path d="M 140 100 L 100 140"/>
        <path d="M 100 140 L 100 180"/>
      </g>

      {/* body */}
      <g>
        <ellipse cx="100" cy="80" rx="44" ry="40" fill={fg}/>
        {/* tentacles draping over the Y arms */}
        <g fill={fg}>
          <path d="M 64 92
                   Q 52 108, 50 126
                   Q 49 138, 56 140
                   Q 62 140, 62 128
                   Q 62 120, 68 114
                   Q 74 108, 72 98 Z"/>
          <path d="M 80 110
                   Q 76 128, 82 144
                   Q 87 154, 93 152
                   Q 97 150, 94 140
                   Q 90 128, 92 116 Z"/>
          <path d="M 120 110
                   Q 124 128, 118 144
                   Q 113 154, 107 152
                   Q 103 150, 106 140
                   Q 110 128, 108 116 Z"/>
          <path d="M 136 92
                   Q 148 108, 150 126
                   Q 151 138, 144 140
                   Q 138 140, 138 128
                   Q 138 120, 132 114
                   Q 126 108, 128 98 Z"/>
        </g>
      </g>

      {/* eyes */}
      <g>
        <circle cx="88" cy="76" r="6" fill="#f0eee9"/>
        <circle cx="112" cy="76" r="6" fill="#f0eee9"/>
        <circle cx="89" cy="77" r="2.8" fill={fg}/>
        <circle cx="113" cy="77" r="2.8" fill={fg}/>
        <circle cx="100" cy="88" r="2.2" fill={accent}/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 · Body-is-bowl
// The octopus body IS the top of the Y — two tentacles trail down
// to form the V, the rest dangle freely. Very cute, very logo-like.
// ─────────────────────────────────────────────────────────────
function Mark_BodyIsBowl({ size = 200, fg = DEFAULT_FG, accent = DEFAULT_ACCENT }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* head */}
      <circle cx="100" cy="72" r="44" fill={fg}/>

      {/* primary V tentacles (form the Y) */}
      <g fill="none" stroke={fg} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 72 108 Q 84 130, 100 150"/>
        <path d="M 128 108 Q 116 130, 100 150"/>
        <path d="M 100 150 L 100 180"/>
      </g>

      {/* small sprawl tentacles */}
      <g fill="none" stroke={fg} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 60 100 Q 46 110, 42 124"/>
        <path d="M 140 100 Q 154 110, 158 124"/>
        <path d="M 84 112 Q 76 128, 80 144"/>
        <path d="M 116 112 Q 124 128, 120 144"/>
      </g>

      {/* eyes */}
      <g>
        <circle cx="86" cy="68" r="7" fill="#f0eee9"/>
        <circle cx="114" cy="68" r="7" fill="#f0eee9"/>
        <circle cx="88" cy="70" r="3.2" fill={fg}/>
        <circle cx="116" cy="70" r="3.2" fill={fg}/>
        {/* accent — blushes */}
        <circle cx="74" cy="82" r="3.2" fill={accent} opacity="0.55"/>
        <circle cx="126" cy="82" r="3.2" fill={accent} opacity="0.55"/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 · Monoline
// One consistent stroke weight. Head as a circle, Y drawn with
// open strokes, 6 tentacles. Minimal, scales tiny.
// ─────────────────────────────────────────────────────────────
function Mark_Monoline({ size = 200, fg = DEFAULT_FG, accent = DEFAULT_ACCENT }) {
  const sw = 7;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* head ring */}
      <circle cx="100" cy="74" r="36" fill="none" stroke={fg} strokeWidth={sw}/>

      {/* Y — two arms + stem */}
      <g fill="none" stroke={fg} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 80 104 Q 78 130, 72 156"/>
        <path d="M 120 104 Q 122 130, 128 156"/>
        <path d="M 100 110 L 100 172"/>
      </g>

      {/* side tentacles */}
      <g fill="none" stroke={fg} strokeWidth={sw} strokeLinecap="round">
        <path d="M 66 98 Q 52 110, 54 128"/>
        <path d="M 134 98 Q 148 110, 146 128"/>
      </g>

      {/* eyes — solid dots */}
      <circle cx="88" cy="72" r="3.5" fill={fg}/>
      <circle cx="112" cy="72" r="3.5" fill={fg}/>
      {/* accent between eyes */}
      <circle cx="100" cy="84" r="2.4" fill={accent}/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 · Badge
// Circular enclosure with an octopus+Y inside. Works as app icon.
// ─────────────────────────────────────────────────────────────
function Mark_Badge({ size = 200, fg = DEFAULT_FG, accent = DEFAULT_ACCENT }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* disc */}
      <circle cx="100" cy="100" r="92" fill={fg}/>
      <circle cx="100" cy="100" r="92" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.35"/>

      {/* octopus inside, in paper color */}
      <g>
        {/* head */}
        <path d="M 62 78
                 C 62 48, 138 48, 138 78
                 C 138 90, 130 98, 122 98
                 L 78 98
                 C 70 98, 62 90, 62 78 Z"
              fill="#f0eee9"/>

        {/* Y tentacles */}
        <g fill="none" stroke="#f0eee9" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 86 92 Q 80 122, 74 150"/>
          <path d="M 114 92 Q 120 122, 126 150"/>
          <path d="M 100 96 L 100 156"/>
        </g>
        {/* side tentacles */}
        <g fill="none" stroke="#f0eee9" strokeWidth="7" strokeLinecap="round">
          <path d="M 70 88 Q 56 100, 58 118"/>
          <path d="M 130 88 Q 144 100, 142 118"/>
        </g>

        {/* eyes (inverted — dark on paper) */}
        <circle cx="88" cy="76" r="3.8" fill={fg}/>
        <circle cx="112" cy="76" r="3.8" fill={fg}/>
        <circle cx="100" cy="86" r="2.5" fill={accent}/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 · Geometric / angular
// A more structured take — head as a rounded squircle, angular Y,
// straight tentacles. Feels more "tech" / architectural.
// ─────────────────────────────────────────────────────────────
function Mark_Inktrap({ size = 200, fg = DEFAULT_FG, accent = DEFAULT_ACCENT }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* squircle head */}
      <path d="M 60 48
               H 140
               A 14 14 0 0 1 154 62
               V 86
               A 14 14 0 0 1 140 100
               H 60
               A 14 14 0 0 1 46 86
               V 62
               A 14 14 0 0 1 60 48 Z"
            fill={fg}/>

      {/* angular Y */}
      <g fill={fg}>
        {/* left arm */}
        <path d="M 68 100 L 92 100 L 102 150 L 84 150 Z"/>
        {/* right arm */}
        <path d="M 132 100 L 108 100 L 98 150 L 116 150 Z"/>
        {/* stem */}
        <rect x="91" y="100" width="18" height="72" rx="2"/>
      </g>

      {/* accent — horizontal bar across middle */}
      <rect x="46" y="122" width="108" height="3" fill={accent} opacity="0.9"/>

      {/* eyes — small slits */}
      <rect x="82" y="70" width="12" height="5" rx="2.5" fill="#f0eee9"/>
      <rect x="106" y="70" width="12" height="5" rx="2.5" fill="#f0eee9"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Wordmarks
// ─────────────────────────────────────────────────────────────
function Wordmark_Fraunces() {
  return (
    <div style={{fontFamily:'Fraunces, serif', fontSize:72, fontWeight:500, letterSpacing:-1.5, color:'#0d1f2d', lineHeight:1}}>
      Yuntona
    </div>
  );
}
function Wordmark_Instrument() {
  return (
    <div style={{fontFamily:'"Instrument Serif", serif', fontSize:88, fontStyle:'italic', letterSpacing:-1, color:'#0d1f2d', lineHeight:1}}>
      Yuntona
    </div>
  );
}
function Wordmark_Nunito() {
  return (
    <div style={{fontFamily:'Nunito, sans-serif', fontSize:64, fontWeight:800, letterSpacing:-1.8, color:'#0d1f2d', lineHeight:1}}>
      yuntona
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Lockups
// ─────────────────────────────────────────────────────────────
function LockupHorizontal() {
  return (
    <div style={{display:'flex', alignItems:'center', gap:20}}>
      <Mark_TentacleY size={120}/>
      <div style={{fontFamily:'Fraunces, serif', fontSize:64, fontWeight:500, letterSpacing:-1.4, color:'#0d1f2d', lineHeight:1}}>
        Yuntona
      </div>
    </div>
  );
}
function LockupStacked() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:14}}>
      <Mark_TentacleY size={180}/>
      <div style={{fontFamily:'Fraunces, serif', fontSize:48, fontWeight:500, letterSpacing:-1, color:'#0d1f2d', lineHeight:1}}>
        Yuntona
      </div>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'#9b8b6f'}}>
        · · ·
      </div>
    </div>
  );
}
function InitialBadge() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:22}}>
      <div style={{width:220, height:220, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Mark_TentacleY size={200} fg="#f0eee9" accent="#c96442"/>
      </div>
      <div style={{fontFamily:'Fraunces, serif', fontSize:28, fontWeight:500, letterSpacing:-0.5, color:'#f0eee9', lineHeight:1}}>
        Yuntona
      </div>
      <div style={{fontFamily:'"JetBrains Mono", monospace', fontSize:10, letterSpacing:3, textTransform:'uppercase', color:'rgba(240,238,233,0.5)'}}>
        yuntona.ai
      </div>
    </div>
  );
}

Object.assign(window, {
  Mark_TentacleY,
  Mark_PerchedY,
  Mark_BodyIsBowl,
  Mark_Monoline,
  Mark_Badge,
  Mark_Inktrap,
  Wordmark_Fraunces,
  Wordmark_Instrument,
  Wordmark_Nunito,
  LockupHorizontal,
  LockupStacked,
  InitialBadge,
});
