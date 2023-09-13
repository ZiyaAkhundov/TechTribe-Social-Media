import {post} from "../utils/request"

export const createContact = async (data) => {
    try {
      const response = await post('contact/',data)
      return response;
    } catch (error) {
      throw error;
    }
  };