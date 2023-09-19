import {put,get} from "../utils/request"

  export const getUser = async (data) => {
    try {
      const response = await get('users/'+data.username)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getUserPosts = async (data) => {
    try {
      const response = await get('posts/profile/' + data.username)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const Follow = async (data) => {
    try {
      const response = await put('users/'+data.username+'/follow')
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getFolowers = async (data) => {
    try {
      const response = await get('users/followers/' + data.username)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getFolowings = async (data) => {
    try {
      const response = await get('users/followings/' + data.username)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const removeFollower = async (data) => {
    try {
      const response = await put('users/'+data.username+'/follow/remove')
      return response;
    } catch (error) {
      throw error;
    }
  };