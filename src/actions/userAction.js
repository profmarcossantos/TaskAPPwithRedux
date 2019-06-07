
export const USER_LOGINSUCCESS = 'USER_LOGINSUCCESS'
const userLoginSuccess = (user) => {
    return {
        type: USER_LOGINSUCCESS,
        user
    }
}

export const USER_LOGOUT = 'USER_LOGOUT'
const userLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}

import firebase from 'firebase'


export const tryLogin = (login, senha) => dispatch => {
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAHl61YV9Z2J5kBQ4LvpvTuuuYmFkyR-Mk",
        authDomain: "tasksprofmarcos.firebaseapp.com",
        databaseURL: "https://tasksprofmarcos.firebaseio.com",
        projectId: "tasksprofmarcos",
        storageBucket: "tasksprofmarcos.appspot.com",
        messagingSenderId: "573959989821",
        appId: "1:573959989821:web:6bd712865d1f6b16"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    return firebase
        .auth()
        .signInWithEmailAndPassword(
            login, senha
        )
        .then(
            user => {
                dispatch(userLoginSuccess(user.user))
            }

        )
}

import { AsyncStorage } from 'react-native';
export const tryLogout = () => dispatch => {
    return firebase
        .auth()
        .signOut()
        .then(async () => {
            dispatch(userLogout())
            await AsyncStorage.removeItem('senha')
        })
}





export const createLogin = (login, senha) => dispatch => {
    return firebase.auth().createUserWithEmailAndPassword(
        login, senha)
}
