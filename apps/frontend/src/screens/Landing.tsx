import { PlayCard } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { useThemeContext } from '@/hooks/useThemes';
import { THEMES_DATA } from '@/constants/themes';

export const Landing = () => {
  const { theme } = useThemeContext();
  const currentTheme = THEMES_DATA.find(data => data.name === theme);

  const boardSrc = currentTheme
    ? currentTheme['board-image']
    : 'https://res.cloudinary.com/dcugqfvvg/image/upload/v1713647295/standardboard.1d6f9426_asqzum.png';

  return (
    <>
      <div className="max-w-full mt-0">
        <div className="flex flex-col md:flex-row w-full gap-x-16 items-center">
          <img
            className="rounded-xl w-full h-[600px] object-cover hidden md:block shadow-2xl"
            src={boardSrc}
            alt="chess-board"
          />
          <div className="flex items-center justify-center w-full md:w-auto">
            <PlayCard />
          </div>
        </div>
      </div>

      <div className="mt-24 bg-bgAuxiliary2 text-textMain w-full px-10 py-12 rounded-3xl">
        <div className="lg:grid grid-cols-[45%,1fr] gap-20 items-center">
          <div className="rounded-xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657312/undraw_questions_re_1fy7_kqjpu3.svg"
              alt="question illustration"
              className="w-full"
            />
          </div>
          <div className="mt-10 lg:mt-0">
            <h2 className="text-5xl font-bold leading-tight">
              Found a bug?
            </h2>
            <p className="text-lg mt-4 text-slate-400">
              Open an issue on GitHub — contributions are welcome too.
            </p>
            <a
              href="https://github.com/yashs33244/chess-game/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-4 rounded-2xl px-6 py-4 border border-slate-600 bg-transparent hover:bg-slate-700/40 transition-colors text-xl"
            >
              <img
                className="w-10 h-10"
                src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657100/github-svgrepo-com_uosbko.svg"
                alt="github"
              />
              Open an Issue
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
