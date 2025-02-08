import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import { act } from "react-dom/test-utils";

const GAME_DATA = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

function getActivePlayer(turns) {
  let currPlayer = 'X';
  if (turns.length > 0) {
    currPlayer = turns[0].player === 'X' ? 'O' : 'X';
  }
  return currPlayer;
}

function checkWinner(gameboard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstPlayerSymbol = gameboard[combination[0].row][combination[0].column];
    const secondPlayerSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdPlayerSymbol = gameboard[combination[2].row][combination[2].column];
    if (firstPlayerSymbol && firstPlayerSymbol === secondPlayerSymbol && firstPlayerSymbol === thirdPlayerSymbol) {
      winner = players[firstPlayerSymbol];
      break;
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);

  let gameboard = [...GAME_DATA].map(row => [...row]);
  for (const { square, player } of gameTurns) {
    gameboard[square.row][square.col] = player
  }

  const winner = checkWinner(gameboard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns
      ]

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChanged={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChanged={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematchClicked={handleRestart} />}
        <GameBoard onSlectSquare={handlePlayerChange} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
