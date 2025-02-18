import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { GenrePage } from './pages/GenrePage';
import { Footer } from './components/Footer';
// import { Header} from './components/Header';


export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/genre/:genreId" element={<GenrePage />} />
            {/* <Route path="/search" element={<Header />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}