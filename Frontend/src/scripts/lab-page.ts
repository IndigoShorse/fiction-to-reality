/** Temporary coordinator for workspace-level interactions. */
export function initLabPage() {
  if (!document.querySelector('[data-lab-root-document]')) return;

  const highlightReferences = (refs: string[]) => {
    document.querySelectorAll('.item.active').forEach((item) => item.classList.remove('active'));
    refs.forEach((ref) => document.querySelector<HTMLElement>(`.item[data-ref="${ref}"]`)?.classList.add('active'));
  };

  window.addEventListener('lab:highlight-references', ((event: CustomEvent<{ refs: string[] }>) => highlightReferences(event.detail.refs)) as EventListener);

}
