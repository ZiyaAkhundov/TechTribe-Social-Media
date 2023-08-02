import {get, post} from "../utils/request"
import axios from 'axios';


// export const getUser = async (data) => {
//   try {
//     const response = await post('auth/login', data);
//     console.log(response)
//     return response;
//   } catch (error) {
    
//     throw error;
//   }
// };
// getUser function using the updated request utility
export const getUser = async (data) => {
  try {
    const response = await post('auth/login', data, true); 
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};


const fetchPostById = async (postId) => {
  try {
    const response = await axios.get(`http://localhost:5000/posts/${postId}`, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// fetchPostById('64c771cd1933f3fde3b8fb17')
//   .then(post => {
//     console.log(post)
//   })
//   .catch(error => {
//     // Handle any errors (e.g., redirect to login page for 401 Unauthorized)
//   });
