import {get} from "../utils/request"

export const getUsers = async (data) => {
    try {
      const response = await get(`users/query/users?user=${data}`)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getUserbyId = async (data) => {
    try {
      const response = await get(`users/id/${data}`)
      return response;
    } catch (error) {
      throw error;
    }
  };