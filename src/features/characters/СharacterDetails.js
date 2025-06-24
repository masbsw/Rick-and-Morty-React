import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCharacterDetails,resetDetails } from "./charactersSlice";
import { ReactComponent as ArrowBack } from "../../assets/icons/arrow_back.svg";
import axios from "axios";
  import './../../assets/styles/details/character.css'

export default function CharacterDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details: character, status } = useSelector(
    (state) => state.characters
  );
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    dispatch(fetchCharacterDetails(id));

    return () => {
      dispatch(resetDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        if (!character?.episode) return;

        const episodesToLoad = character.episode.slice(0, 10);

        const episodePromises = episodesToLoad.map((url) =>
          axios.get(url).then((response) => response.data)
        );

        const episodesData = await Promise.all(episodePromises);

        setEpisodes(episodesData);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setEpisodes([]);
      }
    };

    if (character) {
      fetchEpisodes();
    }
  }, [character]);

  const formatDate = (dateString) => {
    if (!dateString) return "UNKNOWN DATE";
    try {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString)
        .toLocaleDateString("en-US", options)
        .toUpperCase();
    } catch {
      return dateString;
    }
  };

  if (status === "loading" || !character) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="character">
      <div className="character-characters__container">
        <Link to="/characters" className="character-characters__back">
          <ArrowBack className="character-characters__btn" />
          <h3 className="character-characters__btn-text">GO BACK</h3>
        </Link>

        <div className="character-characters__details">
          <div className="character-characters__main-info">
            <img
              className="character-characters__image"
              src={character.image}
              alt={character.name}
            />
            <h1 className="character-characters__name">{character.name}</h1>
          </div>

          <div className="info-characters__grid">
            <div className="info-characters__section">
              <h2 className="section-characters__name">Informations</h2>
              <div className="info-characters__item">
                <span className="info-characters__label">Gender</span>
                <span className="info-characters__text">{character.gender}</span>
              </div>
              <div className="info-characters__item">
                <span className="info-characters__label">Status</span>
                <span className="info-characters__text">{character.status}</span>
              </div>
              <div className="info-characters__item">
                <span className="info-characters__label">Species</span>
                <span className="info-characters__text">{character.species}</span>
              </div>
              <div className="info-characters__item">
                <span className="info-characters__label">Origin</span>
                <span className="info-characters__text">
                  {character.origin?.name || "Unknown"}
                </span>
              </div>
              <div className="info-characters__item">
                <span className="info-characters__label">Location</span>
                <span className="info-characters__text">
                  {character.location?.name || "Unknown"}
                </span>
              </div>
            </div>

            <div className="episodes-characters__section">
              <h2 className="section-characters__name">
                Episodes ({episodes.length} of {character.episode?.length || 0})
              </h2>

              {episodes.length === 0 ? (
                <p>No episode data available</p>
              ) : (
                <div className="episodes-characters__list">
                  {episodes.map((episode) => (
                    <div key={episode.id} className="episode-characters">
                      <span className="episode-characters__code">{episode.episode}</span>
                      <span className="episode-characters__name">{episode.name}</span>
                      <span className="episode-characters__date">
                        {formatDate(episode.air_date)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {character.episode?.length > 10 && (
                <p className="episode-characters__more">
                  + {character.episode.length - 10} more episodes
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
