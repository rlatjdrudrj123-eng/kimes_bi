// §15 — /faq. 사무국이 1년 동안 받는 같은 질문 29개를 미리 답해두는 페이지.
// 검색창 + 카테고리 필터 + 아코디언.
//
// 명세 §15.2.1 검색·필터 + §15.2.2 질문 29개.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const { useState, useMemo } = React;

const FAQS = [
  // 로고
  { id: 1,  cat: 'logo',     q: 'KIMES 로고 색을 우리 회사 컬러에 맞춰 바꿔도 되나요?',                      a: '권장하지 않습니다. KIMES 워드마크는 KIMES Red, 흰색, 검정 중 하나로 사용해주세요. 회사 브랜드 컬러로 KIMES를 표기하고 싶다면 워드마크 SVG 대신 텍스트 표기 (→ /typography §8.4)를 활용하세요.' },
  { id: 2,  cat: 'logo',     q: 'KIMES 로고 안의 검은 쐐기를 빼도 되나요?',                                    a: '권장하지 않습니다. 워드마크의 핵심 디테일이므로 그대로 사용해주세요.' },
  { id: 3,  cat: 'logo',     q: 'SVG 파일 외에 PNG로만 받을 수 있나요?',                                       a: '모든 버전이 SVG·PNG·AI·EPS로 제공됩니다. /downloads에서 받으세요.' },
  { id: 4,  cat: 'logo',     q: '로고를 더 큰 해상도로 받을 수 있나요?',                                       a: 'SVG와 AI는 벡터이므로 무한 확대 가능합니다. PNG는 최대 4000px 폭으로 제공됩니다.' },
  // 컬러
  { id: 5,  cat: 'color',    q: 'KIMES Red의 정확한 Pantone 번호는?',                                          a: 'Pantone 185 C (코팅) / 185 U (비코팅).' },
  { id: 6,  cat: 'color',    q: '인쇄소가 CMYK로 0/100/100/0을 찍었는데 색이 살짝 어둡습니다.',                a: '종이 종류(코팅·비코팅)와 인쇄기에 따라 차이가 있습니다. Pantone 185 C 별색 매칭을 권장합니다.' },
  // 표기
  { id: 7,  cat: 'notation', q: '"KIMES"를 "킴스"로 한글 표기해도 되나요?',                                    a: '권장하지 않습니다. 영문 KIMES 그대로 사용해주세요.' },
  { id: 8,  cat: 'notation', q: '"제42회"를 "42nd"로 영문 표기할 때 형식은?',                                  a: '"KIMES 2027 — 42nd edition" 형식.' },
  { id: 9,  cat: 'notation', q: '보도자료에 KIMES 풀네임을 매번 써야 하나요?',                                 a: '처음 등장할 때만 풀네임. 두 번째부터는 "KIMES"만 사용.' },
  // 함께 쓰기
  { id: 10, cat: 'cobrand',  q: '부스 헤더에 우리 회사 로고와 KIMES 로고 비율은?',                             a: '회사 로고와 비슷한 시각적 무게로 배치합니다. 픽셀 비율보다 눈으로 확인하세요 (참고: 약 1 : 0.7). 자세한 락업 룰은 /co-branding 참고.' },
  { id: 11, cat: 'cobrand',  q: '이메일 서명에 KIMES 로고를 넣고 싶은데 양식이 있나요?',                       a: '/co-branding 또는 /applications에서 다운로드.' },
  { id: 12, cat: 'cobrand',  q: '명함에 KIMES 표기를 넣어도 되나요?',                                          a: '행사 기간 한정으로 가능. 행사 종료 후 재인쇄 시 제거 권장.' },
  { id: 13, cat: 'cobrand',  q: 'SNS 게시물에 KIMES 로고 들어간 걸 올릴 때 별도 승인 필요한가요?',             a: '일반적인 게시물은 별도 승인 불필요. 다만 사무국 사전 검토를 권장합니다 (의무 아님).' },
  // 권한·승인
  { id: 14, cat: 'rights',   q: 'KIMES 로고가 들어간 굿즈를 만들어도 되나요?',                                 a: '사전 승인 필요. kimes@kimes.kr.' },
  { id: 15, cat: 'rights',   q: '회사 광고에 KIMES 로고를 넣고 싶습니다.',                                     a: '사전 승인 필요. 매체·기간·시안 첨부.' },
  { id: 16, cat: 'rights',   q: '"KIMES 공식 파트너"라고 표기해도 되나요?',                                    a: '별도 라이선스 계약이 필요한 표현입니다. 사용 전 사무국과 협의해주세요.' },
  { id: 17, cat: 'rights',   q: '사장님이 KIMES 사진을 회사 인터뷰에 쓰고 싶어 합니다.',                       a: '사진 종류·노출 매체에 따라 다름. kimes@kimes.kr 문의.' },
  { id: 18, cat: 'rights',   q: '영상 인트로에 KIMES 로고 1초 노출은 승인 필요한가요?',                        a: '노출 시간과 무관하게 사전 승인 필요.' },
  { id: 19, cat: 'rights',   q: '행사 끝나고도 회사 홈페이지에 KIMES 참가 표기를 유지해도 되나요?',            a: '차회 참가가 확정되지 않았다면 "Past Exhibitor" 표기로 변경 또는 제거.' },
  // 특별관
  { id: 20, cat: 'zones',    q: '우리는 MedicomteK 특별관에 참가합니다. KIMES 로고를 안 써도 되나요?',         a: '외부 자료(보도자료·홈페이지)에는 KIMES 로고를 함께 표기합니다. 특별관 단독 표기는 특별관 안에서만.' },
  { id: 21, cat: 'zones',    q: '특별관 로고는 어디서 받나요?',                                                a: '/special-zones에서 각 특별관별로 다운로드.' },
  // 다운로드·기술
  { id: 22, cat: 'download', q: '로고 파일 압축 해제가 안 됩니다.',                                            a: '한국어 파일명 인코딩 문제일 수 있습니다. 다른 압축 해제 프로그램(반디집·7-Zip)을 써보세요.' },
  { id: 23, cat: 'download', q: 'AI 파일을 못 여는데 다른 형식 있나요?',                                       a: 'SVG·EPS로 받아 사용하거나 무료 도구(Inkscape)로 열 수 있습니다.' },
  // 행사 일반
  { id: 24, cat: 'event',    q: '부스 위치는 어떻게 정해지나요?',                                              a: '참가 신청 순서·카테고리·이전 회차 참가 이력에 따라 사무국이 배정.' },
  { id: 25, cat: 'event',    q: '사전등록 마감일은?',                                                          a: '2027년 3월 17일 23:59 (행사 시작 전날).' },
  { id: 26, cat: 'event',    q: '부스 설치 가능 시간은?',                                                      a: '행사 전일 09:00~21:00. 자세한 운영 매뉴얼은 참가업체 매뉴얼 참조.' },
  { id: 27, cat: 'event',    q: '참가업체 출입증 발급은?',                                                     a: '사전등록 시 자동 발급. 행사 첫날 East Gate 참가업체 데스크 수령.' },
  { id: 28, cat: 'event',    q: '외국인 참가업체 비자 지원이 있나요?',                                         a: '초청장 발급 가능. kimes@kimes.kr 문의.' },
  { id: 29, cat: 'event',    q: '가이드에 없는 사용 케이스가 있습니다.',                                       a: 'kimes@kimes.kr 문의. 영업일 3~5일 안에 답변.' },
];

