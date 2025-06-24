import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters, setFilter } from "./charactersSlice";
import CharacterCard from "./СharacterCard";
import FilterSection from "../../components/FilterSection";
import { ReactComponent as CharactersIcon } from "../../assets/icons/characters.svg";
import '../../assets/styles/pages/characters.css'

export default function CharactersPage() {
  const dispatch = useDispatch();
  const { list, status, page, hasMore, filter } = useSelector(
    (state) => state.characters
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchCharacters(1));
    }
  }, [dispatch, list.length]);

  const handleLoadMore = () => {
    dispatch(fetchCharacters(page));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredCharacters = filter
    ? list.filter((character) =>
        character.name.toLowerCase().includes(filter.toLowerCase())
      )
    : list;

  return (
    <>
      <FilterSection
        icon={<CharactersIcon />}
        placeholder="Filter by name..."
        value={filter}
        onChange={handleFilterChange}
      />

      <section className="characters">
        <div className="characters-characters__container">
          <div className="characters-characters__grid">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={status === "loading"}
              >
                {status === "loading" ? "LOADING..." : "LOAD MORE"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
