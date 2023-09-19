import {get,put,del,post} from "../utils/request"
import { useSelector } from "react-redux";

const token = useSelector((state) => state.token);

export const getPosts = async (limit) => {
    try {
      const response = await get(`posts/feed/posts?limit=${limit}`)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getAPost = async (data) => {
    try {
      const response = await get('posts/find/' + data.id)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const createPost = async (data) => {
    try {
      const response = await post('posts/', data, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostLike = async (data) => {
    try {
      const response = await put('posts/like/'+data.postId, null, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostComment = async (data) => {
    try {
      const response = await put('posts/comment/'+ data.postId, data, token)
      return response;
    } catch (error) {
      throw error;
    }
  };
  export const CommentLike = async (data) => {
    try {
      const response = await put('posts/comment/'+ data.postId +'/'+ data.commentId + '/like', null, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const replyCommentLike = async (data) => {
    try {
      const response = await put('posts/comment/'+ data.postId +'/'+ data.commentId + '/'+ data.replyId +'/like', null, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const ReplyComment = async (data) => {
    try {
      const response = await put('posts/comment/'+ data.postId +'/'+ data.commentId + '/reply',{context:data.context}, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostDelete = async (data) => {
    try {
      const response = await del('posts/'+data.postId,null, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const CommentDelete = async (data) => {
    try {
      const response = await del('posts/comment/'+ data.postId +'/'+ data.commentId + '/delete', data, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const ReplyDelete = async (data) => {
    try {
      const response = await del('posts/comment/'+ data.postId +'/'+ data.commentId + '/'+ data.replyId + '/delete',null, token)
      return response;
    } catch (error) {
      throw error;
    }
  };