type Props = {
  size?: number;
  color?: string;
  accent?: string;
};

export default function YuntonaMark({
  size = 200,
  color = '#0d1f2d',
  accent = '#c96442',
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 70 70 Q 40 70, 32 92 Q 28 108, 40 118" />
        <path d="M 130 70 Q 160 70, 168 92 Q 172 108, 160 118" />
        <path d="M 78 82 Q 58 100, 60 128" />
        <path d="M 122 82 Q 142 100, 140 128" />
      </g>

      <g fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 85 80 Q 78 115, 70 150 Q 68 162, 62 172" />
        <path d="M 115 80 Q 122 115, 130 150 Q 132 162, 138 172" />
        <path d="M 100 84 L 100 172" />
      </g>

      <g>
        <path
          d="M 56 72 C 56 38, 144 38, 144 72 C 144 86, 136 94, 128 94 L 72 94 C 64 94, 56 86, 56 72 Z"
          fill={color}
        />
        <path
          d="M 70 52 Q 100 44, 130 52"
          fill="none"
          stroke="#f0eee9"
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <g>
        <circle cx="86" cy="72" r="6.5" fill="#f0eee9" />
        <circle cx="114" cy="72" r="6.5" fill="#f0eee9" />
        <circle cx="87.5" cy="73" r="3" fill={color} />
        <circle cx="115.5" cy="73" r="3" fill={color} />
        <circle cx="100" cy="83" r="2.5" fill={accent} opacity="0.9" />
      </g>
    </svg>
  );
}
