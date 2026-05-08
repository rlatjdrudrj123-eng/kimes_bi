// §9 — /co-branding. KIMES 워드마크와 회사 로고를 함께 쓰는 ★ 핵심 페이지.
// 4 사용 케이스 시각 시뮬레이션 + 락업 기본 원칙 + 별도 계약 표현 + 승인
// 필요 케이스. 모든 시각 사례는 진짜 CSS 렌더 (이미지 X).
//
// 명세 §9.3.1~§9.3.5 평면 구조.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const KimesWordmark = window.KimesWordmark;

// 9.3.1 기본 원칙 4종. 락업 작업의 핵심 가이드.
const PRINCIPLES = [
  { num: 1, title: '시각적 무게 균형', body: 'KIMES 워드마크와 회사 로고는 시각적 무게가 비슷하게 보이도록 배치합니다. 픽셀 비율보다 눈으로 확인하세요. (참고: 약 1 : 0.7 — 회사 로고를 메인으로, KIMES는 참가 표기 성격)' },
  { num: 2, title: 'K 높이 1.5배 간격', body: '두 로고 사이에는 K 높이의 1.5배 이상 간격을 둡니다. 1px 얇은 세로선(divider)으로 구분하는 것을 권장합니다.' },
  { num: 3, title: '시각적 중심선 정렬', body: '두 로고는 시각적 중심선으로 정렬합니다. 베이스라인 정렬은 글자 형태가 다르면 어색합니다.' },
  { num: 4, title: '워드마크 그대로', body: 'KIMES 로고는 워드마크 그대로 사용합니다. 회사 로고 색에 맞춰 변형하지 않습니다.' },
];

// 9.3.3 사용 케이스 4종. 이전 6 케이스에서 압축 (부스 헤더·이메일 서명·
// 명함·초청장 제거, 홈페이지 배너·카탈로그 표지 신규).
const CASES = [
  {
    id: 'press',
    num: 1,
    title: '보도자료 헤더 락업',
    situation: '보도자료 PDF·워드 파일 상단',
    rules: [
      { label: '헤더 처리', body: '회사 로고를 헤더에 배치. KIMES 로고는 본문 안 텍스트 표기 (헤더 동시 노출은 시각 충돌).' },
      { label: '본문 첫 문단', body: '"당사는 2027년 3월 18일부터 21일까지 코엑스에서 열리는 KIMES 2027에 참가합니다. (Booth A-101)"' },
      { label: '보일러플레이트', body: '보도자료 끝에 KIMES 한 줄 소개 (/overview에서 복사)' },
    ],
    ok:  '회사 로고 헤더 + KIMES는 본문 텍스트 표기',
    bad: 'KIMES 로고를 헤더에 회사 로고와 동시 노출 → 시각 충돌',
    asset: '워드마크 SVG (헤더 락업) — 다만 헤더 자체에는 회사 로고만',
    file: '보도자료 템플릿 .docx',
  },
  {
    id: 'banner',
    num: 2,
    title: '회사 홈페이지 배너',
    situation: '회사 홈페이지 메인 또는 행사 정보 페이지',
    rules: [
      { label: '권장 위치', body: '메인 비주얼 우측 또는 하단 (회사 비주얼이 메인 자리)' },
      { label: 'KIMES 표기 박스', body: '흰 배경 + KIMES Red 워드마크 + 일정·부스 번호' },
      { label: '권장 사이즈', body: '데스크톱 1920×400 / 태블릿 1200×300 / 모바일 750×300' },
      { label: '행사 후 처리', body: '"Past Exhibitor" 표기로 변경 또는 제거 권장' },
    ],
    ok:  '회사 비주얼 메인 자리, KIMES는 참가 표기 박스',
    bad: 'KIMES 로고를 메인 비주얼 자리에 큼직하게',
    asset: '워드마크 SVG 또는 텍스트 표기',
    file: '홈페이지 배너 .png 4종 (1920×400 / 1200×300 / 모바일 / OG 1200×630)',
  },
  {
    id: 'sns',
    num: 3,
    title: 'SNS 카드',
    situation: 'Instagram · LinkedIn · X · Facebook (1:1, 4:5)',
    rules: [
      { label: '권장 위치', body: '우상단 또는 우하단 (회사 비주얼이 메인)' },
      { label: 'KIMES 표기 박스 높이', body: '캔버스 높이의 8% 이내' },
      { label: '안전 여백', body: '캔버스 가장자리에서 X (KIMES K 높이) 이상' },
      { label: 'KIMES 표기 박스', body: '흰 배경 + KIMES Red 워드마크' },
    ],
    ok:  '회사 비주얼 80%, KIMES는 코너 표기',
    bad: '회사 비주얼 위에 KIMES 로고 큼직하게 얹기',
    asset: '텍스트 표기',
    file: 'SNS 카드 양식 4종 (1:1, 4:5, 9:16 스토리, OG 1200×630)',
    note: 'SNS 콘텐츠에 KIMES 워드마크가 등장하는 경우 게시 전 사무국 검토를 권장합니다 (의무 아님). 연락처 태그 @kimes_official.',
  },
  {
    id: 'catalog',
    num: 4,
    title: '카탈로그·브로셔 표지',
    situation: '주력 제품 카탈로그·기업 소개 브로셔의 표지·뒷표지',
    rules: [
      { label: '권장 위치', body: '표지 하단 또는 뒷표지 푸터 (회사 자료 결이 메인)' },
      { label: '락업', body: '회사 로고를 좌측, KIMES 표기를 우측. K 높이 1.5배 이상 간격 + 1px 세로선' },
      { label: '행사 후 처리', body: '행사 종료 후 인쇄분에는 KIMES 표기 제거 권장' },
    ],
    ok:  '카탈로그 표지가 회사 자료 결, KIMES는 행사 정보 동반',
    bad: '표지 메인 자리에 KIMES 로고 큼직하게',
    asset: '워드마크 SVG 또는 텍스트 표기',
    file: '카탈로그 표지 양식 .ai (A4 / 레터)',
  },
];

