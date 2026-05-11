#!/usr/bin/env node
/* KIMES BI 가이드 — §22 자동 톤 검수 (v2027.1 — Tier 분리)
 *
 * §22.1 톤 2단 분리 적용:
 *   Tier 1 — 브랜드 보호 영역. 강한 표현 허용 ("변경 불가 / 무단 사용 금지 /
 *            별도 계약 필요 / 사전 승인 필수"). 라인에 Tier 1 마커가 있으면
 *            §22.6 강한 단어 룰 통과.
 *   Tier 2 — 실무 권장 영역. "권장 / 권장하지 않음 / 피해주세요" 톤 강제.
 *
 * §22.4 용어 통일 (v2027.1 신규):
 *   자산 (← 에셋), 결합 배치 (← 락업), 변형 (← 베리언트),
 *   메인·보조 (← 프라이머리·세컨더리), 권장 사양 (← 권장 스펙).
 *
 * 사용:
 *   node scripts/check-tone.js
 *
 * 종료 코드:
 *   0 — 위반 없음
 *   1 — 위반 발견 (CI에서 잡을 수 있게)
 *
 * 예외 처리:
 *   - rule.exemptIfPrecededBy: 매치 직전 문자열이 화이트리스트에 있으면 통과
 *   - rule.exemptIfLineHas:    같은 줄에 마커가 있으면 통과 (예: ✗ 메타 예시,
 *                              Tier 1 마커)
 *   - rule.exemptFiles:        특정 파일은 검사 제외
 *   - 라인 끝 주석 `// allow-tone`이 있으면 그 줄의 모든 룰 통과
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* ---------- §22 룰 목록 -----------------------------------------------
 * 각 룰: { term | regex, why, [exemptIfPrecededBy], [exemptIfLineHas],
 *         [exemptFiles], category }
 * ------------------------------------------------------------------- */
// Tier 1 마커 — 라인에 이 표현 중 하나라도 있으면 §22.6 강한 단어 룰 통과.
// "변경 불가 / 무단 사용 금지 / 별도 계약 필수 / 사전 승인 필수" 등 표준
// Tier 1 표현이 들어간 본문은 브랜드 보호 영역이므로 강한 단어 허용.
const TIER1_MARKERS = [
  '(Tier 1)',
  '변경 불가',
  '제거 불가',
  '사용 불가',
  '대체 불가',
  '분리 불가',
  '결합 불가',
  '무단 사용 금지',
  '무단 사용',
  '별도 계약 필수',
  '별도 라이선스 계약 필수',
  '사전 승인 필수',
  '사전 승인 필요',
  '병기 필수',
  '✗',
  '권장하지 않',
];

