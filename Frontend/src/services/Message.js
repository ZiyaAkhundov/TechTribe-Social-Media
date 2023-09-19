import {get,put,del,post} from "../utils/request"
import { useSelector } from "react-redux";

const token = useSelector((state) => state.token);

export const createMesRoom = async (data) => {
    try {
      const response = await post('messageroom', data, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getUsers = async (data) => {
    try {
      const response = await get(`users/query/users?user=${data}`)
      return response;
    } catch (error) {
      throw error;
    }
  };
  export const getRooms = async (data) => {
    try {
      const response = await get(`messageroom/find/${data}`)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getARoom = async (data) => {
    try {
      const response = await get(`messageroom/find/room/${data}`)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const sendMessage = async (data) => {
    try {
      const response = await post(`message/`, data, token)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const getMessages = async (data) => {
    try {
      const response = await get(`message/room/${data.id}/${data.userId}`)
      return response;
    } catch (error) {
      throw error;
    }
  };