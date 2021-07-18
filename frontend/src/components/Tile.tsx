import Cell from "./Cell";

const Tile: React.FC<{
  symbol: string;
  onMove: () => void;
}> = ({ symbol, onMove }) => {
  return (
    <Cell>
      {symbol === "X" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 100 100"
        >
          <path
            d="M 15 50 L 85 50 M 50 15 L 50 85"
            transform="rotate(45 50 50)"
            fill="none"
            stroke="white"
            strokeWidth="15"
          />
        </svg>
      ) : null}
      {symbol === "O" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="white"
            strokeWidth="15"
          />
        </svg>
      ) : null}
    </Cell>
  );
};

export default Tile;
