import { useState } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import './Forms.css';
import UseFields from '../hooks/UseFields';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBlogsFromAPI, createBlog, editBlog } from "../reducer/actions";

/** This form is used to create or edit blog
 *
 * Shows form if blog will not created or edited will show error message.
 * On submission:
 * - calls dispatch of blogsReduser()
 * - redirects to "/" Home route
 *
 * Routers -> PostForm -> Home
 * Routed as /new or /edit/:id
 */

const PostForm = ({data={id:"",title:"",description:"", body:""}, edit=false}) => {

    const error = useSelector(st => st.blogs.error);
    const dispatch = useDispatch();
    const[ update, setUpdate ] = useState(false)

    const [formData, handleChange, releaseButton ] = UseFields({
      title: data.title,
      description: data.description,
      body: data.body
    });

    /**
     * processing will depend on which submite is made to create or edit blog
     */
    const handleData = postData => {

        !edit? dispatch(createBlog(postData)): dispatch(editBlog(postData, data.id));
        setUpdate(true);
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleData(formData);
    }

    /** if error form will show error and no error redirect home page */
    return (update && !error)? 
                    (<Redirect to={`/`} />):
                    (                   
                        <div className="row justify-content-center">
                            {error?<h4 className="font-weight-bold text-center">Something wrong try again</h4>:''}
                            <h1 className="font-weight-bold text-center">{!edit?"New Post:":"Edit Post:"}</h1>
                            <div className="col-md-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                id="title"
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description:</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                id="description"
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="body">Body:</label>
                                            <textarea 
                                                className="form-control" 
                                                value={formData.body} 
                                                onChange={handleChange} 
                                                name="body" 
                                                id="body"
                                            />
                                        </div>
                                        <button disabled className="btn btn-primary" disabled={releaseButton()?false:true}>Save</button> 
                                        <NavLink to="/home" className="btn btn-secondary" role="button">Cancel</NavLink>
                                    </form>
                                </div>
                        </div>
                    );
}

export default PostForm;