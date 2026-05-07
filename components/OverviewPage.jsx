// §5 — KIMES 한눈에 보기 (/overview).
//
// 보도자료·홈페이지·SNS·이메일에 그대로 복사해 쓸 수 있는 공식 문구를
// 한 페이지에 모은 것. 행사 메타데이터는 components/config.js의
// KIMES_EVENT에서 읽음 — 매년 회차 갱신 시 단일 출처에서 전파.
//
// 페이지 구성:
//   §5.3.1 공식 명칭 (정식·줄임·약칭)        ← 이 커밋
//   §5.3.2 일정·장소                         ← 이 커밋
//   §5.3.3 보일러플레이트 4벌 한·영          ← 다음 커밋
//   §5.3.4 핵심 숫자 4개 카드                ← 그 다음 커밋
//   §5.3.5 14개 전시 카테고리
//   §5.3.6 공식 채널

const PageShell = window.PageShell;
const CopyButton = window.CopyButton;

function OverviewPage() {
  const { event } = window.KIMES_EVENT;

  // §5.3.1 — 공식 명칭. 회차/연도가 들어간 정식·줄임은 config에서.
  const NAME_ROWS = [
    { label: '정식', ko: event.fullNameKo, en: event.fullNameEn },
    { label: '줄임', ko: event.nameKo,     en: event.nameEn },
    { label: '약칭', ko: 'KIMES',          en: 'KIMES' },
  ];

  // §5.3.2 — 일정·장소.
  const FACT_ROWS = [
    { label: '기간', ko: event.dateRangeKo,    en: event.dateRangeEn },
    { label: '장소', ko: event.venueKo,        en: event.venueEn },
    { label: '홀',   ko: event.halls,           en: 'Hall A, B, C, D, E' },
    { label: '주최', ko: '한국의료기기산업협회', en: event.organizerEn },
    { label: '주관', ko: 'KIMES 사무국',        en: 'KIMES Secretariat' },
  ];

  return (
    <PageShell
      eyebrow="01"
      title="KIMES 한눈에 보기"
      lede="보도자료·홈페이지·SNS·이메일에 그대로 복사해 쓸 수 있는 공식 문구를 한 페이지에 모았습니다."
    >
      {/* §5.3.1 공식 명칭 ----------------------------------------- */}
      <h2 id="official-names">공식 명칭</h2>
      <p>
        회사 자료에 KIMES를 표기할 때 다음 명칭을 그대로 사용합니다. 각 행
        우측의 [복사] 버튼으로 한국어·영문 어느 쪽이든 클립보드에 바로
        담을 수 있습니다.
      </p>
      <FactTable rows={NAME_ROWS} caption="공식 명칭 한·영 표기" />

      {/* §5.3.2 일정·장소 ----------------------------------------- */}
      <h2 id="schedule">일정·장소</h2>
      <p>
        보도자료·초청장·홈페이지에 사용할 정확한 일정과 장소입니다. 영문은
        보도자료·해외 채널용으로 그대로 복사해서 사용합니다.
      </p>
      <FactTable rows={FACT_ROWS} caption="일정 및 장소 한·영 표기" />

      {/* §5.3.3 보일러플레이트 4벌 — 다음 sub-commit에서 작성 */}
      {/* §5.3.4 핵심 숫자        — 그 다음 sub-commit에서 작성 */}
      {/* §5.3.5 14개 카테고리     — 그 다음 sub-commit에서 작성 */}
      {/* §5.3.6 공식 채널        — 그 다음 sub-commit에서 작성 */}
    </PageShell>
  );
}

// 공식 명칭·일정 같은 [구분 / 한국어 / 영문 / 복사] 4컬럼 표.
function FactTable({ rows, caption }) {
  return (
    <div className="ov-table-wrap">
      <table className="ov-table" role="table">
        {caption && <caption className="ov-table-caption">{caption}</caption>}
        <thead>
          <tr>
            <th scope="col" className="ov-th-label">구분</th>
            <th scope="col" className="ov-th-ko">한국어</th>
            <th scope="col" className="ov-th-en">영문</th>
            <th scope="col" className="ov-th-copy"><span className="visually-hidden">복사</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <th scope="row" className="ov-td-label">{r.label}</th>
              <td className="ov-td-ko">{r.ko}</td>
              <td className="ov-td-en">{r.en}</td>
              <td className="ov-td-copy">
                <div className="ov-copy-row">
                  <CopyButton
                    value={r.ko}
                    label="한국어"
                    ariaLabel={`${r.label} 한국어 표기 복사`}
                  />
                  <CopyButton
                    value={r.en}
                    label="영문"
                    ariaLabel={`${r.label} 영문 표기 복사`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.OverviewPage = OverviewPage;
