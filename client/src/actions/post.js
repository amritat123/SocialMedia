//make a request with axios
import axios from 'axios';
import { setAlert } from './alert';
import {
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        //request
        const res = await axios.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};
//add likes
export const addLike = id=> async dispatch => {
    try {
        //Updating 
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type:UPDATE_LIKES,
            payload: {id,likes:res.data}
        });
    } catch (err) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//remove likes
export const removeLike = id=> async dispatch => {
    try {
        //Updating 
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            //get the likes back
            type:UPDATE_LIKES,
            payload: {id,likes:res.data}
        });
    } catch (err) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//DELETE POST
export const deletePost = id=> async dispatch => {
    try {
        //Updating 
        const res = await axios.delete(`/api/posts/${id}`);

        dispatch({
            type:DELETE_POST,
            payload: id
        });
        dispatch(setAlert('post Removed', 'success'));
    } catch (err) {
        dispatch ({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

