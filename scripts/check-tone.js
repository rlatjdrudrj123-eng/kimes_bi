#!/usr/bin/env node
/* KIMES BI 가이드 — §22 자동 톤 검수
 *
 * 명세 §22가 정한 금지 표현을 구성 요소(.jsx) · 콘텐츠(.json) ·
 * 행사 메타(config.js) 안에서 찾아낸다. 매 페이지 작업 끝에
 * 돌려 Phase 2 막바지의 일괄 검수 부담을 줄이기 위함.
 *
 * 사용:
 *   node scripts/check-tone.js
 *
 * 종료 코드:
 *   0 — 위반 없음
 *   1 — 위반 발견 (CI에서 잡을 수 있게)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* ---------- §22 금지 표현 목록 -----------------------------------------
 * 각 항목: { term, why }
 *   term — 부분 문자열로 검색 (대소문자 구분).
 *   why  — 위반 시 출력할 권장 대체.
 *
 * 명세 §22와 memory의 feedback_kimes_bi_tone.md 기준. 위양성이 잦은
 * 일반어("토큰", "이슈" 등)는 자동 검수에서 제외 — 본문 작성 시
 * 사람이 직접 판단.
 * ------------------------------------------------------------------- */
const FORBIDDEN = [
  { term: '프라이머리',           why: '"메인" 사용' },
  { term: '세컨더리',             why: '"보조" 사용' },
  { term: '베리언트',             why: '"변형" 또는 "버전" 사용' },
  { term: '컨텍스트',             why: '"상황", "쓰임새" 사용' },
  { term: '슬래시컷',             why: '명세 §2 명시 제거 대상' },
  { term: 'Independent identity', why: '명세 §2 명시 제거 대상' },
  { term: 'Pattern A',            why: '실제 사용 사례 이름으로' },
  { term: 'Pattern B',            why: '실제 사용 사례 이름으로' },
  { term: 'Pattern C',            why: '실제 사용 사례 이름으로' },
  { term: '디자인 시스템',        why: 'BI 가이드는 자칭하지 않음 — "BI 가이드" 사용' },
  { term: '~ 처리입니다',         why: '단정적 "~합니다" 체로' },
  { term: '본 시스템',            why: '단정적 표현으로' },
  { term: '컬러풀',               why: '마케팅 클리셰' },
  { term: '클린한',               why: '마케팅 클리셰' },
  { term: '모던한',               why: '마케팅 클리셰' },
  { term: '을 가집니다',          why: '"~입니다", "~합니다" 사용' },
  { term: '를 가집니다',          why: '"~입니다", "~합니다" 사용' },
];

/* ---------- 검사 대상 -------------------------------------------------- */
// `dir`는 ROOT 기준 상대 경로. `match`는 파일명 정규식. flat 디렉토리만
// 훑는다 (현재 components/ · content/ 모두 평면 구조).
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

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const rule of FORBIDDEN) {
      let from = 0;
      while (true) {
        const idx = line.indexOf(rule.term, from);
        if (idx === -1) break;
        hits.push({
          line: i + 1,
          col: idx + 1,
          term: rule.term,
          why: rule.why,
          snippet: line.trim().slice(0, 140),
        });
        from = idx + rule.term.length;
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
  for (const file of files) {
    const hits = checkFile(file);
    if (hits.length) {
      byFile.push({ file: relPosix(file), hits });
      total += hits.length;
    }
  }

  if (total === 0) {
    console.log(`✓ §22 톤 검수 통과 — ${files.length}개 파일 검사, 금지어 0건.`);
    process.exit(0);
  }

  console.log(`✗ §22 톤 검수 실패 — ${total}건 발견 (${byFile.length}개 파일):\n`);
  for (const entry of byFile) {
    console.log(`  ${entry.file}`);
    for (const h of entry.hits) {
      console.log(`    ${h.line}:${h.col}  "${h.term}"  → ${h.why}`);
      console.log(`      │ ${h.snippet}`);
    }
    console.log('');
  }
  console.log('규칙:');
  console.log('  · 페이지 본문에서 위 표현을 발견하면 즉시 정정.');
  console.log('  · 레거시 컴포넌트에 남은 위반은 해당 페이지 작업 시 함께 정리.');
  console.log('  · 의도된 사용(스펙 인용 등)이 있다면 // 주석으로 남기거나 검수 룰을 명시 갱신.');
  process.exit(1);
}

main();
