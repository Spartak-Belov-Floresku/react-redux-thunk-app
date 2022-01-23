import { useState, useEffect } from "react";
import { IoMdCreate, IoMdRemoveCircle } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import AddCommentForm from "../forms/AddCommentForm";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getAllComments } from "../reducer/actions";
import Voting from "../vote/Voting";
import Loader from "../helper/Loader";
import './PostDetails.css'

/** Show information about a blog.
 * 
 * Also show the AddComment form.
 * 
 * Is rendered by Post to show a PostDetails for each blog.
 * 
 * Post -> PostDetails -> AddComment
 */

const PostDetails = ({id, title, description, body, votes }) => {

    const comments = useSelector(st => st.blogComments.comments, shallowEqual);
    const dispatch = useDispatch();

    const [comment, addComment] = useState(false);
    const [loader, setLoader] = useState(<Loader />);
    
    useEffect(() => {
        dispatch(getAllComments(id));
        setLoader(false);
    }, [dispatch, comment]);

    let tags = null;

    if(comments){
        tags = comments.map(c => <p key={c.id} >
                                        <NavLink 
                                            to={`/delete/${id}/comment/${c.id}`}  
                                            className="removeComment">
                                            <IoMdRemoveCircle />
                                        </NavLink>{c.text}
                                </p>
                            );
    }

    return(
        <div className="container">
            <div className="col-md-6 post-details">
                <h1>
                    {title} 
                    <NavLink to={`/delete/${id}`} className="processRef"><IoMdRemoveCircle /></NavLink>
                    <NavLink to={`/edit/${id}`} className="processRef"><IoMdCreate /></NavLink>
                </h1>
                <div>
                    {description}
                    <Voting id={id} votes={votes} />
                </div>
                <p>{body}</p>
            </div>
            <div className="col-md-6 comments">
                <h3>User's comments:</h3>
                {loader? loader: tags}
            </div>
            <AddCommentForm id={id} comment={comment} addComment={addComment} />
        </div>
    );
}

export default PostDetails;