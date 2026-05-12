// §11 — /contact (v2027.1). 문의 채널 3종 (BI / 승인 / 라이선스)
// mailto 링크 + 직접 연락처.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;

const CHANNELS = [
  {
    id: 'general',
    label: '일반 BI 문의',
    en: 'General Inquiry',
    desc: '가이드에 없는 사용 케이스, 표기 질문',
    time: '영업일 1~2일',
    subject: '[BI 문의]',
  },
  {
    id: 'permission',
    label: '승인 신청',
    en: 'Pre-approval',
    desc: '굿즈·광고·영상 등 사전 승인 필요 항목',
    time: '영업일 3~5일',
    subject: '[승인 신청]',
  },
  {
    id: 'license',
    label: '라이선스 문의',
    en: 'Licensing',
    desc: '"공식 파트너" 등 별도 계약 필요 항목',
    time: '영업일 5~10일 (협의 일정에 따라)',
    subject: '[라이선스 문의]',
  },
];

function ContactPage() {
  const { contact } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="10"
      title="Contact"
      subtitle="문의·신청"
      lede={`모든 문의·신청은 ${contact.email}로 받습니다. 메일 제목 앞에 아래 분류 태그를 붙여주세요.`}
    >
      <SectionHeading id="channels" title="Inquiry Channels" subtitle="문의 종류" />
      <div className="ct-channels">
        {CHANNELS.map(c => (
          <article key={c.id} className="ct-channel">
            <header className="ct-channel-head">
              <span className="ct-channel-label">{c.label}</span>
              <span className="ct-channel-en">{c.en}</span>
            </header>
            <p className="ct-channel-desc">{c.desc}</p>
            <div className="ct-channel-meta">처리 시간 · {c.time}</div>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent(c.subject)}`}
              className="btn btn-primary btn-md"
            >
              {c.subject} 메일 보내기 →
            </a>
          </article>
        ))}
      </div>

      <SectionHeading id="direct" title="Direct" subtitle="직접 연락" />
      <div className="ct-direct">
        <ul className="ct-direct-list">
          <li>
            <strong>메일</strong> —{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <strong>전화</strong> —{' '}
            <a href={`tel:${contact.tel.replace(/-/g, '')}`}>{contact.tel}</a>
          </li>
        </ul>
        <p className="ct-direct-note">
          승인 신청·라이선스 문의 시 매체·기간·시안(PDF·이미지)을 첨부해주세요.
        </p>
      </div>
    </PageShell>
  );
}

window.ContactPage = ContactPage;
