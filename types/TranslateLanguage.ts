export const TranslateLanguages = ["EN", "JP", "KO"] as const;

export type TranslateLanguage = (typeof TranslateLanguages)[number];
