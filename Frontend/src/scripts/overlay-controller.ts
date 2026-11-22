export type OverlayId = 'reference' | 'auth' | 'suggestion';

const overlayElements: Record<OverlayId, string> = {
  reference: 'modal-overlay',
  auth: 'auth-overlay',
  suggestion: 'suggest-overlay',
};

export function createOverlayController() {
  const getOverlay = (id: OverlayId) => document.getElementById(overlayElements[id]);

  const close = (id: OverlayId) => getOverlay(id)?.classList.remove('show');
  const open = (id: OverlayId) => getOverlay(id)?.classList.add('show');
  const closeAll = () => (Object.keys(overlayElements) as OverlayId[]).forEach(close);

  (Object.keys(overlayElements) as OverlayId[]).forEach((id) => {
    getOverlay(id)?.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) close(id);
    });
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAll(); });

  return { open, close, closeAll };
}
