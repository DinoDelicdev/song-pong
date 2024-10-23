import { atom, selectorFamily, atomFamily } from "recoil";

export const gamesState = atom({
  key: "GamesState",
  default: [],
});

export const foundTracksState = atom({
  key: "FoundTracksState",
  default: [],
});

export const userEmailState = atom({
  key: "UserEmailState",
  default: "",
});

export const categorizedGamesState = atomFamily({
  key: "categorizedGamesState",
  default: selectorFamily({
    key: "categorizedGamesState/Default",
    get:
      (category) =>
      ({ get }) => {
        const games = get(gamesState);
        console.log("RECOIL", games);
        const userEmail = get(userEmailState);
        console.log("recoil", userEmail);

        if (category === "suggested") {
          return games.filter((game) => game.reciever_email === userEmail);
        } else if (category === "pending") {
          return games.filter((game) => game.sender_email === userEmail && game.status === "pending");
        } else if (category === "active") {
          return games.filter((game) => game.status === "active");
        }
        return [];
      },
  }),
});
