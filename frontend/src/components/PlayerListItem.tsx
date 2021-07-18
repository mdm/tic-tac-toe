import { Button, ListGroup } from "react-bootstrap";

const PlayerListItem: React.FC<{
  player: string;
  me: boolean;
  onChallenge: () => void;
}> = ({ player, me, onChallenge }) => {
  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between">
      <div>{player}{me ? " (you)" : ""}</div>
      <Button onClick={onChallenge} disabled={me}>Challenge!</Button>
    </ListGroup.Item>
  );
};

export default PlayerListItem;
