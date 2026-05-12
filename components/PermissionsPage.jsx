// §8 — /permissions (v2027.1). 권한·승인·라이선스 매트릭스 + 신청
// 절차 + 라이선싱.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

// 데이터 출처: content/permissions.json — 어드민 편집 가능.

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
      eyebrow="07"
      title="Usage Rights"
      subtitle="권한·승인·라이선스"
      lede="사용 권한·신청 절차·라이선스 안내."
    >
      {/* §14.2.1 권한 매트릭스 ----------------------------------------- */}
      <SectionHeading id="matrix" title="Usage Rights Matrix" subtitle="사용 권한 매트릭스" />
      <div className="pm-legend">
        {LEVELS.map(l => (
          <div key={l.id} className={`pm-legend-item pm-level-${l.id}`}>
            <span className="pm-legend-mark">{l.id === 'restricted' ? '✗' : '✓'}</span>
            <div className="pm-legend-body">
              <div className="pm-legend-label">{l.label}</div>
              <div className="pm-legend-en">{l.en}</div>
              <div className="pm-legend-desc">{l.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pm-note">
        자주 발생하는 6개 케이스. 그 외는 사무국과 협의해주세요.
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
                    {row.level === l.id ? (l.id === 'restricted' ? '✗' : '✓') : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ELSE_NOTE && (
        <div className="pm-else-note">
          <strong>그 외 사용 케이스 안내</strong> — {ELSE_NOTE}
        </div>
      )}


      {/* §8.x Timing 섹션 — 매트릭스 1행("행사 종료 후 제거")과 중복이라 삭제 */}

      {/* §14.2.3 신청 절차 ---------------------------------------------- */}
      <SectionHeading id="apply" title="Application Process" subtitle="신청 절차" />
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
        <h3 className="pm-form-title">신청서 양식 (사용 목적·매체·기간·시안)</h3>
        <ul className="pm-form-list">
          {APPLICATION_FORM.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div className="pm-form-actions">
          {pending ? (
            <button type="button" className="btn btn-md btn-outline" disabled title="Coming soon">
              승인 신청서 다운로드 (.docx)
            </button>
          ) : (
            <a href="/assets/forms/permission-application.docx" className="btn btn-md btn-outline" download>
              승인 신청서 다운로드 (.docx)
            </a>
          )}
          <Link to="/contact?type=permission" className="btn btn-md btn-primary">
            온라인 신청 →
          </Link>
        </div>
      </div>

      {/* §14.2.4 가이드와 다른 사용이 발견되면 -------------------------- */}
      <SectionHeading id="non-compliance" title="위반 사용" /> {/* allow-tone */}
      <div className="pm-non-compliance">
        <p>
          가이드와 다른 사용이 확인되면 사무국이 정정 요청. 문의:{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>

      {/* §8.x Licensing 섹션 — 매트릭스 6행("공식 파트너 등")과 중복이라 삭제 */}
    </PageShell>
  );
}

window.PermissionsPage = PermissionsPage;
