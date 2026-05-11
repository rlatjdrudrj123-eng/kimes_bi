# KIMES 2027 BI 가이드 — 리라이트 v2

> 8만 관람객 글로벌 전시회 격에 맞춘 개조식 톤 적용본.
> 기존 v2027.0 대비 분량 약 35% 감축, UI 설명 제거, 영문 병기 정리,
> 브랜드 보호 영역(Tier 1) / 실무 권장 영역(Tier 2) 톤 분리.

---

## 부록 A. 톤 규칙 (개정 §22)

### §22.1 톤 2단 분리 — 핵심 원칙

가이드 전반에서 두 가지 톤을 분리하여 사용한다.

**Tier 1 — 브랜드 보호 영역**
KIMES의 등록상표·공식 자산 보호와 직결되는 영역. 단정적·법적 효력 있는 표현 사용.

- 적용 대상: 워드마크 변형 / 미승인 라이선스 표현 / 무단 굿즈·광고 / 회차·연도 오기 / 위조·도용
- 표준 표현: **"변경 불가 / 무단 사용 금지 / 별도 계약 필요 / 사전 승인 필수"**

**Tier 2 — 실무 권장 영역**
참가업체의 자유 재량이 인정되는 영역. 권장·비권장 톤.

- 적용 대상: 서체 / 컬러 매칭 정도 / SNS 태그 / 부스 락업 비율 / 한·영 혼용
- 표준 표현: **"권장 / 권장하지 않음 / 피해주세요"**

### §22.2 문장 형식 — 개조식 기본

- BI 본문은 명사·체언 종결을 기본으로 한다.
- "~하시면 됩니다 / 받으실 수 있습니다 / ~해 주세요"는 사용자 액션 안내 자리(버튼 호버·툴팁·신청 절차)에 한해 사용.
- 본문에 UI·기능 설명을 넣지 않는다 ("Copy 버튼으로 클립보드에..." 같은 잉여 설명 제거).

### §22.3 영문 병기 — 자리 제한

영문 병기는 다음 자리에만 허용:
- 메타데이터 표 (행사 명칭·일정·장소)
- 보일러플레이트 4벌
- 14개 카테고리명
- 공식 채널·연락처

페이지 H1·H2·UI 라벨은 한글 단독 (글로벌 nav와 URL slug는 영문).

### §22.4 용어 통일

| 사용 | 미사용 |
|---|---|
| 자산 | 에셋 |
| 결합 배치 | 락업 |
| 변형 | 베리언트 |
| 메인·보조 | 프라이머리·세컨더리 |
| 어떤 자리에 | 컨텍스트에 |
| 권장 사양 | 권장 스펙 |

### §22.5 브랜드 표기 룰

- KIMES (대문자)
- MedicomteK (camelCase, 단일어)
- BEAUTY&DERMA SEOUL (대문자, & 양옆 공백 없음)
- INSPIRE Digital Health (대문자 + 일반 표기)

### §22.6 강한 표현 사용 가이드

이전 v2027.0에서 "절대·반드시·금지" 등을 일률 회피했으나, **Tier 1 영역에서는 표준 등록상표 보호 언어로 허용한다.**

- ✓ Tier 1 본문: "워드마크 변형 불가" "무단 사용 금지"
- ✓ Tier 2 본문: "Pretendard 사용 권장"
- ✗ 혼용 금지: Tier 2 자리에 "반드시 사용" 등 강한 표현 사용 금지

검수 스크립트: `node scripts/check-tone.js` — Tier 구분 적용.

---

## §0. 사이트 메타데이터

| 항목 | 값 |
|---|---|
| 행사명 (KR) | 제42회 국제 의료기기·병원설비 전시회 KIMES 2027 |
| 행사명 (EN) | KIMES 2027 — Korea International Medical & Hospital Equipment Show |
| 약식 | KIMES 2027 |
| 약칭 | KIMES |
| 회차 | 제42회 / 42nd edition |
| 일정 | 2027.03.18(목) – 03.21(일) / March 18–21, 2027 |
| 장소 | 코엑스 (서울 강남구 영동대로 513) / COEX, Seoul |
| 홀 | Hall A (1F) · Hall B–E (3F) |
| 주최 | 한국이앤엑스 / KOREA E&EX INC. |
| 공동주최 | KMDA · KMDIA |
| 주관 | KIMES 사무국 / KIMES Secretariat |
| 문의 | kimes@kimes.kr · 02-551-0102 |
| 가이드 버전 | v2027.1 |
| 갱신일 | 2026-05-11 |

**규모 (2027 잠정 / 2026 실적)**
- 참가업체 1,400+
- 참가국 60+
- 관람객 80,000+
- 전시 카테고리 14

