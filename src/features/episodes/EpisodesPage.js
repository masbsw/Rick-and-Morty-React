import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEpisodes, setFilter } from './episodesSlice';
import EpisodeCard from './EpisodeCard';
import FilterSection from '../../components/FilterSection';
import { ReactComponent as EpisodesIcon } from '../../assets/icons/episodes.svg';
import '../../assets/styles/pages/episodes.css'

export default function EpisodesPage() {
  const dispatch = useDispatch();
  const { list, status, page, hasMore, filter } = useSelector((state) => state.episodes);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchEpisodes(1));
    }
  }, [dispatch, list.length]);

  const handleLoadMore = () => {
    dispatch(fetchEpisodes(page));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredEpisodes = filter
    ? list.filter((episode) =>
        episode.name.toLowerCase().includes(filter.toLowerCase())
      )
    : list;

  return (
    <>
      <FilterSection
        icon={<EpisodesIcon />}
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
      />

      <section className="episodes">
        <div className="episodes-episodes__container">
          <div className="episodes-episodes__grid">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
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