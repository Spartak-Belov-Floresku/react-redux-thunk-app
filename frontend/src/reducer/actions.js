import ApiClass from "../db/ApiClass";
import { GET_ALL_BLOGS, 
         GET_BLOG, 
         START_LOADING,
         GET_COMMETS,
         ERROR
        } from "./actionTypes";
import Loader from "../helper/Loader";


/**
 * action fetches all blogs and calls the dispatch of blogsReducer()
 */
 export function fetchAllBlogsFromAPI(){

    return async function thunk(dispatch){

        try{
            dispatch(actionStartLoading(<Loader />));
                const data = await ApiClass.getBlogs();
                    dispatch(actionGetAllBlogs(data));
                        dispatch(actionStartLoading(false));

        }catch(err){

            dispatch(actionHandleError(true));

        }
    }
}


/**
 * action creates a blog and calls the dispatch of blogsReducer() if error
 */
export function createBlog(data){
    
    return async function thunk(dispatch){

        try{

            await ApiClass.createBlog({post: data});
                dispatch(fetchAllBlogsFromAPI());

        }catch(err){

            dispatch(actionHandleError(true)); 

        }

    }
}

/**
 * getting blog from db under specific id
 */
export function getBlog(id){

    return async function thunk(dispatch){

        try{
            dispatch(actionStartLoading(<Loader />));
                const blog = await ApiClass.getBlog(id);
                    dispatch(actionGetBlog(blog));
                        dispatch(actionStartLoading(false));

        }catch(err){

            dispatch(actionHandleError(true)); 

        }

    }

}

/**
 * action edits the blog and calls the dispatch of blogsReducer() if error
 */
export function editBlog(data, blogId){

    return async function thunk(dispatch){

        try{
            await ApiClass.editBlog({post: data, id: blogId});
                dispatch(fetchAllBlogsFromAPI());

        }catch(err){

            dispatch(actionHandleError(true)); 

        }

    }

}

/**
 * action gets all comments that are related to the post
 */
export function getAllComments(id){

    return async function thunk(dispatch){

        try{   
            const comments = await ApiClass.getComments(id);
                dispatch(actionGetComments(comments));

        }catch(err){

            dispatch(actionHandleError(true)); 

        }

    }
}

const actionGetAllBlogs = blogs => {
    return {
        type: GET_ALL_BLOGS,
        blogs
    }
}

const actionGetBlog = blog => {
    return{
        type: GET_BLOG,
        blog
    }
}

const actionGetComments = comments =>{
    return{
        type: GET_COMMETS,
        comments
    }
}

const actionStartLoading = loading => {
    return {
      type: START_LOADING,
      loading
    };
}

const actionHandleError = error => {
    return {
      type: ERROR,
      error
    };
}






