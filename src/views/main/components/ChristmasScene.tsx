import { keyframes } from '@emotion/react'
import { styled } from '@mui/material/styles'

const twinkle = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
`

const snowfall = keyframes`
  0% { opacity: 1; transform: translateY(var(--snow-start)); }
  92% { opacity: 1; transform: translateY(var(--snow-end)); }
  100% { opacity: 0; transform: translateY(var(--snow-end)); }
`

const ChristmasSceneSvg = styled('svg')`
  display: block;
  width: 100%;

  @media (prefers-reduced-motion: no-preference) {
    .scene-stars > * {
      animation: ${twinkle} 4.8s ease-in-out infinite;
    }

    .scene-stars > :nth-child(2n) {
      animation-duration: 6.2s;
      animation-delay: -3.2s;
    }

    .scene-stars > :nth-child(3n) {
      animation-duration: 5.5s;
      animation-delay: -1.7s;
    }

    .scene-stars > :nth-child(5) {
      animation-delay: -2.6s;
    }

    .scene-snow > * {
      animation: ${snowfall} 8s linear infinite;
    }

    .scene-snow > :nth-child(1) {
      --snow-start: -96px;
      --snow-end: 151px;
    }

    .scene-snow > :nth-child(2) {
      --snow-start: -64px;
      --snow-end: 183px;
    }

    .scene-snow > :nth-child(3) {
      --snow-start: -153px;
      --snow-end: 94px;
    }

    .scene-snow > :nth-child(4) {
      --snow-start: -176px;
      --snow-end: 71px;
    }

    .scene-snow > :nth-child(5) {
      --snow-start: -204px;
      --snow-end: 43px;
      animation-delay: -2s;
    }

    .scene-snow > :nth-child(6) {
      --snow-start: -107px;
      --snow-end: 140px;
    }

    .scene-snow > :nth-child(2n) {
      animation-duration: 10.5s;
      animation-delay: -4.5s;
    }

    .scene-snow > :nth-child(3n) {
      animation-duration: 12s;
      animation-delay: -7s;
    }
  }

  @media print {
    .scene-stars > *,
    .scene-snow > * {
      animation: none;
    }
  }
