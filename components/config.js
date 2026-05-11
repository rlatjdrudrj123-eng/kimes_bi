/* KIMES BI 가이드 — 행사 메타데이터 단일 출처
 *
 * 사이트 전체에서 회차·일정·버전·숫자 데이터의 단일 진실 공급원(SSoT).
 * 매년 회차 갱신 시 이 파일의 KIMES_EVENT 객체 한 곳만 수정하면
 * 헤더·푸터·랜딩·overview·notation·permissions·changelog 등 모든
 * 페이지가 새 값으로 반영됨.
 *
 * 다른 모듈보다 먼저 로드되어야 한다 (index.html script 순서 참조).
 */

(function () {
  // ---- 행사 본 정보 ------------------------------------------------------
  // 다음 회차로 갱신 시 이 블록만 수정.
  const event = {
    year: 2027,
    edition: 42,
    editionLabel: '제42회',
    editionLabelEn: '42nd edition',
    nameKo: 'KIMES 2027',
    nameEn: 'KIMES 2027',
    fullNameKo: '제42회 국제 의료기기·병원설비 전시회 KIMES 2027',
    fullNameEn: 'KIMES 2027 — Korea International Medical & Hospital Equipment Show',
    // 행사 기간 (KST)
    dateStart: '2027-03-18T00:00:00+09:00',
    dateEnd:   '2027-03-21T23:59:59+09:00',
    dateRangeKo: '2027년 3월 18일(목) ~ 21일(일)',
    dateRangeEn: 'March 18–21, 2027',
    dateShort:   '2027.3.18 — 21',
    venueKo: '코엑스 (서울 강남구 영동대로 513)',
    venueShortKo: 'COEX · 서울',
    venueEn: 'COEX, Seoul',
    halls: '1층 Hall A · 3층 Hall B–E',
    // 주최(단독) — 푸터 © · 영문 본문에서는 ALL CAPS 사용.
    // 한국어 본문 안에서는 한글 표기, 영문 본문·© 표기에서는 ALL CAPS.
    organizerKo: '한국이앤엑스',
    organizerEn: 'KOREA E&EX INC.',
    // 주최 정식 표기 (주최 + 공동주최 통합) — §5.3.2 일정 표 등에 사용
    organizationKo: '한국이앤엑스 · KMDA · KMDIA',
    organizationEn: 'KOREA E&EX INC. with KMDA and KMDIA',
    // 신청 마감 — 행사 시작 전날 23:59 (KST)
    applicationDeadline: '2027-03-17T23:59:59+09:00',
  };

  // ---- 공동주최 (순서: KMDA 먼저, KMDIA 다음) -----------------------------
  // 주최(한국이앤엑스)와 함께 KIMES 운영에 참여하는 두 협력 단체.
  const coOrganizers = [
    { ko: 'KMDA (한국의료기기협동조합)',     en: 'KMDA (Korea Medical Device Industry Cooperative)' },
    { ko: 'KMDIA (한국의료기기산업협회)',   en: 'KMDIA (Korea Medical Devices Industry Association)' },
  ];

  // ---- 문의 채널 (단일 창구) ---------------------------------------------
  // brand@/visit@ 분리되어 있던 것을 모두 단일 창구로 통합. /contact의
  // 문의 종류 탭은 분류 기준으로 유지하되, 결국 같은 메일로 라우팅.
  const contact = {
    email: 'kimes@kimes.kr',
    tel:   '02-551-0102',
  };

  // ---- 자산 상태 플래그 ---------------------------------------------------
  // 가이드 전반의 다운로드 버튼(로고 SVG/PNG/AI/EPS, 특별관 로고 패키지,
  // 보일러플레이트 ZIP 등) 동작을 일괄 제어하는 플래그.
  //   'pending' — 자산 미도착. 모든 다운로드 버튼이 disabled + "준비 중"
  //               라벨 표시. 신뢰도 보호 목적 (404 회피).
  //   'ready'   — 자산 도착. 버튼이 정상 다운로드 링크로 동작.
  // Phase 4 자산 패키지 정리 완료 시 'ready'로 토글.
  const assets = {
    status: 'pending',
  };

  // ---- KIMES 컬러 (Primary 3 + Sub 4) -------------------------------------
  // KIMES 4브랜드 시스템: KIMES 워드마크용 Primary 3색 + 특별관 3종 + 톤다운
  // Gray. /color, /logo 미세글씨, /special-zones 컬러 정의 모두 이 단일
  // 출처 참조 (§13 특별관 페이지 컬러 중복 정의 제거).
  // 사이트 내부 UI 토큰(--surface-*, --text-*)은 별개 유지 (§19).
  const colors = {
    primary: {
      red:   { hex: '#E60012', rgb: [230, 0, 18],    cmyk: [0, 100, 100, 0], pantone: '185 C',     label: 'KIMES Red' },
      black: { hex: '#231815', rgb: [35, 24, 21],    cmyk: [0, 0, 0, 100],   pantone: 'Black 6 C', label: 'KIMES Black' },
      white: { hex: '#FFFFFF', rgb: [255, 255, 255], cmyk: [0, 0, 0, 0],     /* 흰색은 Pantone 매칭 없음 */
                                                                              label: 'KIMES White' },
    },
    sub: {
      mcBlue:   { hex: '#036EB8', rgb: [3, 110, 184],   cmyk: [85, 50, 0, 0], pantone: '285 C',  label: 'MedicomteK Blue',     usage: 'MedicomteK 특별관' },
      bdPurple: { hex: '#5D3B8B', rgb: [93, 59, 139],   cmyk: [78, 90, 0, 0], pantone: '2685 C', label: 'BEAUTY&DERMA Purple', usage: 'BEAUTY&DERMA SEOUL 특별관' },
      inLime:   { hex: '#BFD633', rgb: [191, 214, 51],  cmyk: [30, 0, 90, 0], pantone: '382 C',  label: 'INSPIRE Lime',        usage: 'INSPIRE Digital Health 특별관' },
      gray:     { hex: '#A7A9AC', rgb: [167, 169, 172], cmyk: [0, 0, 0, 40],  /* 그레이는 Pantone 매칭 없음 */
                                                                              label: 'Neutral Gray',         usage: '톤다운' },
    },
  };

  // ---- 3단계 상태 신호 톤 -------------------------------------------------
  // 가이드 전반의 "권장 / 조건부 / 비권장" 일관된 시각 신호.
  // CSS :root 변수(--status-*)와 같은 값. 인라인 스타일·JS 측정용 반복.
  //   ok    — 권장. KIMES 톤 안에서 안전한 사용.
  //   warn  — 조건부. 사전 승인·플레이트 처리 등 추가 절차 필요.
  //   error — 비권장. Don'ts·미승인 표기에 사용.
  const tone = {
    ok:    '#15803D',
    warn:  '#B45309',
    error: '#B91C1C',
  };

  // ---- 가이드 자체 정보 --------------------------------------------------
  const guide = {
    version: 'v2027.0',
    // 푸터·랜딩의 "최종 갱신" 표기. 콘텐츠 갱신 시 함께 수정.
    updatedAt: '2026-05-07',
  };

  // ---- 다음 회차 (행사 종료 후 자동 표기될 메시지용) ---------------------
  // 매년 갱신: 다음 KIMES 회차 정보가 나오면 함께 채움. 비워두면
  // "다음 회차 정보는 추후 공개" 메시지로 fallback.
  const next = {
    name: 'KIMES 2028',
    announced: false,
  };

  // ---- 핵심 숫자 ----------------------------------------------------------
  // §22.5 통계 카드 패턴: 카드는 숫자·라벨만, 출처(잠정·실적 시점)는 섹션
  // lede에 한 줄로 명시. source 필드는 기록용으로 유지 (Phase 4 /changelog
  // 등에서 갱신 시점 참조용). 카드 렌더링 시에는 사용하지 않음.
  // §10.2.5 약식 큰 수: "1,400+", "60+", "80,000+" — 모두 "+" 접미사.
  const numbers = {
    exhibitors:  { value: '1,400+',  source: '2027 잠정' },
    countries:   { value: '60+',     source: '2027 잠정' },
    visitors:    { value: '80,000+', source: '2026 기준' },
    categories:  { value: 14,        source: null }, // 고정값
  };

  // ---- 카운트다운 상태 계산 ----------------------------------------------
  // §4.2.1 D-XXX 카운트다운. now를 인자로 받아 결정적이고 테스트 가능.
  // 반환값: { state, label, sub, daysLeft }
  //   state: 'upcoming' | 'live' | 'past'
  //   label: 큰 글씨로 표시될 문자열 (D-NNN, 진행 중, 행사 종료)
  //   sub:   라벨 아래 작은 보조 문구
  //   daysLeft: 남은 일수 (state==='upcoming'에서만 의미 있음)
  function getEventStatus(now) {
    if (!(now instanceof Date)) now = new Date();
    const start = new Date(event.dateStart);
    const end = new Date(event.dateEnd);

    if (now > end) {
      return {
        state: 'past',
        label: `${event.nameKo} 행사 종료`,
        sub: next.announced
          ? `${next.name} 정보는 ${next.url ? '아래 링크' : '추후'} 공개됩니다.`
          : `${next.name} 정보는 추후 공개됩니다.`,
        daysLeft: 0,
      };
    }
    if (now >= start) {
      // 행사 진행 중. Day N / 4 형식으로 진행도 표기.
      const day = Math.floor((now - start) / 86400000) + 1;
      const total = Math.ceil((end - start) / 86400000);
      return {
        state: 'live',
        label: '진행 중',
        sub: `Day ${day} / ${total} · ${event.venueShortKo}`,
        daysLeft: 0,
      };
    }
    // 행사 전.
    const days = Math.ceil((start - now) / 86400000);
    return {
      state: 'upcoming',
      label: `D-${days}`,
      sub: '개막까지',
      daysLeft: days,
    };
  }

  // ---- export ------------------------------------------------------------
  window.KIMES_EVENT = {
    event,
    guide,
    next,
    numbers,
    coOrganizers,
    contact,
    assets,
    colors,
    tone,
    getEventStatus,
  };
})();
