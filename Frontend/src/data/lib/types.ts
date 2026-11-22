export interface ArticlePreview {
  slug: string;
  title: string;
  description: string;
}

export interface Article extends ArticlePreview {
  markdown: string;
}