**컬러 체계 (Primary 3 · Sub 4)**
- KIMES Red `#E60012` · Pantone 185 C
- KIMES Black `#231815` · Pantone Black 6 C
- KIMES White `#FFFFFF`
- MedicomteK Blue `#036EB8` · Pantone 285 C
- BEAUTY&DERMA Purple `#5D3B8B` · Pantone 2685 C
- INSPIRE Lime `#BFD633` · Pantone 382 C
- Neutral Gray `#A7A9AC`

---

## §1. 랜딩 (/)

### 1.1 Hero

**KIMES 2027 참가업체를 위한 공식 브랜드 자산과 사용 가이드**

[로고 다운로드] [가이드 보기]

**행사 일정** — 2027.03.18 – 03.21 · COEX Seoul

### 1.2 대상

**이 가이드 사용 대상**
- KIMES 2027 참가업체 마케팅·디자인 담당자
- 참가업체 외주 대행사 (PR · 디자인 · 영상)
- 특별관 참가업체 (MedicomteK · BEAUTY&DERMA SEOUL · INSPIRE Digital Health)

**별도 안내**
- 일반 관람객 → kimes.kr
- 언론사 → 프레스룸
- 스폰서 → 별도 스폰서 키트

### 1.3 Quick Links

| 자료 | 위치 |
|---|---|
| 공식 명칭 (한·영) | /overview |
| 로고 다운로드 | /logo |
| 보일러플레이트 4벌 | /overview |
| 통합 자산 패키지 | /downloads |

### 1.4 변경 이력

- 2026-05-11 — v2027.1 — 톤 개정, 분량 감축
- 2026-04-15 — 특별관 BI 추가
- 2026-03-20 — 공식 보일러플레이트 한·영 갱신

[전체 변경 이력 → /changelog]

### 1.5 문의

가이드 외 사용 사례 — kimes@kimes.kr (영업일 3~5일 회신)

---

## §2. 한눈에 보기 (/overview)

**공식 명칭·일정·보일러플레이트·핵심 숫자.** 보도자료·홈페이지·SNS·이메일에 그대로 복사.

### 2.1 공식 명칭

| 구분 | 한국어 | 영문 |
|---|---|---|
| 정식 | 제42회 국제 의료기기·병원설비 전시회 KIMES 2027 | KIMES 2027 — Korea International Medical & Hospital Equipment Show |
| 약식 | KIMES 2027 | KIMES 2027 |
| 약칭 | KIMES | KIMES |

보도자료 첫 등장 시 정식 명칭, 이후 약칭. 따옴표·이탤릭 사용 불가.

### 2.2 일정 · 장소

| 구분 | 한국어 | 영문 |
|---|---|---|
| 기간 | 2027년 3월 18일(목) ~ 21일(일) | March 18–21, 2027 |
| 장소 | 코엑스 (서울 강남구 영동대로 513) | COEX, Seoul |
| 홀 | Hall A (1층) · Hall B–E (3층) | Hall A, B, C, D, E |
| 주최 | 한국이앤엑스 · KMDA · KMDIA | KOREA E&EX INC. with KMDA and KMDIA |

### 2.3 보일러플레이트 (한·영 × 4벌)

#### 40자 — SNS·메일 제목

- **KR**: 한국 최대 의료기기 전시회 KIMES 2027, 3월 18~21일 코엑스
- **EN**: KIMES 2027 · Mar 18–21 · COEX, Seoul

#### 100자 — 보도자료 리드

- **KR**: KIMES 2027은 1,400여 개 기업과 8만여 명이 참여하는 한국 최대 의료기기 전시회. 3월 18~21일 코엑스 개최.
- **EN**: KIMES 2027 — Korea's largest medical equipment show. 1,400+ exhibitors, 80,000+ trade visitors.

#### 200자 — 회사 소개·블로그

- **KR**: KIMES는 한국이앤엑스가 KMDA·KMDIA와 1980년부터 매년 개최한 대한민국 대표 의료기기·병원설비 전시회. 2027년 제42회를 맞아 3월 18~21일 코엑스에서 개최. 60여 개국 1,400여 개 기업이 참가하여 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리 전시.
- **EN**: Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, KIMES is Korea's largest medical equipment show. KIMES 2027 (42nd edition) runs March 18–21 at COEX with 1,400+ exhibitors from 60+ countries.

#### 400자 — 보도자료 회사 소개

- **KR**: KIMES는 한국이앤엑스가 KMDA·KMDIA와 1980년부터 매년 개최한 대한민국 대표 의료기기·병원설비 전시회. 2027년 제42회를 맞아 3월 18일부터 21일까지 코엑스에서 개최. 60여 개국 1,400여 개 기업이 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리의 최신 의료기기와 병원설비 전시. 의료진·연구자·구매 담당자 등 8만여 명 참관. KIMES 2027은 MedicomteK, BEAUTY&DERMA SEOUL, INSPIRE Digital Health 세 개 특별관 운영.
- **EN**: Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, KIMES is Korea's largest medical equipment show. The 42nd edition (KIMES 2027) runs March 18–21 at COEX, Seoul, with 1,400+ exhibitors from 60+ countries in 14 categories. KIMES 2027 hosts MedicomteK, BEAUTY&DERMA SEOUL, and INSPIRE Digital Health as special zones, with 80,000+ trade visitors — clinicians, researchers, hospital purchasers.

