import {get,put,del,post} from "../utils/request"
export const getPosts = async () => {
    try {
      const response = await get('posts/feed/posts')
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const createPost = async (data) => {
    try {
      const response = await post('posts/',data)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostLike = async (data) => {
    try {
      const response = await put('posts/like/'+data.postId)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostDelete = async (data) => {
    try {
      const response = await del('posts/'+data.postId)
      return response;
    } catch (error) {
      throw error;
    }
  };