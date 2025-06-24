import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`} className="character-page__card">
      <img
        className="character-page__image"
        src={character.image}
        alt={character.name}
      />
      <div className="character-page__info">
        <h3 className="character-page__name">{character.name}</h3>
        <p className="character-page__species">{character.species}</p>
      </div>
    </Link>
  );
}