// 9.3.4 별도 계약·승인이 필요한 표현. 인증·후원·파트너 어휘.
const RESTRICTED = [
  'KIMES 공식 파트너 / Official Partner of KIMES',
  'KIMES 추천 / KIMES Recommended',
  'KIMES 인증 / KIMES Certified',
  'KIMES 후원 / Sponsored by KIMES',
  'KIMES 주최 / Organized by KIMES',
  'KIMES 로고를 회사 로고와 합친 새 로고',
  '"KIMES 2027 official ___" 형태의 모든 표현',
];

// 9.3.5 사전 승인이 필요한 케이스. 가이드 범위 안 + 개별 검토.
const APPROVAL_NEEDED = [
  { title: '굿즈·기념품', desc: '티셔츠·머그·에코백·USB·펜 등에 KIMES 로고 인쇄' },
  { title: '영상물 등장', desc: 'TVC·바이럴·유튜브 인트로·웨비나 오프닝에 KIMES 로고' },
  { title: '외부 매체 광고', desc: '신문·잡지·옥외·디지털 광고에 KIMES 로고 노출' },
  { title: '회사 자체 행사', desc: '사내 발표·외부 컨퍼런스 발표 자료에 KIMES 로고' },
  { title: '책·도서·논문 표지', desc: 'KIMES 로고가 표지 또는 본문에 등장하는 출판물' },
];