const RULES = [
  /* === §22.6 강한 단어 정제 — Tier 2에만 적용 ====================== */
  // Tier 1 마커가 있는 라인은 통과. Tier 2 본문(서체·SNS·한·영 혼용 등)에서
  // "절대·반드시·금지" 사용 시만 위반.
  {
    term: '절대',
    why: '§22.6 — Tier 2 영역에서 강한 표현 회피. Tier 1이면 라인에 마커 추가',
    category: 'strong',
    exemptIfLineHas: TIER1_MARKERS,
  },
  {
    term: '반드시',
    why: '§22.6 — Tier 2 영역에서 "권장합니다" / 평서문으로',
    category: 'strong',
    exemptIfLineHas: TIER1_MARKERS,
  },
  {
    term: '금지',
    why: '§22.6 — Tier 1만 허용 ("무단 사용 금지" 등). Tier 2면 "권장하지 않음"',
    category: 'strong',
    exemptIfLineHas: TIER1_MARKERS,
  },
  {
    term: '위반',
    why: '§22.6 — 가이드 본문 사용 X (사무국 내부 용어)',
    category: 'strong',
    exemptIfLineHas: TIER1_MARKERS,
  },
  {
    term: '불가',
    why: '§22.6 — Tier 1만 허용 ("변경 불가" 등). Tier 2면 "사용하지 않음"',
    category: 'strong',
    exemptIfLineHas: TIER1_MARKERS,
  },
  {
    term: '하지 말 것',
    why: '§22.6 — "피해주세요" / "자제해주세요" 사용',
    category: 'strong',
  },

  /* === §22.10 브랜드 표기 룰 ========================================== */
  {
    term: 'Beauty&Derma Seoul',
    why: '§22.10 — "BEAUTY&DERMA SEOUL" (전부 대문자, 앰퍼샌드 양옆 공백 없음)',
    category: 'brand',
  },
  {
    term: 'Beauty & Derma',
    why: '§22.10 — "BEAUTY&DERMA SEOUL" (전부 대문자, 앰퍼샌드 양옆 공백 없음)',
    category: 'brand',
  },
  {
    term: 'Beauty&Derma',
    why: '§22.10 — "BEAUTY&DERMA SEOUL" / 색 라벨에서만 "BEAUTY&DERMA Purple"',
    category: 'brand',
  },
  {
    term: 'Medicomtek',
    why: '§22.10 — "MedicomteK" 카멜케이스 (Medicom + te + K)',
    category: 'brand',
    // "MedicomteK" 안의 부분 매치 회피 + PascalCase 코드 식별자 제외
    // (예: SpecialZoneMedicomtek, page: 'SpecialZoneMedicomtek')
    exemptIfPrecededBy: ['Medicomte', 'Zone', "'SpecialZone", 'SpecialZone'],
  },
  {
    term: 'Inspire Digital Health',
    why: '§22.10 — "INSPIRE Digital Health" (INSPIRE 전부 대문자)',
    category: 'brand',
  },

  /* === §22.11 디자이너 언어 회피 ===================================== */
  // §8.5 사례 갤러리·§11 applications·§14 권한 매트릭스 등 라벨에 적용.
  {
    term: '기업 명조체',
    why: '§22.11 — "차분한 톤 (보수적·전통적 회사)" 사용',
    category: 'designer',
  },
  {
    term: '산업 디자인 톤',
    why: '§22.11 — "정밀·기술적 회사" 사용',
    category: 'designer',
  },
  {
    term: '큰 디스플레이 톤',
    why: '§22.11 — "광고·헤드라인" 사용',
    category: 'designer',
  },
  {
    term: '굵은 임팩트 톤',
    why: '§22.11 — "광고·헤드라인" 사용',
    category: 'designer',
  },
  {
    term: '미니멀 캡션 톤',
    why: '§22.11 — "명함 옆면·이메일 시그니처" 사용',
    category: 'designer',
  },
  {
    term: '수치 동반 톤',
    why: '§22.11 — "수치 강조" 사용',
    category: 'designer',
  },
  {
    term: '시각 흐름',
    why: '§22.11 — "시각적 일관성" 사용',
    category: 'designer',
  },

  /* === §22.X 가이드틱 표현 회피 (신규, ERRATA 2026-05-08) ============= */
  {
    regex: /자유\s*조판/,
    why: '§22.X — "표기" / "사양" 사용 ("자유 X" 형용사 조합 회피)',
    category: 'guide-ish',
  },
  {
    regex: /자유\s*표기/,
    why: '§22.X — "표기" 단독 사용',
    category: 'guide-ish',
  },
  {
    term: '강제가 아닌 권장',
    why: '§22.X — "권장 사항" 사용 (군더더기 제거)',
    category: 'guide-ish',
  },
  {
    term: '결로 코드 렌더',
    why: '§22.X — "톤으로 코드 렌더" 사용 ("결로" 디자이너 언어)',
    category: 'guide-ish',
  },
  {
    term: '어울리는 결로',
    why: '§22.X — "어울리는 톤으로" 사용',
    category: 'guide-ish',
  },
  {
    term: '라틴 폰트',
    why: '§22.X — "영문 폰트" 사용 (디자이너 전문 용어)',
    category: 'guide-ish',
  },
  {
    term: '라틴 문자',
    why: '§22.X — "영문 문자" 사용',
    category: 'guide-ish',
  },
  {
    term: '라틴 숫자',
    why: '§22.X — "영문 숫자" 또는 "숫자" 사용',
    category: 'guide-ish',
  },
  {
    term: '라틴 환경',
    why: '§22.X — "영문 환경" 사용',
    category: 'guide-ish',
  },
  {
    term: '권장 조판',
    why: '§22.X — "권장 사양" 사용',
    category: 'guide-ish',
  },
  {
    term: '한·영 혼용 조판',
    why: '§22.X — "한·영 혼용" 사용',
    category: 'guide-ish',
  },
  {
    term: '자유롭게 조판',
    why: '§22.X — "자유롭게 사용" 사용',
    category: 'guide-ish',
  },
  /* === §22.4 용어 통일 (v2027.1 신규) ================================ */
  // v2027.0의 "에셋·락업" 선호를 v2027.1에서 "자산·결합 배치"로 역전.
  // 한국어 일관성·법무 표현 호환성 확보.
  {
    term: '에셋',
    why: '§22.4 — "자산" 사용 (v2027.1 용어 통일)',
    category: 'unified-term',
  },
  {
    term: '락업',
    why: '§22.4 — "결합 배치" 사용 (v2027.1 용어 통일)',
    category: 'unified-term',
  },
  {
    term: '권장 스펙',
    why: '§22.4 — "권장 사양" 사용',
    category: 'unified-term',
  },

  /* === 자산 혼동 방지 (§22.4) ========================================
   * 단순 regex로는 가드레일 본문(§8.5)과 잘못된 일반화를 구분 불가.
   * "워드마크 ~ 다른 폰트로 사용 가능" 같은 명백한 잘못된 일반화 패턴만
   * 좁게 검출. 전반적인 자산 혼동은 사람 검수 영역. */
  {
    regex: /워드마크.*다른 폰트로.*(사용\s*가능|쓸\s*수\s*있|조판\s*가능)/,
    why: '§22.4 — 워드마크 SVG는 다른 폰트로 사용 X. 텍스트 표기와 분리해 표현',
    category: 'asset-confusion',
  },

  /* === 기존 룰 (번역투·마케팅 클리셰) ================================= */
  { term: '프라이머리',           why: '"메인" 사용', category: 'translation' },
  { term: '세컨더리',             why: '"보조" 사용', category: 'translation' },
  { term: '베리언트',             why: '"변형" 또는 "버전" 사용', category: 'translation' },
  { term: '컨텍스트',             why: '"상황", "쓰임새" 사용', category: 'translation' },
  { term: '슬래시컷',             why: '명세 §2 명시 제거 대상', category: 'translation' },
  { term: 'Independent identity', why: '명세 §2 명시 제거 대상', category: 'translation' },
  { term: 'Pattern A',            why: '실제 사용 사례 이름으로', category: 'translation' },
  { term: 'Pattern B',            why: '실제 사용 사례 이름으로', category: 'translation' },
  { term: 'Pattern C',            why: '실제 사용 사례 이름으로', category: 'translation' },
  {
    term: '디자인 시스템',
    why: 'BI 가이드는 자칭하지 않음 — "BI 가이드" 사용',
    category: 'translation',
    // "회사 디자인 시스템" (참가업체 회사의 디자인 시스템)은 OK
    exemptIfPrecededBy: ['회사 ', '회사'],
  },
  { term: '~ 처리입니다',         why: '단정적 "~합니다" 체로', category: 'translation' },
  { term: '본 시스템',            why: '단정적 표현으로', category: 'translation' },
  { term: '컬러풀',               why: '마케팅 클리셰', category: 'cliche' },
  { term: '클린한',               why: '마케팅 클리셰', category: 'cliche' },
  { term: '모던한',               why: '마케팅 클리셰', category: 'cliche' },
  { term: '을 가집니다',          why: '"~입니다", "~합니다" 사용', category: 'translation' },
  { term: '를 가집니다',          why: '"~입니다", "~합니다" 사용', category: 'translation' },
];

