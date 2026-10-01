import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Video } from '../../types/movie';

interface TrailerModalProps {
  videos: Video[];
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal = ({ videos, isOpen, onClose }: TrailerModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close trailer"
              className="absolute -top-2 -right-2 sm:top-0 sm:right-0 z-10 w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videos[0]?.key}?autoplay=1&rel=0`}
                title={videos[0]?.name || 'Trailer'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {videos.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 border border-white/5 hover:border-red-500/30 text-gray-300 hover:text-white text-xs transition-all truncate max-w-[240px]"
                  >
                    {video.type}
                    {video.official && ' · Official'}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};