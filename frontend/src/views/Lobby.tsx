import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";

import PlayerContext from "../store/PlayerContext";

const Lobby: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  
  return (
    <div>
      <h1>Hello, {playerContext.displayName}!</h1>
      <Button onClick={playerContext.logoutPlayer}>Logout</Button>
    </div>
  );
};

export default Lobby;
