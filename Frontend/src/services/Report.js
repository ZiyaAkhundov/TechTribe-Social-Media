import {post} from "../utils/request"
import { useSelector } from "react-redux";

const token = useSelector((state) => state.token);

export const createReport = async (data) => {
    try {
      const response = await post('report/',data, token)
      return response;
    } catch (error) {
      throw error;
    }
  };