export const getUserData = async (session) => {
  let user = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.token.access_token}`,
    },
  });

  let userData = await user.json();

  return userData;
};

export const searchSpotifyTracks = async (session, query) => {
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.token.access_token}`,
    },
  });

  const data = await response.json();
  return data;
};

export const createPlaylist = async (userId, session) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.token.access_token}`,
    },
    body: JSON.stringify({ name: "New Playlist", description: "New playlist description", public: false }),
  });

  const data = await response.json();
  return data;
};
