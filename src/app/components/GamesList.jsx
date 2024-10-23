// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { gamesState } from "../state/state";

// const GamesList = ({ type, session }) => {
//   const [games, setGames] = useRecoilState(gamesState);
//   useEffect(() => {
//     const handleGamesFetching = async () => {
//       try {
//         const response = await fetch("/api/games/get", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: session.user?.email,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         console.log("Games", data);
//         setGames(data);
//       } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//       }
//     };
//     handleGamesFetching();
//   }, []);
//   return (
//     <div>
//       <p>Games</p>
//       <ul>
//         {games.map((game) => {
//           return (
//             <li key={game.id}>
//               {game.sender_email} - {game.reciever_email}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default GamesList;

import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamesState, categorizedGamesState } from "../state/state";

const GamesList = ({ session }) => {
  const [games, setGames] = useRecoilState(gamesState);
  const suggestedGames = useRecoilValue(categorizedGamesState("suggested"));
  const pendingGames = useRecoilValue(categorizedGamesState("pending"));

  useEffect(() => {
    const handleGamesFetching = async () => {
      try {
        const response = await fetch("/api/games/get", {
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
        console.log("Games", data);
        setGames(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    handleGamesFetching();
  }, [session.user.email, setGames]);

  return (
    <div>
      <p>Suggested Games</p>
      <ul>
        {suggestedGames.map((game) => (
          <li key={game.id}>
            {game.sender_email} - {game.reciever_email}
          </li>
        ))}
      </ul>
      <p>Pending Games</p>
      <ul>
        {pendingGames.map((game) => (
          <li key={game.id}>
            {game.sender_email} - {game.reciever_email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
