import { useParams, Redirect} from "react-router-dom";
import ApiClass from "../db/ApiClass";

/** 
 * 
 * Component will delete comment from db using comment id and related post id.
 * PostDetails -> Route -> DeleteComment -> Post -> PostDetails.
 * 
 */

const DeleteComment = () => {

    const { blogId, commentId } = useParams();
    ApiClass.deleteComment(blogId, commentId);
    return <Redirect to={`/post/${blogId}`} />
    
}

export default DeleteComment;