import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BorderNav } from './components/BorderNav/BorderNav';
import { Nav } from './components/Nav/Nav';
import Player from './components/Player/Player';

const accents = {
  '/program': 'woc-accent-aqua',
  '/games': 'woc-accent-arctic',
  '/team': 'woc-accent-lavender',
  '/privacy': 'woc-accent-neutral',
  '/imprint': 'woc-accent-neutral',
};

export const App = () => {
  const [accent, setAccent] = useState('woc-accent-persian');
  const { pathname } = useLocation();

  useEffect(() => {
    setAccent(
      Object.entries(accents).find(([path]) =>
        pathname.startsWith(path)
      )?.[1] ?? 'woc-accent-persian'
    );
  }, [pathname]);

  return (
    <div className={classNames('min-h-screen overflow-hidden', accent)}>
      <BorderNav />
      <Nav />
      <Outlet />
      <Player />
    </div>
  );
};