`

export function ChristmasScene() {
  return (
    <ChristmasSceneSvg
      viewBox="-200 0 640 290"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M-184 254C-191 244-165 240-147 244Q-50 229 46 249T250 249Q345 228 402 245C424 246 426 259 406 264Q324 278 245 269T48 271Q-73 281-164 268C-181 267-191 261-184 254Z"
        fill="#dae9dc"
        opacity=".12"
      />
      <g opacity=".8">
        <path d="M-148 163h116v85h-116Z" fill="#a9c3b0" />
        <path d="m-160 163 70-62 70 62Z" fill="#a84a50" />
        <path
          d="m-160 163 70-62 70 62"
          stroke="#f9f4e9"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M-134 141V96h16v31Z" fill="#a9c3b0" />
        <path
          d="M-138 96h24"
          stroke="#f9f4e9"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M-102 248v-45a12 12 0 0 1 24 0v45" fill="#134b38" />
        <g fill="#efbb64" stroke="#fff3d6" strokeWidth="2">
          <rect x="-137" y="181" width="22" height="26" rx="2" />
          <rect x="-65" y="181" width="22" height="26" rx="2" />
          <path d="M-126 181v26m-11-13h22m61-13v26m-11-13h22" />
        </g>
        <path d="M-143 167q53 17 106 0" stroke="#215c47" strokeWidth="4" />
        <g fill="#e9ca83">
          <circle cx="-130" cy="171" r="2.5" />
          <circle cx="-107" cy="177" r="2.5" />
          <circle cx="-78" cy="177" r="2.5" />
          <circle cx="-50" cy="171" r="2.5" />
        </g>
      </g>
      <g fill="#275c46" stroke="#b6cdb9" strokeWidth="3" strokeLinejoin="round">
        <path d="m-166 172-20 36h8l-14 26h52l-14-26h8Z" />
        <path d="m350 136-26 47h10l-23 34h13l-18 26h88l-18-26h13l-23-34h10Z" />
      </g>
      <path d="M350 243v9m-516-18v13" stroke="#b79364" strokeWidth="6" />
      <g className="scene-stars" fill="#e9ca83">
        <path d="m-122 42 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        <path d="m-16 78 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
        <path d="m350 50 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
      </g>
      <g className="scene-snow" fill="#fff" opacity=".55">
        <circle cx="-155" cy="94" r="2" />
        <circle cx="-54" cy="62" r="2" />
        <circle cx="399" cy="151" r="2" />
      </g>
      <g className="scene-stars" fill="#e9ca83">
        <path d="m73 27 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" />
        <path d="m256 33 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        <path d="m286 99 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
        <path d="m119 44 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" />
        <circle cx="203" cy="20" r="2" />
      </g>
      <g className="scene-snow" fill="#fff" opacity=".55">
        <circle cx="45" cy="94" r="2" />
        <circle cx="179" cy="62" r="2" />
        <circle cx="303" cy="151" r="2" />
        <circle cx="21" cy="174" r="2" />
        <circle cx="272" cy="202" r="2" />
        <circle cx="99" cy="105" r="2" />
      </g>
      <path d="M75 150h146v99H75z" fill="#eadfc6" />
      <path d="M63 151 148 78l85 73" fill="#963b43" />
      <path
        d="m63 151 85-73 85 73"
        stroke="#f9f4e9"
        strokeWidth="10"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M183 115V84h18v46" fill="#eadfc6" />
      <path
        d="M181 83h22"
        stroke="#fff7e7"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M131 249v-58a17 17 0 0 1 34 0v58" fill="#215c47" />
      <circle cx="156" cy="220" r="2" fill="#e9ca83" />
      <g fill="#efbb64" stroke="#b58643" strokeWidth="3">
        <rect x="88" y="169" width="28" height="33" rx="3" />
        <rect x="180" y="169" width="28" height="33" rx="3" />
      </g>
      <path
        d="M102 169v33m-14-17h28m78-16v33m-14-17h28"
        stroke="#fff3d6"
        strokeWidth="3"
      />
      <path d="M79 156q70 24 138 0" stroke="#3a7150" strokeWidth="5" />
      <g fill="#d9b56e">
        <circle cx="96" cy="162" r="3" />
        <circle cx="122" cy="168" r="3" />
        <circle cx="175" cy="168" r="3" />
        <circle cx="200" cy="163" r="3" />
      </g>
      <circle cx="148" cy="191" r="10" stroke="#497649" strokeWidth="6" />
      <path d="m143 185 5 4 5-4v8l-5-4-5 4Z" fill="#b9494d" />
      <path d="M247 249v-30" stroke="#b79364" strokeWidth="9" />
      <path
        d="m247 105-35 57h15l-29 43h20l-29 34h116l-29-34h20l-29-43h15Z"
        fill="#3b7958"
      />
      <path
        d="m247 105-35 57h15m-9 43h-20m78 0h20"
        stroke="#e8efdd"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="m247 93 3 8 9 1-7 6 2 9-7-5-8 5 3-9-7-6 9-1Z" fill="#e9ca83" />
      <g fill="#b9494d">
        <circle cx="242" cy="153" r="5" />
        <circle cx="263" cy="183" r="5" />
        <circle cx="227" cy="213" r="5" />
      </g>
      <g fill="#e9ca83">
        <circle cx="235" cy="185" r="4" />
        <circle cx="268" cy="219" r="4" />
      </g>
      <rect x="43" y="221" width="33" height="28" rx="3" fill="#b9494d" />
      <path d="M59 221v28m-16-19h33" stroke="#e9ca83" strokeWidth="4" />
      <path
        d="M35 251h258"
        stroke="#e9efdf"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </ChristmasSceneSvg>
  )
}
