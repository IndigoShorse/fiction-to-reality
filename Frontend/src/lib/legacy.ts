/** Extracts the presentational and behavioural parts of the original static pages.
 * Keeping the source data in one place makes this an incremental Astro migration.
 */
export function getStyle(document: string) {
  return document.match(/<style>([\s\S]*?)<\/style>/i)?.[1] ?? '';
}

export function getBody(document: string) {
  return (document.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');
}

export function getInlineScript(document: string) {
  const scripts = [...document.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
  return scripts.at(-1)?.[1] ?? '';
}
