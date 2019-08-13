import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = event => ({

    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value

});

export const search = () => {

    return (dispatch, getState) => {
        const description = getState().todo.description;
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${URL}?sort=-createAt${search}`)
            .then(res => dispatch({ type: 'TODO_SEARCHED', payload: res.data }))
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(() => dispatch(clear()))
            .then(() => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(res => dispatch({ type: 'TODO_MARKED_AS_DONE', payload: res.data }))
            .then(() => dispatch(search()))
    }
}

export const markAsPenging = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(res => dispatch({ type: 'TODO_MARKED_AS_PENDING', payload: res.data }))
            .then(() => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(() => dispatch(search()))
    }
}

export const clear = () => ([{ type: 'TODO_CLEAR' }, search()])


