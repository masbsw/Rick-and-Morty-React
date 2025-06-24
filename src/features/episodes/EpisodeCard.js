import { Link } from 'react-router-dom';

export default function EpisodeCard({ episode }) {
  return (
    <Link to={`/episodes/${episode.id}`} className="episode-episodes-page__card">
      <div className="episode-episodes-page__info">
        <h2 className="episode-episodes-page__name">{episode.name}</h2>
        <h3 className="episode-episodes-page__air_date">{episode.air_date}</h3>
        <h4 className="episode-episodes-page__episode">{episode.episode}</h4>
      </div>
    </Link>
  );
}