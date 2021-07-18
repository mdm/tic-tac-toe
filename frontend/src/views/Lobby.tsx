import { useContext, useEffect, useState } from "react";

import PlayerContext from "../store/PlayerContext";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import PlayerList from "../components/PlayerList";

const Lobby: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const [players, setPlayers] = useState<string[]>([]);

  const listHandler = (allPlayers: string[]) => {
    allPlayers.sort();
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
      <Header />
      <Wrapper>
        <h1>Hello, {playerContext.displayName}!</h1>
        <PlayerList players={players} me={playerContext.displayName} onChallenge={alert}/>
      </Wrapper>
    </div>
  );
};

export default Lobby;
