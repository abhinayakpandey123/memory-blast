import { useState, useEffect } from "react";
import "./App.css";


import cat from "./assets/cat.jpeg";
import dog from "./assets/dog.jpeg";
import tiger from "./assets/tiger.jpeg";
import laptop from "./assets/laptop.jpg";
import headphone from "./assets/headphone.jpeg";
import bomb from "./assets/bomb.jpeg";
import timer from "./assets/timer.jpeg";

function App() {

const cards = [
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

  { id: 11, value: bomb },
  { id: 12, value: timer }
];
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  function handleCardClick(card) {

    if (selectedCards.length === 2) {
      return;
    }

    if (selectedCards.includes(card.id)) {
      return;
    }

    setSelectedCards([...selectedCards, card.id]);
  }

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