import { useParams, Redirect} from "react-router-dom";
import ApiClass from "../db/ApiClass";

/** 
 * 
 * Component will delete post from db using post id and all related comments.
 * PostDetails -> Route -> DeletePost -> Home.
 * 
 */

const DeletePost = () => {
    const { id } = useParams();
        ApiClass.deleteBlog(id);
            return <Redirect to="/"/>
}

export default DeletePost;