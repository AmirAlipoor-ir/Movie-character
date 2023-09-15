import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
function CharacterList({
  selectedId,
  characters,
  isLoading,
  onSelectCharacter,
}) {
  if (isLoading)
    return (
      <div className="mt-3 sm:w-3/5 text-slate-300 text-base">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-col mt-3 gap-2 md:w-2/5 sm:w-3/6">
      {characters.map((item) => (
        <Character
        selectedId={selectedId}
          key={item.id}
          item={item}
          onSelectCharacter={onSelectCharacter}
        />
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({ item, onSelectCharacter,selectedId }) {
  return (
    <div className="p-2 rounded-lg bg-slate-800 flex items-center gap-3 last:mb-5 justify-between">
      <div className="flex gap-3">
        <img
          className="w-14 h-14 rounded-xl"
          src={item.image}
          alt={item.name}
        />
        <div>
          <CharacterName item={item} />
          <CharacterInfo item={item} />
        </div>
      </div>

      <button
        className="text-red-500 w-5 h-5"
        onClick={() => onSelectCharacter(item.id)}
      >
        {selectedId === item.id ? <EyeSlashIcon/> :<EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="text-slate-200 font-bold">
      <span>{item.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="text-slate-200">
      <span
        className={`w-2 h-2 rounded-full inline-block ${
          item.status === "Dead" ? "bg-red-500" : "bg-green-600"
        }`}
      ></span>
      <span> {item.status} </span>
      <span> - {item.species} </span>
    </div>
  );
}
