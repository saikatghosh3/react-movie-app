export const SUPPORT_EMAIL = 'support@moviehub.com';
export const LEGAL_LAST_UPDATED = 'October 2, 2026';

export const LEGAL_DOCS = [
  { key: 'privacy', to: '/privacy-policy', label: 'Privacy Policy' },
  { key: 'terms', to: '/terms-of-service', label: 'Terms of Service' },
  { key: 'cookies', to: '/cookie-policy', label: 'Cookie Policy' }
] as const;

export type LegalDocKey = (typeof LEGAL_DOCS)[number]['key'];
