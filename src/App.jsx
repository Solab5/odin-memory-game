import { useState } from 'react';
import Card from './components/Card';

function App() {

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const [pokemons, setPokesmons] = useState([
    {
      id: 1,
      name: "bulbasaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    {
      id: 4,
      name: "charmander",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },
    {
      id: 7,
      name: "squirtle",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    }
  ]);

  const shuffleCards = () => {
    const shuffled = [...pokemons];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPokesmons(shuffled);
  };
  
  
  //click handler

  const handleCardClick = (id) => {
    shuffleCards();
    
    if (clickedCards.includes(id)) {
      setCurrentScore(0);
      setClickedCards([]);
    } else {
      const newScore = currentScore + 1
      setCurrentScore(newScore);
      setClickedCards([...clickedCards, id]);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Pokemon Memory Game</h1>
      <div style={{ 
        textAlign: 'center', 
        margin: '1rem',
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pokemons.map(pokemon => (
          <Card 
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            onClick={() => handleCardClick(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;