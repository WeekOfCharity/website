import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BorderNav } from "./components/BorderNav/BorderNav";
import { Nav } from "./components/Nav/Nav";
import Player from "./components/Player/Player";

import "./App.css";

const accents = {
  "/projekte": "woc-accent-royal",
  "/streams": "woc-accent-mint",
  "/aktivitaeten": "woc-accent-pink",
  "/team": "woc-accent-royal",
  "/galerie": "woc-accent-mint",
  "/datenschutz": "woc-accent-neutral",
  "/impressum": "woc-accent-neutral",
  "/musik": "woc-accent-mint",
};

export const App = () => {
  const [accent, setAccent] = useState("woc-accent-pink");
  const { pathname } = useLocation();

  const client = new QueryClient();

  useEffect(() => {
    setAccent(
      Object.entries(accents).find(([path]) =>
        pathname.startsWith(path)
      )?.[1] ?? "woc-accent-pink"
    );
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.scrollbarGutter = "unset";
    document.body.style.scrollbarGutter = "unset";
  }, [pathname]);

  return (
    <QueryClientProvider client={client}>
      <div className={classNames("min-h-screen overflow-hidden", accent)}>
        <BorderNav />
        <Nav />
        <Outlet />
        <Player />
      </div>
    </QueryClientProvider>
  );
};
