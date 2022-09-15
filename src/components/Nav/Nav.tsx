import { mdiClose, mdiMenu, mdiTwitter } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brush1 } from '../Brushes/Brush1';
import { Brush2 } from '../Brushes/Brush2';

const logo = new URL('../../assets/inverted-favicon-22.png', import.meta.url);

export const Nav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <nav className="flex items-center p-5 md:p-10 select-none sticky text-neutral-800 top-0 w-full z-[99999]">
      <div className="pr-6 relative">
        <Brush2 className="absolute h-8 -left-6 text-accent-100 top-3 w-auto" />

        <div className="font-brush leading-none -rotate-3 -skew-x-6 text-2xl transform-gpu">
          <span>Week of</span>
          <br />
          <span className="ml-3">Charity</span>
        </div>

        <span className="absolute font-fat right-1 rotate-3 text-accent-500 top-3">'22</span>
      </div>

      <menu className="md:flex hidden items-center ml-auto space-x-5">
        <NavLink className={({ isActive }) => classNames(isActive ? 'text-persian-500' : 'hover:text-persian-500')} to="/">
          <span className="font-pally font-medium text-lg">Startseite</span>
        </NavLink>
        <NavLink className={({ isActive }) => classNames(isActive ? 'text-aqua-500' : 'hover:text-aqua-500')} to="/streams">
          <span className="font-pally font-medium text-lg">Programm</span>
        </NavLink>
        <NavLink className={({ isActive }) => classNames(isActive ? 'text-arctic-500' : 'hover:text-arctic-500')} to="/aktivitaeten">
          <span className="font-pally font-medium text-lg">Aktivitäten</span>
        </NavLink>
        <NavLink className={({ isActive }) => classNames(isActive ? 'text-lavender-500' : 'hover:text-lavender-500')} to="/team">
          <span className="font-pally font-medium text-lg">Team</span>
        </NavLink>
        <a href="#">
          <span>
            <Icon path={mdiTwitter} size="1.25rem" />
          </span>
        </a>
      </menu>

      <button className="bg-accent-500 md:hidden inline-flex items-center leading-none ml-auto px-5 py-[14px] rounded-full text-white">
        <span className="font-semibold">Spenden</span>
      </button>

      <button className="bg-neutral-800 md:hidden inline-flex items-center leading-none ml-2 p-3 rounded-full text-white" onClick={() => setMenuOpen(true)}>
        <Icon path={mdiMenu} size="1.25rem" />
      </button>

      <aside
        className={classNames('absolute bg-neutral-800 duration-300 ease-in-out h-screen overflow-hidden p-5 right-0 top-0 transform-gpu transition w-full z-[99999]', {
          'translate-x-0': isMenuOpen,
          'translate-x-full': !isMenuOpen,
        })}
      >
        <Brush1 className="absolute -right-24 text-accent-500 -top-8 w-[400px] -z-10" />

        <div className="flex items-center mb-10">
          <img className="h-12" src={logo.toString()} />

          <button className="bg-white inline-flex items-center leading-none ml-auto p-3 rounded-full" onClick={() => setMenuOpen(false)}>
            <Icon path={mdiClose} size="1.25rem" />
          </button>
        </div>

        <menu className="flex flex-col space-y-5 text-white">
          <NavLink className={({ isActive }) => classNames(isActive ? 'text-persian-500' : 'hover:text-persian-500')} onClick={() => setMenuOpen(false)} to="/">
            <span className="font-pally font-medium text-2xl">Startseite</span>
          </NavLink>
          <NavLink className={({ isActive }) => classNames(isActive ? 'text-aqua-500' : 'hover:text-aqua-500')} onClick={() => setMenuOpen(false)} to="/streams">
            <span className="font-pally font-medium text-2xl">Programm</span>
          </NavLink>
          <NavLink className={({ isActive }) => classNames(isActive ? 'text-arctic-500' : 'hover:text-arctic-500')} onClick={() => setMenuOpen(false)} to="/aktivitaeten">
            <span className="font-pally font-medium text-2xl">Aktivitäten</span>
          </NavLink>
          <NavLink className={({ isActive }) => classNames(isActive ? 'text-lavender-500' : 'hover:text-lavender-500')} onClick={() => setMenuOpen(false)} to="/team">
            <span className="font-pally font-medium text-2xl">Team</span>
          </NavLink>
          <a href="#">
            <span className="font-pally font-medium hover:text-mustard-500 text-2xl">Merchandise</span>
          </a>
          <a href="#">
            <Icon path={mdiTwitter} size="1.5rem" />
          </a>
        </menu>

        <menu className="border-t flex flex-col mt-10 pt-5 space-y-2 text-neutral-400">
          <Link className="hover:text-white" onClick={() => setMenuOpen(false)} to="/datenschutz">
            <span className="font-semibold">Datenschutz</span>
          </Link>
          <Link className="hover:text-white" onClick={() => setMenuOpen(false)} to="/impressum">
            <span className="font-semibold">Impressum</span>
          </Link>
        </menu>
      </aside>
    </nav>
  );
};
