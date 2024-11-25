function Card({ name, image, onClick }) {
    return (
      <div 
      onClick={onClick}
      style={{ 
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        ':hover': {
          transform: 'scale(1.5)'  // Slightly enlarge on hover
        }
      }}>
        <img 
          src={image} 
          alt={name} 
          style={{ width: '120px', height: '120px' }}
        />
        <h3>{name}</h3>
      </div>
    );
  }
  
  export default Card;