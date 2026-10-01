import { Film, Mail, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-white">MovieHub</span>
            </Link>
            <p className="text-gray-400">
              Your ultimate destination for discovering and exploring movies from around the world.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/genre/28" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Action Movies
                </Link>
              </li>
              <li>
                <Link to="/genre/35" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Comedy Movies
                </Link>
              </li>
              <li>
                <Link to="/genre/18" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Drama Movies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-4 text-gray-400">
              Contact us: support@moviehub.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} MovieHub. All rights reserved.</p>
          <p className="mt-2 text-sm">
           You'll get the Latest updates on Movies Here 
          </p>
        </div>
      </div>
    </footer>
  );
};