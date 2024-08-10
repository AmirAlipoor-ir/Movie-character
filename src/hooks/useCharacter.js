import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

  export default function useCharacters(url,query){
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${url}=${query}`
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
  return {isLoading, characters}
}