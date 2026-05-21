import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-32 py-12 text-gray-400 border-t border-slate-800">
      <div className="w-[96%] max-w-screen-lg mx-auto flex flex-col items-center gap-4">
        <p className="text-lg font-bold text-white">
          Rook<span className="text-green-500">House</span>
        </p>
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>·</span>
          <Link to="/settings" className="hover:text-white transition-colors">Settings</Link>
          <span>·</span>
          <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          <span>·</span>
          <Link to="/game/random" className="hover:text-white transition-colors">Play</Link>
        </div>
        <div className="flex gap-4 mt-2">
          <a href="https://github.com/yashs33244/chess-game" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/yashs3324" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <TwitterLogoIcon className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs text-slate-600 mt-2">© {new Date().getFullYear()} RookHouse</p>
      </div>
    </footer>
  );
};
