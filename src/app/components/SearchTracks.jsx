import { useState } from "react";
import Button from "./ui/Button";
import { foundTracksState } from "../state/state";
import { useRecoilState } from "recoil";
import { searchSpotifyTracks } from "../utils/spotify";

const SearchTracks = ({ session }) => {
  const [userQuery, setUserQuery] = useState("");
  const [foundTracks, setFoundTracks] = useRecoilState(foundTracksState);

  const handleSettingUserQuery = (event) => {
    setUserQuery(event.target.value);
    console.log(event.target.value);
    console.log(session);
  };

  const handleSearch = async (query) => {
    // const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;

    // const response = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${session.token.access_token}`,
    //   },
    // });

    // const data = await response.json();
    let data = await searchSpotifyTracks(session, query);
    setFoundTracks(data.tracks.items);
  };

  return (
    <div>
      <input type="text" onChange={handleSettingUserQuery} className="border-2 border-black rounded-lg" />
      <Button
        text={"Search"}
        handler={() => {
          handleSearch(userQuery);
        }}
      />
    </div>
  );
};

export default SearchTracks;