> 보도자료 템플릿 (.docx) → /downloads

### 2.4 핵심 숫자

- 1,400+ 참가업체 (2027 잠정)
- 60+ 참가국 (2027 잠정)
- 80,000+ 관람객 (2026 실적)
- 14 전시 카테고리

### 2.5 전시 카테고리 (14)

| # | 한국어 | English |
|---|---|---|
| 01 | 영상진단기기 및 용품 | Imaging diagnostics |
| 02 | 진찰 및 진단 관련기기 | Examination & diagnosis |
| 03 | 수술 관련 기기 | Surgical instruments |
| 04 | 병원설비 및 응급장비 | Hospital & emergency |
| 05 | 피부미용 / 뷰티케어 | Beauty & skincare |
| 06 | 치료 관련 기기 | Therapeutic devices |
| 07 | 물리치료 / 재활 / 예방 | Rehabilitation |
| 08 | 한의학 관련 | Korean medicine |
| 09 | 의료 IT 시스템 | Medical IT systems |
| 10 | 부품 / 소재 | Parts & materials |
| 11 | 일회용 의료용품 | Disposable supplies |
| 12 | 서비스 및 비즈니스 | Services & business |
| 13 | 임상 및 검사 | Clinical & testing |
| 14 | 바이오 / 제약 | Bio & pharmaceuticals |

카테고리별 부스 위치·참가업체 명단 — 행사 직전 kimes.kr 공개.

### 2.6 공식 채널

- 공식 사이트 — kimes.kr
- 문의 — kimes@kimes.kr · 02-551-0102
- 인스타그램 — @kimes_official
- 링크드인 — /company/kimes
- 유튜브 — /@kimes

---

## §3. 로고 (/logo)

**KIMES 워드마크 자산과 사용 규정.** 변형·재타이핑·임의 색상 변경 **불가** (Tier 1).

### 3.1 워드마크

[KIMES 워드마크]

1980년 첫 행사 이래 사용된 KIMES 공식 워드마크. KIMES Red 색상의 산세리프 워드마크와 `i` 안의 검은 쐐기로 구성. 세 요소(색·자형·쐐기)는 분리·변형 불가.

### 3.2 버전 · 포맷

| 버전 | 용도 | 포맷 |
|---|---|---|
| 기본 (Red) | 흰 배경·밝은 사진 위 | SVG · PNG · AI · EPS |
| 화이트 | 빨강·검정·어두운 배경 위 | SVG · PNG · AI · EPS |
| 블랙 | 단색 인쇄·팩스·복사 | SVG · PNG · AI · EPS |
| 그레이 | 본문 내 작은 표기·각주 | SVG · PNG · AI · EPS |

- 벡터 · sRGB (SVG·PNG) · CMYK + Pantone 185 C 별색 (AI·EPS)
- 연도 일체형 워드마크 (예: KIMES 2027 일체형) — 사무국 별도 제공. 요청: kimes@kimes.kr

### 3.3 클리어 스페이스

[다이어그램: 워드마크 + 사방 1X 점선 박스]

- 1X = K 글자 높이
- 점선 안쪽 영역: 타 로고·문구·이미지 배치 불가

### 3.4 최소 크기

| 매체 | 최소 크기 |
|---|---|
| 디지털 | 80 px |
| 인쇄 | 24 mm |

최소 크기 미만 사용 시 `i` 쐐기 식별 불가. 사이니지·대형 인쇄는 명도·해상도 사전 확인.

### 3.5 배경별 사용

**Red 워드마크**
- 명도 0~10% 배경 (흰색·매우 옅은 배경)
- 그 외 배경 → Black 또는 White

**Black 워드마크**
- 명도 0~30% 배경

**White 워드마크**
- 명도 40~100% 배경
- KIMES Red · MedicomteK Blue · BEAUTY&DERMA Purple 배경
- 그 외 어두운 채도 배경

**Gray 워드마크**
- 본문 내 톤다운 자리 (각주·작은 표기)
- INSPIRE Lime · Neutral Gray 배경

### 3.6 금지 사용 (Tier 1)

다음 사용은 **금지**한다. 발견 시 사무국이 정정·중단을 요청한다.

1. 색 변경 (Red·White·Black·Gray 외)
2. 비율 변형 (가로·세로 늘이기·찌그러뜨리기)
3. 워드마크 위 텍스트·그래픽 중첩
4. `i` 쐐기 제거·변형
5. 저해상도 이미지 사용 (벡터 또는 고해상도 PNG 필수)
6. 비공식 워드마크 사용 (/logo 외부 출처)
7. 회사 로고와의 강제 결합 (단일 합성 로고 제작)

