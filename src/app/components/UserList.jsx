import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { useRecoilState } from "recoil";
import { gamesState } from "../state/state";
import { getUserData, createPlaylist } from "../utils/spotify";

const UserList = ({ session }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [games, setGames] = useRecoilState(gamesState);

  useEffect(() => {
    setIsLoading(true);
    const handleUserFetching = async () => {
      try {
        const response = await fetch("/api/users/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user?.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("USERS", data);
        setUsers(data.users);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    handleUserFetching();
  }, []);

  const handleSendGameRequest = async (sendUser, recieveUser) => {
    console.log(sendUser);

    const response = await fetch("/api/games/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: sendUser,
        recieverEmail: recieveUser.email,
      }),
    });

    const game = await response.json();
    console.log(game);
    let userData = await getUserData(session);
    console.log(userData);
    let playlistData = await createPlaylist(userData.id, session);
    console.log(playlistData);
    setGames([...games, ...game.game]);
  };
  return (
    <ul className="flex flex-col">
      {users.map((user) => {
        return (
          <li key={user.user_id} className="flex gap-4">
            <span>{user.user_name}</span>
            <Button
              text={"SEND GAME REQUEST"}
              handler={() => {
                handleSendGameRequest(session.user.email, user);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
