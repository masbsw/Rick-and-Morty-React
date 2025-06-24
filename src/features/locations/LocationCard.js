import { Link } from 'react-router-dom';

export default function LocationCard({ location }) {
  return (
    <Link to={`/locations/${location.id}`} className="location-locations__card">
      <div className="location-locations-page__info">
        <h2 className="location-locations-page__name">{location.name}</h2>
        <h3 className="location-locations-page__type">{location.type}</h3>
      </div>
    </Link>
  );
}