### 3.7 사전 승인 필요 사용

다음 사용은 **사전 승인 필수** (kimes@kimes.kr · 영업일 3~5일).

- 굿즈·기념품 제작
- 영상물 노출 (TVC·바이럴·웨비나)
- 외부 미디어 광고
- 가이드 외 신규 사용 사례

신청 절차 → /permissions §8.4

---

## §4. 컬러 (/color)

**메인 3색 (KIMES 공식 표기) · 보조 4색 (특별관·톤다운).**

### 4.1 메인 컬러

**KIMES Red**
- HEX `#E60012` · RGB `230 0 18` · CMYK `0 100 100 0` · Pantone `185 C`

**KIMES Black**
- HEX `#231815` · RGB `35 24 21` · CMYK `0 0 0 100` · Pantone `Black 6 C`

**KIMES White**
- HEX `#FFFFFF` · RGB `255 255 255` · CMYK `0 0 0 0`

### 4.2 보조 컬러

| 컬러 | 용도 | HEX | Pantone |
|---|---|---|---|
| MedicomteK Blue | MedicomteK 특별관 | `#036EB8` | 285 C |
| BEAUTY&DERMA Purple | BEAUTY&DERMA SEOUL 특별관 | `#5D3B8B` | 2685 C |
| INSPIRE Lime | INSPIRE Digital Health 특별관 | `#BFD633` | 382 C |
| Neutral Gray | 톤다운 | `#A7A9AC` | — |

### 4.3 사용 원칙

- 메인 3색 — KIMES 워드마크와 공식 표기 자리
- 보조 4색 — 특별관 표기·톤다운 자리. 메인 대체 불가 (Tier 1)
- 참가업체 자체 브랜드 컬러 — 그대로 유지
- 인쇄물 — CMYK + Pantone 별색 병기 권장

### 4.4 다운로드

- Adobe Swatch (.ase) — Illustrator·Photoshop·InDesign
- Sketch 팔레트 (.sketchpalette)
- Figma 라이브러리 (외부 링크)

**CSS Variables**

```css
:root {
  --kimes-red:   #E60012;
  --kimes-black: #231815;
  --kimes-white: #FFFFFF;
  --mc-blue:     #036EB8;
  --bd-purple:   #5D3B8B;
  --in-lime:     #BFD633;
  --kimes-gray:  #A7A9AC;
}
```

---

## §5. 타이포그래피 (/typography)

**자산 2종 (워드마크 SVG · 텍스트 표기) · 권장 서체 · 권장 사양.**

### 5.1 자산 2종

**자산 1 — KIMES 워드마크 (SVG)**
공식 자산. 변형 불가 (Tier 1).
- 보도자료 헤더
- 부스 인증 마크
- 공문·계약서 헤더

**자산 2 — KIMES 텍스트 표기**
"KIMES" 4글자 텍스트. 회사 디자인 시스템 내 자유 사용 (Tier 2).
- 부스 그래픽·광고 카피
- SNS 콘텐츠
- 사내 발표 자료·영상 자막

### 5.2 권장 서체

**Montserrat** (영문) + **Pretendard** (한글) — 둘 다 무료·오픈소스.

굵기 800 ExtraBold 또는 700 Bold 권장 (부스·인쇄물 가독성).

- Montserrat → Google Fonts
- Pretendard → GitHub

### 5.3 권장 사양 (텍스트 표기)

[샘플: KIMES 2027 — 참가 · EXHIBITOR]

| 항목 | 권장 사양 |
|---|---|
| 메인 라인 | Montserrat 800 ExtraBold · 18pt 환산 |
| 보조 라인 | Pretendard 700 Bold · 11pt 환산 |
| 색 | KIMES Red 또는 KIMES Black |
| 한·영 혼용 | 숫자·영문 약어·브랜드명은 Montserrat |

회사 디자인 시스템에 맞춰 자유 조정 가능 (Tier 2).

### 5.4 자산 선택 기준

**워드마크 SVG 자리** — 공식 보증·증명 영역 (보도자료 헤더·부스 인증 마크·공문 헤더). 타 폰트로 타이핑한 "KIMES" 대체 불가.

**텍스트 표기 자리** — 마케팅·콘텐츠 영역. 회사 폰트·컬러 자유 사용.

---

## §6. 표기 규칙 (/notation)

**명칭·날짜·숫자·구분 기호·SNS 태그·별도 계약 필요 표현.**

### 6.1 명칭 표기

