export const formatCurrency = (value: number): string => {
  if (!value || value <= 0) return 'Unknown';
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${value.toLocaleString('en-US')}`;
};

export const formatRuntime = (minutes: number | null): string => {
  if (!minutes || minutes <= 0) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const formatReleaseDate = (date: string): string => {
  if (!date) return 'TBA';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return 'TBA';
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getYear = (date: string): number | null => {
  if (!date) return null;
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? null : year;
};

export const formatVoteCount = (count: number): string => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
};

export const getStatusTone = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'released':
      return 'bg-green-500/15 text-green-300 border-green-500/30';
    case 'post production':
      return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
    case 'in production':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'planned':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    case 'rumored':
      return 'bg-gray-500/15 text-gray-300 border-gray-500/30';
    case 'canceled':
      return 'bg-red-500/15 text-red-300 border-red-500/30';
    default:
      return 'bg-white/5 text-gray-300 border-white/10';
  }
};

export const crewGroups = (crew: { job: string; name: string }[]) => {
  const pick = (jobs: string[]) =>
    crew.filter((member) => jobs.includes(member.job)).map((member) => member.name);

  const unique = (names: string[]) => Array.from(new Set(names));

  return {
    Director: unique(pick(['Director'])),
    Writer: unique(pick(['Writer', 'Screenplay', 'Story'])),
    Producer: unique(pick(['Producer']))
  };
};

export const friendlyError = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error ?? '');

  if (message.includes('401'))
    return 'Invalid or missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.';
  if (message.includes('404')) return 'We could not find that content.';
  if (message.includes('429')) return 'Too many requests. Please wait a moment and try again.';
  if (message.includes('Failed to fetch'))
    return 'Network request failed. Check your internet connection and try again.';
  if (message.includes('API_KEY')) return 'Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.';

  return message || 'Something went wrong. Please try again.';
};