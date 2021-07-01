import { useEffect, useState } from "react";
import "./styles.css";

const grid = [
  ["X", "X", "X"],
  ["X", "X", "X"],
  ["X", "X", "X"]
];
export default function App() {
  const [clickState, setClickState] = useState([]);
  const [winner, setWinner] = useState(-1);
  const [clickCounts, setclickCounts] = useState(0);

  const clicked = (rowId, cellId) => {
    const found = clickState.find((x) => x.row === rowId && x.cell === cellId);
    if (!found) {
      setClickState([
        ...clickState,
        {
          row: rowId,
          cell: cellId,
          clicked: true,
          Player: (clickCounts + 1) % 2 === 0
        }
      ]);
      setclickCounts(clickCounts + 1);
    }
  };

  const restore = (idx) => {
    setClickState(clickState.slice(0, idx + 1));
    setWinner(false);
    setclickCounts(clickState.slice(0, idx + 1).length);
  };

  const restart = () => {
    setClickState([]);
    setWinner(false);
    setclickCounts(0);
  };

  useEffect(() => {
    let row = false;
    let col = false;
    for (let i = 0; i < 3; i++) {
      const rowEntries = clickState.filter((x) => x.row === i);

      row =
        row ||
        (rowEntries.length === 3 &&
          (rowEntries.every((e) => e.Player) ||
            rowEntries.every((e) => !e.Player)));
    }

    for (let i = 0; i < 3; i++) {
      const colEntries = clickState.filter((x) => x.cell === i);

      col =
        col ||
        (colEntries.length === 3 &&
          (colEntries.every((e) => e.Player) ||
            colEntries.every((e) => !e.Player)));
    }

    const firstDiagonalEntries = clickState.filter((x) => x.cell === x.row);
    const firstDiagonal =
      firstDiagonalEntries.length === 3 &&
      (firstDiagonalEntries.every((e) => e.Player) ||
        firstDiagonalEntries.every((e) => !e.Player));

    const secondDiagonalEntries = clickState.filter(
      (x) => x.cell + x.row === 2
    );
    const secondDiagonal =
      secondDiagonalEntries.length === 3 &&
      (secondDiagonalEntries.every((e) => e.Player) ||
        secondDiagonalEntries.every((e) => !e.Player));

    setWinner(row || col || firstDiagonal || secondDiagonal);
  }, [clickState]);

  let winnerState = "None";
  if (clickState[clickState.length - 1]) {
    winnerState = clickState[clickState.length - 1].Player ? "Two" : "One";
  }

  return (
    <div className="App">
      <div class="winnner">{winner ? "Winner is " + winnerState : ""}</div>
      <div class="playerTurn">
        Player {clickCounts % 2 ? "Two" : "One"} turn
      </div>
      <div class="board">
        <div class="tictactoe">
          {grid.map((row, rowId) => {
            return (
              <div class="row">
                {row.map((e, cellId) => {
                  const found = clickState.find(
                    (x) => x.row === rowId && x.cell === cellId
                  );
                  if (found) {
                    const displaChar =
                      found.clicked && found.Player ? "X" : "0";
                    return (
                      <button
                        class="cell"
                        onClick={() => clicked(rowId, cellId)}
                      >
                        {displaChar}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        class="cell"
                        onClick={() => clicked(rowId, cellId)}
                      >
                        &middot;
                      </button>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
      <button class="restart" onClick={() => restart()}>
        Restart
      </button>
      <div class="state">
        {clickState.map((e, i) => {
          return (
            <button class="cell" onClick={() => restore(i)}>
              {i}
            </button>
          );
        })}
      </div>
    </div>
  );
}
