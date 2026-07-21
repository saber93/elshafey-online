export const languages = ["en", "ar"] as const;

export type Language = (typeof languages)[number];

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}
