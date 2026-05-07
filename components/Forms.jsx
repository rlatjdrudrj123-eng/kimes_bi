/* eslint-disable */
/**
 * Forms — section, mirrors the Buttons / Cards pattern. Renders text
 * inputs, selects, checkboxes, radios, and a stacked field layout in
 * a few states (default / focus / error / disabled). All styles live in
 * components/forms.css.
 */

const useSiteLang = window.useSiteLang;
function trF(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

/* ---- Intro ---- */
function FormsIntro() {
  const lang = useSiteLang();
  return (
    <section id="forms" className="section">
      <div className="section-eyebrow">{trF('03 — Forms', '03 — 폼')}</div>
      <h2>{trF('Forms', '폼')}</h2>
      <p className="lede">
        {trF(
          'Form controls used across registration, contact, and CMS surfaces. Inputs are 44px tall to meet WCAG 2.5.5; focus uses a 2px brand-red ring; errors render in #b91c1c with an inline icon.',
          '등록·문의·CMS 표면에서 공통으로 쓰는 폼 컨트롤. 입력 필드 높이는 WCAG 2.5.5에 맞춰 44px, 포커스는 2px 브랜드 레드 링, 에러는 #b91c1c와 인라인 아이콘으로 표시.'
        )}
      </p>
    </section>
  );
}

/* ---- Inputs ---- */
function FormInputs() {
  const lang = useSiteLang();
  return (
    <div id="forms-inputs" className="subsection">
      <h3>{trF('03.1 — Text inputs', '03.1 — 텍스트 입력')}</h3>
      <p className="desc">
        {trF(
          'Single-line and multi-line inputs across four states. Labels sit above; helper text below.',
          '한 줄·여러 줄 입력의 4가지 상태. 라벨은 위, 도움말은 아래.'
        )}
      </p>
      <div className="kfm-grid">
        <div className="kfm-field">
          <label className="kfm-label">{trF('Email', '이메일')}</label>
          <input className="kfm-input" type="email" placeholder="name@example.com" defaultValue="" />
          <small className="kfm-help">{trF('We will not share this address.', '주소는 공유하지 않습니다.')}</small>
        </div>
        <div className="kfm-field">
          <label className="kfm-label">{trF('Email · focused', '이메일 · 포커스')}</label>
          <input className="kfm-input is-focus" type="email" placeholder="name@example.com" defaultValue="visitor@kimes.kr" />
          <small className="kfm-help">{trF('Focus state — 2px brand-red ring.', '포커스 상태 — 2px 브랜드 레드 링.')}</small>
        </div>
        <div className="kfm-field is-error">
          <label className="kfm-label">{trF('Email · error', '이메일 · 에러')}</label>
          <input className="kfm-input" type="email" defaultValue="not-an-email" />
          <small className="kfm-help kfm-error">✗ {trF('Enter a valid email address.', '올바른 이메일 주소를 입력하세요.')}</small>
        </div>
        <div className="kfm-field">
          <label className="kfm-label">{trF('Email · disabled', '이메일 · 비활성')}</label>
          <input className="kfm-input" type="email" defaultValue="readonly@kimes.kr" disabled />
          <small className="kfm-help">{trF('Field locked.', '입력 잠김.')}</small>
        </div>
        <div className="kfm-field kfm-field--wide">
          <label className="kfm-label">{trF('Message', '메시지')}</label>
          <textarea className="kfm-input kfm-textarea" rows="4" placeholder={trF('How can we help?', '어떤 도움이 필요하신가요?')} />
          <small className="kfm-help">{trF('Up to 1,000 characters.', '최대 1,000자.')}</small>
        </div>
      </div>
    </div>
  );
}

/* ---- Select / checkbox / radio ---- */
function FormChoices() {
  const lang = useSiteLang();
  return (
    <div id="forms-choices" className="subsection">
      <h3>{trF('03.2 — Selects, checkboxes, radios', '03.2 — 셀렉트·체크박스·라디오')}</h3>
      <p className="desc">
        {trF(
          'Controls that capture a constrained set of values. Hit target ≥ 44×44 on mobile.',
          '제한된 값 집합을 수집하는 컨트롤. 모바일에서 히트 영역 ≥ 44×44.'
        )}
      </p>
      <div className="kfm-grid">
        <div className="kfm-field">
          <label className="kfm-label">{trF('Country', '국가')}</label>
          <select className="kfm-input">
            <option>Korea</option>
            <option>Japan</option>
            <option>USA</option>
            <option>Germany</option>
          </select>
        </div>
        <div className="kfm-field">
          <label className="kfm-label">{trF('Interests', '관심 분야')}</label>
          <div className="kfm-checks">
            <label className="kfm-check"><input type="checkbox" defaultChecked /> {trF('Imaging', '영상진단')}</label>
            <label className="kfm-check"><input type="checkbox" /> {trF('Surgery', '수술')}</label>
            <label className="kfm-check"><input type="checkbox" defaultChecked /> {trF('Digital health', '디지털 헬스')}</label>
          </div>
        </div>
        <div className="kfm-field">
          <label className="kfm-label">{trF('Visitor type', '방문자 유형')}</label>
          <div className="kfm-checks">
            <label className="kfm-check"><input type="radio" name="vtype" defaultChecked /> {trF('Trade visitor', '참관객')}</label>
            <label className="kfm-check"><input type="radio" name="vtype" /> {trF('Press', '프레스')}</label>
            <label className="kfm-check"><input type="radio" name="vtype" /> {trF('Exhibitor', '참가업체')}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Spec table ---- */
function FormTokens() {
  const lang = useSiteLang();
  const rows = [
    { token: '--field-h',         val: '44px',                        krUse: '입력 필드 높이 (WCAG 2.5.5)',                use: 'Input height (WCAG 2.5.5 hit target)' },
    { token: '--field-radius',    val: '6px',                         krUse: '필드 모서리 반경',                          use: 'Field corner radius' },
    { token: '--field-border',    val: '1px solid #d4d4d4',           krUse: '기본 필드 보더',                            use: 'Default field border' },
    { token: '--field-focus',     val: '2px solid #E60012',           krUse: '포커스 링',                                  use: 'Focus ring' },
    { token: '--field-error',     val: '#b91c1c',                     krUse: '에러 텍스트 컬러',                          use: 'Error text color' },
    { token: '--field-bg',        val: '#ffffff',                     krUse: '필드 배경',                                  use: 'Field background' },
    { token: '--field-bg-disabled', val: '#fafafa',                   krUse: '비활성 필드 배경',                          use: 'Disabled field background' },
  ];
  return (
    <div id="forms-tokens" className="subsection">
      <h3>{trF('03.3 — Tokens', '03.3 — 토큰')}</h3>
      <p className="desc">
        {trF('CSS custom properties used by every form control.', '모든 폼 컨트롤이 사용하는 CSS 커스텀 속성.')}
      </p>
      <div className="tu-table-wrap">
        <table className="tu-table">
          <thead>
            <tr>
              <th>{trF('Token', '토큰')}</th>
              <th>{trF('Value', '값')}</th>
              <th>{trF('Use', '용도')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.token}>
                <td className="mono">{r.token}</td>
                <td className="mono">{r.val}</td>
                <td>{trF(r.use, r.krUse)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Page wrapper ---- */
function Forms() {
  return (
    <React.Fragment>
      <FormsIntro />
      <FormInputs />
      <FormChoices />
      <FormTokens />
    </React.Fragment>
  );
}

Object.assign(window, {
  Forms,
  FormsIntro,
  FormInputs,
  FormChoices,
  FormTokens,
});
