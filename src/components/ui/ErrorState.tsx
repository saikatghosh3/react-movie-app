import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We could not reach the movie database. Please check your connection and try again.',
  onRetry
}: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
      <AlertTriangle className="w-9 h-9 text-red-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 max-w-md mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
      >
        <RefreshCw className="w-4 h-4" />
        Try again
      </button>
    )}
  </div>
);