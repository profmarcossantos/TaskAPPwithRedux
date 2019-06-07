import { GET_TAREFAS} from '../actions'

export default function tarefaReducer(state = [], action){
    switch (action.type) {
        case GET_TAREFAS:
            return action.tarefas
        default:
            return state;
    }
}