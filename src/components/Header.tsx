
import { Search, Film, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home page with search query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowMobileSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <Film className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl sm:text-2xl font-bold text-white">
              Movie<span className="text-red-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-400 transition-colors" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white text-sm rounded-full 
                         py-2.5 pl-11 pr-4 border border-white/5
                         focus:outline-none focus:border-red-500/50 focus:bg-white/15
                         placeholder-gray-500 transition-all duration-300"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label={showMobileSearch ? 'Close search' : 'Open search'}
              className="md:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              {showMobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white text-sm rounded-xl 
                         py-3 pl-11 pr-4 border border-white/5
                         focus:outline-none focus:border-red-500/50 focus:bg-white/15
                         placeholder-gray-500 transition-all duration-300"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>
    </header>
  );
};