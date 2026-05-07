// 재사용 가능한 [복사] 버튼 + 글로벌 토스트.
//
// /overview의 명칭·일정·보일러플레이트, /color의 hex/RGB 값,
// /logo의 파일명 등 가이드 전반에서 "정확한 문자열을 복사한다"는
// 동작이 반복되므로 한 곳에 모음.
//
// 사용:
//   <CopyButton value="KIMES 2027" label="복사" />
//
// 필수 부속:
//   <ToastHost /> 를 App 루트에 한 번 마운트.
//
// 외부 트리거:
//   window.dispatchToast(message) — CopyButton 외에서도 토스트
//   띄우고 싶을 때 호출.

const { useState, useEffect, useRef } = React;

function dispatchToast(message, opts = {}) {
  window.dispatchEvent(new CustomEvent('kimes:toast', {
    detail: { message, ...opts },
  }));
}

function ToastHost() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  useEffect(() => {
    function onToast(e) {
      const { message } = e.detail || {};
      if (!message) return;
      setToast({ id: Date.now() + Math.random(), message });
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setToast(null), 2200);
    }
    window.addEventListener('kimes:toast', onToast);
    return () => {
      window.removeEventListener('kimes:toast', onToast);
      clearTimeout(timerRef.current);
    };
  }, []);
  return (
    <div className="toast-host" role="status" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="toast" key={toast.id}>{toast.message}</div>
      )}
    </div>
  );
}

function CopyButton({
  value,
  label = '복사',
  size = 'sm',
  variant = 'outline',
  className = '',
  ariaLabel,
}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  async function handleClick() {
    const text = String(value == null ? '' : value);
    let ok = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (_) { /* 폴백 시도 */ }
    }
    if (!ok) {
      // 권한 미부여·http 환경 폴백.
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (_) { ok = false; }
    }
    if (ok) {
      setCopied(true);
      dispatchToast('복사되었습니다');
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } else {
      dispatchToast('복사 실패 — 브라우저 권한을 확인해주세요');
    }
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const aria = ariaLabel || (label === '복사'
    ? `복사: ${String(value || '').slice(0, 40)}`
    : `${label} 복사: ${String(value || '').slice(0, 40)}`);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn btn-${size} btn-${variant} copy-btn ${copied ? 'is-copied' : ''} ${className}`.trim()}
      aria-label={aria}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span className="copy-btn-label">{copied ? '복사됨' : label}</span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

window.CopyButton = CopyButton;
window.ToastHost = ToastHost;
window.dispatchToast = dispatchToast;
