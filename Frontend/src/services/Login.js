import {get,post} from "../utils/request"

export const getUser = async (data) => {
  try {
    const response = await post('auth/login', data); 
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await get('posts/feed/posts')
    return response;
  } catch (error) {
    throw error;
  }
};

