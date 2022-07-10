import { combineReducers } from 'redux';
import { playerReducer as player } from '../reducers/playerReducer';


const appReducer = combineReducers({
    player,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}


export default rootReducer;