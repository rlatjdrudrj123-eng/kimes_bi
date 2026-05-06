// Brand Guide page — digital recreation of KIMES 2026 BI sheets
// One section per sub-brand: Logo type / Brand colors / Logo color usage.

const { Fragment } = React;

/* ---------- shared section primitives ---------- */
function PageHeader({ title }) {
  return (
    <div className="page-head">
      <div className="title">{title}</div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="row">
      <div className="label">{label}</div>
      <div className="content">{children}</div>
    </div>
  );
}

function ColorSwatch({ hex, cmyk, rgb }) {
  return (
    <div className="swatch">
      <div className="chip" style={{ background: hex }} />
      <div className="specs">
        <div className="row-spec"><span className="k">CMYK</span><span>- {cmyk}</span></div>
        <div className="row-spec"><span className="k">RGB</span><span>- {rgb} (#{hex.replace('#','').toUpperCase()})</span></div>
      </div>
    </div>
  );
}

/* ---------- KIMES sheet ---------- */
function KimesSheet() {
  return (
    <section id="kimes" className="guide">
      <PageHeader title="KIMES LOGO ver. 2026" />

      <Row label="로고 타입">
        <div className="logo-stack">
          <div className="lockup">
            <KimesWordmark height={64} />
          </div>
          <div className="lockup">
            <KimesWordmark height={64} suffix="2026" />
          </div>
          <div className="lockup" style={{ alignItems: 'flex-end', gap: 6 }}>
            <KimesWordmark height={64} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 22, color: '#231815', alignSelf: 'flex-start', marginLeft: 4, marginTop: -2 }}>2026</span>
          </div>
        </div>
      </Row>

      <Row label="전용 색상">
        <div className="colors">
          <ColorSwatch hex="#E60012" cmyk="0 / 100 / 100 / 0" rgb="230 / 0 / 18" />
          <ColorSwatch hex="#231815" cmyk="0 / 0 / 0 / 100" rgb="35 / 24 / 21" />
        </div>
      </Row>

      <Row label="로고 컬러">
        <div className="usage">
          <div className="tile bg-white">
            <KimesWordmark height={36} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <KimesWordmark height={36} suffix="2026" />
            </div>
          </div>
          <div className="tile bg-gray">
            <KimesWordmark height={36} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <KimesWordmark height={36} suffix="2026" />
            </div>
          </div>
          <div className="tile bg-black">
            <KimesWordmark height={36} color="#fff" accent="#E60012" />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <KimesWordmark height={36} color="#fff" accent="#E60012" suffix="2026" suffixColor="#E60012" />
            </div>
          </div>
          <div className="tile bg-kimes">
            <KimesWordmark height={36} color="#fff" accent="#231815" />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <KimesWordmark height={36} color="#fff" accent="#231815" suffix="2026" suffixColor="#231815" />
            </div>
          </div>
        </div>
      </Row>
    </section>
  );
}

/* ---------- Beauty&Derma sheet ---------- */
function BeautyDermaSheet() {
  return (
    <section id="bd" className="guide">
      <PageHeader title="Beauty&Derma LOGO ver. 2026" />

      <Row label="기본">
        <div className="logo-stack" style={{ gap: 28 }}>
          <BeautyDermaWordmark height={52} edition="Busan" />
          <BeautyDermaWordmark height={52} edition="Seoul" />
        </div>
      </Row>

      <Row label="좌측 / 우측">
        <div style={{ display: 'flex', gap: 120, paddingLeft: 20, alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: '#a08fb6', marginBottom: 14, fontWeight: 500 }}>좌측</div>
            <BeautyDermaWordmark height={50} edition="Seoul" layout="stack-left" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#a08fb6', marginBottom: 14, fontWeight: 500 }}>우측</div>
            <BeautyDermaWordmark height={50} edition="Seoul" layout="stack-right" />
          </div>
        </div>
      </Row>

      <Row label="컬러">
        <div className="colors">
          <ColorSwatch hex="#5D3B8B" cmyk="78 / 90 / 0 / 0" rgb="93 / 59 / 139" />
          <ColorSwatch hex="#BAB1D7" cmyk="30 / 30 / 0 / 0" rgb="186 / 177 / 215" />
        </div>
      </Row>

      <Row label="반전">
        <div style={{ paddingLeft: 20, maxWidth: 640 }}>
          <div className="tile bg-black" style={{ aspectRatio: '4.2 / 1', padding: '20px 32px', justifyContent: 'center' }}>
            <BeautyDermaWordmark height={44} color="#fff" edition="Busan" />
          </div>
        </div>
      </Row>
    </section>
  );
}

