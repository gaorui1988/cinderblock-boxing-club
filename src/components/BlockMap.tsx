export function BlockMap() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Block map of Foundry Row and Tallow Street">
      <rect width="480" height="360" fill="#151513" />
      <rect x="28" y="28" width="118" height="86" fill="#232320" />
      <rect x="176" y="28" width="128" height="86" fill="#232320" />
      <rect x="334" y="28" width="118" height="86" fill="#232320" />
      <rect x="28" y="154" width="118" height="96" fill="#232320" />
      <rect x="176" y="154" width="128" height="96" fill="url(#gym-tape)" />
      <rect x="334" y="154" width="118" height="96" fill="#232320" />
      <rect x="28" y="286" width="200" height="48" fill="#232320" />
      <rect x="258" y="286" width="194" height="48" fill="#232320" />
      <defs>
        <pattern id="gym-tape" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="16" height="16" fill="#0C0C0B" />
          <rect width="8" height="16" fill="#FF4F1F" />
        </pattern>
      </defs>
      <text x="240" y="136" textAnchor="middle" fill="#8E8B82" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" letterSpacing="1.4">
        FOUNDRY ROW
      </text>
      <text x="158" y="210" textAnchor="middle" fill="#8E8B82" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" letterSpacing="1.2" transform="rotate(-90 158 202)">
        TALLOW ST
      </text>
      <text x="240" y="276" textAnchor="middle" fill="#8E8B82" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" letterSpacing="1.4">
        3RD ST
      </text>
      <circle className="map-ring" cx="240" cy="190" r="10" fill="none" stroke="#FF4F1F" strokeWidth="1.5" />
      <rect x="234" y="184" width="12" height="12" fill="#FF4F1F" />
      <text x="240" y="226" textAnchor="middle" fill="#EDEAE3" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" letterSpacing="1.2">
        YOU'RE HERE SOON
      </text>
    </svg>
  )
}
