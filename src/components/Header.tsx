import { Search, Film } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MovieCategories } from './MovieCategories';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" mr-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-white">MovieHub</span>
          </Link>

          {/* <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white rounded-full py-2 pl-10 pr-4 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 
                         placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form> */}
          <MovieCategories />
        </div>
        
      </div>
    </header>
  );
};









// import { Search, Film } from 'lucide-react';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { MovieCategories } from './MovieCategories';

// export const Header = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       console.log('Navigating to:', `/search?query=${encodeURIComponent(searchQuery)}`);
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//     } else {
//       console.warn('Search query is empty.');
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Film className="w-8 h-8 text-primary-500" />
//             <span className="text-xl font-bold text-white">MovieHub</span>
//           </Link>

//           <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search movies..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white/10 text-white rounded-full py-2 pl-10 pr-4 
//                          focus:outline-none focus:ring-2 focus:ring-primary-500 
//                          placeholder-gray-400"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </form>
//         </div>
//         <MovieCategories />
//       </div>
//     </header>
//   );
// };
