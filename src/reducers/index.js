import { combineReducers } from 'redux';
import userReducer from './userReducer'
import tarefaReducer from './tarefaReducer'


export default combineReducers({
    user: userReducer,
    tarefas: tarefaReducer
})