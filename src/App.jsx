import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import NavBar, { Favourites, Search, SearchResult } from "./components/NavBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 4));
      } catch (err) {
        setCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 1) {
      setCharacters([]);
      return;
    }
    fetchData();
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourites = (char) => {
    // setFavourites([...favourites,char])
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const handleDeleteFavourites = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="sm:h-screen relative h-screen lg:min-w-full lg:max-w-5xl p-5 font-sans">
      <Toaster />
      {/* <Modal title="modal test" open={} onOpen={}></Modal> */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites onDeleteFavourite={handleDeleteFavourites} favourites={favourites} />
      </NavBar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          isAddToFavourite={isAddToFavourite}
          selectedId={selectedId}
          onAddFavourite={handleAddFavourites}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return (
    <div className="sm:flex sm:justify-between gap-6 max-w-6xl lg:mx-auto">
      {children}
    </div>
  );
}
