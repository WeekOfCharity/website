import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './app';
import { Home } from './pages/Home';
import { Placeholder } from './pages/Placeholder';
import { Program } from './pages/Program';

const app = document.getElementById('app');
const root = createRoot(app!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="streams" element={<Program />} />
          <Route path="spiele" element={<Placeholder />} />
          <Route path="team" element={<Placeholder />} />
          <Route path="datenschutz" element={<Placeholder />} />
          <Route path="impressum" element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
