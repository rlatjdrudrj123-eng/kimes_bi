# CLAUDE.md

이 파일은 Claude Code(또는 다른 AI 코딩 에이전트)가 이 리포에서 작업할 때
참고하는 프로젝트 메모입니다.

## 프로젝트 개요

KIMES 2027 (제42회 국제 의료기기·병원설비 전시회) 참가업체용 BI 가이드
사이트. 정적 React + Babel-standalone 페이지. 콘텐츠는 일부 legacy 영역만
`content/*.json`에 있고, §9~§15 새 페이지 데이터는 React 컴포넌트 안 const
배열에 박혀있음. 편집은 `/admin/`의 Sveltia CMS (GitHub OAuth) 또는 헤더
KIMES 로고 5x 클릭으로 열리는 인플레이스 에디터로 GitHub 커밋. CMS 콘텐츠
풀 매핑은 ContentLoader 확장 작업이 별도로 필요.

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

## 운영 도구

- `.brand-mark` className의 5x 클릭 트리거 — 헤더 KIMES 로고. content-editor.js
- `#admin` / `#edit` URL 해시 트리거 — 같은 인플레이스 에디터 진입점
- `/admin/` Sveltia CMS — GitHub OAuth 인증 (Netlify 자동 프록시 사용),
  콘텐츠를 main 브랜치에 직접 커밋
- content-editor.js의 GitHub Publish 버튼 — 인플레이스 편집 → PAT 커밋

헤더·사이드바·로고·네비를 수정할 때 위 트리거가 깨지지 않는지 먼저 확인.

### 인증 설정 메모

- admin/index.html은 Sveltia CMS 스크립트만 로드 — Netlify Identity widget
  은 사용하지 않음 (git-gateway backend 전용). 두 인증 방식을 혼재하면
  로그인 실패하므로 분리 유지.
- admin/config.yml의 `backend.name: github` + repo 매핑이 진실의 출처.
  Netlify가 자동으로 GitHub OAuth 프록시(api.netlify.com)를 제공해
  별도 OAuth App 등록 불필요.

### 콘텐츠 매핑 한계 (현재)

§9~§15 페이지의 데이터(FAQ 항목·Application 타일·Permission 매트릭스 등)
는 React 컴포넌트 안 const 배열에 박혀있어 CMS 편집으로 직접 수정 불가.
CMS는 legacy `content/*.json`(intro / color / typography / logo /
typography-in-use / logo-rules / logo-lockup / asset-library) 영역만
실시간 반영.

자산 다운로드 URL 관리·페이지 콘텐츠 풀 편집은 ContentLoader 확장 + 컴포
넌트 리팩터(const → JSON) 작업이 필요. 우선순위는 자산 status 토글 + 자산
URL 관리부터.

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
