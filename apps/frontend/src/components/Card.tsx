import { useNavigate } from 'react-router-dom';
import computerIcon from '../../public/computer.png';
import lightningIcon from '../../public/lightning-bolt.png';
import friendIcon from '../../public/friendship.png';
import tournamentIcon from '../../public/trophy.png';
import variantsIcon from '../../public/strategy.png';
import GameModeComponent from './GameModeComponent';

const makeIcon = (src: string, alt: string) => (
  <img src={src} className="h-6 w-6" alt={alt} />
);

export function PlayCard() {
  const navigate = useNavigate();

  const gameModeData = [
    {
      icon: makeIcon(lightningIcon, 'online'),
      title: 'Play Online',
      description: 'Matched against a player of similar skill',
      onClick: () => navigate('/game/random'),
      disabled: false,
    },
    {
      icon: makeIcon(computerIcon, 'computer'),
      title: 'vs Computer',
      description: 'Challenge a bot from easy to master',
      disabled: true,
    },
    {
      icon: makeIcon(friendIcon, 'friend'),
      title: 'Play a Friend',
      description: 'Invite a friend to a private game',
      disabled: true,
    },
    {
      icon: makeIcon(tournamentIcon, 'tournament'),
      title: 'Tournaments',
      description: 'Join an arena where anyone can win',
      disabled: true,
      badge: 'SOON',
    },
    {
      icon: makeIcon(variantsIcon, 'variants'),
      title: 'Chess Variants',
      description: 'Explore fun new ways to play chess',
      disabled: true,
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Rook<span className="text-green-500">House</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">Your arena for chess</p>
      </div>

      <div className="flex flex-col gap-2">
        {gameModeData.map((data) => (
          <GameModeComponent key={data.title} {...data} />
        ))}
      </div>
    </div>
  );
}
