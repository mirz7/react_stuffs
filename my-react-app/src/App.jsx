import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const initializedGame = () => {
    const cardFinal = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(cardFinal);
  };
  useEffect(() => {
    initializedGame();
  }, []);

  const handleCardClick = (card) => {
    // dont allow clicking if the card is already flipped or already matched
    if (card.isFlipped || card.isMatched) {
      return;
    }
    //update the cards flipped state
    const newCards = cards.map((c) => {
      if (c.id == card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setCards(newCards);
    const newFlippedCards = [...flippedCards, card.id];
    //check the match of flipped cards
    setFlippedCards(newFlippedCards);
    if (flippedCards.length == 1) {
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value == card.value) {
        alert("Matched");
      } else {
        const flippedBackCards = newCards.map((c) => {
          if (newFlippedCards.includes(c.id)) {
            return { ...c, isFlipped: false };
          } else {
            return c;
          }
        });
        setCards(flippedBackCards);
      }
    }
  };
  return (
    <div className="app">
      <GameHeader score={3} moves={2} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
