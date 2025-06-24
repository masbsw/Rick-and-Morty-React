import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocations, setFilter } from './locationsSlice';
import LocationCard from './LocationCard';
import FilterSection from '../../components/FilterSection';
import { ReactComponent as LocationsIcon } from '../../assets/icons/locations.svg';
import '../../assets/styles/pages/locations.css'

export default function LocationsPage() {
  const dispatch = useDispatch();
  const { list, status, page, hasMore, filter } = useSelector((state) => state.locations);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchLocations(1));
    }
  }, [dispatch, list.length]);

  const handleLoadMore = () => {
    dispatch(fetchLocations(page));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredLocations = filter
    ? list.filter((location) =>
        location.name.toLowerCase().includes(filter.toLowerCase())
      )
    : list;

  return (
    <>
      <FilterSection
        icon={<LocationsIcon />}
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
      />

      <section className="locations">
        <div className="locations-locations__container">
          <div className="locations-locations__grid">
            {filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'LOADING...' : 'LOAD MORE'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}