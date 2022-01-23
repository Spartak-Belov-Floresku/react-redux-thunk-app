import Loader from "../helper/Loader";

const BLOGS_STATE = {
    posts: {},
    loading: <Loader />,
    error: false
}

const blogsReducer = (state=BLOGS_STATE, action) => {
    switch(action.type){

        case 'GET_ALL_BLOGS':
            return {...state, posts: action.blogs};

        case 'GET_BLOG':
            return{...state, posts: action.blog};

        case 'START_LOADING':
            return {...state, loading: action.loading};
        
        case 'ERROR':
            return { ...state, error: action.error };

        default:
            return state;

    }
}

export default blogsReducer;