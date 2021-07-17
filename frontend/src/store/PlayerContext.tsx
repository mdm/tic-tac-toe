import { createContext, useState } from "react";

type Player = {
  displayName: string;
  authenticated: boolean;
};

const PlayerContext = createContext({
  displayName: "",
  authenticated: false,
  loginPlayer: (_displayName: string) => {},
  logoutPlayer: () => {},
});

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [player, setPlayer] = useState<Player>({
    displayName: "",
    authenticated: false,
  });

  const loginPlayer = (displayName: string) => {
    setPlayer({
      displayName,
      authenticated: true,
    });
  };

  const logoutPlayer = () => {
    setPlayer({
      displayName: "",
      authenticated: false,
    });
  };

  const context = {
    loginPlayer,
    logoutPlayer,
    ...player,
  };

  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContext;
