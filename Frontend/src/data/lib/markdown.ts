function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, '<a href="$2">$1</a>');
}

export function getMarkdownTitle(markdown: string) {
  return markdown.trim().match(/^#\s+(.+)$/m)?.[1] ?? '';
}

/** Converts the currently supported, deliberately small Markdown subset to safe HTML. */
export function markdownToHtml(markdown: string, skipTitle = true) {
  const blocks = markdown.trim().split(/\r?\n\s*\r?\n/);
  if (skipTitle && blocks[0]?.startsWith('# ')) blocks.shift();
  return blocks.map((block) => {
    if (block.startsWith('## ')) return `<h2>${inlineMarkdown(block.slice(3))}</h2>`;
    if (block.startsWith('### ')) return `<h3>${inlineMarkdown(block.slice(4))}</h3>`;
    if (block.startsWith('> ')) return `<blockquote>${inlineMarkdown(block.slice(2))}</blockquote>`;
    return `<p>${inlineMarkdown(block)}</p>`;
  }).join('\n');
}