| 상황 | OK | 사용 불가 |
|---|---|---|
| 첫 등장 | KIMES 2027 (Korea International Medical & Hospital Equipment Show) | 풀네임 생략 |
| 두 번째부터 | KIMES | "킴스" · 소문자 "kimes" |
| 따옴표 | 사용 불가 | "KIMES" |
| 이탤릭 | 사용 불가 | *KIMES* |
| 한글 음차 | 사용 불가 | 킴스 · 킴즈 · 케이아이엠이에스 |

### 6.2 회차

- 한국어 — 제42회 KIMES 2027
- 영문 — KIMES 2027 — 42nd edition
- 회차 숫자 — 아라비아 숫자 (한자·한글 사용 불가)

### 6.3 날짜 · 시간

| 항목 | 한국어 | 영문 |
|---|---|---|
| 단일 | 2027년 3월 18일 | March 18, 2027 |
| 요일 | 2027년 3월 18일(목) | Thursday, March 18, 2027 |
| 범위 | 2027년 3월 18일~21일 | March 18–21, 2027 |
| 월 | 2027년 3월 | March 2027 |
| 시간 | 오전 10시 ~ 오후 5시 | 10:00–17:00 KST |

범위 구분 — 한글 `~` 또는 en-dash `–`. hyphen `-` 사용 불가.

### 6.4 장소 · 부스

| 항목 | OK | 사용 불가 |
|---|---|---|
| 장소 | 코엑스 / COEX | 코엑스 컨벤션센터 |
| 홀 | Hall A · Hall B–E | A홀 · B-E홀 |
| 부스 (EN) | Booth A-101 | booth a101 · A101 |
| 부스 (KR) | 부스 A-101 | A-101부스 |

### 6.5 숫자

- 천 단위 콤마 — 1,400 / 80,000
- 약식 큰 수 — 1,400+ 또는 1,400여
- 가격 — ₩50,000 / KRW 50,000

### 6.6 구분 기호

| 기호 | 용도 | 예시 |
|---|---|---|
| em-dash `—` | 강조·부제 | KIMES 2027 — 등록 시작 |
| en-dash `–` | 범위 | March 18–21 |
| middle dot `·` | 메타 구분 | 보도자료 · PRESS |
| slash `/` | 한·영 병기 | 참가 / EXHIBITOR |

### 6.7 SNS 태그

- 공식 태그 — `@kimes_official`
- 해시태그 — `#KIMES2027 #KIMES #COEX #의료기기전시회`

### 6.8 별도 계약 필요 표현 (Tier 1)

다음 표현은 **별도 라이선스 계약 필수**. 무단 사용 금지.

- KIMES 공식 파트너 / Official Partner of KIMES
- KIMES 추천 / KIMES Recommended
- KIMES 인증 / KIMES Certified
- KIMES 후원 / Sponsored by KIMES
- KIMES 주최 / Organized by KIMES
- KIMES 로고와 회사 로고의 합성 신규 로고
- "KIMES 2027 official ___" 형태 전반

라이선스 문의 → kimes@kimes.kr · 02-551-0102

---

## §7. 특별관 (/special-zones)

**KIMES 2027 산하 3개 서브 브랜드 전시.** 각 특별관은 KIMES 마스터 브랜드 아래 독자 시각 정체성을 갖는다. 특별관 참가업체는 KIMES 표기와 해당 특별관 표기를 병용한다.

### 7.1 마스터-서브 브랜드 관계

- **마스터 브랜드** — KIMES (Red `#E60012`)
- **서브 브랜드** — MedicomteK · BEAUTY&DERMA SEOUL · INSPIRE Digital Health

특별관 단독 표기는 특별관 내부에서만 허용. 외부 자료(보도자료·홈페이지·SNS)에서는 KIMES 마스터 브랜드와 병기 (Tier 1).

[다이어그램: KIMES 마스터 + 3개 서브 브랜드 결합 배치 예시]

### 7.2 MedicomteK · 메디콤텍

**CONNECTED CARE**
Medical communication & connected care technologies

| 항목 | 값 |
|---|---|
| 포지셔닝 | 의료 커뮤니케이션·커넥티드 케어 기술 전문관 |
| 타깃 참가업체 | 의료 IT·원격진료·의료 통신 솔루션 기업 |
| 타깃 관람객 | 병원 IT 책임자·의료 통신 구매 담당자 |
| 위치 · 일정 | Hall B · 2027.03.18–21 |
| 메인 컬러 | MedicomteK Blue `#036EB8` · Pantone 285 C |
| 직전 회차 (2026) | 참가 120사 · 참관 18,000+ |
| 로고 자산 | SVG · PNG · AI · EPS (행사 D-60 공개) |

[부스 헤더 예시 — KIMES + MedicomteK 결합 배치]

### 7.3 BEAUTY&DERMA SEOUL · 뷰티앤더마 서울

**BEAUTY MEETS MEDICINE**
Aesthetic medicine & dermatology — Seoul & Busan editions

