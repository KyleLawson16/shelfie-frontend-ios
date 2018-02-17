import axios from 'axios';

const ROOT_URL = `https://shelfie-api-staging.herokuapp.com/`;

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_GAMES = 'FETCH_GAMES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_PRIZES = 'FETCH_PRIZES';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const ADD_LIKE = 'ADD_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';
export const CREATE_POST = 'CREATE_POST';
export const JOIN_GAME = 'JOIN_GAME';
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
export const ADD_FOLLOWER = 'ADD_FOLLOWER';
export const DELETE_FOLLOWER = 'DELETE_FOLLOWER';

export function createUser(firstName, lastName, username, email, password, confirmPassword) {
  const url = `${ROOT_URL}api/v1/create-user`;
  const request = axios.post(url, {
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    password: password,
    confirm_password: confirmPassword,
    is_staff: false,
    is_superuser: false,
  });

  return {
    type: CREATE_USER,
    payload: request
  };
}

export function loginUser(username, password) {
  const url = `${ROOT_URL}api/v1/login`;
  const request = axios.post(url, {
    username: username,
    password: password
  });

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function logoutUser(token) {
  const url = `${ROOT_URL}api/v1/logout`;
  const request = axios.post(url, '', {headers: { Authorization: `Token ${token}` }}
  );

  return {
    type: LOGOUT_USER,
    payload: request
  };
}


export function fetchUser(token, userID) {
  const url = `${ROOT_URL}api/v1/users/${userID}`;
  const request = axios.get(url,
    { headers: { Authorization: `Token ${token}` }}
  );

  return {
    type: FETCH_USER,
    payload: request
  };
}

export function fetchGames(token) {
  const url = `${ROOT_URL}api/v1/games`;
  const request = axios.get(url,
    { headers: { Authorization: `Token ${token}` }}
  );

  return {
    type: FETCH_GAMES,
    payload: request
  };
}

export function fetchPosts(token, filterBy, gameID) {
  const url = `${ROOT_URL}api/v1/posts?${filterBy}=${gameID}`;
  const request =  axios.get(url,
    { headers: { Authorization: `Token ${token}` }}
  );

  return {
    type: FETCH_POSTS,
    payload: request,
  }
}

export function fetchLeaderboard(token, gameID) {
  const url = `${ROOT_URL}api/v1/games/${gameID}/leaderboard`;
  const request =  axios.get(url,
    { headers: { Authorization: `Token ${token}` }}
  );

  return {
    type: FETCH_LEADERBOARD,
    payload: request,
  }
}

export function fetchPrizes(token, gameID) {
  const url = `${ROOT_URL}api/v1/prizes?game=${gameID}`;
  const request =  axios.get(url,
    { headers: { Authorization: `Token ${token}` }}
  );

  return {
    type: FETCH_PRIZES,
    payload: request,
  }
}

export function addLike(token, random_user_id, random_post_id) {
  const url = `${ROOT_URL}api/v1/posts/${random_post_id}/like/add`;
  const request =  axios.post(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      random_user_id: random_user_id,
      random_post_id: random_post_id,
    }
  );

  return {
    type: ADD_LIKE,
    payload: request,
  }
}

export function deleteLike(token, random_user_id, random_post_id) {
  const url = `${ROOT_URL}api/v1/posts/${random_post_id}/like/delete`;
  const request =  axios.post(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      random_user_id: random_user_id,
      random_post_id: random_post_id,
    }
  );

  return {
    type: DELETE_LIKE,
    payload: request,
  }
}

export function createPost(
    token,
    random_user_id,
    random_game_id,
    random_challenge_id,
    is_video,
    media_url,
    caption,
  ) {
  const url = `${ROOT_URL}api/v1/posts/create`;
  const request =  axios.post(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      user: random_user_id,
      game: random_game_id,
      challenge: random_challenge_id,
      is_video: is_video,
      media_url: media_url,
      caption: caption,
    }
  );

  return {
    type: CREATE_POST,
    payload: request,
  }
}

export function joinGame(token, random_user_id, random_game_id) {
  const url = `${ROOT_URL}api/v1/games/${random_game_id}`;
  const request =  axios.put(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      random_user_id: random_user_id,
    }
  );

  return {
    type: JOIN_GAME,
    payload: request,
  }
}

export function updateProfilePicture(token, random_user_id, profile_picture) {
  const url = `${ROOT_URL}api/v1/users/${random_user_id}`;
  const request =  axios.put(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      profile_picture: profile_picture,
    }
  );

  return {
    type: UPDATE_PROFILE_PICTURE,
    payload: request,
  }
}

export function addFollower(token, random_user_id, followed_user_id) {
  const url = `${ROOT_URL}api/v1/users/follow/add`;
  const request =  axios.post(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      random_user_id: random_user_id,
      followed_user_id: followed_user_id,
    }
  );

  return {
    type: ADD_FOLLOWER,
    payload: request,
  }
}

export function deleteFollower(token, random_user_id, followed_user_id) {
  const url = `${ROOT_URL}api/v1/users/follow/delete`;
  const request =  axios.post(url,
    {
      headers: {
        Authorization: `Token ${token}`
      },
      random_user_id: random_user_id,
      followed_user_id: followed_user_id,
    }
  );

  return {
    type: DELETE_FOLLOWER,
    payload: request,
  }
}
