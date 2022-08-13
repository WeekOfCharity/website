import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './app';
import { Home } from './pages/Home';
import { Program } from './pages/Program';

const app = document.getElementById('app');
const root = createRoot(app!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="program" element={<Program />} />
          <Route path="games" element={<Program />} />
          <Route path="team" element={<Program />} />
          <Route path="privacy" element={<Program />} />
          <Route path="imprint" element={<Program />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
