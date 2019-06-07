
export const GET_TAREFAS = 'GET_TAREFAS'
const getTarefas = (tarefas) => {
    return {
        type: GET_TAREFAS,
        tarefas
    }
}


import firebase from 'firebase'
export const lerTarefas = () => dispatch => {
    const { currentUser } = firebase.auth()
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`/tarefas/${currentUser.uid}`)
            .on('value', snapchot => {
                if (snapchot.val() != null) {
                    dispatch(getTarefas(
                        Object.entries(snapchot.val())
                            .map(item => ({ ...item[1], key: item[0] }))

                    ))
                    resolve()
                } else {
                    dispatch(getTarefas([]))
                    reject()
                }
            })

    });
}

export const alterarTarefa = (tarefa) => dispatch => {
    const { currentUser } = firebase.auth()
    let tarefaUpdate = Object.assign(tarefa, { realizado: !tarefa.realizado })

    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`/tarefas/${currentUser.uid}/${tarefa.key}`)
            .set(tarefaUpdate)
            .then(() => {
                resolve()
            })
            .catch(erro => {
                reject(erro)
            })

    });
}



export const excluirTarefa = (tarefa) => dispatch => {
    const { currentUser } = firebase.auth()
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`/tarefas/${currentUser.uid}/${tarefa.key}`)
            .remove()
            .then(() => {
                resolve()
            })
            .catch(erro => {
                reject(erro)
            })
    });
}


export const adicionarTarefa = (tarefa) => dispatch => {
    const { currentUser } = firebase.auth()
    let tarefaObjeto = {
        tarefa,
        realizado: false
    }
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`/tarefas/${currentUser.uid}`)
            .push(tarefaObjeto)
            .then(() => {
                resolve()
            })
            .catch(erro => {
                resolve(erro)
            })
    });
}



