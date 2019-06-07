import { USER_LOGINSUCCESS, USER_LOGOUT} from '../actions'

export default function userReducer(state = null, action){
    switch (action.type) {
        case USER_LOGINSUCCESS:
            return action.user
        case USER_LOGOUT:
            return null;
        default:
            return state;
    }
}