# CLAUDE.md

이 파일은 Claude Code(또는 다른 AI 코딩 에이전트)가 이 리포에서 작업할 때
참고하는 프로젝트 메모입니다.

## 프로젝트 개요

KIMES 2027 (제42회 국제 의료기기·병원설비 전시회) 참가업체용 BI 가이드
사이트. 정적 React + Babel-standalone 페이지. 어드민 편집 가능 영역은
`content/*.json` 4개 (downloads / faq / permissions / special-zones), 그
외 페이지 데이터는 React 컴포넌트 안 const 배열. 편집은 `/admin/`의 Sveltia
CMS (GitHub OAuth) 또는 헤더 KIMES 로고 5x 클릭으로 열리는 인플레이스
에디터로 GitHub 커밋.

## 호스팅

GitHub Pages (Netlify에서 이전, 2026-05). main 브랜치 push → .github/
workflows/pages.yml이 GitHub Actions로 자동 배포.

라이브: https://rlatjdrudrj123-eng.github.io/kimes_bi/

설정: repo Settings → Pages → Source: "GitHub Actions" 토글 (1회).

## 단일 출처

행사 메타데이터(회차·일정·장소·버전·핵심 숫자·컬러·연락처·자산 상태·톤)는
[components/config.js](components/config.js)의 `window.KIMES_EVENT` 객체에
모여 있습니다. 매년 회차 갱신 시 이 파일 한 곳만 수정합니다.

## 작업 명세서

[KIMES_BI_Guide_Spec.md](KIMES_BI_Guide_Spec.md) — 전체 IA·페이지 구성·톤
규칙·디자인 토큰. spec 정정 사항은 [docs/ERRATA.md](docs/ERRATA.md)에 기록.

## 톤 규칙 (§22 v2027.1)

- **§22.1 톤 2단 분리** (v2027.1 신규):
  - **Tier 1 (브랜드 보호)** — 워드마크 변형 / 미승인 라이선스 / 무단 굿즈 /
    회차·연도 오기 / 위조·도용. 표준 표현 "변경 불가 / 무단 사용 금지 /
    별도 계약 필수 / 사전 승인 필수". 강한 단어 허용.
  - **Tier 2 (실무 권장)** — 서체 / 컬러 매칭 / SNS 태그 / 부스 결합 배치
    비율 / 한·영 혼용. "권장 / 권장하지 않음 / 피해주세요" 톤만 사용.
- **§22.2 개조식 기본**: 명사·체언 종결 기본. UI 설명("Copy 버튼·클립
  보드·새 탭에서") 본문에 넣지 않음.
- **§22.3 영문 병기 자리 제한**: 메타데이터 표·보일러플레이트·14 카테고리·
  공식 채널만. 페이지 H1·H2·UI 라벨·글로벌 nav는 한글 단독.
- **§22.4 용어 통일** (v2027.1): 자산(← 에셋) · 결합 배치(← 락업) ·
  변형(← 베리언트) · 메인·보조(← 프라이머리·세컨더리) · 권장 사양(← 권장 스펙).
- **§22.5 브랜드 표기**: KIMES (대문자) · MedicomteK (camelCase) ·
  BEAUTY&DERMA SEOUL (대문자, & 양옆 공백 없음) · INSPIRE Digital Health.
- **§22.6 강한 단어**: Tier 1 라인에서만 허용 (라인에 "(Tier 1)" / "변경 불가" /
  "무단 사용 금지" / "사전 승인 필수" 등 마커 포함 시 통과). Tier 2면 위반.

검수 스크립트: `node scripts/check-tone.js` — Tier 분리 적용. 0 hits 유지.

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

### CMS 편집 가능 영역

`content/*.json` 4 파일이 단일 진실의 출처:

- `downloads.json` — 자산 status 토글 + 통합 패키지 + 카테고리별 항목·URL
- `faq.json`        — 자주 묻는 질문 + 카테고리
- `permissions.json` — 권한 매트릭스 6행 + 3단계 + 신청 절차·양식
- `special-zones.json` — 특별관 3종 메타데이터 (컬러는 config.js 단일 출처)

그 외 페이지 데이터(Logo·Color·Typography·Notation 등)는 React 컴포넌트
안 const 배열에서 직접 관리 — 디자인 시스템 코어 데이터라 잦은 편집
대상 아님.

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
