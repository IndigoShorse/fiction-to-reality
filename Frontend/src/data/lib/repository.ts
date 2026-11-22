import dvoeMenyaMarkdown from '../../content/lib/dvoe-menya.md?raw';
import type { Article, ArticlePreview } from './types';

const articles: Article[] = [
  {
    slug: 'dvoe-menya',
    title: 'Двое меня',
    description: 'Рассказ о копии сознания, одиночестве и возвращении с Луны.',
    markdown: dvoeMenyaMarkdown,
  },
];

/** Local content source; replace its implementation with API requests later. */
export async function listArticles(): Promise<ArticlePreview[]> {
  return articles.map(({ markdown: _, ...preview }) => preview);
}

/** Local content source; replace its implementation with an API request later. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articles.find((article) => article.slug === slug) ?? null;
}
