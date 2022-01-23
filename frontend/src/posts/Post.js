import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostDetails from "./PostDetails";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getBlog } from "../reducer/actions";

/** Show information about a blog.
 *
 * Is rendered by Post to show a "PostDetails" for each blog.
 *
 * Route -> Post -> PostDetails
 */

const Post = () => {

    const { id }   = useParams();

    const post     = useSelector(st => st.blogs.posts, shallowEqual);
    const loading  = useSelector(st => st.blogs.loading, shallowEqual);
    const error    = useSelector(st => st.blogs.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlog(id));
    }, [dispatch]);

    if(error)
        return <h4 className="font-weight-bold text-center">Error...</h4>

    return(loading? loading: <PostDetails
                                id={id}
                                title={post.title}
                                description={post.description}
                                body={post.body}
                                votes={post.votes}
                            />
            );

}

export default Post;