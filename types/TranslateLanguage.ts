const TranslateLanguageEntries = [
  ["en", "🇬🇧English"],
  ["ja", "🇯🇵Japanese"],
  ["ko", "🇰🇷Korean"],
] as const;

export const TranslateLanguageMap = new Map<string, string>(
  TranslateLanguageEntries,
);

export type TranslateLanguage = (typeof TranslateLanguageEntries)[number][0];
