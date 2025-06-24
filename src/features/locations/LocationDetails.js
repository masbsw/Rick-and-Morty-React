import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchLocationDetails, resetDetails } from './locationsSlice';
import { ReactComponent as ArrowBack } from '../../assets/icons/arrow_back.svg';
import axios from 'axios';
import './../../assets/styles/details/location.css'

export default function LocationDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details: location, status } = useSelector((state) => state.locations);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    dispatch(fetchLocationDetails(id));
    return () => {
      dispatch(resetDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        if (!location?.residents) return;
        
        const residentsToLoad = location.residents.slice(0, 12);
        const residentPromises = residentsToLoad.map((url)=>
        axios.get(url).then((response)=>response.data));
        const residentsData = await Promise.all(residentPromises)
        setResidents(residentsData);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setResidents([]);
      }
    };


    if (location) {
      fetchResidents();
    }
  }, [location]);

  if (status === 'loading' || !location) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="location">
      <div className="location-locations__container">
        <Link to="/locations" className="location-locations__back">
          <ArrowBack className="location-locations__btn" />
          <h3 className="location-locations__btn-text">GO BACK</h3>
        </Link>

        <div className="location-locations__details">
          <div className="location-locations__main-info">
            <h1 className="location-locations__name">{location.name}</h1>
            <div className="location-locations__meta">
              <div className="type-locations__info">
                <h3 className="type-locations__label">Type</h3>
                <h2 className="type-locations__name">{location.type}</h2>
              </div>
              <div className="dimension-locations__info">
                <h3 className="dimension-locations__label">Dimension</h3>
                <h2 className="dimension-locations__name">{location.dimension}</h2>
              </div>
            </div>
          </div>
          
          <div className="info-locations__grid">
            <div className="residents-locations__section">
              <h2 className="section-locations__name">Residents ({residents.length} of {location.residents?.length || 0})</h2>
              
              {residents.length === 0 ? (
                <p>No residents found</p>
              ) : (
                <div className="residents-locations__grid">
                  {residents.map((character) => (
                    <div 
                      key={character.id} 
                      className="character-locations__card"
                      onClick={() => window.location.href=`/characters/${character.id}`}
                    >
                      <img className="character-locations__image" src={character.image} alt={character.name} />
                      <div className="character-locations__info">
                        <h3 className="character-locations__name">{character.name}</h3>
                        <p className="character-locations__species">{character.species}</p>
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