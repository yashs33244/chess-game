import { ReactNode, MouseEventHandler } from 'react';

interface GameModeComponentProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled: boolean;
  badge?: string;
}

const GameModeComponent = ({
  icon,
  title,
  description,
  onClick,
  disabled,
  badge,
}: GameModeComponentProps) => (
  <div
    onClick={disabled ? undefined : onClick}
    className={`group relative flex items-center gap-4 rounded-xl p-4 transition-all duration-200 border border-transparent
      ${disabled
        ? 'opacity-60 cursor-not-allowed bg-bgAuxiliary2/50'
        : 'cursor-pointer bg-bgAuxiliary2 hover:border-green-600/50 hover:bg-bgAuxiliary2/80 hover:shadow-[0_0_16px_rgba(22,163,74,0.15)] active:scale-[0.98]'
      }`}
  >
    <div className={`flex-shrink-0 p-2 rounded-lg ${disabled ? 'bg-slate-700/40' : 'bg-green-900/30 group-hover:bg-green-900/50 transition-colors'}`}>
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-slate-200 leading-none">{title}</p>
        {badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs mt-1.5 text-slate-400">{description}</p>
      {disabled && (
        <p className="text-[10px] mt-1 font-semibold text-slate-500 uppercase tracking-wider">Coming soon</p>
      )}
    </div>

    {!disabled && (
      <div className="flex-shrink-0 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity text-lg">›</div>
    )}
  </div>
);

export default GameModeComponent;
