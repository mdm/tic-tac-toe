import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import PlayerContext from "../store/PlayerContext";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Board from "../components/Board";
import API from "../api";

type MatchDetails = {
  id: number;
  noughts: string;
  crosses: string;
};

const Match: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const { id: matchId } = useParams<{ id: string }>();
  const [match, setMatch] = useState<MatchDetails | undefined>(undefined);
  const [moves, setMoves] = useState<number[]>([]);
  const [result, setResult] = useState<string>("unknown");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_subscription, setSubscription] =
    useState<(ActionCable.Channel & ActionCable.CreateMixin) | undefined>(
      undefined
    );

  const movesToCells = () => {
    const cells = [".", ".", ".", ".", ".", ".", ".", ".", "."];

    moves.forEach((cell, i) => {
      cells[cell] = i % 2 === 0 ? "X" : "O";
    });

    return cells;
  };

  const loadHandler = (
    matchDetails: MatchDetails,
    movesSoFar: number[],
    matchResult: string
  ) => {
    setMatch(matchDetails);
    setMoves(movesSoFar);
    setResult(matchResult);
  };

  const moveHandler = (cell: number, matchResult: string) => {
    setMoves((prevMoves) => {
      return prevMoves.concat(cell);
    });
    setResult(matchResult);
  };

  const makeMoveHandler = (cell: number) => {
    API.makeMove(matchId, cell)
      .then((response) => {
          // no action necessary. move details handled via web socket.
      })
      .catch((error) => {
        playerContext.logoutPlayer();
      });
  };

  const myTurn = () => {
    if (match) {
      return (
        (match.noughts === playerContext.displayName &&
          moves.length % 2 === 0) ||
        (match.crosses === playerContext.displayName && moves.length % 2 !== 0)
      );
    } else {
      return false;
    }
  };

  const formattedResult = () => {
    if (match && result === "noughts") {
      return match.noughts === playerContext.displayName
        ? "You won!"
        : "You lost!";
    }

    if (match && result === "crosses") {
      return match.crosses === playerContext.displayName
        ? "You won!"
        : "You lost!";
    }

    if (result === "draw") {
      return "It's a draw!";
    }

    return myTurn() ? "It's your turn" : "It's the opponen's turn";
  };

  useEffect(() => {
    setSubscription(
      playerContext.subscribeChannel(
        { channel: "MoveChannel", match: matchId },
        {
          received: (data) => {
            switch (data.event) {
              case "moves":
                loadHandler(data.match, data.moves, data.result);
                break;
              case "move":
                moveHandler(data.cell, data.result);
                break;
              default:
                break;
            }
          },
        }
      )
    );

    return () => {
      setSubscription((prevSubscription) => {
        prevSubscription?.unsubscribe();
        return undefined;
      });
    };
  }, [matchId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Header />
      <Wrapper>
        <h2>{formattedResult()}</h2>
        <Board cells={movesToCells()} onMove={makeMoveHandler}></Board>
      </Wrapper>
    </div>
  );
};

export default Match;
