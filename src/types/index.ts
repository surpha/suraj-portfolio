export interface PersonalMetadata {
  name: string;
  headline: string;
  company: string;
  education: string;
  resumeUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  link?: string;
}

export interface ContentRow {
  rowTitle: string;
  items: MediaItem[];
}

export interface HeroConfig {
  title: string;
  description: string;
  badge: string;
  actionLabel: string;
}

export interface DomainConfig {
  id: string;
  title: string;
  tagline: string;
  hero: HeroConfig;
  rows: ContentRow[];
}

export interface FullPortfolioConfig {
  personal: PersonalMetadata;
  domains: Record<string, DomainConfig>;
}
