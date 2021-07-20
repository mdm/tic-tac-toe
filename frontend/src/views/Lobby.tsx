import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import PlayerContext from "../store/PlayerContext";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import PlayerList from "../components/PlayerList";
import API from "../api";

const Lobby: React.FC = () => {
  const history = useHistory();
  const playerContext = useContext(PlayerContext);
  const [players, setPlayers] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_subscription, setSubscription] =
    useState<(ActionCable.Channel & ActionCable.CreateMixin) | undefined>(
      undefined
    );

  const listHandler = (allPlayers: string[]) => {
    allPlayers.sort();
    console.log("LIST", allPlayers);
    setPlayers(allPlayers);
  };

  const joinHandler = (joiningPlayer: string) => {
    console.log("JOIN", joiningPlayer);
    setPlayers((prevPlayers) => {
      return prevPlayers
        .filter((player) => player !== joiningPlayer)
        .concat(joiningPlayer)
        .sort();
    });
  };

  const partHandler = (partingPlayer: string) => {
    console.log("PART", partingPlayer);
    setPlayers((prevPlayers) => {
      return prevPlayers.filter(
        (player) =>
          player === playerContext.displayName || player !== partingPlayer
      );
    });
  };

  const challengeHandler = (matchId: number) => {
    history.push(`/match/${matchId}`);
  };

  const createMatchHandler = (opponent: string) => {
    API.createMatch(opponent)
      .then((response) => {
        if (response.status === 201) {
          const id = response.data.id;
          history.push(`/match/${id}`);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          playerContext.logoutPlayer();
        }
      });
  };

  useEffect(() => {
    console.log("SUB");
    setSubscription(
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
            case "challenge":
              challengeHandler(data.match.id);
              break;
            default:
              break;
          }
        },
      })
    );

    return () => {
      console.log("UNSUB");
      setSubscription((prevSubscription) => {
        prevSubscription?.unsubscribe();
        return undefined;
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Header />
      <Wrapper>
        <h1>Hello, {playerContext.displayName}!</h1>
        <PlayerList
          players={players}
          me={playerContext.displayName}
          onChallenge={createMatchHandler}
        />
      </Wrapper>
    </div>
  );
};

export default Lobby;
