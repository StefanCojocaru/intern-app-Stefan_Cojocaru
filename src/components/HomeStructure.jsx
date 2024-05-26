import React, { useState } from 'react';
import Card from './Card';

const HomeStructure = () => {
  const [cards, setCards] = useState([]);

  const addCardHandler = () => {
    const inputTitle = prompt('Title:');
    const inputDescription = prompt('Description:');
    setCards(prevCards => [
      ...prevCards,
      { title: inputTitle, description: inputDescription },
    ]);
  };

  return (
    <div>
      <button onClick={addCardHandler}>Add</button>
      <div className="cardsStructure">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
};

export default HomeStructure;
