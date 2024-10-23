import { foundTracksState } from "../state/state";
import { useRecoilState } from "recoil";

const SearchedTracksList = () => {
  const [foundTracks, setFoundTracks] = useRecoilState(foundTracksState);
  return (
    <div>
      <ul>
        {foundTracks.map((track) => {
          return <li key={track.id}>{track.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default SearchedTracksList;
