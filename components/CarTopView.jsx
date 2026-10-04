/**
 * CarTopView — the central visual of the hero.
 *
 * Authored as a local, self-contained SVG (plan / top view of a mid-engine
 * performance car) so the project has zero external asset dependencies and
 * works immediately after `npm install && npm run dev`.
 *
 * Coordinate system: 600 x 1200 viewBox, the nose of the car points "up".
 * Only gradients are used for shading — no filters, no raster images.
 */
export default function CarTopView({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 600 1200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Top-down view of a mid-engine performance car, used as the scroll-driven centrepiece of the hero section"
      {...props}
    >
      <defs>
        {/* Paint */}
        <linearGradient id="paint" x1="120" y1="40" x2="480" y2="1160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#68727F" />
          <stop offset="0.32" stopColor="#3E4653" />
          <stop offset="0.62" stopColor="#272D37" />
          <stop offset="1" stopColor="#141920" />
        </linearGradient>

        {/* Sheen sweeping across the bodywork */}
        <linearGradient id="sheen" x1="180" y1="60" x2="430" y2="1100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="0.28" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.03" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>

        {/* Glass */}
        <linearGradient id="glass" x1="300" y1="320" x2="300" y2="790" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A0D12" />
          <stop offset="0.45" stopColor="#141A23" />
          <stop offset="1" stopColor="#0A0D12" />
        </linearGradient>
        <linearGradient id="glassTop" x1="300" y1="320" x2="300" y2="540" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1C2531" />
          <stop offset="1" stopColor="#0B0F15" />
        </linearGradient>

        {/* Wheels */}
        <linearGradient id="tyre" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#22262E" />
          <stop offset="1" stopColor="#090C10" />
        </linearGradient>

        {/* Lights */}
        <linearGradient id="headlight" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#EAF6FF" />
          <stop offset="1" stopColor="#7FA6C9" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="taillight" x1="226" y1="0" x2="374" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2E4E" stopOpacity="0.35" />
          <stop offset="0.2" stopColor="#FF2E4E" />
          <stop offset="0.8" stopColor="#FF2E4E" />
          <stop offset="1" stopColor="#FF2E4E" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="tailGlow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FF3B57" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FF3B57" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="frontGlow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#DCEBFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#DCEBFF" stopOpacity="0" />
        </radialGradient>

        {/* Accent pinstripe (brand "fizz") */}
        <linearGradient id="stripe" x1="300" y1="40" x2="300" y2="1150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBFF4D" stopOpacity="0" />
          <stop offset="0.18" stopColor="#CBFF4D" stopOpacity="0.85" />
          <stop offset="0.75" stopColor="#CBFF4D" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBFF4D" stopOpacity="0" />
        </linearGradient>

        {/* Rim light travelling down each flank */}
        <linearGradient id="rim" x1="300" y1="46" x2="300" y2="1150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.22" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="0.68" stopColor="#FFFFFF" stopOpacity="0.42" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rimSoft" x1="300" y1="46" x2="300" y2="1150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFE0FF" stopOpacity="0" />
          <stop offset="0.35" stopColor="#CFE0FF" stopOpacity="0.34" />
          <stop offset="1" stopColor="#CFE0FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="spec" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        <clipPath id="bodyClip">
          <path d="M300 46C344 48 378 74 392 124C404 168 408 202 407 240C406 300 396 332 392 374C388 430 388 470 396 520C404 580 421 640 425 722C429 802 427 902 417 992C409 1062 397 1104 361 1132C341 1146 321 1152 300 1152C279 1152 259 1146 239 1132C203 1104 191 1062 183 992C173 902 171 802 175 722C179 640 196 580 204 520C212 470 212 430 208 374C204 332 194 300 193 240C192 202 196 168 208 124C222 74 256 48 300 46Z" />
        </clipPath>
      </defs>

      {/* ---- Contact shadow / soft ground glow ---------------------- */}
      <ellipse cx="300" cy="620" rx="300" ry="560" fill="url(#tailGlow)" opacity="0" />

      {/* ---- Wheels (drawn first so the body overlaps them) --------- */}
      <g>
        {/* front left */}
        <rect x="172" y="196" width="36" height="122" rx="14" fill="url(#tyre)" />
        <rect x="176" y="206" width="10" height="102" rx="5" fill="#2A2F38" opacity="0.35" />
        {/* front right */}
        <rect x="392" y="196" width="36" height="122" rx="14" fill="url(#tyre)" />
        <rect x="414" y="206" width="10" height="102" rx="5" fill="#2A2F38" opacity="0.35" />
        {/* rear left */}
        <rect x="164" y="756" width="40" height="132" rx="14" fill="url(#tyre)" />
        <rect x="168" y="768" width="11" height="108" rx="5" fill="#2A2F38" opacity="0.35" />
        {/* rear right */}
        <rect x="396" y="756" width="40" height="132" rx="14" fill="url(#tyre)" />
        <rect x="421" y="768" width="11" height="108" rx="5" fill="#2A2F38" opacity="0.35" />
      </g>

      {/* ---- Body ---------------------------------------------------- */}
      <path
        d="M300 46C344 48 378 74 392 124C404 168 408 202 407 240C406 300 396 332 392 374C388 430 388 470 396 520C404 580 421 640 425 722C429 802 427 902 417 992C409 1062 397 1104 361 1132C341 1146 321 1152 300 1152C279 1152 259 1146 239 1132C203 1104 191 1062 183 992C173 902 171 802 175 722C179 640 196 580 204 520C212 470 212 430 208 374C204 332 194 300 193 240C192 202 196 168 208 124C222 74 256 48 300 46Z"
        fill="url(#paint)"
      />
      <path
        d="M300 46C344 48 378 74 392 124C404 168 408 202 407 240C406 300 396 332 392 374C388 430 388 470 396 520C404 580 421 640 425 722C429 802 427 902 417 992C409 1062 397 1104 361 1132C341 1146 321 1152 300 1152C279 1152 259 1146 239 1132C203 1104 191 1062 183 992C173 902 171 802 175 722C179 640 196 580 204 520C212 470 212 430 208 374C204 332 194 300 193 240C192 202 196 168 208 124C222 74 256 48 300 46Z"
        fill="url(#sheen)"
      />
      <path
        d="M300 46C344 48 378 74 392 124C404 168 408 202 407 240C406 300 396 332 392 374C388 430 388 470 396 520C404 580 421 640 425 722C429 802 427 902 417 992C409 1062 397 1104 361 1132C341 1146 321 1152 300 1152C279 1152 259 1146 239 1132C203 1104 191 1062 183 992C173 902 171 802 175 722C179 640 196 580 204 520C212 470 212 430 208 374C204 332 194 300 193 240C192 202 196 168 208 124C222 74 256 48 300 46Z"
        stroke="#FFFFFF"
        strokeOpacity="0.3"
        strokeWidth="2.5"
      />

      {/* Bodywork detail, clipped to the silhouette */}
      <g clipPath="url(#bodyClip)">
        {/* Haunch + hood creases */}
        <path
          d="M214 200C226 420 232 700 206 1010"
          stroke="#FFFFFF"
          strokeOpacity="0.07"
          strokeWidth="3"
        />
        <path
          d="M386 200C374 420 368 700 394 1010"
          stroke="#FFFFFF"
          strokeOpacity="0.07"
          strokeWidth="3"
        />
        {/* Door shut lines */}
        <path
          d="M196 342C250 356 350 356 404 342"
          stroke="#000000"
          strokeOpacity="0.45"
          strokeWidth="2.5"
        />
        <path
          d="M188 700C244 714 356 714 412 700"
          stroke="#000000"
          strokeOpacity="0.45"
          strokeWidth="2.5"
        />
        {/* Engine deck louvres */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x="238"
            y={848 + i * 26}
            width="124"
            height="5"
            rx="2.5"
            fill="#000000"
            opacity="0.5"
          />
        ))}
        {/* Side intake vents */}
        <path d="M206 560C226 566 236 596 234 640L214 632C212 600 208 580 206 560Z" fill="#000" opacity="0.55" />
        <path d="M394 560C374 566 364 596 366 640L386 632C388 600 392 580 394 560Z" fill="#000" opacity="0.55" />
        {/* Front splitter shadow */}
        <path d="M232 60C268 48 332 48 368 60L360 92C330 82 270 82 240 92Z" fill="#000" opacity="0.55" />
        {/* Rear diffuser */}
        <path d="M242 1088C270 1104 330 1104 358 1088L352 1136C326 1148 274 1148 248 1136Z" fill="#000" opacity="0.6" />

        {/* Flank rim lights */}
        <path
          d="M300 46C256 48 222 74 208 124C196 168 192 202 193 240C194 300 204 332 208 374C212 430 212 470 204 520C196 580 179 640 175 722C171 802 173 902 183 992C191 1062 203 1104 239 1132"
          fill="none"
          stroke="url(#rim)"
          strokeWidth="4"
        />
        <path
          d="M300 46C344 48 378 74 392 124C404 168 408 202 407 240C406 300 396 332 392 374C388 430 388 470 396 520C404 580 421 640 425 722C429 802 427 902 417 992C409 1062 397 1104 361 1132"
          fill="none"
          stroke="url(#rimSoft)"
          strokeWidth="4"
        />
        {/* Specular pool on the front deck */}
        <ellipse cx="284" cy="210" rx="72" ry="120" fill="url(#spec)" />

        {/* Accent pinstripe down the spine */}
        <rect x="298.5" y="60" width="3" height="1085" fill="url(#stripe)" />
      </g>

      {/* ---- Mirrors -------------------------------------------------- */}
      <path d="M196 322C186 316 178 320 176 330C174 342 180 350 190 350L206 344Z" fill="#171B22" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.5" />
      <path d="M404 322C414 316 422 320 424 330C426 342 420 350 410 350L394 344Z" fill="#171B22" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.5" />

      {/* ---- Cabin / greenhouse --------------------------------------- */}
      <path
        d="M300 322C338 326 362 364 366 428C370 486 364 528 354 566C348 604 346 646 348 690C350 736 338 768 300 772C262 768 250 736 252 690C254 646 252 604 246 566C236 528 230 486 234 428C238 364 262 326 300 322Z"
        fill="url(#glass)"
        stroke="#FFFFFF"
        strokeOpacity="0.16"
        strokeWidth="2"
      />
      {/* Windscreen */}
      <path d="M300 330C334 334 356 370 360 428C363 470 359 498 351 514C340 522 320 526 300 526C280 526 260 522 249 514C241 498 237 470 240 428C244 370 266 334 300 330Z" fill="url(#glassTop)" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1.5" />
      {/* Roof panel */}
      <path d="M300 530C324 532 340 550 342 582C344 618 342 648 336 670C328 680 314 684 300 684C286 684 272 680 264 670C258 648 256 618 258 582C260 550 276 532 300 530Z" fill="#20252E" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1.5" />
      <rect x="298.5" y="534" width="3" height="146" fill="url(#stripe)" opacity="0.9" />
      {/* Rear screen */}
      <path d="M300 688C316 690 330 702 334 722C338 744 328 762 300 766C272 762 262 744 266 722C270 702 284 690 300 688Z" fill="url(#glassTop)" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1.5" />

      {/* ---- Lights ---------------------------------------------------- */}
      <ellipse cx="300" cy="86" rx="120" ry="90" fill="url(#frontGlow)" />
      <path d="M234 106C250 88 268 80 286 78L290 98C272 100 254 108 242 122Z" fill="url(#headlight)" />
      <path d="M366 106C350 88 332 80 314 78L310 98C328 100 346 108 358 122Z" fill="url(#headlight)" />

      <ellipse cx="300" cy="1106" rx="150" ry="70" fill="url(#tailGlow)" />
      <rect x="226" y="1094" width="148" height="18" rx="9" fill="url(#taillight)" />
    </svg>
  );
}
