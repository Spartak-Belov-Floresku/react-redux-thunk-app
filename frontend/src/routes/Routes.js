import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import PostForm from '../forms/PostForm';
import Post from '../posts/Post';
import DeletePost from '../posts/DeletePost';
import EditPost from '../posts/EditPost';
import DeleteComment from '../posts/DeleteComment';

/** 
 * Site-wide routes.
 * Visiting a non-existant route redirects to the homepage.
 */

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/home">
                <Home />
            </Route>
            <Route exact path="/new">
                <PostForm />
            </Route>
            <Route exact path="/edit/:id">
                <EditPost />
            </Route>
            <Route exact path="/post/:id">
                <Post />
            </Route>
            <Route exact path="/delete/:id">
                <DeletePost />
            </Route>
            <Route exact path="/delete/:blogId/comment/:commentId">
                <DeleteComment />
            </Route>
            <Redirect to="/home" />
        </Switch>
    );
}

export default Routes;