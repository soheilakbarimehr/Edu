import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 ml-2',
    right: 'left-full top-1/2 -translate-y-1/2 mr-2'
  };

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${positions[position]} scale-0 transition-all group-hover:scale-100 whitespace-nowrap px-2 py-1 text-xs rounded bg-gray-800 text-white z-50`}>
        {content}
      </div>
    </div>
  );
}