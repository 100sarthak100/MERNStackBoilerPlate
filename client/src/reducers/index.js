import { combineReducers } from 'redux';

import chats from './chat_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
    chats
});

export default rootReducer;