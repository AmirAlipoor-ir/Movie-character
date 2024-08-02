import { useEffect, useState } from "react";
import Loader from "./Loader";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";

function CharacterDetail({ selectedId, onAddFavourite, isAddToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div className="text-slate-300 flex-1">
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return (
      <div className="text-slate-300 flex-1 mt-3">
        Please select a character
      </div>
    );

  return (
    <div className="text-slate-200 md:w-3/5 sm:w-3/6/6 mt-3">
      <CharacterSubInfo
      onAddFavourite={onAddFavourite}
        isAddToFavourite={isAddToFavourite}
        character={character}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavourite ,onAddFavourite}) {
  return (
    <div className="sm:flex-row sm:flex rounded-xl bg-slate-800 overflow-hidden">
      <img src={character.image} alt={character.name} className="w-full sm:w-44 h-full" />
      <div className="flex flex-col pl-3 gap-3">
        <div>
          <h3 className="text-slate-100 font-bold py-2">
            <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
            <span>{character.name}</span>
          </h3>
          <div className="text-slate-100 text-xs">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                character.status === "Dead" ? "bg-red-500" : "bg-green-600"
              }`}
            ></span>
            <span> {character.status} </span>
            <span> {character.species} </span>
          </div>
        </div>

        <div>
          <p className="text-slate-500">Last know location</p>
          <p className="font-medium text-slate-300">
            {character.location.name}
          </p>
        </div>
        <div className="">
          {isAddToFavourite ? (
            <p>Already Added To Favourites ✅</p>
          ) : (
            <button
              onClick={() => onAddFavourite(character)}
              className="cursor-pointer mb-3 font-medium rounded-2xl text-sm bg-slate-500 px-3 py-2"
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-3 mt-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-slate-400 text-xl font-bold">List of Episodes:</h2>
        <button className="z-0" onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className={`w-5 h-5 transition-all text-slate-300 ${
              sortBy ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li className="flex justify-between mb-3" key={item.id}>
            <div className="text-sm sm:text-base">
              {String(index + 1).padStart(2, "0")}-{item.episode}:
              <strong> {item.name}</strong>
            </div>
            <div className="bg-slate-600 rounded-2xl px-3 py-1 text-sm sm:text-base">
              {item.air_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}