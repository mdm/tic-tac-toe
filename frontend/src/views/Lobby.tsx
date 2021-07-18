import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

import PlayerContext from "../store/PlayerContext";

const Lobby: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const [players, setPlayers] = useState<string[]>([]);

  const listHandler = (allPlayers: string[]) => {
    setPlayers(allPlayers);
  };

  const joinHandler = (joiningPlayer: string) => {
    setPlayers((prevPlayers) => {
      return prevPlayers
        .filter((player) => player !== joiningPlayer)
        .concat(joiningPlayer)
        .sort();
    });
  };

  const partHandler = (partingPlayer: string) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.filter(
        (player) =>
          player === playerContext.displayName || player !== partingPlayer
      );
    });
  };

  useEffect(() => {
    playerContext.subscribeChannel("PlayerChannel", {
      received: (data) => {
        switch (data.event) {
          case "list":
            listHandler(data.players);
            break;
          case "join":
            joinHandler(data.player);
            break;
          case "part":
            partHandler(data.player);
            break;
          default:
            break;
        }
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Hello, {playerContext.displayName}!</h1>
      <Button onClick={playerContext.logoutPlayer}>Logout</Button>
      <ul>
        {players.map((player) => {
          return <li key={player}>{player}</li>;
        })}
      </ul>
    </div>
  );
};

export default Lobby;
