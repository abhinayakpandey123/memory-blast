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
  function restartGame() {
  setCards(shuffleCards(basecards));
  setSelectedCards([]);
  setMatchedCards([]);
  setUsedCards([]);
  setTime(50);
  setMoves(0);
}

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
  setMoves((prevMoves) => prevMoves + 1);
  setSelectedCards([...selectedCards, card.id]);
  setUsedCards([...usedCards, card.id]);

  setTimeout(() => {
    setSelectedCards([]);
  }, 800);

  return;
}

if (card.special === "time") {
  setTime((prevTime) => prevTime + 10);
  setMoves((prevMoves) => prevMoves + 1);
  setSelectedCards([...selectedCards, card.id]);
  setUsedCards([...usedCards, card.id]);

  setTimeout(() => {
    setSelectedCards([]);
  }, 800);

  return;
}

setMoves((prevMoves) => prevMoves + 1);

  setSelectedCards([...selectedCards, card.id]);
  }

  useEffect(() => {

  const timer = setInterval(() => {
    setTime((prevTime) => {
   if (prevTime <= 1 || isGameWon){
        clearInterval(timer);
        return 0;
      }
         return prevTime - 1;
  });
}, 1000);

  return () => {
    clearInterval(timer);
  };

  }, [isGameWon]);

  

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

     
      setMatchedCards((prevMatchedCards) => [
  ...prevMatchedCards,
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

{time === 0 && !isGameWon && (
  <div className="game-over">

    <svg
      aria-label="loader being flipped clockwise and circled by three white curves fading in and out"
      role="img"
      height="56px"
      width="56px"
      viewBox="0 0 56 56"
      className="loader"
    >

      <clipPath id="sand-mound-top">
        <path
          d="M 14.613 13.087 C 15.814 12.059 19.3 8.039 20.3 6.539 C 21.5 4.789 21.5 2.039 21.5 2.039 L 3 2.039 C 3 2.039 3 4.789 4.2 6.539 C 5.2 8.039 8.686 12.059 9.887 13.087 C 11 14.039 12.25 14.039 12.25 14.039 C 12.25 14.039 13.5 14.039 14.613 13.087 Z"
          className="loader__sand-mound-top"
        />
      </clipPath>

      <clipPath id="sand-mound-bottom">
        <path
          d="M 14.613 20.452 C 15.814 21.48 19.3 25.5 20.3 27 C 21.5 28.75 21.5 31.5 21.5 31.5 L 3 31.5 C 3 31.5 3 28.75 4.2 27 C 5.2 25.5 8.686 21.48 9.887 20.452 C 11 19.5 12.25 19.5 12.25 19.5 C 12.25 19.5 13.5 19.5 14.613 20.452 Z"
          className="loader__sand-mound-bottom"
        />
      </clipPath>

      <g transform="translate(2,2)">

        <g
          transform="rotate(-90,26,26)"
          strokeLinecap="round"
          strokeDashoffset="153.94"
          strokeDasharray="153.94 153.94"
          stroke="hsl(0,0%,100%)"
          fill="none"
        >

          <circle
            transform="rotate(0,26,26)"
            r="24.5"
            cy="26"
            cx="26"
            strokeWidth="2.5"
            className="loader__motion-thick"
          />

          <circle
            transform="rotate(90,26,26)"
            r="24.5"
            cy="26"
            cx="26"
            strokeWidth="1.75"
            className="loader__motion-medium"
          />

          <circle
            transform="rotate(180,26,26)"
            r="24.5"
            cy="26"
            cx="26"
            strokeWidth="1"
            className="loader__motion-thin"
          />

        </g>

        <g
          transform="translate(13.75,9.25)"
          className="loader__model"
        >

          <path
            d="M 1.5 2 L 23 2 C 23 2 22.5 8.5 19 12 C 16 15.5 13.5 13.5 13.5 16.75 C 13.5 20 16 18 19 21.5 C 22.5 25 23 31.5 23 31.5 L 1.5 31.5 C 1.5 31.5 2 25 5.5 21.5 C 8.5 18 11 20 11 16.75 C 11 13.5 8.5 15.5 5.5 12 C 2 8.5 1.5 2 1.5 2 Z"
            fill="hsl(var(--hue),90%,85%)"
          />

          <g
            strokeLinecap="round"
            stroke="hsl(35,90%,90%)"
          >

            <line
              y2="20.75"
              x2="12"
              y1="15.75"
              x1="12"
              strokeDasharray="0.25 33.75"
              strokeWidth="1"
              className="loader__sand-grain-left"
            />

            <line
              y2="21.75"
              x2="12.5"
              y1="16.75"
              x1="12.5"
              strokeDasharray="0.25 33.75"
              strokeWidth="1"
              className="loader__sand-grain-right"
            />

            <line
              y2="31.5"
              x2="12.25"
              y1="18"
              x1="12.25"
              strokeDasharray="0.5 107.5"
              strokeWidth="1"
              className="loader__sand-drop"
            />

            <line
              y2="31.5"
              x2="12.25"
              y1="14.75"
              x1="12.25"
              strokeDasharray="54 54"
              strokeWidth="1.5"
              className="loader__sand-fill"
            />

            <line
              y2="31.5"
              x2="12"
              y1="16"
              x1="12"
              strokeDasharray="1 107"
              strokeWidth="1"
              stroke="hsl(35,90%,83%)"
              className="loader__sand-line-left"
            />

            <line
              y2="31.5"
              x2="12.5"
              y1="16"
              x1="12.5"
              strokeDasharray="12 96"
              strokeWidth="1"
              stroke="hsl(35,90%,83%)"
              className="loader__sand-line-right"
            />

            <g
              strokeWidth="0"
              fill="hsl(35,90%,90%)"
            >

              <path
                d="M 12.25 15 L 15.392 13.486 C 21.737 11.168 22.5 2 22.5 2 L 2 2.013 C 2 2.013 2.753 11.046 9.009 13.438 L 12.25 15 Z"
                clipPath="url(#sand-mound-top)"
              />

              <path
                d="M 12.25 18.5 L 15.392 20.014 C 21.737 22.332 22.5 31.5 22.5 31.5 L 2 31.487 C 2 31.487 2.753 22.454 9.009 20.062 Z"
                clipPath="url(#sand-mound-bottom)"
              />

            </g>
          </g>

          <g
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
            fill="none"
          >

            <path
              d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
              stroke="hsl(0,0%,100%)"
              className="loader__glare-top"
            />

            <path
              transform="rotate(180,12.25,16.75)"
              d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
              stroke="hsla(0,0%,100%,0)"
              className="loader__glare-bottom"
            />

          </g>

          <rect
            height="2"
            width="24.5"
            fill="hsl(var(--hue),90%,50%)"
          />

          <rect
            height="1"
            width="19.5"
            y="0.5"
            x="2.5"
            ry="0.5"
            rx="0.5"
            fill="hsl(var(--hue),90%,57.5%)"
          />

          <rect
            height="2"
            width="24.5"
            y="31.5"
            fill="hsl(var(--hue),90%,50%)"
          />

          <rect
            height="1"
            width="19.5"
            y="32"
            x="2.5"
            ry="0.5"
            rx="0.5"
            fill="hsl(var(--hue),90%,57.5%)"
          />

        </g>
      </g>
    </svg>

    <h2>Game Over!</h2>

  </div>
)}



<div className="container-button">
  <div className="hover bt-1"></div>
  <div className="hover bt-2"></div>
  <div className="hover bt-3"></div>
  <div className="hover bt-4"></div>
  <div className="hover bt-5"></div>
  <div className="hover bt-6"></div>

  <button onClick={ restartGame}></button>
</div>

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
    
      
      {isGameWon && (
        <div className="win-popup">
          <div className="win-popup-box">
            <div className="win-emoji">🎉</div>

            <h2>You Win!</h2>

            <p>All 5 pairs matched!</p>

            <button onClick={restartGame}>
              Play Again
            </button>
          </div>
        </div>
)}

</div>
);
  
}

export default App;