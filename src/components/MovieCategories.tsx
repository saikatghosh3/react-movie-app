
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const categories = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 99, name: 'Documentary' },
  { id: 36, name: 'History' },
  { id: 10402, name: 'Music' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  
];

export const MovieCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentGenre = searchParams.get('genre');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (genreId: number) => {
    navigate(`/genre/${genreId}`);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition"
      >
        Movie Categories
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 z-10 w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Categories</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-gray-100 transition"
              aria-label="Close"
            >
              ✖
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => {
              const isSelected = currentGenre === category.id.toString();
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-primary-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  aria-pressed={isSelected}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
