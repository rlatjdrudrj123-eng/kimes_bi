// §17 — /contact. 세 가지 종류의 문의·신청을 한 페이지에서 받음.
// 폼 필드는 종류 선택에 따라 다르게 표시.
//
// 명세 §17.2.1~§17.2.4. 폼 자체는 사무국 백엔드와 연동 X (현재 stub —
// 실제 제출은 mailto fallback 또는 추후 백엔드 연결).

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const { useState, useEffect } = React;

const TYPES = [
  { id: 'general',   label: '일반 BI 문의',   en: 'General Inquiry',  desc: '가이드에 없는 사용 케이스, 표기 질문',     time: '영업일 1~2일' },
  { id: 'permission', label: '승인 신청',       en: 'Pre-approval',     desc: '굿즈·광고·영상 등 사전 승인 필요 항목',     time: '영업일 3~5일' },
  { id: 'license',   label: '라이선스 문의',  en: 'Licensing',        desc: '"공식 파트너" 등 별도 계약 필요 항목',     time: '영업일 5~10일 (협의 일정에 따라)' },
];

function ContactPage() {
  const { contact } = window.KIMES_EVENT;
  // URL hash로 type 사전 선택 (예: /contact?type=permission)
  const [type, setType] = useState('general');
  useEffect(() => {
    const hash = window.location.hash;
    const m = hash.match(/[?&]type=([a-z]+)/);
    if (m && TYPES.find(t => t.id === m[1])) setType(m[1]);
  }, []);

  const selected = TYPES.find(t => t.id === type);

  // 폼 상태 (실제 제출은 mailto로 fallback)
  const [form, setForm] = useState({
    company: '', contactName: '', email: '', tel: '', booth: '',
    inquiry: '',
    purpose: '', media: '', period: '', notes: '',
    licenseKind: '', scale: '', request: '',
  });
  const onChange = (k) => (e) => setForm(s => ({ ...s, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subjectMap = {
      general:    `[BI 문의] ${form.company || '회사명 미입력'}`,
      permission: `[승인 신청] ${form.purpose || '사용 목적 미입력'} - ${form.company}`,
      license:    `[라이선스 문의] ${form.licenseKind || '종류 미입력'} - ${form.company}`,
    };
    const lines = [];
    lines.push(`회사명: ${form.company}`);
    lines.push(`담당자: ${form.contactName}`);
    lines.push(`이메일: ${form.email}`);
    if (form.tel)   lines.push(`전화: ${form.tel}`);
    if (form.booth) lines.push(`부스: ${form.booth}`);
    lines.push('');
    if (type === 'general') {
      lines.push('[문의 내용]', form.inquiry);
    } else if (type === 'permission') {
      lines.push(`사용 목적: ${form.purpose}`);
      lines.push(`매체·채널: ${form.media}`);
      lines.push(`사용 기간: ${form.period}`);
      lines.push('');
      lines.push('[추가 설명]', form.notes);
    } else {
      lines.push(`라이선스 종류: ${form.licenseKind}`);
      lines.push(`사용 규모: ${form.scale}`);
      lines.push('');
      lines.push('[협의 요청 사항]', form.request);
    }
    const body = lines.join('\n');
    const subject = subjectMap[type];
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <PageShell
      eyebrow="13"
      title="Contact"
      subtitle="문의·신청"
      lede="세 가지 종류의 문의·신청을 한 페이지에서 받습니다. 종류를 선택하시면 해당하는 입력 필드가 나타납니다. 양식 작성 후 [메일로 제출] 버튼이 사무국 메일을 자동으로 열어드립니다."
    >
      {/* §17.2.1 문의 종류 선택 ----------------------------------------- */}
      <SectionHeading id="type" title="Inquiry Type" subtitle="문의 종류 선택" />
      <div className="ct-types" role="radiogroup" aria-label="문의 종류">
        {TYPES.map(t => (
          <label key={t.id} className={`ct-type ${type === t.id ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="contact-type"
              value={t.id}
              checked={type === t.id}
              onChange={() => setType(t.id)}
            />
            <div className="ct-type-body">
              <div className="ct-type-head">
                <span className="ct-type-label">{t.label}</span>
                <span className="ct-type-en">{t.en}</span>
              </div>
              <div className="ct-type-desc">{t.desc}</div>
              <div className="ct-type-time">처리 시간 · {t.time}</div>
            </div>
          </label>
        ))}
      </div>

      {/* §17.2.2 폼 ------------------------------------------------------ */}
      <SectionHeading id="form" title="Form" subtitle="문의 양식" />
      <form className="ct-form" onSubmit={onSubmit}>
        <div className="ct-form-grid">
          <Field label="회사명" required value={form.company} onChange={onChange('company')} />
          <Field label="담당자명" required value={form.contactName} onChange={onChange('contactName')} />
          <Field label="이메일" type="email" required value={form.email} onChange={onChange('email')} />
          <Field label="전화번호" type="tel" value={form.tel} onChange={onChange('tel')} />
          <Field label="부스 번호" hint="해당 시" value={form.booth} onChange={onChange('booth')} />
        </div>

        {type === 'general' && (
          <Field label="문의 내용" required textarea rows={6} maxLength={1000} value={form.inquiry} onChange={onChange('inquiry')} hint="최대 1,000자" />
        )}

        {type === 'permission' && (
          <>
            <div className="ct-form-grid">
              <Field label="사용 목적" required hint="굿즈·영상·광고·기타" value={form.purpose} onChange={onChange('purpose')} />
              <Field label="사용 매체·채널" required value={form.media} onChange={onChange('media')} />
              <Field label="사용 기간" required hint="시작 ~ 종료" value={form.period} onChange={onChange('period')} />
            </div>
            <p className="ct-form-attach-note">
              시안 첨부는 메일 발송 시 첨부해주세요 (이미지·PDF, 최대 10MB).
            </p>
            <Field label="추가 설명" textarea rows={4} value={form.notes} onChange={onChange('notes')} />
          </>
        )}

        {type === 'license' && (
          <>
            <div className="ct-form-grid">
              <Field label="원하는 라이선스 종류" required hint="공식 파트너·추천·인증·후원·기타" value={form.licenseKind} onChange={onChange('licenseKind')} />
              <Field label="사용 규모" required hint="예상 노출 수·범위" value={form.scale} onChange={onChange('scale')} />
            </div>
            <Field label="협의 요청 사항" required textarea rows={4} value={form.request} onChange={onChange('request')} />
          </>
        )}

        <div className="ct-form-actions">
          <button type="submit" className="btn btn-primary btn-md">
            메일로 제출 →
          </button>
          <span className="ct-form-fallback">
            제출 시 사무국 메일이 자동으로 열립니다.
          </span>
        </div>
      </form>

      {/* §17.2.3 처리 시간 + §17.2.4 직접 이메일 ------------------------ */}
      <SectionHeading id="direct" title="Direct Email" subtitle="이메일 직접 발송" />
      <div className="ct-direct">
        <p>
          폼 작성이 번거로우면 메일로 직접 보내주셔도 됩니다.
        </p>
        <ul className="ct-direct-list">
          <li><strong>일반·승인</strong> — <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><strong>라이선스</strong> — <a href={`mailto:${contact.email}?subject=${encodeURIComponent('[라이선스 문의]')}`}>{contact.email}</a> (제목: <code>[라이선스 문의]</code>)</li>
          <li><strong>전화</strong> — <a href={`tel:${contact.tel.replace(/-/g, '')}`}>{contact.tel}</a></li>
        </ul>
      </div>
    </PageShell>
  );
}

function Field({ label, hint, required, type = 'text', textarea, rows, maxLength, value, onChange }) {
  return (
    <label className="ct-field">
      <span className="ct-field-label">
        {label}
        {required && <span className="ct-field-required">*</span>}
        {hint && <span className="ct-field-hint">— {hint}</span>}
      </span>
      {textarea ? (
        <textarea
          className="ct-field-input"
          rows={rows || 4}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          className="ct-field-input"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </label>
  );
}

window.ContactPage = ContactPage;
