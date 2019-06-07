
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
        apiKey: "xxxxx",
        authDomain: "xxxxx",
        databaseURL: "xxxxx",
        projectId: "xxxxx",
        storageBucket: "xxxxx",
        messagingSenderId: "xxxxx",
        appId: "xxxxx"
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
