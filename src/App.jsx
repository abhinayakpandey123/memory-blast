import { useState, useEffect } from "react";
import "./App.css";


import cat from "./assets/cat.jpeg";
import dog from "./assets/dog.jpeg";
import tiger from "./assets/tiger.jpeg";
import laptop from "./assets/laptop.jpg";
import headphone from "./assets/headphone.jpeg";
import bomb from "./assets/bomb.jpeg";
import timer from "./assets/timer.jpeg";

function shuffleCards(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {

const basecards = [
  { id: 1, value: cat },
  { id: 2, value: cat },

  { id: 3, value: dog },
  { id: 4, value: dog },

  { id: 5, value: tiger },
  { id: 6, value: tiger },

  { id: 7, value: laptop },
  { id: 8, value: laptop },

  { id: 9, value: headphone },
  { id: 10, value: headphone },

  { id: 11, value: bomb, special: "bomb" },
  { id: 12, value: timer, special: "time" }
 
];

const [cards, setCards] = useState(() => shuffleCards(basecards));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]);

  const [time, setTime] = useState(50);
  const [moves, setMoves] = useState(0);
  const isGameWon = matchedCards.length === 10;

  function handleCardClick(card) {
 

  if (time === 0 || isGameWon) {
  return;
}

    if (selectedCards.length === 2) {
      return;
    }

    if (selectedCards.includes(card.id)) {
      return;
    }
 
   if (usedCards.includes(card.id)) {
  return;
}

 if (card.special === "bomb") {
  setTime((prevTime) => Math.max(0, prevTime - 10));
  setMoves(moves + 1);
  setSelectedCards([...selectedCards, card.id]);
  setUsedCards([...usedCards, card.id]);

  setTimeout(() => {
    setSelectedCards([]);
  }, 800);

  return;
}

if (card.special === "time") {
  setTime((prevTime) => prevTime + 10);
  setMoves(moves + 1);
  setSelectedCards([...selectedCards, card.id]);
  setUsedCards([...usedCards, card.id]);

  setTimeout(() => {
    setSelectedCards([]);
  }, 800);

  return;
}

  setMoves(moves + 1);

  setSelectedCards([...selectedCards, card.id]);
  }

  useEffect(() => {

  const timer = setInterval(() => {
    setTime((prevTime) => {
      if (prevTime <= 1){
        clearInterval(timer);
        return 0;
      }
         return prevTime - 1;
  });
}, 1000);

  return () => {
    clearInterval(timer);
  };

}, []);

  

  useEffect(() => {

    if (selectedCards.length !== 2) {
      return;
    }

    const firstCard = cards.find(
      (card) => card.id === selectedCards[0]
    );

    const secondCard = cards.find(
      (card) => card.id === selectedCards[1]
    );

    if (firstCard.value === secondCard.value) {

      setMatchedCards([
        ...matchedCards,
        firstCard.id,
        secondCard.id
      ]);

      setSelectedCards([]);

    } else {

      setTimeout(() => {
        setSelectedCards([]);
      }, 800);
    }

  }, [selectedCards]);

  return (
   <div className="game">
  <h1>Memory Blast</h1>
  <div className="timer">
  ⏱️ {time}s
</div>

<div className="moves">
  Moves: {moves}
</div>

{time === 0 && (
  <h2 className="game-over">
     ❌Game Over!
  </h2>
)}

{isGameWon && (
  <h2 className="game-over">
    🥳🎆 You Win!
  </h2>
)}

  <div className="card-grid">
    {cards.map((card) => {

          const isSelected = selectedCards.includes(card.id);
          const isMatched = matchedCards.includes(card.id);

          return (
            <div
  className="card"
  key={card.id}
  onClick={() => handleCardClick(card)}
>
             {isSelected || isMatched ? (
         <img src={card.value} alt="card" />
         ) : (
          "❓"
          )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;