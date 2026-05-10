
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Film, ChevronDown, X } from 'lucide-react';

const categories = [
  { id: 28, name: 'Action', icon: '💥' },
  { id: 12, name: 'Adventure', icon: '🗺️' },
  { id: 16, name: 'Animation', icon: '🎨' },
  { id: 35, name: 'Comedy', icon: '😂' },
  { id: 80, name: 'Crime', icon: '🕵️' },
  { id: 18, name: 'Drama', icon: '🎭' },
  { id: 14, name: 'Fantasy', icon: '🧙' },
  { id: 27, name: 'Horror', icon: '👻' },
  { id: 10749, name: 'Romance', icon: '💕' },
  { id: 878, name: 'Science Fiction', icon: '🚀' },
  { id: 99, name: 'Documentary', icon: '📚' },
  { id: 36, name: 'History', icon: '📜' },
  { id: 10402, name: 'Music', icon: '🎵' },
  { id: 10752, name: 'War', icon: '⚔️' },
  { id: 37, name: 'Western', icon: '🤠' },
  { id: 10770, name: 'TV Movie', icon: '📺' },
  { id: 53, name: 'Thriller', icon: '🔍' },
];

export const MovieCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentGenre = searchParams.get('genre');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (genreId: number) => {
    navigate(`/genre/${genreId}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeCategory = categories.find(cat => cat.id.toString() === currentGenre);

  return (
    <div className="relative z-[999999]" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative px-4 sm:px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 
                   hover:from-red-500 hover:to-red-600 text-white rounded-xl shadow-lg 
                   hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-2 
                   text-sm font-medium border border-red-500/20"
      >
        <Film className="w-4 h-4" />
        <span className="hidden sm:inline">
          {activeCategory ? activeCategory.name : 'Categories'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown */}
      {isOpen && (
      <div className="fixed lg:absolute inset-x-4 lg:inset-auto lg:right-0 lg:top-full lg:mt-3 
                      top-20 lg:top-auto lg:bottom-auto z-50 lg:w-[480px] max-w-[calc(100vw-32px)] lg:max-w-[480px]
                      bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl 
                      shadow-black/50 max-h-[70vh] lg:max-h-[500px] overflow-hidden">
          
          {/* Header */}
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 
                        px-5 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Film className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Movie Categories</h3>
                <p className="text-gray-500 text-xs">Browse by genre</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center 
                       text-gray-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="p-4 lg:p-5 overflow-y-auto max-h-[calc(70vh-80px)] lg:max-h-[400px]">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const isSelected = currentGenre === category.id.toString();
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`group relative overflow-hidden rounded-xl p-3 text-left 
                             transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                             ${isSelected 
                               ? 'bg-red-500/20 border-red-500/40 shadow-lg shadow-red-500/10' 
                               : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/10'
                             }
                             border`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">{category.icon}</span>
                      <div className="min-w-0 flex-1">
                        <span className={`block text-sm font-medium truncate ${
                          isSelected ? 'text-red-400' : 'text-gray-200'
                        }`}>
                          {category.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-red-400/70 mt-0.5 block">
                            Selected
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 
                        px-5 py-3">
            <p className="text-xs text-gray-600 text-center">
              {categories.length} categories available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};