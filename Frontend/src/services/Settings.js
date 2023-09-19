import {put,post,del} from '../utils/request'

// change username and email
export const changeUserData = async (data) => {
    try {
        const response = await put('users/update', data)
        return response;
    } catch (error) {
      throw error;
    }
  };

  export const UploadPhoto = async (data) => {
    try {
        const response = await post('users/upload', data)
        return response;
    } catch (error) {
      throw error;
    }
  };
  export const setPhoto = async (data) => {
    try {
        const response = await put('users/picture', data)
        return response;
    } catch (error) {
      throw error;
    }
  };
  export const delPhoto = async (data) => {
    try {
        const response = await del('users/picture')
        return response;
    } catch (error) {
      throw error;
    }
  };