| 항목 | 값 |
|---|---|
| 포지셔닝 | 미용의학·피부과 전문관 (서울·부산 에디션) |
| 타깃 참가업체 | 미용기기·피부과 솔루션 기업 |
| 타깃 관람객 | 피부과·성형외과 의료진·바이어 |
| 위치 · 일정 | Hall C · 2027.03.18–21 |
| 메인 컬러 | BEAUTY&DERMA Purple `#5D3B8B` · Pantone 2685 C |
| 직전 회차 (2026) | 참가 180사 · 참관 22,000+ |
| 로고 자산 | SVG · PNG · AI · EPS (행사 D-60 공개) |

[부스 헤더 예시 — KIMES + BEAUTY&DERMA SEOUL 결합 배치]

### 7.4 INSPIRE Digital Health · 인스파이어 디지털 헬스

**HEALTH MEETS INNOVATION**
Digital health, wearables, and healthcare AI

| 항목 | 값 |
|---|---|
| 포지셔닝 | 디지털 헬스·웨어러블·헬스케어 AI 전문관 |
| 타깃 참가업체 | 디지털 헬스 스타트업·플랫폼 기업 |
| 타깃 관람객 | 헬스케어 투자자·디지털 헬스 도입 담당자 |
| 위치 · 일정 | Hall D · 2027.03.18–21 |
| 메인 컬러 | INSPIRE Lime `#BFD633` · Pantone 382 C |
| 직전 회차 (2026) | 참가 90사 · 참관 14,000+ |
| 로고 자산 | SVG · PNG · AI · EPS (행사 D-60 공개) |

[부스 헤더 예시 — KIMES + INSPIRE 결합 배치]

### 7.5 표기 규칙

- 외부 자료 — KIMES 마스터 + 특별관 서브 병기 (Tier 1)
- 내부 자료 (특별관 부스·내부 사이니지) — 특별관 단독 표기 허용
- 결합 배치 비율·간격 — 행사 D-60 공개 자산에 락업 가이드 포함

---

## §8. 권한 · 승인 · 라이선스 (/permissions)

**누가 무엇을 어디까지 사용할 수 있는가.** 사용 권한 매트릭스 · 신청 절차 · 라이선싱.

### 8.1 사용 권한 매트릭스

**권한 3단계**

- **자유 사용 (Free use)** — 신청 없이 사용. 가이드 준수 전제.
- **사전 승인 (Pre-approval)** — 메일 신청. 영업일 3~5일 검토. (Tier 1)
- **별도 계약 (Licensed)** — 라이선스 계약 체결. 영업일 5~10일. (Tier 1)

| 사용 행위 | 자유 | 사전 승인 | 별도 계약 |
|---|:---:|:---:|:---:|
| 회사 보도자료·SNS·홈페이지 "KIMES 2027 참가" 표기 (행사 종료 후 제거) | ✓ | | |
| 마케팅·콘텐츠에 KIMES 텍스트 표기 (회사 폰트·컬러) | ✓ | | |
| 부스 사이니지·인쇄물·카탈로그에 KIMES 워드마크 SVG 사용 | ✓ | | |
| 회사 영업 자료 (PDF·PPT)에 KIMES 참가 표기 | ✓ | | |
| 굿즈·기념품·외부 광고·영상물에 KIMES 워드마크 사용 | | ✓ | |
| "KIMES 공식 파트너" 등 인증·후원 표현 | | | ✓ |

매트릭스 외 사용 사례 — 사무국 협의.

### 8.2 자산 선택 기준

- **워드마크 SVG 자리** — 보증·증명 영역 (보도자료 헤더·부스 인증 마크·공문)
- **텍스트 표기 자리** — 마케팅·콘텐츠 영역 (회사 폰트·컬러 자유 사용)

상세 → /typography

### 8.3 사용 유효 기간 (Tier 1)

"KIMES 2027 참가" 표기는 행사 종료일(2027.03.21)까지 유효.

- 종료 후 — 회사 자료에서 KIMES 로고 제거 또는 "Past Exhibitor (KIMES 2027)" 표기 전환
- 차회 참가 확정 시 — 신규 회차 표기로 갱신

### 8.4 사전 승인 신청

**신청 → 검토 → 회신** (영업일 3~5일)

행사 기간 굿즈 제작 시 행사 D-30 이전 신청 권장 (제작 리드타임 확보).

**신청서 항목**
- 신청 회사
- 담당자·연락처
- 사용 목적 (굿즈·영상·광고 등)
- 사용 매체·노출 채널
- 사용 기간
- 시안 (PDF·이미지 첨부)

[승인 신청서 다운로드 (.docx)] [온라인 신청 →]

### 8.5 라이선스 (Tier 1)

"KIMES 공식 파트너", "KIMES 추천 업체" 등 인증·후원 표현은 **별도 라이선스 계약 필수**. 가격·계약 조건 개별 협의.

