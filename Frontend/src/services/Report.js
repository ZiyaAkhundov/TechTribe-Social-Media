import {post} from "../utils/request"

export const createReport = async (data) => {
    try {
      const response = await post('report/',data)
      return response;
    } catch (error) {
      throw error;
    }
  };