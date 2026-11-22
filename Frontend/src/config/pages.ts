/**
 * Page metadata is intentionally kept separate from the views.
 * This module can later be replaced by an API-backed loader without changing
 * the layouts or page components that consume it.
 */
export interface PageConfig {
  version: string;
}

export const pageConfigs = {
  lab: {
    version: 'v7.6 · Blueprint',
  },
  lib: {
    version: 'v1.0 · Library',
  },
} satisfies Record<string, PageConfig>;

export type PageId = keyof typeof pageConfigs;
