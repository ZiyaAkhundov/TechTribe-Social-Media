import {get,post} from "../utils/request"

export const getUser = async (data) => {
  try {
    const response = await post('auth/login', data); 
    return response;
  } catch (error) {
    throw error;
  }
};
export const userData = async ()=>{
  try {
    const response = await get('auth/user-data');
    return response;
  } catch (error) {
    throw error;
  }
}

