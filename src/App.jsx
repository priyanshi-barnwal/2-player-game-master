// import "./App.css";

// function App() {
//   return (
//     <>
//       <h1>2-player-game</h1>
//     </>
//   );
// }

// export default App;
import React, { useState } from 'react';

const TicTacToe = () => {
  const [cells, setCells] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState("Player X's turn");
  const [gameActive, setGameActive] = useState(true);

  
  const handleClick = (index) => {
    if (cells[index] || !gameActive) return;

    const updatedCells = [...cells];
    updatedCells[index] = currentPlayer;
    setCells(updatedCells);

    if (checkWin(updatedCells)) {
      setStatus(`Player ${currentPlayer} wins!`);
      setGameActive(false);
    } else if (updatedCells.every(cell => cell !== '')) {
      setStatus("It's a draw!");
      setGameActive(false);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatus(`Player ${nextPlayer}'s turn`);
    }
  };

  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winPatterns.some(pattern =>
      board[pattern[0]] &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[1]] === board[pattern[2]]
    );
  };

  const resetGame = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
    setStatus("Player X's turn");
    setGameActive(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>2-player-game</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridTemplateRows: 'repeat(3, 100px)',
          gap: '5px',
          justifyContent: 'center'
        }}
      >
        {cells.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2em',
              backgroundColor: 'white',
              border: '2px solid #333',
              cursor: cell || !gameActive ? 'not-allowed' : 'pointer'
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', fontSize: '1.5em' }}>{status}</div>
      <button
        onClick={resetGame}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1.2em',
          cursor: 'pointer'
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;



