import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchEpisodeDetails, resetDetails } from './episodesSlice';
import { ReactComponent as ArrowBack } from '../../assets/icons/arrow_back.svg';
import axios from 'axios';
import './../../assets/styles/details/episode.css'

export default function EpisodeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details: episode, status } = useSelector((state) => state.episodes);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    dispatch(fetchEpisodeDetails(id));
    return () => {
      dispatch(resetDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        if (!episode?.characters) return;
        
        const charactersToLoad = episode.characters.slice(0, 12);
        const characterPromises = charactersToLoad.map((url)=>
        axios.get(url).then((response)=>response.data));
        const charactersData = await Promise.all(characterPromises)
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setCharacters([]);
      }
    };

    if (episode) {
      fetchCharacters();
    }
  }, [episode]);

  const formatDate = (dateString) => {
    if (!dateString) return 'UNKNOWN DATE';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    } catch {
      return dateString;
    }
  };

  if (status === 'loading' || !episode) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="episode">
      <div className="episode__container">
        <Link to="/episodes" className="episode__back">
          <ArrowBack className="episode__btn" />
          <h3 className="episode__btn-text">GO BACK</h3>
        </Link>

        <div className="episode__details">
          <div className="episode__main-info">
            <h1 className="episode__name">{episode.name}</h1>
            <div className="episode__meta">
              <div className="episode__info">
                <h3 className="episode__label">Episode</h3>
                <h2 className="episode__number">{episode.episode}</h2>
              </div>
              <div className="date__info">
                <h3 className="date__label">Date</h3>
                <h2 className="date__name">{formatDate(episode.air_date)}</h2>
              </div>
            </div>
          </div>
          
          <div className="info__grid">
            <div className="cast__section">
              <h2 className="section__name">Cast ({characters.length} of {episode.characters?.length || 0})</h2>
              
              {characters.length === 0 ? (
                <p>No cast found</p>
              ) : (
                <div className="cast__grid">
                  {characters.map((character) => (
                    <div 
                      key={character.id} 
                      className="character-episode__card"
                      onClick={() => window.location.href=`/characters/${character.id}`}
                    >
                      <img className="character-episode__image" src={character.image} alt={character.name} />
                      <div className="character-episode__info">
                        <h3 className="character-episode__name">{character.name}</h3>
                        <p className="character-episode__species">{character.species}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}