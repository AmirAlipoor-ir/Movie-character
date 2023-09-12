import { character, episodes } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

function CharacterDetail() {
  return (
    <div className="text-slate-200 md:w-3/5 sm:w-3/6/6 mt-3">
      <div className="flex rounded-xl bg-slate-800 overflow-hidden">
        <img src={character.image} alt={character.name} className="w-44 h-full" />
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
          <div className="actions">
            <button className="cursor-pointer font-medium rounded-2xl text-sm bg-slate-500 px-3 py-2">
              Add to Favourite
            </button>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl p-3 mt-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-slate-400 text-xl font-bold">List of Episodes:</h2>
          <button>
            <ArrowUpCircleIcon className="w-5 h-5 text-slate-300"/>
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li className="flex justify-between mb-3" key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")}-{item.episode}:
                <strong> {item.name}</strong>
              </div>
              <div className="bg-slate-600 rounded-2xl px-3 py-1">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
