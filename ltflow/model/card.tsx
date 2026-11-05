export type Section = {
  id: number;
  section_title: string | null;
  cards: Card[];
  identifier: string | null;
  sequence: string | null;
};

export type Card = {
  id: number;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  link: string | null;
  link_label: string | null;
  identifier: string | null;
  sequence: string | null;
  image: StrapiImage | null;
};

export type StrapiImage = {
  id: number;
  url: string | null;
  alternativeText: string | null;
  formats?: { thumbnail?: { url: string } };
};
