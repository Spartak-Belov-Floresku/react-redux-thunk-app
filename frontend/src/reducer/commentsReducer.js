const COMMENTS_STATE = {
    comments: [],
    error: false
}

const commentsReducer = (state=COMMENTS_STATE, action) => {
    switch(action.type){

        case 'GET_COMMETS':
            return {...state, comments: action.comments};
        
        case 'ERROR':
            return { ...state, error: action.error };

        default:
            return state;

    }
}

export default commentsReducer;