// §8 — /permissions (v2027.1). 누가 무엇을 어디까지 사용할 수 있는가.
// 사용 권한 매트릭스 · 신청 절차 · 라이선싱.
//
// 데이터 출처: content/permissions.json — 어드민 편집 가능.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

const FALLBACK = { levels: [], rows: [], applicationSteps: [], applicationForm: [] };

function PermissionsPage() {
  const { contact } = window.KIMES_EVENT;
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';
  const pending = assetStatus !== 'ready';

  const data = (window.CONTENT && window.CONTENT.permissions) || FALLBACK;
  const ROWS = data.rows || [];
  const LEVELS = data.levels || [];
  const ELSE_NOTE = data.elseNote || '';
  const APPLICATION_STEPS = data.applicationSteps || [];
  const APPLICATION_FORM = data.applicationForm || [];

  return (
    <PageShell
      title="권한 · 승인 · 라이선스"
      lede="누가 무엇을 어디까지 사용할 수 있는가. 사용 권한 매트릭스 · 신청 절차 · 라이선싱."
    >
      {/* §8.1 사용 권한 매트릭스 */}
      <SectionHeading id="matrix" title="사용 권한 매트릭스" />
      <div className="pm-legend">
        {LEVELS.map(l => (
          <div key={l.id} className={`pm-legend-item pm-level-${l.id}`}>
            <span className="pm-legend-mark">✓</span>
            <div className="pm-legend-body">
              <div className="pm-legend-label">{l.label}</div>
              <div className="pm-legend-en">{l.en}</div>
              <div className="pm-legend-desc">{l.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pm-matrix-wrap">
        <table className="pm-matrix">
          <thead>
            <tr>
              <th>사용 행위</th>
              {LEVELS.map(l => <th key={l.id} className={`pm-th-${l.id}`}>{l.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i}>
                <td className="pm-action">{row.action}</td>
                {LEVELS.map(l => (
                  <td key={l.id} className={`pm-cell ${row.level === l.id ? `pm-cell-active pm-cell-${l.id}` : ''}`}>
                    {row.level === l.id ? '✓' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ELSE_NOTE && (
        <div className="pm-else-note">
          <strong>매트릭스 외 사용 사례</strong> — {ELSE_NOTE}
        </div>
      )}

      {/* §8.2 자산 선택 기준 */}
      <div className="pm-asset-ref">
        <h3 className="pm-asset-ref-title">자산 선택 기준</h3>
        <ul>
          <li><strong>워드마크 SVG 자리</strong> — 보증·증명 영역 (보도자료 헤더·부스 인증 마크·공문)</li>
          <li><strong>텍스트 표기 자리</strong> — 마케팅·콘텐츠 영역 (회사 폰트·컬러 자유 사용)</li>
        </ul>
        <p>상세 → <Link to="/typography">/typography</Link></p>
      </div>

      {/* §8.3 사용 유효 기간 (Tier 1) */}
      <SectionHeading id="timing" title="사용 유효 기간 (Tier 1)" />
      <div className="pm-timing">
        <p>
          "KIMES 2027 참가" 표기는 행사 종료일(2027.03.21)까지 유효.
        </p>
        <ul>
          <li>종료 후 — 회사 자료에서 KIMES 로고 제거 또는 "Past Exhibitor (KIMES 2027)" 표기 전환</li>
          <li>차회 참가 확정 시 — 신규 회차 표기로 갱신</li>
        </ul>
      </div>

      {/* §8.4 사전 승인 신청 */}
      <SectionHeading id="apply" title="사전 승인 신청" />
      <p>신청 → 검토 → 회신 (영업일 3~5일).</p>
      <p>행사 기간 굿즈 제작 시 행사 D-30 이전 신청 권장 (제작 리드타임 확보).</p>
      <div className="pm-steps">
        {APPLICATION_STEPS.map(s => (
          <div key={s.num} className="pm-step">
            <div className="pm-step-num">{s.num}</div>
            <div className="pm-step-body">
              <div className="pm-step-title">{s.title}</div>
              <div className="pm-step-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pm-form">
        <h3 className="pm-form-title">신청서 항목</h3>
        <ul className="pm-form-list">
          {APPLICATION_FORM.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div className="pm-form-actions">
          {pending ? (
            <button type="button" className="btn btn-md btn-outline" disabled title="Coming soon">
              승인 신청서 다운로드 (.docx)
            </button>
          ) : (
            <a href="/assets/forms/KIMES_Permission_Application.docx" className="btn btn-md btn-outline" download>
              승인 신청서 다운로드 (.docx)
            </a>
          )}
          <Link to="/contact?type=permission" className="btn btn-md btn-primary">
            온라인 신청 →
          </Link>
        </div>
      </div>

      {/* §8.5 라이선스 (Tier 1) */}
      <SectionHeading id="licensing" title="라이선스 (Tier 1)" />
      <div className="pm-licensing">
        <p>
          "KIMES 공식 파트너", "KIMES 추천 업체" 등 인증·후원 표현은 별도
          라이선스 계약 필수. 가격·계약 조건 개별 협의.
        </p>
        <div className="pm-licensing-channel">
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent('[라이선스 문의] ')}`} className="btn btn-md btn-primary">
            라이선스 문의 →
          </a>
          <span>제목 <code>[라이선스 문의]</code> · {contact.email}</span>
        </div>
      </div>

      {/* §8.6 가이드 위반 (Tier 1) */}
      <SectionHeading id="non-compliance" title="가이드 위반 (Tier 1)" />
      <div className="pm-non-compliance">
        <p>
          가이드와 다른 사용 발견 시 사무국이 정정·중단을 요청. 워드마크
          변형·미승인 라이선스 표현·무단 굿즈·도용 사례는 법적 조치 대상.
        </p>
        <p className="pm-non-compliance-foot">
          문의 → <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>
    </PageShell>
  );
}

window.PermissionsPage = PermissionsPage;