[라이선스 문의 →] 제목 `[라이선스 문의]` · kimes@kimes.kr

### 8.6 가이드 위반 (Tier 1)

가이드와 다른 사용 발견 시 사무국이 정정·중단을 요청. 워드마크 변형·미승인 라이선스 표현·무단 굿즈·도용 사례는 법적 조치 대상.

문의 → kimes@kimes.kr

---

## §9. FAQ (/faq)

**사무국이 자주 받는 질문 29개.** 카테고리 필터: 전체 · 로고 · 컬러 · 표기 · 결합 사용 · 권한·승인 · 특별관 · 다운로드 · 행사 일반.

### 로고

**Q1. KIMES 로고 색을 회사 컬러로 변경 가능한가?**
변경 불가 (Tier 1). KIMES Red·White·Black·Gray 4종 중 선택. 회사 컬러로 "KIMES"를 표기하려면 워드마크 SVG 대신 텍스트 표기 사용 → /typography §5.1.

**Q2. 워드마크 `i` 안 검은 쐐기를 제거 가능한가?**
제거 불가 (Tier 1). 워드마크 핵심 디테일.

**Q3. PNG로만 받을 수 있나?**
모든 버전 SVG·PNG·AI·EPS 4포맷 제공. → /downloads

**Q4. 더 큰 해상도 PNG는?**
SVG·AI 벡터 자산 무한 확대 가능. PNG는 최대 4000px 폭 제공.

### 컬러

**Q5. KIMES Red Pantone 번호?**
Pantone 185 C (코팅) / 185 U (비코팅).

**Q6. CMYK 0/100/100/0이 살짝 어둡게 나옵니다.**
종이·인쇄기에 따른 편차. Pantone 185 C 별색 매칭 권장.

### 표기

**Q7. "KIMES"를 "킴스"로 한글 표기 가능한가?**
한글 음차 사용 불가 (Tier 1). 영문 KIMES 그대로.

**Q8. "제42회"를 영문으로?**
"KIMES 2027 — 42nd edition".

**Q9. 보도자료에 풀네임을 매번 사용?**
첫 등장 시 풀네임, 두 번째부터 약칭 "KIMES".

### 결합 사용

**Q10. 부스 헤더에서 회사 로고와 KIMES 로고 비율?**
시각적 무게가 비슷하도록 배치. 픽셀 비율보다 육안 확인 우선 (참고: 약 1 : 0.7).

**Q11. 이메일 서명용 배너?**
/downloads Marketing 카테고리에 4종 (Outlook · Gmail · Apple Mail · 모바일).

**Q12. 명함에 KIMES 표기?**
행사 기간 한정 가능. 종료 후 재인쇄 시 제거 권장.

**Q13. SNS 게시물에 별도 승인?**
일반 게시물 승인 불필요. 캡션에 `@kimes_official` 멘션 권장.

### 권한·승인

**Q14. KIMES 로고 굿즈 제작?**
사전 승인 필수 (Tier 1). kimes@kimes.kr.

**Q15. 회사 외부 광고에 KIMES 로고?**
사전 승인 필수 (Tier 1). 매체·기간·시안 첨부.

**Q16. "KIMES 공식 파트너" 표기 가능한가?**
별도 라이선스 계약 필수 (Tier 1).

**Q17. KIMES 현장 사진을 회사 인터뷰에 사용?**
사진 종류·매체에 따라 상이. kimes@kimes.kr 문의.

**Q18. 영상 인트로 1초 노출도 승인 대상인가?**
노출 시간 무관 사전 승인 필수 (Tier 1).

**Q19. 행사 종료 후 홈페이지 KIMES 참가 표기 유지?**
차회 참가 미확정 시 "Past Exhibitor (KIMES 2027)" 표기 전환 또는 제거.

### 특별관

**Q20. MedicomteK 특별관 참가인데 KIMES 로고 생략 가능한가?**
외부 자료(보도자료·홈페이지)에 KIMES 병기 필수 (Tier 1). 특별관 단독 표기는 특별관 내부 한정.

**Q21. 특별관 로고는 어디서?**
/special-zones 각 특별관별 다운로드. 행사 D-60 공개.

### 다운로드

**Q22. 압축 해제 오류 발생.**
자산 파일명은 영문 통일 (`KIMES_Wordmark_Red.svg` 형식). 해제 도구 — 반디집·7-Zip.

**Q23. AI 파일을 열 수 없습니다.**
SVG·EPS 대체 사용 또는 Inkscape (무료) 사용.

### 행사 일반

**Q24. 부스 위치 배정 기준?**
참가 신청 순서·카테고리·이전 회차 이력 기반. 사무국 배정.

**Q25. 사전등록 마감?**
2027.03.17 23:59 (행사 전일).

