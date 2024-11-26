import { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const [pokemons, setPokesmons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonIds = [
          1, 4, 7, 25, 133, 150,  
          6, 3, 9, 39, 35, 92,   
        ];
        
        const pokemonPromises = pokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
        );

        const pokemonData = await Promise.all(pokemonPromises);

        const formattedData = pokemonData.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default
        }));

        setPokesmons(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...pokemons];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPokesmons(shuffled);
  };
  
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
  };

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        fontSize: '1.5rem'
      }}>
        Loading Pokémon...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '1rem'
      }}>
        Pokémon Memory Game
      </h1>
      <div style={{ 
        maxWidth:'200px',
        textAlign: 'center', 
        margin: 'auto',
        padding: '1rem',
        backgroundColor: '#4379F2',
        borderRadius: '8px'
      }}>
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '1rem',
        justifyContent: 'center'
      }}>
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