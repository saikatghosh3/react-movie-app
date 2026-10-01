export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: '', label: 'All languages', flag: '\u{1F30D}' },
  { code: 'en', label: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'hi', label: 'Hindi', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'bn', label: 'Bengali', flag: '\u{1F1E7}\u{1F1E9}' },
  { code: 'ta', label: 'Tamil', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'te', label: 'Telugu', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'ml', label: 'Malayalam', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'kn', label: 'Kannada', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'mr', label: 'Marathi', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'gu', label: 'Gujarati', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'pa', label: 'Punjabi', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'es', label: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'fr', label: 'French', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'de', label: 'German', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'it', label: 'Italian', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'pt', label: 'Portuguese', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'ja', label: 'Japanese', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'ko', label: 'Korean', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: 'zh', label: 'Chinese', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'ru', label: 'Russian', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'ar', label: 'Arabic', flag: '\u{1F1F8}\u{1F1E6}' }
];

export const getLanguage = (code: string): Language =>
  LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];

export const toLanguageOptions = () =>
  LANGUAGES.map((language) => ({
    value: language.code,
    label: `${language.flag}  ${language.label}`
  }));

export const GENRE_ICONS: Record<number, string> = {
  28: '\u{1F4A5}',
  12: '\u{1F5FA}\u{FE0F}',
  16: '\u{1F3A8}',
  35: '\u{1F602}',
  80: '\u{1F575}\u{FE0F}',
  99: '\u{1F4DA}',
  18: '\u{1F3AD}',
  10751: '\u{1F46A}',
  14: '\u{1F9D9}',
  36: '\u{1F4DC}',
  27: '\u{1F47B}',
  10402: '\u{1F3B5}',
  9648: '\u{1F50E}',
  10749: '\u{1F495}',
  878: '\u{1F680}',
  10770: '\u{1F4FA}',
  53: '\u{1F50D}',
  10752: '\u{2694}\u{FE0F}',
  37: '\u{1F920}'
};

export const genreIcon = (id: number): string => GENRE_ICONS[id] ?? '\u{1F3AC}';