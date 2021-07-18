import { Card, ListGroup } from "react-bootstrap"

import PlayerListItem from "./PlayerListItem";

const PlayerList: React.FC<{
  players: string[];
  me: string;
  onChallenge: (opponent: string) => void;
}> = ({ players, me, onChallenge }) => {
  return (
    <Card>
      <Card.Header>Available Players</Card.Header>
      <ListGroup variant="flush">
        {players.map((player) => {
          return (
            <PlayerListItem
              key={player}
              player={player}
              me={player === me}
              onChallenge={onChallenge.bind(null, player)}
            />
          );
        })}
      </ListGroup>
    </Card>
  );
};

export default PlayerList;