**Q26. 부스 설치 시간?**
행사 전일 09:00–21:00. 상세 — 참가업체 매뉴얼.

**Q27. 참가업체 출입증 발급?**
사전등록 시 자동 발급. 행사 첫날 East Gate 참가업체 데스크 수령.

**Q28. 외국인 참가업체 비자 지원?**
초청장 발급 가능. kimes@kimes.kr.

**Q29. 가이드 외 사용 사례?**
kimes@kimes.kr (영업일 3~5일 회신).

---

## §10. 다운로드 (/downloads)

**자산 패키지 통합 다운로드 + 카테고리별 다운로드.**

### 10.1 통합 패키지

**KIMES 2027 BI 패키지** — 워드마크 4종 × 4포맷 · 특별관 3종 · 컬러 팔레트 · 서체 안내 · 표기 가이드 PDF · 보도자료 템플릿 · 부스 헤더 PSD · 미디어 자산.

`.zip` · 약 180 MB · 행사 D-60 공개 (2027.01.17)

[다운로드] *(Coming Soon — 2027.01.17 공개 예정)*

### 10.2 사용 약관

본 자산은 KIMES 2027 참가 표기 목적에 한해 사용 가능. 가이드의 권한 매트릭스(→ /permissions §8.1) 준수 (Tier 1). [체크박스]

### 10.3 카테고리별

#### 로고
- KIMES 워드마크 (4버전 × 4포맷) — 약 8 MB
- MedicomteK 워드마크 — 약 2 MB
- BEAUTY&DERMA SEOUL 워드마크 — 약 2 MB
- INSPIRE Digital Health 워드마크 — 약 2 MB

#### 컬러
- Adobe Swatch (.ase)
- Sketch 팔레트 (.sketchpalette)
- Figma 라이브러리 (외부)
- CSS·SCSS 변수 스니펫

#### 서체
- Montserrat — Google Fonts (외부)
- Pretendard — GitHub (외부)

#### 템플릿
- 보도자료 (한·영) — 120 KB
- 홈페이지 배너 (1920 · 1200 · 모바일) — 1.2 MB
- SNS 카드 (1:1 · 4:5 · 9:16 · OG) — 1.5 MB
- 카탈로그·브로셔 표지 (A4 · Letter) — 480 KB
- 초청 카드 (이메일·SNS·카톡) — 200 KB
- 부스 소개 카드 (A4 · A5) — 240 KB

#### 마케팅 자산
- 공식 포스터 (A2 · A3 세로) — 약 6 MB
- 웹 배너 KV (가로·정방·세로 7종) — 약 4 MB
- 이메일 서명 배너 4종 — 320 KB
- 부스 헤더 PSD 템플릿 — 약 80 MB

#### 문서
- BI 가이드 PDF (인쇄용) — 약 12 MB
- 사전 승인 신청서 (.docx) — 60 KB
- 특별관 가이드 PDF (3종) — 각 약 4 MB

자산 갱신 이력 → /changelog

---

## §11. 문의 · 신청 (/contact)

**3종 문의 채널 — kimes@kimes.kr.** 메일 제목 prefix로 분류 (mailto 링크 자동 적용).

### 11.1 문의 채널

**일반 BI 문의 / General Inquiry**
가이드 외 사용 사례·표기 질문.
- 회신: 영업일 1~2일
- [`[BI 문의]` 메일 →]

**사전 승인 / Pre-approval**
굿즈·광고·영상물 등 사전 승인 대상.
- 회신: 영업일 3~5일 1차 회신
- [`[승인 신청]` 메일 →]

**라이선스 / Licensing**
"공식 파트너" 등 별도 계약 필요 표현.
- 회신: 영업일 5~10일 1차 회신
- [`[라이선스 문의]` 메일 →]

### 11.2 직접 연락

- 메일 — kimes@kimes.kr
- 전화 — 02-551-0102

사전 승인·라이선스 문의 시 매체·기간·시안 (PDF·이미지) 첨부 시 검토 단축.

---

## 부록 B. 사이트 운영 컨텍스트

- 호스팅 — GitHub Pages · GitHub Actions 자동 배포
- CMS — `/admin/` Sveltia CMS (GitHub OAuth) · 헤더 KIMES 로고 5x 클릭 인플레이스 에디터
- CMS 편집 영역 — downloads · faq · permissions · special-zones
- 자산 상태 플래그 — `KIMES_EVENT.assets.status === 'pending'` 시 다운로드 비활성 + "Coming Soon"
- 단일 출처 — `components/config.js` `KIMES_EVENT` 객체
- 사이트 구조 — 9 활성 페이지 + 푸터 /changelog = 11 라우트
- 라이브 URL — https://rlatjdrudrj123-eng.github.io/kimes_bi/

---

*v2027.1 — 톤 2단 분리 적용본. 최종 갱신 2026-05-11.*
