import { FETCH_PLAYER_PREFFERED_STATE, FETCH_PLAYER_PREFFERED_LIKE, FETCH_PLAYER_PREFFERED_UNLIKE, FETCH_PLAYER_PREFFERED_CURRENT } from '../actions/playerAction';

const initialState = {
  statuts: {
    isPlaying: null,
    name: null,
    owner: null,
    imageUri: null,
    musicUri: null,
  },
  likes: [],
  current: null
};

export const playerReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_PLAYER_PREFFERED_STATE:
      return {
        ...state,
        statuts: action.player
      };
    case FETCH_PLAYER_PREFFERED_LIKE:
      return {
        ...state,
        likes: [...state.likes, action.like]
      };

    case FETCH_PLAYER_PREFFERED_UNLIKE:
      return {
        ...state,
        likes: state.likes.filter(item => (item !== action.unlike)),

      };

    case FETCH_PLAYER_PREFFERED_CURRENT:
      return {
        ...state,
        current: action.current,

      };


    default: {
      return {
        ...state
      }
    }
  }
};


export default playerReducer;