const CATEGORY_LABELS = {
  strong:          '§22.6 강한 단어 (Tier 2)',
  brand:           '§22.5 브랜드 표기',
  designer:        '§22.11 디자이너 언어',
  'guide-ish':     '§22.X 가이드틱 표현',
  'unified-term':  '§22.4 용어 통일 (v2027.1)',
  'asset-confusion': '§22.4 자산 혼동',
  translation:     '번역투',
  cliche:          '마케팅 클리셰',
};

/* ---------- 검사 대상 -------------------------------------------------- */
const SCAN = [
  { dir: 'components', match: /\.jsx$/ },
  { dir: 'components', match: /^config\.js$/ },
  { dir: 'content',    match: /\.json$/ },
];

/* ---------- 구현 ------------------------------------------------------- */
function* walkFlat(dir, match) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!match.test(entry.name)) continue;
    yield path.join(dir, entry.name);
  }
}

function findFiles() {
  const files = [];
  for (const rule of SCAN) {
    const dir = path.join(ROOT, rule.dir);
    for (const f of walkFlat(dir, rule.match)) files.push(f);
  }
  return files;
}

function lineExempt(line) {
  // 라인 끝 `// allow-tone` 또는 `/* allow-tone */` 주석은 모든 룰 통과
  return /\/\/\s*allow-tone\b|\/\*\s*allow-tone\s*\*\//.test(line);
}

