import { Card } from "react-bootstrap";

import Grid from "./Grid";
import Tile from "./Tile";

const Board: React.FC<{
  cells: string[];
  onMove: (cell: number) => void;
}> = ({ cells, onMove }) => {
  return (
    <Card>
      <Grid>
        {cells.map((cell, i) => {
          return <Tile key={i} symbol={cell} onMove={onMove.bind(null, i)}></Tile>;
        })}
      </Grid>
    </Card>
  );
};

export default Board;
