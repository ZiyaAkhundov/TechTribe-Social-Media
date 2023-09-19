import {put,post,del} from '../utils/request'
import { useSelector } from "react-redux";

const token = useSelector((state) => state.token);

// change username and email
export const changeUserData = async (data) => {
    try {
        const response = await put('users/update', data, token)
        return response;
    } catch (error) {
      throw error;
    }
  };

  export const UploadPhoto = async (data) => {
    try {
        const response = await post('users/upload', data, token)
        return response;
    } catch (error) {
      throw error;
    }
  };
  export const setPhoto = async (data) => {
    try {
        const response = await put('users/picture', data, token)
        return response;
    } catch (error) {
      throw error;
    }
  };
  export const delPhoto = async (data) => {
    try {
        const response = await del('users/picture',null, token)
        return response;
    } catch (error) {
      throw error;
    }
  };