import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem } from "reactstrap";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchAllBlogsFromAPI } from "../reducer/actions";
import "./Home.css";


/** Homepage of site.
 *
 * Shows all blogs or message if blogs are not exist
 * 
 * Show limited information about a post
 *
 * Routed at /
 *
 * Routes -> Home
 */
const Home = () => {
  
  const posts    = useSelector(st => st.blogs.posts, shallowEqual);
  const loading  = useSelector(st => st.blogs.loading, shallowEqual);
  const error    = useSelector(st => st.blogs.error);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllBlogsFromAPI());
  }, [dispatch]);
  
  if (error)
    return <h4 className="font-weight-bold text-center">ERROR...</h4>

  let ids = [];

  if(posts)
    ids = Object.keys(posts);
  
  let blogs = null;

  if(!loading){
    
    blogs = ids.map(id => <ListGroupItem key={id}>
                            <NavLink to={`post/${posts[id].id}`} className="postRef">{posts[id].title}</NavLink>
                              <p>{posts[id].description}</p>
                            </ListGroupItem>
                    );

    blogs = <ListGroup>{blogs}</ListGroup>
  }
  

  return(<div className="Homepage">
          <div className="container text-center">
            <h1 className="font-weight-bold">Microblog</h1>
            <h3 className="font-weight-bold">Get in the Rithm of blogging!</h3>
            <div className="col-md-4 offset-md-2 links">
              {loading? loading: blogs}
            </div>
          </div>
        </div>
      );
}

export default Home;