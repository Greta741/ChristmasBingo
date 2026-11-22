export function SantaSleigh() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 370 80"
      width="296"
      height="64"
      aria-hidden="true"
      focusable="false"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .santa-rear-legs {
            transform-origin: 12px 36px;
            animation: reindeer-gallop 0.55s ease-in-out infinite alternate;
          }
          .santa-front-legs {
            transform-origin: 32px 34px;
            animation: reindeer-gallop 0.55s ease-in-out -0.55s infinite alternate;
          }
          .santa-wave {
            transform-origin: 57px 32px;
            animation: santa-wave 0.65s ease-in-out infinite alternate;
          }
        }
        @keyframes reindeer-gallop {
          from { transform: rotate(-22deg); }
          to { transform: rotate(22deg); }
        }
        @keyframes santa-wave {
          from { transform: rotate(-12deg); }
          to { transform: rotate(18deg); }
        }
      `}</style>
      <defs>
        <g id="footer-reindeer">
          <path
            className="santa-rear-legs"
            d="M8 36 1 49m13-13-3 16"
            fill="none"
            stroke="#87552f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="santa-front-legs"
            d="M30 34l11 12 9-2M33 34l11 5 7 10"
            fill="none"
            stroke="#87552f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="21" cy="31" rx="19" ry="9" fill="#ac7546" />
          <path d="m32 29 7-19 9 4-5 21Z" fill="#ac7546" />
          <path d="m41 12-3-7 8 5 8-2-2 9" fill="#87552f" />
          <path
            d="m42 11-2-10m1 5-6-3m10 8 3-10m-1 5 6-3"
            fill="none"
            stroke="#d8bc7b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M43 17h13q5 1 3 5l-14 3" fill="#ac7546" />
          <circle cx="49" cy="17" r="1.5" fill="#17372e" />
          <circle cx="59" cy="21" r="2.5" fill="#c74a46" />
          <path d="m36 24 9 5" stroke="#a33b40" strokeWidth="4" />
          <circle cx="41" cy="28" r="2" fill="#efcf8c" />
          <path
            d="m4 28-5-5"
            stroke="#ac7546"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </defs>
      <path
        d="M81 48Q140 68 199 35M88 50Q187 73 266 25M88 50Q220 80 334 29"
        fill="none"
        stroke="#d8bc7b"
        strokeWidth="1.2"
      />
      {/* Gift sack and ribboned parcels behind Santa. */}
      <path d="M14 49Q2 33 20 21l-3-8 14 2-3 8q21 8 10 29Z" fill="#537b55" />
      <path d="m18 22 12 1" stroke="#efcf8c" strokeWidth="3" />
      <rect
        x="25"
        y="32"
        width="19"
        height="21"
        rx="2"
        fill="#d8bc7b"
        transform="rotate(-12 25 32)"
      />
      <path d="m34 31 4 21m-12-11 19-4" stroke="#a33b40" strokeWidth="3" />
      {/* Santa's coat, face, beard and fur-trimmed hat. */}
      <path d="M40 48q-3-23 13-24 15 3 19 25Z" fill="#bd3940" />
      <g className="santa-wave">
        <path
          d="m57 32 13-6 3-10"
          fill="none"
          stroke="#bd3940"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="m72 18 2-5"
          stroke="#fff7e6"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="75" cy="9" r="4" fill="#537b55" />
      </g>
      <circle cx="55" cy="21" r="10" fill="#f2c7a0" />
      <path d="M45 21q8 8 19-1 3 14-11 17-9-4-8-16" fill="#fff7e6" />
      <circle cx="60" cy="20" r="1" fill="#17372e" />
      <circle cx="64" cy="23" r="3" fill="#e9ab88" />
      <path d="M43 15Q44-3 59 5l10 8-14-2-3 6" fill="#bd3940" />
      <path
        d="m44 16 19-2"
        stroke="#fff7e6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="70" cy="13" r="4" fill="#fff7e6" />
      {/* Curved sleigh body and golden runners. */}
      <path d="M8 46h56q16 0 22-14 10 17-1 28H27Q12 60 8 46" fill="#a92f38" />
      <path
        d="M10 46h54q16 0 22-14"
        fill="none"
        stroke="#efcf8c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="m29 59-4 10m46-10 5 10M12 69h73q14 0 14-10"
        fill="none"
        stroke="#d8bc7b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="m42 49 2 4 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z" fill="#efcf8c" />
      <use href="#footer-reindeer" x="146" y="10" />
      <use href="#footer-reindeer" x="214" y="1" />
      <use href="#footer-reindeer" x="282" y="5" />
      <g fill="#efcf8c" opacity="0.7">
        <path d="m113 19 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
        <path d="m128 57 1 3 4 1-4 2-1 3-2-3-3-2 3-1Z" />
        <circle cx="104" cy="47" r="1.5" />
        <circle cx="138" cy="35" r="1.5" />
      </g>
    </svg>
  )
}
