import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Activities } from "./pages/Activities";
import { Gallery } from "./pages/Gallery";
import { GoalWidget } from "./pages/GoalWidget";
import { Home } from "./pages/Home";
import { Imprint } from "./pages/Imprint";
import { Music } from "./pages/Music";
import { Privacy } from "./pages/Privacy";
import { Program } from "./pages/Program";
import { Projects } from "./pages/Projects";
import { Team } from "./pages/Team";
import { Widget } from "./widget";
import { initi18n } from "./i18n/i18n";

initi18n();

const root = createRoot(document.getElementById("root")!);

function ExternalRedirect({ to }: { to: string }) {
  window.location.replace(to);
  return null;
}

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
        <Route
          path="spieleshuffle"
          element={
            <ExternalRedirect to="https://docs.google.com/document/d/1Z8eH0db7QbFR9eBO5S6xekgxIRLhXFtWE4lTihdzVRs/edit?usp=sharing" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
