# CLAUDE.md

이 파일은 Claude Code(또는 다른 AI 코딩 에이전트)가 이 리포에서 작업할 때
참고하는 프로젝트 메모입니다.

## 프로젝트 개요

KIMES 2027 (제42회 국제 의료기기·병원설비 전시회) 참가업체용 BI 가이드
사이트. 정적 React + Babel-standalone 페이지. 현재 §9~§15 페이지 데이터는
React 컴포넌트 안 const 배열로 박혀있고, 일부 legacy 콘텐츠만 `content/`의
JSON에 있음. CMS(/admin/) + 인플레이스 에디터는 Phase 4까지 일시 비활성화
상태 — 콘텐츠 마이그레이션 후 복원 예정.

## 단일 출처

행사 메타데이터(회차·일정·장소·버전·핵심 숫자·컬러·연락처·자산 상태·톤)는
[components/config.js](components/config.js)의 `window.KIMES_EVENT` 객체에
모여 있습니다. 매년 회차 갱신 시 이 파일 한 곳만 수정합니다.

## 작업 명세서

[KIMES_BI_Guide_Spec.md](KIMES_BI_Guide_Spec.md) — 전체 IA·페이지 구성·톤
규칙·디자인 토큰. spec 정정 사항은 [docs/ERRATA.md](docs/ERRATA.md)에 기록.

## 톤 규칙 (§22)

- **§22.2 강제 표현 4개 케이스에만**: KIMES 표기 변형 / 워드마크 SVG 변형 /
  미승인 라이선스 표현 / 회차·연도 오기 — 이 4가지에만 강한 표현 허용.
- **§22.5 영문 H1 + 한글 서브 + 한글 본문**: 페이지 H1·H2와 글로벌 nav,
  UI 마이크로카피는 영문. 본문 단락·실무 라벨은 한글.
- **§22.6 강한 단어 정제**: 가이드 본문에서 "절대·반드시·금지·위반·하지
  말 것·불가" 사용하지 않음. "권장·권장하지 않음·피해주세요" 톤.
- **§22.5 통계 카드 패턴**: 큰 숫자 카드는 숫자·라벨만, 출처는 lede에.

검수 스크립트: `node scripts/check-tone.js`

## 레퍼런스 자료

[references/](references/) 폴더의 자료는 부분적 참고용입니다. 가이드 전체
톤은 KIMES 자체 결을 우선합니다. 자료별 참고 범위는
[references/README.md](references/README.md)에 명시되어 있습니다.

레퍼런스가 추가되더라도 그 자료의 톤·구조·시각 결을 통째로 따라가지
않습니다. 부분적 시스템·시각 처리만 차용합니다.

## 운영 도구 (Phase 2 단계 — 일시 비활성화)

§9~§15 페이지 데이터가 React 컴포넌트 안 const 배열에 박혀있어 CMS 편집이
페이지에 반영되지 않는 상태. Phase 4 재정비 시 콘텐츠 → JSON 마이그레이션
+ 인증 백엔드 통일 후 복원 예정.

- `.brand-mark` className의 5x 클릭 트리거 — content-editor.js (비활성)
- `#admin` / `#edit` URL 해시 트리거 — content-editor.js (비활성)
- `/admin/` Sveltia CMS — admin/index.html은 "준비 중" placeholder
- content-editor.js의 boot()는 `KIMES_EDITOR_DISABLED = true` 플래그로 차단

복원 절차 (Phase 4):
1. content-editor.js 끝부분 `KIMES_EDITOR_DISABLED` 플래그를 false로
2. admin/index.html을 Sveltia CMS 진입 페이지로 복원
3. admin/config.yml backend 설정과 admin/index.html 인증 위젯 일치
   (github OAuth 또는 Netlify Identity + git-gateway 중 하나로 통일)
4. content/*.json과 §9~§15 컴포넌트 const 데이터 매핑 (ContentLoader 확장)

헤더·사이드바·로고·네비를 수정할 때 위 트리거 위치(.brand-mark 등)는 보존
— Phase 4 복원 시 같은 className으로 바인딩.

## 자산 상태 플래그

`KIMES_EVENT.assets.status === 'pending' | 'ready'` — 가이드 전반 다운로드
버튼 동작 일괄 제어. pending 시 disabled + "Coming Soon" 라벨. ready 시
정상 다운로드 링크. Phase 4 자산 패키지 정리 완료 후 'ready'로 토글.

## 커밋 컨벤션

Conventional Commits 형식 사용:
- `feat(§N): ...` — 새 페이지·기능
- `refactor(§N): ...` — 구조·톤 갱신
- `fix(§N.x): ...` — 좁은 정정
- `docs: ...` / `chore: ...` — 비코드

ko 본문 사용. Co-Authored-By 라인 포함.
