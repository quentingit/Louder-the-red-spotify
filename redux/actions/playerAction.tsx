export const FETCH_PLAYER_PREFFERED_STATE = 'FETCH_PLAYER_PREFFERED_STATE';
export const FETCH_PLAYER_PREFFERED_LIKE = 'FETCH_PLAYER_PREFFERED_LIKE';
export const FETCH_PLAYER_PREFFERED_UNLIKE = 'FETCH_PLAYER_PREFFERED_UNLIKE';
export const FETCH_PLAYER_PREFFERED_CURRENT = 'FETCH_PLAYER_PREFFERED_CURRENT';


export function fetchPlayerState(res) {
  return {
    type: FETCH_PLAYER_PREFFERED_STATE,
    player: res,
  }
}

export function fetchPlayerLike(res) {
  return {
    type: FETCH_PLAYER_PREFFERED_LIKE,
    like: res,
  }
}

export function fetchPlayerUnlike(res) {
  return {
    type: FETCH_PLAYER_PREFFERED_UNLIKE,
    unlike: res,
  }
}


export function fetchPlayerCurrent(res) {
  return {
    type: FETCH_PLAYER_PREFFERED_CURRENT,
    current: res,
  }
}



