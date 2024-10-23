import React, { useState } from "react";
import Headers from "./Headers";
import UserList from "./UserList";
import SearchTracks from "./SearchTracks";
import GamesList from "./GamesList";
import SearchedTracksList from "./SearchedTracksList";

const HomePage = ({ session, signOut }) => {
  // const [games, setGames] = useState([]);
  return (
    <div className="w-full flex flex-col">
      <Headers />
      <p className="text-black font-normal text-xl mt-5 mb-2 border-black">Signed In as</p>
      <span className="bold-txt">{session?.user?.name}</span>
      <p
        className="opacity-70 mt-8 mb-5 underline cursor-pointer"
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </p>
      <div>
        <UserList session={session}></UserList>
      </div>
      <div>
        <SearchTracks session={session} />
      </div>
      <div>
        <GamesList session={session} />
      </div>
      <div>
        <SearchedTracksList />
      </div>
    </div>
  );
};

export default HomePage;
