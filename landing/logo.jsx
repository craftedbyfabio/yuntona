// Small Yuntona octopus+Y mark for the landing page header/footer.
// Monoline version — it holds up at small sizes better than the filled marks.

function YuntonaMark({ size = 28, color = 'currentColor' }) {
  const sw = 9;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      {/* head */}
      <circle cx="100" cy="74" r="38" fill="none" stroke={color} strokeWidth={sw}/>
      {/* Y */}
      <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 78 106 Q 76 134, 70 160"/>
        <path d="M 122 106 Q 124 134, 130 160"/>
        <path d="M 100 112 L 100 176"/>
      </g>
      {/* side tentacles */}
      <g fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
        <path d="M 64 96 Q 50 108, 52 126"/>
        <path d="M 136 96 Q 150 108, 148 126"/>
      </g>
      {/* eyes */}
      <circle cx="88" cy="70" r="4.5" fill={color}/>
      <circle cx="112" cy="70" r="4.5" fill={color}/>
    </svg>
  );
}

Object.assign(window, { YuntonaMark });
