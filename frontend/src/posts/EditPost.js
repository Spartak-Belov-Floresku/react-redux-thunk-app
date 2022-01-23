import { useEffect } from "react";
import { useParams, Redirect} from "react-router-dom";
import PostForm from "../forms/PostForm";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getBlog } from "../reducer/actions";

/** Post editing form.
 *
 * Displays post form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally  but switching the lines below.
 *
 * Routes -> EditPost -> PostForm -> Home
 */
const EditPost = () => {

    const { id } = useParams();
    
    const post     = useSelector(st => st.blogs.posts, shallowEqual);
    const loading  = useSelector(st => st.blogs.loading, shallowEqual);
    const error    = useSelector(st => st.blogs.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlog(id));
    }, [dispatch]);

    
    if(error)
        return <Redirect to="/"/>

    return  (loading? loading: <PostForm data={{
                        id: id,
                        title: post.title, 
                        description: post.description, 
                        body: post.body}} 
                        edit={true} 
                    />);

}

export default EditPost;