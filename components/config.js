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
    organizerKo: '한국의료기기산업협회 (KMDIA)',
    organizerEn: 'Korea Medical Devices Industry Association (KMDIA)',
    // 신청 마감 — 행사 시작 전날 23:59 (KST)
    applicationDeadline: '2027-03-17T23:59:59+09:00',
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

  // ---- 핵심 숫자 (각 항목에 출처 명시) ------------------------------------
  const numbers = {
    exhibitors:  { value: '1,400+',     source: '2027 잠정' },
    countries:   { value: '60+',        source: '2027 잠정' },
    visitors:    { value: '80,000여 명', source: '2026 기준' },
    categories:  { value: 14,           source: null }, // 고정값, 출처 표기 불필요
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
    getEventStatus,
  };
})();
