import React, { useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { Character } from "./CharacterList";
function NavBar({ children }) {
  return (
    <nav className="bg-slate-700 rounded-xl flex max-w-6xl justify-between px-3 sm:py-5 sm:px-5 py-3 lg:mx-auto items-center">
      <Logo />
      {children}
    </nav>
  );
}

export default NavBar;

function Logo() {
  return (
    <div className="hidden sm:block text-slate-300 font-bold">LOGO 😍</div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="rounded-md bg-slate-500 px-2 py-1 w-3/5 sm:py-2 sm:pr-6 sm:px-4 md:w-2/5 sm:w-auto outline-none"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return (
    <div className="text-slate-400 text-xs px-2 sm:text-base">
      Found {numOfResult} characters
    </div>
  );
}

export function Favourites({ favourites,onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="List of favourites" open={isOpen} onOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character key={item.id} item={item} >
            <button onClick={()=>onDeleteFavourite(item.id)}><TrashIcon className="icon stroke-red-500"/></button>
          </Character>
        ))}
      </Modal>
      <button className="relative" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="h-8 w-8 text-red-500 font-bold" />
        <span className="absolute top-0 rounded-full text-xs -right-1 text-slate-100 px-[4px] items-center justify-center bg-red-500">
          {favourites.length}
        </span>
      </button>
    </>
  );
}
