import { combineReducers } from "redux";
import blogsReducer from "./blogsReducer";
import commentsReducer from "./commentsReducer";

const RootReducer = combineReducers({blogs: blogsReducer, blogComments: commentsReducer})

export default RootReducer;