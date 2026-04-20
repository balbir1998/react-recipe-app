import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import RecipeDetailview from './components/RecipeDetailView';
import SearchView from './components/SearchView';
import Cuisine from './components/Cuisine';
import HomeView from './components/HomeView';
import { useCallback, useState } from "react";
import { API_URL } from "./components/useFetch";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchQuery(query);
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}filter.php?${filterType}=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      setSearchResult(data?.meals || []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setSearchLoading(false);
    }

  }, []);

  // filter by category
  const filterByCategory = useCallback((category) => {
    filterRecipe(category, "c");
  }, [filterRecipe]);

  // filter by area
  const filterByArea = useCallback((category) => {
    filterRecipe(category, "a");
  }, [filterRecipe]);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      setSearchResult(data?.meals || []);
    } catch (err) {
      console.log(err.message);
    } finally {
      setSearchLoading(false);
    }

  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
          <Navbar handleSearch={handleSearch} />
          <Cuisine filterByArea={filterByArea} />
          <Routes>
            <Route path="/" element={<HomeView filterByCategory={filterByCategory} />} />
            <Route path="/recipe/:id" element={<RecipeDetailview />} />
            <Route
              path="/search/:query"
              element={<SearchView meals={searchResult} loading={searchLoading} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;
