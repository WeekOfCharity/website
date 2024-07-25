import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export type GameState = {
  found: number;
  firstDialogOpen: boolean;
};

export const GameStateContext = createContext<GameState>(null);
export const SetGameStateContext =
  createContext<Dispatch<SetStateAction<GameState>>>(null);

export const GameStateProvider = ({ children }: PropsWithChildren) => {
  const [gameState, setGameState] = useState<GameState>({
    found: 0,
    firstDialogOpen: false,
  });

  const handleSetGameState: Dispatch<SetStateAction<GameState>> = (
    setStateAction: SetStateAction<GameState>
  ) => {
    setGameState(setStateAction);
  };

  return (
    <GameStateContext.Provider value={gameState}>
      <SetGameStateContext.Provider value={handleSetGameState}>
        {children}
      </SetGameStateContext.Provider>
    </GameStateContext.Provider>
  );
};