/* ---------- MedicomteK sheet ---------- */
function MedicomtekSheet() {
  return (
    <section id="mc" className="guide">
      <PageHeader title="Medicomtek LOGO ver. 2026" />

      <Row label="로고 타입">
        <div className="logo-stack">
          <MedicomtekWordmark height={52} />
          <MedicomtekWordmark height={52} suffix="2026" />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
            <MedicomtekWordmark height={52} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: '#231815', alignSelf: 'flex-start' }}>2026</span>
          </div>
        </div>
      </Row>

      <Row label="전용 색상">
        <div className="colors">
          <ColorSwatch hex="#036EB8" cmyk="85 / 50 / 0 / 0" rgb="3 / 110 / 184" />
          <ColorSwatch hex="#231815" cmyk="0 / 0 / 0 / 100" rgb="35 / 24 / 21" />
        </div>
      </Row>

      <Row label="로고 컬러">
        <div className="usage">
          <div className="tile bg-white">
            <MedicomtekWordmark height={28} />
            <MedicomtekWordmark height={28} suffix="2026" />
          </div>
          <div className="tile bg-gray">
            <MedicomtekWordmark height={28} />
            <MedicomtekWordmark height={28} suffix="2026" />
          </div>
          <div className="tile bg-black">
            <MedicomtekWordmark height={28} color="#fff" accent="#036EB8" />
            <MedicomtekWordmark height={28} color="#fff" accent="#036EB8" suffix="2026" suffixColor="#036EB8" />
          </div>
          <div className="tile bg-mc">
            <MedicomtekWordmark height={28} color="#fff" accent="#231815" />
            <MedicomtekWordmark height={28} color="#fff" accent="#231815" suffix="2026" suffixColor="#231815" />
          </div>
        </div>
      </Row>
    </section>
  );
}

/* ---------- INSPIRE Digital Health sheet ---------- */
function InspireSheet() {
  return (
    <section id="inspire" className="guide">
      <PageHeader title="INSPIRE Digital Health LOGO ver. 2026" />

      <Row label="로고 타입">
        <div className="logo-stack" style={{ gap: 30 }}>
          <InspireWordmark height={42} variant="plain" />
          <InspireWordmark height={42} variant="stack" />
          <InspireWordmark height={42} variant="inline-dash" />
        </div>
      </Row>

      <Row label="전용 색상">
        <div className="colors">
          <ColorSwatch hex="#595757" cmyk="0 / 0 / 0 / 80" rgb="89 / 87 / 87" />
          <ColorSwatch hex="#BFD633" cmyk="30 / 0 / 90 / 0" rgb="191 / 214 / 51" />
        </div>
      </Row>

      <Row label="로고 컬러">
        <div className="usage" style={{ maxWidth: 720 }}>
          <div className="tile bg-in-gray" style={{ aspectRatio: '2.4 / 1' }}>
            <InspireWordmark height={32} variant="inline-dash" outlined />
          </div>
          <div className="tile bg-white" style={{ aspectRatio: '2.4 / 1' }}>
            <InspireWordmark height={32} variant="inline-dash" />
          </div>
        </div>
      </Row>

      <Row label="태그라인">
        <div style={{ paddingLeft: 20 }}>
          <div className="tile bg-in-gray" style={{ aspectRatio: '4.2 / 1', padding: '20px 32px', justifyContent: 'center' }}>
            <InspireTagline height={34} outlined />
          </div>
        </div>
      </Row>

      <Row label="배너">
        <div style={{ paddingLeft: 20, display: 'grid', gap: 14, maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 11, color: '#888', width: 56 }}>1200×1000</span>
            <div className="tile bg-in-lime" style={{ aspectRatio: 'unset', width: 520, height: 64, padding: '0 24px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <InspireWordmark height={26} variant="inline-dash" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 11, color: '#888', width: 56 }}>1200×1000</span>
            <div className="tile bg-in-gray" style={{ aspectRatio: 'unset', width: 520, height: 64, padding: '0 24px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <InspireWordmark height={22} variant="inline-dash" outlined />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 11, color: '#888', width: 56 }}>1000×1000</span>
            <div className="tile bg-in-gray" style={{ aspectRatio: 'unset', width: 520, height: 64, padding: '0 24px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <InspireTagline height={22} outlined />
            </div>
          </div>
        </div>
      </Row>
    </section>
  );
}

Object.assign(window, {
  KimesSheet,
  BeautyDermaSheet,
  MedicomtekSheet,
  InspireSheet,
});
