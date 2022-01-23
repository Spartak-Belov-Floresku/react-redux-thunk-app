
import './Forms.css';
import UseFields from '../hooks/UseFields';
import ApiClass from "../db/ApiClass";

/** AddCommentForm.
 *
 * Shows form and manages update to state on changes.
 * 
 * On submission:
 * - calls handleSubmit function
 * - triggers update state for useEffect() in the parent component
 *
 * PostDetails -> AddComment
 */

const AddCommentForm = ({id, comment, addComment}) => {

    const [formData, handleChange, releaseButton ] = UseFields({text: "" });
    
    const handleData = (commentObj) => {
        ApiClass.addComment(id, commentObj);
        formData.text = "";
        addComment(!comment); 
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleData(formData);
    }

    return(                   
            <div className="col-md-6 commentForm">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                id="comment"
                            />
                        </div>
                        <button className="btn btn-primary" disabled={releaseButton()?false:true}>Add commet</button>
                    </form>
                </div>
        );

}

export default AddCommentForm;