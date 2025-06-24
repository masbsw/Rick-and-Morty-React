import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharactersPage from './features/characters/CharactersPage';
import CharacterDetails from './features/characters/СharacterDetails';
import LocationsPage from './features/locations/LocationsPage';
import LocationDetails from './features/locations/LocationDetails';
import EpisodesPage from './features/episodes/EpisodesPage';
import EpisodeDetails from './features/episodes/EpisodeDetails';
import Layout from './components/Layout';



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;