function CoBrandingPage() {
  const { contact, assets } = window.KIMES_EVENT;
  const assetStatus = (assets && assets.status) || 'pending';

  return (
    <PageShell
      eyebrow="05"
      title="Co-branding"
      subtitle="KIMES와 회사 로고 함께 쓰기"
      lede="참가업체가 가장 자주 헷갈리는 영역입니다. 회사 로고와 KIMES 워드마크를 함께 쓰는 4가지 핵심 케이스 + 기본 원칙 + 별도 계약이 필요한 표현을 안내합니다."
    >
      {/* §9.3.1 기본 원칙 ---------------------------------------------- */}
      <SectionHeading id="principles" title="Principles" subtitle="기본 원칙" />
      <div className="cb-principles">
        {PRINCIPLES.map(p => (
          <div key={p.num} className="cb-principle">
            <div className="cb-principle-num">{p.num}</div>
            <div className="cb-principle-body">
              <div className="cb-principle-title">{p.title}</div>
              <p className="cb-principle-desc">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* §9.3.2 측정 단위 X — 다이어그램 */}
      <SectionHeading id="x-unit" title="Measurement Unit" subtitle="측정 단위 X" />
      <div className="cb-xunit">
        <div className="cb-xunit-art" aria-label="X = K의 cap-height 다이어그램">
          <KimesWordmark height={56} />
          <span className="cb-xunit-marker cb-xunit-marker-k">X</span>
        </div>
        <p className="cb-xunit-cap">
          <strong>X = KIMES 워드마크 K의 cap-height</strong> · 락업 간격은 X
          단위로 측정합니다.
        </p>
      </div>

      {/* §9.3.3 사용 케이스 4종 ------------------------------------------ */}
      <SectionHeading id="cases" title="Use Cases" subtitle="사용 케이스 4종" />
      <p>
        에셋 선택 안내 — 각 케이스 상단에 두 옵션 함께 표시. 회사 디자인
        시스템에 맞춰 워드마크 SVG 또는 텍스트 표기 중 하나를 선택하세요.
      </p>
      <div className="cb-cases">
        {CASES.map(c => <CaseCard key={c.id} c={c} assetStatus={assetStatus} />)}
      </div>

      {/* §9.3.4 별도 계약·승인이 필요한 표현 ---------------------------- */}
      <SectionHeading id="restricted" title="Restricted Expressions" subtitle="별도 계약·승인이 필요한 표현" />
      <section className="cb-restricted">
        <p>
          다음 표현은 별도 계약·승인이 필요합니다. 사용 전 사무국과
          협의해주세요.
        </p>
        <ul className="cb-restricted-list">
          {RESTRICTED.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div className="cb-restricted-actions">
          <a href={`mailto:${contact.email}`} className="btn btn-primary btn-md">
            승인 신청 →
          </a>
          <span className="cb-restricted-channel">
            {contact.email} · {contact.tel}
          </span>
        </div>
      </section>

      {/* §9.3.5 사전 승인이 필요한 케이스 -------------------------------- */}
      <SectionHeading id="approval" title="Pre-approval Cases" subtitle="사전 승인이 필요한 케이스" />
      <p>
        다음은 사용 자체는 가능하나 사전 승인이 필요한 케이스입니다. 검토
        기간 영업일 3~5일.
      </p>
      <div className="cb-approval">
        {APPROVAL_NEEDED.map((a, i) => (
          <div key={i} className="cb-approval-card">
            <div className="cb-approval-title">{a.title}</div>
            <div className="cb-approval-desc">{a.desc}</div>
          </div>
        ))}
      </div>

      {/* cross-link */}
      <p className="cb-cross">
        로고 자산은 → <Link to="/logo">/logo</Link>{' · '}
        텍스트 표기는 → <Link to="/typography">/typography</Link>{' · '}
        권한·승인 매트릭스는 → <Link to="/permissions">/permissions</Link>
      </p>
    </PageShell>
  );
}

// 사용 케이스 카드 — 시각 미리보기(아스키 결의 박스 시뮬레이션) + 룰 +
// ✓ OK / ✗ 흔한 실수 + [양식 다운로드].
function CaseCard({ c, assetStatus }) {
  const pending = assetStatus !== 'ready';
  return (
    <article className="cb-case" id={`case-${c.id}`}>
      <header className="cb-case-head">
        <span className="cb-case-num">케이스 {c.num}</span>
        <h3 className="cb-case-title">{c.title}</h3>
        <span className="cb-case-asset">{c.asset}</span>
      </header>
      <div className="cb-case-preview" aria-label={`${c.title} 미리보기`}>
        <CasePreview id={c.id} />
      </div>
      <div className="cb-case-body">
        <div className="cb-case-situation"><strong>상황</strong> · {c.situation}</div>
        <ul className="cb-case-rules">
          {c.rules.map((r, i) => (
            <li key={i}><strong>{r.label}</strong> — {r.body}</li>
          ))}
        </ul>
        <div className="cb-case-signals">
          <div className="cb-case-signal cb-case-signal-ok">
            <span className="cb-case-mark cb-case-mark-ok">✓</span>
            <span>{c.ok}</span>
          </div>
          <div className="cb-case-signal cb-case-signal-bad">
            <span className="cb-case-mark cb-case-mark-bad">✗</span>
            <span>{c.bad}</span>
          </div>
        </div>
        {c.note && <p className="cb-case-note">{c.note}</p>}
        <div className="cb-case-foot">
          {pending ? (
            <button type="button" className="btn btn-sm btn-outline" disabled title="Coming soon">
              {c.file}
            </button>
          ) : (
            <a href={`/assets/co-branding/${c.id}-template`} className="btn btn-sm btn-outline" download>
              {c.file}
            </a>
          )}
          {pending && <span className="cb-case-pending">Coming Soon</span>}
        </div>
      </div>
    </article>
  );
}

// 4 케이스별 미리보기 시뮬레이션 — 회사 로고 자리는 회색 placeholder,
// KIMES 표기는 워드마크 SVG로. 진짜 CSS 렌더, 이미지 X.
function CasePreview({ id }) {
  if (id === 'press') {
    return (
      <div className="cb-prev cb-prev-press">
        <div className="cb-prev-row">
          <span className="cb-prev-co">[회사 로고]</span>
          <span className="cb-prev-press-tag">보도자료 / PRESS</span>
        </div>
        <div className="cb-prev-divider" />
        <div className="cb-prev-body-text">
          당사는 2027년 3월 18일부터 21일까지 코엑스에서 열리는{' '}
          <strong>KIMES 2027</strong>에 참가합니다. (Booth A-101)
        </div>
      </div>
    );
  }
  if (id === 'banner') {
    return (
      <div className="cb-prev cb-prev-banner">
        <div className="cb-prev-banner-visual">[회사 메인 비주얼]</div>
        <div className="cb-prev-banner-tag">
          <KimesWordmark height={14} />
          <div className="cb-prev-banner-meta">3.18-21 · COEX · Booth A-101</div>
        </div>
      </div>
    );
  }
  if (id === 'sns') {
    return (
      <div className="cb-prev cb-prev-sns">
        <div className="cb-prev-sns-visual">[회사 비주얼 80%]</div>
        <div className="cb-prev-sns-tag">
          <KimesWordmark height={11} />
          <span className="cb-prev-sns-meta">EXHIBITOR · A-101</span>
        </div>
      </div>
    );
  }
  if (id === 'catalog') {
    return (
      <div className="cb-prev cb-prev-catalog">
        <div className="cb-prev-catalog-visual">[회사 메인 제품 비주얼]</div>
        <div className="cb-prev-catalog-title">회사 카탈로그 2027</div>
        <div className="cb-prev-catalog-foot">
          <span className="cb-prev-co">[회사 로고]</span>
          <span className="cb-prev-divider-vert" aria-hidden="true" />
          <span className="cb-prev-catalog-kimes">
            <KimesWordmark height={12} />
            <span className="cb-prev-catalog-kimes-meta">EXHIBITOR · Booth A-101</span>
          </span>
        </div>
      </div>
    );
  }
  return null;
}

window.CoBrandingPage = CoBrandingPage;
