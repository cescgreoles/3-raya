import { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDraw, setIsDraw] = useState(false); // Estado para controlar si hay empate

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setShowPopup(true);
        return;
      }
    }

    // Si todas las casillas están llenas y no hay ganador, es empate
    if (!newBoard.includes(null)) {
      setIsDraw(true);
      setShowPopup(true);
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return; // Evitar mover si ya hay ganador o empate
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setIsDraw(false); // Reiniciar el estado de empate
    setShowPopup(false);
  };

  return (
    <div className="container">
      <h1>3 en Raya</h1>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <h2>Turno de: {isXTurn ? "X" : "O"}</h2>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {winner && (
              <>
                <h2>🎉 Ganador: {winner} 🎉</h2>
                <button onClick={handleRestart}>Jugar de nuevo</button>
              </>
            )}
            {isDraw && (
              <>
                <h2>🤝 ¡Es un empate! 🤝</h2>
                <button onClick={handleRestart}>Jugar de nuevo</button>
              </>
            )}
          </div>
        </div>
      )}
      {showPopup && winner && <Confetti />}
    </div>
  );
}

export default App;