const CATEGORIES = [
  { id: 'all',      label: '전체' },
  { id: 'logo',     label: '로고' },
  { id: 'color',    label: '컬러' },
  { id: 'notation', label: '표기' },
  { id: 'cobrand',  label: '함께쓰기' },
  { id: 'rights',   label: '권한·승인' },
  { id: 'zones',    label: '특별관' },
  { id: 'download', label: '다운로드' },
  { id: 'event',    label: '행사 일반' },
];

function FaqPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return FAQS.filter(f => {
      if (cat !== 'all' && f.cat !== cat) return false;
      if (!s) return true;
      return (f.q + ' ' + f.a).toLowerCase().includes(s);
    });
  }, [search, cat]);

  return (
    <PageShell
      eyebrow="11"
      title="FAQ"
      subtitle="자주 묻는 질문"
      lede="사무국이 1년 동안 받는 같은 질문 29개를 미리 답해두었습니다. 위 검색창과 카테고리 필터로 빠르게 찾을 수 있습니다."
    >
      {/* §15.2.1 검색 + 필터 -------------------------------------------- */}
      <div className="fq-search">
        <input
          type="search"
          className="fq-search-input"
          placeholder="질문을 검색해주세요 (예: 색, 로고, 굿즈)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="질문 검색"
        />
        {search && (
          <button type="button" className="fq-search-clear" onClick={() => setSearch('')} aria-label="검색 지우기">
            ✕
          </button>
        )}
      </div>

      <div className="fq-filters" role="tablist" aria-label="카테고리 필터">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={cat === c.id}
            className={`fq-filter ${cat === c.id ? 'is-active' : ''}`}
            onClick={() => setCat(c.id)}
          >
            {c.label}
            {c.id !== 'all' && (
              <span className="fq-filter-count">{FAQS.filter(f => f.cat === c.id).length}</span>
            )}
          </button>
        ))}
      </div>

      {/* §15.2.2 아코디언 ----------------------------------------------- */}
      <div className="fq-list">
        {filtered.length === 0 ? (
          <p className="fq-empty">
            검색 결과가 없습니다. 다른 키워드로 시도해보시거나 →{' '}
            <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>
              {window.KIMES_EVENT.contact.email}
            </a>
            로 문의해주세요.
          </p>
        ) : (
          filtered.map(f => (
            <details
              key={f.id}
              className="fq-item"
              open={open === f.id}
              onToggle={e => e.target.open && setOpen(f.id)}
            >
              <summary className="fq-item-q">
                <span className="fq-item-num">Q{f.id}.</span>
                <span className="fq-item-text">{f.q}</span>
                <span className="fq-item-icon" aria-hidden="true">+</span>
              </summary>
              <div className="fq-item-a">{f.a}</div>
            </details>
          ))
        )}
      </div>

      <p className="fq-foot">
        가이드에 없는 사용 케이스가 있다면 → <Link to="/contact">/contact</Link>{' · '}
        <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>
          {window.KIMES_EVENT.contact.email}
        </a>
      </p>
    </PageShell>
  );
}

window.FaqPage = FaqPage;
