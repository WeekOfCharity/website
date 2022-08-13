import Icon from '@mdi/react';
import React from 'react';

type SocialButtonProps = {
  href?: string;
  icon: string;
  label: string;
  onClick?: React.MouseEventHandler;
};

export function SocialButton({
  href,
  icon,
  label,
  onClick,
}: SocialButtonProps) {
  return (
    <a
      className="hover:bg-lime-800 dark:hover:bg-emerald-500 cursor-pointer flex h-8 items-center px-2 rounded shadow text-lime-800 dark:text-lime-600 hover:text-white dark:hover:text-zinc-900 transition-all"
      href={href}
      onClick={onClick}
      target="_blank" rel="noreferrer"
    >
      <Icon className="sm:mr-2" path={icon} size="20px" />
      <span className="font-medium hidden text-sm sm:block">{label}</span>
    </a>
  );
}
