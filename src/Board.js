import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let j = 0; j < nrows; j++) {
      let tempArray = [];
      for (let i = 0; i < ncols; i++) {
        tempArray.push(Math.random() <= chanceLightStartsOn ? true : false);
      }
      initialBoard.push(tempArray);
    }
    return initialBoard;
  }

  // There's a better way to do this using Array.from()
  //
  // function createBoard() {
  //   const initialBoard = Array.from({ length: nrows }, () =>
  //     Array.from({ length: ncols }, () => Math.random() <= chanceLightStartsOn)
  //   );
  //   return initialBoard;
  // }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.


    if (board.map((item) => item.find((n) => n === true)).includes(true)) {
      return false;
    } else {
      return true;
    }

    // There's an easier way to do this
    // if(board.flat().includes(true)) { return false }
    // else {return true}

  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // You need to make a DEEP COPY because the arrays within the new array
      // are references to the old array
      // therefore you need to spread them
      // if you do this
      // const  newBoard = [...oldBoard];
      // React won't detect a change

      const newBoard = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      // I figured this out! 

      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // This is just a code snippet to make the board
  // Remember that you can intermix 
  // HTML and JS like you are doing here
  
  // Also, you can use the index argument
  // in advanced array functions (map) to track index
  // In this case we are using string template literals
  // and the rowIndex and cellIndex from the .map() functions
  // for the required keys

  // TODO
  const cells = board.map((row, rowIndex) => (
    <tr key={`row-${rowIndex}`}>
      {row.map((cell, cellIndex) => (
        <Cell
          key={`cell-${rowIndex}-${cellIndex}`}
          isLit={cell}
          flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${cellIndex}`)}
        />
      ))}
    </tr>
  ));

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <h1>Well geez, you won!</h1>;
  } else {
    return <table><tbody>{cells}</tbody></table>;
  }
}

export default Board;
