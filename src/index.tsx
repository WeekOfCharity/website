import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './app';
import { Activities } from './pages/Activities';
import { Gallery } from './pages/Gallery';
import { GoalWidget } from './pages/GoalWidget';
import { Home } from './pages/Home';
import { Imprint } from './pages/Imprint';
import { Music } from './pages/Music';
import { Privacy } from './pages/Privacy';
import { Program } from './pages/Program';
import { Projects } from './pages/Projects';
import { Team } from './pages/Team';
import { Widget } from './widget';

const app = document.getElementById('app');
const root = createRoot(app!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="projekte" element={<Projects />} />
          <Route path="streams" element={<Program />} />
          <Route path="aktivitaeten" element={<Activities />} />
          <Route path="team" element={<Team />} />
          <Route path="galerie" element={<Gallery />} />
          <Route path="datenschutz" element={<Privacy />} />
          <Route path="impressum" element={<Imprint />} />
          <Route path="musik" element={<Music />} />
        </Route>
        <Route path="widgets" element={<Widget />}>
          <Route path="goal" element={<GoalWidget />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
