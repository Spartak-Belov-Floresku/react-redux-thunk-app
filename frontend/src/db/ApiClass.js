import axios from "axios";
import { v4 as uuid } from 'uuid';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** ApiClass.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class ApiClass{

    static async request(endpoint, data = {}, method='get') {

        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get")? data: {};
        return (await axios({ url, method, data, params})).data;

    }

    /**================================ Blogs Methos ================================================ */

    /**method will retrive all blogs from db */
    static async getBlogs() {
        const usersBlogs = await this.request('api/posts/');
        return usersBlogs;
    }

    /**method will get blog under certain id */
    static async getBlog(id){
        const usersBlog = await this.request(`api/posts/${id}`);
        return usersBlog;
    }
    
    /**the method will create blog in db */
    static async createBlog({post}){
        await this.request(`api/posts/`, post, "post");
    }

    /**method will edit blog */
    static async editBlog({post, id}){
        await this.request(`api/posts/${id}`, post, 'put');
    }

    /**method will delete post and all comments that are related to the post */
    static async deleteBlog(id){
        try{
            await this.request(`api/posts/${id}`, {}, 'delete');
            await this.request(`api/posts/${id}/comments`, {}, 'delete');
        }catch(err){
            console.log(err)
        }
    }

    /**method will update voting for the post and return to the user interface */
    static async votingPost(id, direction){
        const result = await this.request(`api/posts/${id}/vote/${direction}`, {}, 'post');
        return result.votes;
    }

    /**==========================================Comments Methods========================================================*/

    /**method will get all comments related to id of post */
    static async getComments(id){
        const blogComments = await this.request(`api/posts/${id}/comments`);
        return blogComments;
    }

    /**method will add comment related to id of post */
    static async addComment(id, data){
        await this.request(`api/posts/${id}/comments`, data, 'post');
    }

    /**method will delete comment from db */
    static async deleteComment(blogId, commentKey){
        await this.request(`api/posts/${blogId}/comments/${commentKey}`, {}, 'delete');
    }

}

export default ApiClass;