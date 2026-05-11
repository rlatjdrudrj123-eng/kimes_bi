// §14 — /permissions. 권한·승인·라이선스 매트릭스. BI 가이드를 단순한
// 디자인 가이드와 구별 짓는 핵심 페이지: 누가 무엇을 어디까지 할 수
// 있는지를 명문화.
//
// 명세 §14.2.1~§14.2.5 평면 구조.

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
      eyebrow="08"
      title="Usage Rights"
      subtitle="권한·승인·라이선스"
      lede="이 페이지가 BI 가이드를 단순한 디자인 가이드와 구별 짓는 핵심입니다. 누가 무엇을 어디까지 할 수 있는지를 명문화한 매트릭스 + 신청 절차 + 라이선싱 문의 안내입니다."
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
        빈도 높은 핵심 6 케이스만 정리. 그 외 사용 케이스는 사무국과 협의해주세요.
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

      {/* §14.2.1 자산 선택 참고 ---------------------------------------- */}
      <div className="pm-asset-ref">
        <h3 className="pm-asset-ref-title">에셋 선택 참고 (강제 아님)</h3>
        <p>KIMES 표기에는 두 가지 에셋이 있습니다 (→ <Link to="/typography">/typography</Link>).</p>
        <ul>
          <li><strong>워드마크 SVG</strong> — 보증·증명 자리 (보도자료 헤더 마크·부스 인증 마크·공문 헤더)</li>
          <li><strong>텍스트 표기</strong> — 마케팅·콘텐츠 자리. 회사 폰트·컬러로 자유롭게 사용 가능</li>
        </ul>
        <p>
          다른 폰트로 "KIMES"를 타이핑해 워드마크 자리에 박는 것은 권장하지
          않습니다. 그 자리에는 워드마크 SVG를 사용해주세요. 마케팅·콘텐츠
          자리의 텍스트 표기는 자유 사용 영역입니다 (위 매트릭스 두 번째
          행 참고).
        </p>
      </div>

      {/* §14.2.2 행위 시점 ---------------------------------------------- */}
      <SectionHeading id="timing" title="Timing" subtitle="행위 시점" />
      <div className="pm-timing">
        <p>
          <strong>"KIMES 2027 참가" 표기는 행사 종료 시점(2027년 3월 21일)
          까지 유효합니다.</strong>
        </p>
        <ul>
          <li>행사 종료 후에는 회사 자료에서 KIMES 로고를 제거하거나 "지난 KIMES 2027 참가 (Past Exhibitor)" 표기로 변경합니다.</li>
          <li>다음 회차 참가가 확정된 경우 새 회차 표기로 갱신합니다.</li>
        </ul>
      </div>

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
      <SectionHeading id="non-compliance" title="Non-compliance" subtitle="가이드와 다른 사용이 발견되면" />
      <div className="pm-non-compliance">
        <p>
          가이드와 다르게 사용된 경우 사무국이 정정을 요청드릴 수 있습니다.
          대부분의 경우 협의로 해결되며, 자세한 사항은 brand 문의로 알려
          드립니다.
        </p>
        <p className="pm-non-compliance-foot">
          궁금한 사항은 → <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>

      {/* §14.2.5 라이선싱 문의 ------------------------------------------ */}
      <SectionHeading id="licensing" title="Licensing" subtitle="라이선싱 문의" />
      <div className="pm-licensing">
        <p>
          "KIMES 공식 파트너", "KIMES 추천 업체" 같은 인증·후원 표현은 별도
          라이선스 계약이 필요합니다. 가격·계약 조건은 사무국이 개별 협의
          합니다.
        </p>
        <div className="pm-licensing-channel">
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent('[라이선스 문의]')}`} className="btn btn-md btn-primary">
            라이선스 문의 →
          </a>
          <span>제목 <code>[라이선스 문의]</code> · {contact.email}</span>
        </div>
      </div>
    </PageShell>
  );
}

window.PermissionsPage = PermissionsPage;
