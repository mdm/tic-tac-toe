import { useContext, useEffect, useState } from "react";

import PlayerContext from "../store/PlayerContext";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Board from "../components/Board";
import API from "../api";

const Match: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const [moves, setMoves] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_subscription, setSubscription] =
    useState<(ActionCable.Channel & ActionCable.CreateMixin) | undefined>(
      undefined
    );

  const loadHandler = (allMoves: number[]) => {
    if (moves.length === 0) {
      setMoves(allMoves);
    }
  };

  const moveHandler = (cell: number) => {
    setMoves((prevMoves) => {
      return prevMoves.concat(cell);
    });
  };

  const makeMoveHandler = (cell: number) => {
    if (playerContext.match) {
      API.makeMove(playerContext.match.id, cell).then().catch();
    }
  };

  useEffect(() => {
    if (playerContext.match) {
      setSubscription(
        playerContext.subscribeChannel(
          { channel: "MoveChannel", match: playerContext.match.id },
          {
            received: (data) => {
              switch (data.event) {
                case "moves":
                  loadHandler(data.moves);
                  break;
                case "move":
                  moveHandler(data.cell);
                  break;
                default:
                  break;
              }
            },
          }
        )
      );
    }

    return () => {
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
        <Board cells={['X', 'O', '.', 'X', 'O', '.', 'X', 'O', '.']} onMove={makeMoveHandler}></Board>
      </Wrapper>
    </div>
  );
};

export default Match;
