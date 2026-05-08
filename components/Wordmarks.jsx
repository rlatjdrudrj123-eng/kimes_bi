// KIMES sub-brand wordmarks — official SVG artwork rendered inline.
//
// Each component emits a real <svg> element whose markup is pulled from
// the global LOGO_SVGS registry (components/LogoSvgs.js). Fill colors are
// set inline on each path inside the SVG, so colors render without any
// CSS class plumbing or cross-document <style> conflicts.
//
// Component prop signatures match the previous version so all call sites
// (BrandFamily, LogoBlock, BrandSheets, etc.) keep working unchanged.

function InlineLogo({ name, height, ariaLabel, style, className }) {
  const reg = window.LOGO_SVGS && window.LOGO_SVGS[name];
  if (!reg) return null;
  // We set only height; the browser derives width from the viewBox aspect ratio.
  // max-width: 100% lets the SVG shrink inside narrow containers; the height
  // then scales down to maintain aspect ratio (because preserveAspectRatio
  // defaults to xMidYMid meet on SVGs without it explicitly set).
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={reg.viewBox}
      style={{
        height: `${height}px`,
        width: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        flex: '0 1 auto',
        ...style,
      }}
      className={className}
      dangerouslySetInnerHTML={{ __html: reg.inner }}
    />
  );
}

/* ---------- KIMES ---------- */
//   variant: 'primary' | '2026' | 'white'
//   suffix:  '2026' (legacy alias for variant='2026')
function KimesWordmark({ height = 48, variant = 'primary', suffix, color, accent, suffixColor, ...rest }) {
  let v = variant;
  if (suffix === '2026' || variant === '2026') v = '2026';
  const map = { primary: 'kimes', '2026': 'kimes2026', white: 'kimesWhite' };
  return <InlineLogo name={map[v] || 'kimes'} height={height} ariaLabel={v === 'white' ? 'KIMES' : v === '2026' ? 'KIMES 2026' : 'KIMES'} {...rest} />;
}

/* ---------- MedicomteK ---------- */
//   variant: 'primary' | '2026'
function MedicomtekWordmark({ height = 40, variant = 'primary', suffix, color, accent, suffixColor, ...rest }) {
  let v = variant;
  if (suffix === '2026' || variant === '2026') v = '2026';
  const map = { primary: 'mc', '2026': 'mc2026' };
  return <InlineLogo name={map[v] || 'mc'} height={height} ariaLabel={v === '2026' ? 'MedicomteK 2026' : 'MedicomteK'} {...rest} />;
}

/* ---------- BEAUTY&DERMA SEOUL ---------- */
//   variant: 'horizontal' | 'stack' | 'white'
//   layout: 'stack-left' | 'stack-right' (legacy → 'stack')
function BeautyDermaWordmark({ height = 40, variant = 'horizontal', layout, color, edition, ...rest }) {
  let v = variant;
  if (layout && String(layout).startsWith('stack')) v = 'stack';
  // legacy: callers asking for white text get the white SVG
  const isWhite =
    variant === 'white' ||
    (typeof color === 'string' && (color === '#fff' || color === '#ffffff' || color.toLowerCase() === 'white'));
  if (isWhite) v = 'white';
  const map = { horizontal: 'bdSeoul', stack: 'bdStack', white: 'bdWhite' };
  return <InlineLogo name={map[v] || 'bdSeoul'} height={height} ariaLabel="BEAUTY&DERMA SEOUL" {...rest} />;
}

/* ---------- INSPIRE Digital Health ---------- */
//   variant: 'short' | 'stack' | 'tagline'
//   tone:    'gray' (default) | 'lime' — picks the gray-on-light or lime-on-dark artwork
//   legacy aliases: 'plain'→'short', 'inline-dash'→'tagline', 'stacked'→'stack'
function InspireWordmark({ height = 36, variant = 'short', tone = 'gray', outlined, color, ...rest }) {
  let v = variant;
  if (variant === 'plain') v = 'short';
  if (variant === 'inline-dash') v = 'tagline';
  if (variant === 'stacked') v = 'stack';
  const grayMap = { short: 'inShort',     stack: 'inStack',     tagline: 'inTagline' };
  const limeMap = { short: 'inLimeShort', stack: 'inLimeStack', tagline: 'inLimeTagline' };
  const map = tone === 'lime' ? limeMap : grayMap;
  return <InlineLogo name={map[v] || map.short} height={height} ariaLabel="INSPIRE Digital Health" {...rest} />;
}

// Kept for back-compat with BrandSheets.jsx
function InspireTagline({ height = 36, ...rest }) {
  return <InlineLogo name="inTagline" height={height} ariaLabel="INSPIRE Digital Health — HEALTH MEETS INNOVATION" {...rest} />;
}

Object.assign(window, {
  InlineLogo,
  KimesWordmark,
  MedicomtekWordmark,
  BeautyDermaWordmark,
  InspireWordmark,
  InspireTagline,
});
