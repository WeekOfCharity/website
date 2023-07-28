import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BorderNav } from './components/BorderNav/BorderNav';
import { Nav } from './components/Nav/Nav';
import Player from './components/Player/Player';

const accents = {
  '/projekte': 'woc-accent-persian',
  '/streams': 'woc-accent-aqua',
  '/aktivitaeten': 'woc-accent-arctic',
  '/team': 'woc-accent-lavender',
  '/galerie': 'woc-accent-arctic',
  '/datenschutz': 'woc-accent-neutral',
  '/impressum': 'woc-accent-neutral',
};

export const App = () => {
  const [accent, setAccent] = useState('woc-accent-persian');
  const { pathname } = useLocation();

  const client = new QueryClient();

  useEffect(() => {
    setAccent(Object.entries(accents).find(([path]) => pathname.startsWith(path))?.[1] ?? 'woc-accent-persian');
  }, [pathname]);

  return (
    <QueryClientProvider client={client}>
      <div className={classNames('min-h-screen overflow-hidden', accent)}>
        <BorderNav />
        <Nav />
        <Outlet />
        <Player />
      </div>
    </QueryClientProvider>
  );
};
