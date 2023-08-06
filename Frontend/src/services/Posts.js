import {get} from "../utils/request"
export const getPosts = async () => {
    try {
      const response = await get('posts/feed/posts')
      return response;
    } catch (error) {
      throw error;
    }
  };