function ruleExempt(line, idx, matchLen, rule) {
  if (rule.exemptIfPrecededBy) {
    for (const phrase of rule.exemptIfPrecededBy) {
      const start = idx - phrase.length;
      if (start >= 0 && line.slice(start, idx) === phrase) return true;
    }
  }
  if (rule.exemptIfLineHas) {
    for (const marker of rule.exemptIfLineHas) {
      if (line.includes(marker)) return true;
    }
  }
  return false;
}

function fileExempt(file, rule) {
  if (!rule.exemptFiles) return false;
  const rel = relPosix(file);
  return rule.exemptFiles.some(p => rel.includes(p));
}

function findMatches(line, rule) {
  const out = [];
  if (rule.term) {
    let from = 0;
    while (true) {
      const idx = line.indexOf(rule.term, from);
      if (idx === -1) break;
      out.push({ idx, len: rule.term.length, term: rule.term });
      from = idx + rule.term.length;
    }
  } else if (rule.regex) {
    const re = new RegExp(rule.regex.source, rule.regex.flags.includes('g') ? rule.regex.flags : rule.regex.flags + 'g');
    let m;
    while ((m = re.exec(line)) !== null) {
      out.push({ idx: m.index, len: m[0].length, term: m[0] });
    }
  }
  return out;
}

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (lineExempt(line)) continue;
    for (const rule of RULES) {
      if (fileExempt(file, rule)) continue;
      const matches = findMatches(line, rule);
      for (const m of matches) {
        if (ruleExempt(line, m.idx, m.len, rule)) continue;
        hits.push({
          line: i + 1,
          col:  m.idx + 1,
          term: m.term,
          why:  rule.why,
          category: rule.category || 'misc',
          snippet: line.trim().slice(0, 140),
        });
      }
    }
  }
  return hits;
}

function relPosix(p) {
  return path.relative(ROOT, p).split(path.sep).join('/');
}

function main() {
  const files = findFiles();
  const byFile = [];
  let total = 0;
  const byCategory = Object.create(null);
  for (const file of files) {
    const hits = checkFile(file);
    if (hits.length) {
      byFile.push({ file: relPosix(file), hits });
      total += hits.length;
      for (const h of hits) {
        byCategory[h.category] = (byCategory[h.category] || 0) + 1;
      }
    }
  }

  if (total === 0) {
    console.log(`✓ §22 톤 검수 통과 — ${files.length}개 파일 검사, 위반 0건.`);
    process.exit(0);
  }

  console.log(`✗ §22 톤 검수 — ${total}건 (${byFile.length}개 파일):\n`);

  // 카테고리별 요약
  const cats = Object.keys(byCategory).sort((a, b) => byCategory[b] - byCategory[a]);
  console.log('카테고리별:');
  for (const cat of cats) {
    const label = CATEGORY_LABELS[cat] || cat;
    console.log(`  ${label}: ${byCategory[cat]}건`);
  }
  console.log('');

  // 파일별 상세
  for (const entry of byFile) {
    console.log(`  ${entry.file}`);
    for (const h of entry.hits) {
      const cat = CATEGORY_LABELS[h.category] || h.category;
      console.log(`    ${h.line}:${h.col}  [${cat}]  "${h.term}"`);
      console.log(`      → ${h.why}`);
      console.log(`      │ ${h.snippet}`);
    }
    console.log('');
  }
  console.log('규칙:');
  console.log('  · 페이지 본문에서 위 표현을 발견하면 즉시 정정.');
  console.log('  · 의도된 사용(메타 룰 표·✗ 예시 등)은 라인 끝 `// allow-tone` 주석으로 통과 가능.');
  console.log('  · 컨텍스트 예외(예: "회사 디자인 시스템", "✗" 메타 라인)는 룰에 자동 화이트리스트.');
  process.exit(1);
}

main();
